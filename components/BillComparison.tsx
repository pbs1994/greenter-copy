import { ArrowRight, Zap, TrendingDown } from "lucide-react"
import Link from "next/link"

// Simulation : logement 100 m² (DPE D), chauffage électrique (convecteurs) → PAC air-eau
//
// AVANT — convecteurs (COP = 1) :
//   Chauffage : ~8 000 kWh/an × 0,25 €  = 1 992 €/an  → 166 €/mois
//   ECS (cumulus électrique) : ~1 200 kWh/an × 0,25 € = 300 €/an → 25 €/mois
//   Appareils / éclairage : ~1 800 kWh/an × 0,25 € = 456 €/an → 38 €/mois
//   Total : 229 €/mois
//
// APRÈS — PAC air-eau (SCOP 3,0) :
//   Chauffage PAC : 8 000 / 3,0 = 2 667 kWh × 0,25 € = 667 €/an → 56 €/mois
//   ECS (PAC thermodynamique) : 1 200 / 2,5 = 480 kWh × 0,25 € = 120 €/an → 10 €/mois
//   Appareils / éclairage : inchangé → 38 €/mois
//   Total : 104 €/mois
//
// Économie : 125 €/mois  → −55 %

const BEFORE = { monthly: 229, annual: 2_748, label: "Facture actuelle" }
const AFTER  = { monthly: 104, annual: 1_248, label: "Après rénovation" }
const SAVING = BEFORE.annual - AFTER.annual

function BillCard({
  data,
  variant,
}: {
  data: typeof BEFORE
  variant: "before" | "after"
}) {
  const isBefore = variant === "before"
  return (
    <div
      className={`relative rounded-2xl p-6 border-2 ${
        isBefore
          ? "bg-red-50 border-red-200"
          : "bg-green-50 border-green-300 shadow-lg shadow-green-100"
      }`}
    >
      <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${isBefore ? "text-red-400" : "text-green-600"}`}>
        {data.label}
      </div>

      <div className={`text-xs font-medium mb-3 pb-3 border-b ${isBefore ? "border-red-200 text-red-400" : "border-green-200 text-green-600"}`}>
        Facture d'énergie — Logement 100 m²
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>{isBefore ? "Chauffage (convecteurs)" : "Pompe à chaleur"}</span>
          <span>{isBefore ? "166 €" : "56 €"}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Eau chaude sanitaire</span>
          <span>{isBefore ? "25 €" : "10 €"}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Appareils &amp; éclairage</span>
          <span>38 €</span>
        </div>
      </div>

      <div className={`flex justify-between items-baseline pt-3 border-t-2 font-bold ${isBefore ? "border-red-200" : "border-green-300"}`}>
        <span className="text-sm text-neutral-700">Total / mois</span>
        <span className={`text-3xl font-heading ${isBefore ? "text-red-500" : "text-green-600"}`}>
          {data.monthly} €
        </span>
      </div>

      <div className={`text-xs mt-1 text-right ${isBefore ? "text-red-400" : "text-green-500"}`}>
        soit {data.annual.toLocaleString("fr-FR")} €/an
      </div>

      {!isBefore && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          −55% sur la facture
        </div>
      )}
    </div>
  )
}

export function BillComparison() {
  return (
    <section className="py-14 md:py-20 bg-white" aria-labelledby="bill-comparison-title">
      <div className="container mx-auto max-w-5xl px-4">

        <div className="text-center mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Impact concret
          </span>
          <h2
            id="bill-comparison-title"
            className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3"
          >
            Ce que ça change sur votre facture
          </h2>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto">
            Simulation pour un logement de 100 m² chauffé aux convecteurs électriques, après installation d'une pompe à chaleur air-eau (SCOP 3,0).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-10">
          <div className="w-full sm:flex-1">
            <BillCard data={BEFORE} variant="before" />
          </div>

          <div className="flex sm:flex-col items-center gap-2 shrink-0">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-white hidden sm:block" aria-hidden="true" />
              <TrendingDown className="w-5 h-5 text-white sm:hidden" aria-hidden="true" />
            </div>
          </div>

          <div className="w-full sm:flex-1 mt-3 sm:mt-0">
            <BillCard data={AFTER} variant="after" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-green-200" aria-hidden="true" />
            <span className="text-xl font-heading font-bold">
              {SAVING.toLocaleString("fr-FR")} € économisés chaque année
            </span>
          </div>
          <p className="text-green-100 text-sm mb-5">
            Retour sur investissement généralement atteint en 5 à 8 ans — puis ce sont des économies pures.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
            Calculer mes économies réelles
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="text-xs text-neutral-400 text-center mt-4">
          * Simulation basée sur 8 000 kWh/an de chauffage (DPE D, 100 m²), tarif électricité 0,25 €/kWh, SCOP PAC 3,0. Résultats variables selon le logement et le profil de consommation.
        </p>
      </div>
    </section>
  )
}
