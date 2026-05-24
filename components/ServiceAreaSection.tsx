// =============================================================================
// Service Area Section - Server Component affichant la zone d'intervention
// =============================================================================
// Requirements: 7.1, 7.2, 7.3, 7.4, 7.5

import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { CITIES } from "@/lib/local-seo-data"
import { cn } from "@/lib/utils"

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

interface ServiceAreaSectionProps {
  /** Titre de la section (défaut: "Nous intervenons près de chez vous") */
  title?: string
  /** Afficher le CTA "Demander un devis" (défaut: true) */
  showCTA?: boolean
  /** Slug du service pour les liens vers les pages villes (ex: "pompe-a-chaleur") */
  serviceSlug?: string
  /** Classes CSS additionnelles */
  className?: string
}

// -----------------------------------------------------------------------------
// ServiceAreaSection - Composant principal (Server Component)
// -----------------------------------------------------------------------------

export default function ServiceAreaSection({
  title = "Nous intervenons près de chez vous",
  showCTA = true,
  serviceSlug,
  className,
}: ServiceAreaSectionProps) {
  return (
    <section
      className={cn(
        "py-12 px-4 sm:px-6 lg:px-8",
        className
      )}
      aria-labelledby="service-area-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <h2
          id="service-area-title"
          className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-8"
        >
          {title}
        </h2>

        {/* Grille des villes */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {CITIES.map((city) => (
            <li
              key={city.slug}
              className="flex items-center gap-2 text-neutral-700"
            >
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              {serviceSlug ? (
                <Link
                  href={`/services/${serviceSlug}/${city.slug}`}
                  className="text-sm sm:text-base hover:text-green-700 hover:underline transition-colors"
                >
                  {city.name}
                </Link>
              ) : (
                <span className="text-sm sm:text-base">{city.name}</span>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        {showCTA && (
          <div className="text-center">
            <Link
              href="/contact"
              className="btn-primary text-base px-8 py-3"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
