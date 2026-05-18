"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle, Phone, Shield, MapPin, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import { COMPANY_PHONES } from "@/lib/local-seo-data"

/* ─── Animated counter hook ─────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, delay = 300) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      function step(now: number) {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setCount(Math.round(target * eased))
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return count
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const SERVICE_CHIPS = [
  { label: "Pompe à chaleur",  href: "/services/pompe-a-chaleur" },
  { label: "Panneaux solaires", href: "/services/panneaux-solaires" },
  { label: "Isolation thermique", href: "/services/isolation" },
  { label: "Audit énergétique",  href: "/services/audit" },
]

const STATS = [
  { prefix: "−", value: 70,  suffix: "%",    label: "sur vos factures",   delay: 300 },
  { prefix: "+", value: 200, suffix: "",      label: "installations",       delay: 450 },
  { prefix: "",  value: 48,  suffix: "h",     label: "devis gratuit",       delay: 600 },
  { prefix: "",  value: 10,  suffix: " ans",  label: "garantie décennale",  delay: 750 },
]

const DEPARTMENTS = ["77 Seine-et-Marne", "91 Essonne", "78 Yvelines"]

/* ─── StatCard ─────────────────────────────────────────────────────────────── */
function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const count = useCountUp(stat.value, 1600, stat.delay)
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg ring-1 ring-green-100 hover:ring-green-300 hover:shadow-xl transition-all duration-300">
      <div className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-teal-600 tabular-nums">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 leading-tight">
        {stat.label}
      </div>
    </div>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white">

      {/* Animated background orbs */}
      <div
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[520px] h-[520px] rounded-full bg-green-100/70 blur-3xl pointer-events-none animate-orb select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/3 w-[380px] h-[380px] rounded-full bg-teal-100/60 blur-3xl pointer-events-none animate-orb-delayed select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-8 pb-6 md:pt-12 md:pb-8 lg:pt-14 lg:pb-10">

        {/* ── Two-column grid: text (left) | image (right) ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-8 lg:mb-10">

          {/* ── Left: Text block ─────────────────────────────────────── */}
          <div className="text-center lg:text-left order-1">

            {/* Trust pill with live ping */}
            <div className="inline-flex items-center gap-2 bg-white border border-green-200 shadow-sm rounded-full px-4 py-1.5 mb-5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <Shield className="w-4 h-4 text-green-700" aria-hidden="true" />
              <span className="text-green-800 text-sm font-semibold">
                Certifié RGE QualiPAC &amp; QualiPV
              </span>
            </div>

            {/* H1 — two focused lines only */}
            <h1 className="font-heading font-bold leading-[1.1] tracking-tight mb-4">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-neutral-900">
                <span className="text-teal-600">−70%</span> sur vos factures d&apos;énergie
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl text-green-700 mt-2">
                avec une rénovation énergétique RGE
              </span>
            </h1>

            {/* Service chips — internal links */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3"
              aria-label="Nos services"
            >
              {SERVICE_CHIPS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="text-xs sm:text-sm bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-full border border-green-200 transition-colors font-medium"
                >
                  {s.label}
                </Link>
              ))}
            </div>

            {/* Geo line — departments 77 · 91 · 78 */}
            <p className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-neutral-500 mb-5">
              <MapPin className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden="true" />
              Seine-et-Marne (77) · Essonne (91) · Yvelines (78) · Île-de-France
            </p>

            {/* CTA pair */}
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <Link
                href="/contact"
                className="btn-primary text-base px-7 py-4 w-full sm:w-auto justify-center"
              >
                Étude gratuite sous 48h
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${COMPANY_PHONES.primary.raw}`}
                className="btn-secondary text-base px-7 py-4 w-full sm:w-auto justify-center"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {COMPANY_PHONES.primary.display}
              </a>
            </div>

            {/* Friction reducer */}
            <p className="text-xs text-neutral-400 mb-6 text-center lg:text-left">
              Sans engagement · Devis personnalisé · Installation certifiée RGE
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
                +200 installations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
                MaPrimeRénov&apos; &amp; CEE
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
                Garantie décennale
              </span>
              <GoogleRatingBadgeClient />
            </div>
          </div>

          {/* ── Right: Visual block ──────────────────────────────────── */}
          <div className="order-2 relative">

            {/* Main image */}
            <div className="relative h-64 sm:h-80 lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-green-200/60">
              <Image
                src="/hero-maison-renovee.jpg"
                alt="Couple heureux devant leur maison rénovée avec panneaux solaires et pompe à chaleur en Île-de-France"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-right"
              />
              {/* Gradient overlays — left side to support overlays, bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/35 via-transparent to-transparent" />

              {/* Department chips — left side, over sky/garden */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 items-start">
                {DEPARTMENTS.map((dept) => (
                  <span
                    key={dept}
                    className="bg-white/90 backdrop-blur-sm text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full"
                  >
                    {dept}
                  </span>
                ))}
              </div>

              {/* Floating review card — left side, desktop only */}
              <div
                className="hidden lg:block absolute top-6 left-4 w-56 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl ring-1 ring-neutral-100/80"
                aria-label="Avis client"
              >
                <div className="flex gap-0.5 mb-2" aria-label="5 étoiles sur 5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed mb-2">
                  &ldquo;Installation rapide, équipe très professionnelle. Économies visibles dès la première facture !&rdquo;
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  Sophie D. — Pontault-Combault (77)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row — full width below grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

      </div>
    </section>
  )
}
