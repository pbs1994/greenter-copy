import Link from 'next/link'
import { Users, Briefcase, Euro, TrendingUp, ArrowRight } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

interface NetworkStats {
  approvedAgents: number
  pendingAgents: number
  totalDeals: number
  wonDeals: number
  lostDeals: number
  // deals.amount is stored in plain euros (agents enter it by hand, no
  // Stripe involved here) — unlike products.price elsewhere on the site,
  // which is in cents.
  wonAmountEUR: number
  wonDevisCount: number
  wonAchatImmediatCount: number
}

interface RecentDeal {
  id: string
  client_name: string | null
  product: string | null
  amount: number | null
  status: string
  deal_type: 'devis' | 'achat_immediat'
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

async function loadStats(): Promise<NetworkStats> {
  const supabase = adminClient()

  const [
    { count: approvedAgents },
    { count: pendingAgents },
    { count: totalDeals },
    { count: wonDeals },
    { count: lostDeals },
    wonDealsData,
    { count: wonDevisCount },
    { count: wonAchatImmediatCount },
  ] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('deals').select('id', { count: 'exact', head: true }),
    supabase.from('deals').select('id', { count: 'exact', head: true }).eq('status', 'gagné'),
    supabase.from('deals').select('id', { count: 'exact', head: true }).eq('status', 'perdu'),
    supabase.from('deals').select('amount').eq('status', 'gagné'),
    supabase.from('deals').select('id', { count: 'exact', head: true }).eq('status', 'gagné').eq('deal_type', 'devis'),
    supabase.from('deals').select('id', { count: 'exact', head: true }).eq('status', 'gagné').eq('deal_type', 'achat_immediat'),
  ])

  const wonAmountEUR = (wonDealsData.data || []).reduce(
    (sum, row: { amount: number | null }) => sum + (row.amount || 0),
    0
  )

  return {
    approvedAgents: approvedAgents || 0,
    pendingAgents: pendingAgents || 0,
    totalDeals: totalDeals || 0,
    wonDeals: wonDeals || 0,
    lostDeals: lostDeals || 0,
    wonAmountEUR,
    wonDevisCount: wonDevisCount || 0,
    wonAchatImmediatCount: wonAchatImmediatCount || 0,
  }
}

async function loadRecentDeals(): Promise<RecentDeal[]> {
  const supabase = adminClient()
  const { data, error } = await supabase
    .from('deals')
    .select('id, client_name, product, amount, status, deal_type, created_at, agent:profiles!agent_id(full_name)')
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) {
    console.error('loadRecentDeals failed:', error)
    return []
  }

  return (data || []).map((d) => ({
    id: d.id,
    client_name: d.client_name,
    product: d.product,
    amount: d.amount,
    status: d.status,
    deal_type: d.deal_type,
    created_at: d.created_at,
    agent_full_name: (d.agent as unknown as { full_name: string | null } | null)?.full_name ?? null,
  }))
}

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

const DEAL_TYPE_LABEL: Record<string, string> = {
  devis: 'Devis',
  achat_immediat: 'Achat immédiat',
}

const DEAL_TYPE_BADGE: Record<string, string> = {
  devis: 'bg-purple-50 text-purple-700',
  achat_immediat: 'bg-sky-50 text-sky-700',
}

export default async function PartenairesAdminDashboard() {
  const [stats, recentDeals] = await Promise.all([loadStats(), loadRecentDeals()])
  const closedDeals = stats.wonDeals + stats.lostDeals
  const winRate = closedDeals > 0 ? Math.round((stats.wonDeals / closedDeals) * 100) : null

  const cards = [
    { label: 'Agents approuvés', value: stats.approvedAgents, icon: Users, accent: 'text-blue-600', sub: null },
    { label: 'Dossiers au total', value: stats.totalDeals, icon: Briefcase, accent: 'text-neutral-600', sub: null },
    {
      label: 'CA généré (gagnés)', value: formatEUR(stats.wonAmountEUR), icon: Euro, accent: 'text-emerald-600',
      sub: `${stats.wonDevisCount} devis · ${stats.wonAchatImmediatCount} achat${stats.wonAchatImmediatCount > 1 ? 's' : ''} immédiat${stats.wonAchatImmediatCount > 1 ? 's' : ''}`,
    },
    { label: 'Taux de transformation', value: winRate !== null ? `${winRate} %` : '—', icon: TrendingUp, accent: 'text-orange-600', sub: null },
  ]

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Réseau partenaires</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Vue d&apos;ensemble de l&apos;activité des agents.
          {stats.pendingAgents > 0 && (
            <> {stats.pendingAgents} agent{stats.pendingAgents > 1 ? 's' : ''} en attente d&apos;approbation.</>
          )}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, accent, sub }) => (
          <div key={label} className="bg-white rounded-xl ring-1 ring-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
              <Icon className={`w-4 h-4 ${accent}`} />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{value}</p>
            {sub && <p className="text-xs text-neutral-400 mt-1">{sub}</p>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-700">Derniers dossiers</h2>
          <Link href="/partenaires/admin/deals" className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900">
            Tout voir <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentDeals.length === 0 ? (
          <div className="p-12 text-center text-sm text-neutral-500">Aucun dossier pour le moment.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Agent</th>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Montant</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentDeals.map((d) => (
                <tr key={d.id} className="text-sm">
                  <td className="px-4 py-3 text-neutral-900">{d.client_name || '—'}</td>
                  <td className="px-4 py-3 text-neutral-700">{d.agent_full_name || '—'}</td>
                  <td className="px-4 py-3 text-neutral-700">{d.product || '—'}</td>
                  <td className="px-4 py-3 text-neutral-700">{d.amount ? formatEUR(d.amount) : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${DEAL_TYPE_BADGE[d.deal_type] || 'bg-neutral-100 text-neutral-700'}`}>
                      {DEAL_TYPE_LABEL[d.deal_type] || d.deal_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${STATUS_BADGE[d.status] || 'bg-neutral-100 text-neutral-700'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(d.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
