# Greenter — Espace Partenaires / Agent Network

Документ с архитектурными решениями для платформы управления сетью коммерческих агентов (commerciaux/apporteurs d'affaires). Цель: агент сам ведёт лида от звонка до закрытия сделки и получает комиссию только по факту продажи.

## 1. Контекст и требования

- Клиент: Greenter (RGE, энергетическая реновация — PAC, panneaux solaires, isolation)
- Основной сайт Greenter уже существует (стек уточняется — смотри `package.json` в корне проекта)
- Есть подключение к Supabase
- Модель: **не классический affiliate** (клик → cookie → конверсия дни спустя), а сеть агентов, которые сами звонят и ведут сделку целиком
- **Стратегия запуска: начать с закрытой сети (агенты добавляются вручную), затем открыть публичную регистрацию без миграции данных**

## 2. Архитектурное решение

Отдельное приложение (не встраивать в существующий сайт):
- Next.js + TypeScript, поддомен `partenaires.greenter.fr` или `app.greenter.fr`
- Использует тот же Supabase-проект, что и основной сайт (те же ключи, общая БД, новые таблицы)
- Основной сайт получает только: (а) кнопку "Espace Partenaires", (б) поддержку `?agent=xxx` в форме заявки для атрибуции

Почему отдельно: не рискуем продающим сайтом при разработке личного кабинета; разный характер нагрузки (статика/SEO vs динамика+auth); независимый деплой.

## 3. Схема БД (сразу с полями "про запас" под публичную версию)

```sql
create table profiles (
  id uuid references auth.users primary key,
  role text check (role in ('admin','agent')) default 'agent',
  status text check (status in ('pending','approved','suspended')) default 'approved', -- на закрытом этапе всегда approved
  full_name text,
  siret text,                          -- пусто пока не нужно, заполнится на публичном этапе
  siret_verified boolean default false,
  contract_accepted_at timestamp,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  commission_rate numeric default 10,
  created_at timestamp default now()
);

create table deals (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references profiles(id),
  first_touch_agent_id uuid references profiles(id), -- фиксируется при первом клике, не переписывается (на будущее, при конкуренции агентов за лида)
  client_name text,
  client_phone text,
  client_email text,
  product text,                        -- PAC / panneaux_solaires / isolation / audit
  amount numeric,
  status text default 'nouveau',       -- nouveau, contacté, devis_envoyé, gagné, perdu
  source text,                         -- agent_link / site_organic / manual_entry
  ip_hash text,                        -- для анти-фрод анализа, без хранения сырого IP (RGPD)
  notes text,
  created_at timestamp default now(),
  closed_at timestamp
);

create table commissions (
  id uuid default gen_random_uuid() primary key,
  deal_id uuid references deals(id),
  agent_id uuid references profiles(id),
  amount numeric,
  paid boolean default false,
  paid_at timestamp
);

-- на будущее, для публичного этапа: батч-выплаты с порогом
create table payout_batches (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references profiles(id),
  total_amount numeric,
  status text default 'pending', -- pending / paid
  created_at timestamp default now(),
  paid_at timestamp
);
```

## 4. RLS-политики (писать сразу с учётом `status`, даже когда все `approved`)

```sql
alter table deals enable row level security;

create policy "approved agents see own deals" on deals
  for select using (
    exists (
      select 1 from profiles
      where id = auth.uid()
        and status = 'approved'
        and (id = deals.agent_id or role = 'admin')
    )
  );

create policy "agent updates own deal (except closing)" on deals
  for update using (agent_id = auth.uid());

-- закрытие сделки (gagné/perdu) — только админ, чтобы комиссия начислялась на подтверждённые продажи
create policy "only admin closes deals" on deals
  for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  )
  with check (status in ('gagné','perdu'));
```

## 5. Атрибуция лида (referral)

Два сценария:
1. **Агент сам заводит лид** (холодный звонок) — вручную создаёт запись в своём кабинете, `agent_id` = он сам по умолчанию (залогинен). Атрибуция не нужна.
2. **Агент присылает клиенту ссылку на сайт** — нужна атрибуция по `referral_code`.

Ссылка: `https://greenter.fr/devis?agent=a1b2c3d4`

**Закрытая сеть (старт):** достаточно `sessionStorage` на время визита + запись при сабмите формы. Cookie не обязателен, антифрод не нужен (сеть доверенная, немного агентов).

**Публичная сеть (после открытия):** нужен full first-party cookie с окном атрибуции 30 дней (стандарт для B2C с длинным циклом):

```ts
// middleware.ts на основном сайте Greenter
const agent = req.nextUrl.searchParams.get('agent');
if (agent) {
  res.cookies.set('greenter_agent', agent, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: false,
  });
}
```
На этом этапе добавить cookie в consent banner как marketing/tracking cookie.

При сабмите формы заявки на основном сайте:
```ts
const { data: agent } = await supabase
  .from('profiles')
  .select('id')
  .eq('referral_code', agentCode)
  .single();

await supabase.from('deals').insert({
  agent_id: agent?.id ?? null,
  first_touch_agent_id: agent?.id ?? null,
  client_name, client_phone, product,
  status: 'nouveau',
  source: agent ? 'agent_link' : 'site_organic',
});
```

## 6. Уведомление агента о новом лиде

Проблема: если ждать, что агент сам зайдёт проверить кабинет — заявки будут теряться. Решение — автоматика:

- **Supabase Realtime** — подписка в кабинете агента на новые записи `deals` с его `agent_id` (мгновенное появление карточки без перезагрузки)
- **Email/SMS через Database Trigger + Edge Function** (надёжнее, т.к. агент не всегда в кабинете):

```sql
create or replace function notify_agent_new_lead()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://<project>.functions.supabase.co/notify-agent',
    body := jsonb_build_object('deal_id', new.id, 'agent_id', new.agent_id)
  );
  return new;
end;
$$ language plpgsql;

create trigger on_new_agent_lead
  after insert on deals
  for each row
  when (new.source = 'agent_link')
  execute function notify_agent_new_lead();
```
Для email на старте — Resend (проще всего интегрировать, не нужен отдельный SMS-провайдер).

## 7. Воркфлоу сделки и комиссия

Цикл PAC/solaire долгий (визит → расчёт → devis → подписание → монтаж → оплата), агент не всегда участвует во всех этапах. Поэтому:
- Агент двигает статусы до `devis_envoyé`
- Финальное `gagné`/`perdu` ставит **админ** (видит реальный факт подписания/оплаты) — это и есть триггер начисления комиссии (см. RLS выше)
- На публичном этапе: выплата не за каждую сделку, а батчем при накоплении порога (например 100€) + агент прикладывает facture со своим SIRET

## 8. Публичная версия — что добавится (не ломая закрытую)

Чисто аддитивные модули, не требуют переделки существующего:
- Публичная страница регистрации агента (`status = 'pending'` по умолчанию для новых)
- Экран одобрения заявок в админке
- Проверка SIRET через API INSEE/Sirene (Edge Function)
- Чекбокс согласия с contrat d'apporteur d'affaires (timestamp + версия договора)
- Анти-фрод: rate limiting на форму заявки (Cloudflare Turnstile/reCAPTCHA), self-referral check (сверка email/телефона клиента с данными агента), дедупликация по `first_touch_agent_id`
- Полноценный cookie вместо sessionStorage (см. п.5)
- `payout_batches` для группировки выплат

**Юридический риск (Франция):** платить публично незарегистрированным физлицам — риск requalification en salariat déguisé + проблемы с URSSAF. На публичном этапе обязательно: SIRET (auto-entrepreneur / agent commercial RSAC) + подписанный contrat d'apporteur d'affaires до первой выплаты.

## 9. Порядок сессий в Claude Code

1. **Auth + схема БД + RLS** — создать таблицы выше, настроить Supabase Auth (email/password), политики доступа, редирект по роли (admin → /admin, agent → /dashboard)
2. **Кабинет агента** — канбан-доска сделок (nouveau → contacté → devis_envoyé → gagné/perdu), форма ручного добавления лида, заметки/история по сделке
3. **Admin-кабинет** — список всех агентов и сделок, закрытие сделки (gagné/perdu), статистика по сети
4. **Атрибуция + уведомления** — referral_code, форма на основном сайте с ?agent=, sessionStorage, Realtime-подписка или email-уведомление через Resend
5. **Комиссии** — авторасчёт при переходе в gagné, личная статистика по заработку у агента
6. (Позже, при открытии публичной сети) — регистрация, одобрение, SIRET-проверка, антифрод, батч-выплаты

---
*Как использовать: положить файл в корень проекта (например `docs/agent-network-plan.md`) и в начале сессии Claude Code попросить: "прочитай docs/agent-network-plan.md перед началом работы".*
