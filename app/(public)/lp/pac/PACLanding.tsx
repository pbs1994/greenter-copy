"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import {
  Phone, CheckCircle, Star, ChevronDown, ChevronUp,
  ArrowRight, Shield, Zap, Leaf, Clock, Euro, Award,
  TrendingDown, AlertTriangle, Home, Wrench,
  Snowflake, Flame,
} from "lucide-react"

interface PACLandingProps {
  rating: number
  reviewCount: number
}

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------
function StatCounter({
  prefix = "",
  value,
  suffix,
  label,
  icon: Icon,
  trigger,
}: {
  prefix?: string
  value: number
  suffix: string
  label: string
  icon: React.ElementType
  trigger: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, value])

  const display = value >= 1000 ? count.toLocaleString("fr-FR") : String(count)

  return (
    <div className="text-center">
      <Icon className="w-7 h-7 text-white/60 mx-auto mb-3" />
      <div className="text-4xl sm:text-5xl font-black text-white">
        {prefix}{display}{suffix}
      </div>
      <p className="text-white/70 text-sm mt-2">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PAC type comparison card
// ---------------------------------------------------------------------------
function PACTypeCard({
  title,
  subtitle,
  price,
  savings,
  cop,
  duration,
  pros,
  cons,
  ideal,
  badge,
}: {
  title: string
  subtitle: string
  price: string
  savings: string
  cop: string
  duration: string
  pros: string[]
  cons: string[]
  ideal: string
  badge: string
}) {
  return (
    <div className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 shadow-xl max-w-2xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{title}</h3>
          <p className="text-neutral-500 text-sm">{subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
          <Award className="w-4 h-4" />
          {badge}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Prix", value: price, icon: Euro },
          { label: "Économies", value: savings, icon: TrendingDown },
          { label: "COP", value: cop, icon: Zap },
          { label: "Pose", value: duration, icon: Clock },
        ].map((s) => (
          <div key={s.label} className="bg-neutral-50 rounded-2xl p-4 text-center">
            <s.icon className="w-4 h-4 text-green-700 mx-auto mb-2" />
            <div className="text-sm font-bold text-neutral-900">{s.value}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <CheckCircle className="w-4 h-4" /> Avantages
          </h4>
          <ul className="space-y-2">
            {pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-neutral-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-neutral-500 mb-3 text-sm uppercase tracking-wide">À considérer</h4>
          <ul className="space-y-2 mb-4">
            {cons.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-neutral-500">
                <span className="flex-shrink-0 mt-0.5">–</span>
                {c}
              </li>
            ))}
          </ul>
          <div className="p-3 bg-green-50 rounded-xl">
            <p className="text-xs font-semibold text-green-800">Idéal pour :</p>
            <p className="text-xs text-green-700 mt-1">{ideal}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <PhoneCallTracker className="flex-1 inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-all">
          <Phone className="w-4 h-4" />
          Appeler pour un conseil
        </PhoneCallTracker>
        <a
          href="#devis"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold py-3.5 rounded-xl transition-all"
        >
          Demander un devis
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main landing page
// ---------------------------------------------------------------------------
export function PACLanding({ rating, reviewCount }: PACLandingProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [activeType, setActiveType] = useState<"air-air" | "air-eau">("air-air")
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", website: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    setFormStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: "Pompe à chaleur",
          message: form.message || "Demande de devis via landing page PAC",
          website: form.website,
        }),
      })
      setFormStatus(res.ok ? "success" : "error")
    } catch {
      setFormStatus("error")
    }
  }

  const stats = [
    { prefix: "-", value: 70, suffix: "%", label: "sur votre facture de chauffage", icon: TrendingDown },
    { prefix: "", value: 5000, suffix: "€", label: "d'aides disponibles en 2026", icon: Euro },
    { prefix: "", value: 20, suffix: " ans", label: "de durée de vie garantie", icon: Shield },
    { prefix: "", value: 48, suffix: "h", label: "pour recevoir votre devis", icon: Clock },
  ]

  const faqs = [
    {
      q: "Quel est le prix d'une pompe à chaleur ?",
      a: "Une PAC air/air démarre à partir de 1 500€/unité, une PAC air/eau à partir de 5 000€. Après déduction des aides (MaPrimeRénov', CEE, TVA 5,5%), votre reste à charge peut être réduit de 30 à 60%. Nous établissons un devis précis après la visite technique gratuite.",
    },
    {
      q: "Quelles aides financières puis-je obtenir en 2026 ?",
      a: "MaPrimeRénov' (rouvert le 23/02/2026) jusqu'à 5 000€, Éco-PTZ jusqu'à 50 000€ à taux zéro, CEE jusqu'à 4 000€, TVA réduite à 5,5%. Ces aides sont cumulables. Notre équipe s'occupe de tous les dossiers administratifs pour vous.",
    },
    {
      q: "Quelles économies puis-je réaliser ?",
      a: "Entre 50 et 70% sur votre facture de chauffage. C'est possible parce que pour 1 kWh d'électricité consommé, votre PAC produit 3 à 5 kWh de chaleur — c'est le COP (Coefficient de Performance).",
    },
    {
      q: "Une PAC fonctionne-t-elle par grand froid ?",
      a: "Oui, les PAC modernes fonctionnent jusqu'à -15°C voire -20°C. En Seine-et-Marne, les températures descendent rarement sous -10°C, donc votre PAC sera pleinement efficace toute l'année.",
    },
    {
      q: "Combien de temps dure l'installation ?",
      a: "1 à 2 jours pour l'installation complète. Avant cela : visite technique gratuite (1h) + calcul thermique (48h) + devis détaillé (48h). Tout est transparent, sans surprise sur la facture finale.",
    },
    {
      q: "Faut-il un entretien régulier ?",
      a: "Oui, un entretien annuel est obligatoire pour les PAC de plus de 2 kg de fluide frigorigène. Coût moyen : 150 à 200€/an. Durée de vie : 15 à 20 ans. Nous proposons des contrats de maintenance adaptés.",
    },
    {
      q: "Dans quelles communes intervenez-vous ?",
      a: "Nous intervenons dans toute la Seine-et-Marne (77) : Ozoir-la-Ferrière, Roissy-en-Brie, Pontault-Combault, Brie-Comte-Robert, Melun, Meaux, Tournan-en-Brie, Gretz-Armainvilliers, et toute l'Île-de-France.",
    },
  ]

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-neutral-900 transition-all placeholder:text-neutral-400"

  return (
    <div className="min-h-screen bg-white">

      {/* ── URGENCY BANNER ─────────────────────────────────────────────────── */}
      <div className="bg-amber-500 text-white py-2.5 px-4 text-center text-sm font-medium">
        <AlertTriangle className="inline w-4 h-4 mr-1.5 mb-0.5" />
        <strong>MaPrimeRénov&apos; est rouvert !</strong> — Profitez des aides 2026 avant qu&apos;elles changent.{" "}
        <a href="#devis" className="underline font-bold">Demandez votre devis gratuit →</a>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Award className="w-4 h-4 text-amber-400" />
                Certifié RGE · Qualibat · QualiPAC
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
                Divisez votre facture{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                  de chauffage par 3
                </span>
              </h1>

              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Installation pompe à chaleur certifiée RGE. Visite technique gratuite,
                devis sous 48h. Aides jusqu&apos;à{" "}
                <strong className="text-white">9 000€</strong> prises en charge par notre équipe.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Visite technique 100% gratuite et sans engagement",
                  "MaPrimeRénov' + CEE : jusqu'à 9 000€ d'aides cumulées",
                  "Installation en 1 à 2 jours — Garantie 10 ans",
                  "50 à 70% d'économies dès la première année",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-green-100">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PhoneCallTracker className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-[1.02]">
                  <Phone className="w-5 h-5" />
                  Appeler maintenant
                </PhoneCallTracker>
                <a
                  href="#devis"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-green-900 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all"
                >
                  Devis gratuit en ligne
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-white/30"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{rating}/5</span>
                <span className="text-green-300 text-sm">({reviewCount} avis Google vérifiés)</span>
              </div>
            </div>

            {/* Right: form */}
            <div id="devis" className="scroll-mt-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900">Demande de devis gratuit</h2>
                  <p className="text-neutral-500 text-sm mt-1">Réponse sous 48h · Sans engagement</p>
                </div>

                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Demande envoyée !</h3>
                    <p className="text-neutral-600 text-sm">
                      Notre équipe vous contacte sous 48h pour planifier votre visite technique gratuite.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitForm} className="space-y-4">
                    <input
                      type="text" tabIndex={-1} autoComplete="off"
                      value={form.website}
                      onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                      className="hidden"
                    />
                    <input
                      type="text" placeholder="Votre prénom et nom *" required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className={inputCls}
                    />
                    <input
                      type="tel" placeholder="Votre téléphone *" required
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className={inputCls}
                    />
                    <input
                      type="email" placeholder="Votre email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className={inputCls}
                    />
                    <textarea
                      placeholder="Votre situation (surface, système actuel, DPE...)"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className={`${inputCls} resize-none`}
                    />
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-70 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-green-700/30 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {formStatus === "loading" ? "Envoi en cours..." : "Recevoir mon devis gratuit →"}
                    </button>
                    {formStatus === "error" && (
                      <p className="text-red-600 text-sm text-center">
                        Une erreur est survenue.{" "}
                        <PhoneCallTracker className="underline font-medium">Appelez-nous directement.</PhoneCallTracker>
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 text-center">
                      🔒 Données sécurisées · Zéro spam · Aucun engagement
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-green-400 text-xs text-center uppercase tracking-widest mb-4">Marques installées</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {["Atlantic", "Daikin", "Mitsubishi", "Panasonic", "Toshiba", "LG", "Hitachi"].map((b) => (
                <span key={b} className="text-white/50 hover:text-white font-semibold transition-colors text-sm sm:text-base">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="bg-gradient-to-r from-teal-600 to-green-700 text-white py-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCounter key={i} {...s} trigger={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Pourquoi choisir une pompe à chaleur ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              3 à 5x plus rentable que le gaz ou le fioul — et c&apos;est prouvé.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingDown, color: "text-green-700", bg: "bg-green-50",
                stat: "−50 à −70%", title: "Économies immédiates",
                desc: "Sur votre facture de chauffage dès la première année. Pour 1 kWh consommé, votre PAC produit 3 à 5 kWh de chaleur.",
              },
              {
                icon: Zap, color: "text-teal-600", bg: "bg-teal-50",
                stat: "20°C toute l'année", title: "Confort optimal",
                desc: "Chauffage en hiver, climatisation réversible en été. Une température agréable constante, hiver comme été.",
              },
              {
                icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50",
                stat: "−90% de CO₂", title: "Zéro culpabilité",
                desc: "Par rapport à une chaudière gaz ou fioul. 75% de l'énergie est puisée gratuitement dans l'air extérieur.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${b.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <b.icon className={`w-7 h-7 ${b.color}`} />
                </div>
                <div className={`text-3xl font-black ${b.color} mb-2`}>{b.stat}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{b.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TYPES ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Quelle PAC pour votre logement ?
            </h2>
            <p className="text-neutral-600 text-lg">
              Comparez les deux solutions les plus adaptées en rénovation
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-2xl p-1.5 ring-1 ring-neutral-200 shadow-sm">
              {(["air-air", "air-eau"] as const).map((t) => {
                const active = activeType === t
                const Icon = t === "air-air" ? Snowflake : Flame
                const label = t === "air-air" ? "PAC Air/Air" : "PAC Air/Eau"
                return (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                      active
                        ? "bg-green-700 text-white shadow-lg shadow-green-700/20"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {activeType === "air-air" ? (
            <PACTypeCard
              title="Pompe à chaleur Air/Air"
              subtitle="Idéale pour les appartements et maisons sans chauffage central"
              price="1 500€ à 5 000€"
              savings="jusqu'à 40%"
              cop="3 à 4"
              duration="1 jour"
              pros={[
                "Installation simple et rapide",
                "Fonctionne aussi en climatisation réversible",
                "Prix d'acquisition attractif",
                "Adapté aux appartements et studios",
              ]}
              cons={[
                "Ne chauffe pas l'eau sanitaire",
                "Moins adapté aux très grands volumes",
              ]}
              ideal="Appartements, maisons sans radiateurs existants"
              badge="Le plus accessible"
            />
          ) : (
            <PACTypeCard
              title="Pompe à chaleur Air/Eau"
              subtitle="La solution complète pour remplacer votre chaudière"
              price="5 000€ à 15 000€"
              savings="50 à 70%"
              cop="3 à 5"
              duration="1 à 2 jours"
              pros={[
                "Remplace totalement chaudière gaz ou fioul",
                "Chauffe l'eau sanitaire et les radiateurs",
                "COP optimal — économies maximales",
                "Compatible plancher chauffant basse température",
              ]}
              cons={[
                "Investissement initial plus élevé",
                "Peut nécessiter l'adaptation des radiateurs",
              ]}
              ideal="Maisons avec chauffage central existant"
              badge="Économies maximales"
            />
          )}
        </div>
      </section>

      {/* ── AIDES ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Les aides 2026 : réduisez votre coût jusqu&apos;à 60%
            </h2>
            <p className="text-neutral-600 text-lg">
              MaPrimeRénov&apos; est rouvert depuis le 23 février 2026
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-12 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong className="text-amber-900">À partir de 2027 :</strong> les maisons classées DPE F ou G
              n&apos;auront plus accès au parcours par geste.{" "}
              <strong>Anticipez vos travaux maintenant pour bénéficier de toutes les aides.</strong>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { name: "MaPrimeRénov'", amount: "jusqu'à 5 000€", note: "Logement >15 ans · RGE obligatoire", icon: Award },
              { name: "Éco-PTZ", amount: "jusqu'à 50 000€", note: "Prêt à taux zéro · sans conditions de ressources", icon: Euro },
              { name: "CEE", amount: "jusqu'à 4 000€", note: "Cumulable avec MaPrimeRénov'", icon: Zap },
              { name: "TVA réduite", amount: "5,5%", note: "Automatique avec artisan RGE (vs 20%)", icon: Shield },
            ].map((a) => (
              <div
                key={a.name}
                className="bg-white rounded-2xl p-6 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all text-center"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <a.icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{a.name}</h3>
                <div className="text-2xl font-black text-green-700 mb-2">{a.amount}</div>
                <p className="text-neutral-500 text-xs leading-relaxed">{a.note}</p>
              </div>
            ))}
          </div>

          {/* Example calculation */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 text-center mb-8">
              Exemple concret — maison 100m², ménage intermédiaire
            </h3>
            <div className="bg-neutral-50 rounded-3xl p-8 ring-1 ring-neutral-100">
              <div className="space-y-3">
                {[
                  { label: "Prix installation PAC Air/Eau", value: "8 000€", positive: false },
                  { label: "− MaPrimeRénov' (intermédiaire)", value: "− 3 000€", positive: true },
                  { label: "− CEE (certificats économie énergie)", value: "− 1 500€", positive: true },
                  { label: "− TVA réduite 5,5%", value: "− 750€", positive: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-neutral-700 text-sm sm:text-base">{row.label}</span>
                    <span className={`font-bold text-lg ${row.positive ? "text-green-700" : "text-neutral-900"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 pb-2 px-4 bg-green-50 rounded-2xl">
                  <span className="font-bold text-neutral-900 text-lg">Votre reste à charge</span>
                  <span className="font-black text-green-700 text-4xl">2 750€</span>
                </div>
              </div>
              <p className="text-neutral-400 text-xs mt-4 text-center">
                *Exemple indicatif. Le montant exact est déterminé lors de votre visite technique gratuite.
              </p>
            </div>
            <div className="text-center mt-8">
              <a
                href="#devis"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-green-700/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Calculer mon reste à charge
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              De la visite à l&apos;installation en 4 étapes
            </h2>
            <p className="text-neutral-600 text-lg">Simple, transparent, sans mauvaise surprise</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                n: 1, icon: Home, title: "Visite technique", duration: "~1h · GRATUIT",
                desc: "À domicile. Évaluation de votre logement : surface, isolation, système actuel, emplacement de l'unité extérieure.",
              },
              {
                n: 2, icon: Wrench, title: "Dimensionnement", duration: "48h",
                desc: "Calcul thermique précis pour sélectionner la PAC parfaitement adaptée à vos besoins réels.",
              },
              {
                n: 3, icon: Euro, title: "Devis détaillé", duration: "48h · GRATUIT",
                desc: "Matériel, installation, aides déduites, reste à charge. Tout est listé, rien à découvrir.",
              },
              {
                n: 4, icon: Zap, title: "Installation", duration: "1–2 jours",
                desc: "Pose de l'unité extérieure, raccordement, mise en service et réglages par nos techniciens certifiés RGE.",
              },
            ].map((step) => (
              <div key={step.n} className="relative bg-white rounded-3xl p-7 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-xl transition-all group">
                <span className="absolute top-4 right-5 text-6xl font-black text-neutral-100 select-none group-hover:text-green-50 transition-colors">
                  {step.n}
                </span>
                <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center mb-5 shadow-md shadow-green-700/20 group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900">Certifications & garanties</h2>
            <p className="text-neutral-500 text-sm mt-2">
              Obligatoires pour accéder à toutes les aides de l&apos;État
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { src: "/certifications/rge.webp", alt: "Certification RGE" },
              { src: "/certifications/qualibat.jpg", alt: "Qualibat" },
              { src: "/certifications/qualipac.jpg", alt: "QualiPAC" },
              { src: "/certifications/qualipv.png", alt: "QualiPV" },
            ].map((c) => (
              <div
                key={c.alt}
                className="bg-white rounded-2xl p-4 ring-1 ring-neutral-200 hover:ring-green-300 hover:shadow-md transition-all"
              >
                <Image src={c.src} alt={c.alt} width={120} height={70} className="h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-green-50 rounded-2xl text-center">
            <p className="text-green-800 text-sm font-medium">
              <Shield className="inline w-4 h-4 mr-1.5" />
              Notre certification RGE vous garantit l&apos;accès à{" "}
              <strong>toutes les aides financières</strong>. Nous gérons les dossiers à votre place.
            </p>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 ring-1 ring-neutral-100 shadow-sm mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-2xl font-black text-neutral-900">{rating}/5</span>
              <span className="text-neutral-500 text-sm">{reviewCount} avis Google</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">Ce que disent nos clients</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Marie L.", city: "Ozoir-la-Ferrière",
                text: "Installation impeccable en une journée. L'équipe Greenter a géré tout le dossier MaPrimeRénov'. Économies réelles dès le premier mois !",
              },
              {
                name: "Pierre M.", city: "Pontault-Combault",
                text: "Très professionnel du début à la fin. Visite technique gratuite, devis clair et transparent, installation propre et rapide. Je recommande vivement.",
              },
              {
                name: "Sophie R.", city: "Brie-Comte-Robert",
                text: "Notre facture de chauffage a diminué de 65% ! L'investissement sera amorti en moins de 4 ans. Merci à toute l'équipe Greenter.",
              },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-5 italic text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">{r.name}</p>
                    <p className="text-neutral-500 text-xs">{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-neutral-600">Tout ce que vous devez savoir avant de vous lancer</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl ring-1 overflow-hidden transition-all ${
                  faqOpen === i ? "ring-green-300 shadow-md" : "ring-neutral-100"
                }`}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-neutral-900 text-sm sm:text-base">{faq.q}</span>
                  {faqOpen === i
                    ? <ChevronUp className="w-5 h-5 text-green-700 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  }
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-green-950 via-green-900 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Clock className="w-4 h-4 text-amber-400" />
            Places limitées — Rendez-vous sous 48h
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            Prêt à réduire votre facture ?
          </h2>
          <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
            Visite technique gratuite, devis sans engagement sous 48h.
            Notre équipe s&apos;occupe de tout — y compris vos dossiers d&apos;aides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <PhoneCallTracker className="inline-flex items-center justify-center gap-3 bg-white text-green-900 hover:bg-green-50 font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]">
              <Phone className="w-5 h-5" />
              Appeler maintenant
            </PhoneCallTracker>
            <a
              href="#devis"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
            >
              Devis gratuit en ligne
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-green-300 text-sm">
            {["✓ Visite gratuite", "✓ Devis sous 48h", "✓ Sans engagement", "✓ Aides gérées par nos soins"].map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ──────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-sm border-t border-neutral-200 shadow-2xl px-4 py-3 safe-area-inset-bottom">
        <div className="flex gap-3 max-w-sm mx-auto">
          <PhoneCallTracker className="flex-1 flex items-center justify-center gap-2 bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all">
            <Phone className="w-4 h-4" />
            Appeler
          </PhoneCallTracker>
          <a
            href="#devis"
            className="flex-1 flex items-center justify-center gap-2 bg-teal-600 active:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all"
          >
            Devis gratuit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* bottom spacing for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" aria-hidden />
    </div>
  )
}
