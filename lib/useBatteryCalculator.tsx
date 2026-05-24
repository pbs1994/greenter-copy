"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"

const FEED_IN_TARIFF_SMALL = 0.04
const FEED_IN_TARIFF_MEDIUM = 0.0536

interface CalculatorState {
  kWc: number
  prixKwh: number
  tauxSurplus: number
  setKWc: (v: number) => void
  setPrixKwh: (v: number) => void
  setTauxSurplus: (v: number) => void
  results: {
    surplus: number
    economieSansBatterie: number
    economieAvecBatterie: number
    gainBatterie: number
    amortissement: number
    surplusStocke: number
    tarifRachat: number
  }
  batteryPrice: number
}

const BatteryCalculatorContext = createContext<CalculatorState | null>(null)

export function useBatteryCalculatorContext() {
  const ctx = useContext(BatteryCalculatorContext)
  if (!ctx) throw new Error("useBatteryCalculatorContext must be used within BatteryCalculatorProvider")
  return ctx
}

interface ProviderProps {
  children: ReactNode
  batteryPrice: number
}

export function BatteryCalculatorProvider({ children, batteryPrice }: ProviderProps) {
  const [kWc, setKWc] = useState(6)
  const [prixKwh, setPrixKwh] = useState(0.20)
  const [tauxSurplus, setTauxSurplus] = useState(40)

  const results = useMemo(() => {
    const production = kWc * 1100
    const surplus = production * (tauxSurplus / 100)
    const autoconso = production - surplus
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

  return (
    <BatteryCalculatorContext.Provider value={{ kWc, prixKwh, tauxSurplus, setKWc, setPrixKwh, setTauxSurplus, results, batteryPrice }}>
      {children}
    </BatteryCalculatorContext.Provider>
  )
}
