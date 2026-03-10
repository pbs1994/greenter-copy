"use client"

import Image from "next/image"
import { Shield, Wifi, Gauge, Check, Battery, Sun, Thermometer, Truck, Wrench } from "lucide-react"
import { BuyButton } from "./BuyButton"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const features = [
  { icon: Battery, title: "10 000 cycles", description: "Cellules LiFePO4 CATL" },
  { icon: Gauge, title: "6 kW", description: "Puissance nominale" },
  { icon: Sun, title: "97%", description: "Rendement solaire" },
  { icon: Shield, title: "IP65", description: "Usage extérieur" },
  { icon: Thermometer, title: "-25° à +60°", description: "Plage de fonctionnement" },
  { icon: Wifi, title: "Monitoring", description: "App Solarman Smart" },
]

const specs = [
  "Onduleur hybride monophasé 230V",
  "Compatible batteries LiFePO4 48V",
  "Charge/décharge jusqu'à 100A",
  "Basculement réseau instantané",
  "Compatible panneaux jusqu'à 6.5 kW",
  "Garantie 10 ans batteries",
]

export function ProductShowcase() {
  const [product, setProduct] = useState<{ id: string; price: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      // Récupérer les prix de l'onduleur et de la batterie
      const { data: products } = await supabase
        .from('products')
        .select('id, price, slug')
        .eq('is_active', true)
        .in('slug', ['onduleur-hybride-solaire-5kw', 'batterie-solaire-lifepo4-5kwh', 'kit-stockage-solaire-complet-5kw'])
      
      if (products && products.length > 0) {
        const inverterPrice = products.find(p => p.slug.includes('onduleur'))?.price || 0
        const batteryPrice = products.find(p => p.slug.includes('batterie'))?.price || 0
        const kitProduct = products.find(p => p.slug.includes('kit'))
        
        // Utiliser l'ID du kit pour le bouton d'achat, mais calculer le prix
        setProduct({
          id: kitProduct?.id || products[0].id,
          price: inverterPrice + batteryPrice
        })
      }
      setLoading(false)
    }
    fetchProduct()
  }, [])
  
  return (
    <section id="produit" className="bg-gradient-to-b from-green-50/80 via-white to-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Notre produit phare
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900">
            Batterie solaire avec onduleur hybride
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left - Product Image */}
          <div className="relative order-1">
            <div className="relative aspect-square md:aspect-[4/5] max-h-[50vh] md:max-h-[55vh] bg-gradient-to-br from-green-50 to-white rounded-2xl md:rounded-[2rem] flex items-center justify-center overflow-hidden ring-1 ring-green-100/50 group mx-auto max-w-sm lg:max-w-none">
              {/* Decorative blurs */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-24 md:w-32 h-24 md:h-32 bg-green-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-8 w-32 md:w-40 h-32 md:h-40 bg-teal-100/40 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-16 md:h-20 bg-green-300/20 blur-2xl" />
              
              <Image
                src="/kstar.png"
                alt="KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4"
                width={260}
                height={320}
                className="relative z-10 w-auto h-auto max-h-[60%] md:max-h-[65%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Badges Livraison + Pose - en bas, côte à côte */}
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

            {/* Specs badges - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex mt-4 flex-wrap gap-2 justify-center lg:justify-start">
              {specs.map((spec, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full"
                >
                  <Check className="w-3 h-3" />
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="order-2 text-center lg:text-left">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-3 md:mb-4">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-green-700">
                Onduleur hybride · Stockage tout-en-un
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-none mb-1">
              KSTAR <span className="text-teal-600">BluE-S</span>
            </h3>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-neutral-500 mb-4 md:mb-5">
              <span className="font-semibold text-teal-600">6 kW</span>
              <span className="mx-2 text-neutral-300">·</span>
              L'indépendance énergétique, <span className="italic">simplifiée.</span>
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-3 md:mb-4">
              <p className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
                {loading ? '...' : product ? `${(product.price / 100).toLocaleString('fr-FR')} €` : '...'}
              </p>
              <span className="text-sm text-neutral-400">TTC</span>
            </div>

            {/* Description */}
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-5 md:mb-6 max-w-md mx-auto lg:mx-0">
              Onduleur, batteries LiFePO4 et gestion intelligente réunis dans un système premium. 
              Cellules CATL garanties 10 000 cycles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6 md:mb-8">
              {product && <BuyButton productId={product.id} />}
              <a 
                href="/produits/stockage-solaire/kit-stockage-solaire-complet-5kw"
                className="bg-white border border-neutral-200 hover:border-green-200 hover:bg-green-50 text-neutral-700 font-medium py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center justify-center"
              >
                Détails techniques
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 md:gap-2.5 p-2.5 md:p-3 rounded-xl bg-white/80 border border-green-100/50 hover:border-green-200 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-700 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-neutral-900 leading-tight truncate">{feature.title}</p>
                    <p className="text-[10px] md:text-[11px] text-neutral-500 truncate">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
