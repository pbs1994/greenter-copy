import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sun, Shield, Wrench, Fan, FileSearch, CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"

export const metadata: Metadata = {
  title: "Nos Services | Rénovation Énergétique | Greenter",
  description:
    "Découvrez tous nos services de rénovation énergétique : pompe à chaleur, panneaux solaires, isolation thermique, audit énergétique et maintenance. Certifié RGE partout en France.",
  openGraph: {
    title: "Nos Services de Rénovation Énergétique | Greenter",
    description:
      "Pompe à chaleur, panneaux solaires, isolation, audit et maintenance. Certifié RGE, Greenter intervient partout en France. Devis gratuit sous 48h.",
    url: "https://www.greenter.fr/services",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.greenter.fr/solaire.jpg",
        width: 1200,
        height: 630,
        alt: "Services de rénovation énergétique Greenter — pompe à chaleur, panneaux solaires, isolation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services | Greenter",
    description:
      "Pompe à chaleur, panneaux solaires, isolation, audit et maintenance. Certifié RGE. Devis gratuit sous 48h.",
    images: ["https://www.greenter.fr/solaire.jpg"],
  },
  alternates: {
    canonical: "https://www.greenter.fr/services",
  },
}

const services = [
  {
    slug: "pompe-a-chaleur",
    title: "Pompe à chaleur",
    description:
      "Divisez vos factures de chauffage par 3 avec une PAC air-eau ou air-air. Installation certifiée RGE, éligible aux aides.",
    image: "/pac.jpg",
    imageAlt:
      "Installation d'une pompe à chaleur air-eau sur une maison en Île-de-France par technicien Greenter certifié RGE",
    icon: Fan,
    benefits: ["Jusqu'à 70% d'économies", "Éligible MaPrimeRénov'", "Garantie décennale"],
  },
  {
    slug: "panneaux-solaires",
    title: "Panneaux solaires",
    description:
      "Produisez votre propre électricité et réduisez votre facture jusqu'à 70%. Autoconsommation ou revente surplus.",
    image: "/solaire.jpg",
    imageAlt:
      "Technicien Greenter posant des panneaux solaires photovoltaïques sur une toiture résidentielle",
    icon: Sun,
    benefits: ["Prime autoconsommation", "Garantie 25 ans", "Rentabilité 6-10 ans"],
  },
  {
    slug: "isolation",
    title: "Isolation thermique",
    description:
      "Stoppez les déperditions de chaleur. Isolation des combles, murs et planchers pour un confort optimal.",
    image: "/isolation.jpg",
    imageAlt:
      "Travaux d'isolation thermique des combles soufflée réalisés par Greenter certifié RGE",
    icon: Shield,
    benefits: ["Jusqu'à 30% d'économies", "Confort été/hiver", "Matériaux certifiés"],
  },
  {
    slug: "audit",
    title: "Audit énergétique",
    description:
      "Identifiez vos pertes d'énergie avec un diagnostic complet. Obligatoire pour la vente des passoires thermiques.",
    image: "/audit.png",
    imageAlt:
      "Auditeur énergétique Greenter réalisant un diagnostic de performance dans un logement",
    icon: FileSearch,
    benefits: ["Rapport détaillé", "Scénarios chiffrés", "Aides simulées"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Conformité",
    description:
      "Entretien obligatoire, dépannage rapide et mise en conformité. Prolongez la durée de vie de vos équipements.",
    image: "/maintenance.jpg",
    imageAlt:
      "Technicien certifié Greenter réalisant l'entretien d'une pompe à chaleur chez un particulier",
    icon: Wrench,
    benefits: ["Intervention sous 48h", "Contrats sur mesure", "Techniciens certifiés"],
  },
]

const HERO_STATS = [
  { value: "5", label: "services" },
  { value: "RGE", label: "certifié" },
  { value: "+200", label: "installations" },
  { value: "48h", label: "devis gratuit" },
]

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
  ]

  return (
    <main>
      {/* Schemas */}
      <BreadcrumbSchema items={breadcrumbItems} />
      {services.map((service) => (
        <ServiceSchema
          key={service.slug}
          name={service.title}
          description={service.description}
          url={`https://www.greenter.fr/services/${service.slug}`}
          image={`https://www.greenter.fr${service.image}`}
        />
      ))}

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">

          {/* Breadcrumb HTML visible */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-neutral-500">
              <li>
                <Link href="/" className="hover:text-green-700 transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">›</li>
              <li aria-current="page" className="text-neutral-900 font-medium">
                Services
              </li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Nos expertises
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-5">
              Solutions complètes de rénovation énergétique
            </h1>
            <p className="text-neutral-600 text-lg mb-8">
              De l&apos;audit à la maintenance, Greenter vous accompagne dans tous vos projets
              d&apos;efficacité énergétique. Certifié RGE, nous intervenons partout en France.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-6 border-t border-green-100">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-heading font-bold text-green-700">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Service quick-links */}
            <div className="flex flex-wrap justify-center gap-2 mt-6" aria-label="Accès rapide aux services">
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.slug}
                    href={`#service-${s.slug}`}
                    className="inline-flex items-center gap-1.5 bg-white border border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {s.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-12 md:space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className="grid md:grid-cols-2 gap-8 items-center scroll-mt-24"
                >
                  {/* Image */}
                  <div className={!isEven ? "md:order-2" : ""}>
                    <Link href={`/services/${service.slug}`} className="block group">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg ring-1 ring-neutral-200 group-hover:ring-green-400 transition-all">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? "md:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-green-600" aria-hidden="true" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-neutral-900">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-neutral-600 mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <ul
                      className="flex flex-wrap gap-2 mb-6"
                      aria-label={`Avantages — ${service.title}`}
                    >
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full"
                        >
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-teal-600 transition-colors group"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
