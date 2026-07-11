-- ============================================================================
-- Espace Partenaires — pièce jointe PDF du devis
--
-- Stockage : bucket Supabase Storage privé (pas Vercel Blob — cette
-- fonctionnalité n'a pas de dépendance @vercel/blob installée et
-- /api/upload n'existe pas dans ce repo malgré ce que suggère
-- components/administrator/ImageUpload.tsx). Tout le sous-système
-- partenaires est déjà 100% Supabase, on reste cohérent.
--
-- Chemin de chaque fichier : "<deal_id>/<timestamp>-<nom>.pdf" — permet à
-- storage.foldername(name) de retrouver le dossier propriétaire pour la
-- RLS ci-dessous, sans table de liaison séparée.
-- ============================================================================

-- 1. Colonne sur deals
do $$ begin
  alter table public.deals add column devis_pdf_path text;
exception
  when duplicate_column then null;
end $$;

-- 2. Bucket privé (public = false : jamais d'URL publique, uniquement des
--    URLs signées à durée limitée générées côté serveur)
insert into storage.buckets (id, name, public)
values ('devis-pdfs', 'devis-pdfs', false)
on conflict (id) do nothing;

-- 3. RLS sur storage.objects, restreinte à ce bucket
--    (l'agent utilise sa propre session pour l'upload/la lecture ; l'admin
--    passe par le service-role dans son propre code, qui contourne cette
--    RLS de toute façon — ces policies ne servent qu'à l'agent.)
drop policy if exists "agents upload own devis pdf" on storage.objects;
create policy "agents upload own devis pdf" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'devis-pdfs'
    and exists (
      select 1 from public.deals
      where id::text = (storage.foldername(name))[1]
        and agent_id = auth.uid()
        and deal_type = 'devis'
    )
  );

drop policy if exists "agents and admin read devis pdf" on storage.objects;
create policy "agents and admin read devis pdf" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'devis-pdfs'
    and (
      is_admin()
      or exists (
        select 1 from public.deals
        where id::text = (storage.foldername(name))[1]
          and agent_id = auth.uid()
      )
    )
  );

-- Vérification
select id, name, public from storage.buckets where id = 'devis-pdfs';
