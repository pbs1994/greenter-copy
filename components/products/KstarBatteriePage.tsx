'use client'

import { useState, useMemo } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Shield, Check, Battery, Thermometer, ChevronRight, Truck, Wrench, Phone, Zap, Plus, Minus, AlertCircle } from "lucide-react"
import { ProductSchema } from "@/components/schemas/ProductSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { BuyButton } from "@/components/BuyButton"
import { getExtraBatteryPrice } from "@/lib/pricing-constants"
import type { Product, Category, FAQItem } from "@/types/database"

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR')
}

interface KstarBatteriePageProps {
  product: Product & { category: Category }
  prices: { inverter: number; battery: number }
  productIds: { inverter: string; battery: string; bundle: string }
}

export function KstarBatteriePage({ product, prices, productIds }: KstarBatteriePageProps) {
  const [batteryCount, setBatteryCount] = useState(1)
  const [addInverter, setAddInverter] = useState(false)
  
  // Prix depuis la base de données
  const PRICES = {
    inverter: prices.inverter,
    battery: prices.battery,
    extraBattery: getExtraBatteryPrice(prices.battery),
  }
  
  const pricing = useMemo(() => {
    const firstBattery = PRICES.battery
    const extraBatteries = Math.max(0, batteryCount - 1) * PRICES.extraBattery
    const batteriesTotal = firstBattery + extraBatteries
    const inverterPrice = addInverter ? PRICES.inverter : 0
    
    return {
      batteries: batteriesTotal,
      inverter: inverterPrice,
      total: batteriesTotal + inverterPrice,
      capacityKwh: batteryCount * 5.12,
    }
  }, [batteryCount, addInverter])

  const faqItems: FAQItem[] = [
    { question: "Cette batterie fonctionne-t-elle seule ?", answer: "Non, la batterie nécessite un onduleur hybride compatible pour fonctionner. Elle est conçue pour les onduleurs KSTAR BluE-S mais peut être compatible avec d'autres onduleurs 48V." },
    { question: "Quelle est la durée de vie de la batterie ?", answer: "Les cellules CATL LiFePO4 sont garanties pour 10 000 cycles à 90% de profondeur de décharge. À raison d'un cycle par jour, cela représente environ 27 ans." },
    { question: "Puis-je ajouter des batteries plus tard ?", answer: "Oui ! Le système est extensible. Vous pouvez commencer avec 1 module (5.12 kWh) et en ajouter jusqu'à 3 de plus pour atteindre 20.48 kWh." },
    { question: "La batterie peut-elle être installée en extérieur ?", answer: "La batterie est certifiée IP65, mais il est recommandé de l'installer dans un local technique car elle ne doit pas être chargée en dessous de 0°C." },
    { question: "Quelle autonomie avec 5.12 kWh ?", answer: "Avec une consommation moyenne de 400 Wh, vous avez environ 11 heures d'autonomie. Pour une soirée normale, c'est largement suffisant." },
    { question: "Quelle est la garantie ?", answer: "La batterie bénéficie d'une garantie produit de 5 ans et d'une garantie performance de 10 ans par KSTAR." },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" },
    { name: product.category.name, url: `https://greenter.fr/produits/${product.category.slug}` },
    { name: product.name, url: `https://greenter.fr/produits/${product.category.slug}/${product.slug}` }
  ]

  const imageUrl = product.image_url || "/kstar-batterie.png"

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-green-50/80 via-white to-white py-6 md:py-8">
      <ProductSchema
        name={product.name}
        description="Batterie LiFePO4 CATL 5.12 kWh pour stockage solaire. 10 000 cycles garantis, extensible jusqu'à 20 kWh."
        image={`https://greenter.fr${imageUrl}`}
        price={pricing.total / 100}
        currency="EUR"
        availability="InStock"
        brand="KSTAR"
        sku="KSTAR-BLUE-PACK-5.1"
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
            <div className="relative aspect-square bg-gradient-to-br from-green-50 to-white rounded-2xl flex items-center justify-center overflow-hidden ring-1 ring-green-100/50 group">
              <div className="absolute top-6 right-6 w-32 h-32 bg-green-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-6 w-40 h-40 bg-teal-100/40 rounded-full blur-3xl" />
              
              <Image
                src={imageUrl}
                alt={`${product.name} - Batterie LiFePO4 CATL pour stockage solaire`}
                width={300}
                height={400}
                className="relative z-10 w-auto h-auto max-h-[70%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                Batterie LiFePO4
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white text-neutral-700 text-xs font-semibold rounded-full border">
                Cellules CATL
              </div>
            </div>

            {/* Caractéristiques sous l'image */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-green-100">
                <Battery className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900">5.12 kWh</p>
                  <p className="text-[10px] text-neutral-500">Par module</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-green-100">
                <Shield className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900">10 000</p>
                  <p className="text-[10px] text-neutral-500">Cycles</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-green-100">
                <Thermometer className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs font-semibold text-neutral-900">0° à 50°</p>
                  <p className="text-[10px] text-neutral-500">Charge</p>
                </div>
              </div>
            </div>

            {/* Comparatif durée de vie */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-green-100">
              <p className="text-xs font-semibold text-neutral-700 mb-3">Durée de vie comparée</p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-500">Plomb (AGM)</span>
                    <span>~500 cycles</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full"><div className="h-full bg-neutral-300 rounded-full" style={{width: '5%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-500">Lithium-ion</span>
                    <span>~2 000 cycles</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full"><div className="h-full bg-blue-300 rounded-full" style={{width: '20%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-700 font-medium">CATL LiFePO4</span>
                    <span className="font-bold text-green-700">10 000 cycles</span>
                  </div>
                  <div className="h-2 bg-green-100 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{width: '100%'}}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Product Info & Configurator */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-4">
              <Battery className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-700">{product.category.name}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {product.name}
            </h1>
            
            <p className="text-neutral-600 mb-6">
              {product.short_description || "Stockez votre surplus solaire avec les cellules CATL les plus fiables du marché."}
            </p>

            {/* Avertissement compatibilité */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 text-sm">Nécessite un onduleur hybride</p>
                <p className="text-xs text-amber-700">Compatible onduleurs 48V avec communication CAN/RS485</p>
              </div>
            </div>

            {/* Configurateur */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 mb-6">
              
              {/* Nombre de batteries */}
              <div className="pb-4 border-b border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Battery className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">Batteries BluE-PACK</p>
                      <p className="text-xs text-neutral-500">5.12 kWh par module · CATL LiFePO4</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">{formatPrice(pricing.batteries)} €</p>
                </div>

                {/* Sélecteur */}
                <div className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3">
                  <button
                    onClick={() => setBatteryCount(Math.max(1, batteryCount - 1))}
                    className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50"
                    disabled={batteryCount === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 flex gap-1.5">
                    {[1, 2, 3, 4].map((count) => (
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

                <p className="text-xs text-green-600 mt-2">
                  ✓ {pricing.capacityKwh.toFixed(1)} kWh de stockage · ~{Math.round(pricing.capacityKwh * 1000 * 0.9 / 400)}h d'autonomie
                </p>
                {batteryCount > 1 && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Batteries supplémentaires à prix réduit ({formatPrice(PRICES.extraBattery)} € au lieu de {formatPrice(PRICES.battery)} €)
                  </p>
                )}
              </div>

              {/* Ajouter onduleur */}
              <div className="pt-4">
                <button
                  onClick={() => setAddInverter(!addInverter)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    addInverter 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-neutral-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${addInverter ? 'bg-blue-100' : 'bg-neutral-100'}`}>
                      <Zap className={`w-5 h-5 ${addInverter ? 'text-blue-600' : 'text-neutral-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-neutral-900">Ajouter l'onduleur BluE-S 5000D</p>
                      <p className="text-xs text-neutral-500">5 kW · Double MPPT · IP65</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-bold ${addInverter ? 'text-blue-600' : 'text-neutral-400'}`}>
                      +{formatPrice(PRICES.inverter)} €
                    </p>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${addInverter ? 'bg-blue-500' : 'border-2 border-neutral-300'}`}>
                      {addInverter && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </button>
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-green-100">
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
                  items={addInverter 
                    ? [
                        { productId: productIds.inverter, quantity: 1 },
                        { productId: productIds.battery, quantity: batteryCount }
                      ]
                    : [{ productId: productIds.battery, quantity: batteryCount }]
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                />
                
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 border border-green-200 rounded-xl text-green-700 font-medium text-sm hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Être rappelé
                </Link>
              </div>
            </div>

            {/* Réassurance */}
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-600" /> Paiement sécurisé</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-600" /> Garantie 10 ans</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-600" /> SAV France</span>
            </div>
          </div>
        </div>

        {/* Livraison */}
        <div className="mt-16 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100">
          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Wrench className="w-6 h-6 text-teal-600" />
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
