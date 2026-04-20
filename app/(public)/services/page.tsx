import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sun, Shield, Wrench, Fan, FileSearch } from "lucide-react"
import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"

export const metadata: Metadata = {
  title: "Nos Services | Rénovation Énergétique | Greenter",
  description: "Découvrez tous nos services de rénovation énergétique : pompe à chaleur, panneaux solaires, isolation thermique, audit énergétique et maintenance. Certifié RGE partout en France.",
  alternates: {
    canonical: "https://www.greenter.fr/services",
  },
}

const services = [
  {
    slug: "pompe-a-chaleur",
    title: "Pompe à chaleur",
    description: "Divisez vos factures de chauffage par 3 avec une PAC air-eau ou air-air. Installation certifiée RGE, éligible aux aides.",
    image: "/pac.jpg",
    icon: Fan,
    benefits: ["Jusqu'à 70% d'économies", "Éligible MaPrimeRénov'", "Garantie décennale"],
  },
  {
    slug: "panneaux-solaires",
    title: "Panneaux solaires",
    description: "Produisez votre propre électricité et réduisez votre facture jusqu'à 70%. Autoconsommation ou revente surplus.",
    image: "/solaire.jpg",
    icon: Sun,
    benefits: ["Prime autoconsommation", "Garantie 25 ans", "Rentabilité 6-10 ans"],
  },
  {
    slug: "isolation",
    title: "Isolation thermique",
    description: "Stoppez les déperditions de chaleur. Isolation des combles, murs et planchers pour un confort optimal.",
    image: "/isolation.jpg",
    icon: Shield,
    benefits: ["Jusqu'à 30% d'économies", "Confort été/hiver", "Matériaux certifiés"],
  },
  {
    slug: "audit",
    title: "Audit énergétique",
    description: "Identifiez vos pertes d'énergie avec un diagnostic complet. Obligatoire pour la vente des passoires thermiques.",
    image: "/audit.png",
    icon: FileSearch,
    benefits: ["Rapport détaillé", "Scénarios chiffrés", "Aides simulées"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Conformité",
    description: "Entretien obligatoire, dépannage rapide et mise en conformité. Prolongez la durée de vie de vos équipements.",
    image: "/maintenance.jpg",
    icon: Wrench,
    benefits: ["Intervention sous 48h", "Contrats sur mesure", "Techniciens certifiés"],
  },
]

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" }
  ]

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Nos expertises
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Solutions complètes de rénovation énergétique
          </h1>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            De l'audit à la maintenance, Greenter vous accompagne dans tous vos projets 
            d'efficacité énergétique. Certifié RGE, nous intervenons partout en France.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              return (
                <div 
                  key={service.slug}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    !isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={!isEven ? 'md:order-2' : ''}>
                    <Link href={`/services/${service.slug}`} className="block group">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg ring-1 ring-neutral-200 group-hover:ring-green-400 transition-all">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className={!isEven ? 'md:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-neutral-900">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-neutral-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-6">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-teal-600 transition-colors group"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-900 via-green-800 to-teal-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Quel projet pour votre logement ?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Nos experts vous conseillent gratuitement sur les solutions les plus adaptées 
            à votre situation et les aides disponibles.
          </p>
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            Demander un conseil gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
