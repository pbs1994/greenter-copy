"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Wrench, Shield, Clock, Phone, ChevronDown, AlertTriangle, Calendar, BadgeCheck, Zap } from "lucide-react"
import { useState } from "react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"

const contracts = [
  {
    name: "Essentiel",
    price: null,
    period: "/an",
    description: "Entretien annuel obligatoire",
    features: [
      "1 visite d'entretien/an",
      "Contrôle des performances",
      "Nettoyage des filtres",
      "Rapport d'intervention",
      "Rappel automatique",
    ],
    highlighted: false,
  },
  {
    name: "Sérénité",
    price: null,
    period: "/an",
    description: "Entretien + dépannage prioritaire",
    features: [
      "Tout Essentiel inclus",
      "Intervention sous 48h",
      "Main d'œuvre dépannage incluse",
      "-15% sur les pièces",
      "Assistance téléphonique",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: null,
    period: "/an",
    description: "Couverture complète",
    features: [
      "Tout Sérénité inclus",
      "Intervention sous 24h",
      "Pièces d'usure incluses",
      "Extension garantie +2 ans",
      "Bilan annuel détaillé",
    ],
    highlighted: false,
  },
]

const maintenanceTypes = [
  {
    title: "Pompe à chaleur",
    icon: Zap,
    frequency: "Obligatoire tous les 2 ans (>4kW)",
    tasks: [
      "Contrôle du circuit frigorifique",
      "Vérification des performances (COP)",
      "Nettoyage de l'unité extérieure",
      "Contrôle électrique",
      "Test des sécurités",
    ],
  },
  {
    title: "Panneaux solaires",
    icon: Zap,
    frequency: "Recommandé tous les ans",
    tasks: [
      "Nettoyage des panneaux",
      "Contrôle de l'onduleur",
      "Vérification du câblage",
      "Analyse de production",
      "Détection d'anomalies",
    ],
  },
]

const conformityServices = [
  {
    title: "Mise en conformité électrique",
    description: "Vérification et mise aux normes de votre installation électrique selon la NF C 15-100.",
  },
  {
    title: "Attestation Consuel",
    description: "Obtention du certificat de conformité obligatoire pour le raccordement au réseau.",
  },
  {
    title: "Mise en service",
    description: "Paramétrage optimal de vos équipements et formation à l'utilisation.",
  },
  {
    title: "Contrôle annuel",
    description: "Vérification du bon fonctionnement et des performances de vos installations.",
  },
]

const faqs = [
  {
    question: "L'entretien de la pompe à chaleur est-il obligatoire ?",
    answer: "Oui, depuis juillet 2020, l'entretien des PAC de plus de 4kW est obligatoire tous les 2 ans. Il doit être réalisé par un professionnel qualifié qui délivre une attestation d'entretien. Le non-respect peut entraîner la perte de garantie.",
  },
  {
    question: "Que comprend un entretien de PAC ?",
    answer: "L'entretien comprend : le contrôle de l'étanchéité du circuit frigorifique, la vérification des performances (COP), le nettoyage des filtres et de l'unité extérieure, le contrôle électrique et le test des dispositifs de sécurité.",
  },
  {
    question: "À quelle fréquence nettoyer les panneaux solaires ?",
    answer: "Un nettoyage annuel est recommandé, idéalement au printemps. Des panneaux sales peuvent perdre jusqu'à 15% de rendement. Dans les zones poussiéreuses ou avec beaucoup d'oiseaux, un nettoyage semestriel peut être nécessaire.",
  },
  {
    question: "Que faire en cas de panne ?",
    answer: "Contactez-nous au 06 09 45 50 56. Avec un contrat Sérénité ou Premium, vous bénéficiez d'une intervention prioritaire sous 24 à 48h. Sans contrat, nous intervenons dans les meilleurs délais selon disponibilité.",
  },
  {
    question: "Les contrats d'entretien sont-ils résiliables ?",
    answer: "Oui, nos contrats sont sans engagement de durée. Vous pouvez résilier à tout moment avec un préavis d'un mois. Le contrat est reconduit tacitement chaque année.",
  },
]

export default function MaintenancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Maintenance & Conformité", url: "https://greenter.fr/services/maintenance" }
  ]

  return (
    <main>
      <ServiceSchema
        name="Maintenance & Conformité"
        description="Entretien obligatoire pompe à chaleur et panneaux solaires. Contrats de maintenance, dépannage rapide, mise en conformité. Intervention sous 48h partout en France. Devis gratuit."
        url="https://greenter.fr/services/maintenance"
        image="https://greenter.fr/maintenance.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Wrench className="w-4 h-4" />
                Service après-vente
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Maintenance & conformité : prolongez la durée de vie de vos équipements
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Entretien obligatoire, dépannage rapide et mise en conformité de vos installations. 
                Préservez les performances et la garantie de vos équipements.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Intervention sous 48h</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Techniciens certifiés</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Pièces d'origine</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Déplacement offert si réparation</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33609455056" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-base px-8 py-4">
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/maintenance.jpg"
                  alt="Maintenance équipements par Greenter"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Badge urgence */}
              <div className="absolute -bottom-4 -left-4 bg-red-500 text-white rounded-xl p-4 shadow-xl hidden md:flex items-center gap-3">
                <Clock className="w-8 h-8" />
                <div>
                  <p className="font-bold">Dépannage urgent</p>
                  <p className="text-sm text-red-100">Intervention rapide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contrats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Nos contrats
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Choisissez votre niveau de protection
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Des formules adaptées à vos besoins pour un entretien serein de vos équipements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contracts.map((contract, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-6 ${
                  contract.highlighted 
                    ? 'bg-green-900 text-white ring-4 ring-green-500 scale-105' 
                    : 'bg-white ring-1 ring-neutral-200'
                }`}
              >
                {contract.highlighted && (
                  <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Le plus populaire
                  </span>
                )}
                <h3 className={`font-heading text-xl font-bold mb-1 ${
                  contract.highlighted ? 'text-white' : 'text-neutral-900'
                }`}>
                  {contract.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  contract.highlighted ? 'text-green-200' : 'text-neutral-500'
                }`}>
                  {contract.description}
                </p>
                <div className="mb-6">
                  {contract.price ? (
                    <>
                      <span className={`text-4xl font-bold ${
                        contract.highlighted ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {contract.price}€
                      </span>
                      <span className={contract.highlighted ? 'text-green-200' : 'text-neutral-500'}>
                        {contract.period}
                      </span>
                    </>
                  ) : (
                    <span className={`inline-block text-lg font-semibold px-4 py-2 rounded-full ${
                      contract.highlighted 
                        ? 'bg-green-500/30 text-green-200' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      À venir
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {contract.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${
                        contract.highlighted ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={contract.highlighted ? 'text-green-100' : 'text-neutral-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {contract.price ? (
                  <Link 
                    href="/contact"
                    className={`block text-center font-semibold py-3 rounded-full transition-colors ${
                      contract.highlighted 
                        ? 'bg-white text-green-900 hover:bg-green-50' 
                        : 'bg-green-700 text-white hover:bg-green-800'
                    }`}
                  >
                    Souscrire
                  </Link>
                ) : (
                  <button 
                    disabled
                    className={`block w-full text-center font-semibold py-3 rounded-full cursor-not-allowed ${
                      contract.highlighted 
                        ? 'bg-white/20 text-white/60' 
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    Bientôt disponible
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types de maintenance */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Entretien
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Maintenance de vos équipements
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {maintenanceTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-neutral-900">
                        {type.title}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">{type.frequency}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {type.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Alerte obligation */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1">Entretien obligatoire</h4>
              <p className="text-sm text-amber-700">
                Depuis juillet 2020, l'entretien des pompes à chaleur de plus de 4kW est obligatoire tous les 2 ans. 
                Le non-respect peut entraîner la perte de garantie constructeur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conformité */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
                Conformité
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Mise en conformité de vos installations
              </h2>
              <p className="text-neutral-600 text-lg mb-8">
                Assurez la sécurité et la légalité de vos équipements. 
                Nous vérifions et mettons aux normes vos installations.
              </p>

              <div className="space-y-4">
                {conformityServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <BadgeCheck className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{service.title}</h4>
                      <p className="text-sm text-neutral-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/conformite.jpg"
                  alt="Mise en conformité électrique"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intervention urgente */}
      <section className="py-16 md:py-20 bg-red-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <AlertTriangle className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Panne ou urgence ?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Notre équipe technique intervient rapidement pour remettre vos équipements en service. 
            Clients sous contrat : intervention prioritaire garantie.
          </p>
          <a 
            href="tel:+33609455056" 
            className="inline-flex items-center justify-center gap-3 bg-white text-red-600 font-bold text-xl px-10 py-5 rounded-full hover:bg-red-50 transition-colors"
          >
            <Phone className="w-6 h-6" />
            06 09 45 50 56
          </a>
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
              Tout savoir sur la maintenance
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Calendar className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Protégez vos équipements
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Souscrivez un contrat d'entretien et bénéficiez d'une tranquillité d'esprit toute l'année.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander un devis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33609455056" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-base px-8 py-4">
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
            Nos autres services
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/services/pompe-a-chaleur" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Pompe à chaleur</p>
                <p className="text-sm text-neutral-500">Installation neuve</p>
              </div>
            </Link>
            <Link href="/services/panneaux-solaires" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Panneaux solaires</p>
                <p className="text-sm text-neutral-500">Installation neuve</p>
              </div>
            </Link>
            <Link href="/services/audit" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Audit énergétique</p>
                <p className="text-sm text-neutral-500">Diagnostic complet</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
