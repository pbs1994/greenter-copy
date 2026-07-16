-- ============================================================================
-- Espace Partenaires — Session 1 : schéma, is_admin(), RLS
--
-- Contexte : réseau fermé d'agents (apporteurs d'affaires), ajoutés à la
-- main par un admin. Réutilise le MÊME projet Supabase que le site
-- principal, et surtout la MÊME notion d'admin que /administrator :
-- "admin du réseau partenaires" = "présent dans public.admins", pas un
-- rôle séparé. Voir docs/agent-network-plan.md pour le contexte complet.
--
-- Différences volontaires par rapport au premier jet du plan :
--   - profiles n'a PAS de colonne `role` : un admin est déterminé via
--     is_admin() (email présent dans public.admins), jamais stocké en dur
--     dans profiles. Un même humain peut être admin ET/OU avoir une ligne
--     profiles (agent) — les deux notions sont indépendantes.
--   - Pas de trigger auto-create sur auth.users : en réseau fermé, l'admin
--     crée le compte auth (Dashboard) PUIS insère la ligne profiles à la
--     main avec l'UUID généré. Le trigger auto-create sera pertinent pour
--     l'étape publique (auto-inscription), pas maintenant.
--   - RLS "closing" corrigée : le premier jet du plan avait deux policies
--     UPDATE permissives qui s'additionnent en OR — un agent aurait pu se
--     passer outre la policy "only admin closes" (il suffisait de matcher
--     la policy "agent updates own deal"). Corrigé avec une policy
--     RESTRICTIVE dédiée, qui s'applique en ET (AND) par-dessus les
--     permissives, quelle que soit celle qui a laissé passer la ligne.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. is_admin() — source de vérité unique, réutilise public.admins
-- ----------------------------------------------------------------------------
-- security definer : un utilisateur normal n'a pas de droit SELECT direct
-- sur auth.users ni forcément sur public.admins ; la fonction s'exécute
-- avec les droits de son propriétaire pour faire la jointure, et ne
-- renvoie qu'un booléen (aucune fuite de données).
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from auth.users u
    join public.admins a on lower(a.email) = lower(u.email)
    where u.id = auth.uid()
  );
$$;

-- ----------------------------------------------------------------------------
-- 2. profiles — une ligne = un agent (pas un admin ; voir is_admin())
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users primary key,
  status text check (status in ('pending','approved','suspended')) default 'approved',
  full_name text,
  siret text,
  siret_verified boolean default false,
  contract_accepted_at timestamptz,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  commission_rate numeric default 10,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "agent selects own profile" on public.profiles
  for select using (id = auth.uid());

create policy "admin selects all profiles" on public.profiles
  for select using (is_admin());

create policy "admin manages profiles" on public.profiles
  for all using (is_admin()) with check (is_admin());

-- ----------------------------------------------------------------------------
-- 3. deals
--
-- NOTE: amount (ici et dans commissions/payout_batches) est en EUROS,
-- pas en centimes. C'est différent de products.price sur le site
-- principal (qui est en centimes pour coller à l'API Stripe) : ici, le
-- montant est saisi à la main par un agent ou un admin, sans passer par
-- Stripe, donc pas de raison d'imposer la contrainte "entiers en centimes".
-- ----------------------------------------------------------------------------
create table if not exists public.deals (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references public.profiles(id),
  first_touch_agent_id uuid references public.profiles(id),
  client_name text,
  client_phone text,
  client_email text,
  product text,
  amount numeric, -- euros, pas centimes
  -- Deux natures de vente bien distinctes :
  --   'devis'          : cycle long (visite → devis → signature), l'admin
  --                      clôture manuellement en gagné/perdu (voir plus bas).
  --   'achat_immediat' : achat en ligne payé instantanément via Stripe (kit
  --                      solaire, batterie...). Inséré déjà à l'état gagné
  --                      par le mécanisme d'attribution (code promo ou lien
  --                      de parrainage — pas encore décidé, à construire
  --                      plus tard), jamais par un agent ni un admin à la main.
  deal_type text not null default 'devis' check (deal_type in ('devis', 'achat_immediat')),
  status text default 'nouveau' check (status in ('nouveau','contacté','devis_envoyé','gagné','perdu')),
  source text,
  ip_hash text,
  notes text,
  created_at timestamptz default now(),
  closed_at timestamptz
);

-- Migration pour une table deals déjà existante (créée avant l'ajout de
-- deal_type) — no-op sur une installation neuve, où la colonne est déjà
-- posée par le CREATE TABLE ci-dessus.
do $$ begin
  alter table public.deals add column deal_type text not null default 'devis';
exception
  when duplicate_column then null;
end $$;

do $$ begin
  alter table public.deals add constraint deals_deal_type_check check (deal_type in ('devis', 'achat_immediat'));
exception
  when duplicate_object then null;
end $$;

alter table public.deals enable row level security;

create policy "approved agents select own deals" on public.deals
  for select using (
    is_admin()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and status = 'approved' and id = deals.agent_id
    )
  );

-- DROP + CREATE (pas de CREATE OR REPLACE POLICY en Postgres) pour pouvoir
-- resserrer la règle : un agent ne peut insérer qu'un dossier de type
-- 'devis'. Les dossiers 'achat_immediat' ne sont créés que par le futur
-- mécanisme d'attribution des achats Stripe, en service-role (qui
-- contourne la RLS de toute façon), jamais par un agent ni via cette policy.
drop policy if exists "approved agents insert own deals" on public.deals;
create policy "approved agents insert own devis" on public.deals
  for insert with check (
    is_admin()
    or (
      agent_id = auth.uid()
      and deal_type = 'devis'
      and exists (select 1 from public.profiles where id = auth.uid() and status = 'approved')
    )
  );

-- Permissive : qui a le droit de toucher à la ligne (l'agent propriétaire, ou l'admin).
create policy "agent or admin updates deal" on public.deals
  for update using (agent_id = auth.uid() or is_admin());

-- Restrictive : quelle que soit la policy permissive qui a laissé passer,
-- personne d'autre qu'un admin ne peut faire passer une ligne à gagné/perdu.
-- (as restrictive => combinée en AND, jamais contournable par une autre policy)
create policy "only admin sets final status" on public.deals
  as restrictive
  for update
  with check (
    is_admin() or status not in ('gagné','perdu')
  );

-- ----------------------------------------------------------------------------
-- 4. commissions — générées par le système (service role) au passage à gagné,
--    jamais insérées/éditées directement par un agent.
-- ----------------------------------------------------------------------------
create table if not exists public.commissions (
  id uuid default gen_random_uuid() primary key,
  deal_id uuid references public.deals(id),
  agent_id uuid references public.profiles(id),
  amount numeric,
  paid boolean default false,
  paid_at timestamptz
);

alter table public.commissions enable row level security;

create policy "agent selects own commissions" on public.commissions
  for select using (agent_id = auth.uid() or is_admin());

create policy "admin manages commissions" on public.commissions
  for all using (is_admin()) with check (is_admin());

-- ----------------------------------------------------------------------------
-- 5. payout_batches — structure prête pour l'étape publique, RLS dès
--    maintenant par cohérence, même si la table n'est pas encore utilisée.
-- ----------------------------------------------------------------------------
create table if not exists public.payout_batches (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references public.profiles(id),
  total_amount numeric,
  status text default 'pending' check (status in ('pending','paid')),
  created_at timestamptz default now(),
  paid_at timestamptz
);

alter table public.payout_batches enable row level security;

create policy "agent selects own payout batches" on public.payout_batches
  for select using (agent_id = auth.uid() or is_admin());

create policy "admin manages payout batches" on public.payout_batches
  for all using (is_admin()) with check (is_admin());

-- ============================================================================
-- Étape publique — Session 6 : inscription self-service + vérification SIRET
--
-- Voir docs/agent-network-plan.md section 8. Reprend le trigger auto-create
-- anticipé dans le commentaire de la section 2 ci-dessus ("Le trigger
-- auto-create sera pertinent pour l'étape publique, pas maintenant") :
-- maintenant, c'est le moment.
--
-- Flux : /partenaires/inscription vérifie le SIRET côté serveur AVANT
-- d'appeler supabase.auth.signInWithOtp({ options: { data: {...} } }) — les
-- métadonnées passées dans `data` atterrissent dans auth.users.raw_user_meta_data,
-- que ce trigger recopie dans profiles à la création du compte. profiles.status
-- garde son défaut 'pending' : aucune modification de requireAgent() /
-- getApprovedAgentProfile() n'est nécessaire, ils traitent déjà ce cas.
-- ============================================================================

-- siret_verified (déjà existant) reste le filtre simple pass/fail ; siret_check
-- est l'instantané complet (dénomination, statut, catégorie juridique, date de
-- vérification) que l'admin consulte sur l'écran de candidatures.
alter table public.profiles add column if not exists siret_check jsonb;
alter table public.profiles add column if not exists contract_version text;

-- security definer, même raisonnement que is_admin() plus haut : le rôle
-- interne Supabase qui exécute l'INSERT dans auth.users lors d'un signInWithOtp
-- n'a pas forcément de droit d'écriture direct sur public.profiles (dont la
-- policy INSERT n'autorise que is_admin()) ; en security definer, la fonction
-- s'exécute avec les droits de son propriétaire et bypass proprement la RLS,
-- sans l'affaiblir pour qui que ce soit d'autre.
--
-- Le garde-fou `raw_user_meta_data ? 'full_name'` évite de créer une ligne
-- profiles pour une connexion admin classique (/login), qui passe aussi par
-- auth.users mais sans ces métadonnées d'inscription.
create or replace function public.handle_new_agent_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.raw_user_meta_data ? 'full_name' then
    insert into public.profiles (id, full_name, siret, siret_verified, siret_check, contract_accepted_at, contract_version)
    values (
      new.id,
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'siret',
      (new.raw_user_meta_data->>'siret_verified')::boolean,
      new.raw_user_meta_data->'siret_check',
      (new.raw_user_meta_data->>'contract_accepted_at')::timestamptz,
      new.raw_user_meta_data->>'contract_version'
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_agent_signup on auth.users;
create trigger on_agent_signup
  after insert on auth.users
  for each row
  execute function public.handle_new_agent_signup();

-- ----------------------------------------------------------------------------
-- Vérification
-- ----------------------------------------------------------------------------
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('profiles', 'deals', 'commissions', 'payout_batches')
order by table_name;

select trigger_name from information_schema.triggers where trigger_name = 'on_agent_signup';
