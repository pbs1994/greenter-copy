"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Star, Check, Shield, Clock, Award, Loader2, Home, Euro, ArrowRight, ChevronDown, MapPin, Flame, Wind, Thermometer, FileCheck, Users, TrendingDown, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { LocalBusinessSchema } from "@/components/schemas/LocalBusinessSchema"
import { AggregateRatingSchema } from "@/components/schemas/AggregateRatingSchema"
import { ArticleSchema } from "@/components/schemas/ArticleSchema"
import { CITIES } from "@/lib/local-seo-data"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import type { GoogleReviewsResponse } from "@/lib/google-places"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const PHONE = "07 66 97 50 99"

const faqs = [
  {
    question: "L'isolation à 1 euro existe-t-elle encore en 2026 ?",
    answer:
      "Le dispositif historique « Isolation à 1€ », porté par le Coup de Pouce CEE, a officiellement pris fin au 1er juillet 2021 suite à de nombreuses fraudes. En 2026, il n'existe plus en tant que programme national unique. Cependant, grâce au cumul des aides actuelles (MaPrimeRénov' Bleu/Jaune, primes CEE bonifiées et Éco-PTZ), les ménages aux revenus très modestes peuvent encore financer la quasi-totalité de leurs travaux d'isolation des combles perdus et planchers bas. Chez Greenter, nous calculons précisément votre reste à charge avant travaux.",
  },
  {
    question: "Quelles sont les aides pour l'isolation en 2026 ?",
    answer:
      "Trois aides principales sont mobilisables en 2026 : (1) MaPrimeRénov' Parcours par Geste pour l'isolation des combles perdus et planchers bas (jusqu'à 25€/m² pour les ménages très modestes) ; (2) la Prime CEE versée par les fournisseurs d'énergie, dont le montant dépend de vos revenus et de la zone climatique (bonifiée « Grands Précaires ») ; (3) l'Éco-PTZ jusqu'à 50 000€ à taux zéro. La TVA est réduite à 5,5% sur les travaux. Toutes ces aides sont cumulables.",
  },
  {
    question: "Qui peut bénéficier de l'isolation à très bas coût ?",
    answer:
      "Les ménages dits « très modestes » (catégorie Anah/MaPrimeRénov' Bleu) bénéficient des primes les plus élevées. En Île-de-France en 2026, les plafonds sont d'environ 24 031€ pour 1 personne et 35 270€ pour 2 personnes. Hors Île-de-France, les plafonds sont d'environ 17 361€ pour 1 personne et 25 391€ pour 2 personnes. Les ménages modestes (MPR Jaune) bénéficient aussi de primes importantes mais légèrement inférieures.",
  },
  {
    question: "Quels travaux d'isolation sont concernés par les aides maximales ?",
    answer:
      "Les travaux les plus subventionnés en 2026 sont : l'isolation des combles perdus par soufflage (laine de verre, laine de roche ou ouate de cellulose), l'isolation des planchers bas (sur vide sanitaire, cave ou garage non chauffé), l'isolation des rampants de toiture et des murs (ITE ou ITI). Pour bénéficier des aides, la résistance thermique minimale exigée est R ≥ 7 m².K/W pour les combles et R ≥ 3 m².K/W pour les planchers bas.",
  },
  {
    question: "Intervenez-vous en Seine-et-Marne (77) ?",
    answer:
      "Oui, Greenter intervient dans toute la Seine-et-Marne et les communes limitrophes : Ozoir-la-Ferrière, Roissy-en-Brie, Pontault-Combault, Brie-Comte-Robert, Tournan-en-Brie, Gretz-Armainvilliers, Lésigny, Chevry-Cossigny et environs. Nous sommes certifiés RGE Qualibat, condition indispensable pour obtenir MaPrimeRénov' et les primes CEE.",
  },
  {
    question: "Combien de temps durent les travaux d'isolation des combles ?",
    answer:
      "L'isolation des combles perdus par soufflage est très rapide : pour une maison de 80 à 120 m², le chantier se termine en une demi-journée à une journée. L'isolation des planchers bas par projection nécessite 1 à 2 jours selon la surface. Vous profitez des économies d'énergie immédiatement après la fin du chantier.",
  },
  {
    question: "Comment se passe le dépôt du dossier MaPrimeRénov' ?",
    answer:
      "Greenter s'occupe de tout : création de votre compte sur maprimerenov.gouv.fr, constitution du dossier, envoi du devis, suivi de l'instruction, puis après travaux l'envoi de la facture pour obtenir le versement. Les aides CEE sont directement déduites de notre devis (« prime déduite »). Vous n'avez qu'à signer et profiter de vos travaux.",
  },
  {
    question: "Attention aux arnaques à l'isolation : comment reconnaître un artisan sérieux ?",
    answer:
      "Méfiez-vous du démarchage téléphonique qui est interdit depuis 2020 pour la rénovation énergétique, des offres « 100% gratuites » sans étude, et des entreprises sans certification RGE vérifiable. Chez Greenter, vous pouvez vérifier notre RGE Qualibat sur france-renov.gouv.fr. Nous établissons un devis détaillé après visite technique gratuite, sans pression commerciale.",
  },
]

// Plafonds de ressources Île-de-France 2026 (catégories Anah / MaPrimeRénov')
const plafondsIdf = [
  { personnes: "1", tresModeste: "24 031 €", modeste: "29 253 €", intermediaire: "40 851 €" },
  { personnes: "2", tresModeste: "35 270 €", modeste: "42 932 €", intermediaire: "60 050 €" },
  { personnes: "3", tresModeste: "42 355 €", modeste: "51 563 €", intermediaire: "71 845 €" },
  { personnes: "4", tresModeste: "49 456 €", modeste: "60 207 €", intermediaire: "84 562 €" },
  { personnes: "5", tresModeste: "56 579 €", modeste: "68 876 €", intermediaire: "96 816 €" },
]

// Aides 2026 détaillées
const aides = [
  {
    icon: Euro,
    title: "MaPrimeRénov' Parcours par Geste",
    amount: "Jusqu'à 25 €/m²",
    description:
      "Aide versée par l'Anah pour l'isolation des combles perdus et planchers bas. Le montant dépend de vos revenus (catégories Bleu, Jaune, Violet) et du type de travaux.",
    highlight: "Catégorie Bleu (très modeste)",
  },
  {
    icon: Sparkles,
    title: "Prime CEE bonifiée « Grands Précaires »",
    amount: "Jusqu'à 10,54 €/m²",
    description:
      "Versée par les fournisseurs d'énergie. Les ménages très modestes bénéficient d'une prime renforcée pour l'isolation des combles et toitures, et jusqu'à 6,80 €/m² pour les planchers bas.",
    highlight: "Cumulable MaPrimeRénov'",
  },
  {
    icon: Home,
    title: "Éco-PTZ",
    amount: "Jusqu'à 50 000 €",
    description:
      "Prêt à taux zéro pour financer le reste à charge de vos travaux de rénovation énergétique. Remboursement jusqu'à 20 ans sans intérêts.",
    highlight: "Sans condition de revenus",
  },
  {
    icon: TrendingDown,
    title: "TVA à taux réduit",
    amount: "5,5 %",
    description:
      "Appliquée directement sur le devis pour les travaux d'amélioration de la performance énergétique réalisés par un professionnel RGE dans les logements de plus de 2 ans.",
    highlight: "Automatique",
  },
]

// Zones d'intervention - Seine-et-Marne et communes limitrophes
const zonesIntervention = [
  { name: "Ozoir-la-Ferrière", cp: "77330" },
  { name: "Roissy-en-Brie", cp: "77680" },
  { name: "Pontault-Combault", cp: "77340" },
  { name: "Brie-Comte-Robert", cp: "77170" },
  { name: "Tournan-en-Brie", cp: "77220" },
  { name: "Gretz-Armainvilliers", cp: "77220" },
  { name: "Lésigny", cp: "77150" },
  { name: "Chevry-Cossigny", cp: "77173" },
  { name: "Férolles-Attilly", cp: "77150" },
  { name: "Servon", cp: "77170" },
  { name: "Grisy-Suisnes", cp: "77166" },
  { name: "Évry-Grégy-sur-Yerre", cp: "77166" },
]

// Processus en 4 étapes
const etapes = [
  {
    num: "01",
    title: "Contact & éligibilité",
    description:
      "Appelez-nous ou remplissez le formulaire. En 2 minutes, nous évaluons votre éligibilité aux aides 2026 selon votre catégorie de revenus et votre logement.",
    icon: Phone,
  },
  {
    num: "02",
    title: "Visite technique gratuite",
    description:
      "Un technicien se déplace gratuitement chez vous en Seine-et-Marne pour mesurer les combles, contrôler la charpente et identifier l'isolant adapté.",
    icon: Home,
  },
  {
    num: "03",
    title: "Devis & dépôt des aides",
    description:
      "Nous établissons un devis détaillé avec les aides déjà déduites. Nous déposons votre dossier MaPrimeRénov' et CEE et attendons l'accord avant travaux.",
    icon: FileCheck,
  },
  {
    num: "04",
    title: "Travaux en 1 journée",
    description:
      "L'isolation des combles perdus par soufflage se fait en une demi-journée à une journée. Vous profitez des économies d'énergie immédiatement.",
    icon: CheckCircle2,
  },
]

// Matériaux isolants
const materiaux = [
  {
    nom: "Laine de verre soufflée",
    type: "Minéral",
    r: "R = 7 m².K/W",
    epaisseur: "300 mm",
    atouts: ["Économique", "Incombustible", "Pose rapide"],
  },
  {
    nom: "Laine de roche",
    type: "Minéral",
    r: "R = 7 m².K/W",
    epaisseur: "320 mm",
    atouts: ["Excellent phonique", "Résistant au feu", "Durable 50 ans"],
  },
  {
    nom: "Ouate de cellulose",
    type: "Biosourcé",
    r: "R = 7 m².K/W",
    epaisseur: "280 mm",
    atouts: ["Écologique", "Bon déphasage été", "Recyclé"],
  },
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
    <div className={`${compact ? "bg-slate-50 rounded-xl p-4" : "bg-gradient-to-br from-slate-50 to-orange-50/50 rounded-2xl p-5 border border-slate-100"}`}>
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
            className={`w-full ${compact ? "pl-11 pr-4 py-3 text-base" : "pl-12 pr-4 py-4 text-lg"} bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full ${compact ? "py-3 text-base" : "py-4 text-lg"} bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
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

export default function Isolation1EuroPage() {
  const [googleData, setGoogleData] = useState<GoogleReviewsResponse | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

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
    { name: "Isolation à 1€", url: "https://greenter.fr/services/isolation-1-euro" },
  ]

  return (
    <>
      <ServiceSchema
        name="Isolation à 1€ - Combles et planchers bas en Seine-et-Marne"
        description="Isolation des combles perdus et planchers bas à partir de 1€* grâce aux aides 2026 (MaPrimeRénov', CEE bonifiés). Artisan certifié RGE Qualibat intervenant en Seine-et-Marne (77)."
        url="https://greenter.fr/services/isolation-1-euro"
        image="https://greenter.fr/isolation.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
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
        url="https://greenter.fr/services/isolation-1-euro"
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
        url="https://greenter.fr/services/isolation-1-euro"
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
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/isolation.jpg"
              alt="Isolation des combles à 1 euro en Seine-et-Marne par Greenter"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/95 via-amber-900/90 to-orange-900/85" />

          {/* MOBILE */}
          <div className="lg:hidden relative flex flex-col justify-between min-h-[100dvh] px-5 py-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Shield className="w-4 h-4 text-orange-300" />
                <span className="text-orange-200 text-sm font-medium">Certifié RGE Qualibat</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Isolation des combles
                <br />
                à partir de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">
                  1€
                </span>
                <span className="text-white">*</span>
              </h1>
              <p className="text-orange-100/80 text-base leading-relaxed mb-2">
                Grâce aux aides 2026 (MaPrimeRénov&apos; + CEE bonifiés).
              </p>
              <p className="text-orange-100/60 text-sm">Seine-et-Marne (77) & Île-de-France</p>
            </div>

            <div className="my-6">
              <div className="bg-white/95 backdrop-blur rounded-2xl p-5 shadow-2xl">
                <ul className="space-y-4 mb-5">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Combles perdus & </span>
                      <span className="text-orange-600 font-bold">planchers bas</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Aides </span>
                      <span className="text-orange-600 font-bold">déduites</span>
                      <span className="text-slate-500 text-sm"> du devis</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-slate-700">Chantier en </span>
                      <span className="text-orange-600 font-bold">1 journée</span>
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
          <div className="hidden lg:block relative max-w-7xl mx-auto px-4 pt-10 pb-12 w-full">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left */}
              <div className="lg:col-span-7 text-white pt-6">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                  <Shield className="w-4 h-4 text-orange-300" />
                  <span className="text-orange-200 text-sm font-medium">Certifié RGE Qualibat • Seine-et-Marne (77)</span>
                </div>
                <h1 className="text-4xl xl:text-6xl font-bold leading-[1.05] mb-5">
                  Isolation des combles
                  <br />à partir de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300">
                    1€
                  </span>
                  <span className="text-white">*</span>
                </h1>
                <p className="text-orange-100/85 mb-6 leading-relaxed text-lg max-w-xl">
                  Profitez des aides renforcées 2026 : <strong className="text-white">MaPrimeRénov&apos; Bleu/Jaune</strong>{" "}
                  et <strong className="text-white">Prime CEE bonifiée</strong>. Un reste à charge réduit à 1€ pour les
                  ménages très modestes sur l&apos;isolation des combles perdus.
                </p>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-4 mb-6 max-w-xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-orange-300">30%</p>
                    <p className="text-xs text-orange-100/70 mt-1">pertes par la toiture</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-orange-300">1 jour</p>
                    <p className="text-xs text-orange-100/70 mt-1">de travaux</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-orange-300">-600 €</p>
                    <p className="text-xs text-orange-100/70 mt-1">/ an de chauffage</p>
                  </div>
                </div>

                {/* Badge Google + CTA tel */}
                <div className="flex items-center gap-4 mb-6">
                  <a
                    href={googleData?.googleMapsUrl || "https://g.page/greenter"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 hover:shadow-xl transition-all"
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
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-orange-500/30"
                    showIcon={false}
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{PHONE}</span>
                  </PhoneCallTracker>
                </div>

                <p className="text-orange-100/50 text-xs italic max-w-xl">
                  *Reste à charge minimum après déduction de MaPrimeRénov&apos; et Prime CEE bonifiée pour les ménages
                  très modestes (catégorie Bleu). Calcul personnalisé gratuit après visite technique.
                </p>
              </div>

              {/* Right - form card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">Test d&apos;éligibilité gratuit</h2>
                        <p className="text-orange-100 text-sm">Réponse en 2 min • Sans engagement</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-slate-700 text-sm">
                          Aides MaPrimeRénov&apos; + CEE calculées
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Visite technique sous 48h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-slate-700 text-sm">Garantie décennale</span>
                      </div>
                    </div>
                    <PhoneCallTracker
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 hover:from-orange-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-[1.02]"
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
        {/* SECTION : Le vrai sur l'isolation à 1 euro en 2026 */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Transparence
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Isolation à 1€ en 2026 : ce qu&apos;il faut vraiment savoir
              </h2>
              <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
                Le dispositif historique « Isolation à 1€ » a officiellement pris fin en 2021. Mais grâce au cumul des
                aides renforcées de 2026, le reste à charge peut encore descendre jusqu&apos;à 1€ symbolique pour les
                ménages très modestes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-7 border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900">
                    Le dispositif historique n&apos;existe plus
                  </h3>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Le programme « Coup de Pouce Isolation » qui permettait d&apos;isoler ses combles pour 1€ symbolique
                  a été arrêté le <strong>1er juillet 2021</strong>, suite à de nombreuses fraudes et
                  malfaçons. Méfiez-vous des sites ou démarcheurs qui continuent d&apos;afficher cette offre telle quelle.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-7 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900">
                    Mais les aides 2026 sont massives
                  </h3>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  MaPrimeRénov&apos; <strong>+</strong> Prime CEE bonifiée « Grands Précaires » <strong>+</strong> TVA
                  réduite à 5,5% <strong>+</strong> Éco-PTZ : en cumulant ces aides, les ménages très modestes peuvent
                  financer <strong>jusqu&apos;à 100%</strong> de leurs travaux d&apos;isolation des combles perdus.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
              <p className="text-amber-900 text-sm leading-relaxed">
                <strong>Notre engagement transparence :</strong> Chez Greenter, nous calculons votre reste à charge
                <em> avant </em>les travaux, en fonction de votre catégorie de revenus (Bleu, Jaune, Violet, Rose). Si
                votre reste à charge n&apos;est pas de 1€, nous vous le disons clairement. Pas de mauvaises surprises.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Les aides 2026 en détail */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Aides 2026
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                4 aides cumulables pour réduire votre facture
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                Greenter gère l&apos;intégralité de vos démarches administratives. Vous n&apos;avez qu&apos;à signer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aides.map((aide, index) => {
                const Icon = aide.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 ring-1 ring-orange-100 hover:ring-orange-300 hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">{aide.title}</h3>
                    <p className="text-2xl font-bold text-orange-600 mb-3">{aide.amount}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1">{aide.description}</p>
                    <div className="mt-4 pt-4 border-t border-orange-50">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        {aide.highlight}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Exemple chiffré */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                  Cas concret
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-5">
                  Exemple : combles perdus de 100 m² à Ozoir-la-Ferrière
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                  Famille de 4 personnes, catégorie <strong>MaPrimeRénov&apos; Bleu</strong> (très modeste) en
                  Seine-et-Marne. Isolation par soufflage de laine de verre, R = 7 m².K/W.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <span className="text-neutral-700">
                      <strong>Épaisseur posée :</strong> 300 mm de laine de verre
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <span className="text-neutral-700">
                      <strong>Durée du chantier :</strong> 1 journée, avec pare-vapeur et repérage des points de
                      vigilance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <span className="text-neutral-700">
                      <strong>Économies estimées :</strong> ~600 € / an sur la facture de chauffage
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <span className="text-neutral-700">
                      <strong>Aides versées :</strong> directement par l&apos;Anah et le fournisseur CEE
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 ring-1 ring-orange-100 shadow-lg">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-6">
                  Calcul du reste à charge
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-orange-100">
                    <span className="text-neutral-600">Travaux isolation combles (100 m²)</span>
                    <span className="font-semibold text-neutral-900">2 200 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-orange-100">
                    <span className="text-neutral-600">MaPrimeRénov&apos; Bleu (25€/m²)</span>
                    <span className="font-semibold text-red-600">- 1 145 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-orange-100">
                    <span className="text-neutral-600">Prime CEE bonifiée (10,54€/m²)</span>
                    <span className="font-semibold text-red-600">- 1 054 €</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-white rounded-xl px-4 mt-4 shadow-sm">
                    <span className="text-lg font-semibold text-neutral-900">Reste à charge</span>
                    <span className="text-3xl font-bold text-orange-600">1 €</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mb-5 italic">
                  *Exemple pour un ménage aux revenus très modestes (catégorie Bleu). Montants susceptibles
                  d&apos;évoluer selon la situation réelle et la zone climatique. Calcul personnalisé gratuit après
                  visite technique.
                </p>
                <PhoneCallTracker
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
                  showIcon={false}
                >
                  <Phone className="w-5 h-5" />
                  Calculer mes aides
                </PhoneCallTracker>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Plafonds de ressources Île-de-France */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-10">
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Éligibilité
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Les plafonds de ressources 2026
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                Revenu fiscal de référence (RFR) à prendre en compte pour l&apos;Île-de-France — incluant la
                Seine-et-Marne (77).
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden ring-1 ring-neutral-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-r from-orange-50 to-amber-50">
                    <tr>
                      <th className="px-4 py-4 text-sm font-semibold text-neutral-700">Nombre de personnes</th>
                      <th className="px-4 py-4 text-sm font-semibold text-blue-700">Très modestes (Bleu)</th>
                      <th className="px-4 py-4 text-sm font-semibold text-amber-700">Modestes (Jaune)</th>
                      <th className="px-4 py-4 text-sm font-semibold text-purple-700">Intermédiaires (Violet)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {plafondsIdf.map((row, i) => (
                      <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-neutral-700">{row.personnes}</td>
                        <td className="px-4 py-3 font-bold text-blue-700">{row.tresModeste}</td>
                        <td className="px-4 py-3 font-bold text-amber-700">{row.modeste}</td>
                        <td className="px-4 py-3 font-bold text-purple-700">{row.intermediaire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-neutral-50 text-xs text-neutral-500 italic">
                Par personne supplémentaire : +7 108 € (Bleu) · +8 656 € (Jaune) · +12 145 € (Violet). Montants
                indicatifs 2026 pour l&apos;Île-de-France, susceptibles d&apos;ajustement officiel. Référence : Anah /
                MaPrimeRénov&apos;.
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-neutral-600 text-sm">
                Votre ménage est en catégorie <strong className="text-blue-700">Bleu</strong> ou{" "}
                <strong className="text-amber-700">Jaune</strong> ? Vous bénéficiez des aides les plus importantes.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Processus 4 étapes */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Comment ça marche
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                De l&apos;appel au chantier : 4 étapes simples
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                Greenter vous accompagne de A à Z. Aucune démarche administrative de votre côté.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {etapes.map((etape, index) => {
                const Icon = etape.icon
                return (
                  <div key={index} className="relative bg-white rounded-2xl p-6 ring-1 ring-neutral-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-bold text-orange-200">{etape.num}</span>
                      <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">{etape.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{etape.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Zones d'intervention Seine-et-Marne */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                  <MapPin className="w-4 h-4" />
                  Zone d&apos;intervention
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-5">
                  Spécialiste de l&apos;isolation en Seine-et-Marne (77)
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                  Basé à <strong>Ozoir-la-Ferrière</strong>, Greenter intervient dans toute la Seine-et-Marne et les
                  communes limitrophes pour l&apos;isolation des combles perdus et planchers bas à 1€*. Nos équipes
                  connaissent parfaitement le bâti francilien : pavillons des années 70-80, maisons anciennes, longères
                  briardes.
                </p>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl ring-1 ring-orange-100">
                  <Users className="w-8 h-8 text-orange-600 shrink-0" />
                  <div>
                    <p className="text-neutral-900 font-bold">Plus de 200 chantiers réalisés</p>
                    <p className="text-sm text-neutral-500">en Seine-et-Marne et Île-de-France</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-neutral-100">
                <h3 className="font-heading text-lg font-bold text-neutral-900 mb-4">
                  Nous intervenons notamment à :
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {zonesIntervention.map((ville, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl bg-orange-50/50 hover:bg-orange-50 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 leading-tight">{ville.name}</p>
                        <p className="text-xs text-neutral-500">{ville.cp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 mt-4 italic text-center">
                  Votre commune n&apos;est pas dans la liste ? Appelez-nous, nous étudions votre demande.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : Matériaux */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Matériaux certifiés
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Des isolants performants pour vos combles
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                Tous nos isolants sont certifiés ACERMI et respectent les exigences MaPrimeRénov&apos; 2026 :
                résistance thermique R ≥ 7 m².K/W en combles.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materiaux.map((mat, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl p-6 ring-1 ring-orange-100 hover:shadow-lg transition-shadow"
                >
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{mat.type}</span>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mt-1 mb-2">{mat.nom}</h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                    <span className="font-semibold">{mat.r}</span>
                    <span>·</span>
                    <span>{mat.epaisseur}</span>
                  </div>
                  <ul className="space-y-2">
                    {mat.atouts.map((atout, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-neutral-600">
                        <Check className="w-4 h-4 text-orange-600 shrink-0" />
                        {atout}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION : FAQ */}
        {/* ============================================================= */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Questions fréquentes
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Tout savoir sur l&apos;isolation à 1€ en 2026
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-orange-50/50 transition-colors"
                  >
                    <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-orange-600 shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 pb-5 text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* CTA FINAL */}
        {/* ============================================================= */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <Thermometer className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Testez votre éligibilité à l&apos;isolation à 1€*
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              En 2 minutes au téléphone, nous vérifions votre catégorie MaPrimeRénov&apos;, calculons vos aides et
              vous envoyons un devis transparent. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneCallTracker
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors shadow-xl"
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
            <p className="text-orange-200/80 text-xs mt-6 max-w-2xl mx-auto">
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
                className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-xl hover:shadow-md hover:bg-orange-50 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-orange-700 transition-colors">
                    Pompe à chaleur
                  </p>
                  <p className="text-sm text-neutral-500">Jusqu&apos;à -70% sur le chauffage</p>
                </div>
              </Link>
              <Link
                href="/services/panneaux-solaires"
                className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-xl hover:shadow-md hover:bg-orange-50 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Wind className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-orange-700 transition-colors">
                    Panneaux solaires
                  </p>
                  <p className="text-sm text-neutral-500">Produisez votre électricité</p>
                </div>
              </Link>
              <Link
                href="/services/audit"
                className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-xl hover:shadow-md hover:bg-orange-50 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <FileCheck className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-orange-700 transition-colors">
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
