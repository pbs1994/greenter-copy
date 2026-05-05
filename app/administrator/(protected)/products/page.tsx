import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export const metadata = { title: 'Produits' }
export const dynamic = 'force-dynamic'

interface ProductRow {
  id: string
  name: string
  slug: string
  price: number
  image_url: string | null
  is_active: boolean
  is_featured: boolean
  stripe_product_id: string | null
  stripe_price_id: string | null
  category: { name: string; slug: string } | null
}

async function loadProducts(): Promise<ProductRow[]> {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
  const { data, error } = await admin
    .from('products')
    .select('id, name, slug, price, image_url, is_active, is_featured, stripe_product_id, stripe_price_id, category:categories(name, slug)')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('loadProducts failed:', error)
    return []
  }
  return (data || []) as unknown as ProductRow[]
}

function formatEUR(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

export default async function ProductsListPage() {
  const products = await loadProducts()

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Produits</h1>
          <p className="text-sm text-neutral-500 mt-1">{products.length} produit{products.length > 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/administrator/products/new"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau produit
        </Link>
      </header>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-12 text-center">
          <p className="text-sm text-neutral-500">Aucun produit pour le moment.</p>
          <Link href="/administrator/products/new" className="text-sm text-green-700 hover:underline mt-3 inline-block">
            Créer le premier produit
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl ring-1 ring-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Catégorie</th>
                <th className="px-4 py-3 font-medium">Prix</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Stripe</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((p) => (
                <tr key={p.id} className="text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                        {p.image_url ? (
                          <Image src={p.image_url} alt="" width={40} height={40} className="object-contain" />
                        ) : (
                          <span className="text-xs text-neutral-400">—</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{p.name}</p>
                        <p className="text-xs text-neutral-500">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{p.category?.name || '—'}</td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{formatEUR(p.price)}</td>
                  <td className="px-4 py-3">
                    {p.is_active ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-neutral-200 text-neutral-700">
                        Inactif
                      </span>
                    )}
                    {p.is_featured && (
                      <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        Mis en avant
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.stripe_product_id && p.stripe_price_id ? (
                      <span className="text-xs text-green-700">✓ synchronisé</span>
                    ) : (
                      <span className="text-xs text-orange-600">non sync</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/administrator/products/${p.id}/edit`}
                      className="inline-flex items-center gap-1 text-sm text-green-700 hover:text-green-900"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
