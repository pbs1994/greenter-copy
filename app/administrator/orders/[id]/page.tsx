import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Détail commande' }
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

async function load(id: string) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const [{ data: order }, { data: items }] = await Promise.all([
    admin
      .from('orders')
      .select('id, order_number, amount, status, created_at, shipping_address, billing_address, stripe_session_id, customer:customers(email, name, phone)')
      .eq('id', id)
      .maybeSingle(),
    admin
      .from('order_items')
      .select('id, product_name, quantity, unit_price')
      .eq('order_id', id),
  ])

  return { order, items: items || [] }
}

function formatEUR(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })
}

interface AddressShape {
  line1?: string
  line2?: string
  city?: string
  postal_code?: string
  country?: string
}

function formatAddress(addr: AddressShape | null | undefined): string {
  if (!addr) return '—'
  return [addr.line1, addr.line2, [addr.postal_code, addr.city].filter(Boolean).join(' '), addr.country]
    .filter(Boolean)
    .join(', ')
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params
  const { order, items } = await load(id)
  if (!order) notFound()

  const customer = (order as unknown as { customer: { email: string; name: string | null; phone: string | null } | null }).customer

  return (
    <div>
      <Link href="/administrator/orders" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-2">
        <ChevronLeft className="w-3.5 h-3.5" />
        Commandes
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Commande {order.order_number}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-xl ring-1 ring-neutral-200 p-6">
          <h2 className="text-sm font-semibold text-neutral-700 mb-4">Articles</h2>
          {items.length === 0 ? (
            <p className="text-sm text-neutral-500">Aucun article enregistré.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr><th className="pb-2 font-medium">Produit</th><th className="pb-2 font-medium">Qté</th><th className="pb-2 font-medium text-right">Prix</th></tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-2 text-neutral-900">{it.product_name}</td>
                    <td className="py-2 text-neutral-700">{it.quantity}</td>
                    <td className="py-2 text-right font-medium text-neutral-900">{formatEUR(it.unit_price * it.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-200">
                  <td colSpan={2} className="pt-3 font-semibold text-neutral-900">Total TTC</td>
                  <td className="pt-3 text-right font-bold text-neutral-900">{formatEUR(order.amount)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </section>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6">
            <h2 className="text-sm font-semibold text-neutral-700 mb-3">Statut</h2>
            <p className="text-sm text-neutral-900 capitalize">{order.status}</p>
            <p className="text-xs text-neutral-500 mt-2">Créée le {formatDateTime(order.created_at)}</p>
            {order.stripe_session_id && (
              <p className="text-xs text-neutral-500 font-mono mt-2 break-all">{order.stripe_session_id}</p>
            )}
          </div>

          <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6">
            <h2 className="text-sm font-semibold text-neutral-700 mb-3">Client</h2>
            {customer ? (
              <div className="text-sm text-neutral-900 space-y-1">
                {customer.name && <p>{customer.name}</p>}
                <p className="text-neutral-700">{customer.email}</p>
                {customer.phone && <p className="text-neutral-700">{customer.phone}</p>}
              </div>
            ) : <p className="text-sm text-neutral-500">—</p>}
          </div>

          <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6">
            <h2 className="text-sm font-semibold text-neutral-700 mb-2">Livraison</h2>
            <p className="text-sm text-neutral-700">{formatAddress(order.shipping_address as AddressShape | null)}</p>
            <h2 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">Facturation</h2>
            <p className="text-sm text-neutral-700">{formatAddress(order.billing_address as AddressShape | null)}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
