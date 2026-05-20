"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, CheckCircle, Sun, Zap, TrendingUp, Shield, Phone, ChevronDown, Euro, Battery, BarChart3 } from "lucide-react"
import ServiceAreaSection from "@/components/ServiceAreaSection"

const CURRENT_YEAR = new Date().getFullYear()

const SOLUTIONS = [
  {
    id: "autocons",
    icon: Zap,
    color: "amber",
    label: "Autoconsommation",
    tagline: "Consommez ce que vous produisez",
    description: "Vos panneaux alimentent directement vos appareils en journée. Simple, immédiat, rentable. Le surplus part au réseau (4 cts/kWh).",
    pros: ["Installation la plus simple", "Économies immédiates sur la facture", "Prime autoconsommation 80€/kWc"],
    cons: ["Surplus peu rémunéré (4 cts/kWh)", "Taux d'autoconso limité à ~30%"],
    roi: "8–10 ans",
    savings: "30–50%",
  },
  {
    id: "batterie",
    icon: Battery,
    color: "green",
    label: "Avec batterie",
    tagline: "Stockez pour le soir — solution star 2026",
    description: "Stockez le surplus de la journée pour l'utiliser le soir. Passez de 30% à 80% d'autoconsommation. La solution la plus rentable depuis mars 2025.",
    pros: ["80% d'autoconsommation", "Autonomie soir et week-end", "Protection coupures réseau"],
    cons: ["Investissement initial plus élevé", "Remplacement batterie vers 10–15 ans"],
    roi: "7–9 ans",
    savings: "50–70%",
    recommended: true,
  },
  {
    id: "revente",
    icon: Euro,
    color: "slate",
    label: "Revente totale",
    tagline: "100% des kWh revendus à EDF OA",
    description: "Vous revendez toute votre production à EDF au tarif réglementé. Attention : 4 cts/kWh depuis mars 2025 — rentabilité fortement réduite.",
    pros: ["Revenu garanti 20 ans", "Contrat EDF OA sécurisé", "Pas de batterie requise"],
    cons: ["Tarif réduit à 4 cts/kWh (anciennement 12,69)", "Rentabilité faible vs autoconsommation"],
    roi: "12–15 ans",
    savings: "15–25%",
  },
]

const SOL_PAL: Record<string, { border: string; badge: string; icon: string; check: string; tab: string }> = {
  amber: { border: "border-amber-300", badge: "bg-amber-100 text-amber-700", icon: "bg-amber-100 text-amber-600", check: "text-amber-500", tab: "border-amber-500 text-amber-600 bg-white" },
  green: { border: "border-emerald-300", badge: "bg-emerald-100 text-emerald-700", icon: "bg-emerald-100 text-emerald-600", check: "text-emerald-500", tab: "border-emerald-500 text-emerald-600 bg-white" },
  slate: { border: "border-slate-300", badge: "bg-slate-100 text-slate-700", icon: "bg-slate-100 text-slate-600", check: "text-slate-500", tab: "border-slate-500 text-slate-600 bg-white" },
}

const STEPS = [
  { n: "01", emoji: "📐", title: "Étude de faisabilité", duration: "Gratuite", desc: "Analyse de votre toiture, orientation, ombrage et consommation électrique réelle." },
  { n: "02", emoji: "☀️", title: "Simulation personnalisée", duration: "Sous 48h", desc: "Dimensionnement optimal et simulation de production. Toutes les aides déduites." },
  { n: "03", emoji: "🔧", title: "Installation QualiPV", duration: "1 à 3 jours", desc: "Pose par nos équipes certifiées. Démarches Enedis et Consuel prises en charge." },
  { n: "04", emoji: "⚡", title: "Vous produisez !", duration: "J+1", desc: "Mise en service et raccordement réseau. Formation à votre tableau de bord de suivi." },
]

const FAQS = [
  { q: "Les panneaux solaires sont-ils rentables en France ?", a: "Oui, même en Île-de-France. L'ensoleillement est suffisant pour une rentabilité en 7 à 10 ans avec batterie. Les panneaux ont une durée de vie de 25 à 30 ans, ce qui représente 15 à 20 ans d'électricité quasi-gratuite après amortissement." },
  { q: `Revente ou stockage batterie en ${CURRENT_YEAR} ?`, a: "Avec le tarif de rachat à 4 cts/kWh (contre 12,69 avant mars 2025), la revente n'est plus aussi intéressante. La batterie est devenue la solution la plus rentable : vous consommez votre propre électricité valorisée à ~25 cts/kWh au lieu de la revendre à 4 cts." },
  { q: "Quelle puissance installer pour ma maison ?", a: "Pour une maison de 100m² avec 4 personnes, nous recommandons généralement 6 kWc (16 panneaux). Notre étude gratuite détermine le dimensionnement optimal selon votre consommation réelle et votre toiture." },
  { q: `Quelles aides en ${CURRENT_YEAR} ?`, a: "Prime à l'autoconsommation de 80€/kWc (soit 480€ pour 6kWc) + TVA réduite à 10%. La prime a baissé (anciennement 160–220€/kWc). Le plus rentable reste de maximiser l'autoconsommation avec batterie." },
  { q: "Faut-il une autorisation en mairie ?", a: "Oui, une déclaration préalable de travaux est obligatoire. Nous nous chargeons de toutes les démarches : mairie, Enedis, EDF OA, Consuel. Vous n'avez rien à faire." },
]

const BRANDS = [
  { name: "SunPower", logo: "/partners/sunpower.svg" },
  { name: "Enphase", logo: "/partners/enphase.svg" },
  { name: "LG", logo: "/partners/lg.svg" },
  { name: "Panasonic", logo: "/partners/panasonic.svg" },
]

export default function PanneauxSolairesPage() {
  const [activeSolution, setActiveSolution] = useState(1)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const sol = SOLUTIONS[activeSolution]
  const pal = SOL_PAL[sol.color]
  const SolIcon = sol.icon

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-full blur-2xl" />

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Sun className="w-4 h-4" />
                Certifié RGE QualiPV
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-5">
                Panneaux solaires :<br />
                <span className="text-amber-600">produisez</span> votre<br />
                propre électricité
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                Installation photovoltaïque partout en France. Jusqu'à 70% d'économies sur votre facture. Autoconsommation ou stockage batterie — nous vous conseillons la meilleure option.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Jusqu'à 70% d'économies",
                  "Prime autoconsommation",
                  "Garantie 25 ans panneaux",
                  "Démarches incluses",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-lg">
                  Étude gratuite de ma toiture
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33609455056" className="inline-flex items-center justify-center gap-2 border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-bold px-8 py-4 rounded-full transition-colors">
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/solaire.jpg"
                  alt="Installation panneaux solaires par Greenter"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <p className="text-3xl font-bold text-amber-600">−70%</p>
                <p className="text-xs text-neutral-500">sur votre facture</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <p className="text-3xl font-bold text-green-600">25 ans</p>
                <p className="text-xs text-neutral-500">de garantie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-10 bg-green-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "30–70%", label: "d'économies sur votre facture" },
              { val: "7–10 ans", label: "retour sur investissement" },
              { val: "25–30 ans", label: "durée de vie des panneaux" },
              { val: "0,04€", label: `tarif rachat kWh ${CURRENT_YEAR}`, warn: true },
            ].map((s) => (
              <div key={s.val}>
                <p className={`text-2xl md:text-3xl font-bold ${s.warn ? "text-amber-400" : "text-white"}`}>{s.val}</p>
                <p className="text-green-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS — TAB INTERFACE ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">Nos solutions</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Autoconsommation ou revente : quel choix ?</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Depuis mars 2025, le tarif de rachat est passé à 4 cts/kWh. Le stockage batterie est devenu la solution la plus rentable.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide justify-center">
            {SOLUTIONS.map((s, i) => {
              const p = SOL_PAL[s.color]
              const Si = s.icon
              const active = i === activeSolution
              return (
                <button
                  key={i}
                  onClick={() => setActiveSolution(i)}
                  className={`flex-none flex items-center gap-2 px-5 py-3 rounded-full border-2 font-semibold transition-all text-sm whitespace-nowrap ${
                    active ? `${p.tab} border-current shadow-sm` : "border-neutral-200 text-neutral-500 bg-white hover:border-neutral-300"
                  }`}
                >
                  <Si className="w-4 h-4" />
                  {s.label}
                  {s.recommended && <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">⭐</span>}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div className={`rounded-3xl border-2 ${pal.border} overflow-hidden bg-neutral-50`}>
            <div className="grid lg:grid-cols-2">
              {/* Left */}
              <div className="p-8 md:p-10 bg-white">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pal.icon}`}>
                    <SolIcon className="w-7 h-7" />
                  </div>
                  <div>
                    {sol.recommended && (
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mb-1">Recommandé {CURRENT_YEAR}</span>
                    )}
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">{sol.label}</h3>
                    <p className="text-neutral-500 text-sm">{sol.tagline}</p>
                  </div>
                </div>

                <p className="text-neutral-600 leading-relaxed mb-6 text-sm">{sol.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-neutral-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-400 mb-1">Retour invest.</p>
                    <p className="text-xl font-bold text-neutral-900">{sol.roi}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-400 mb-1">Économies</p>
                    <p className="text-xl font-bold text-green-600">{sol.savings}</p>
                  </div>
                </div>

                <Link href="/contact" className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                  Étude gratuite — solution {sol.label}
                </Link>
              </div>

              {/* Right — pros/cons */}
              <div className="p-8 md:p-10">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-400 mb-3">Avantages</p>
                    <ul className="space-y-2.5">
                      {sol.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${pal.check}`} />
                          <span className="text-neutral-700 text-sm">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-400 mb-3">À considérer</p>
                    <ul className="space-y-2.5">
                      {sol.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <span className="text-neutral-400 text-base leading-none mt-0.5 shrink-0">–</span>
                          <span className="text-neutral-500 text-sm">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {activeSolution === 1 && (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                      <strong>Notre batterie KSTAR 6 kW</strong> — autonomie renforcée, installation en 1 jour, 10 ans de garantie.{" "}
                      <Link href="/produits/batterie-solaire-kstar-6kw" className="font-bold underline underline-offset-2 hover:text-green-900">
                        Découvrir →
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI VISUAL ── */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — example calculation */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-5">
                <h3 className="font-heading text-xl font-bold text-white">Exemple de rentabilité {CURRENT_YEAR}</h3>
                <p className="text-amber-100 text-sm">Installation 6 kWc + batterie KSTAR — 16 panneaux</p>
              </div>
              <div className="p-6">
                {[
                  { label: "Panneaux 6 kWc (installation)", value: "12 500€", color: "" },
                  { label: "Batterie KSTAR 6 kW", value: "2 500€", color: "" },
                  { label: "Prime autoconsommation (80€/kWc)", value: "− 480€", color: "text-green-600" },
                  { label: "Coût net", value: "14 520€", color: "font-bold" },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center py-3 ${i < 3 ? "border-b border-neutral-100" : ""}`}>
                    <span className={`text-neutral-600 text-sm ${row.color.includes("bold") ? "font-semibold" : ""}`}>{row.label}</span>
                    <span className={`font-semibold ${row.color || "text-neutral-900"}`}>{row.value}</span>
                  </div>
                ))}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">~1 800€</p>
                    <p className="text-xs text-green-600">économies/an</p>
                    <p className="text-xs text-neutral-400 mt-1">80% autoconso</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-700">~8 ans</p>
                    <p className="text-xs text-amber-600">retour invest.</p>
                    <p className="text-xs text-neutral-400 mt-1">puis 15 ans gratuit</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 mt-4 text-center">*8 000 kWh/an, tarif élec. 0,25€/kWh, ensoleillement moyen France.</p>
              </div>
            </div>

            {/* Right — key points */}
            <div>
              <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">Rentabilité {CURRENT_YEAR}</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Stockez plutôt que revendre
              </h2>

              <div className="space-y-5">
                {[
                  { icon: Battery, title: "Autoconsommation ×2,5", desc: "Passez de 30% à 80% d'autoconsommation avec une batterie. Vous consommez à 25 cts/kWh au lieu de revendre à 4 cts." },
                  { icon: TrendingUp, title: "Protection contre la hausse des prix", desc: "Votre électricité solaire reste gratuite pendant 25+ ans, pendant que les tarifs réseau continuent d'augmenter." },
                  { icon: Shield, title: "Autonomie lors des coupures", desc: "Avec batterie, vous continuez à avoir du courant même pendant les pannes réseau." },
                ].map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                        <ItemIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 mb-1">{item.title}</h4>
                        <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/produits/batterie-solaire-kstar-6kw"
                className="inline-flex items-center gap-2 mt-8 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-full transition-colors"
              >
                Voir notre batterie solaire KSTAR
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">Votre projet solaire</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">De l'étude à la production en 4 étapes</h2>
            <p className="text-neutral-500">Nous gérons toutes les démarches administratives — mairie, Enedis, EDF OA, Consuel.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-amber-200" />
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 pb-8 md:pb-0 relative">
                {i < STEPS.length - 1 && <div className="md:hidden absolute left-1/2 bottom-0 w-0.5 h-8 bg-amber-200" />}
                <div className="relative z-10 w-20 h-20 bg-amber-500 rounded-2xl flex flex-col items-center justify-center mb-5 shadow-lg shadow-amber-500/20">
                  <span className="text-2xl">{step.emoji}</span>
                  <span className="text-amber-100 text-xs font-bold">{step.n}</span>
                </div>
                <p className="font-bold text-neutral-900 mb-1">{step.title}</p>
                <p className="text-xs font-semibold text-amber-600 mb-2 bg-amber-50 px-2 py-0.5 rounded-full">{step.duration}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-center text-neutral-400 text-sm mb-8">Nous installons des panneaux et onduleurs premium</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="h-10 w-32 relative grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">Tout savoir sur le solaire</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96" : "max-h-0"}`}>
                  <p className="px-5 pb-5 text-neutral-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Sun className="w-14 h-14 text-white/80 mx-auto mb-5" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Passez à l'énergie solaire</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Étude de faisabilité gratuite et sans engagement. Découvrez le potentiel solaire de votre toiture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors shadow-lg">
              Demander mon étude gratuite
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33609455056" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" />
              06 09 45 50 56
            </a>
          </div>
        </div>
      </section>

      {/* ── CROSS-SERVICES ── */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h3 className="font-heading text-xl font-bold text-neutral-900 text-center mb-8">Optimisez votre installation</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: "/services/pompe-a-chaleur", icon: Zap, title: "Pompe à chaleur", sub: "Alimentée par vos panneaux" },
              { href: "/services/isolation", icon: Shield, title: "Isolation thermique", sub: "Réduisez vos besoins" },
              { href: "/services/audit", icon: BarChart3, title: "Audit énergétique", sub: "Optimisez votre projet" },
            ].map((s) => {
              const Si = s.icon
              return (
                <Link key={s.href} href={s.href} className="flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Si className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">{s.title}</p>
                    <p className="text-sm text-neutral-500">{s.sub}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <ServiceAreaSection serviceSlug="panneaux-solaires" title="Installation solaire près de chez vous" className="bg-white" />
    </main>
  )
}
