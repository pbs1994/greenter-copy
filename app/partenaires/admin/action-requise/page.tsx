import { AlertTriangle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { closeDeal, updateDealClientInfo } from '../actions'

export const metadata = { title: 'Action requise' }
export const dynamic = 'force-dynamic'

interface ActionRequiredDeal {
  id: string
  client_name: string | null
  client_phone: string | null
  client_email: string | null
  amount: number | null
  status: string
  notes: string | null
  created_at: string
  agent_full_name: string | null
}

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

// Deals atterrissent ici seulement s'ils viennent d'un clic sur le bouton
// "Appeler" attribué à un agent (voir /api/track-call-click) : un tel:
// clic ne révèle ni le nom ni le téléphone du client, contrairement à un
// formulaire de contact (déjà exploitable tel quel dans le kanban de
// l'agent) ou un achat immédiat (déjà clôturé). Ces dossiers-là ont
// vraiment besoin d'un humain pour rapprocher le clic d'un appel entrant
// reçu vers la même heure.
async function loadActionRequiredDeals(): Promise<ActionRequiredDeal[]> {
  const supabase = adminClient()
  const { data, error } = await supabase
    .from('deals')
    .select('id, client_name, client_phone, client_email, amount, status, notes, created_at, agent:profiles!agent_id(full_name)')
    .eq('source', 'agent_link_call')
    .not('status', 'in', '("gagné","perdu")')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('loadActionRequiredDeals failed:', error)
    return []
  }

  return (data || []).map((d) => ({
    id: d.id,
    client_name: d.client_name,
    client_phone: d.client_phone,
    client_email: d.client_email,
    amount: d.amount,
    status: d.status,
    notes: d.notes,
    created_at: d.created_at,
    agent_full_name: (d.agent as unknown as { full_name: string | null } | null)?.full_name ?? null,
  }))
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function ActionRequisePage() {
  const deals = await loadActionRequiredDeals()

  return (
    <div>
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl font-bold text-neutral-900">Action requise</h1>
        </div>
        <p className="text-sm text-neutral-500 mt-2 max-w-3xl">
          Ces {deals.length} dossier{deals.length > 1 ? 's' : ''} viennent d&apos;un clic sur un bouton
          « Appeler » par un visiteur attribué à un agent — un clic ne dit pas si l&apos;appel a
          vraiment eu lieu, ni qui appelle. Rapprochez chaque ligne d&apos;un appel entrant reçu vers
          l&apos;heure indiquée, renseignez les coordonnées du client puis faites avancer le dossier ;
          ou marquez-le <strong>Perdu</strong> si aucun appel ne correspond.
        </p>
      </header>

      {deals.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center text-sm text-neutral-500">
          Aucun dossier en attente de rapprochement. 🎉
        </div>
      ) : (
        <div className="space-y-4">
          {deals.map((d) => (
            <div key={d.id} className="bg-white rounded-xl ring-1 ring-neutral-200 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Agent : {d.agent_full_name || '—'}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">{d.notes || '—'}</p>
                </div>
                <span className="text-xs text-neutral-400 shrink-0">{formatDateTime(d.created_at)}</span>
              </div>

              <form action={updateDealClientInfo.bind(null, d.id)} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Nom du client</label>
                  <input
                    name="client_name" type="text" defaultValue={d.client_name || ''}
                    placeholder="Nom du client"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Téléphone</label>
                  <input
                    name="client_phone" type="tel" defaultValue={d.client_phone || ''}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Email</label>
                  <input
                    name="client_email" type="email" defaultValue={d.client_email || ''}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Montant (€)</label>
                  <input
                    name="amount" type="number" min="0" step="0.01" defaultValue={d.amount ?? ''}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <select
                    name="status" defaultValue={d.status}
                    className="flex-1 border border-neutral-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="contacté">Contacté</option>
                    <option value="devis_envoyé">Devis envoyé</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shrink-0"
                  >
                    OK
                  </button>
                </div>
              </form>

              <div className="flex gap-2 mt-3">
                <form action={closeDeal.bind(null, d.id, 'gagné')}>
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    Gagné
                  </button>
                </form>
                <form action={closeDeal.bind(null, d.id, 'perdu')}>
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                  >
                    Aucun appel reçu — Perdu
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
