"use client"

import { useState, useMemo } from "react"
import { Sparkles, Info } from "lucide-react"

interface BatteryCalculatorProps {
  batteryPrice: number
}

const FEED_IN_TARIFF_SMALL = 0.04 // ≤9 kWc
const FEED_IN_TARIFF_MEDIUM = 0.0536 // 9-36 kWc

export function BatteryCalculator({ batteryPrice }: BatteryCalculatorProps) {
  const [kWc, setKWc] = useState(6)
  const [prixKwh, setPrixKwh] = useState(0.20)
  const [tauxSurplus, setTauxSurplus] = useState(60)

  const results = useMemo(() => {
    const production = kWc * 1100
    const surplus = production * (tauxSurplus / 100)
    const autoconso = production - surplus
    
    // Tarif selon la puissance
    const tarifRachat = kWc <= 9 ? FEED_IN_TARIFF_SMALL : FEED_IN_TARIFF_MEDIUM

    const revenuRevente = surplus * tarifRachat
    const economieSansBatterie = (autoconso * prixKwh) + revenuRevente

    const surplusStocke = surplus * 0.85
    const surplusPerdu = surplus * 0.15
    const economieAvecBatterie = (autoconso * prixKwh) + (surplusStocke * prixKwh) + (surplusPerdu * tarifRachat)

    const gainBatterie = economieAvecBatterie - economieSansBatterie
    const amortissement = batteryPrice / gainBatterie

    return {
      surplus: Math.round(surplus),
      economieSansBatterie: Math.round(economieSansBatterie),
      economieAvecBatterie: Math.round(economieAvecBatterie),
      gainBatterie: Math.round(gainBatterie),
      amortissement: Math.round(amortissement * 10) / 10,
      surplusStocke: Math.round(surplusStocke),
      tarifRachat,
    }
  }, [kWc, prixKwh, tauxSurplus, batteryPrice])

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur économies batterie solaire",
    "description": "Simulez vos économies en stockant votre surplus solaire plutôt qu'en le revendant à EDF OA.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  }

  return (
    <section aria-labelledby="calculator-title" itemScope itemType="https://schema.org/WebApplication">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      
      <div className="rounded-2xl bg-white border border-green-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-sm">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 id="calculator-title" itemProp="name" className="font-heading text-lg font-semibold text-green-900">
                Calculateur économies batterie solaire
              </h2>
              <p itemProp="description" className="text-sm text-green-700/70">
                Revendre à {kWc <= 9 ? '0.04' : '0.05'}€ ou stocker ? Comparez vos gains.
              </p>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="px-6 py-5 space-y-5">
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="slider-kwc" className="text-sm font-medium text-neutral-700">Puissance</label>
                <output className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">{kWc} kWc</output>
              </div>
              <input
                id="slider-kwc" type="range" min="3" max="12" step="1" value={kWc}
                onChange={(e) => setKWc(Number(e.target.value))}
                className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="slider-prix" className="text-sm font-medium text-neutral-700">Prix élec.</label>
                <output className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">{prixKwh.toFixed(2)} €</output>
              </div>
              <input
                id="slider-prix" type="range" min="0.15" max="0.30" step="0.01" value={prixKwh}
                onChange={(e) => setPrixKwh(Number(e.target.value))}
                className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="slider-surplus" className="text-sm font-medium text-neutral-700">Surplus</label>
                <output className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">{tauxSurplus}%</output>
              </div>
              <input
                id="slider-surplus" type="range" min="40" max="80" step="5" value={tauxSurplus}
                onChange={(e) => setTauxSurplus(Number(e.target.value))}
                className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-green-50/50 rounded-lg border border-green-100">
            <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-green-800/70">
              <strong className="text-green-800">Surplus</strong> = énergie non consommée sur le moment. Sans batterie → revendue à {kWc <= 9 ? '0.04' : '0.05'}€. Avec batterie → stockée pour le soir.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="px-6 pb-6">
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Sans batterie</p>
              <p className="text-xs text-neutral-500 mt-1">{results.surplus.toLocaleString()} kWh × {kWc <= 9 ? '0.04' : '0.05'}€</p>
              <p className="text-2xl font-bold text-neutral-700 mt-2">{results.economieSansBatterie} €<span className="text-sm font-normal text-neutral-400">/an</span></p>
            </div>

            <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Avec batterie</p>
              <p className="text-xs text-green-600 mt-1">{results.surplusStocke.toLocaleString()} kWh × {prixKwh.toFixed(2)}€</p>
              <p className="text-2xl font-bold text-green-700 mt-2">{results.economieAvecBatterie} €<span className="text-sm font-normal text-green-600">/an</span></p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-teal-600 text-white">
            <div>
              <p className="text-sm text-teal-100">Vous gagnez</p>
              <p className="text-2xl font-bold">+{results.gainBatterie} €<span className="text-sm font-normal opacity-80">/an</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-teal-100">Rentabilisée en</p>
              <p className="text-2xl font-bold">{results.amortissement} ans</p>
            </div>
          </div>

          <p className="text-[10px] text-neutral-400 text-center mt-4">
            Estimation : 1100 kWh/kWc/an · Tarif rachat 2026 : 0.04€ (≤9kWc) / 0.05€ (9-36kWc) · 85% surplus récupérable
          </p>
        </div>
      </div>
    </section>
  )
}
