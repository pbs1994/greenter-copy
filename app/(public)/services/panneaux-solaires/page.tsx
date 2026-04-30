import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Sun, Zap, TrendingUp, Shield, Phone, ChevronDown, Euro, Battery, BarChart3 } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import ServiceAreaSection from "@/components/ServiceAreaSection"

const CURRENT_YEAR = new Date().getFullYear()

const solutions = [
  {
    title: "Autoconsommation",
    description: "Consommez directement l'électricité que vous produisez. Idéal pour réduire votre facture au quotidien.",
    icon: Zap,
    benefits: ["Économies immédiates", "Indépendance énergétique", "Valorisation du logement"],
  },
  {
    title: "Autoconsommation + Batterie",
    description: "Stockez le surplus pour l'utiliser le soir. Maximisez votre taux d'autoconsommation jusqu'à 80%. La solution la plus rentable depuis mars 2025.",
    icon: Battery,
    benefits: ["Autonomie renforcée", "Consommation le soir", "Protection coupures"],
    recommended: true,
    link: "/produits/batterie-solaire-kstar-6kw",
  },
  {
    title: "Revente surplus EDF OA",
    description: "Revendez l'électricité non consommée à EDF. Attention : tarif de rachat réduit à 0,04€/kWh depuis mars 2025.",
    icon: Euro,
    benefits: ["Revenu garanti 20 ans", "Tarif fixe", "Rentabilité limitée"],
  },
]

const stats = [
  { value: "30-70%", label: "d'économies sur votre facture" },
  { value: "6-10 ans", label: "retour sur investissement" },
  { value: "25-30 ans", label: "durée de vie des panneaux" },
  { value: "0,04€", label: `tarif rachat kWh (${CURRENT_YEAR})`, warning: true },
]

const steps = [
  {
    number: "1",
    title: "Étude de faisabilité",
    description: "Analyse de votre toiture, orientation, ombrage et consommation électrique.",
    icon: BarChart3,
  },
  {
    number: "2",
    title: "Proposition personnalisée",
    description: "Dimensionnement optimal et simulation de production avec les aides déduites.",
    icon: Sun,
  },
  {
    number: "3",
    title: "Installation",
    description: "Pose par nos équipes certifiées QualiPV en 1 à 3 jours selon la puissance.",
    icon: Zap,
  },
  {
    number: "4",
    title: "Raccordement",
    description: "Démarches Enedis et mise en service. Vous produisez votre électricité !",
    icon: TrendingUp,
  },
]

const faqs = [
  {
    question: "Les panneaux solaires sont-ils rentables en France ?",
    answer: "Oui, même dans le nord de la France. L'ensoleillement est suffisant pour une rentabilité en 6 à 10 ans. Dans le sud, le retour sur investissement peut être atteint en 5 à 7 ans. Les panneaux ont une durée de vie de 25 à 30 ans.",
  },
  {
    question: "Quelle puissance installer pour ma maison ?",
    answer: "La puissance dépend de votre consommation et de la surface disponible. Pour une maison de 100m², on recommande généralement 3 à 6 kWc (8 à 16 panneaux). Notre étude gratuite détermine le dimensionnement optimal.",
  },
  {
    question: `Quelles sont les aides pour le solaire en ${CURRENT_YEAR} ?`,
    answer: "Vous bénéficiez de la prime à l'autoconsommation de 80€/kWc (soit 480€ pour 6kWc), de la TVA réduite à 10%. Attention : la prime a été réduite (anciennement 160-220€/kWc) et le tarif de rachat est passé de 12,69 à 4 centimes/kWh depuis mars 2025.",
  },
  {
    question: "Faut-il une autorisation pour installer des panneaux ?",
    answer: "Une déclaration préalable de travaux en mairie est obligatoire. Nous nous chargeons de toutes les démarches administratives : mairie, Enedis, EDF OA, Consuel.",
  },
  {
    question: `Revente ou stockage batterie : que choisir en ${CURRENT_YEAR} ?`,
    answer: "Avec le tarif de rachat à 4 centimes/kWh (contre 12,69 centimes avant mars 2025), la revente n'est plus aussi intéressante. Le stockage batterie devient la solution la plus rentable : vous consommez votre propre électricité valorisée à ~25 centimes/kWh au lieu de la revendre à 4 centimes.",
  },
  {
    question: "Que se passe-t-il en cas de panne ou d'orage ?",
    answer: "Les panneaux sont garantis 25 ans en production et l'onduleur 10 à 12 ans. Votre installation est couverte par votre assurance habitation. En cas de coupure réseau, l'installation se met en sécurité automatiquement (sauf si vous avez une batterie).",
  },
]

const brands = [
  { name: "SunPower", logo: "/partners/sunpower.svg" },
  { name: "Enphase", logo: "/partners/enphase.svg" },
  { name: "LG", logo: "/partners/lg.svg" },
  { name: "Panasonic", logo: "/partners/panasonic.svg" },
]

export default function PanneauxSolairesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
    { name: "Panneaux solaires", url: "https://www.greenter.fr/services/panneaux-solaires" }
  ]

  return (
    <main>
      <ServiceSchema
        name="Installation Panneaux Solaires Photovoltaïques"
        description="Installation de panneaux solaires photovoltaïques partout en France. Autoconsommation et revente surplus. Certifié RGE QualiPV. Jusqu'à 70% d'économies. Prime autoconsommation incluse."
        url="https://www.greenter.fr/services/panneaux-solaires"
        image="https://www.greenter.fr/solaire.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      {/* Hero Section - Design lumineux */}
      <section className="relative bg-gradient-to-b from-amber-50 via-white to-white overflow-hidden">
        {/* Decorative sun rays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-2xl" />

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Sun className="w-4 h-4" />
                Certifié RGE QualiPV
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6">
                Panneaux solaires : produisez votre propre électricité
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                Installation photovoltaïque partout en France. Autoconsommation ou revente, 
                réduisez votre facture d'électricité et gagnez en indépendance énergétique.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Jusqu'à 70% d'économies</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Prime autoconsommation</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Garantie 25 ans</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Démarches incluses</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Étude gratuite de ma toiture
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33609455056" className="btn-secondary text-base px-8 py-4">
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-neutral-200">
                <Image
                  src="/solaire.jpg"
                  alt="Installation panneaux solaires par Greenter"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Stats floating cards */}
              <div className="absolute -bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <p className="text-2xl font-bold text-green-600">-70%</p>
                  <p className="text-xs text-neutral-600">sur votre facture</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <p className="text-2xl font-bold text-amber-600">25 ans</p>
                  <p className="text-xs text-neutral-600">de garantie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 bg-green-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-green-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Nos solutions
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Autoconsommation ou revente : quel choix ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Chaque projet est unique. Nous vous conseillons la solution la plus adaptée à votre consommation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              const isRecommended = 'recommended' in solution && solution.recommended
              const hasLink = 'link' in solution && solution.link
              return (
                <div 
                  key={index}
                  className={`relative bg-gradient-to-b from-green-50 to-white rounded-2xl p-6 ring-1 hover:shadow-lg transition-all ${
                    isRecommended ? 'ring-green-500 ring-2' : 'ring-green-200 hover:ring-green-400'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Recommandé {CURRENT_YEAR}
                    </span>
                  )}
                  <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-5">
                    {solution.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  {hasLink && (
                    <Link 
                      href={solution.link as string}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                    >
                      Voir notre batterie KSTAR
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Simulation / Rentabilité */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Alerte changement tarifs 2025 */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Nouveaux tarifs depuis mars 2025</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Le tarif de rachat du surplus est passé de <strong>12,69 à 4 centimes/kWh</strong> et la prime d'autoconsommation 
                  de 160-220€/kWc à <strong>80€/kWc</strong>. Conséquence : <strong>le stockage batterie devient la solution la plus rentable</strong> 
                  pour maximiser vos économies. Vous consommez votre électricité à ~25 cts/kWh au lieu de la revendre à 4 cts.
                </p>
                <Link href="/produits/batterie-solaire-kstar-6kw" className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm mt-3 hover:text-amber-900">
                  Découvrir notre batterie solaire KSTAR
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-6">
                  Exemple de rentabilité (tarifs {CURRENT_YEAR})
                </h3>
                <p className="text-neutral-600 text-sm mb-6">
                  Installation 6 kWc (16 panneaux) en autoconsommation avec batterie
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Coût installation panneaux</span>
                    <span className="font-semibold text-neutral-900">12 500 €</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Batterie solaire KSTAR 6kW</span>
                    <span className="font-semibold text-neutral-900">2 500 €</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Prime autoconsommation (80€/kWc)</span>
                    <span className="font-semibold text-green-600">- 480 €</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Coût net</span>
                    <span className="font-bold text-neutral-900">14 520 €</span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-700">Économies annuelles (80% autoconso)</span>
                    <span className="font-bold text-green-700">~1 800 €/an</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Retour sur investissement</span>
                    <span className="font-bold text-green-700">~8 ans</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-500">
                  *Estimation basée sur 8 000 kWh/an, tarif électricité 0,25€/kWh, ensoleillement moyen France.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
                Rentabilité {CURRENT_YEAR}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Stockez plutôt que revendre : la nouvelle donne
              </h2>
              <p className="text-neutral-600 text-lg mb-6">
                Avec le tarif de rachat à 4 cts/kWh, revendre votre surplus n'est plus rentable. 
                La solution ? <strong>Stocker votre électricité</strong> pour la consommer le soir, 
                quand vos panneaux ne produisent plus.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Battery className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Autoconsommation maximisée</h4>
                    <p className="text-sm text-neutral-600">Passez de 30% à 80% d'autoconsommation avec une batterie</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Protection contre la hausse des prix</h4>
                    <p className="text-sm text-neutral-600">Votre électricité solaire reste gratuite pendant 25+ ans</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Autonomie en cas de coupure</h4>
                    <p className="text-sm text-neutral-600">Continuez à avoir du courant même pendant les pannes réseau</p>
                  </div>
                </div>
              </div>

              <Link 
                href="/produits/batterie-solaire-kstar-6kw" 
                className="inline-flex items-center gap-2 mt-8 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
              >
                Voir notre batterie solaire
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Processus - Timeline verticale */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Votre projet solaire
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              De l'étude à la production en 4 étapes
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2" />

            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0
                return (
                  <div key={index} className={`relative flex items-center gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="bg-green-50 rounded-xl p-5">
                        <span className="text-green-600 font-bold text-sm">Étape {step.number}</span>
                        <h3 className="font-heading text-lg font-bold text-neutral-900 mt-1 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-center text-neutral-500 text-sm mb-8">
            Nous installons des panneaux et onduleurs premium
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {brands.map((brand, index) => (
              <div key={index} className="h-10 w-28 md:w-32 relative grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Questions fréquentes
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Tout savoir sur le solaire photovoltaïque
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                {...(index === 0 ? { open: true } : {})}
                className="group border border-neutral-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
              >
                <summary className="w-full flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-green-700 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Sun className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Passez à l'énergie solaire
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Étude de faisabilité gratuite et sans engagement. 
            Découvrez le potentiel solaire de votre toiture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 font-semibold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors">
              Demander mon étude gratuite
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33609455056" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" />
              06 09 45 50 56
            </a>
          </div>
        </div>
      </section>

      {/* Services complémentaires */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h3 className="font-heading text-xl font-bold text-neutral-900 text-center mb-8">
            Optimisez votre installation
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/services/pompe-a-chaleur" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Pompe à chaleur</p>
                <p className="text-sm text-neutral-500">Alimentée par vos panneaux</p>
              </div>
            </Link>
            <Link href="/services/isolation" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Isolation thermique</p>
                <p className="text-sm text-neutral-500">Réduisez vos besoins</p>
              </div>
            </Link>
            <Link href="/services/audit" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Audit énergétique</p>
                <p className="text-sm text-neutral-500">Optimisez votre projet</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ServiceAreaSection serviceSlug="panneaux-solaires" title="Installation solaire près de chez vous" className="bg-white" />
    </main>
  )
}
