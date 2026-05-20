"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Fan, Droplets, Mountain, Zap, Phone, ArrowRight, Check, CheckCircle, Euro, Shield, Leaf, AlertTriangle } from "lucide-react"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import { CITIES } from "@/lib/local-seo-data"

const PHONE = "06 09 45 50 56"

const PAC_TYPES = [
  {
    icon: Fan,
    color: "blue",
    badge: "Entrée de gamme",
    name: "Air / Air",
    tagline: "Chauffage + climatisation réversible",
    priceFrom: "1 500€",
    cop: "3 – 5",
    savings: "50 – 70%",
    idealFor: "Appartements & maisons sans chauffage central",
    pros: ["Installation rapide (1 jour)", "Climatisation incluse en été", "Prix d'entrée accessible"],
    cons: ["Sans eau chaude sanitaire", "Moins adapté aux grandes surfaces"],
  },
  {
    icon: Droplets,
    color: "emerald",
    badge: "Le plus populaire",
    name: "Air / Eau",
    tagline: "Remplace la chaudière intégralement",
    priceFrom: "5 000€",
    cop: "3 – 4,5",
    savings: "50 – 70%",
    idealFor: "Maisons avec chauffage central existant",
    pros: ["Eau chaude sanitaire incluse", "Compatible vos radiateurs", "MaPrimeRénov' maximale"],
    cons: ["Installation 1 à 2 jours", "Investissement plus élevé"],
  },
  {
    icon: Mountain,
    color: "teal",
    badge: "Meilleur rendement",
    name: "Géothermique",
    tagline: "Énergie du sol, COP record",
    priceFrom: "15 000€",
    cop: "4 – 6",
    savings: "70 – 80%",
    idealFor: "Grandes maisons avec terrain disponible",
    pros: ["Rendement stable même par -20°C", "Durée de vie 25 ans", "Indépendant de la météo"],
    cons: ["Forage ou tranchée nécessaire", "Budget initial élevé"],
  },
  {
    icon: Zap,
    color: "amber",
    badge: "Transition douce",
    name: "Hybride",
    tagline: "PAC + chaudière gaz de secours",
    priceFrom: "6 000€",
    cop: "3 – 4",
    savings: "30 – 50%",
    idealFor: "Maisons mal isolées ou régions très froides",
    pros: ["Transition progressive", "Sécurité par grand froid", "Coût initial maîtrisé"],
    cons: ["Toujours dépendant du gaz", "Économies moins importantes"],
  },
]

const PALETTE: Record<string, { tab: string; badge: string; icon: string; check: string; border: string; bg: string }> = {
  blue:    { tab: "border-blue-500 text-blue-600",    badge: "bg-blue-100 text-blue-700",    icon: "bg-blue-100 text-blue-600",    check: "text-blue-500",   border: "border-blue-200",  bg: "bg-blue-50" },
  emerald: { tab: "border-emerald-500 text-emerald-600", badge: "bg-emerald-100 text-emerald-700", icon: "bg-emerald-100 text-emerald-600", check: "text-emerald-500", border: "border-emerald-200", bg: "bg-emerald-50" },
  teal:    { tab: "border-teal-500 text-teal-600",    badge: "bg-teal-100 text-teal-700",    icon: "bg-teal-100 text-teal-600",    check: "text-teal-500",   border: "border-teal-200",  bg: "bg-teal-50" },
  amber:   { tab: "border-amber-500 text-amber-600",  badge: "bg-amber-100 text-amber-700",  icon: "bg-amber-100 text-amber-600",  check: "text-amber-500",  border: "border-amber-200", bg: "bg-amber-50" },
}

const AIDS = [
  {
    color: "emerald",
    name: "MaPrimeRénov'",
    amount: "Jusqu'à 5 000€",
    detail: "Ménages modestes & très modestes",
    conditions: ["Logement > 15 ans", "Artisan certifié RGE", "Résidence principale"],
    badge: "Rouverte le 23/02/2026",
  },
  {
    color: "blue",
    name: "Éco-PTZ",
    amount: "Jusqu'à 50 000€",
    detail: "Prêt à taux zéro — tous revenus",
    conditions: ["Sans condition de revenus", "Logement > 2 ans", "Remboursable sur 20 ans"],
    badge: "Cumulable",
  },
  {
    color: "teal",
    name: "Certificats d'Économies d'Énergie",
    amount: "Jusqu'à 4 000€",
    detail: "Prime versée par votre fournisseur d'énergie",
    conditions: ["Cumulable avec MaPrimeRénov'", "Artisan RGE obligatoire", "Logement > 2 ans"],
    badge: "Cumulable",
  },
  {
    color: "amber",
    name: "TVA réduite",
    amount: "5,5 %",
    detail: "Au lieu de 20% — automatique",
    conditions: ["Logement > 2 ans", "Artisan RGE", "Résidence principale ou secondaire"],
    badge: "Automatique",
  },
]

const AID_PALETTE: Record<string, { border: string; amount: string; badge: string; bg: string; check: string }> = {
  emerald: { border: "border-t-emerald-500", amount: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", bg: "bg-emerald-50", check: "text-emerald-500" },
  blue:    { border: "border-t-blue-500",    amount: "text-blue-600",    badge: "bg-blue-100 text-blue-700",       bg: "bg-blue-50",    check: "text-blue-500" },
  teal:    { border: "border-t-teal-500",    amount: "text-teal-600",    badge: "bg-teal-100 text-teal-700",       bg: "bg-teal-50",    check: "text-teal-500" },
  amber:   { border: "border-t-amber-500",   amount: "text-amber-600",   badge: "bg-amber-100 text-amber-700",     bg: "bg-amber-50",   check: "text-amber-500" },
}

const STEPS = [
  { n: "01", icon: "🔍", title: "Visite technique", duration: "Gratuite", desc: "Diagnostic thermique de votre logement, dimensionnement et étude personnalisée." },
  { n: "02", icon: "📋", title: "Devis & dossier aides", duration: "Sous 48h", desc: "Devis transparent, dossier MaPrimeRénov' et CEE montés par notre équipe." },
  { n: "03", icon: "🔧", title: "Installation", duration: "1 à 2 jours", desc: "Pose par nos techniciens certifiés RGE. Pas de mauvaise surprise." },
  { n: "04", icon: "✅", title: "Mise en service", duration: "J+1", desc: "Réglage, formation à votre nouvelle installation. Garantie 10 ans." },
]

const FAQS = [
  { q: "Quel est le prix d'une pompe à chaleur en 2026 ?", a: "Le prix varie selon le type : PAC air/air à partir de 1 500€/unité, PAC air/eau entre 5 000€ et 15 000€, PAC géothermique entre 15 000€ et 25 000€. Ces prix sont avant aides (MaPrimeRénov', CEE, TVA 5,5%) qui peuvent réduire significativement le reste à charge. Un devis précis est établi après visite technique gratuite." },
  { q: "Quelles économies puis-je réaliser ?", a: "Une pompe à chaleur permet de réduire votre facture de chauffage de 50 à 70%. Pour 1 kWh d'électricité consommé, une PAC produit 3 à 5 kWh de chaleur — l'énergie supplémentaire est captée gratuitement dans l'air extérieur." },
  { q: "Une PAC fonctionne-t-elle par grand froid ?", a: "Oui. Les PAC modernes fonctionnent jusqu'à -15°C voire -20°C (géothermique). En Seine-et-Marne, les températures descendent rarement sous -10°C : votre PAC sera parfaitement efficace tout l'hiver." },
  { q: "Quelles sont les aides disponibles en 2026 ?", a: "MaPrimeRénov' est rouvert depuis le 23 février 2026. Un ménage modeste peut recevoir jusqu'à 5 000€ pour une PAC air/eau. L'Éco-PTZ permet de financer jusqu'à 50 000€ à taux zéro. CEE et TVA 5,5% sont cumulables. Condition obligatoire : artisan certifié RGE." },
  { q: "Combien de temps dure l'installation ?", a: "1 à 2 jours pour la pose. Avant cela : visite technique gratuite, devis sous 48h, dossier aides. Nous gérons toutes les démarches administratives pour les aides de l'État." },
  { q: "Faut-il un entretien régulier ?", a: "Un entretien annuel est recommandé (obligatoire pour les PAC > 2 kg de fluide). Il comprend : vérification du fluide, nettoyage des filtres, contrôle des performances. Coût moyen : 150 à 200€/an. Nous proposons des contrats de maintenance." },
]

export function PACEditorialContent() {
  const [activeType, setActiveType] = useState(1)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const type = PAC_TYPES[activeType]
  const pal = PALETTE[type.color]
  const Icon = type.icon

  return (
    <div className="bg-white">

      {/* ── METRICS STRIP ── */}
      <section className="bg-green-900 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {[
              { val: "×3 à 5", label: "kWh de chaleur produits", sub: "pour 1 kWh consommé" },
              { val: "−70%", label: "sur la facture chauffage", sub: "économies annuelles moyennes" },
              { val: "15−20", label: "ans de durée de vie", sub: "avec entretien annuel" },
              { val: "5 000€", label: "d'aides MaPrimeRénov'", sub: "pour les ménages modestes" },
            ].map((m) => (
              <div key={m.val} className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-green-300">{m.val}</p>
                <p className="text-white font-semibold text-sm">{m.label}</p>
                <p className="text-green-300/70 text-xs">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAC TYPES — TAB INTERFACE ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">Comparatif</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Quel type de PAC vous convient ?</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">4 technologies, chacune adaptée à une situation. Sélectionnez votre profil.</p>
          </div>

          {/* Tab selector */}
          <div className="flex gap-2 md:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {PAC_TYPES.map((t, i) => {
              const p = PALETTE[t.color]
              const Ti = t.icon
              const active = i === activeType
              return (
                <button
                  key={i}
                  onClick={() => setActiveType(i)}
                  className={`flex-none flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    active ? `${p.tab} bg-white border-current shadow-sm` : "border-neutral-200 text-neutral-500 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <Ti className="w-4 h-4" />
                  PAC {t.name}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div className={`rounded-2xl border-2 ${pal.border} ${pal.bg} overflow-hidden`}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left — main info */}
              <div className="p-7 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${pal.icon}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className={`inline-block text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1 ${pal.badge}`}>{type.badge}</span>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900">PAC {type.name}</h3>
                    <p className="text-neutral-500 text-sm">{type.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-7">
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-bold text-neutral-900 text-lg">à partir de</p>
                    <p className={`text-xl font-bold ${pal.check}`}>{type.priceFrom}</p>
                    <p className="text-xs text-neutral-400">avant aides</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="text-xs text-neutral-400 mb-1">COP</p>
                    <p className="text-xl font-bold text-neutral-900">{type.cop}</p>
                    <p className="text-xs text-neutral-400">rendement</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="text-xs text-neutral-400 mb-1">Économies</p>
                    <p className="text-xl font-bold text-green-600">{type.savings}</p>
                    <p className="text-xs text-neutral-400">sur chauffage</p>
                  </div>
                </div>

                <div className="bg-white/70 rounded-xl p-4">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">Idéal pour</p>
                  <p className="text-neutral-700 font-medium">{type.idealFor}</p>
                </div>
              </div>

              {/* Right — pros/cons */}
              <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-current/10 p-7 md:p-10 bg-white/50">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-400 mb-3">Points forts</p>
                    <ul className="space-y-2.5">
                      {type.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${pal.check}`} />
                          <span className="text-neutral-700 text-sm">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-400 mb-3">À savoir</p>
                    <ul className="space-y-2.5">
                      {type.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <span className="text-neutral-400 text-base leading-none mt-0.5 shrink-0">–</span>
                          <span className="text-neutral-500 text-sm">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <PhoneCallTracker
                    className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
                    showIcon={false}
                  >
                    <Phone className="w-4 h-4" />
                    Devis gratuit pour une PAC {type.name}
                  </PhoneCallTracker>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-neutral-400 mt-4">
            Incertain sur le type ? Notre visite technique gratuite détermine la solution optimale pour votre logement.
          </p>
        </div>
      </section>

      {/* ── AIDES 2026 ── */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">Financement</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Aides financières 2026 — cumulables
            </h2>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              MaPrimeRénov' rouverte depuis le 23 février 2026
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AIDS.map((aid) => {
              const p = AID_PALETTE[aid.color]
              return (
                <div key={aid.name} className={`bg-white rounded-2xl border-t-4 ${p.border} shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col`}>
                  <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full mb-4 ${p.badge}`}>{aid.badge}</span>
                  <p className="font-heading font-bold text-neutral-900 mb-1">{aid.name}</p>
                  <p className={`text-2xl font-bold mb-1 ${p.amount}`}>{aid.amount}</p>
                  <p className="text-neutral-500 text-xs mb-5">{aid.detail}</p>
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

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Sans artisan certifié RGE, pas d'aides !</strong> À partir de 2027, les logements classés DPE F ou G n'auront plus accès
              au parcours par geste — anticipez dès maintenant vos travaux.
            </p>
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">Processus</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">De la visite à la mise en service</h2>
            <p className="text-neutral-500">Nous gérons tout de A à Z — vous n'avancez rien.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-green-200" />

            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 pb-8 md:pb-0 relative">
                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden absolute left-1/2 bottom-0 w-0.5 h-8 bg-green-200" />
                )}
                <div className="relative z-10 w-20 h-20 bg-green-700 rounded-2xl flex flex-col items-center justify-center mb-5 shadow-lg shadow-green-700/20">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-green-300 text-xs font-bold">{step.n}</span>
                </div>
                <p className="font-bold text-neutral-900 mb-1">{step.title}</p>
                <p className="text-xs font-semibold text-green-600 mb-2 bg-green-50 px-2 py-0.5 rounded-full">{step.duration}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENVIRONMENTAL IMPACT ── */}
      <section className="py-16 bg-green-900">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">Un geste pour la planète</h2>
            <p className="text-green-200/70">En remplaçant votre chaudière fioul ou gaz par une PAC</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { val: "−70%", label: "d'émissions CO₂", sub: "vs chaudière gaz ou fioul", icon: Leaf },
              { val: "75%", label: "d'énergie gratuite", sub: "captée dans l'air extérieur", icon: Zap },
              { val: "3 à 5×", label: "plus efficace", sub: "qu'un chauffage électrique direct", icon: Euro },
            ].map((s) => {
              const Si = s.icon
              return (
                <div key={s.val} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Si className="w-6 h-6 text-green-300" />
                  </div>
                  <p className="text-4xl font-bold text-green-300 mb-1">{s.val}</p>
                  <p className="text-white font-semibold mb-1">{s.label}</p>
                  <p className="text-green-200/60 text-xs">{s.sub}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-green-200/60 text-sm">
              Combinez votre PAC avec des{" "}
              <Link href="/services/panneaux-solaires" className="text-green-300 hover:text-white underline underline-offset-2 transition-colors">
                panneaux solaires
              </Link>{" "}
              pour une maison 100% décarbonée.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">Questions fréquentes</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-green-600 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96" : "max-h-0"}`}>
                  <p className="px-5 pb-5 text-neutral-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONE D'INTERVENTION ── */}
      <section className="py-12 bg-white border-t border-neutral-100">
        <div className="container mx-auto max-w-5xl px-4">
          <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">Notre zone d'intervention</h3>
          <p className="text-neutral-500 text-sm mb-5">
            Basés à <strong>Ozoir-la-Ferrière</strong>, nous intervenons dans tout le{" "}
            <strong>77 Seine-et-Marne</strong> et les communes limitrophes d'Île-de-France.
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/services/pompe-a-chaleur/${city.slug}`}
                className="inline-block bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1 text-sm text-neutral-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-gradient-to-br from-green-700 to-teal-700">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Prêt à diviser votre facture par 3 ?</h2>
          <p className="text-green-100 text-lg mb-8">Visite technique gratuite · Devis sous 48h · Aides montées par notre équipe</p>
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
          <p className="text-green-200/60 text-xs mt-6">Sans engagement · Certification RGE vérifiable sur france-renov.gouv.fr</p>
        </div>
      </section>
    </div>
  )
}
