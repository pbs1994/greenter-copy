'use server'

/**
 * Server actions for the agent's own cabinet (/partenaires/dashboard).
 *
 * Unlike the admin actions (app/partenaires/admin/actions.ts), these use
 * the agent's own authenticated session client — not a service-role
 * client — so RLS does the actual enforcement:
 *   - createLead(): the "approved agents insert own devis" policy already
 *     requires agent_id = auth.uid() and deal_type = 'devis'.
 *   - updateDeal(): the "agent or admin updates deal" policy requires
 *     agent_id = auth.uid(); the RESTRICTIVE "only admin sets final
 *     status" policy means an agent physically cannot move a deal to
 *     gagné/perdu from here, no matter what the form sends — that's by
 *     design (see docs/agent-network-plan.md §7).
 */

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerActionClient } from '@/lib/supabase-server'
import { requireAgent } from '@/lib/partenaires-auth'

const PIPELINE_STATUSES = ['nouveau', 'contacté', 'devis_envoyé'] as const
type PipelineStatus = (typeof PIPELINE_STATUSES)[number]

function isPipelineStatus(value: string): value is PipelineStatus {
  return (PIPELINE_STATUSES as readonly string[]).includes(value)
}

/**
 * Agent manually adds a lead from a cold call — no referral attribution
 * needed, they're logged in and become the agent_id by construction.
 */
export async function createLead(formData: FormData) {
  const agent = await requireAgent()
  const supabase = await createSupabaseServerActionClient()

  const client_name = String(formData.get('client_name') || '').trim()
  const client_phone = String(formData.get('client_phone') || '').trim()
  const client_email = String(formData.get('client_email') || '').trim()
  const product = String(formData.get('product') || '').trim()
  const amountRaw = String(formData.get('amount') || '').trim()
  const notes = String(formData.get('notes') || '').trim()

  if (!client_name) {
    throw new Error('Le nom du client est obligatoire.')
  }

  const amount = amountRaw ? Number(amountRaw.replace(',', '.')) : null
  if (amountRaw && (!Number.isFinite(amount) || (amount as number) < 0)) {
    throw new Error('Montant invalide.')
  }

  const { error } = await supabase.from('deals').insert({
    agent_id: agent.id,
    first_touch_agent_id: agent.id,
    client_name,
    client_phone: client_phone || null,
    client_email: client_email || null,
    product: product || null,
    amount,
    deal_type: 'devis',
    status: 'nouveau',
    source: 'manual_entry',
    notes: notes || null,
  })

  if (error) {
    throw new Error(`Échec de la création du dossier : ${error.message}`)
  }

  revalidatePath('/partenaires/dashboard')
  redirect('/partenaires/dashboard')
}

/**
 * Moves a devis through the pipeline and/or updates its notes. Rejects
 * anything other than the 3 non-final statuses server-side, as a clear
 * error rather than relying solely on the silent RLS rejection — the
 * restrictive DB policy is still there as the real guarantee.
 */
export async function updateDeal(dealId: string, formData: FormData) {
  await requireAgent()
  const supabase = await createSupabaseServerActionClient()

  const status = String(formData.get('status') || '')
  const notes = String(formData.get('notes') || '').trim()

  if (!isPipelineStatus(status)) {
    throw new Error('Statut invalide.')
  }

  const { error } = await supabase
    .from('deals')
    .update({ status, notes: notes || null })
    .eq('id', dealId)

  if (error) {
    throw new Error(`Échec de la mise à jour du dossier : ${error.message}`)
  }

  revalidatePath('/partenaires/dashboard')
}
