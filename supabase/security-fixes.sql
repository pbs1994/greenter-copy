-- =============================================================================
-- Security hardening migration
-- Run with:
--   psql $DATABASE_URL -f supabase/security-fixes.sql
-- or apply through the Supabase SQL editor.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- webhook_events: Stripe event-id deduplication
--
-- Stripe webhooks can be retried (built-in 3-day retry policy) and a captured
-- payload remains valid for the signing-window (5 min) — long enough for an
-- adversary to replay a `customer.subscription.created` event and get
-- duplicate maintenance subscriptions + duplicate confirmation emails. Only
-- `checkout.session.completed` had per-session idempotency before; subscription
-- events did not.
--
-- The table records every event we successfully processed. The handler does
--   INSERT INTO webhook_events (id) VALUES (event.id) ON CONFLICT DO NOTHING
--   RETURNING id;
-- and skips processing when no row was returned (i.e. we've seen it).
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id          text        PRIMARY KEY,
  event_type  text        NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS webhook_events_received_at_idx
  ON public.webhook_events (received_at);

-- Lock the table down — only the service_role (used by the webhook) ever
-- touches it. Anonymous + authenticated roles must not even see row counts.
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- No policies → no access for anon/authenticated. service_role bypasses RLS.
