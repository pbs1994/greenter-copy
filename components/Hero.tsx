"use client"

import { ArrowRight, CheckCircle, Phone, Shield, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import { COMPANY_PHONES } from "@/lib/local-seo-data"

const SERVICE_CHIPS = [
  { label: "Pompe à chaleur", href: "/services/pompe-a-chaleur" },
  { label: "Panneaux solaires", href: "/services/panneaux-solaires" },
  { label: "Isolation thermique", href: "/services/isolation" },
  { label: "Audit énergétique", href: "/services/audit" },
]

const STATS = [
  { value: "−70%", label: "sur vos factures" },
  { value: "+200", label: "installations" },
  { value: "48h", label: "devis gratuit" },
  { value: "10 ans", label: "garantie" },
]

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-white">
      <div className="px-4 py-6 md:py-10 lg:py-14">
        <div className="container mx-auto max-w-6xl">

          {/* Text block */}
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">

            {/* Trust pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span className="text-emerald-800 text-sm font-semibold">
                Certifié RGE QualiPAC &amp; QualiPV
              </span>
            </div>

            {/* H1 — focused on the main value proposition only */}
            <h1 className="font-heading font-bold leading-tight mb-4">
              <span className="block text-4xl sm:text-5xl md:text-6xl text-neutral-900">
                <span className="text-teal-600">−70%</span> sur vos factures d&apos;énergie
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl text-green-700 mt-3">
                avec une rénovation énergétique RGE
              </span>
            </h1>

            {/* Services chips — liens internes + lisibilité mobile */}
            <div className="flex flex-wrap justify-center gap-2 mb-3" aria-label="Nos services">
              {SERVICE_CHIPS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="bg-green-50 hover:bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full border border-green-200 transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>

            {/* Geo line */}
            <p className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-neutral-500 mb-6">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Ozoir-la-Ferrière · Seine-et-Marne (77) · Île-de-France
            </p>

            {/* Slogan */}
            <p className="font-heading text-lg md:text-xl italic text-neutral-600 mb-8">
              «&nbsp;Baissez vos factures, pas votre confort.&nbsp;»
            </p>

            {/* CTA pair */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Étude gratuite sous 48h
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${COMPANY_PHONES.primary.raw}`}
                className="btn-secondary text-base px-8 py-4"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {COMPANY_PHONES.primary.display}
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                +200 installations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                MaPrimeRénov&apos; &amp; CEE
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                Garantie décennale 10 ans
              </span>
              <GoogleRatingBadgeClient />
            </div>
          </div>

          {/* Visual block — image + stat cards */}
          <div className="relative max-w-5xl mx-auto">

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[21/9] shadow-xl ring-1 ring-green-200">
              <Image
                src="/installation.jpg"
                alt="Technicien Greenter certifié RGE réalisant une installation de rénovation énergétique"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 83vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block bg-teal-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Certifié RGE — Île-de-France
                </span>
              </div>
            </div>

            {/* Stat cards — overlap image on md+, stack below on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 md:-mt-10 md:mx-10 relative z-10">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-3 md:p-4 text-center shadow-lg ring-1 ring-green-100 hover:ring-green-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-xl md:text-2xl font-heading font-bold text-teal-600">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
