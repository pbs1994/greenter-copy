import { ShoppingBag, Wrench, Package, Euro } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

interface KPIs {
  productCount: number
  ordersThisMonth: number
  revenueThisMonthCents: number
  activeSubscriptions: number
}

async function loadKPIs(): Promise<KPIs> {
  // Service-role client so we read counts without RLS noise; never exposed to the browser.
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const startOfMonth = new Date()
  startOfMonth.setUTCDate(1)
  startOfMonth.setUTCHours(0, 0, 0, 0)
  const startIso = startOfMonth.toISOString()

  const [{ count: productCount }, { count: ordersThisMonth }, monthOrders, { count: activeSubscriptions }] =
    await Promise.all([
      admin.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
      admin.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', startIso),
      admin.from('orders').select('amount').gte('created_at', startIso).eq('status', 'paid'),
      admin.from('maintenance_subscriptions').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    ])

  const revenueThisMonthCents = (monthOrders.data || []).reduce(
    (sum, row: { amount: number | null }) => sum + (row.amount || 0),
    0
  )

  return {
    productCount: productCount || 0,
    ordersThisMonth: ordersThisMonth || 0,
    revenueThisMonthCents,
    activeSubscriptions: activeSubscriptions || 0,
  }
}

function formatEUR(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

export default async function AdminDashboard() {
  const kpis = await loadKPIs()

  const cards = [
    { label: 'Produits actifs', value: kpis.productCount, icon: Package, accent: 'text-blue-600' },
    { label: 'Commandes ce mois', value: kpis.ordersThisMonth, icon: ShoppingBag, accent: 'text-green-600' },
    { label: 'CA ce mois', value: formatEUR(kpis.revenueThisMonthCents), icon: Euro, accent: 'text-emerald-600' },
    { label: 'Abonnements actifs', value: kpis.activeSubscriptions, icon: Wrench, accent: 'text-orange-600' },
  ]

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Vue d&apos;ensemble de l&apos;activité Greenter.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className="bg-white rounded-xl ring-1 ring-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
              <Icon className={`w-4 h-4 ${accent}`} />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-6">
        <h2 className="text-sm font-semibold text-neutral-700 mb-3">Bienvenue</h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Utilisez le menu à gauche pour gérer les produits, les catégories, ou consulter les commandes
          et les abonnements maintenance. Les modifications de prix produit sont automatiquement
          répercutées sur Stripe.
        </p>
      </div>
    </div>
  )
}
