'use client'

import { useState, useMemo } from 'react'
import Image from "next/image"
import Link from "next/link"
import { 
  Shield, Check, Battery, Thermometer, ChevronRight, ChevronLeft,
  Truck, Wrench, Phone, Zap, Plus, Minus, AlertCircle, Sun, 
  Gauge, Wifi, ChevronDown
} from "lucide-react"
import { ProductSchema } from "@/components/schemas/ProductSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import type { FAQItem } from "@/types/database"

// =============================================================================
// Types
// =============================================================================

interface ProductSpec {
  label: string
  value: string
  unit?: string
}

interface ProductFeature {
  icon: string
  title: string
  description?: string
}

interface ProductImage {
  url: string
  alt: string
}

interface ProductPageV2Props {
  product: {
    name: string
    slug?: string | null
    price: number
    short_description?: string | null
    image_url?: string | null
    category: {
      name: string
      slug?: string | null
    }
  }
  productType: 'onduleur' | 'batterie'
  prices: { inverter: number; battery: number }
  images?: ProductImage[]
  specs?: ProductSpec[]
  features?: ProductFeature[]
  faqItems?: FAQItem[]
}

// =============================================================================
// Helpers
// =============================================================================

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR')
}

// =============================================================================
// Image Gallery Component
// =============================================================================

function ImageGallery({ 
  images, 
  productName,
  accentColor = 'green'
}: { 
  images: ProductImage[]
  productName: string
  accentColor?: 'green' | 'blue'
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const colorClasses = {
    green: {
      bg: 'from-green-50 to-white',
      ring: 'ring-green-100/50',
      blob1: 'bg-green-200/30',
      blob2: 'bg-teal-100/40',
      badge: 'bg-green-600',
      thumbActive: 'ring-green-500',
      thumbHover: 'hover:ring-green-300',
    },
    blue: {
      bg: 'from-blue-50 to-white',
      ring: 'ring-blue-100/50',
      blob1: 'bg-blue-200/30',
      blob2: 'bg-cyan-100/40',
      badge: 'bg-blue-600',
      thumbActive: 'ring-blue-500',
      thumbHover: 'hover:ring-blue-300',
    },
  }
  
  const colors = colorClasses[accentColor]
  
  if (images.length === 0) return null
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className={`relative aspect-square bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center overflow-hidden ring-1 ${colors.ring} group`}>
        {/* Decorative blobs */}
        <div className={`absolute top-6 right-6 w-32 h-32 ${colors.blob1} rounded-full blur-3xl`} />
        <div className={`absolute bottom-8 left-6 w-40 h-40 ${colors.blob2} rounded-full blur-3xl`} />
        
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].alt || productName}
          width={400}
          height={400}
          className="relative z-10 w-auto h-auto max-h-[75%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
          priority
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              onClick={() => setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </>
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium z-20">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden ring-2 transition-all ${
                index === activeIndex 
                  ? colors.thumbActive 
                  : `ring-transparent ${colors.thumbHover}`
              }`}
            >
              <Image
                src={image.url}
                alt={`${productName} - vue ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


// =============================================================================
// FAQ Accordion Component
// =============================================================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl border border-neutral-100 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 pr-4">{item.question}</h3>
            <ChevronDown 
              className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`} 
            />
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="px-5 pb-5 text-sm text-neutral-600 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// Specs Table Component
// =============================================================================

function SpecsTable({ specs, accentColor = 'green' }: { specs: ProductSpec[], accentColor?: 'green' | 'blue' }) {
  const iconColor = accentColor === 'green' ? 'text-green-600' : 'text-blue-600'
  
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
      <div className="p-5 border-b border-neutral-100">
        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
          <Gauge className={`w-5 h-5 ${iconColor}`} />
          Spécifications techniques
        </h3>
      </div>
      <div className="divide-y divide-neutral-100">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center px-5 py-3">
            <span className="text-neutral-600">{spec.label}</span>
            <span className="font-medium text-neutral-900">
              {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// Battery Configurator Component
// =============================================================================

function BatteryConfigurator({
  batteryCount,
  setBatteryCount,
  addInverter,
  setAddInverter,
  prices,
  showInverterOption = true,
  minBatteries = 1,
}: {
  batteryCount: number
  setBatteryCount: (count: number) => void
  addInverter: boolean
  setAddInverter: (add: boolean) => void
  prices: { inverter: number; battery: number; extraBattery: number }
  showInverterOption?: boolean
  minBatteries?: number
}) {
  const batteriesTotal = prices.battery + Math.max(0, batteryCount - 1) * prices.extraBattery
  const capacityKwh = batteryCount * 5.12
  
  return (
    <div className="space-y-4">
      {/* Battery selector */}
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
          <p className="font-bold text-green-600">{formatPrice(batteriesTotal)} €</p>
        </div>

        <div className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3">
          <button
            onClick={() => setBatteryCount(Math.max(minBatteries, batteryCount - 1))}
            className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50 transition-colors"
            disabled={batteryCount === minBatteries}
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex-1 flex gap-1.5">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setBatteryCount(count)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  batteryCount === count
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-green-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
          <button
            onClick={() => setBatteryCount(Math.min(4, batteryCount + 1))}
            className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50 transition-colors"
            disabled={batteryCount === 4}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-sm text-green-600 font-medium">
            ? {capacityKwh.toFixed(1)} kWh de stockage · ~{Math.round(capacityKwh * 1000 * 0.9 / 400)}h d'autonomie
          </p>
          {batteryCount > 1 && (
            <p className="text-xs text-neutral-500">
              Batteries supplémentaires à prix réduit ({formatPrice(prices.extraBattery)} € au lieu de {formatPrice(prices.battery)} €)
            </p>
          )}
        </div>
      </div>

      {/* Inverter option */}
      {showInverterOption && (
        <button
          onClick={() => setAddInverter(!addInverter)}
          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
            addInverter 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-neutral-200 hover:border-blue-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${addInverter ? 'bg-blue-100' : 'bg-neutral-100'}`}>
              <Zap className={`w-5 h-5 transition-colors ${addInverter ? 'text-blue-600' : 'text-neutral-400'}`} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-neutral-900">Ajouter l'onduleur BluE-S 5000D</p>
              <p className="text-xs text-neutral-500">5 kW · Double MPPT · IP65</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className={`font-bold transition-colors ${addInverter ? 'text-blue-600' : 'text-neutral-400'}`}>
              +{formatPrice(prices.inverter)} €
            </p>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${addInverter ? 'bg-blue-500' : 'border-2 border-neutral-300'}`}>
              {addInverter && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
        </button>
      )}
    </div>
  )
}


// =============================================================================
// Inverter Configurator Component
// =============================================================================

function InverterConfigurator({
  batteryCount,
  setBatteryCount,
  prices,
}: {
  batteryCount: number
  setBatteryCount: (count: number) => void
  prices: { inverter: number; battery: number; extraBattery: number }
}) {
  let batteriesPrice = 0
  if (batteryCount > 0) {
    batteriesPrice = prices.battery + Math.max(0, batteryCount - 1) * prices.extraBattery
  }
  const capacityKwh = batteryCount * 5.12
  
  return (
    <div className="space-y-4">
      {/* Inverter (always included) */}
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
        <p className="font-bold text-neutral-900">{formatPrice(prices.inverter)} €</p>
      </div>

      {/* Battery selector */}
      <div>
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
            <p className="font-bold text-green-600">+{formatPrice(batteriesPrice)} €</p>
          )}
        </div>

        <div className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3">
          <button
            onClick={() => setBatteryCount(Math.max(0, batteryCount - 1))}
            className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50 transition-colors"
            disabled={batteryCount === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex-1 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setBatteryCount(count)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  batteryCount === count
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-green-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
          <button
            onClick={() => setBatteryCount(Math.min(4, batteryCount + 1))}
            className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-white disabled:opacity-50 transition-colors"
            disabled={batteryCount === 4}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {batteryCount > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-sm text-green-600 font-medium">
              ? {capacityKwh.toFixed(1)} kWh de stockage · ~{Math.round(capacityKwh * 1000 * 0.9 / 400)}h d'autonomie
            </p>
            {batteryCount > 1 && (
              <p className="text-xs text-neutral-500">
                Batteries supplémentaires à prix réduit ({formatPrice(prices.extraBattery)} € au lieu de {formatPrice(prices.battery)} €)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// Comparison Chart Component
// =============================================================================

function ComparisonChart() {
  return (
    <div className="p-5 bg-white rounded-xl border border-neutral-100">
      <p className="text-sm font-semibold text-neutral-700 mb-4">Durée de vie comparée</p>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-neutral-500">Plomb (AGM)</span>
            <span className="text-neutral-600">~500 cycles</span>
          </div>
          <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-neutral-300 rounded-full transition-all duration-500" style={{width: '5%'}} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-neutral-500">Lithium-ion classique</span>
            <span className="text-neutral-600">~2 000 cycles</span>
          </div>
          <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-300 rounded-full transition-all duration-500" style={{width: '20%'}} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-green-700 font-medium">CATL LiFePO4</span>
            <span className="font-bold text-green-700">10 000 cycles</span>
          </div>
          <div className="h-2.5 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{width: '100%'}} />
          </div>
        </div>
      </div>
      <p className="text-xs text-neutral-500 mt-3">
        À raison d'un cycle par jour, 10 000 cycles = ~27 ans de durée de vie
      </p>
    </div>
  )
}

// =============================================================================
// Main Product Page Component - Battery Version
// =============================================================================

export function BatteryPageV2({ product, prices }: Omit<ProductPageV2Props, 'productType'>) {
  const [batteryCount, setBatteryCount] = useState(1)
  const [addInverter, setAddInverter] = useState(false)
  
  const PRICES = {
    inverter: prices.inverter,
    battery: prices.battery,
    extraBattery: Math.round(prices.battery * 0.857),
  }
  
  const pricing = useMemo(() => {
    const batteriesTotal = PRICES.battery + Math.max(0, batteryCount - 1) * PRICES.extraBattery
    const inverterPrice = addInverter ? PRICES.inverter : 0
    return {
      batteries: batteriesTotal,
      inverter: inverterPrice,
      total: batteriesTotal + inverterPrice,
    }
  }, [batteryCount, addInverter, PRICES])

  const images: ProductImage[] = [
    { url: product.image_url || "/kstar-batterie.png", alt: product.name },
  ]

  const faqItems: FAQItem[] = [
    { question: "Cette batterie fonctionne-t-elle seule ?", answer: "Non, la batterie nécessite un onduleur hybride compatible pour fonctionner. Elle est conçue pour les onduleurs KSTAR BluE-S mais peut être compatible avec d'autres onduleurs 48V." },
    { question: "Quelle est la durée de vie de la batterie ?", answer: "Les cellules CATL LiFePO4 sont garanties pour 10 000 cycles à 90% de profondeur de décharge. À raison d'un cycle par jour, cela représente environ 27 ans." },
    { question: "Puis-je ajouter des batteries plus tard ?", answer: "Oui ! Le système est extensible. Vous pouvez commencer avec 1 module (5.12 kWh) et en ajouter jusqu'à 3 de plus pour atteindre 20.48 kWh." },
    { question: "La batterie peut-elle être installée en extérieur ?", answer: "La batterie est certifiée IP65, mais il est recommandé de l'installer dans un local technique car elle ne doit pas être chargée en dessous de 0°C." },
    { question: "Quelle autonomie avec 5.12 kWh ?", answer: "Avec une consommation moyenne de 400 Wh, vous avez environ 11 heures d'autonomie. Pour une soirée normale, c'est largement suffisant." },
    { question: "Quelle est la garantie ?", answer: "La batterie bénéficie d'une garantie produit de 5 ans et d'une garantie performance de 10 ans par KSTAR." },
  ]

  const specs: ProductSpec[] = [
    { label: "Capacité", value: "5.12", unit: "kWh" },
    { label: "Technologie", value: "LiFePO4 CATL" },
    { label: "Cycles garantis", value: "10 000" },
    { label: "Tension nominale", value: "51.2", unit: "V" },
    { label: "Profondeur de décharge", value: "90", unit: "%" },
    { label: "Température de charge", value: "0° à 50°C" },
    { label: "Protection", value: "IP65" },
    { label: "Garantie", value: "10 ans" },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" },
    { name: product.category.name, url: `https://greenter.fr/produits/${product.category.slug || 'stockage-solaire'}` },
    { name: product.name, url: `https://greenter.fr/produits/${product.category.slug || 'stockage-solaire'}/${product.slug || 'batterie'}` }
  ]

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-green-50/50 via-white to-white">
      <ProductSchema
        name={product.name}
        description="Batterie LiFePO4 CATL 5.12 kWh pour stockage solaire. 10 000 cycles garantis, extensible jusqu'à 20 kWh."
        image={`https://greenter.fr${images[0].url}`}
        price={pricing.total / 100}
        currency="EUR"
        availability="InStock"
        brand="KSTAR"
        sku="KSTAR-BLUE-PACK-5.1"
        url={`https://greenter.fr/produits/${product.category.slug || 'stockage-solaire'}/${product.slug || 'batterie'}`}
      />
      <FAQPageSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 md:mb-8 overflow-x-auto">
          <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">Produits</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href={`/produits/${product.category.slug}`} className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">{product.category.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <span className="text-neutral-900 font-medium whitespace-nowrap">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left - Images */}
          <div className="space-y-6">
            <ImageGallery images={images} productName={product.name} accentColor="green" />
            
            {/* Quick specs under image */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-green-100">
                <Battery className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">5.12 kWh</p>
                  <p className="text-xs text-neutral-500">Par module</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-green-100">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">10 000</p>
                  <p className="text-xs text-neutral-500">Cycles</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-green-100">
                <Thermometer className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">0° à 50°</p>
                  <p className="text-xs text-neutral-500">Charge</p>
                </div>
              </div>
            </div>
            
            {/* Comparison chart */}
            <ComparisonChart />
          </div>

          {/* Right - Product Info & Configurator */}
          <div className="lg:sticky lg:top-24">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-4">
              <Battery className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-700">{product.category.name}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {product.name}
            </h1>
            
            <p className="text-neutral-600 text-lg mb-6">
              {product.short_description || "Stockez votre surplus solaire avec les cellules CATL les plus fiables du marché."}
            </p>

            {/* Compatibility warning */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 text-sm">Nécessite un onduleur hybride</p>
                <p className="text-xs text-amber-700 mt-0.5">Compatible onduleurs 48V avec communication CAN/RS485</p>
              </div>
            </div>

            {/* Configurator Card */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 mb-6">
              <BatteryConfigurator
                batteryCount={batteryCount}
                setBatteryCount={setBatteryCount}
                addInverter={addInverter}
                setAddInverter={setAddInverter}
                prices={PRICES}
              />

              {/* Total & CTA */}
              <div className="mt-6 pt-5 border-t border-green-100">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Total TTC</p>
                    <p className="text-4xl font-bold text-neutral-900">{formatPrice(pricing.total)} €</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600 font-medium">Livraison + Installation</p>
                    <p className="text-lg font-bold text-green-600">OFFERTES</p>
                  </div>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-green-600/20 hover:shadow-green-600/30">
                  Commander
                </button>
                
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 mt-3 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Être rappelé gratuitement
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Paiement sécurisé</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Garantie 10 ans</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> SAV France</span>
            </div>
          </div>
        </div>

        {/* Delivery banner */}
        <div className="mt-16 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Truck className="w-7 h-7 text-green-600" />
              </div>
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Wrench className="w-7 h-7 text-teal-600" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-neutral-900 text-lg">Livraison et installation offertes</h3>
              <p className="text-neutral-600">Installation par nos techniciens certifiés RGE incluse dans le prix.</p>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-12">
          <SpecsTable specs={specs} accentColor="green" />
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Questions fréquentes</h2>
          <FAQAccordion items={faqItems} />
        </div>

        {/* Google Reviews */}
        <div className="mt-12 flex justify-center">
          <GoogleRatingBadgeClient />
        </div>

      </div>
    </main>
  )
}


// =============================================================================
// Main Product Page Component - Inverter Version
// =============================================================================

export function InverterPageV2({ product, prices }: Omit<ProductPageV2Props, 'productType'>) {
  const [batteryCount, setBatteryCount] = useState(0)
  
  const PRICES = {
    inverter: prices.inverter,
    battery: prices.battery,
    extraBattery: Math.round(prices.battery * 0.857),
  }
  
  const pricing = useMemo(() => {
    let batteriesPrice = 0
    if (batteryCount > 0) {
      batteriesPrice = PRICES.battery + Math.max(0, batteryCount - 1) * PRICES.extraBattery
    }
    return {
      inverter: PRICES.inverter,
      batteries: batteriesPrice,
      total: PRICES.inverter + batteriesPrice,
    }
  }, [batteryCount, PRICES])

  const images: ProductImage[] = [
    { url: product.image_url || "/kstar-onduleur.png", alt: product.name },
  ]

  const faqItems: FAQItem[] = [
    { question: "Puis-je utiliser cet onduleur sans batterie ?", answer: "Oui ! L'onduleur hybride fonctionne parfaitement sans batterie. Vous autoconsommez en direct et pouvez ajouter une batterie plus tard." },
    { question: "Quelles batteries sont compatibles ?", answer: "L'onduleur est compatible avec les batteries LiFePO4 48V (51.2V nominal) avec communication CAN ou RS485. Les batteries KSTAR BluE-PACK sont parfaitement compatibles." },
    { question: "Combien de panneaux puis-je connecter ?", answer: "L'onduleur accepte jusqu'à 6.5 kW de panneaux solaires avec une tension max de 580V. Avec 2 MPPT indépendants, vous pouvez optimiser des orientations différentes." },
    { question: "L'onduleur fonctionne-t-il en cas de coupure ?", answer: "Avec une batterie connectée, oui. L'onduleur bascule automatiquement sur la batterie en cas de coupure réseau." },
    { question: "Puis-je l'installer en extérieur ?", answer: "Oui, l'onduleur est certifié IP65. Il peut être installé en extérieur dans un endroit abrité." },
    { question: "Quelle est la garantie ?", answer: "L'onduleur KSTAR BluE-S 5000D est garanti 5 ans par le fabricant. Notre installation est garantie 2 ans." },
  ]

  const specs: ProductSpec[] = [
    { label: "Puissance nominale", value: "5", unit: "kW" },
    { label: "Puissance max panneaux", value: "6.5", unit: "kW" },
    { label: "Tension max entrée", value: "580", unit: "V" },
    { label: "Nombre de MPPT", value: "2" },
    { label: "Plage MPPT", value: "80 - 560 V" },
    { label: "Rendement max", value: "97.6", unit: "%" },
    { label: "Protection", value: "IP65" },
    { label: "Garantie", value: "5 ans" },
  ]

  const features = [
    { icon: Gauge, title: "5 kW", description: "Puissance nominale" },
    { icon: Sun, title: "6.5 kW max", description: "Entrée panneaux" },
    { icon: Zap, title: "97.6%", description: "Rendement" },
    { icon: Shield, title: "IP65", description: "Usage extérieur" },
    { icon: Thermometer, title: "-25° à +60°", description: "Plage fonctionnement" },
    { icon: Wifi, title: "Monitoring", description: "App Solarman" },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" },
    { name: product.category.name, url: `https://greenter.fr/produits/${product.category.slug || 'stockage-solaire'}` },
    { name: product.name, url: `https://greenter.fr/produits/${product.category.slug || 'stockage-solaire'}/${product.slug || 'onduleur'}` }
  ]

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50/50 via-white to-white">
      <ProductSchema
        name={product.name}
        description="Onduleur hybride monophasé KSTAR BluE-S 5000D. 5kW de puissance, double MPPT, compatible batteries LiFePO4 48V."
        image={`https://greenter.fr${images[0].url}`}
        price={pricing.total / 100}
        currency="EUR"
        availability="InStock"
        brand="KSTAR"
        sku="KSTAR-BLUE-S-5000D"
        url={`https://greenter.fr/produits/${product.category.slug || 'stockage-solaire'}/${product.slug || 'onduleur'}`}
      />
      <FAQPageSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 md:mb-8 overflow-x-auto">
          <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">Produits</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <Link href={`/produits/${product.category.slug || 'stockage-solaire'}`} className="text-neutral-400 hover:text-neutral-600 transition-colors whitespace-nowrap">{product.category.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <span className="text-neutral-900 font-medium whitespace-nowrap">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left - Images */}
          <div className="space-y-6">
            <ImageGallery images={images} productName={product.name} accentColor="blue" />
            
            {/* Quick features under image */}
            <div className="grid grid-cols-3 gap-2">
              {features.slice(0, 6).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-white border border-blue-100">
                  <feature.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{feature.title}</p>
                    <p className="text-xs text-neutral-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info & Configurator */}
          <div className="lg:sticky lg:top-24">
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">{product.category.name}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {product.name}
            </h1>
            
            <p className="text-neutral-600 text-lg mb-6">
              {product.short_description || "Le cerveau de votre installation solaire. Prêt pour le stockage."}
            </p>

            {/* Configurator Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 mb-6">
              <InverterConfigurator
                batteryCount={batteryCount}
                setBatteryCount={setBatteryCount}
                prices={PRICES}
              />

              {/* Total & CTA */}
              <div className="mt-6 pt-5 border-t border-blue-100">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Total TTC</p>
                    <p className="text-4xl font-bold text-neutral-900">{formatPrice(pricing.total)} €</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600 font-medium">Livraison + Installation</p>
                    <p className="text-lg font-bold text-green-600">OFFERTES</p>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30">
                  Commander
                </button>
                
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 mt-3 border border-blue-200 rounded-xl text-blue-700 font-medium hover:bg-blue-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Être rappelé gratuitement
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Paiement sécurisé</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Garantie 5 ans</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> SAV France</span>
            </div>
          </div>
        </div>

        {/* Delivery banner */}
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Wrench className="w-7 h-7 text-cyan-600" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-neutral-900 text-lg">Livraison et installation offertes</h3>
              <p className="text-neutral-600">Installation par nos techniciens certifiés RGE incluse dans le prix.</p>
            </div>
          </div>
        </div>

        {/* Specs - Two columns for inverter */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              Entrée solaire (DC)
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Puissance max panneaux</span><span className="font-medium">6 500 W</span></li>
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Tension max</span><span className="font-medium">580 V</span></li>
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Plage MPPT</span><span className="font-medium">80 - 560 V</span></li>
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Nombre de MPPT</span><span className="font-medium">2</span></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Sortie (AC)
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Puissance nominale</span><span className="font-medium">5 000 W</span></li>
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Tension</span><span className="font-medium">230 V</span></li>
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Rendement max</span><span className="font-medium">97.6%</span></li>
              <li className="flex justify-between text-sm"><span className="text-neutral-500">Protection</span><span className="font-medium">IP65</span></li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Questions fréquentes</h2>
          <FAQAccordion items={faqItems} />
        </div>

        {/* Google Reviews */}
        <div className="mt-12 flex justify-center">
          <GoogleRatingBadgeClient />
        </div>

      </div>
    </main>
  )
}
