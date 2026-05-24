'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Package, Check, HelpCircle, Truck, Shield } from 'lucide-react'
import { BuyButton } from '@/components/BuyButton'
import { ProductSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/schemas'
import { formatEUR } from '@/lib/format'
import type { Product, Category, SpecField, ProductFeature, FAQItem } from '@/types/database'

/**
 * Props for the GenericProductTemplate component
 */
interface GenericProductTemplateProps {
  /** Product data with category included */
  product: Product & { category: Category }
}

/**
 * FAQ Accordion Item component
 */
function FAQAccordionItem({ item, isOpen, onToggle }: { 
  item: FAQItem
  isOpen: boolean
  onToggle: () => void 
}) {
  return (
    <div className="border border-neutral-100 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 bg-white hover:bg-green-50/50 transition-colors text-left"
      >
        <span className="text-sm md:text-base font-semibold text-neutral-900 pr-4">
          {item.question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 bg-white">
          <p className="text-sm text-neutral-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Generic product template component for rendering product pages
 * Displays product data including name, price, description, specs, features, and FAQ
 * 
 * @validates Requirements 9.4 - Generic product template renders all product data
 * @validates Requirements 9.5 - Breadcrumbs show correct hierarchy (Accueil → Category → Product)
 */
export function GenericProductTemplate({ product }: GenericProductTemplateProps) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)
  
  const { category } = product
  const baseUrl = 'https://greenter.fr'
  
  // Breadcrumb items for navigation and SEO
  // Hierarchy: Accueil → Produits → Category → Product
  const breadcrumbItems = [
    { name: 'Accueil', url: baseUrl },
    { name: 'Produits', url: `${baseUrl}/produits` },
    { name: category.name, url: `${baseUrl}/produits/${category.slug}` },
    { name: product.name, url: `${baseUrl}/produits/${category.slug}/${product.slug}` }
  ]
  
  // Get spec fields from category to display specs with proper labels and units
  const specFieldsMap = new Map<string, SpecField>(
    category.spec_fields.map(field => [field.key, field])
  )
  
  // Format spec value with unit if available
  const formatSpecValue = (key: string, value: string | number): string => {
    const field = specFieldsMap.get(key)
    if (field?.unit) {
      return `${value} ${field.unit}`
    }
    return String(value)
  }
  
  // Get spec label from category spec_fields
  const getSpecLabel = (key: string): string => {
    const field = specFieldsMap.get(key)
    return field?.name || key
  }
  
  // Convert specs object to array for rendering
  const specsArray = Object.entries(product.specs || {}).map(([key, value]) => ({
    key,
    label: getSpecLabel(key),
    value: formatSpecValue(key, value)
  }))
  
  // Product features with icons
  const features: ProductFeature[] = product.features || []
  
  // FAQ items
  const faqItems: FAQItem[] = product.faq || []
  
  // Price in euros for schema (convert from cents)
  const priceInEuros = product.price / 100

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/80 via-white to-white">
      {/* SEO Schemas */}
      <ProductSchema
        name={product.name}
        description={product.description || product.short_description || ''}
        image={product.image_url ? `${baseUrl}${product.image_url}` : `${baseUrl}/placeholder-product.png`}
        price={priceInEuros}
        currency="EUR"
        availability="InStock"
        brand="Greenter"
        sku={product.slug}
        url={`${baseUrl}/produits/${category.slug}/${product.slug}`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {faqItems.length > 0 && <FAQPageSchema items={faqItems} />}

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
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
          <Link 
            href={`/produits/${category.slug}`} 
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            {category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-green-50 to-white rounded-2xl flex items-center justify-center overflow-hidden ring-1 ring-green-100/50">
              {/* Decorative blurs */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-green-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-12 left-8 w-40 h-40 bg-teal-100/40 rounded-full blur-3xl" />
              
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="relative z-10 object-contain max-h-[80%] drop-shadow-xl"
                  priority
                />
              ) : (
                <div className="w-32 h-32 bg-green-100 rounded-xl flex items-center justify-center">
                  <Package className="w-16 h-16 text-green-400" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-4 w-fit">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-green-700">
                {category.name} · Stockage tout-en-un
              </span>
            </div>

            {/* Product Name */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight mb-4">
              {category.name}<br />
              <span className="text-teal-600">{product.name}</span>
            </h1>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-lg text-neutral-600 mb-6">
                {product.short_description}
              </p>
            )}

            {/* Price & Buy Button */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50/50 rounded-2xl p-6 mb-6 border border-green-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-4xl font-bold text-neutral-900">
                    {formatEUR(product.price)}
                  </p>
                  <p className="text-sm text-green-700 font-medium mt-1">
                    TTC · Livraison incluse
                  </p>
                </div>
                {product.stripe_price_id && <BuyButton productId={product.id} />}
              </div>
              
              {/* Reassurance */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-green-600" /> Paiement sécurisé
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-green-600" /> Livraison France
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-green-600" /> Garantie incluse
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {product.description && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Description
            </h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </section>
        )}

        {/* Specifications Section */}
        {specsArray.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Caractéristiques techniques
            </h2>
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specsArray.map((spec, index) => (
                    <tr 
                      key={spec.key}
                      className={index % 2 === 0 ? 'bg-neutral-50/50' : 'bg-white'}
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-medium text-neutral-700 w-1/2">
                        {spec.label}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-neutral-900">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Points forts
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-neutral-100 hover:border-green-200 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section className="mb-12 md:mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-3">
                <HelpCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">Questions fréquentes</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                Foire aux questions
              </h2>
            </div>
            <div className="space-y-3 max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <FAQAccordionItem
                  key={index}
                  item={item}
                  isOpen={openFAQIndex === index}
                  onToggle={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Back to Category Link */}
        <div className="text-center">
          <Link 
            href={`/produits/${category.slug}`}
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour à {category.name}
          </Link>
        </div>
      </div>
    </main>
  )
}
