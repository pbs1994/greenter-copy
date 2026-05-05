import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, CheckCircle2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { ProductForm } from '../../_components/ProductForm'

export const metadata = { title: 'Modifier produit' }
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string; stripe_warning?: string }>
}

async function load(id: string) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const [{ data: product }, { data: categories }] = await Promise.all([
    admin.from('products').select('*').eq('id', id).maybeSingle(),
    admin.from('categories').select('id, name').order('name'),
  ])
  return { product, categories: categories || [] }
}

export default async function EditProductPage({ params, searchParams }: Props) {
  const { id } = await params
  const { created, stripe_warning } = await searchParams
  const { product, categories } = await load(id)
  if (!product) notFound()

  return (
    <div>
      <Link href="/administrator/products" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-2">
        <ChevronLeft className="w-3.5 h-3.5" />
        Produits
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">{product.name}</h1>

      {created === '1' && !stripe_warning && (
        <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Produit créé et synchronisé avec Stripe.
        </div>
      )}
      {stripe_warning === '1' && (
        <div className="mb-6 p-3 rounded-lg bg-orange-50 border border-orange-200 text-sm text-orange-800">
          Produit créé, mais la synchronisation Stripe a échoué. Sauvegardez à nouveau pour réessayer.
        </div>
      )}

      <ProductForm mode="edit" categories={categories} product={product} />
    </div>
  )
}
