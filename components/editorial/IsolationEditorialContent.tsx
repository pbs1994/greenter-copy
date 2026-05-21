"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Phone, ArrowRight, Check, CheckCircle, AlertTriangle, Home, Layers, Thermometer } from "lucide-react"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import { CITIES } from "@/lib/local-seo-data"
import { ISOLATION_FAQS } from "@/lib/isolation-editorial-data"

const PHONE = "07 66 97 50 99"

const CATEGORIES = [
  {
    color: "blue",
    name: "Bleu",
    label: "Très modestes",
    rfr1p: "≤ 24 031€",
    rfr2p: "≤ 35 270€",
    prime: "Jusqu'à 25€/m²",
    highlight: true,
    cta: "Reste à charge : 1€*",
  },
  {
    color: "yellow",
    name: "Jaune",
    label: "Modestes",
    rfr1p: "≤ 30 020€",
    rfr2p: "≤ 44 052€",
    prime: "Jusqu'à 20€/m²",
    highlight: false,
    cta: "Reste à charge réduit",
  },
  {
    color: "violet",
    name: "Violet",
    label: "Intermédiaires",
    rfr1p: "≤ 40 018€",
    rfr2p: "≤ 58 755€",
    prime: "Jusqu'à 15€/m²",
    highlight: false,
    cta: "Aide significative",
  },
  {
    color: "rose",
    name: "Rose",
    label: "Aisés",
    rfr1p: "> 40 018€",
    rfr2p: "> 58 755€",
    prime: "Jusqu'à 7€/m²",
    highlight: false,
    cta: "TVA 5,5% + CEE",
  },
]

const CAT_PALETTE: Record<string, { bg: string; border: string; badge: string; prime: string; text: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-300",   badge: "bg-blue-600 text-white",      prime: "text-blue-700",   text: "text-blue-900" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-300", badge: "bg-yellow-500 text-white",     prime: "text-yellow-700", text: "text-yellow-900" },
  violet: { bg: "bg-violet-50", border: "border-violet-300", badge: "bg-violet-600 text-white",     prime: "text-violet-700", text: "text-violet-900" },
  rose:   { bg: "bg-rose-50",   border: "border-rose-300",   badge: "bg-rose-500 text-white",       prime: "text-rose-700",   text: "text-rose-900" },
}

const WHAT_WE_INSULATE = [
  {
    icon: Home,
    title: "Combles perdus",
    pct: "25–30%",
    label: "des pertes de chaleur",
    economy: "450 – 700€/an",
    desc: "La priorité absolue. La chaleur monte — isoler les combles est le chantier le plus rentable.",
    badge: "Priorité n°1",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    icon: Layers,
    title: "Planchers bas",
    pct: "7–10%",
    label: "des pertes de chaleur",
    economy: "150 – 250€/an",
    desc: "Cave ou vide sanitaire : un froid qui remonte. Solution rapide et efficace pour le confort des pieds.",
    badge: "Souvent oublié",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    icon: Thermometer,
    title: "Rampants de toiture",
    pct: "20–25%",
    label: "des pertes de chaleur",
    economy: "350 – 550€/an",
    desc: "Combles aménagés ou aménageables. Fibre de bois recommandée pour le confort d'été.",
    badge: "Confort été++",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
]

const AIDS = [
  { name: "MaPrimeRénov'", amount: "jusqu'à 25€/m²", color: "emerald", detail: "Catégorie Bleu (très modestes)", conditions: ["Rouverte le 23/02/2026", "Artisan RGE obligatoire", "Résidence principale > 15 ans"] },
  { name: "Prime CEE bonifiée", amount: "jusqu'à 10,54€/m²", color: "blue", detail: "Ménages très modestes (combles)", conditions: ["Cumulable MaPrimeRénov'", "Versée par votre fournisseur", "Sans avance de trésorerie"] },
  { name: "Éco-PTZ", amount: "jusqu'à 50 000€", color: "teal", detail: "Prêt taux zéro — tous revenus", conditions: ["Sans condition de revenus", "Remboursable sur 20 ans", "Logement > 2 ans"] },
  { name: "TVA réduite", amount: "5,5%", color: "amber", detail: "Au lieu de 20% — automatique", conditions: ["Logement > 2 ans", "Artisan RGE", "Résidence principale ou secondaire"] },
]

const AID_PAL: Record<string, { border: string; amount: string; badge: string; check: string }> = {
  emerald: { border: "border-t-emerald-500", amount: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", check: "text-emerald-500" },
  blue:    { border: "border-t-blue-500",    amount: "text-blue-600",    badge: "bg-blue-100 text-blue-700",       check: "text-blue-500" },
  teal:    { border: "border-t-teal-500",    amount: "text-teal-600",    badge: "bg-teal-100 text-teal-700",       check: "text-teal-500" },
  amber:   { border: "border-t-amber-500",   amount: "text-amber-600",   badge: "bg-amber-100 text-amber-700",     check: "text-amber-500" },
}

const STEPS = [
  { n: "01", emoji: "📞", title: "Appel de 2 minutes", desc: "On vérifie votre éligibilité et votre catégorie MaPrimeRénov' immédiatement." },
  { n: "02", emoji: "🔍", title: "Visite technique gratuite", desc: "Mesure des combles, diagnostic thermique complet. Sous 48h sur votre secteur." },
  { n: "03", emoji: "📋", title: "Devis + dossier aides", desc: "Devis détaillé avec toutes les aides déduites. Nous montons le dossier à votre place." },
  { n: "04", emoji: "🔧", title: "Chantier", desc: "Isolation soufflée ou projetée par nos équipes certifiées. 1 à 2 jours selon la surface." },
  { n: "05", emoji: "✅", title: "Économies immédiates", desc: "Vous économisez dès le premier hiver. Jusqu'à 600€/an pour 100m² de combles." },
]

const MATERIALS = [
  { name: "Laine de verre soufflée", lambda: "λ ≈ 0,035 W/m.K", epaisseur: "300 mm", type: "Minéral", color: "blue", pros: ["Économique", "Installation rapide", "Très répandu (CEE validé)"], ideal: "Combles perdus par soufflage" },
  { name: "Ouate de cellulose", lambda: "λ ≈ 0,038 W/m.K", epaisseur: "320 mm", type: "Biosourcé", color: "emerald", pros: ["Bilan carbone négatif", "Régulation hygrométrique", "Confort acoustique"], ideal: "Combles perdus, militant écologie" },
  { name: "Laine de roche", lambda: "λ ≈ 0,040 W/m.K", epaisseur: "360 mm", type: "Minéral", color: "orange", pros: ["Résistance au feu A1", "Acoustique ++", "Imputrescible"], ideal: "Rampants, zones à risque incendie" },
  { name: "Fibre de bois", lambda: "λ ≈ 0,038 W/m.K", epaisseur: "320 mm", type: "Biosourcé", color: "amber", pros: ["Déphasage thermique 12h+", "Confort d'été remarquable", "Biosourcé ACERMI"], ideal: "Rampants de toiture pour le confort estival" },
]

const MAT_PAL: Record<string, { border: string; type: string; bg: string }> = {
  blue:    { border: "border-t-blue-400",    type: "bg-blue-100 text-blue-700",    bg: "bg-blue-50/30" },
  emerald: { border: "border-t-emerald-400", type: "bg-emerald-100 text-emerald-700", bg: "bg-emerald-50/30" },
  orange:  { border: "border-t-orange-400",  type: "bg-orange-100 text-orange-700",  bg: "bg-orange-50/30" },
  amber:   { border: "border-t-amber-400",   type: "bg-amber-100 text-amber-700",   bg: "bg-amber-50/30" },
}

export function IsolationEditorialContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-white">

      {/* ── COST BREAKDOWN HERO ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">Simulation réelle</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Combien allez-vous payer ?</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Exemple pour une famille de 3 personnes (catégorie Bleu), 100 m² de combles perdus en Île-de-France.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-neutral-100">
              {[
                { label: "Devis TTC (TVA 5,5%)", value: "2 400€", sub: "24€/m² × 100m², fourniture + pose", color: "", minus: false },
                { label: "MaPrimeRénov' Bleu", value: "− 2 500€", sub: "25€/m² × 100m²", color: "text-emerald-600", minus: true },
                { label: "Prime CEE bonifiée", value: "− 1 054€", sub: "10,54€/m² × 100m²", color: "text-blue-600", minus: true },
              ].map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-6 py-4 ${i < 2 ? "border-b border-neutral-100" : ""}`}>
                  <div>
                    <p className="font-semibold text-neutral-800">{row.label}</p>
                    <p className="text-xs text-neutral-400">{row.sub}</p>
                  </div>
                  <p className={`text-xl font-bold ${row.minus ? row.color : "text-neutral-900"}`}>{row.value}</p>
                </div>
              ))}
              <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-sky-600 to-sky-700">
                <div>
                  <p className="font-bold text-white text-lg">Reste à charge</p>
                  <p className="text-sky-200 text-sm">Vous ne payez que ça</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-white">1€*</p>
                  <p className="text-sky-200 text-xs">catégorie Bleu</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { val: "600€", label: "économisés/an", sub: "dès le premier hiver" },
                { val: "3–5 ans", label: "retour invest.", sub: "catégories Jaune/Violet" },
                { val: "2 t", label: "CO₂ évitées", sub: "par an — maison type" },
              ].map((s) => (
                <div key={s.val} className="bg-sky-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-sky-700">{s.val}</p>
                  <p className="text-xs font-semibold text-sky-600">{s.label}</p>
                  <p className="text-xs text-sky-400">{s.sub}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-neutral-400 mt-4 italic">
              *Simulation indicative. Montants dépendant de votre situation réelle. Reste à charge de 1€ pour catégorie Bleu (très modestes) — varie selon catégorie Anah.
            </p>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY CATEGORIES ── */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">Éligibilité</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Dans quelle catégorie êtes-vous ?</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Votre montant d'aide dépend de votre revenu fiscal de référence et du nombre de personnes au foyer (plafonds Île-de-France 2026).</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const p = CAT_PALETTE[cat.color]
              return (
                <div key={cat.name} className={`rounded-2xl border-2 ${p.border} ${p.bg} p-5 relative ${cat.highlight ? "ring-2 ring-offset-2 ring-sky-400" : ""}`}>
                  {cat.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-xs font-bold px-3 py-0.5 rounded-full">Le plus aidé</span>
                  )}
                  <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${p.badge}`}>Catégorie {cat.name}</div>
                  <p className="font-bold text-neutral-900 mb-0.5">{cat.label}</p>
                  <div className="space-y-1.5 mb-4 text-sm text-neutral-500">
                    <div className="flex justify-between">
                      <span>1 personne</span>
                      <span className="font-semibold text-neutral-700">{cat.rfr1p}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 personnes</span>
                      <span className="font-semibold text-neutral-700">{cat.rfr2p}</span>
                    </div>
                  </div>
                  <div className="border-t border-current/10 pt-3">
                    <p className="text-xs text-neutral-500 mb-0.5">Prime MaPrimeRénov' combles</p>
                    <p className={`font-bold text-lg ${p.prime}`}>{cat.prime}</p>
                  </div>
                  <div className="mt-3 bg-white/70 rounded-lg px-3 py-1.5 text-center">
                    <p className="text-xs font-semibold text-neutral-600">{cat.cta}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>À partir de 2027</strong>, les logements classés DPE F ou G n'auront plus accès au parcours par geste. Anticipez dès maintenant. Appelez-nous pour vérifier votre catégorie en 2 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INSULATE ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">Travaux</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Par où s'échappe votre chauffage ?</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Priorisez les zones les plus rentables selon le volume de déperdition thermique.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {WHAT_WE_INSULATE.map((zone) => {
              const ZIcon = zone.icon
              return (
                <div key={zone.title} className="bg-gradient-to-b from-sky-50 to-white rounded-2xl p-6 ring-1 ring-sky-100 hover:ring-sky-300 hover:shadow-lg transition-all group">
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-4 ${zone.badgeColor}`}>{zone.badge}</span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                      <ZIcon className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-neutral-900">{zone.title}</h3>
                  </div>
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-white rounded-xl p-3 text-center shadow-sm">
                      <p className="text-2xl font-bold text-red-500">{zone.pct}</p>
                      <p className="text-xs text-neutral-400">{zone.label}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-3 text-center shadow-sm">
                      <p className="text-lg font-bold text-emerald-600">{zone.economy}</p>
                      <p className="text-xs text-neutral-400">économies/an</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{zone.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AIDS ── */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">Financement</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">4 aides cumulables en 2026</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Ensemble, ces dispositifs couvrent la quasi-totalité du coût pour les ménages modestes.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AIDS.map((aid) => {
              const p = AID_PAL[aid.color]
              return (
                <div key={aid.name} className={`bg-white rounded-2xl border-t-4 ${p.border} shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col`}>
                  <p className="font-heading font-bold text-neutral-900 mb-1">{aid.name}</p>
                  <p className={`text-2xl font-bold mb-1 ${p.amount}`}>{aid.amount}</p>
                  <p className="text-neutral-400 text-xs mb-4">{aid.detail}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {aid.conditions.map((c) => (
                      <li key={c} className="flex items-start gap-1.5 text-xs text-neutral-600">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${p.check}`} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">Notre méthode</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">5 étapes, zéro tracas</h2>
            <p className="text-neutral-500">Nous gérons toutes les démarches — vous n'avancez aucune trésorerie.</p>
          </div>

          <div className="relative">
            {/* Vertical connector on desktop */}
            <div className="hidden md:block absolute left-[calc(2.5rem-1px)] top-10 bottom-10 w-0.5 bg-sky-100" />

            <div className="space-y-4">
              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-5 items-start group">
                  <div className="w-20 h-20 shrink-0 bg-sky-700 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-sky-700/20 relative z-10 group-hover:bg-sky-800 transition-colors">
                    <span className="text-2xl">{step.emoji}</span>
                    <span className="text-sky-300 text-xs font-bold">{step.n}</span>
                  </div>
                  <div className="flex-1 bg-neutral-50 rounded-2xl p-5 hover:bg-sky-50 transition-colors">
                    <h3 className="font-bold text-neutral-900 mb-1">{step.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <PhoneCallTracker
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-[1.02]"
              showIcon={false}
            >
              <Phone className="w-5 h-5" />
              Démarrer — c'est gratuit
            </PhoneCallTracker>
          </div>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">Matériaux</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Quel isolant choisir ?</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Tous certifiés ACERMI — obligatoire pour bénéficier des aides. Atteinte de R = 7 m².K/W garantie.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MATERIALS.map((mat) => {
              const p = MAT_PAL[mat.color]
              return (
                <div key={mat.name} className={`bg-white rounded-2xl border-t-4 ${p.border} p-5 hover:shadow-md transition-shadow`}>
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${p.type}`}>{mat.type}</span>
                  <h3 className="font-bold text-neutral-900 mb-1">{mat.name}</h3>
                  <p className="text-xs text-neutral-400 mb-3">{mat.lambda} · {mat.epaisseur} pour R=7</p>
                  <ul className="space-y-1.5 mb-4">
                    {mat.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-1.5 text-xs text-neutral-600">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-neutral-400 italic">Idéal : {mat.ideal}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sky-700 font-semibold text-sm uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">Questions fréquentes</h2>
          </div>
          <div className="space-y-3">
            {ISOLATION_FAQS.map((faq, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-sky-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[32rem]" : "max-h-0"}`}>
                  <p className="px-5 pb-5 text-neutral-600 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE ZONE ── */}
      <section className="py-12 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto max-w-5xl px-4">
          <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">Notre zone d'intervention</h3>
          <p className="text-neutral-500 text-sm mb-5">
            Basés à <strong>Ozoir-la-Ferrière</strong>, nous isolons dans tout le{" "}
            <strong>77 Seine-et-Marne</strong> et les communes limitrophes.
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/services/isolation/${city.slug}`}
                className="inline-block bg-white border border-neutral-200 rounded-full px-3 py-1 text-sm text-neutral-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Testez votre éligibilité à l'isolation à 1€*
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            En 2 minutes au téléphone, on calcule votre reste à charge exact et on planifie la visite technique. Sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneCallTracker
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-[1.02]"
              showIcon={false}
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </PhoneCallTracker>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white text-white font-bold px-8 py-4 rounded-full transition-all"
            >
              Formulaire de contact
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-sky-200/60 text-xs mt-6">
            *Reste à charge de 1€ pour catégorie Bleu (très modestes). Sans avance de trésorerie. Devis détaillé après visite technique.
          </p>
        </div>
      </section>
    </div>
  )
}
