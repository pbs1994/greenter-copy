import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { ProductForm } from '../_components/ProductForm'

export const metadata = { title: 'Nouveau produit' }
export const dynamic = 'force-dynamic'

async function loadCategories() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const { data } = await admin.from('categories').select('id, name').order('name')
  return data || []
}

export default async function NewProductPage() {
  const categories = await loadCategories()
  return (
    <div>
      <Link href="/administrator/products" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-2">
        <ChevronLeft className="w-3.5 h-3.5" />
        Produits
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Nouveau produit</h1>
      <ProductForm mode="create" categories={categories} />
    </div>
  )
}
