// =============================================================================
// Google Rating Badge - Server Component pour afficher la note Google
// =============================================================================
// Requirements: 2.1, 2.2, 2.3, 2.4, 2.5

import { fetchGoogleReviews } from "@/lib/google-places"
import { GOOGLE_REVIEWS_URL } from "@/lib/local-seo-data"

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

interface GoogleRatingBadgeProps {
  className?: string
}

// -----------------------------------------------------------------------------
// Star Component - Étoile réutilisable avec support partiel
// -----------------------------------------------------------------------------

interface StarProps {
  /** Remplissage de l'étoile entre 0 et 1 (0 = vide, 0.5 = demi, 1 = pleine) */
  fill: number
  /** Taille en pixels (défaut: 20) */
  size?: number
}

export function Star({ fill, size = 20 }: StarProps) {
  const clampedFill = Math.max(0, Math.min(1, fill))
  const clipId = `star-clip-${Math.random().toString(36).slice(2, 9)}`

  // Étoile pleine
  if (clampedFill >= 1) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="#FBBC04"
        stroke="none"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  // Étoile vide
  if (clampedFill <= 0) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FBBC04"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  // Étoile partielle (ex: demi-étoile)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={24 * clampedFill} height="24" />
        </clipPath>
      </defs>
      {/* Fond : étoile vide (contour) */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="none"
        stroke="#FBBC04"
        strokeWidth="1.5"
      />
      {/* Remplissage partiel */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="#FBBC04"
        stroke="none"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  )
}

// -----------------------------------------------------------------------------
// StarRating - Affiche N étoiles pour une note donnée
// -----------------------------------------------------------------------------

interface StarRatingProps {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 20 }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starFill = Math.max(0, Math.min(1, rating - i))
    return <Star key={i} fill={starFill} size={size} />
  })

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
      {stars}
    </div>
  )
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
// GoogleRatingBadge - Composant principal (Server Component)
// -----------------------------------------------------------------------------

export default async function GoogleRatingBadge({
  className = "",
}: GoogleRatingBadgeProps) {
  const data = await fetchGoogleReviews()

  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-3 px-5 py-3
        bg-white border border-neutral-200 rounded-xl shadow-sm
        transition-all duration-200
        hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5
        ${className}
      `}
      aria-label={`Note Google : ${data.rating} sur 5 basée sur ${data.reviewCount} avis. Voir les avis Google.`}
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
