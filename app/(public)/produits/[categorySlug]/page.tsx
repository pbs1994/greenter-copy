import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, ArrowRight, Package } from "lucide-react"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { formatEUR } from "@/lib/format"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import type { Category, Product } from "@/types/database"

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  try {
    const { data: categories } = await supabase
      .from('categories')
      .select('slug')

    if (!categories) return []
    return categories.map((c) => ({ categorySlug: c.slug }))
  } catch {
    return []
  }
}

interface Props {
  params: Promise<{ categorySlug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params
  
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()
  
  if (!category) {
    return {
      title: "Catégorie non trouvée | Greenter",
    }
  }
  
  return {
    title: `${category.name} | Greenter`,
    description: `Découvrez notre sélection de ${category.name.toLowerCase()}. Produits de qualité avec livraison et installation incluses.`,
    openGraph: {
      title: `${category.name} | Greenter`,
      description: `Découvrez notre sélection de ${category.name.toLowerCase()}. Produits de qualité avec livraison et installation incluses.`,
      url: `https://www.greenter.fr/produits/${categorySlug}`,
      siteName: "Greenter",
      locale: "fr_FR",
      type: "website",
    },
    alternates: {
      canonical: `https://www.greenter.fr/produits/${categorySlug}`,
    },
  }
}

/**
 * Category listing page - displays all active products in a category
 * @validates Requirements 9.2 - Category pages list all active products in that category
 */
export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params
  
  // Query category by slug
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()
  
  // Handle 404 if category not found
  if (categoryError || !category) {
    notFound()
  }
  
  // Query all active products in this category
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  const typedCategory = category as Category
  const typedProducts = (products || []) as Product[]

  // Breadcrumb items for SEO schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Produits", url: "https://www.greenter.fr/produits" },
    { name: typedCategory.name, url: `https://www.greenter.fr/produits/${categorySlug}` }
  ]
  
  // ItemList schema for SEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": typedProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.short_description || product.description,
        "image": product.image_url ? `https://www.greenter.fr${product.image_url}` : undefined,
        "url": `https://www.greenter.fr/produits/${categorySlug}/${product.slug}`,
        "offers": {
          "@type": "Offer",
          "price": product.price / 100,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Produits
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">{typedCategory.name}</span>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              {typedCategory.name}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {typedCategory.name}
            </h1>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Découvrez notre sélection de {typedCategory.name.toLowerCase()}. 
              Livraison et installation incluses sur tous nos produits.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          {typedProducts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Aucun produit disponible
              </h2>
              <p className="text-neutral-600 mb-6">
                Cette catégorie ne contient pas encore de produits. Revenez bientôt !
              </p>
              <Link 
                href="/produits"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Voir tous les produits
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {typedProducts.map((product) => (
                <Link 
                  key={product.id}
                  href={`/produits/${categorySlug}/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 hover:ring-green-400 hover:shadow-xl transition-all"
                >
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-b from-green-50 to-white p-8 flex items-center justify-center h-64">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={200}
                        height={240}
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-green-100 rounded-xl flex items-center justify-center">
                        <Package className="w-12 h-12 text-green-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <h2 className="font-heading text-xl font-bold text-neutral-900 group-hover:text-green-700 transition-colors mb-2">
                      {product.name}
                    </h2>
                    
                    {product.short_description && (
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {product.short_description}
                      </p>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <span className="text-2xl font-bold text-neutral-900">
                          {formatEUR(product.price)}
                        </span>
                        <span className="text-sm text-neutral-500 ml-1">TTC</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm group-hover:gap-2 transition-all">
                        Voir le produit
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Back to Products Link */}
          <div className="mt-12 text-center">
            <Link 
              href="/produits"
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Retour à tous les produits
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
