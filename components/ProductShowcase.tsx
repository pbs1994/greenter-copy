"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Truck, Wrench } from "lucide-react"
import { BuyButton } from "./BuyButton"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { formatEUR } from "@/lib/format"
import { normalizeSpecs } from "@/lib/product-specs"
import type { Product, Category } from "@/types/database"

type FeaturedProduct = Product & { category: Category | null }

export function ProductShowcase() {
  const [product, setProduct] = useState<FeaturedProduct | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      // Fetch the featured product (is_featured = true), or fallback to the first active product
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(1)
        .single()

      if (data) {
        setProduct(data as unknown as FeaturedProduct)
      } else {
        // Fallback: get the first active product
        const { data: fallback } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
        if (fallback) setProduct(fallback as unknown as FeaturedProduct)
      }
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-green-50/80 via-white to-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-8 w-48 bg-neutral-100 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-12 w-96 bg-neutral-100 rounded-lg animate-pulse mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  if (!product) return null

  const categorySlug = product.category?.slug || 'produits'
  const productUrl = `/produits/${categorySlug}/${product.slug}`

  // Build features from product.features (up to 6)
  const displayFeatures = (product.features || []).slice(0, 6)

  // Build specs from product.specs (up to 6) — normalized to {label, value}
  const displaySpecs = normalizeSpecs(product.specs)
    .slice(0, 6)
    .map((spec) => `${spec.label}: ${spec.value}`)

  return (
    <section id="produit" className="bg-gradient-to-b from-green-50/80 via-white to-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Notre produit phare
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900">
            {product.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left - Product Image */}
          <div className="relative order-1">
            <div className="relative aspect-square md:aspect-[4/5] max-h-[50vh] md:max-h-[55vh] bg-gradient-to-br from-green-50 to-white rounded-2xl md:rounded-[2rem] flex items-center justify-center overflow-hidden ring-1 ring-green-100/50 group mx-auto max-w-sm lg:max-w-none">
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-24 md:w-32 h-24 md:h-32 bg-green-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-8 w-32 md:w-40 h-32 md:h-40 bg-teal-100/40 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-16 md:h-20 bg-green-300/20 blur-2xl" />

              <Image
                src={product.image_url || "/kstar.webp"}
                alt={product.name}
                width={260}
                height={320}
                className="relative z-10 w-auto h-auto max-h-[60%] md:max-h-[65%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Badges */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-neutral-700">Livraison incluse</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                  <Wrench className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-medium text-neutral-700">Installation incluse</span>
                </div>
              </div>
            </div>

            {/* Specs badges */}
            {displaySpecs.length > 0 && (
              <div className="hidden md:flex mt-4 flex-wrap gap-2 justify-center lg:justify-start">
                {displaySpecs.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full"
                  >
                    <Check className="w-3 h-3" />
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="order-2 text-center lg:text-left">
            {/* Category Badge */}
            {product.category && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-3 md:mb-4">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-xs font-medium text-green-700">
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-none mb-3 md:mb-4">
              {product.name}
            </h3>

            {/* Short description */}
            {product.short_description && (
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-5 md:mb-6 max-w-md mx-auto lg:mx-0">
                {product.short_description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-5 md:mb-6">
              <p className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
                {formatEUR(product.price)}
              </p>
              <span className="text-sm text-neutral-400">TTC</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6 md:mb-8">
              <BuyButton productId={product.id} />
              <Link
                href={productUrl}
                className="bg-white border border-neutral-200 hover:border-green-200 hover:bg-green-50 text-neutral-700 font-medium py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Détails techniques
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Features Grid */}
            {displayFeatures.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {displayFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 md:gap-2.5 p-2.5 md:p-3 rounded-xl bg-white/80 border border-green-100/50 hover:border-green-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{feature.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-medium text-neutral-900 leading-tight truncate">{feature.title}</p>
                      <p className="text-[10px] md:text-[11px] text-neutral-500 truncate">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
