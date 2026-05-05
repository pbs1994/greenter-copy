import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Commandes' }
export const dynamic = 'force-dynamic'

interface OrderRow {
  id: string
  order_number: string
  amount: number
  status: string
  created_at: string
  customer: { email: string; name: string | null } | null
}

async function load(): Promise<OrderRow[]> {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const { data, error } = await admin
    .from('orders')
    .select('id, order_number, amount, status, created_at, customer:customers(email, name)')
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) {
    console.error('orders load failed:', error)
    return []
  }
  return (data || []) as unknown as OrderRow[]
}

function formatEUR(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_BADGE: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default async function OrdersPage() {
  const orders = await load()
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Commandes</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {orders.length} commande{orders.length > 1 ? 's' : ''} (200 plus récentes)
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center text-sm text-neutral-500">
          Aucune commande pour le moment.
        </div>
      ) : (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Commande</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Montant</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((o) => (
                <tr key={o.id} className="text-sm">
                  <td className="px-4 py-3 font-mono text-xs text-neutral-700">{o.order_number}</td>
                  <td className="px-4 py-3 text-neutral-700">{formatDate(o.created_at)}</td>
                  <td className="px-4 py-3 text-neutral-700">
                    {o.customer ? (
                      <>
                        <span className="block">{o.customer.name || '—'}</span>
                        <span className="text-xs text-neutral-500">{o.customer.email}</span>
                      </>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{formatEUR(o.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${STATUS_BADGE[o.status] || 'bg-neutral-100 text-neutral-700'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/administrator/orders/${o.id}`}
                      className="text-sm text-green-700 hover:text-green-900">
                      Détails
                    </Link>
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
