// =============================================================================
// Google Rating Badge Client - Version client du badge de note Google
// =============================================================================
// Wrapper client pour GoogleRatingBadge, utilisable dans les pages "use client"
// Récupère les données via /api/google-reviews au lieu de fetchGoogleReviews serveur

"use client"

import { useEffect, useState } from "react"
import { StarRating } from "@/components/GoogleRatingBadge"
import type { GoogleReviewsResponse } from "@/lib/google-places"
import { GOOGLE_MAPS_URL } from "@/lib/local-seo-data"

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

interface GoogleRatingBadgeClientProps {
  className?: string
}

// -----------------------------------------------------------------------------
// Google Logo SVG inline
// -----------------------------------------------------------------------------

function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-label="Google"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  )
}

// -----------------------------------------------------------------------------
// GoogleRatingBadgeClient - Composant principal (Client Component)
// -----------------------------------------------------------------------------

export default function GoogleRatingBadgeClient({
  className = "",
}: GoogleRatingBadgeClientProps) {
  const [data, setData] = useState<GoogleReviewsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadRating() {
      try {
        const response = await fetch("/api/google-reviews")
        if (!response.ok) throw new Error("Erreur lors du chargement de la note")
        const reviewsData: GoogleReviewsResponse = await response.json()
        setData(reviewsData)
      } catch (error) {
        console.error("[GoogleRatingBadgeClient] Erreur:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRating()
  }, [])

  // Skeleton pendant le chargement
  if (isLoading) {
    return (
      <div
        className={`inline-flex items-center gap-3 px-5 py-3 bg-white border border-neutral-200 rounded-xl shadow-sm animate-pulse ${className}`}
      >
        <div className="w-6 h-6 bg-neutral-200 rounded" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-24 bg-neutral-200 rounded" />
          <div className="h-3 w-16 bg-neutral-200 rounded" />
        </div>
      </div>
    )
  }

  // Ne rien afficher si pas de données
  if (!data) return null

  return (
    <a
      href={data.googleMapsUrl || GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-3 px-5 py-3
        bg-white border border-neutral-200 rounded-xl shadow-sm
        transition-all duration-200
        hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5
        ${className}
      `}
      aria-label={`Note Google : ${data.rating} sur 5 basée sur ${data.reviewCount} avis. Voir sur Google Maps.`}
    >
      {/* Logo Google */}
      <GoogleLogo size={24} />

      {/* Étoiles + Note */}
      <div className="flex flex-col items-start gap-0.5">
        <StarRating rating={data.rating} size={18} />
        <span className="text-sm text-neutral-700 font-medium">
          <span className="text-neutral-900 font-semibold">{data.rating.toFixed(1)}/5</span>
          {" "}
          <span className="text-neutral-500">
            ({data.reviewCount} avis)
          </span>
        </span>
      </div>
    </a>
  )
}
