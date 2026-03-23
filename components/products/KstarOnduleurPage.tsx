'use client'

import { useState, useMemo } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Shield, Wifi, Gauge, Check, Battery, Sun, Thermometer, ChevronRight, HelpCircle, Truck, Wrench, Phone, Zap, Plus, Minus } from "lucide-react"
import { ProductSchema } from "@/components/schemas/ProductSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { BuyButton } from "@/components/BuyButton"
import type { Product, Category, FAQItem } from "@/types/database"

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR')
}

interface KstarOnduleurPageProps {
  product: Product & { category: Category }
  prices: { inverter: number; battery: number }
  productIds: { inverter: string; battery: string; bundle: string }
}

export function KstarOnduleurPage({ product, prices, productIds }: KstarOnduleurPageProps) {
  const [batteryCount, setBatteryCount] = useState(0)
  
  // Prix depuis la base de données
  const PRICES = {
    inverter: prices.inverter,
    battery: prices.battery,
    extraBattery: Math.round(prices.battery * 0.857), // ~15% de réduction sur batteries supplémentaires
  }
  
  const pricing = useMemo(() => {
    const inverterPrice = PRICES.inverter
    let batteriesPrice = 0
    if (batteryCount > 0) {
      batteriesPrice = PRICES.battery + (Math.max(0, batteryCount - 1) * PRICES.extraBattery)
    }
    return {
      inverter: inverterPrice,
      batteries: batteriesPrice,
      total: inverterPrice + batteriesPrice,
      capacityKwh: batteryCount * 5.12,
    }
  }, [batteryCount])

  const faqItems: FAQItem[] = [
    { question: "Puis-je utiliser cet onduleur sans batterie ?", answer: "Oui ! L'onduleur hybride fonctionne parfaitement sans batterie. Vous autoconsommez en direct et pouvez ajouter une batterie plus tard." },
    { question: "Quelles batteries sont compatibles ?", answer: "L'onduleur est compatible avec les batteries LiFePO4 48V (51.2V nominal) avec communication CAN ou RS485. Les batteries KSTAR BluE-PACK sont parfaitement compatibles." },
    { question: "Combien de panneaux puis-je connecter ?", answer: "L'onduleur accepte jusqu'à 6.5 kW de panneaux solaires avec une tension max de 580V. Avec 2 MPPT indépendants, vous pouvez optimiser des orientations différentes." },
    { question: "L'onduleur fonctionne-t-il en cas de coupure ?", answer: "Avec une batterie connectée, oui. L'onduleur bascule automatiquement sur la batterie en cas de coupure réseau." },
    { question: "Puis-je l'installer en extérieur ?", answer: "Oui, l'onduleur est certifié IP65. Il peut être installé en extérieur dans un endroit abrité." },
    { question: "Quelle est la garantie ?", answer: "L'onduleur KSTAR BluE-S 5000D est garanti 5 ans par le fabricant. Notre installation est garantie 2 ans." },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" },
    { name: product.category.name, url: `https://greenter.fr/produits/${product.category.slug}` },
    { name: product.name, url: `https://greenter.fr/produits/${product.category.slug}/${product.slug}` }
  ]

  const features = [
    { icon: Gauge, title: "5 kW", description: "Puissance nominale" },
    { icon: Sun, title: "6.5 kW max", description: "Entrée panneaux" },
    { icon: Zap, title: "97.6%", description: "Rendement" },
    { icon: Shield, title: "IP65", description: "Usage extérieur" },
    { icon: Thermometer, title: "-25° à +60°", description: "Plage fonctionnement" },
    { icon: Wifi, title: "Monitoring", description: "App Solarman" },
  ]

  const imageUrl = product.image_url || "/kstar-onduleur.png"

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50/80 via-white to-white py-6 md:py-8">
      <ProductSchema
        name={product.name}
        description="Onduleur hybride monophasé KSTAR BluE-S 5000D. 5kW de puissance, double MPPT, compatible batteries LiFePO4 48V."
        image={`https://greenter.fr${imageUrl}`}
        price={pricing.total / 100}
        currency="EUR"
        availability="InStock"
        brand="KSTAR"
        sku="KSTAR-BLUE-S-5000D"
        url={`https://greenter.fr/produits/${product.category.slug}/${product.slug}`}
      />
      <FAQPageSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 md:mb-8">
          <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 transition-colors">Produits</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link href={`/produits/${product.category.slug}`} className="text-neutral-400 hover:text-neutral-600 transition-colors">{product.category.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left - Product Image */}
          <div className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-white rounded-2xl flex items-center justify-center overflow-hidden ring-1 ring-blue-100/50 group">
              <div className="absolute top-6 right-6 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-6 w-40 h-40 bg-cyan-100/40 rounded-full blur-3xl" />
              
              <Image
                src={imageUrl}
                alt={`${product.name} - Onduleur hybride pour autoconsommation solaire`}
                width={300}
                height={400}
                className="relative z-10 w-auto h-auto max-h-[70%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                Onduleur hybride
              </div>
            </div>

            {/* Caractéristiques sous l'image */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-blue-100">
                  <feature.icon className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">{feature.title}</p>
                    <p className="text-[10px] text-neutral-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info & Configurator */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">{product.category.name}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {product.name}
            </h1>
            
            <p className="text-neutral-600 mb-6">
              {product.short_description || "Le cerveau de votre installation solaire. Prêt pour le stockage."}
            </p>

            {/* Configurateur */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 mb-6">
              
              {/* Onduleur (toujours inclus) */}
              <div className="flex items-center justify-between pb-4 border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Onduleur BluE-S 5000D</p>
                    <p className="text-xs text-neutral-500">5 kW · Double MPPT · IP65</p>
                  </div>
                </div>
                <p className="font-bold text-neutral-900">{formatPrice(PRICES.inverter)} €</p>
              </div>

              {/* Ajouter des batteries */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Battery className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">Ajouter des batteries</p>
                      <p className="text-xs text-neutral-500">BluE-PACK 5.12 kWh · CATL LiFePO4</p>
                    </div>
                  </div>
                  {batteryCount > 0 && (
                    <p className="font-bold text-green-600">+{formatPrice(pricing.batteries)} €</p>
                  )}
                </div>

                {/* Sélecteur de batteries */}
                <div className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3">
                  <button
                    onClick={() => setBatteryCount(Math.max(0, batteryCount - 1))}
                    className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50"
                    disabled={batteryCount === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        onClick={() => setBatteryCount(count)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                          batteryCount === count
                            ? 'bg-green-600 text-white'
                            : 'bg-white border border-neutral-200 text-neutral-600 hover:border-green-300'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setBatteryCount(Math.min(4, batteryCount + 1))}
                    className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50"
                    disabled={batteryCount === 4}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {batteryCount > 0 && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ {pricing.capacityKwh.toFixed(1)} kWh de stockage · ~{Math.round(pricing.capacityKwh * 1000 * 0.9 / 400)}h d'autonomie
                  </p>
                )}
                {batteryCount > 1 && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Batteries supplémentaires à prix réduit ({formatPrice(PRICES.extraBattery)} € au lieu de {formatPrice(PRICES.battery)} €)
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-blue-100">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-neutral-500">Total TTC</p>
                    <p className="text-3xl font-bold text-neutral-900">{formatPrice(pricing.total)} €</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600 font-medium">Livraison + Installation</p>
                    <p className="text-sm font-semibold text-green-600">OFFERTES</p>
                  </div>
                </div>

                <BuyButton 
                  items={batteryCount > 0 
                    ? [
                        { productId: productIds.inverter, quantity: 1 },
                        { productId: productIds.battery, quantity: batteryCount }
                      ]
                    : [{ productId: productIds.inverter, quantity: 1 }]
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                />
                
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 border border-blue-200 rounded-xl text-blue-700 font-medium text-sm hover:bg-blue-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Être rappelé
                </Link>
              </div>
            </div>

            {/* Réassurance */}
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-600" /> Paiement sécurisé</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-600" /> Garantie 5 ans</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-600" /> SAV France</span>
            </div>
          </div>
        </div>

        {/* Specs techniques */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              Entrée solaire (DC)
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-neutral-500">Puissance max panneaux</span><span className="font-medium">6 500 W</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">Tension max</span><span className="font-medium">580 V</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">Plage MPPT</span><span className="font-medium">80 - 560 V</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">Nombre de MPPT</span><span className="font-medium">2</span></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Sortie (AC)
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-neutral-500">Puissance nominale</span><span className="font-medium">5 000 W</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">Tension</span><span className="font-medium">230 V</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">Rendement max</span><span className="font-medium">97.6%</span></li>
              <li className="flex justify-between"><span className="text-neutral-500">Protection</span><span className="font-medium">IP65</span></li>
            </ul>
          </div>
        </div>

        {/* Livraison */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Wrench className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Livraison et installation offertes</h3>
              <p className="text-sm text-neutral-600">Installation par nos techniciens certifiés RGE incluse dans le prix.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">Questions fréquentes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqItems.map((item, index) => (
              <div key={index} className="p-5 bg-white rounded-xl border border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-2">{item.question}</h3>
                <p className="text-sm text-neutral-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
