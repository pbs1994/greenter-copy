// =============================================================================
// WhyGreenterSection - Section différenciateurs Greenter
// =============================================================================
// Requirements: 3.1, 3.2, 3.4, 6.2, 6.3, 6.4

import { MapPin, FileCheck, PhoneOff, Users, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

interface WhyGreenterSectionProps {
  /** Classes CSS additionnelles */
  className?: string
}

interface Differentiator {
  icon: LucideIcon
  title: string
  description: string
  highlight?: boolean
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

const differentiators: Differentiator[] = [
  {
    icon: MapPin,
    title: "Proximité locale",
    description: "Basé à Ozoir-la-Ferrière, intervention sous 48h en Seine-et-Marne.",
    highlight: true,
  },
  {
    icon: FileCheck,
    title: "Accompagnement aides",
    description: "On s'occupe de vos dossiers MaPrimeRénov' et CEE.",
  },
  {
    icon: PhoneOff,
    title: "Pas de démarchage",
    description: "Vous nous contactez, jamais l'inverse. Conformité loi 2020.",
  },
  {
    icon: Users,
    title: "Équipe locale",
    description: "Techniciens salariés, pas de sous-traitance.",
  },
]

// -----------------------------------------------------------------------------
// WhyGreenterSection - Composant principal
// -----------------------------------------------------------------------------

export default function WhyGreenterSection({ className }: WhyGreenterSectionProps) {
  return (
    <section
      className={cn("py-12 md:py-16 bg-neutral-50", className)}
      aria-labelledby="why-greenter-title"
    >
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Nos engagements
          </span>
          <h2
            id="why-greenter-title"
            className="font-heading text-2xl md:text-3xl font-bold text-neutral-900"
          >
            Pourquoi choisir Greenter ?
          </h2>
        </div>

        {/* Grid des différenciateurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item) => (
            <DifferentiatorCard key={item.title} differentiator={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// DifferentiatorCard - Carte individuelle
// -----------------------------------------------------------------------------

function DifferentiatorCard({ differentiator }: { differentiator: Differentiator }) {
  const Icon = differentiator.icon

  return (
    <div
      className={cn(
        "group flex flex-col items-center text-center p-6 rounded-2xl bg-white",
        "ring-1 ring-green-200 hover:ring-green-400 transition-all duration-300",
        "hover:shadow-lg",
        differentiator.highlight && "ring-2 ring-green-500"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-4",
          "bg-green-100 group-hover:bg-green-200 transition-colors",
          differentiator.highlight && "bg-green-200"
        )}
      >
        <Icon
          className={cn(
            "w-7 h-7 text-green-600",
            differentiator.highlight && "text-green-700"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
        {differentiator.title}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 text-sm leading-relaxed">
        {differentiator.description}
      </p>
    </div>
  )
}
