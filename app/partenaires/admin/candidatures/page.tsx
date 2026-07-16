import { UserCheck } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { approveAgent, rejectAgent } from '../actions'

export const metadata = { title: 'Candidatures' }
export const dynamic = 'force-dynamic'

interface SiretCheckSnapshot {
  siret: string
  denomination: string
  etatAdministratif: string
  natureJuridique: string
  active: boolean
  checkedAt: string
}

interface Candidature {
  id: string
  full_name: string | null
  email: string
  siret: string | null
  siret_verified: boolean
  siret_check: SiretCheckSnapshot | null
  contract_version: string | null
  contract_accepted_at: string | null
  created_at: string
}

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

async function loadCandidatures(): Promise<Candidature[]> {
  const supabase = adminClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, siret, siret_verified, siret_check, contract_version, contract_accepted_at, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('loadCandidatures (profiles) failed:', error)
    return []
  }
  if (!profiles || profiles.length === 0) return []

  // profiles n'a pas de colonne email par design (voir agents/page.tsx) —
  // seule l'Auth Admin API (service-role) donne accès à auth.users.
  const { data: usersPage, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  if (usersError) {
    console.error('loadCandidatures (listUsers) failed:', usersError)
  }
  const emailById = new Map((usersPage?.users || []).map((u) => [u.id, u.email || '—']))

  return profiles.map((p) => ({
    id: p.id,
    full_name: p.full_name,
    email: emailById.get(p.id) || '—',
    siret: p.siret,
    siret_verified: p.siret_verified,
    siret_check: p.siret_check as SiretCheckSnapshot | null,
    contract_version: p.contract_version,
    contract_accepted_at: p.contract_accepted_at,
    created_at: p.created_at,
  }))
}

function formatDateTime(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Paris',
  })
}

export default async function PartenairesAdminCandidaturesPage() {
  const candidatures = await loadCandidatures()

  return (
    <div>
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl font-bold text-neutral-900">Candidatures</h1>
        </div>
        <p className="text-sm text-neutral-500 mt-2 max-w-3xl">
          Comptes créés via l&apos;inscription publique, en attente d&apos;approbation. Le SIRET a
          déjà été vérifié automatiquement (actif) avant la création du compte — la catégorie
          juridique ci-dessous est indicative, à vous de juger si elle correspond à un profil
          d&apos;apporteur d&apos;affaires acceptable.
        </p>
      </header>

      {candidatures.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center text-sm text-neutral-500">
          Aucune candidature en attente. 🎉
        </div>
      ) : (
        <div className="space-y-4">
          {candidatures.map((c) => (
            <div key={c.id} className="bg-white rounded-xl ring-1 ring-neutral-200 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{c.full_name || '—'}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{c.email}</p>
                </div>
                <span className="text-xs text-neutral-400 shrink-0">Candidature du {formatDateTime(c.created_at)}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-neutral-500 mb-1">SIRET</p>
                  <p className="font-mono text-neutral-900">{c.siret || '—'}</p>
                  {c.siret_check ? (
                    <div className="mt-2 space-y-0.5 text-xs text-neutral-600">
                      <p>{c.siret_check.denomination}</p>
                      <p>
                        Statut :{' '}
                        <span className={c.siret_check.active ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                          {c.siret_check.active ? 'actif' : 'fermé'}
                        </span>
                      </p>
                      <p>Catégorie juridique : {c.siret_check.natureJuridique}</p>
                      <p>Vérifié le {formatDateTime(c.siret_check.checkedAt)}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-red-600">Aucun instantané de vérification disponible.</p>
                  )}
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-neutral-500 mb-1">Contrat</p>
                  {c.contract_accepted_at ? (
                    <p className="text-xs text-neutral-600">
                      Accepté le {formatDateTime(c.contract_accepted_at)}
                      {c.contract_version && <> — version {c.contract_version}</>}
                    </p>
                  ) : (
                    <p className="text-xs text-red-600">Non accepté.</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <form action={approveAgent.bind(null, c.id)}>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    Approuver
                  </button>
                </form>
                <form action={rejectAgent.bind(null, c.id)}>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                  >
                    Rejeter
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
