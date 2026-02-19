import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { getProductStripePrice } from "@/lib/stripe"
import { GenericProductTemplate } from "@/components/GenericProductTemplate"
import { KstarCustomPage } from "@/components/products/KstarCustomPage"
import type { Product, Category } from "@/types/database"

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
  
  const description = typedProduct.short_description || typedProduct.description || 
    `Découvrez ${typedProduct.name} dans notre catégorie ${typedCategory.name}.`
  
  return {
    title: `${typedProduct.name} | ${typedCategory.name} | Greenter`,
    description: description,
    openGraph: {
      title: `${typedProduct.name} | Greenter`,
      description: description,
      url: `https://greenter.fr/produits/${categorySlug}/${productSlug}`,
      siteName: "Greenter",
      locale: "fr_FR",
      type: "website",
      images: typedProduct.image_url ? [
        {
          url: `https://greenter.fr${typedProduct.image_url}`,
          width: 800,
          height: 800,
          alt: typedProduct.name,
        }
      ] : undefined,
    },
    alternates: {
      canonical: `https://greenter.fr/produits/${categorySlug}/${productSlug}`,
    },
  }
}

/**
 * Dynamic product page component
 * Renders product at /produits/[categorySlug]/[productSlug]
 * 
 * @validates Requirements 9.1 - Dynamic product pages render at /produits/[categorySlug]/[productSlug]
 * @validates Requirements 9.3 - Products with is_custom_page=true use custom template (handled in task 12.4)
 * @validates Requirements 9.4 - Products without custom page use generic template
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
  
  // Type the data
  const typedProduct = product as Product
  const typedCategory = category as Category
  
  // Fetch price from Stripe (auto-selects test/live based on environment)
  const finalPrice = await getProductStripePrice(typedProduct)
  
  // Combine product with category for the template, with Stripe price
  const productWithCategory = {
    ...typedProduct,
    price: finalPrice,
    category: typedCategory
  }
  
  // Conditional rendering based on is_custom_page flag
  // Products with is_custom_page=true use custom template (KstarCustomPage)
  // @validates Requirements 9.3 - Products with is_custom_page=true use custom template
  if (typedProduct.is_custom_page) {
    return <KstarCustomPage product={productWithCategory} />
  }
  
  // Render generic template for products without custom page
  return <GenericProductTemplate product={productWithCategory} />
}
