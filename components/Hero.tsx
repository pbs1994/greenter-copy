"use client"

import { ArrowRight, CheckCircle, Phone, Shield } from "lucide-react"
import Link from "next/link"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import { CompareSlider } from "@/components/CompareSlider"
import { COMPANY_PHONES } from "@/lib/local-seo-data"

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-white">
      <div className="px-4 py-6 md:py-10 lg:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
            {/* Trust pill — RGE + Google rating live */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span className="text-emerald-800 text-sm font-semibold">
                Certifié RGE QualiPAC
              </span>
            </div>

            {/* H1 — un seul, hiérarchie en 4 niveaux */}
            <h1 className="font-heading font-bold leading-tight mb-5">
              <span className="block text-4xl sm:text-5xl md:text-6xl text-neutral-900">
                <span className="text-teal-600">−70%</span> sur vos factures d&apos;énergie
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl text-green-700 mt-3">
                avec une rénovation énergétique RGE
              </span>
              <span className="block text-base sm:text-lg text-neutral-700 font-semibold mt-4">
                Pompe à chaleur · Panneaux solaires · Isolation · Audit énergétique
              </span>
              <span className="block text-sm sm:text-base text-neutral-500 font-medium mt-1">
                Ozoir-la-Ferrière · Seine-et-Marne (77) · Île-de-France
              </span>
            </h1>

            {/* Slogan baseline */}
            <p className="font-heading text-lg md:text-xl italic text-neutral-600 mb-8">
              «&nbsp;Baissez vos factures, pas votre confort.&nbsp;»
            </p>

            {/* CTA pair */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Étude gratuite sous 48h
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY_PHONES.primary.raw}`}
                className="btn-secondary text-base px-8 py-4"
              >
                <Phone className="w-5 h-5" />
                {COMPANY_PHONES.primary.display}
              </a>
            </div>

            {/* Trust signals — 3 textes + vrai badge Google live */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                +200 installations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                MaPrimeRénov&apos; &amp; CEE
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Garantie décennale 10 ans
              </span>
              <GoogleRatingBadgeClient />
            </div>
          </div>

          {/* Compare Slider - PAC vs Panneaux solaires */}
          <div className="relative w-full max-w-5xl mx-auto">
            <CompareSlider
              beforeImage="/pac.jpg"
              afterImage="/solaire.jpg"
              beforeLabel="Pompe à chaleur"
              afterLabel="Panneaux solaires"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

