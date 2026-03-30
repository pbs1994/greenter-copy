import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Battery, ChevronRight, Package, Grid3X3 } from "lucide-react"
import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { supabase } from "@/lib/supabase"
import { formatEUR } from "@/lib/format"
import type { Category, Product } from "@/types/database"

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Nos Produits | Stockage Solaire & Équipements Énergie | Greenter",
  description: "Découvrez notre catalogue de stockage solaire, onduleurs hybrides et batteries LiFePO4 pour l'autoconsommation. Livraison et installation offerts. Prix compétitifs.",
  keywords: ["stockage solaire", "batterie solaire", "onduleur hybride", "KSTAR", "LiFePO4", "autoconsommation"],
  openGraph: {
    title: "Nos Produits | Greenter",
    description: "Stockage solaire et équipements pour l'autoconsommation. Livraison et installation offerts.",
    url: "https://greenter.fr/produits",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://greenter.fr/produits",
  },
}

export default async function ProduitsPage() {
  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  // Fetch all active products with their categories
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const typedCategories = (categories || []) as Category[]
  const typedProducts = (products || []) as (Product & { category: Category })[]

  // Calculer les prix dynamiques pour les produits kit
  const inverterPrice = typedProducts.find(p => p.slug.includes('onduleur'))?.price || 0
  const batteryPrice = typedProducts.find(p => p.slug.includes('batterie'))?.price || 0
  
  // Mettre à jour le prix du kit dynamiquement
  const productsWithDynamicPrices = typedProducts.map(product => {
    if (product.slug.includes('kit')) {
      return { ...product, price: inverterPrice + batteryPrice }
    }
    return product
  })

  // Group products by category
  const productsByCategory = typedCategories.map(category => ({
    category,
    products: productsWithDynamicPrices.filter(p => p.category_id === category.id)
  })).filter(group => group.products.length > 0)

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" }
  ]

  // Schema for all products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": productsWithDynamicPrices.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.short_description || product.description,
        "image": product.image_url ? `https://greenter.fr${product.image_url}` : undefined,
        "url": `https://greenter.fr/produits/${product.category.slug}/${product.slug}`,
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

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">Produits</span>
          </nav>

          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Notre catalogue
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Équipements pour votre indépendance énergétique
            </h1>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Des équipements premium sélectionnés par nos experts. 
              Livraison et installation offerts sur tous nos produits.
            </p>
          </div>

          {/* Categories Quick Nav */}
          {typedCategories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {typedCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/produits/${category.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all text-sm font-medium text-neutral-700 hover:text-green-700"
                >
                  <Grid3X3 className="w-4 h-4" />
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products by Category */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          
          {productsByCategory.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Catalogue en cours de préparation
              </h2>
              <p className="text-neutral-600 mb-6">
                Nos produits arrivent bientôt. Contactez-nous pour plus d'informations.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Nous contacter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              {productsByCategory.map(({ category, products }) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Battery className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-neutral-900">
                          {category.name}
                        </h2>
                        <p className="text-sm text-neutral-500">
                          {products.length} produit{products.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/produits/${category.slug}`}
                      className="hidden sm:inline-flex items-center gap-1 text-green-700 hover:text-green-800 font-medium text-sm transition-colors"
                    >
                      Voir tout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Products Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Link 
                        key={product.id}
                        href={`/produits/${category.slug}/${product.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 hover:ring-green-400 hover:shadow-xl transition-all"
                      >
                        {/* Image */}
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
                          
                          {/* Badges livraison/installation */}
                          <div className="absolute bottom-3 left-3 right-3 text-center">
                            <p className="text-[10px] text-neutral-500">
                              Livraison et installation offerts
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold text-neutral-900 group-hover:text-green-700 transition-colors mb-2">
                            {product.name}
                          </h3>
                          
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

                  {/* Mobile "See all" link */}
                  <div className="sm:hidden mt-4 text-center">
                    <Link
                      href={`/produits/${category.slug}`}
                      className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 font-medium text-sm transition-colors"
                    >
                      Voir tous les {category.name.toLowerCase()}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info box */}
          <div className="mt-16 bg-green-50 rounded-2xl p-6 md:p-8 border border-green-100">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">
                  Besoin de conseils ?
                </h3>
                <p className="text-neutral-600 text-sm">
                  Nos experts vous accompagnent dans le choix de votre équipement. 
                  Contactez-nous pour une étude personnalisée gratuite.
                </p>
              </div>
              <Link 
                href="/contact"
                className="shrink-0 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2"
              >
                Nous contacter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
