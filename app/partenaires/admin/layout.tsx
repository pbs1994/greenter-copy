import Link from 'next/link'
import { LayoutDashboard, Users, Briefcase, AlertTriangle, LogOut } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-auth'

export const metadata = {
  title: { default: 'Admin réseau · Espace Partenaires · Greenter', template: '%s · Admin réseau · Greenter' },
  robots: { index: false, follow: false },
}

const NAV = [
  { href: '/partenaires/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/partenaires/admin/agents', label: 'Agents', icon: Users },
  { href: '/partenaires/admin/deals', label: 'Dossiers', icon: Briefcase },
  { href: '/partenaires/admin/action-requise', label: 'Action requise', icon: AlertTriangle },
] as const

async function countActionRequired(): Promise<number> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const { count } = await supabase
    .from('deals')
    .select('id', { count: 'exact', head: true })
    .eq('source', 'agent_link_call')
    .not('status', 'in', '("gagné","perdu")')

  return count || 0
}

export default async function PartenairesAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()
  const actionRequiredCount = await countActionRequired()

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Sidebar — desktop only (md+). On mobile this would eat most of a
          375px-wide screen at a fixed 240px, so it's replaced below by a
          compact top bar instead of just shrinking in place. */}
      <aside className="hidden md:flex md:w-60 md:shrink-0 bg-white border-r border-neutral-200 flex-col">
        <div className="px-6 py-5 border-b border-neutral-200">
          <Link href="/partenaires/admin" className="font-heading text-lg font-bold text-green-800">
            Greenter
          </Link>
          <p className="text-xs text-neutral-500 mt-0.5">Réseau partenaires</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
              {href === '/partenaires/admin/action-requise' && actionRequiredCount > 0 && (
                <span className="ml-auto inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                  {actionRequiredCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-neutral-200 space-y-2">
          <div className="px-3 py-1">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Connecté</p>
            <p className="text-sm text-neutral-700 truncate">{user.email}</p>
          </div>
          <form action="/api/auth/logout?next=/partenaires/login" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-700 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* Top bar — mobile only, same links as a horizontally-scrollable
          pill row instead of a stacked sidebar menu. */}
      <header className="md:hidden bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/partenaires/admin" className="font-heading text-base font-bold text-green-800">
            Greenter <span className="font-normal text-xs text-neutral-400">· Partenaires</span>
          </Link>
          <form action="/api/auth/logout?next=/partenaires/login" method="POST">
            <button
              type="submit"
              className="p-1.5 rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-700 transition-colors"
              aria-label="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
        <nav className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {href === '/partenaires/admin/action-requise' && actionRequiredCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold">
                  {actionRequiredCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
