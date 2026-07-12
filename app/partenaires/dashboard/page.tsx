import { Phone, Mail, Plus, Euro, Briefcase, TrendingUp, FileText, Paperclip } from 'lucide-react'
import { requireAgent } from '@/lib/partenaires-auth'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { createLead, updateDeal } from './actions'
import { ReferralLinkCard } from './ReferralLinkCard'

export const metadata = {
  title: 'Tableau de bord · Espace Partenaires · Greenter',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

interface Deal {
  id: string
  client_name: string | null
  client_phone: string | null
  client_email: string | null
  product: string | null
  amount: number | null
  status: string
  deal_type: 'devis' | 'achat_immediat'
  notes: string | null
  created_at: string
  closed_at: string | null
  devis_pdf_path: string | null
  devis_pdf_url: string | null
}

const PIPELINE_COLUMNS = [
  { status: 'nouveau', label: 'Nouveau' },
  { status: 'contacté', label: 'Contacté' },
  { status: 'devis_envoyé', label: 'Devis envoyé' },
] as const

const PRODUCTS = [
  { value: 'PAC', label: 'Pompe à chaleur' },
  { value: 'panneaux_solaires', label: 'Panneaux solaires' },
  { value: 'isolation', label: 'Isolation' },
  { value: 'audit', label: 'Audit énergétique' },
]

const DEAL_TYPE_LABEL: Record<string, string> = {
  devis: 'Devis',
  achat_immediat: 'Achat immédiat',
}

const DEAL_TYPE_BADGE: Record<string, string> = {
  devis: 'bg-purple-50 text-purple-700',
  achat_immediat: 'bg-sky-50 text-sky-700',
}

async function loadOwnDeals(): Promise<Deal[]> {
  // Own session client, not service-role: RLS ("approved agents select
  // own deals") already restricts this to the signed-in agent's rows, and
  // ("agents and admin read devis pdf") does the same for the PDF below.
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('deals')
    .select('id, client_name, client_phone, client_email, product, amount, status, deal_type, notes, created_at, closed_at, devis_pdf_path')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('loadOwnDeals failed:', error)
    return []
  }

  const deals = (data || []) as Omit<Deal, 'devis_pdf_url'>[]

  // Private bucket — a signed URL is required for each attached PDF,
  // short-lived on purpose (this page is re-rendered fresh every visit).
  return Promise.all(
    deals.map(async (d) => {
      if (!d.devis_pdf_path) return { ...d, devis_pdf_url: null }
      const { data: signed } = await supabase.storage
        .from('devis-pdfs')
        .createSignedUrl(d.devis_pdf_path, 3600)
      return { ...d, devis_pdf_url: signed?.signedUrl ?? null }
    })
  )
}

function formatEUR(amount: number) {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function productLabel(value: string | null) {
  return PRODUCTS.find((p) => p.value === value)?.label || value || '—'
}

export default async function PartenairesDashboardPage() {
  const agent = await requireAgent()
  const deals = await loadOwnDeals()
  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL}/?ref=${agent.referral_code}`

  const pipelineDeals = deals.filter((d) => d.deal_type === 'devis' && PIPELINE_COLUMNS.some((c) => c.status === d.status))
  const closedDeals = deals
    .filter((d) => d.status === 'gagné' || d.status === 'perdu')
    .sort((a, b) => (b.closed_at || b.created_at).localeCompare(a.closed_at || a.created_at))

  const wonDeals = deals.filter((d) => d.status === 'gagné')
  // Ce que touche l'agent, pas le chiffre d'affaires de Greenter : la
  // commission est calculée sur le montant de chaque vente gagnée, au
  // taux propre à cet agent (profiles.commission_rate).
  const commissionEUR = wonDeals.reduce(
    (sum, d) => sum + (d.amount || 0) * (agent.commission_rate / 100),
    0
  )
  const lostCount = deals.filter((d) => d.status === 'perdu').length
  const closedCount = wonDeals.length + lostCount
  const winRate = closedCount > 0 ? Math.round((wonDeals.length / closedCount) * 100) : null

  const stats = [
    { label: 'Dossiers actifs', value: pipelineDeals.length, icon: Briefcase, accent: 'text-blue-600' },
    { label: 'Ventes gagnées', value: wonDeals.length, icon: TrendingUp, accent: 'text-green-600' },
    { label: 'Ma commission', value: formatEUR(commissionEUR), icon: Euro, accent: 'text-emerald-600' },
    { label: 'Taux de transformation', value: winRate !== null ? `${winRate} %` : '—', icon: TrendingUp, accent: 'text-orange-600' },
  ]

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-neutral-900">
              Bienvenue{agent.full_name ? `, ${agent.full_name}` : ''}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Votre code partenaire : <span className="font-mono font-semibold text-neutral-700">{agent.referral_code}</span>
              {' '}· Commission {agent.commission_rate} %
            </p>
          </div>
          <form action="/api/auth/logout?next=/partenaires/login" method="post">
            <button
              type="submit"
              className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
            >
              Se déconnecter
            </button>
          </form>
        </div>

        {/* Lien de parrainage */}
        <ReferralLinkCard link={referralLink} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="bg-white rounded-xl ring-1 ring-neutral-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
                <Icon className={`w-4 h-4 ${accent}`} />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Ajouter un lead */}
        <details className="bg-white rounded-xl ring-1 ring-neutral-200 mb-8 group">
          <summary className="flex items-center gap-2 px-6 py-4 cursor-pointer text-sm font-semibold text-neutral-700 select-none">
            <Plus className="w-4 h-4 text-green-600" />
            Ajouter un lead (appel à froid)
          </summary>
          <form action={createLead} className="px-6 pb-6 pt-2 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Nom du client *</label>
              <input
                name="client_name" required type="text"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Téléphone</label>
              <input
                name="client_phone" type="tel"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Email</label>
              <input
                name="client_email" type="email"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Produit</label>
              <select
                name="product"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">—</option>
                {PRODUCTS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Montant estimé (€)</label>
              <input
                name="amount" type="number" min="0" step="0.01" placeholder="ex. 8500"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-neutral-600 mb-1">Notes</label>
              <textarea
                name="notes" rows={2}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" /> Créer le dossier
              </button>
            </div>
          </form>
        </details>

        {/* Kanban */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {PIPELINE_COLUMNS.map((col) => {
            const colDeals = pipelineDeals.filter((d) => d.status === col.status)
            return (
              <div key={col.status} className="bg-white rounded-xl ring-1 ring-neutral-200 flex flex-col">
                <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-neutral-700">{col.label}</h2>
                  <span className="text-xs text-neutral-400">{colDeals.length}</span>
                </div>
                <div className="p-3 space-y-3 flex-1">
                  {colDeals.length === 0 ? (
                    <p className="text-xs text-neutral-400 text-center py-6">Aucun dossier</p>
                  ) : (
                    colDeals.map((d) => (
                      <form
                        key={d.id}
                        action={updateDeal.bind(null, d.id)}
                        encType="multipart/form-data"
                        className="rounded-lg border border-neutral-100 bg-neutral-50 p-3 space-y-2"
                      >
                        <p className="text-sm font-semibold text-neutral-900">{d.client_name || '—'}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
                          {d.client_phone && (
                            <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {d.client_phone}</span>
                          )}
                          {d.client_email && (
                            <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> {d.client_email}</span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">
                          {productLabel(d.product)}{d.amount ? ` · ${formatEUR(d.amount)}` : ''}
                        </p>
                        <textarea
                          name="notes"
                          defaultValue={d.notes || ''}
                          placeholder="Notes..."
                          rows={2}
                          className="w-full border border-neutral-200 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 resize-none bg-white"
                        />

                        {/* Devis PDF */}
                        <div className="space-y-1">
                          {d.devis_pdf_url ? (
                            <a
                              href={d.devis_pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 underline underline-offset-2"
                            >
                              <FileText className="w-3 h-3" /> Voir le PDF joint
                            </a>
                          ) : (
                            <p className="text-xs text-neutral-400 inline-flex items-center gap-1">
                              <Paperclip className="w-3 h-3" /> Aucun devis joint
                            </p>
                          )}
                          <input
                            type="file"
                            name="devis_pdf"
                            accept="application/pdf"
                            className="block w-full text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            name="status"
                            defaultValue={d.status}
                            className="flex-1 border border-neutral-200 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                          >
                            {PIPELINE_COLUMNS.map((c) => (
                              <option key={c.status} value={c.status}>{c.label}</option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            OK
                          </button>
                        </div>
                      </form>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Dossiers clôturés */}
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-700">Dossiers clôturés</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Statut décidé par l&apos;administrateur (devis) ou automatique (achat immédiat en boutique) — lecture seule.
            </p>
          </div>

          {closedDeals.length === 0 ? (
            <div className="p-10 text-center text-sm text-neutral-500">Aucun dossier clôturé pour le moment.</div>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Produit</th>
                  <th className="px-4 py-3 font-medium">Montant</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Résultat</th>
                  <th className="px-4 py-3 font-medium">Clôturé le</th>
                  <th className="px-4 py-3 font-medium">Devis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {closedDeals.map((d) => (
                  <tr key={d.id} className="text-sm">
                    <td className="px-4 py-3 text-neutral-900">{d.client_name || '—'}</td>
                    <td className="px-4 py-3 text-neutral-700">{productLabel(d.product)}</td>
                    <td className="px-4 py-3 text-neutral-700">{d.amount ? formatEUR(d.amount) : '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${DEAL_TYPE_BADGE[d.deal_type]}`}>
                        {DEAL_TYPE_LABEL[d.deal_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${d.status === 'gagné' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{formatDate(d.closed_at || d.created_at)}</td>
                    <td className="px-4 py-3">
                      {d.devis_pdf_url ? (
                        <a
                          href={d.devis_pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 underline underline-offset-2"
                        >
                          <FileText className="w-3 h-3" /> PDF
                        </a>
                      ) : (
                        <span className="text-xs text-neutral-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
