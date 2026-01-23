"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Home, Thermometer, Shield, Phone, ChevronDown, Euro, Flame, Wind } from "lucide-react"
import { useState } from "react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"

const zones = [
  {
    title: "Combles & Toiture",
    percentage: "30%",
    description: "La toiture est la première source de déperdition thermique. L'isolation des combles est le chantier le plus rentable.",
    icon: Home,
    techniques: ["Soufflage laine de verre", "Rouleaux laine de roche", "Ouate de cellulose"],
  },
  {
    title: "Murs",
    percentage: "25%",
    description: "L'isolation des murs par l'intérieur (ITI) ou l'extérieur (ITE) améliore considérablement le confort.",
    icon: Shield,
    techniques: ["ITE polystyrène", "ITI laine minérale", "Bardage isolant"],
  },
  {
    title: "Planchers bas",
    percentage: "10%",
    description: "Isoler le plancher sur cave, garage ou vide sanitaire supprime la sensation de sol froid.",
    icon: Flame,
    techniques: ["Flocage sous plancher", "Panneaux rigides", "Chape isolante"],
  },
  {
    title: "Fenêtres",
    percentage: "15%",
    description: "Le remplacement des fenêtres simple vitrage par du double ou triple vitrage réduit les ponts thermiques.",
    icon: Wind,
    techniques: ["Double vitrage", "Triple vitrage", "Menuiseries PVC/Alu"],
  },
]

const benefits = [
  {
    icon: Thermometer,
    title: "Confort été comme hiver",
    description: "Fini les variations de température. Votre maison reste fraîche l'été et chaude l'hiver.",
  },
  {
    icon: Euro,
    title: "Jusqu'à 30% d'économies",
    description: "Réduisez significativement vos besoins en chauffage et climatisation.",
  },
  {
    icon: Flame,
    title: "Moins de chauffage",
    description: "Une maison bien isolée nécessite un système de chauffage moins puissant.",
  },
  {
    icon: Shield,
    title: "Valorisation du bien",
    description: "Améliorez votre DPE et la valeur de votre patrimoine immobilier.",
  },
]

const materials = [
  {
    name: "Laine de verre",
    type: "Minéral",
    r: "R = 7 m².K/W (240mm)",
    pros: ["Économique", "Bon rapport qualité/prix", "Incombustible"],
  },
  {
    name: "Laine de roche",
    type: "Minéral",
    r: "R = 7 m².K/W (240mm)",
    pros: ["Excellent phonique", "Résistant au feu", "Durable"],
  },
  {
    name: "Ouate de cellulose",
    type: "Biosourcé",
    r: "R = 7 m².K/W (280mm)",
    pros: ["Écologique", "Bon déphasage", "Recyclé"],
  },
  {
    name: "Fibre de bois",
    type: "Biosourcé",
    r: "R = 7 m².K/W (280mm)",
    pros: ["Confort d'été", "Perspirant", "Naturel"],
  },
]

const faqs = [
  {
    question: "Par où commencer l'isolation de ma maison ?",
    answer: "Commencez toujours par la toiture/combles qui représentent 30% des déperditions. C'est le chantier le plus rentable. Ensuite, les murs (25%) puis les fenêtres et planchers. Un audit énergétique permet de prioriser les travaux.",
  },
  {
    question: "Quelle épaisseur d'isolant faut-il prévoir ?",
    answer: "Pour atteindre les performances exigées par la RE2020 et bénéficier des aides, visez R ≥ 7 m².K/W en combles (environ 30cm de laine minérale) et R ≥ 3,7 m².K/W en murs. Nous dimensionnons selon votre projet et les aides visées.",
  },
  {
    question: "ITE ou ITI : quelle isolation des murs choisir ?",
    answer: "L'ITE (par l'extérieur) est plus performante car elle supprime les ponts thermiques et ne réduit pas la surface habitable. L'ITI (par l'intérieur) est moins coûteuse et plus simple à mettre en œuvre. Le choix dépend de votre budget et des contraintes architecturales.",
  },
  {
    question: "Quelles sont les aides pour l'isolation ?",
    answer: "MaPrimeRénov' (jusqu'à 75€/m² pour l'ITE), les CEE (primes énergie), l'éco-PTZ et la TVA à 5,5%. Les montants varient selon vos revenus et le type de travaux. Nous vous accompagnons pour maximiser vos aides.",
  },
  {
    question: "Combien de temps durent les travaux d'isolation ?",
    answer: "L'isolation des combles perdus par soufflage se fait en quelques heures. L'isolation des murs par l'intérieur prend 2 à 5 jours selon la surface. L'ITE nécessite 2 à 4 semaines pour une maison complète.",
  },
]

export default function IsolationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Isolation thermique", url: "https://greenter.fr/services/isolation" }
  ]

  return (
    <main>
      <ServiceSchema
        name="Isolation Thermique"
        description="Isolation thermique de votre maison partout en France. Combles, murs (ITE/ITI), planchers. Certifié RGE. Jusqu'à 30% d'économies. Éligible MaPrimeRénov' et CEE. Devis gratuit."
        url="https://greenter.fr/services/isolation"
        image="https://greenter.fr/isolation.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      {/* Hero Section - Design avec schéma maison */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Home className="w-4 h-4" />
                Certifié RGE Qualibat
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6">
                Isolation thermique : stoppez les déperditions de chaleur
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                Isolation des combles, murs et planchers partout en France. 
                Gagnez en confort et réduisez vos factures de chauffage jusqu'à 30%.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Jusqu'à 30% d'économies</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Éligible MaPrimeRénov'</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Confort été/hiver</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Matériaux certifiés</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Diagnostic isolation gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33609455056" className="btn-secondary text-base px-8 py-4">
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            {/* Schéma maison avec déperditions */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* House illustration placeholder */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-100 to-amber-50 rounded-3xl" />
                
                {/* Déperdition indicators */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Wind className="w-3 h-3" />
                  30% Toiture
                </div>
                <div className="absolute top-1/3 left-2 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Wind className="w-3 h-3" />
                  25% Murs
                </div>
                <div className="absolute top-1/3 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Wind className="w-3 h-3" />
                  15% Fenêtres
                </div>
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Wind className="w-3 h-3" />
                  10% Plancher
                </div>

                {/* House image */}
                <div className="absolute inset-8 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/isolation.jpg"
                    alt="Isolation thermique maison"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones à isoler */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Zones prioritaires
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Où isoler en priorité ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Chaque zone de votre maison contribue aux déperditions thermiques. 
              Identifiez les travaux les plus rentables.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {zones.map((zone, index) => {
              const Icon = zone.icon
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 ring-1 ring-orange-200 hover:ring-orange-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                      {zone.percentage} des pertes
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                    {zone.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {zone.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {zone.techniques.map((technique, i) => (
                      <span key={i} className="bg-white text-neutral-600 text-xs px-2.5 py-1 rounded-full ring-1 ring-neutral-200">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Bénéfices
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Pourquoi isoler votre maison ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Matériaux */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Matériaux
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Des isolants performants et durables
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Nous sélectionnons les meilleurs matériaux selon votre projet : 
              performance thermique, confort d'été, impact environnemental.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                  {material.type}
                </span>
                <h3 className="font-heading text-lg font-bold text-neutral-900 mt-1 mb-2">
                  {material.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-4">{material.r}</p>
                <ul className="space-y-1">
                  {material.pros.map((pro, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aides */}
      <section className="py-16 md:py-24 bg-green-900 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-green-300 font-semibold text-sm uppercase tracking-wider mb-3">
                Aides financières
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Financez vos travaux d'isolation
              </h2>
              <p className="text-green-100 text-lg mb-8">
                En tant qu'artisan RGE, vos travaux sont éligibles aux principales aides. 
                Nous gérons toutes les démarches administratives.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <Euro className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">MaPrimeRénov'</h4>
                    <p className="text-sm text-green-200">Jusqu'à 75€/m² pour l'ITE selon revenus</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <Shield className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Prime CEE</h4>
                    <p className="text-sm text-green-200">Cumulable avec MaPrimeRénov'</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <Home className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Éco-PTZ</h4>
                    <p className="text-sm text-green-200">Jusqu'à 50 000€ à taux zéro</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-neutral-900">
              <h3 className="font-heading text-xl font-bold mb-6">
                Exemple : Isolation combles 80m²
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Travaux isolation</span>
                  <span className="font-semibold">3 200 €</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">MaPrimeRénov'</span>
                  <span className="font-semibold text-green-600">- 1 600 €</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Prime CEE</span>
                  <span className="font-semibold text-green-600">- 800 €</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-semibold">Reste à charge</span>
                  <span className="text-2xl font-bold text-green-700">800 €</span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 mb-6">
                *Exemple pour un ménage aux revenus modestes. Montant variable selon situation.
              </p>

              <Link href="/contact" className="btn-primary w-full justify-center">
                Estimer mes aides
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
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
              Tout savoir sur l'isolation thermique
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Thermometer className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Améliorez le confort de votre maison
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Diagnostic isolation gratuit et sans engagement. 
            Identifiez les travaux prioritaires et les aides disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-orange-700 font-semibold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors">
              Demander mon diagnostic gratuit
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
            Complétez votre rénovation
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/services/pompe-a-chaleur" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Thermometer className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Pompe à chaleur</p>
                <p className="text-sm text-neutral-500">Chauffage performant</p>
              </div>
            </Link>
            <Link href="/services/panneaux-solaires" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Panneaux solaires</p>
                <p className="text-sm text-neutral-500">Produisez votre énergie</p>
              </div>
            </Link>
            <Link href="/services/audit" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Audit énergétique</p>
                <p className="text-sm text-neutral-500">Priorisez vos travaux</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
