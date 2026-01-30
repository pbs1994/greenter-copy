"use client"

import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import { Zap, Shield, TrendingUp } from "lucide-react"

const benefits = [
  { icon: Zap, text: "Autonomie le soir" },
  { icon: Shield, text: "Secours coupures" },
  { icon: TrendingUp, text: "Amorti en ~5 ans" },
]

export function BenefitsCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [AutoScroll({ speed: 0.5, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  return (
    <div className="overflow-hidden mb-4" ref={emblaRef}>
      <div className="flex">
        {[...benefits, ...benefits, ...benefits].map((benefit, index) => (
          <div key={index} className="flex-none px-3">
            <span className="flex items-center gap-2 text-neutral-700 whitespace-nowrap">
              <benefit.icon className="w-4 h-4 text-green-600" />
              <span className="text-sm">{benefit.text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
