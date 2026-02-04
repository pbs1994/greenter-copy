"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Thermometer, Zap, Leaf, Shield, Phone, ChevronDown, Euro, Clock, Award } from "lucide-react"
import { useState } from "react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"

const pacTypes = [
  {
    title: "PAC Air-Eau",
    description: "Idéale pour le chauffage central et l'eau chaude sanitaire. Se raccorde à vos radiateurs ou plancher chauffant existants.",
    image: "/pac-air_eau.svg",
    specs: ["COP jusqu'à 5", "Chauffage + ECS", "Compatible radiateurs"],
    popular: true,
  },
  {
    title: "PAC Air-Air",
    description: "Solution réversible pour chauffer l'hiver et climatiser l'été. Installation rapide, idéale en rénovation.",
    image: "/pac-air-air.svg",
    specs: ["Réversible chaud/froid", "Installation simple", "Pièce par pièce"],
    popular: false,
  },
  {
    title: "PAC Géothermique",
    description: "Performance maximale grâce à l'énergie du sol. Rendement stable toute l'année, indépendant de la météo.",
    image: "/pac-geo.jpg",
    specs: ["COP jusqu'à 6", "Rendement constant", "Très silencieuse"],
    popular: false,
  },
]

const advantages = [
  {
    icon: Euro,
    title: "Jusqu'à 70% d'économies",
    description: "Divisez votre facture de chauffage par 3 grâce à un rendement exceptionnel.",
  },
  {
    icon: Leaf,
    title: "Énergie renouvelable",
    description: "Captez les calories de l'air extérieur, une ressource gratuite et inépuisable.",
  },
  {
    icon: Thermometer,
    title: "Confort toute l'année",
    description: "Chauffage en hiver, climatisation en été avec les modèles réversibles.",
  },
  {
    icon: Shield,
    title: "Garantie décennale",
    description: "Installation certifiée RGE avec garantie décennale sur la pose.",
  },
]

const steps = [
  {
    number: "01",
    title: "Visite technique",
    description: "Un technicien évalue votre logement et vos besoins pour dimensionner la PAC idéale.",
  },
  {
    number: "02",
    title: "Devis détaillé",
    description: "Recevez un devis transparent avec le montant des aides déduites.",
  },
  {
    number: "03",
    title: "Installation",
    description: "Pose par nos équipes certifiées RGE en 1 à 2 jours.",
  },
  {
    number: "04",
    title: "Mise en service",
    description: "Paramétrage optimal et formation à l'utilisation de votre équipement.",
  },
]

const faqs = [
  {
    question: "Combien coûte l'installation d'une pompe à chaleur ?",
    answer: "Le coût varie selon le type de PAC et la surface à chauffer. Comptez entre 8 000€ et 18 000€ avant aides pour une PAC air-eau. Avec MaPrimeRénov' et les CEE, le reste à charge peut être réduit de 40 à 70% selon vos revenus.",
  },
  {
    question: "Une PAC fonctionne-t-elle par grand froid ?",
    answer: "Oui, les PAC modernes fonctionnent jusqu'à -15°C voire -25°C pour certains modèles. Le COP diminue légèrement mais reste très avantageux par rapport à un chauffage électrique classique.",
  },
  {
    question: "Quelle est la durée de vie d'une pompe à chaleur ?",
    answer: "Une PAC bien entretenue dure en moyenne 15 à 20 ans. L'entretien annuel obligatoire (pour les PAC > 4kW) permet de maintenir ses performances et prolonger sa durée de vie.",
  },
  {
    question: "Puis-je garder mes radiateurs existants ?",
    answer: "Oui, une PAC air-eau se raccorde à votre circuit de chauffage existant (radiateurs ou plancher chauffant). Un dimensionnement correct permet de conserver vos émetteurs actuels.",
  },
  {
    question: "L'installation est-elle bruyante ?",
    answer: "Les PAC modernes sont très silencieuses (25-45 dB). L'unité extérieure doit respecter la réglementation sur le bruit de voisinage. Nous veillons à un positionnement optimal.",
  },
]

const brands = [
  { name: "Daikin", logo: "/partners/daikin.svg" },
  { name: "Atlantic", logo: "/partners/atlantic.svg" },
  { name: "Mitsubishi", logo: "/partners/mitsubishi.svg" },
  { name: "Panasonic", logo: "/partners/panasonic.svg" },
  { name: "Bosch", logo: "/partners/bosch.svg" },
  { name: "Toshiba", logo: "/partners/toshiba.svg" },
]

export default function PompeAChaleurPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Pompe à chaleur", url: "https://greenter.fr/services/pompe-a-chaleur" }
  ]

  return (
    <main>
      <ServiceSchema
        name="Installation Pompe à Chaleur"
        description="Installation de pompes à chaleur air-eau et air-air partout en France. Certifié RGE QualiPAC. Jusqu'à 70% d'économies sur votre chauffage. Éligible MaPrimeRénov'. Devis gratuit sous 48h."
        url="https://greenter.fr/services/pompe-a-chaleur"
        image="https://greenter.fr/pac.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Certifié RGE QualiPAC
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Pompe à chaleur : divisez vos factures de chauffage par 3
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-8">
                Installation de pompes à chaleur air-eau et air-air partout en France. 
                Profitez d'un chauffage performant et économique, éligible aux aides de l'État.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span>Jusqu'à 70% d'économies</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span>Éligible MaPrimeRénov'</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span>Garantie décennale</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33609455056" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-green-900 text-base px-8 py-4">
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pac.jpg"
                  alt="Installation pompe à chaleur par Greenter"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">-70%</p>
                    <p className="text-sm text-neutral-600">sur vos factures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de PAC */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Solutions adaptées
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Quel type de pompe à chaleur choisir ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Chaque projet est unique. Découvrez la solution la plus adaptée à votre logement et vos besoins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pacTypes.map((pac, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
                  pac.popular ? 'ring-2 ring-teal-500' : 'ring-1 ring-neutral-200'
                }`}
              >
                {pac.popular && (
                  <div className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    Plus populaire
                  </div>
                )}
                <div className="relative h-48">
                  <Image
                    src={pac.image}
                    alt={pac.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                    {pac.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {pac.description}
                  </p>
                  <ul className="space-y-2">
                    {pac.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Pourquoi choisir la PAC
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Les avantages de la pompe à chaleur
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {advantage.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Aides financières */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
                Aides financières
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Réduisez le coût de votre installation
              </h2>
              <p className="text-neutral-600 text-lg mb-8">
                En tant qu'installateur certifié RGE, vos travaux sont éligibles aux principales aides de l'État. 
                Nous vous accompagnons dans toutes vos démarches administratives.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                    <Euro className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">MaPrimeRénov'</h4>
                    <p className="text-sm text-neutral-600">Jusqu'à 5 000€ selon vos revenus</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Prime CEE</h4>
                    <p className="text-sm text-neutral-600">Jusqu'à 4 000€ cumulables</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">TVA réduite 5,5%</h4>
                    <p className="text-sm text-neutral-600">Appliquée automatiquement</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-2xl p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-2">
                Exemple de financement
              </h3>
              <p className="text-green-200 mb-6">PAC air-eau 8kW pour maison 120m²</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-green-700">
                  <span className="text-green-200">Prix installation</span>
                  <span className="font-semibold">14 000 €</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-700">
                  <span className="text-green-200">MaPrimeRénov'</span>
                  <span className="font-semibold text-teal-400">- 4 000 €</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-700">
                  <span className="text-green-200">Prime CEE</span>
                  <span className="font-semibold text-teal-400">- 2 500 €</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-semibold">Reste à charge</span>
                  <span className="text-2xl font-bold">7 500 €</span>
                </div>
              </div>

              <p className="text-xs text-green-300 mb-6">
                *Exemple pour un ménage aux revenus intermédiaires. Montant variable selon situation.
              </p>

              <Link href="/contact" className="btn-primary w-full justify-center">
                Estimer mes aides
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Notre accompagnement
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Votre projet en 4 étapes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md h-full">
                  <span className="text-4xl font-bold text-green-200 mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-green-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="py-12 bg-white border-y border-neutral-100">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-center text-neutral-500 text-sm mb-8">
            Nous installons les meilleures marques de pompes à chaleur
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <div key={index} className="h-10 w-24 md:w-28 relative grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
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
              Tout savoir sur la pompe à chaleur
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-neutral-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-green-50 transition-colors"
                >
                  <span className="font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-green-700 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-900 via-green-800 to-teal-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à réduire vos factures de chauffage ?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Obtenez votre devis personnalisé gratuit sous 48h. 
            Nos experts vous accompagnent de A à Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander mon devis gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33609455056" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-green-900 text-base px-8 py-4">
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
            Services complémentaires
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/services/panneaux-solaires" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Panneaux solaires</p>
                <p className="text-sm text-neutral-500">Produisez votre électricité</p>
              </div>
            </Link>
            <Link href="/services/isolation" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Isolation thermique</p>
                <p className="text-sm text-neutral-500">Réduisez les déperditions</p>
              </div>
            </Link>
            <Link href="/services/audit" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Audit énergétique</p>
                <p className="text-sm text-neutral-500">Identifiez vos priorités</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
