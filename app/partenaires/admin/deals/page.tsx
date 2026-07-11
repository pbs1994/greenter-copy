import { createClient } from '@supabase/supabase-js'
import { closeDeal } from '../actions'

export const metadata = { title: 'Dossiers' }
export const dynamic = 'force-dynamic'

interface DealRow {
  id: string
  client_name: string | null
  client_phone: string | null
  product: string | null
  amount: number | null
  status: string
  source: string | null
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

async function loadDeals(): Promise<DealRow[]> {
  const supabase = adminClient()
  const { data, error } = await supabase
    .from('deals')
    .select('id, client_name, client_phone, product, amount, status, source, created_at, agent:profiles!agent_id(full_name)')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    console.error('loadDeals failed:', error)
    return []
  }

  return (data || []).map((d) => ({
    id: d.id,
    client_name: d.client_name,
    client_phone: d.client_phone,
    product: d.product,
    amount: d.amount,
    status: d.status,
    source: d.source,
    created_at: d.created_at,
    agent_full_name: (d.agent as unknown as { full_name: string | null } | null)?.full_name ?? null,
  }))
}

// deals.amount is stored in plain euros (agents enter it by hand, no
// Stripe involved here) — unlike products.price elsewhere on the site.
function formatEUR(amount: number) {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_BADGE: Record<string, string> = {
  nouveau: 'bg-neutral-100 text-neutral-700',
  'contacté': 'bg-blue-100 text-blue-800',
  'devis_envoyé': 'bg-amber-100 text-amber-800',
  'gagné': 'bg-green-100 text-green-800',
  perdu: 'bg-red-100 text-red-800',
}

const FINAL_STATUSES = new Set(['gagné', 'perdu'])

export default async function PartenairesAdminDealsPage() {
  const deals = await loadDeals()

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Dossiers</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {deals.length} dossier{deals.length > 1 ? 's' : ''} (200 plus récents). Clôturer un dossier
          en gagné déclenchera le calcul de la commission de l&apos;agent (à venir).
        </p>
      </header>

      {deals.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center text-sm text-neutral-500">
          Aucun dossier pour le moment.
        </div>
      ) : (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Agent</th>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Montant</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {deals.map((d) => (
                <tr key={d.id} className="text-sm">
                  <td className="px-4 py-3 text-neutral-900">
                    <span className="block">{d.client_name || '—'}</span>
                    {d.client_phone && <span className="text-xs text-neutral-500">{d.client_phone}</span>}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{d.agent_full_name || '—'}</td>
                  <td className="px-4 py-3 text-neutral-700">{d.product || '—'}</td>
                  <td className="px-4 py-3 text-neutral-700">{d.amount ? formatEUR(d.amount) : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${STATUS_BADGE[d.status] || 'bg-neutral-100 text-neutral-700'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(d.created_at)}</td>
                  <td className="px-4 py-3">
                    {FINAL_STATUSES.has(d.status) ? (
                      <span className="text-xs text-neutral-400">Clôturé</span>
                    ) : (
                      <div className="flex gap-2">
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
                            Perdu
                          </button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
