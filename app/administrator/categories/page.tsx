import { createClient } from '@supabase/supabase-js'
import { CategoryManager } from './CategoryManager'

export const metadata = { title: 'Catégories' }
export const dynamic = 'force-dynamic'

interface CategoryRow {
  id: string
  name: string
  slug: string
  productCount: number
}

async function load(): Promise<CategoryRow[]> {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { data: categories } = await admin
    .from('categories')
    .select('id, name, slug')
    .order('name')

  if (!categories) return []

  // Count products per category. Single roundtrip via group-by would be
  // nicer, but the small number of categories here makes parallel HEAD
  // counts fine.
  const counts = await Promise.all(
    categories.map(async (c) => {
      const { count } = await admin
        .from('products')
        .select('id', { count: 'exact', head: true })
        .eq('category_id', c.id)
      return { id: c.id, count: count || 0 }
    })
  )

  return categories.map((c) => ({
    ...c,
    productCount: counts.find((x) => x.id === c.id)?.count || 0,
  }))
}

export default async function CategoriesPage() {
  const categories = await load()
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Catégories</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {categories.length} catégorie{categories.length > 1 ? 's' : ''}
        </p>
      </header>
      <CategoryManager initial={categories} />
    </div>
  )
}
