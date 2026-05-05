import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Maintenance' }
export const dynamic = 'force-dynamic'

interface SubRow {
  id: string
  stripe_subscription_id: string | null
  billing_period: string
  status: string
  total_after_discounts: number
  created_at: string
  cancelled_at: string | null
  customer: { email: string; name: string | null } | null
}

async function load(): Promise<SubRow[]> {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const { data, error } = await admin
    .from('maintenance_subscriptions')
    .select('id, stripe_subscription_id, billing_period, status, total_after_discounts, created_at, cancelled_at, customer:customers(email, name)')
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) {
    console.error('subs load failed:', error)
    return []
  }
  return (data || []) as unknown as SubRow[]
}

function formatEUR(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_BADGE: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  past_due: 'bg-yellow-100 text-yellow-800',
  paused: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-neutral-200 text-neutral-700',
}

export default async function MaintenancePage() {
  const subs = await load()
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Abonnements maintenance</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {subs.length} abonnement{subs.length > 1 ? 's' : ''}
        </p>
      </header>

      {subs.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center text-sm text-neutral-500">
          Aucun abonnement maintenance pour le moment.
        </div>
      ) : (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Période</th>
                <th className="px-4 py-3 font-medium">Montant</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Souscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {subs.map((s) => (
                <tr key={s.id} className="text-sm">
                  <td className="px-4 py-3 text-neutral-700">
                    {s.customer ? (
                      <>
                        <span className="block text-neutral-900">{s.customer.name || '—'}</span>
                        <span className="text-xs text-neutral-500">{s.customer.email}</span>
                      </>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {s.billing_period === 'yearly' ? 'Annuel' : 'Mensuel'}
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{formatEUR(s.total_after_discounts)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${STATUS_BADGE[s.status] || 'bg-neutral-100 text-neutral-700'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
