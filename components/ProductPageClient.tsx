"use client"

import { ReactNode } from "react"
import { BatteryCalculatorProvider } from "@/lib/useBatteryCalculator"

interface Props {
  children: ReactNode
  batteryPrice: number
}

export function ProductPageClient({ children, batteryPrice }: Props) {
  return (
    <BatteryCalculatorProvider batteryPrice={batteryPrice}>
      {children}
    </BatteryCalculatorProvider>
  )
}
