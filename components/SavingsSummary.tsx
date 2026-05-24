"use client"

import { useBatteryCalculatorContext } from "@/lib/useBatteryCalculator"

export function SavingsSummary() {
  const { results } = useBatteryCalculatorContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 p-3 sm:p-4 bg-gradient-to-r from-neutral-50 to-green-50/50 rounded-xl border border-neutral-200">
      <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center gap-2 p-2 sm:p-3 sm:text-center">
        <p className="text-xs text-neutral-500">💸 Surplus revendu EDF</p>
        <p className="text-base sm:text-lg font-bold text-neutral-600">{results.economieSansBatterie}€<span className="text-xs font-normal">/an</span></p>
      </div>
      <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center gap-2 p-2 sm:p-3 sm:text-center border-y sm:border-y-0 sm:border-x border-neutral-200">
        <p className="text-xs text-neutral-500">🔋 Surplus stocké</p>
        <p className="text-base sm:text-lg font-bold text-green-600">{results.economieAvecBatterie.toLocaleString('fr-FR')}€<span className="text-xs font-normal">/an</span></p>
      </div>
      <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center gap-2 p-2 sm:p-3 sm:text-center">
        <p className="text-xs text-neutral-500">✨ Gain direct</p>
        <p className="text-base sm:text-lg font-bold text-teal-600">+{results.gainBatterie}€<span className="text-xs font-normal">/an</span></p>
      </div>
    </div>
  )
}
