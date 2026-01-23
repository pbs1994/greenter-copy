import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Battery, Truck, Wrench, ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import Stripe from 'stripe'

export const metadata: Metadata = {
  title: "Nos Produits | Batteries Solaires & Onduleurs | Greenter",
  description: "Découvrez notre sélection de batteries solaires et onduleurs hybrides. KSTAR BluE-S 6kW avec stockage LiFePO4. Livraison et installation incluses. Prix compétitifs.",
  keywords: ["batterie solaire", "onduleur hybride", "stockage énergie", "KSTAR", "LiFePO4", "autoconsommation"],
  openGraph: {
    title: "Nos Produits | Batteries Solaires & Onduleurs | Greenter",
    description: "Batteries solaires et onduleurs hybrides pour l'autoconsommation. Livraison et installation incluses.",
    url: "https://greenter.fr/produits",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://greenter.fr/produits",
  },
}

async function getStripePrice() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover',
    })
    const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!)
    return price.unit_amount ? price.unit_amount / 100 : 2500
  } catch {
    return 2500 // fallback
  }
}

export default async function ProduitsPage() {
  const stripePrice = await getStripePrice()
  
  const products = [
    {
      id: "kstar-blue-s-6kw",
      name: "KSTAR BluE-S 6kW",
      description: "Onduleur hybride tout-en-un avec batteries LiFePO4 CATL intégrées. 10 000 cycles garantis.",
      price: stripePrice,
      image: "/kstar.png",
      badge: "Populaire",
      features: ["6 kW puissance", "10 000 cycles", "Garantie 10 ans batteries"],
    },
  ]
  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" }
  ]

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": `https://greenter.fr${product.image}`,
        "url": `https://greenter.fr/produits/${product.id}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">Produits</span>
          </nav>

          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Notre catalogue
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Batteries solaires & onduleurs hybrides
            </h1>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Des équipements premium pour votre indépendance énergétique. 
              Livraison et installation incluses sur tous nos produits.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link 
                key={product.id}
                href={`/produits/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 hover:ring-green-400 hover:shadow-xl transition-all"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative bg-gradient-to-b from-green-50 to-white p-8 flex items-center justify-center h-64">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Batterie solaire onduleur hybride avec stockage LiFePO4`}
                    width={200}
                    height={240}
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges livraison/installation */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                      <Truck className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-[10px] font-medium text-neutral-700">Livraison incluse</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                      <Wrench className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-[10px] font-medium text-neutral-700">Installation incluse</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">Onduleur hybride</span>
                  </div>
                  
                  <h2 className="font-heading text-xl font-bold text-neutral-900 group-hover:text-green-700 transition-colors mb-2">
                    {product.name}
                  </h2>
                  
                  <p className="text-neutral-600 text-sm mb-4">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, i) => (
                      <span key={i} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div>
                      <span className="text-2xl font-bold text-neutral-900">{product.price.toLocaleString('fr-FR')} €</span>
                      <span className="text-sm text-neutral-500 ml-1">TTC</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm group-hover:gap-2 transition-all">
                      Voir le produit
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info box */}
          <div className="mt-12 bg-green-50 rounded-2xl p-6 md:p-8 border border-green-100">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">
                  Besoin de conseils ?
                </h3>
                <p className="text-neutral-600 text-sm">
                  Nos experts vous accompagnent dans le choix de votre équipement. 
                  Contactez-nous pour une étude personnalisée gratuite.
                </p>
              </div>
              <Link 
                href="/contact"
                className="shrink-0 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2"
              >
                Nous contacter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
