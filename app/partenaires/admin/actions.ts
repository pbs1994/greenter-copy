'use server'

/**
 * Server actions for the /partenaires/admin screens. Mirrors
 * app/administrator/actions/products.ts: requireAdmin() first (defense in
 * depth on top of RLS), service-role client for the actual write so it
 * doesn't depend on the admin's session cookie round-tripping through RLS.
 */

import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-auth'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

/**
 * Closes a deal as won or lost. This is deliberately admin-only (see
 * supabase/partenaires-schema.sql — the "only admin sets final status"
 * restrictive policy enforces the same rule at the database level, this
 * is the app-level gate on top of it): closing a deal is the trigger for
 * commission accounting later, so it must reflect a real, confirmed sale,
 * not an agent marking their own deal won.
 *
 * Only applies to deal_type = 'devis'. 'achat_immediat' deals (instant
 * Stripe purchases) are inserted already closed by whatever attribution
 * mechanism ends up handling those (promo code or referral link — not
 * built yet) and must never be touched through this manual action.
 */
export async function closeDeal(dealId: string, status: 'gagné' | 'perdu') {
  await requireAdmin()

  const supabase = adminClient()
  const { error } = await supabase
    .from('deals')
    .update({ status, closed_at: new Date().toISOString() })
    .eq('id', dealId)
    .eq('deal_type', 'devis')

  if (error) {
    throw new Error(`Échec de la clôture du dossier : ${error.message}`)
  }

  revalidatePath('/partenaires/admin/deals')
  revalidatePath('/partenaires/admin/action-requise')
  revalidatePath('/partenaires/admin')
}

const PIPELINE_STATUSES = new Set(['nouveau', 'contacté', 'devis_envoyé'])

/**
 * Used from the "Action requise" screen only: fills in the real client
 * identity (+ optionally the montant) on a placeholder dossier created by
 * a call-button click (source = 'agent_link_call', see
 * /api/track-call-click) — a tel: click has no way to tell us who called,
 * so this is where the admin manually rapproches it with an actual
 * incoming call and turns the placeholder into a real dossier. Restricted
 * to the 3 non-final pipeline stages; closing to gagné/perdu goes through
 * closeDeal() instead, which also stamps closed_at.
 */
export async function updateDealClientInfo(dealId: string, formData: FormData) {
  await requireAdmin()

  const status = String(formData.get('status') || '')
  if (!PIPELINE_STATUSES.has(status)) {
    throw new Error('Statut invalide.')
  }

  const clientName = String(formData.get('client_name') || '').trim() || null
  const clientPhone = String(formData.get('client_phone') || '').trim() || null
  const clientEmail = String(formData.get('client_email') || '').trim() || null

  const rawAmount = String(formData.get('amount') || '').trim()
  const amount = rawAmount ? Number(rawAmount.replace(',', '.')) : null
  if (rawAmount && (!Number.isFinite(amount) || (amount as number) < 0)) {
    throw new Error('Montant invalide.')
  }

  const supabase = adminClient()
  const { error } = await supabase
    .from('deals')
    .update({ client_name: clientName, client_phone: clientPhone, client_email: clientEmail, amount, status })
    .eq('id', dealId)
    .eq('deal_type', 'devis')

  if (error) {
    throw new Error(`Échec de la mise à jour du dossier : ${error.message}`)
  }

  revalidatePath('/partenaires/admin/action-requise')
  revalidatePath('/partenaires/admin/deals')
  revalidatePath('/partenaires/admin')
}

/**
 * Corrects the montant of a devis — haggling with the client can move the
 * final price before (or even after) closing. Restricted to deal_type =
 * 'devis' : an 'achat_immediat' amount comes straight from the Stripe
 * charge and has no business being hand-edited here.
 */
export async function updateDealAmount(dealId: string, formData: FormData) {
  await requireAdmin()

  const raw = String(formData.get('amount') || '').trim()
  const amount = raw ? Number(raw.replace(',', '.')) : null
  if (raw && (!Number.isFinite(amount) || (amount as number) < 0)) {
    throw new Error('Montant invalide.')
  }

  const supabase = adminClient()
  const { error } = await supabase
    .from('deals')
    .update({ amount })
    .eq('id', dealId)
    .eq('deal_type', 'devis')

  if (error) {
    throw new Error(`Échec de la mise à jour du montant : ${error.message}`)
  }

  revalidatePath('/partenaires/admin/deals')
  revalidatePath('/partenaires/admin')
}

/**
 * Sets an agent's commission rate (%). Lives in profiles, not deals — a
 * rate change only affects future commission calculations, it doesn't
 * retroactively touch deals already closed.
 */
export async function updateAgentCommission(agentId: string, formData: FormData) {
  await requireAdmin()

  const raw = String(formData.get('commission_rate') || '').trim()
  const rate = Number(raw.replace(',', '.'))
  if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
    throw new Error('Le taux de commission doit être un nombre entre 0 et 100.')
  }

  const supabase = adminClient()
  const { error } = await supabase
    .from('profiles')
    .update({ commission_rate: rate })
    .eq('id', agentId)

  if (error) {
    throw new Error(`Échec de la mise à jour de la commission : ${error.message}`)
  }

  revalidatePath('/partenaires/admin/agents')
}
