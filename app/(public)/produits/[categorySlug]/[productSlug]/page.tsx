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
  
  return {
    title: `${typedProduct.name} | ${typedCategory.name} | Greenter`,
    description: description,
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
