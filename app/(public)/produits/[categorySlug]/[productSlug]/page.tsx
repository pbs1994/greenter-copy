import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { GenericProductTemplate } from "@/components/GenericProductTemplate"
import type { Product, Category } from "@/types/database"

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('slug, category:categories(slug)')
      .eq('is_active', true)

    if (!products) return []

    return products
      .filter((p) => p.slug && p.category)
      .map((p) => ({
        categorySlug: (p.category as unknown as { slug: string }).slug,
        productSlug: p.slug,
      }))
  } catch {
    return []
  }
}

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>
}

/**
 * Generate metadata for SEO
 * @validates Requirements 9.1 - Dynamic product pages at /produits/[categorySlug]/[productSlug]
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params
  
  // First get the category by slug
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()
  
  if (!category) {
    return {
      title: "Produit non trouvé | Greenter",
    }
  }
  
  // Then get the product by slug and category_id
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', productSlug)
    .eq('category_id', category.id)
    .eq('is_active', true)
    .single()
  
  if (!product) {
    return {
      title: "Produit non trouvé | Greenter",
    }
  }
  
  const typedProduct = product as Product
  const typedCategory = category as Category
  
  const rawDescription =
    typedProduct.short_description ||
    (typedProduct.description ? typedProduct.description.replace(/<[^>]+>/g, '').trim() : '')

  const description =
    rawDescription && rawDescription.length >= 140
      ? rawDescription.slice(0, 300)
      : `${typedProduct.name} — ${typedCategory.name} Greenter${rawDescription ? ` : ${rawDescription}` : ''}. Équipement certifié pour l'autoconsommation et la rénovation énergétique. Livraison et installation incluses partout en Île-de-France par des techniciens RGE, avec garantie constructeur.`

  // SEO keywords derived from product + category — helps surface battery /
  // autoconsommation / LiFePO4 queries on products that carry those specs.
  const baseKeywords = [
    typedProduct.name,
    `${typedProduct.name} prix`,
    `${typedProduct.name} installation`,
    `${typedProduct.name} avis`,
    typedCategory.name,
    `${typedCategory.name} ${typedProduct.name}`,
    "autoconsommation solaire",
    "stockage solaire",
    "installation RGE",
  ]

  // Enrich with battery-specific keywords when the product title contains
  // kWh / LiFePO4 / battery / batterie / onduleur hybride (KSTAR-style items).
  const n = typedProduct.name.toLowerCase()
  const kwhMatch = n.match(/(\d+(?:[.,]\d+)?)\s*kwh/)
  const batteryKeywords: string[] = []
  if (kwhMatch) {
    const kwh = kwhMatch[1].replace(',', '.')
    batteryKeywords.push(
      `batterie ${kwh} kWh`,
      `batterie lithium ${kwh} kWh`,
      `batterie solaire ${kwh} kWh`,
      `batterie LiFePO4 ${kwh} kWh`,
      `stockage ${kwh} kWh`,
      `batterie ${kwh}kwh`,
    )
  }
  if (n.includes('lifepo') || n.includes('lifepo4')) {
    batteryKeywords.push('batterie LiFePO4', 'batterie lithium fer phosphate', 'stockage LiFePO4')
  }
  if (n.includes('onduleur') || n.includes('hybride')) {
    batteryKeywords.push('onduleur hybride', 'onduleur solaire hybride', 'onduleur photovoltaïque')
  }
  if (n.includes('kstar') || n.includes('blue-s') || n.includes('blues')) {
    batteryKeywords.push('KSTAR BluE-S', 'stockage solaire KSTAR', 'KSTAR autoconsommation')
  }

  const keywords = [...baseKeywords, ...batteryKeywords]

  return {
    title: `${typedProduct.name} | ${typedCategory.name} | Greenter`,
    description: description,
    keywords,
    openGraph: {
      title: `${typedProduct.name} | Greenter`,
      description: description,
      url: `https://www.greenter.fr/produits/${categorySlug}/${productSlug}`,
      siteName: "Greenter",
      locale: "fr_FR",
      type: "website",
      images: typedProduct.image_url ? [
        {
          url: `https://www.greenter.fr${typedProduct.image_url}`,
          width: 800,
          height: 800,
          alt: typedProduct.name,
        }
      ] : undefined,
    },
    alternates: {
      canonical: `https://www.greenter.fr/produits/${categorySlug}/${productSlug}`,
    },
  }
}

/**
 * Dynamic product page component
 * Renders product at /produits/[categorySlug]/[productSlug]
 *
 * All products use the same generic template — no per-product custom pages.
 */
export default async function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = await params

  // First get the category by slug to validate the URL structure
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()

  // Handle 404 if category not found
  if (categoryError || !category) {
    notFound()
  }

  // Query product by slug and category_id, ensuring it's active
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', productSlug)
    .eq('category_id', category.id)
    .eq('is_active', true)
    .single()

  // Handle 404 if product not found or not active
  if (productError || !product) {
    notFound()
  }

  const typedProduct = product as Product
  const typedCategory = category as Category

  return <GenericProductTemplate product={{ ...typedProduct, category: typedCategory }} />
}
