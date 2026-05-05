import Link from 'next/link'
import { LayoutDashboard, Package, FolderTree, ShoppingBag, Wrench, Users, LogOut } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-auth'

export const metadata = {
  title: { default: 'Administration · Greenter', template: '%s · Administration · Greenter' },
  robots: { index: false, follow: false },
}

const NAV = [
  { href: '/administrator', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/administrator/products', label: 'Produits', icon: Package },
  { href: '/administrator/categories', label: 'Catégories', icon: FolderTree },
  { href: '/administrator/orders', label: 'Commandes', icon: ShoppingBag },
  { href: '/administrator/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/administrator/team', label: 'Équipe', icon: Users },
] as const

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-neutral-200 flex flex-col">
        <div className="px-6 py-5 border-b border-neutral-200">
          <Link href="/administrator" className="font-heading text-lg font-bold text-green-800">
            Greenter
          </Link>
          <p className="text-xs text-neutral-500 mt-0.5">Administration</p>
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
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-neutral-200 space-y-2">
          <div className="px-3 py-1">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Connecté</p>
            <p className="text-sm text-neutral-700 truncate">{user.email}</p>
          </div>
          <form action="/api/auth/logout" method="POST">
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

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
