'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Phone,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
} from 'lucide-react'
import { BuyButton } from '@/components/BuyButton'
import { ProductSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/schemas'
import { formatEUR } from '@/lib/format'
import { ProductGallery } from './ProductGallery'
import { TrustGrid } from './TrustGrid'
import { DeliverySection } from './DeliverySection'
import { StickyBuyBar } from './StickyBuyBar'
import type { Product, Category, SpecField, ProductFeature, FAQItem } from '@/types/database'

interface ProductTemplateProps {
  product: Product & { category: Category }
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
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
          <p className="text-sm text-neutral-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

function QuantitySelector({
  quantity,
  onQuantityChange,
}: {
  quantity: number
  onQuantityChange: (q: number) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors disabled:opacity-40"
        disabled={quantity <= 1}
        aria-label="Diminuer la quantité"
      >
        <Minus className="w-4 h-4 text-neutral-600" />
      </button>
      <span className="w-10 text-center text-sm font-semibold text-neutral-900">{quantity}</span>
      <button
        onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
        className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors disabled:opacity-40"
        disabled={quantity >= 10}
        aria-label="Augmenter la quantité"
      >
        <Plus className="w-4 h-4 text-neutral-600" />
      </button>
    </div>
  )
}

export function ProductTemplate({ product }: ProductTemplateProps) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  const { category } = product
  const baseUrl = 'https://greenter.fr'

  const breadcrumbItems = [
    { name: 'Accueil', url: baseUrl },
    { name: 'Produits', url: `${baseUrl}/produits` },
    { name: category.name, url: `${baseUrl}/produits/${category.slug}` },
    { name: product.name, url: `${baseUrl}/produits/${category.slug}/${product.slug}` },
  ]

  const specFieldsMap = new Map<string, SpecField>(
    category.spec_fields.map((field) => [field.key, field])
  )

  const formatSpecValue = (key: string, value: string | number): string => {
    const field = specFieldsMap.get(key)
    if (field?.unit) return `${value} ${field.unit}`
    return String(value)
  }

  const getSpecLabel = (key: string): string => {
    const field = specFieldsMap.get(key)
    return field?.name || key
  }

  const specsArray = Object.entries(product.specs || {}).map(([key, value]) => ({
    key,
    label: getSpecLabel(key),
    value: formatSpecValue(key, value),
  }))

  const features: ProductFeature[] = product.features || []
  const faqItems: FAQItem[] = product.faq || []
  const priceInEuros = product.price / 100

  // Build gallery: main image + additional images
  const allImages: string[] = []
  if (product.image_url) allImages.push(product.image_url)
  if (product.images?.length) {
    for (const img of product.images) {
      if (!allImages.includes(img)) allImages.push(img)
    }
  }

  const totalPrice = product.price * quantity

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/80 via-white to-white">
      {/* SEO Schemas */}
      <ProductSchema
        name={product.name}
        description={product.description || product.short_description || ''}
        image={
          product.image_url
            ? `${baseUrl}${product.image_url}`
            : `${baseUrl}/placeholder-product.png`
        }
        price={priceInEuros}
        currency="EUR"
        availability="InStock"
        brand="Greenter"
        sku={product.slug}
        url={`${baseUrl}/produits/${category.slug}/${product.slug}`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {faqItems.length > 0 && <FAQPageSchema items={faqItems} />}

      <div className="container mx-auto max-w-6xl px-4 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 md:mb-8 overflow-x-auto">
          <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">
            Produits
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link
            href={`/produits/${category.slug}`}
            className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap"
          >
            {category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* ========== HERO SECTION ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Left: Gallery */}
          <ProductGallery images={allImages} productName={product.name} />

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-3 w-fit">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-green-700">{category.name}</span>
            </div>

            {/* Product Name */}
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-base text-neutral-600 leading-relaxed mb-5">
                {product.short_description}
              </p>
            )}

            {/* Price block */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50/50 rounded-2xl p-5 md:p-6 border border-green-100 mb-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                  {formatEUR(totalPrice)}
                </span>
                <span className="text-sm text-neutral-400">TTC</span>
              </div>
              <p className="text-sm text-green-700 font-medium mb-4">
                Livraison et installation offertes
              </p>

              {/* Quantity + Buy */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
                <div className="flex-1" id="main-cta">
                  {product.stripe_price_id ? (
                    <BuyButton
                      items={[{ productId: product.id, quantity }]}
                      className="w-full group bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold text-base py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/25 disabled:shadow-none"
                    />
                  ) : (
                    <Link
                      href="/contact"
                      className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold text-base py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-green-700/20"
                    >
                      <Phone className="w-4 h-4" />
                      Demander un devis
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Contact link */}
            <p className="text-sm text-neutral-500 mb-5">
              Une question ?{' '}
              <Link href="/contact" className="text-green-700 hover:text-green-800 font-medium underline underline-offset-2">
                Contactez-nous
              </Link>
            </p>

            {/* Delivery section */}
            <DeliverySection />
          </div>
        </div>

        {/* ========== TRUST GRID ========== */}
        <div className="mb-12 md:mb-16">
          <TrustGrid />
        </div>

        {/* ========== SPECS ========== */}
        {specsArray.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Caractéristiques techniques
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {specsArray.map((spec) => (
                <div
                  key={spec.key}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-100"
                >
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-green-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">{spec.label}</p>
                    <p className="text-sm font-semibold text-neutral-900 truncate">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========== FEATURES ========== */}
        {features.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Points forts</h2>
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
                    <h3 className="font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========== DELIVERY BANNER (full width) ========== */}
        <div className="mb-12 md:mb-16">
          <DeliverySection />
        </div>

        {/* ========== FAQ ========== */}
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
            <div className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
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

        {/* ========== FINAL CTA ========== */}
        <section className="text-center bg-gradient-to-br from-green-50 to-teal-50/50 rounded-2xl p-8 md:p-12 border border-green-100/50 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Prêt à passer commande ?
          </h2>
          <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
            Livraison gratuite et installation par nos techniciens certifiés RGE incluses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {product.stripe_price_id ? (
              <BuyButton
                items={[{ productId: product.id, quantity }]}
                className="group bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold text-lg py-4 px-10 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/25 disabled:shadow-none"
              />
            ) : (
              <Link
                href="/contact"
                className="bg-green-700 hover:bg-green-800 text-white font-semibold text-lg py-4 px-10 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-green-700/20"
              >
                <ShoppingCart className="w-5 h-5" />
                Demander un devis
              </Link>
            )}
            <Link
              href="/contact"
              className="bg-white border border-neutral-200 hover:border-green-200 hover:bg-green-50 text-neutral-700 font-medium py-4 px-8 rounded-full transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Nous contacter
            </Link>
          </div>
        </section>

        {/* Back to Category */}
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

      {/* Sticky Buy Bar */}
      <StickyBuyBar
        productName={product.name}
        price={totalPrice}
        productId={product.id}
        ctaId="main-cta"
      />
    </main>
  )
}
