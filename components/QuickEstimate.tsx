"use client"

import { useState } from "react"
import Link from "next/link"
import { Fan, Sun, Shield, FileSearch, ArrowRight, TrendingDown, Banknote, Info, Tag } from "lucide-react"

type ProjectId = "pac" | "solaire" | "isolation" | "audit"

interface Project {
  id: ProjectId
  icon: typeof Fan
  label: string
  teaser: string
  savings: string
  aide: string
  savingsLabel: string
  aideLabel: string
  costBefore: string
  costAfter: string
  detail: string
  href: string
}

const PROJECTS: Project[] = [
  {
    id: "pac",
    icon: Fan,
    label: "Pompe à chaleur",
    teaser: "−70% sur le chauffage",
    savings: "1 200 – 2 400€",
    aide: "jusqu'à 15 000€",
    savingsLabel: "économisés par an sur le chauffage",
    aideLabel: "via MaPrimeRénov' + CEE cumulables",
    costBefore: "10 000 – 18 000€",
    costAfter: "3 000 – 8 000€",
    detail:
      "Remplace votre chaudière gaz ou fioul. Chauffage et rafraîchissement inclus. Retour sur investissement généralement atteint en 7 à 10 ans selon votre profil.",
    href: "/services/pompe-a-chaleur",
  },
  {
    id: "solaire",
    icon: Sun,
    label: "Panneaux solaires",
    teaser: "−70% sur l'électricité",
    savings: "800 – 1 500€",
    aide: "jusqu'à 3 100€",
    savingsLabel: "économisés par an sur votre électricité",
    aideLabel: "prime à l'autoconsommation photovoltaïque",
    costBefore: "7 000 – 12 000€",
    costAfter: "6 000 – 11 000€",
    detail:
      "Produisez votre propre électricité et revendez le surplus à EDF OA. Garantie panneaux 25 ans. Rentable en 8 à 10 ans selon votre consommation.",
    href: "/services/panneaux-solaires",
  },
  {
    id: "isolation",
    icon: Shield,
    label: "Isolation thermique",
    teaser: "−30% sur l'énergie",
    savings: "400 – 900€",
    aide: "jusqu'à 75%",
    savingsLabel: "économisés par an sur le chauffage",
    aideLabel: "des travaux pris en charge (MaPrimeRénov' + CEE)",
    costBefore: "3 000 – 6 000€",
    costAfter: "750 – 2 500€",
    detail:
      "Isolation des combles, murs et planchers. Confort thermique garanti hiver comme été. Solution souvent la plus rentable pour les logements énergivores.",
    href: "/services/isolation",
  },
  {
    id: "audit",
    icon: FileSearch,
    label: "Audit énergétique",
    teaser: "Premier pas essentiel",
    savings: "Éco-PTZ",
    aide: "Obligatoire F/G",
    savingsLabel: "financement à taux 0 disponible",
    aideLabel: "pour la vente de passoires thermiques",
    costBefore: "500 – 1 500€",
    costAfter: "0 – 500€",
    detail:
      "Diagnostic complet de votre logement + plan d'action chiffré. Obligatoire pour la vente de biens classés F ou G. Prérequis pour les rénovations globales.",
    href: "/services/audit",
  },
]

export function QuickEstimate() {
  const [selected, setSelected] = useState<ProjectId | null>(null)
  const project = PROJECTS.find((p) => p.id === selected) ?? null

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white"
      aria-labelledby="estimate-title"
    >
      <div className="container mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Estimez vos économies
          </span>
          <h2
            id="estimate-title"
            className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3"
          >
            Quel est votre projet ?
          </h2>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Sélectionnez un projet pour découvrir vos économies potentielles et les aides disponibles en 2026.
          </p>
        </div>

        {/* Project selector cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {PROJECTS.map((p) => {
            const Icon = p.icon
            const isSelected = selected === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelected(isSelected ? null : p.id)}
                aria-pressed={isSelected}
                className={`relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer group ${
                  isSelected
                    ? "border-green-500 bg-green-50 shadow-lg shadow-green-100"
                    : "border-neutral-200 bg-white hover:border-green-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-200 ${
                    isSelected
                      ? "bg-green-600 shadow-lg shadow-green-200"
                      : "bg-green-100 group-hover:bg-green-200"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${isSelected ? "text-white" : "text-green-700"}`}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  className={`font-heading font-bold text-sm sm:text-base mb-2 leading-tight ${
                    isSelected ? "text-green-700" : "text-neutral-900"
                  }`}
                >
                  {p.label}
                </h3>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "bg-green-50 text-green-700 group-hover:bg-green-100"
                  }`}
                >
                  {p.teaser}
                </span>

                {isSelected && (
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Result panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            project ? "max-h-[800px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {project && (
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-green-200 p-6 md:p-8 animate-fade-slide-up">

              {/* Price anchor — top banner */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-neutral-400 shrink-0" aria-hidden="true" />
                  <span className="text-sm text-neutral-500">Coût avant aides&nbsp;:</span>
                  <span className="text-base font-semibold text-neutral-400 line-through">{project.costBefore}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-neutral-200" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-700 font-semibold">Votre coût réel estimé&nbsp;:</span>
                  <span className="text-xl font-heading font-bold text-green-600">{project.costAfter}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">

                {/* Savings */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingDown className="w-6 h-6 text-teal-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                      Économies estimées
                    </div>
                    <div className="font-heading text-2xl font-bold text-teal-600">
                      {project.savings}
                    </div>
                    <div className="text-sm text-neutral-500 mt-0.5">{project.savingsLabel}</div>
                  </div>
                </div>

                {/* Aide */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Banknote className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                      Aide disponible
                    </div>
                    <div className="font-heading text-2xl font-bold text-green-600">
                      {project.aide}
                    </div>
                    <div className="text-sm text-neutral-500 mt-0.5">{project.aideLabel}</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="btn-primary justify-center text-sm px-5 py-3"
                  >
                    Obtenir mon devis gratuit
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={project.href}
                    className="inline-flex items-center justify-center gap-1.5 text-sm text-green-700 font-semibold hover:text-teal-600 transition-colors"
                  >
                    En savoir plus
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Detail line */}
              <div className="pt-5 border-t border-neutral-100">
                <p className="text-sm text-neutral-600 leading-relaxed">{project.detail}</p>
                <p className="text-xs text-neutral-400 mt-2">
                  * Estimations indicatives basées sur un logement moyen. Votre devis personnalisé précisera les économies et aides réelles selon votre situation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Urgency note */}
        <div className="mt-8 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 max-w-2xl mx-auto">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            <strong>Les aides MaPrimeRénov' 2026 sont conditionnées aux crédits disponibles.</strong>
            {" "}Déposez votre dossier maintenant pour bénéficier des montants actuels avant toute révision.
          </p>
        </div>

      </div>
    </section>
  )
}
