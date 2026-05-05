import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { ServicesManager, OptionsManager } from './MaintenanceManager'

export const metadata = { title: 'Maintenance' }
export const dynamic = 'force-dynamic'

interface ServiceRow {
  id: string
  name: string
  slug: string
  price_monthly: number
  is_active: boolean
  sort_order: number | null
}

interface OptionRow {
  id: string
  name: string
  slug: string
  price_monthly: number
  is_active: boolean
  is_flat_fee: boolean
  exempt_from_discount: boolean
  sort_order: number | null
}

async function load() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const [services, options, subsCount] = await Promise.all([
    admin
      .from('maintenance_services')
      .select('id, name, slug, price_monthly, is_active, sort_order')
      .order('sort_order', { ascending: true })
      .order('name'),
    admin
      .from('maintenance_options')
      .select('id, name, slug, price_monthly, is_active, is_flat_fee, exempt_from_discount, sort_order')
      .order('sort_order', { ascending: true })
      .order('name'),
    admin
      .from('maintenance_subscriptions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active'),
  ])

  return {
    services: (services.data || []) as ServiceRow[],
    options: (options.data || []) as OptionRow[],
    activeSubsCount: subsCount.count || 0,
  }
}

export default async function MaintenancePage() {
  const { services, options, activeSubsCount } = await load()

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Maintenance</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Services et options proposés sur la page <code className="font-mono text-xs">/services/maintenance</code>.
          </p>
        </div>
        <Link
          href="/administrator/maintenance/abonnements"
          className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-900 px-4 py-2 rounded-lg ring-1 ring-green-200 bg-green-50/50 hover:bg-green-50"
        >
          {activeSubsCount} abonnement{activeSubsCount > 1 ? 's' : ''} actif{activeSubsCount > 1 ? 's' : ''}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-3">
          Services ({services.length})
        </h2>
        <ServicesManager initial={services} />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-3">
          Options ({options.length})
        </h2>
        <OptionsManager initial={options} />
      </section>
    </div>
  )
}
