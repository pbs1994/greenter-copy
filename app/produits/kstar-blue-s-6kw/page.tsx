import Image from "next/image"
import Link from "next/link"
import { Shield, Wifi, Gauge, Check, Battery, Sun, Thermometer, ChevronRight, HelpCircle, Truck, Wrench } from "lucide-react"
import { BuyButton } from "@/components/BuyButton"
import { ProductSchema } from "@/components/schemas/ProductSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import Stripe from 'stripe'

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

export default async function ProductPage() {
  const stripePrice = await getStripePrice()
  
  const faqItems = [
    {
      question: `Qu'est-ce qui est inclus dans le prix de ${stripePrice.toLocaleString('fr-FR')} € ?`,
      answer: "Le prix comprend l'onduleur hybride KSTAR BluE-S 6kW, la livraison à domicile et l'installation complète par nos techniciens certifiés. Si vous ne souhaitez pas l'installation, seule la livraison est effectuée au même tarif."
    },
    {
      question: "Quelle est la durée de vie des batteries LiFePO4 ?",
      answer: "Les cellules LiFePO4 CATL intégrées sont garanties pour 10 000 cycles de charge/décharge, soit environ 25-30 ans d'utilisation normale. KSTAR offre une garantie de 10 ans sur les batteries."
    },
    {
      question: "Puis-je installer le système en extérieur ?",
      answer: "Oui, le système est certifié IP65, ce qui signifie une protection totale contre la poussière et les jets d'eau. Cependant, il est recommandé de l'installer dans un local technique car les batteries ne doivent pas être chargées en dessous de 0°C."
    },
    {
      question: "Quelle est la plage de température de fonctionnement ?",
      answer: "L'onduleur fonctionne de -25°C à +60°C. Les batteries fonctionnent de 0°C à +50°C en charge et de -10°C à +50°C en décharge."
    },
    {
      question: "Combien de panneaux solaires puis-je connecter ?",
      answer: "Le KSTAR BluE-S 6kW accepte jusqu'à 6,5 kW de panneaux solaires avec une tension d'entrée maximale de 580V et un double tracker MPPT pour optimiser la production."
    },
    {
      question: "Que se passe-t-il en cas de coupure de courant ?",
      answer: "Le système bascule instantanément sur les batteries en cas de coupure réseau. Vous ne remarquerez même pas l'interruption - vos appareils continuent de fonctionner normalement."
    },
    {
      question: "Comment surveiller ma production et consommation ?",
      answer: "L'application Solarman Smart (disponible sur iOS et Android) permet de suivre en temps réel votre production solaire, consommation, état des batteries et historique. Une interface web est également disponible."
    },
    {
      question: "Puis-je ajouter des batteries supplémentaires plus tard ?",
      answer: "Oui, le système est évolutif. Vous pouvez ajouter jusqu'à 4 modules BluE-PACK5.1 (20,4 kWh au total) pour augmenter votre autonomie selon vos besoins."
    },
    {
      question: "Quelle est la garantie du produit ?",
      answer: "L'onduleur est garanti 5 ans par le fabricant KSTAR. Les batteries LiFePO4 CATL bénéficient d'une garantie de 10 ans. Notre installation est garantie 2 ans main d'œuvre."
    },
    {
      question: "Le système est-il bruyant ?",
      answer: "Non, le KSTAR BluE-S est remarquablement silencieux même sous forte charge. Un léger son haute fréquence peut être perçu à moins de 2-3 mètres, mais il est imperceptible au-delà."
    },
    {
      question: "Quelle autonomie puis-je espérer ?",
      answer: "Avec une consommation moyenne de 300-500 Wh (éclairage, réfrigérateur, box internet), une batterie de 10 kWh offre 20 à 30 heures d'autonomie. En mode économique, vous pouvez atteindre près de 3 jours."
    },
    {
      question: "Le système est-il compatible avec mon installation existante ?",
      answer: "Le KSTAR BluE-S 6kW est un onduleur hybride monophasé 230V compatible avec la plupart des installations résidentielles françaises. Nos techniciens évaluent la compatibilité lors de la visite préalable incluse."
    }
  ]
  
  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Produits", url: "https://greenter.fr/produits" },
    { name: "KSTAR BluE-S 6kW", url: "https://greenter.fr/produits/kstar-blue-s-6kw" }
  ]

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

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-green-50/80 via-white to-white py-6 md:py-8">
      <ProductSchema
        name="KSTAR BluE-S 6kW - Onduleur Hybride Batterie Solaire"
        description="Onduleur hybride tout-en-un avec batteries LiFePO4 CATL intégrées. 6kW de puissance nominale, 10 000 cycles garantis, rendement solaire 97%. Basculement instantané en cas de coupure. Livraison et installation incluses."
        image="https://greenter.fr/kstar.png"
        price={stripePrice}
        currency="EUR"
        availability="InStock"
        brand="KSTAR"
        sku="KSTAR-BLUES-6KW"
        url="https://greenter.fr/produits/kstar-blue-s-6kw"
      />
      <FAQPageSchema items={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 md:mb-8">
          <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link href="/produits" className="text-neutral-400 hover:text-neutral-600 transition-colors">
            Produits
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-medium">KSTAR BluE-S 6kW</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left - Product Image */}
          <div className="relative order-1">
            <div className="relative aspect-square md:aspect-[4/5] max-h-[50vh] md:max-h-[60vh] bg-gradient-to-br from-green-50 to-white rounded-2xl md:rounded-[2rem] flex items-center justify-center overflow-hidden ring-1 ring-green-100/50 group mx-auto max-w-sm lg:max-w-none">
              {/* Decorative blurs */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-24 md:w-32 h-24 md:h-32 bg-green-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-8 w-32 md:w-40 h-32 md:h-40 bg-teal-100/40 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-16 md:h-20 bg-green-300/20 blur-2xl" />
              
              {/* Badges Livraison + Installation - en bas, côte à côte */}
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
              
              <Image
                src="/kstar.png"
                alt="KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4 pour autoconsommation"
                width={260}
                height={320}
                className="relative z-10 w-auto h-auto max-h-[60%] md:max-h-[65%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>

            {/* Specs badges - Hidden on mobile */}
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
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-none mb-1">
              <span className="sr-only">Onduleur Hybride Batterie Solaire - </span>
              KSTAR <span className="text-teal-600">BluE-S</span> 6kW
              <span className="sr-only"> - Système de stockage solaire tout-en-un avec batteries LiFePO4</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-neutral-500 mb-4 md:mb-5">
              L'indépendance énergétique, <span className="italic">simplifiée.</span>
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-3 md:mb-4">
              <p className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
                {stripePrice.toLocaleString('fr-FR')} €
              </p>
              <span className="text-sm text-neutral-400">TTC</span>
            </div>

            {/* Description */}
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-5 md:mb-6 max-w-md mx-auto lg:mx-0">
              Onduleur, batteries LiFePO4 et gestion intelligente réunis dans un système premium. 
              Cellules CATL garanties 10 000 cycles. Basculement instantané en cas de coupure.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6 md:mb-8">
              <BuyButton />
              <a 
                href="/KSTAR BLUE-S SERIES ESS 6KW.pdf" 
                target="_blank"
                className="bg-white border border-neutral-200 hover:border-green-200 hover:bg-green-50 text-neutral-700 font-medium py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center justify-center"
              >
                Fiche technique
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

            {/* Mobile Specs */}
            <div className="md:hidden mt-6 p-4 bg-green-50/50 rounded-xl">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">Spécifications</p>
              <ul className="space-y-2">
                {specs.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-neutral-600">
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Delivery & Installation Notice */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Wrench className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Livraison et installation incluses</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Le prix affiché comprend la livraison à domicile et l'installation complète par nos techniciens certifiés RGE. 
                Si vous ne souhaitez pas l'installation, seule la livraison est effectuée — le tarif reste identique.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-16">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full mb-3">
              <HelpCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">
              Tout savoir sur le KSTAR BluE-S 6kW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="p-5 md:p-6 bg-white rounded-xl border border-neutral-100 hover:border-green-200 hover:shadow-sm transition-all duration-300"
              >
                <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2 leading-snug">
                  {item.question}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
