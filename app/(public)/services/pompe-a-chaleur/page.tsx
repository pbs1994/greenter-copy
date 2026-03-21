"use client"

import { useState, useEffect } from "react"
import { Phone, Star, Check, Shield, Clock, Award, Loader2 } from "lucide-react"
import Image from "next/image"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { LocalBusinessSchema } from "@/components/schemas/LocalBusinessSchema"
import { AggregateRatingSchema } from "@/components/schemas/AggregateRatingSchema"
import { ArticleSchema } from "@/components/schemas/ArticleSchema"
import { PACEditorialContent } from "@/components/editorial"
import { CITIES } from "@/lib/local-seo-data"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import type { GoogleReviewsResponse } from "@/lib/google-places"

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const PHONE = "07 66 97 50 99"
const BRANDS = ["Atlantic", "Daikin", "Mitsubishi", "Panasonic", "Toshiba", "LG", "Hitachi"]

// FAQ data for SEO schema (used by FAQPageSchema)
const faqs = [
  { question: "Quel est le prix d'une pompe à chaleur ?", answer: "Le prix varie selon le type de PAC. Une PAC air/air coûte à partir de 1 500€ par unité intérieure. Une PAC air/eau démarre à 5 000€. Ces prix sont hors aides (MaPrimeRénov', CEE) qui peuvent réduire significativement le reste à charge. Un devis précis est établi après visite technique gratuite." },
  { question: "Quelles économies puis-je réaliser ?", answer: "Une pompe à chaleur permet de réduire votre facture de chauffage de 50 à 70%. Cela s'explique par son rendement exceptionnel : pour 1 kWh d'électricité consommé, une PAC produit 3 à 5 kWh de chaleur. L'énergie supplémentaire est puisée gratuitement dans l'air extérieur." },
  { question: "Une PAC fonctionne-t-elle par grand froid ?", answer: "Oui, les PAC modernes fonctionnent jusqu'à -15°C voire -20°C pour certains modèles. Le rendement diminue légèrement par temps très froid, mais la PAC continue de chauffer. En Seine-et-Marne, les températures descendent rarement en dessous de -10°C, ce qui est parfaitement adapté." },
  { question: "Quelle est la durée de vie d'une PAC ?", answer: "Une pompe à chaleur bien entretenue a une durée de vie de 15 à 20 ans. L'entretien annuel (obligatoire pour les PAC contenant plus de 2kg de fluide frigorigène) permet de maintenir les performances et de prolonger la durée de vie de l'équipement." },
  { question: "Une PAC est-elle bruyante ?", answer: "Les PAC modernes sont conçues pour être silencieuses. L'unité intérieure émet environ 20-25 dB (équivalent à un chuchotement). L'unité extérieure émet 45-55 dB, comparable à une conversation normale. L'emplacement de l'unité extérieure est étudié lors de la visite technique pour minimiser les nuisances." },
  { question: "Comment vérifier votre certification RGE ?", answer: "Notre certification RGE est vérifiable sur le site officiel france-renov.gouv.fr. Cette certification est obligatoire pour que vous puissiez bénéficier des aides de l'État (MaPrimeRénov', CEE, TVA réduite)." },
  { question: "Intervenez-vous dans ma commune ?", answer: "Nous intervenons dans toute la Seine-et-Marne (77) et les communes limitrophes : Ozoir-la-Ferrière, Roissy-en-Brie, Pontault-Combault, Brie-Comte-Robert, Tournan-en-Brie, Gretz-Armainvilliers, Lésigny, Chevry-Cossigny et environs." },
  { question: "Faut-il un entretien régulier ?", answer: "Un entretien annuel est recommandé (et obligatoire pour les PAC de plus de 2kg de fluide). Il comprend : vérification du fluide frigorigène, nettoyage des filtres, contrôle des performances. Coût moyen : 150 à 200€/an. Nous proposons des contrats de maintenance." },
]

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

    setStatus("loading")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Demande de rappel PAC",
          email: "rappel@greenter.fr",
          phone: phone.trim(),
          message: `Nouvelle demande de rappel pour une installation de pompe à chaleur.\n\nNuméro: ${phone.trim()}\nSource: Landing page PAC`
        })
      })
      if (response.ok) {
        setStatus("success")
        setPhone("")
        
        // Track Google Ads conversion for form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17839863014/MrviCO-194wcEObp2rpC'
          })
        }
        // Also push to dataLayer for GTM
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            'event': 'form_submit',
            'form_name': 'callback_request',
            'phone_number': phone.trim()
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
    <div className={`${compact ? "bg-slate-50 rounded-xl p-4" : "bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-2xl p-5 border border-slate-100"}`}>
      <p className={`text-slate-700 ${compact ? "text-sm mb-3" : "text-base mb-4"} text-center font-medium`}>
        Pas le temps d'appeler ? On vous rappelle !
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Votre numéro de téléphone"
            className={`w-full ${compact ? "pl-11 pr-4 py-3 text-base" : "pl-12 pr-4 py-4 text-lg"} bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full ${compact ? "py-3 text-base" : "py-4 text-lg"} bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Être rappelé gratuitement</>
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center mt-3">Une erreur est survenue. Réessayez.</p>
      )}
    </div>
  )
}

export default function PompeAChaleurPage() {
  const [googleData, setGoogleData] = useState<GoogleReviewsResponse | null>(null)
  useEffect(() => { fetch("/api/google-reviews").then(res => res.json()).then(setGoogleData).catch(() => {}) }, [])
  const rating = googleData?.rating ?? 4.9
  const reviewCount = googleData?.reviewCount ?? 47

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Pompe à chaleur", url: "https://greenter.fr/services/pompe-a-chaleur" }
  ]

  return (
    <>
      <ServiceSchema name="Installation Pompe à Chaleur Seine-et-Marne" description="Installation PAC certifié RGE. Prix transparents." url="https://greenter.fr/services/pompe-a-chaleur" image="https://greenter.fr/pac.png" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      <LocalBusinessSchema name="Greenter" description="Installation pompe à chaleur certifié RGE en Seine-et-Marne (77) et Île-de-France" address={{ streetAddress: "Ozoir-la-Ferrière", addressLocality: "Ozoir-la-Ferrière", postalCode: "77330", addressCountry: "FR" }} telephone="+33609455056" email="contact@greenter.fr" url="https://greenter.fr" image="https://greenter.fr/logo.png" priceRange="€€" areaServed={CITIES.map(city => city.name)} aggregateRating={{ ratingValue: rating, reviewCount }} />
      <AggregateRatingSchema itemReviewed={{ type: "LocalBusiness", name: "Greenter" }} ratingValue={rating} reviewCount={reviewCount} />
      <ArticleSchema
        headline="Guide complet de la pompe à chaleur en 2026 : types, prix, aides et installation"
        description="Tout savoir sur les pompes à chaleur en 2026 : comparatif des types (air/air, air/eau, géothermique), prix, aides MaPrimeRénov' et processus d'installation par un artisan RGE en Seine-et-Marne."
        datePublished="2024-01-15"
        dateModified="2026-03-01"
        author={{ name: "Greenter", url: "https://greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://greenter.fr/logo.png" }}
        image="https://greenter.fr/pac.png"
        url="https://greenter.fr/services/pompe-a-chaleur"
        wordCount={2400}
      />

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>

      <div className="min-h-screen bg-white flex flex-col">
        
        {/* ============================================================= */}
        {/* HERO - Design premium avec image PAC en fond */}
        {/* ============================================================= */}
        <section className="flex-1 relative overflow-hidden min-h-[100dvh] lg:min-h-0">
          {/* Background image pac.jpg avec overlay vert dégradé */}
          <div className="absolute inset-0">
            <Image
              src="/pac.jpg"
              alt="Installation pompe à chaleur en Seine-et-Marne par Greenter"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-teal-900/85" />
          
          {/* MOBILE LAYOUT - Design ultra clean sans image */}
          <div className="lg:hidden relative flex flex-col justify-between min-h-[100dvh] px-5 py-8">
            {/* Header mobile - Avis Google défilants */}
            <div className="text-center">
              {/* Bandeau avis Google défilant mobile */}
              {googleData?.reviews && googleData.reviews.length > 0 ? (
                <div className="mb-6 -mx-5 overflow-hidden">
                  <div className="flex animate-marquee whitespace-nowrap">
                    {[...googleData.reviews, ...googleData.reviews, ...googleData.reviews].map((review, i) => (
                      <a 
                        key={i} 
                        href={`https://www.google.com/maps/place/?q=place_id:ChIJ18W1Jb2UBkMRQ0A08rwo42U#reviews`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mx-3 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2 transition-colors"
                      >
                        <GoogleLogo className="w-4 h-4 shrink-0" />
                        <div className="flex items-center gap-0.5 shrink-0">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                          ))}
                        </div>
                        <span className="text-white/90 text-xs max-w-[180px] truncate">&ldquo;{review.text}&rdquo;</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                  <Shield className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-300 text-sm font-medium">Certifié RGE</span>
                </div>
              )}
              
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Divisez votre
                <br />facture de
                <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">chauffage par 3</span>
              </h1>
              
              <p className="text-emerald-100/70 text-base leading-relaxed">
                Votre confort, notre expertise.
                <br />Diagnostic gratuit à domicile.
              </p>
            </div>

            {/* Card centrale - Style Proxiserve */}
            <div className="my-6">
              <div className="bg-white/95 backdrop-blur rounded-2xl p-5 shadow-2xl">
                {/* Liste avantages */}
                <ul className="space-y-4 mb-5">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">PAC air/air à partir de </span>
                      <span className="text-emerald-600 font-bold">1 500€</span>
                      <span className="text-slate-500 text-sm"> /unité</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">PAC air/eau à partir de </span>
                      <span className="text-emerald-600 font-bold">5 000€</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Visite technique </span>
                      <span className="text-emerald-600 font-bold">gratuite</span>
                    </div>
                  </li>
                </ul>

                {/* Note */}
                <p className="text-xs text-slate-400 text-center mb-4 italic">
                  Prix indicatifs. Tarif définitif après étude personnalisée.
                </p>

                {/* CTA */}
                <PhoneCallTracker
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30"
                  showIcon={false}
                >
                  <Phone className="w-5 h-5" />
                  Devis Gratuit
                </PhoneCallTracker>

                {/* Séparateur */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-slate-400 text-xs uppercase tracking-wide">ou</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Formulaire rappel */}
                <CallbackForm compact />
              </div>
            </div>

            {/* Badge Google en bas */}
            <div className="flex justify-center">
              <a 
                href={googleData?.googleMapsUrl || "https://g.page/greenter"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3"
              >
                <GoogleLogo className="w-7 h-7" />
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
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

          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:block relative max-w-7xl mx-auto px-4 pt-6 pb-8 w-full">
            {/* Grid principale - Formulaire à droite, contenu à gauche */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Zone gauche (8 colonnes) - Texte + Image + Bandeau marques */}
              <div className="lg:col-span-8">
                {/* Grille texte + image */}
                <div className="grid grid-cols-2 gap-6 items-start">
                  {/* Colonne texte */}
                  <div className="text-white pt-2">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
                      <Shield className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-300 text-sm font-medium">Certifié RGE</span>
                    </div>
                    
                    <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                      Divisez votre
                      <br />facture de
                      <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">chauffage par 3</span>
                    </h1>
                    
                    <p className="text-emerald-100/80 mb-6 leading-relaxed text-lg">
                      Votre confort, notre expertise.
                      <br />Diagnostic gratuit à domicile.
                    </p>

                    {/* Badge Google + Téléphone */}
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
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-slate-900 font-bold text-sm">{rating}/5 <span className="font-normal text-slate-500">({reviewCount})</span></p>
                        </div>
                      </a>

                      {/* CTA Téléphone */}
                      <PhoneCallTracker 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-4 py-3 rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                        showIcon={false}
                      >
                        <Phone className="w-5 h-5" />
                        <span className="text-sm">{PHONE}</span>
                      </PhoneCallTracker>
                    </div>
                  </div>

                  {/* Colonne image PAC */}
                  <div className="flex justify-center items-start">
                    <div className="relative w-full max-w-[400px] h-[340px] xl:h-[380px]">
                      <Image
                        src="/pac2.png"
                        alt="Pompe à chaleur air-eau installation Ozoir-la-Ferrière 77"
                        fill
                        className="object-contain drop-shadow-[0_25px_70px_rgba(255,255,255,0.25)]"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Bandeau avis Google défilant */}
                {googleData?.reviews && googleData.reviews.length > 0 && (
                  <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/10 py-4 -mx-4 px-4 overflow-hidden rounded-xl">
                    <div className="flex animate-marquee whitespace-nowrap">
                      {[...googleData.reviews, ...googleData.reviews, ...googleData.reviews].map((review, i) => (
                        <a 
                          key={i} 
                          href={`https://www.google.com/maps/place/?q=place_id:ChIJ18W1Jb2UBkMRQ0A08rwo42U#reviews`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 mx-6 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors cursor-pointer"
                        >
                          <GoogleLogo className="w-5 h-5 shrink-0" />
                          <div className="flex items-center gap-1 shrink-0">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                            ))}
                          </div>
                          <span className="text-white/90 text-sm max-w-[300px] truncate">&ldquo;{review.text}&rdquo;</span>
                          <span className="text-white/50 text-xs shrink-0">— {review.authorName}</span>
                        </a>
                      ))}
                    </div>
                    <p className="text-center text-white/40 text-xs mt-3 italic">
                      Les clients satisfaits laissent rarement des avis... Merci à ceux qui prennent le temps !
                    </p>
                  </div>
                )}

                {/* Bandeau marques défilant - sous texte + image */}
                <div className="mt-4 bg-black/20 backdrop-blur-sm border-t border-b border-white/10 py-4 -mx-4 px-4 overflow-hidden rounded-xl">
                  <div className="flex animate-marquee whitespace-nowrap">
                    {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                      <span key={i} className="mx-8 text-xl font-bold text-white/40 tracking-wide">{brand}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite - Card Bento premium */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
                  {/* Header avec gradient */}
                  <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">Nos tarifs</h2>
                        <p className="text-emerald-100 text-sm">Prix indicatifs, devis gratuit</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Grille prix style bento */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
                        <p className="text-slate-500 text-xs font-medium mb-1">PAC Air/Air</p>
                        <p className="text-2xl font-bold text-slate-900">1 500€</p>
                        <p className="text-slate-400 text-xs">par unité</p>
                      </div>
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
                        <p className="text-slate-500 text-xs font-medium mb-1">PAC Air/Eau</p>
                        <p className="text-2xl font-bold text-slate-900">5 000€</p>
                        <p className="text-slate-400 text-xs">à partir de</p>
                      </div>
                    </div>

                    {/* Avantages */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Visite technique gratuite</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Devis sous 48h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Garantie 10 ans</span>
                      </div>
                    </div>

                    {/* Note prix indicatifs */}
                    <p className="text-xs text-slate-400 text-center mb-4 italic">
                      Prix indicatifs. Tarif définitif après étude personnalisée.
                    </p>

                    {/* CTA */}
                    <PhoneCallTracker
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 hover:from-orange-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02]"
                      showIcon={false}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Appeler maintenant</span>
                    </PhoneCallTracker>

                    {/* Séparateur */}
                    <div className="flex items-center gap-3 my-4">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-slate-400 text-xs uppercase tracking-wide">ou</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Formulaire rappel */}
                    <CallbackForm />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bandeau marques défilant - Mobile uniquement */}
          <div className="lg:hidden relative bg-black/20 backdrop-blur-sm border-t border-white/10 py-5 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                <span key={i} className="mx-10 text-2xl md:text-3xl font-bold text-white/30 tracking-wide">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* Editorial Content - Replaces old sections */}
        {/* ============================================================= */}
        <PACEditorialContent />
      </div>
    </>
  )
}
