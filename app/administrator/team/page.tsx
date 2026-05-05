import { createClient } from '@supabase/supabase-js'
import { getAdminUser } from '@/lib/admin-auth'
import { TeamManager } from './TeamManager'

export const metadata = { title: 'Équipe' }
export const dynamic = 'force-dynamic'

interface AdminRow {
  email: string
  created_at: string
  added_by: string | null
}

async function load(): Promise<AdminRow[]> {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const { data } = await admin
    .from('admins')
    .select('email, created_at, added_by')
    .order('created_at', { ascending: true })
  return data || []
}

export default async function TeamPage() {
  const me = await getAdminUser()
  const admins = await load()
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Équipe</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Les emails ci-dessous peuvent se connecter à l&apos;administration.
        </p>
      </header>
      <TeamManager admins={admins} currentEmail={me?.email || ''} />
    </div>
  )
}
