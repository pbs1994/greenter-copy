import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Agents' }
export const dynamic = 'force-dynamic'

interface AgentRow {
  id: string
  full_name: string | null
  email: string
  status: 'pending' | 'approved' | 'suspended'
  referral_code: string
  commission_rate: number
  created_at: string
}

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

async function loadAgents(): Promise<AgentRow[]> {
  const supabase = adminClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, status, referral_code, commission_rate, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('loadAgents (profiles) failed:', error)
    return []
  }
  if (!profiles || profiles.length === 0) return []

  // profiles has no email column by design (it's not the source of truth
  // for identity) — emails live in auth.users, only reachable via the Auth
  // Admin API with the service-role key.
  const { data: usersPage, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  if (usersError) {
    console.error('loadAgents (listUsers) failed:', usersError)
  }
  const emailById = new Map((usersPage?.users || []).map((u) => [u.id, u.email || '—']))

  return profiles.map((p) => ({
    id: p.id,
    full_name: p.full_name,
    email: emailById.get(p.id) || '—',
    status: p.status,
    referral_code: p.referral_code,
    commission_rate: p.commission_rate,
    created_at: p.created_at,
  }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_BADGE: Record<string, string> = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  suspended: 'bg-red-100 text-red-800',
}

export default async function PartenairesAdminAgentsPage() {
  const agents = await loadAgents()

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Agents</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {agents.length} agent{agents.length > 1 ? 's' : ''} dans le réseau.
        </p>
      </header>

      {agents.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center text-sm text-neutral-500">
          Aucun agent pour le moment. Ajoutez-en un depuis Supabase (Authentication → Users), puis
          insérez sa ligne dans <code className="font-mono text-xs">public.profiles</code>.
        </div>
      ) : (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Code parrainage</th>
                <th className="px-4 py-3 font-medium">Commission</th>
                <th className="px-4 py-3 font-medium">Depuis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {agents.map((a) => (
                <tr key={a.id} className="text-sm">
                  <td className="px-4 py-3 text-neutral-900">{a.full_name || '—'}</td>
                  <td className="px-4 py-3 text-neutral-700">{a.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${STATUS_BADGE[a.status] || 'bg-neutral-100 text-neutral-700'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-700">{a.referral_code}</td>
                  <td className="px-4 py-3 text-neutral-700">{a.commission_rate} %</td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(a.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
