"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Star, Check, Shield, Clock, Award, Loader2, ArrowRight, Flame, Wind, Thermometer, FileCheck } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { LocalBusinessSchema } from "@/components/schemas/LocalBusinessSchema"
import { AggregateRatingSchema } from "@/components/schemas/AggregateRatingSchema"
import { ArticleSchema } from "@/components/schemas/ArticleSchema"
import { CITIES } from "@/lib/local-seo-data"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import { IsolationEditorialContent } from "@/components/editorial"
import { ISOLATION_FAQS } from "@/lib/isolation-editorial-data"
import type { GoogleReviewsResponse } from "@/lib/google-places"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const PHONE = "07 66 97 50 99"

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function CallbackForm({ compact = false }: { compact?: boolean }) {
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    const cleanPhone = phone.trim().replace(/\s/g, "")
    const frenchPhoneRegex = /^(?:(?:\+33|0033|0)[67])(?:[0-9]{8})$/
    if (!frenchPhoneRegex.test(cleanPhone)) {
      setStatus("error")
      return
    }

    setStatus("loading")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Demande de rappel Isolation 1€",
          email: "rappel@greenter.fr",
          phone: phone.trim(),
          message: `Nouvelle demande de rappel pour une isolation à 1€.\n\nNuméro: ${phone.trim()}\nSource: Landing page Isolation 1€`,
        }),
      })
      if (response.ok) {
        setStatus("success")
        setPhone("")
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-17839863014/MrviCO-194wcEObp2rpC",
          })
        }
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: "form_submit",
            form_name: "callback_request_isolation",
            phone_number: phone.trim(),
          })
        }
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className={`${compact ? "bg-emerald-50 rounded-xl p-4" : "bg-emerald-50 rounded-2xl p-5"} text-center`}>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <p className="text-emerald-700 font-semibold">Demande envoyée !</p>
          <p className="text-emerald-600 text-sm">Nous vous rappelons très rapidement.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${compact ? "bg-slate-50 rounded-xl p-4" : "bg-gradient-to-br from-slate-50 to-sky-50/50 rounded-2xl p-5 border border-slate-100"}`}>
      <p className={`text-slate-700 ${compact ? "text-sm mb-3" : "text-base mb-4"} text-center font-medium`}>
        Pas le temps d&apos;appeler ? On vous rappelle !
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Votre numéro de téléphone"
            className={`w-full ${compact ? "pl-11 pr-4 py-3 text-base" : "pl-12 pr-4 py-4 text-lg"} bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full ${compact ? "py-3 text-base" : "py-4 text-lg"} bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
        >
          {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Être rappelé gratuitement</>}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center mt-3">Numéro invalide. Entrez un numéro français (06 ou 07).</p>
      )}
    </div>
  )
}

export default function IsolationPage() {
  const [googleData, setGoogleData] = useState<GoogleReviewsResponse | null>(null)

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then(setGoogleData)
      .catch(() => {})
  }, [])

  const rating = googleData?.rating ?? 4.9
  const reviewCount = googleData?.reviewCount ?? 47

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Isolation à 1€", url: "https://greenter.fr/services/isolation" },
  ]

  return (
    <>
      <ServiceSchema
        name="Isolation à 1€ - Combles et planchers bas en Seine-et-Marne"
        description="Isolation des combles perdus et planchers bas à partir de 1€* grâce aux aides 2026 (MaPrimeRénov', CEE bonifiés). Artisan certifié RGE Qualibat intervenant en Seine-et-Marne (77)."
        url="https://greenter.fr/services/isolation"
        image="https://greenter.fr/isolation.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={ISOLATION_FAQS} />
      <LocalBusinessSchema
        name="Greenter - Isolation à 1€ en Seine-et-Marne"
        description="Isolation des combles et planchers bas à partir de 1€ grâce aux aides 2026. Certifié RGE Qualibat en Seine-et-Marne (77) et Île-de-France."
        address={{
          streetAddress: "Ozoir-la-Ferrière",
          addressLocality: "Ozoir-la-Ferrière",
          postalCode: "77330",
          addressCountry: "FR",
        }}
        telephone="+33766975099"
        email="contact@greenter.fr"
        url="https://greenter.fr/services/isolation"
        image="https://greenter.fr/logo.png"
        priceRange="€"
        areaServed={CITIES.map((c) => c.name)}
        aggregateRating={{ ratingValue: rating, reviewCount }}
      />
      <AggregateRatingSchema
        itemReviewed={{ type: "LocalBusiness", name: "Greenter" }}
        ratingValue={rating}
        reviewCount={reviewCount}
      />
      <ArticleSchema
        headline="Isolation à 1€ en 2026 : ce qu'il faut savoir sur les aides et le dispositif"
        description="Tout savoir sur l'isolation à 1€ en 2026 : fin du Coup de Pouce historique, aides actuelles (MaPrimeRénov', CEE bonifiés), plafonds de ressources, zones d'intervention en Seine-et-Marne."
        datePublished="2026-01-10"
        dateModified="2026-04-08"
        author={{ name: "Greenter", url: "https://greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://greenter.fr/logo.png" }}
        image="https://greenter.fr/isolation.jpg"
        url="https://greenter.fr/services/isolation"
        wordCount={2600}
      />

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>

      <main className="min-h-screen bg-white">
        {/* ============================================================= */}
        {/* HERO - Design premium avec image isolation */}
        {/* ============================================================= */}
        <section className="flex-1 relative overflow-hidden min-h-[100dvh] lg:min-h-0">
          {/* Background with deep blue-slate gradient — no photo behind overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900" />

          {/* MOBILE */}
          <div className="lg:hidden relative flex flex-col justify-between min-h-[100dvh] px-5 py-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Shield className="w-4 h-4 text-sky-300" />
                <span className="text-sky-200 text-sm font-medium">Certifié RGE Qualibat</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Isolation des combles
                <br />
                à partir de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">
                  1€
                </span>
                <span className="text-white">*</span>
              </h1>
              <p className="text-sky-100/80 text-base leading-relaxed mb-2">
                Grâce aux aides 2026 (MaPrimeRénov&apos; + CEE bonifiés).
              </p>
              <p className="text-sky-100/60 text-sm">Seine-et-Marne (77) & Île-de-France</p>
            </div>

            {/* Photo isolation - cadre contenu arrondi */}
            <div className="my-4 mx-auto w-full max-w-sm">
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/isolation.jpg"
                  alt="Artisan soufflant de la ouate de cellulose dans des combles"
                  fill
                  className="object-cover object-[70%_50%]"
                  priority
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-white/95 backdrop-blur rounded-2xl p-5 shadow-2xl">
                <ul className="space-y-4 mb-5">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-600 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Combles perdus & </span>
                      <span className="text-sky-700 font-bold">planchers bas</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-600 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Aides </span>
                      <span className="text-sky-700 font-bold">déduites</span>
                      <span className="text-slate-500 text-sm"> du devis</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-600 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Chantier en </span>
                      <span className="text-sky-700 font-bold">1 journée</span>
                    </div>
                  </li>
                </ul>
                <p className="text-xs text-slate-400 text-center mb-4 italic">
                  *Sous conditions de ressources. Reste à charge selon catégorie MaPrimeRénov&apos;.
                </p>
                <PhoneCallTracker
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30"
                  showIcon={false}
                >
                  <Phone className="w-5 h-5" />
                  Vérifier mon éligibilité
                </PhoneCallTracker>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-slate-400 text-xs uppercase tracking-wide">ou</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
                <CallbackForm compact />
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href={googleData?.googleMapsUrl || "https://g.page/greenter"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3"
              >
                <GoogleLogo className="w-7 h-7" />
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <p className="text-slate-900 font-bold text-sm">{rating}/5</p>
                  <p className="text-slate-500 text-xs">{reviewCount} avis</p>
                </div>
              </a>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block relative max-w-7xl mx-auto px-4 pt-6 pb-8 w-full">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left — text + photo + KPIs (8 cols like PAC) */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 gap-6 items-start">
                  {/* Text column */}
                  <div className="text-white pt-2">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
                      <Shield className="w-4 h-4 text-sky-300" />
                      <span className="text-sky-200 text-sm font-medium">Certifié RGE Qualibat</span>
                    </div>
                    <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                      Isolation des combles
                      <br />à partir de{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-300">
                        1€
                      </span>
                      <span className="text-white">*</span>
                    </h1>
                    <p className="text-sky-100/80 mb-6 leading-relaxed text-lg">
                      Aides 2026 : <strong className="text-white">MaPrimeRénov&apos;</strong>{" "}
                      + <strong className="text-white">CEE bonifiés</strong>.
                      <br />Reste à charge réduit à 1€* pour les ménages très modestes.
                    </p>

                    {/* Badge Google + CTA tel */}
                    <div className="flex items-center gap-4">
                      <a
                        href={googleData?.googleMapsUrl || "https://g.page/greenter"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                      >
                        <GoogleLogo className="w-8 h-8" />
                        <div className="border-l border-slate-200 pl-3">
                          <div className="flex items-center gap-0.5 mb-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-slate-900 font-bold text-sm">
                            {rating}/5 <span className="font-normal text-slate-500">({reviewCount})</span>
                          </p>
                        </div>
                      </a>
                      <PhoneCallTracker
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-4 py-3 rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                        showIcon={false}
                      >
                        <Phone className="w-5 h-5" />
                        <span className="text-sm">{PHONE}</span>
                      </PhoneCallTracker>
                    </div>
                  </div>

                  {/* Photo column — contained in rounded frame like PAC product */}
                  <div className="flex justify-center items-start pt-2">
                    <div className="relative w-full max-w-[420px] h-[340px] xl:h-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                      <Image
                        src="/isolation.jpg"
                        alt="Artisan soufflant de la ouate de cellulose dans des combles perdus"
                        fill
                        className="object-cover object-[70%_50%]"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* KPIs row beneath text+photo */}
                <div className="grid grid-cols-3 gap-4 mt-6 max-w-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-sky-300">30%</p>
                    <p className="text-xs text-sky-100/70 mt-1">pertes par la toiture</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-sky-300">1 jour</p>
                    <p className="text-xs text-sky-100/70 mt-1">de travaux</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-sky-300">-600 €</p>
                    <p className="text-xs text-sky-100/70 mt-1">/ an de chauffage</p>
                  </div>
                </div>

                <p className="text-sky-100/40 text-xs italic mt-4 max-w-xl">
                  *Reste à charge minimum après déduction de MaPrimeRénov&apos; et Prime CEE bonifiée pour les ménages
                  très modestes (catégorie Bleu). Calcul personnalisé gratuit après visite technique.
                </p>
              </div>

              {/* Right — form card (4 cols like PAC) */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-sky-700 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">Test d&apos;éligibilité gratuit</h2>
                        <p className="text-sky-100 text-sm">Réponse en 2 min • Sans engagement</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-sky-600" />
                        </div>
                        <span className="text-slate-700 text-sm">
                          Aides MaPrimeRénov&apos; + CEE calculées
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-sky-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Visite technique sous 48h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-sky-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Garantie décennale</span>
                      </div>
                    </div>
                    <PhoneCallTracker
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-[1.02]"
                      showIcon={false}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Appeler maintenant</span>
                    </PhoneCallTracker>
                    <div className="flex items-center gap-3 my-4">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-slate-400 text-xs uppercase tracking-wide">ou</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                    <CallbackForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================= */}
        {/* CONTENU EDITORIAL - Article complet avec sources, plafonds, aides */}
        {/* ============================================================= */}
        <IsolationEditorialContent />


        {/* ============================================================= */}
        {/* CTA FINAL */}
        {/* ============================================================= */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <Thermometer className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Testez votre éligibilité à l&apos;isolation à 1€*
            </h2>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
              En 2 minutes au téléphone, nous vérifions votre catégorie MaPrimeRénov&apos;, calculons vos aides et
              vous envoyons un devis transparent. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneCallTracker
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-full hover:from-orange-600 hover:to-red-600 transition-colors shadow-xl"
                showIcon={false}
              >
                <Phone className="w-5 h-5" />
                {PHONE}
              </PhoneCallTracker>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                Formulaire de contact
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sky-200/70 text-xs mt-6 max-w-2xl mx-auto">
              *Reste à charge réduit jusqu&apos;à 1€ pour les ménages très modestes (catégorie MaPrimeRénov&apos;
              Bleu) sur l&apos;isolation des combles perdus, grâce au cumul MaPrimeRénov&apos; + Prime CEE bonifiée.
              Montant variable selon la situation personnelle. Devis détaillé établi après visite technique gratuite.
            </p>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Services complémentaires */}
        {/* ============================================================= */}
        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <h3 className="font-heading text-xl font-bold text-neutral-900 text-center mb-8">
              Complétez votre rénovation énergétique
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/services/pompe-a-chaleur"
                className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Flame className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-sky-700 transition-colors">
                    Pompe à chaleur
                  </p>
                  <p className="text-sm text-neutral-500">Jusqu&apos;à -70% sur le chauffage</p>
                </div>
              </Link>
              <Link
                href="/services/panneaux-solaires"
                className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Wind className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-sky-700 transition-colors">
                    Panneaux solaires
                  </p>
                  <p className="text-sm text-neutral-500">Produisez votre électricité</p>
                </div>
              </Link>
              <Link
                href="/services/audit"
                className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <FileCheck className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-sky-700 transition-colors">
                    Audit énergétique
                  </p>
                  <p className="text-sm text-neutral-500">Priorisez vos travaux</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
