"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import {
  Phone, CheckCircle, Star, ChevronDown, ChevronUp,
  ArrowRight, Shield, Zap, Leaf, Clock, Euro, Award,
  AlertTriangle, Home, Thermometer, TrendingDown,
  Info, Check, X, Flame,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Eligibility simulator data
// ---------------------------------------------------------------------------
const IDF_THRESHOLDS = [
  { bleu: 24031, jaune: 29253, violet: 40851 },
  { bleu: 35270, jaune: 42932, violet: 60050 },
  { bleu: 42355, jaune: 51563, violet: 71845 },
  { bleu: 49456, jaune: 60207, violet: 84562 },
  { bleu: 56579, jaune: 68876, violet: 96816 },
]
const NON_IDF_THRESHOLDS = [
  { bleu: 17361, jaune: 22250, violet: 31177 },
  { bleu: 25393, jaune: 32546, violet: 45826 },
  { bleu: 30540, jaune: 39148, violet: 55156 },
  { bleu: 35675, jaune: 45730, violet: 64552 },
  { bleu: 40831, jaune: 52340, violet: 73909 },
]

type Category = "bleu" | "jaune" | "violet" | "rose" | null

const CATEGORY_CONFIG: Record<
  NonNullable<Category>,
  { label: string; color: string; bg: string; border: string; resteACharge: string; prime: string; desc: string }
> = {
  bleu: {
    label: "Catégorie Bleu — Très modeste",
    color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-300",
    resteACharge: "à partir de 1€*",
    prime: "jusqu'à 3 554€ d'aides sur 100m²",
    desc: "Vous bénéficiez des aides maximales : MaPrimeRénov' 25€/m² + CEE bonifiée 10,54€/m².",
  },
  jaune: {
    label: "Catégorie Jaune — Modeste",
    color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-300",
    resteACharge: "quelques centaines d'€",
    prime: "jusqu'à 2 800€ d'aides sur 100m²",
    desc: "Aides très importantes : MaPrimeRénov' majorée + prime CEE. Amortissement rapide.",
  },
  violet: {
    label: "Catégorie Violet — Intermédiaire",
    color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-300",
    resteACharge: "reste à charge partiel",
    prime: "jusqu'à 1 500€ d'aides sur 100m²",
    desc: "Aides MaPrimeRénov' + TVA 5,5% + Éco-PTZ à taux zéro disponible.",
  },
  rose: {
    label: "Catégorie Rose — Aisé",
    color: "text-pink-700", bg: "bg-pink-50", border: "border-pink-300",
    resteACharge: "reste à charge significatif",
    prime: "TVA 5,5% + Éco-PTZ 50 000€",
    desc: "TVA réduite automatique (5,5%) + Éco-PTZ à taux zéro. Rentabilité sur 5 à 8 ans.",
  },
}

function getCategory(income: number, persons: number, isIdf: boolean): Category {
  const idx = Math.min(persons - 1, 4)
  const t = isIdf ? IDF_THRESHOLDS[idx] : NON_IDF_THRESHOLDS[idx]
  if (income <= t.bleu) return "bleu"
  if (income <= t.jaune) return "jaune"
  if (income <= t.violet) return "violet"
  return "rose"
}

// ---------------------------------------------------------------------------
// Animated stat counter
// ---------------------------------------------------------------------------
function StatCounter({
  prefix = "", value, suffix, label, icon: Icon, trigger,
}: {
  prefix?: string; value: number; suffix: string; label: string
  icon: React.ElementType; trigger: boolean
}) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value))
      if (p >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, value])
  const display = value >= 1000 ? count.toLocaleString("fr-FR") : String(count)
  return (
    <div className="text-center">
      <Icon className="w-7 h-7 text-white/60 mx-auto mb-3" />
      <div className="text-4xl sm:text-5xl font-black text-white">{prefix}{display}{suffix}</div>
      <p className="text-white/70 text-sm mt-2">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Heat loss bar
// ---------------------------------------------------------------------------
function HeatBar({ label, pct, sub, trigger }: { label: string; pct: number; sub: string; trigger: boolean }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const t = setTimeout(() => setWidth(pct), 100)
    return () => clearTimeout(t)
  }, [trigger, pct])
  const color = pct >= 25 ? "bg-red-500" : pct >= 15 ? "bg-orange-400" : "bg-amber-400"
  return (
    <div>
      <div className="flex justify-between items-end mb-1.5">
        <span className="font-semibold text-neutral-800 text-sm sm:text-base">{label}</span>
        <span className="font-black text-lg text-neutral-900">{pct}%</span>
      </div>
      <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="text-neutral-500 text-xs mt-1">{sub}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface IsolationLandingProps { rating: number; reviewCount: number }

export function IsolationLanding({ rating, reviewCount }: IsolationLandingProps) {
  // ── State ──
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [activeType, setActiveType] = useState<"combles" | "planchers" | "murs">("combles")
  const [statsVisible, setStatsVisible] = useState(false)
  const [heatVisible, setHeatVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const heatRef = useRef<HTMLDivElement>(null)

  // Form
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", website: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Eligibility simulator
  const [simPersons, setSimPersons] = useState<number>(2)
  const [simIsIdf, setSimIsIdf] = useState<boolean>(true)
  const [simIncome, setSimIncome] = useState<string>("")
  const [simResult, setSimResult] = useState<Category>(null)

  // Observers
  useEffect(() => {
    const obs = (ref: React.RefObject<HTMLDivElement | null>, fn: () => void) => {
      const el = ref.current
      if (!el) return
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) fn() }, { threshold: 0.3 })
      o.observe(el)
      return () => o.disconnect()
    }
    const c1 = obs(statsRef, () => setStatsVisible(true))
    const c2 = obs(heatRef, () => setHeatVisible(true))
    return () => { c1?.(); c2?.() }
  }, [])

  const runSim = () => {
    const v = parseInt(simIncome.replace(/\s/g, ""), 10)
    if (!isNaN(v) && v > 0) setSimResult(getCategory(v, simPersons, simIsIdf))
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    setFormStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          service: "Isolation thermique",
          message: form.message || "Demande de devis via landing page Isolation",
          website: form.website,
        }),
      })
      setFormStatus(res.ok ? "success" : "error")
    } catch { setFormStatus("error") }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-neutral-900 transition-all placeholder:text-neutral-400"

  const faqs = [
    { q: "L'isolation à 1€ existe-t-elle encore en 2026 ?", a: "Pas dans sa forme historique — le « Coup de Pouce à 1€ » a pris fin en juillet 2021. Mais en 2026, grâce au cumul de MaPrimeRénov' Bleu/Jaune, de la Prime CEE bonifiée « Grands Précaires » et de l'Éco-PTZ, le reste à charge descend à quelques euros pour les ménages très modestes. Le résultat est le même : une isolation quasi-gratuite." },
    { q: "Quelles aides financières sont disponibles en 2026 ?", a: "Trois aides principales cumulables : (1) MaPrimeRénov' — jusqu'à 25€/m² pour les ménages très modestes ; (2) Prime CEE bonifiée — jusqu'à 10,54€/m² pour les combles ; (3) Éco-PTZ — jusqu'à 50 000€ à taux zéro sans condition de revenus. Plus la TVA automatiquement réduite à 5,5% avec un artisan RGE." },
    { q: "Quels sont les plafonds de ressources Anah 2026 ?", a: "En Île-de-France, la catégorie Bleu (très modeste) s'applique jusqu'à 24 031€/an pour 1 personne et 35 270€ pour 2 personnes. Hors Île-de-France : 17 361€ et 25 393€. Ces plafonds ont été revalorisés de +1,105% en 2026. Notre simulateur ci-dessus vous indique votre catégorie en 30 secondes." },
    { q: "Combien de temps durent les travaux d'isolation ?", a: "Pour des combles perdus (80-120 m²) par soufflage, l'équipe intervient en une session complète. Pour les planchers bas, comptez 1 à 2 sessions selon la surface et les contraintes d'accès. Vous profitez des économies dès la fin des travaux — jusqu'à 600€/an sur votre facture." },
    { q: "Quel matériau isolant choisir pour les combles ?", a: "Pour les combles perdus, la laine de verre soufflée est le meilleur rapport coût/performance (λ ≈ 0,035 W/m.K, économique). La ouate de cellulose est idéale pour les profils éco-responsables (bilan carbone négatif). Pour les rampants, la fibre de bois offre un déphasage thermique exceptionnel en été. Tous atteignent R ≥ 7 m².K/W." },
    { q: "Comment Greenter gère-t-il les dossiers d'aides ?", a: "Greenter prend en charge toute la procédure : constitution du dossier MaPrimeRénov', dépôt sur la plateforme, suivi de l'instruction et dossier CEE auprès du fournisseur d'énergie. Vous ne payez que le reste à charge — aucune avance de trésorerie de votre côté." },
    { q: "Comment éviter les arnaques à l'isolation ?", a: "Méfiez-vous du démarchage téléphonique (interdit depuis 2020 pour la rénovation énergétique) et des offres « 100% gratuites sans étude ». Chez Greenter, vous pouvez vérifier notre certification RGE Qualibat sur france-renov.gouv.fr. Nous établissons toujours un devis après une visite technique gratuite, sans pression." },
  ]

  const TYPES = {
    combles: {
      icon: Home, label: "Combles perdus",
      title: "Isolation des combles perdus",
      subtitle: "Le chantier le plus rentable — 30% des pertes de chaleur",
      price: "À partir de 1€*", savings: "600€/an", r: "R ≥ 7 m².K/W", duration: "1 journée",
      pros: ["Chantier le plus rentable (amortissement 3-5 ans)", "Aides maximales : MaPrimeRénov' + CEE bonifiée", "Pas de travaux visibles dans le logement", "Amélioration immédiate du confort thermique"],
      cons: ["Nécessite un accès aux combles (trappe)", "Combles habitables : traitement différent"],
      badge: "Priorité n°1", note: "*Pour ménages très modestes (catégorie Bleu)",
    },
    planchers: {
      icon: Thermometer, label: "Planchers bas",
      title: "Isolation des planchers bas",
      subtitle: "Cave, vide sanitaire ou garage non chauffé — 7 à 10% des pertes",
      price: "Devis sur mesure", savings: "250€/an", r: "R ≥ 3 m².K/W", duration: "1–2 jours",
      pros: ["Élimine les sensations de sol froid", "Améliore le DPE du logement", "Aides MaPrimeRénov' + CEE disponibles", "Aucune gêne dans les pièces de vie"],
      cons: ["Nécessite un accès sous le plancher", "Efficacité dépend de la hauteur de vide"],
      badge: "Souvent oublié", note: "Souvent couplé avec l'isolation des combles",
    },
    murs: {
      icon: Flame, label: "Murs (ITE/ITI)",
      title: "Isolation des murs",
      subtitle: "Par l'extérieur (ITE) ou l'intérieur (ITI) — 20 à 25% des pertes",
      price: "À partir de 800€", savings: "550€/an", r: "R ≥ 3,7 m².K/W", duration: "Variable",
      pros: ["Supprime ponts thermiques et parois froides", "ITE : pas de perte de surface habitable", "Améliore l'esthétique du bâtiment (ITE)", "Aides MaPrimeRénov' disponibles"],
      cons: ["Investissement plus important", "ITE : copropriété = accord requis"],
      badge: "Efficacité maximale", note: "Devis après visite technique obligatoire",
    },
  }
  type TypeKey = keyof typeof TYPES
  const currentType = TYPES[activeType]

  return (
    <div className="min-h-screen bg-white">

      {/* ── URGENCY BANNER ─────────────────────────────────────────────────── */}
      <div className="bg-amber-500 text-white py-2.5 px-4 text-center text-sm font-medium">
        <AlertTriangle className="inline w-4 h-4 mr-1.5 mb-0.5" />
        <strong>2027 :</strong> Les logements DPE F/G perdront l&apos;accès aux aides par geste.{" "}
        <a href="#devis" className="underline font-bold">Agissez maintenant →</a>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-teal-800 text-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Award className="w-4 h-4 text-amber-400" />
                Certifié RGE · Qualibat · ACERMI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 tracking-tight">
                Isolation des combles{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                  à partir de 1€*
                </span>
              </h1>

              <p className="text-lg text-green-200 mb-2 font-medium">
                Grâce aux aides 2026 : MaPrimeRénov&apos; + CEE bonifiés.
              </p>
              <p className="text-green-300 text-sm mb-8">
                *Pour les ménages très modestes (catégorie Bleu). Aucune avance de trésorerie.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Reste à charge dès 1€* pour les ménages très modestes",
                  "Aucune avance de trésorerie — on gère tous les dossiers",
                  "Facture de chauffage réduite de 30% dès le premier hiver",
                  "Visite technique gratuite · Devis sous 48h",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-green-100 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PhoneCallTracker className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-[1.02]">
                  <Phone className="w-5 h-5" />
                  Vérifier mon éligibilité
                </PhoneCallTracker>
                <a href="#devis"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-green-900 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all">
                  Devis gratuit en ligne
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-white/30"}`} />
                  ))}
                </div>
                <span className="font-semibold">{rating}/5</span>
                <span className="text-green-300 text-sm">({reviewCount} avis Google)</span>
              </div>
            </div>

            {/* Right: form */}
            <div id="devis" className="scroll-mt-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900">Devis isolation gratuit</h2>
                  <p className="text-neutral-500 text-sm mt-1">Réponse sous 48h · Sans engagement · Aucune avance</p>
                </div>

                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Demande envoyée !</h3>
                    <p className="text-neutral-600 text-sm">Nous vous contactons sous 48h pour calculer vos aides et planifier la visite gratuite.</p>
                  </div>
                ) : (
                  <form onSubmit={submitForm} className="space-y-4">
                    <input type="text" tabIndex={-1} autoComplete="off" value={form.website}
                      onChange={(e) => setForm(p => ({ ...p, website: e.target.value }))} className="hidden" />
                    <input type="text" placeholder="Votre prénom et nom *" required
                      value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                      className={inputCls} />
                    <input type="tel" placeholder="Votre téléphone (06 ou 07) *" required
                      value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                      className={inputCls} />
                    <input type="email" placeholder="Votre email"
                      value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                      className={inputCls} />
                    <textarea placeholder="Surface des combles, type de logement (maison/appart), ville..." rows={3}
                      value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                      className={`${inputCls} resize-none`} />
                    <button type="submit" disabled={formStatus === "loading"}
                      className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-70 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-green-700/30 hover:shadow-xl hover:-translate-y-0.5">
                      {formStatus === "loading" ? "Envoi en cours..." : "Calculer mes aides gratuitement →"}
                    </button>
                    {formStatus === "error" && (
                      <p className="text-red-600 text-sm text-center">
                        Une erreur est survenue.{" "}
                        <PhoneCallTracker className="underline font-medium">Appelez-nous.</PhoneCallTracker>
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 text-center">🔒 Données sécurisées · Zéro spam · Aucun engagement</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-gradient-to-r from-teal-600 to-green-700 py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 30, suffix: "%", label: "d'économies sur la facture chauffage", icon: TrendingDown },
              { value: 600, suffix: "€", label: "économisés par an sur 100m² de combles", icon: Euro },
              { value: 50000, suffix: "€", label: "d'Éco-PTZ à taux zéro disponible", icon: Shield },
              { value: 48, suffix: "h", label: "pour recevoir votre devis gratuit", icon: Clock },
            ].map((s, i) => <StatCounter key={i} {...s} trigger={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY SIMULATOR ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" /> Simulateur d&apos;éligibilité
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Combien vais-je payer pour mes travaux ?
            </h2>
            <p className="text-neutral-600">Estimez votre reste à charge en 30 secondes — sans inscription</p>
          </div>

          <div className="bg-white rounded-3xl ring-1 ring-neutral-100 shadow-xl p-8">
            <div className="space-y-6">
              {/* Region */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">Votre région</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: true, label: "Île-de-France" },
                    { val: false, label: "Hors Île-de-France" },
                  ].map(({ val, label }) => (
                    <button key={label} onClick={() => { setSimIsIdf(val); setSimResult(null) }}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                        simIsIdf === val
                          ? "border-green-600 bg-green-50 text-green-800"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Persons */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Nombre de personnes au foyer
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => { setSimPersons(n); setSimResult(null) }}
                      className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                        simPersons === n
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-neutral-200 text-neutral-600 hover:border-green-300"
                      }`}>
                      {n === 5 ? "5+" : n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Income */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Revenu fiscal de référence annuel (N-1 ou N-2)
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input type="text" placeholder="ex : 28 000"
                      value={simIncome} onChange={(e) => { setSimIncome(e.target.value); setSimResult(null) }}
                      onKeyDown={(e) => e.key === "Enter" && runSim()}
                      className={`${inputCls} pr-8`} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-medium">€</span>
                  </div>
                  <button onClick={runSim}
                    className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex-shrink-0">
                    Calculer
                  </button>
                </div>
                <p className="text-xs text-neutral-400 mt-2 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Visible sur votre avis d&apos;imposition, ligne « Revenu fiscal de référence »
                </p>
              </div>

              {/* Result */}
              {simResult && (() => {
                const cfg = CATEGORY_CONFIG[simResult]
                return (
                  <div className={`rounded-2xl border-2 p-6 ${cfg.bg} ${cfg.border} transition-all`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Check className={`w-5 h-5 ${cfg.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${cfg.color}`}>{cfg.label}</p>
                        <p className="text-neutral-700 font-semibold mt-1">
                          Votre reste à charge estimé :{" "}
                          <span className={`text-xl font-black ${cfg.color}`}>{cfg.resteACharge}</span>
                        </p>
                        <p className="text-neutral-600 text-sm mt-1">{cfg.prime}</p>
                        <p className="text-neutral-600 text-sm mt-2">{cfg.desc}</p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <PhoneCallTracker className={`inline-flex items-center justify-center gap-2 ${
                            simResult === "bleu" ? "bg-blue-600 hover:bg-blue-700" :
                            simResult === "jaune" ? "bg-yellow-600 hover:bg-yellow-700" :
                            simResult === "violet" ? "bg-purple-600 hover:bg-purple-700" :
                            "bg-pink-600 hover:bg-pink-700"
                          } text-white font-bold py-3 px-6 rounded-xl transition-all text-sm`}>
                            <Phone className="w-4 h-4" />
                            Confirmer avec un expert
                          </PhoneCallTracker>
                          <a href="#devis" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold py-3 px-6 rounded-xl border border-neutral-200 transition-all text-sm">
                            Devis détaillé gratuit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            <p className="text-xs text-neutral-400 text-center mt-6">
              *Estimation indicative. Le montant exact dépend du devis, de la zone climatique et de votre situation.
              Calcul personnalisé gratuit après visite technique.
            </p>
          </div>
        </div>
      </section>

      {/* ── HEAT LOSS ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Par où s&apos;échappe votre chauffage ?
            </h2>
            <p className="text-neutral-600 text-lg">
              Une maison mal isolée perd sa chaleur par 4 zones principales
            </p>
          </div>
          <div ref={heatRef} className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 shadow-lg space-y-7">
            {[
              { label: "Toiture & combles", pct: 30, sub: "Priorité n°1 — la chaleur monte. Amortissement 3 à 5 ans. Aides maximales." },
              { label: "Murs", pct: 25, sub: "Ponts thermiques, sensations de paroi froide. ITE ou ITI selon le bâti." },
              { label: "Fenêtres & ouvertures", pct: 15, sub: "Simple vitrage ou menuiseries vieillissantes. Double ou triple vitrage recommandé." },
              { label: "Planchers bas", pct: 10, sub: "Cave, vide sanitaire ou garage non chauffé. Souvent oublié mais crucial pour le confort." },
            ].map((z) => (
              <HeatBar key={z.label} {...z} trigger={heatVisible} />
            ))}
            <div className="pt-4 border-t border-neutral-100 flex items-start gap-3 text-sm text-neutral-600">
              <Info className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Conseil :</strong> Isoler la toiture est toujours le premier chantier recommandé.
                C&apos;est le plus rentable, amorti en 3 à 5 ans, et celui qui bénéficie des{" "}
                <strong>aides les plus élevées</strong> (MaPrimeRénov' + CEE bonifiée).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TYPES ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Quel type d&apos;isolation pour votre logement ?
            </h2>
            <p className="text-neutral-600 text-lg">Chaque zone a ses caractéristiques et ses aides spécifiques</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-neutral-100 rounded-2xl p-1.5 gap-1 flex-wrap justify-center">
              {(Object.keys(TYPES) as TypeKey[]).map((key) => {
                const t = TYPES[key]
                const active = activeType === key
                return (
                  <button key={key} onClick={() => setActiveType(key)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                      active ? "bg-green-700 text-white shadow-lg shadow-green-700/20" : "text-neutral-600 hover:text-neutral-900 hover:bg-white"
                    }`}>
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl ring-1 ring-neutral-100 shadow-xl p-8 max-w-2xl mx-auto">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">{currentType.title}</h3>
                <p className="text-neutral-500 text-sm">{currentType.subtitle}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full flex-shrink-0">
                <Award className="w-4 h-4" />{currentType.badge}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Coût", value: currentType.price, icon: Euro },
                { label: "Économies", value: currentType.savings + "/an", icon: TrendingDown },
                { label: "Performance", value: currentType.r, icon: Zap },
                { label: "Durée pose", value: currentType.duration, icon: Clock },
              ].map((s) => (
                <div key={s.label} className="bg-neutral-50 rounded-2xl p-4 text-center">
                  <s.icon className="w-4 h-4 text-green-700 mx-auto mb-2" />
                  <div className="text-xs font-bold text-neutral-900 leading-tight">{s.value}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-green-800 mb-3 text-xs uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Avantages
                </h4>
                <ul className="space-y-2">
                  {currentType.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-neutral-500 mb-3 text-xs uppercase tracking-wide">À considérer</h4>
                <ul className="space-y-2 mb-4">
                  {currentType.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-neutral-500">
                      <span className="flex-shrink-0">–</span>{c}
                    </li>
                  ))}
                </ul>
                <div className="p-3 bg-amber-50 rounded-xl">
                  <p className="text-xs text-amber-800 font-medium">{currentType.note}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PhoneCallTracker className="flex-1 inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-all text-sm">
                <Phone className="w-4 h-4" /> Appeler un expert
              </PhoneCallTracker>
              <a href="#devis" className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold py-3.5 rounded-xl transition-all text-sm">
                Devis gratuit <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── AIDES ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              4 aides cumulables en 2026
            </h2>
            <p className="text-neutral-600 text-lg">MaPrimeRénov&apos; est rouvert depuis le 23 février 2026</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: "MaPrimeRénov'", amount: "25€/m²", note: "Catégorie Bleu — combles perdus · RGE obligatoire", icon: Award, highlight: true },
              { name: "Prime CEE bonifiée", amount: "10,54€/m²", note: "« Grands Précaires » — combles · gérée par Greenter", icon: Zap, highlight: false },
              { name: "Éco-PTZ", amount: "50 000€", note: "Prêt à taux zéro · 20 ans · sans condition de revenus", icon: Euro, highlight: false },
              { name: "TVA réduite", amount: "5,5%", note: "Automatique avec artisan RGE (vs 20%)", icon: Shield, highlight: false },
            ].map((a) => (
              <div key={a.name} className={`bg-white rounded-2xl p-6 ring-1 transition-all text-center ${
                a.highlight ? "ring-green-300 shadow-lg shadow-green-700/10" : "ring-neutral-100 hover:ring-green-200 hover:shadow-lg"
              }`}>
                {a.highlight && (
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Aide principale
                  </div>
                )}
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <a.icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{a.name}</h3>
                <div className="text-2xl font-black text-green-700 mb-2">{a.amount}</div>
                <p className="text-neutral-500 text-xs leading-relaxed">{a.note}</p>
              </div>
            ))}
          </div>

          {/* Simulation */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 text-center mb-8">
              Simulation concrète — 100m² de combles, famille 3 personnes, catégorie Bleu
            </h3>
            <div className="bg-white rounded-3xl p-8 ring-1 ring-neutral-100 shadow-xl">
              <div className="space-y-3">
                {[
                  { label: "Devis TTC (TVA 5,5%)", value: "2 400€", plus: false },
                  { label: "− MaPrimeRénov' Bleu (25€/m²)", value: "− 2 500€", plus: true },
                  { label: "− Prime CEE bonifiée (10,54€/m²)", value: "− 1 054€", plus: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="text-neutral-700 text-sm sm:text-base">{row.label}</span>
                    <span className={`font-bold text-lg ${row.plus ? "text-green-700" : "text-neutral-900"}`}>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-4 bg-green-50 rounded-2xl px-4">
                  <span className="font-bold text-neutral-900 text-lg">Votre reste à charge</span>
                  <div className="text-right">
                    <span className="font-black text-green-700 text-4xl">1€*</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-400 text-xs mt-4 text-center">
                *Source : Greenter sur base MaPrimeRénov' + CEE 2026. Simulation indicative — le montant exact est calculé lors de la visite technique gratuite.
              </p>
            </div>
            <div className="text-center mt-8">
              <a href="#devis" className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-green-700/20 hover:shadow-xl hover:-translate-y-0.5">
                Calculer mon reste à charge <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              5 étapes, zéro tracas administratif
            </h2>
            <p className="text-neutral-600 text-lg">On s&apos;occupe de tout — de l&apos;éligibilité aux dossiers d&apos;aides</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { n: 1, icon: Phone, title: "Test d'éligibilité", duration: "2 min · GRATUIT", desc: "Au téléphone : on évalue votre catégorie MaPrimeRénov' et calcule immédiatement vos aides estimées." },
              { n: 2, icon: Home, title: "Visite technique", duration: "45 min · GRATUIT", desc: "Mesures précises, contrôle de la charpente, repérage des points singuliers. Aucune surprise lors des travaux." },
              { n: 3, icon: Euro, title: "Devis & dossiers", duration: "48–72h", desc: "Devis détaillé + on dépose nous-mêmes les dossiers MaPrimeRénov' et CEE. Aucune démarche de votre côté." },
              { n: 4, icon: Zap, title: "Chantier isolation", duration: "Selon surface", desc: "Protection du logement, pose aux normes R ≥ 7 m².K/W, contrôle qualité sur site. Travaux propres et rapides." },
              { n: 5, icon: TrendingDown, title: "Économies immédiates", duration: "2–6 semaines", desc: "Finalisation des dossiers d'aides. Vous ne payez que le reste à charge — aucune avance de trésorerie." },
            ].map((step) => (
              <div key={step.n} className="relative bg-white rounded-2xl p-6 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-xl transition-all group text-center">
                <span className="absolute top-3 right-4 text-5xl font-black text-neutral-100 select-none group-hover:text-green-50 transition-colors">
                  {step.n}
                </span>
                <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-green-700/20 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                  <Clock className="w-3 h-3" /> {step.duration}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Quel isolant choisir ?
            </h2>
            <p className="text-neutral-600">Tous certifiés ACERMI — obligatoire pour accéder aux aides</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Laine de verre soufflée", type: "Minéral", badge: "Meilleur rapport qualité/prix",
                lambda: "0,032–0,040 W/m.K", thick: "280–300 mm",
                pros: ["Économique", "Incombustible (classe A1)", "Pose rapide par soufflage", "Durée de vie 50 ans"],
                ideal: "Combles perdus · grandes surfaces", color: "blue",
              },
              {
                name: "Ouate de cellulose", type: "Biosourcé", badge: "Choix éco-responsable",
                lambda: "0,038–0,042 W/m.K", thick: "280–300 mm",
                pros: ["Fabriqué à partir de papier recyclé", "Excellent confort d'été", "Bilan carbone négatif", "Matériau perspirant"],
                ideal: "Combles perdus · profils éco", color: "green",
              },
              {
                name: "Fibre de bois", type: "Biosourcé", badge: "Confort d'été optimal",
                lambda: "0,037–0,045 W/m.K", thick: "290–320 mm",
                pros: ["Déphasage thermique exceptionnel", "Régule l'humidité naturellement", "Acoustique renforcée", "Matériau renouvelable"],
                ideal: "Rampants · toitures · confort été", color: "amber",
              },
            ].map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-6 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all">
                <div className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                  m.color === "blue" ? "bg-blue-100 text-blue-700" :
                  m.color === "green" ? "bg-green-100 text-green-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {m.badge}
                </div>
                <h3 className="font-bold text-neutral-900 text-lg mb-1">{m.name}</h3>
                <p className="text-neutral-500 text-xs mb-4">{m.type}</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-neutral-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-500">Lambda (λ)</p>
                    <p className="font-bold text-neutral-900 text-xs mt-1">{m.lambda}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-500">Épaisseur R=7</p>
                    <p className="font-bold text-neutral-900 text-xs mt-1">{m.thick}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {m.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />{p}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-50 rounded-xl px-3 py-2">
                  <p className="text-xs font-semibold text-green-800">Idéal pour : <span className="font-normal">{m.ideal}</span></p>
                </div>
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
            <p className="text-neutral-500 text-sm mt-2">Vérifiables sur france-renov.gouv.fr — obligatoires pour toutes les aides</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            {[
              { src: "/certifications/rge.webp", alt: "Certification RGE" },
              { src: "/certifications/qualibat.jpg", alt: "Qualibat" },
              { src: "/certifications/qualipac.jpg", alt: "QualiPAC" },
              { src: "/certifications/qualipv.png", alt: "QualiPV" },
            ].map((c) => (
              <div key={c.alt} className="bg-white rounded-2xl p-4 ring-1 ring-neutral-200 hover:ring-green-300 hover:shadow-md transition-all">
                <Image src={c.src} alt={c.alt} width={120} height={70} className="h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-4">
            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">
              <strong>Attention aux arnaques :</strong> Le démarchage téléphonique pour la rénovation énergétique est{" "}
              <strong>interdit depuis 2020</strong>. Méfiez-vous des offres « 100% gratuites sans étude ».
              Vérifiez toujours la certification RGE sur france-renov.gouv.fr avant de signer.
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
              { name: "Nathalie B.", city: "Roissy-en-Brie", text: "Combles isolés en une journée. L'équipe Greenter a géré tous les dossiers MaPrimeRénov' et CEE. Je n'ai rien eu à faire et n'ai payé que 1€ !" },
              { name: "Julien T.", city: "Pontault-Combault", text: "Très sérieux du début à la fin. Visite technique gratuite, devis transparent, travaux propres. Facture de chauffage en baisse dès le premier mois." },
              { name: "Claudine M.", city: "Ozoir-la-Ferrière", text: "Gain de confort immédiat et facture réduite de 32%. L'équipe a tout géré administrativement. Je recommande sans hésiter." },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 ring-1 ring-neutral-100 hover:ring-green-200 hover:shadow-lg transition-all">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Questions fréquentes</h2>
            <p className="text-neutral-600">Tout ce que vous devez savoir sur l&apos;isolation en 2026</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white rounded-2xl ring-1 overflow-hidden transition-all ${
                faqOpen === i ? "ring-green-300 shadow-md" : "ring-neutral-100"
              }`}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-neutral-50 transition-colors">
                  <span className="font-semibold text-neutral-900 text-sm sm:text-base">{faq.q}</span>
                  {faqOpen === i
                    ? <ChevronUp className="w-5 h-5 text-green-700 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  }
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6 border-t border-neutral-100">
                    <p className="pt-4 text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
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
            Places limitées — Visite technique sous 48h
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            Prêt à isoler votre logement ?
          </h2>
          <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
            Visite technique gratuite, devis sans engagement sous 48h.
            On gère toute l&apos;administration — vous ne payez que le reste à charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <PhoneCallTracker className="inline-flex items-center justify-center gap-3 bg-white text-green-900 hover:bg-green-50 font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]">
              <Phone className="w-5 h-5" /> Appeler maintenant
            </PhoneCallTracker>
            <a href="#devis" className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all">
              Devis gratuit en ligne <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-green-300 text-sm">
            {["✓ Visite gratuite", "✓ Devis sous 48h", "✓ Dossiers gérés par nos soins", "✓ Aucune avance de trésorerie"].map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ──────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-sm border-t border-neutral-200 shadow-2xl px-4 py-3">
        <div className="flex gap-3 max-w-sm mx-auto">
          <PhoneCallTracker className="flex-1 flex items-center justify-center gap-2 bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all">
            <Phone className="w-4 h-4" /> Appeler
          </PhoneCallTracker>
          <a href="#devis" className="flex-1 flex items-center justify-center gap-2 bg-teal-600 active:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all">
            Devis gratuit <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden />
    </div>
  )
}
