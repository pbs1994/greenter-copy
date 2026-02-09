// =============================================================================
// Google Reviews Carousel - Client Component pour afficher les avis Google
// =============================================================================
// Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6

"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { StarRating } from "@/components/GoogleRatingBadge"
import { ExternalLink, MessageSquarePlus, ChevronLeft, ChevronRight } from "lucide-react"
import type { GoogleReviewsResponse } from "@/lib/google-places"

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

interface GoogleReviewsCarouselProps {
  className?: string
  autoplayDelay?: number // défaut: 5000ms
}

// -----------------------------------------------------------------------------
// Utilitaires
// -----------------------------------------------------------------------------

/**
 * Tronque le texte à une longueur maximale avec "..." si nécessaire
 */
function truncateText(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "…"
}

/**
 * Génère les initiales à partir d'un nom (ex: "Jean Dupont" → "JD")
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// -----------------------------------------------------------------------------
// ReviewCard - Carte individuelle d'un avis
// -----------------------------------------------------------------------------

interface ReviewCardProps {
  authorName: string
  authorPhoto: string
  rating: number
  text: string
  relativeTime: string
}

function ReviewCard({
  authorName,
  authorPhoto,
  rating,
  text,
  relativeTime,
}: ReviewCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm h-full flex flex-col">
      {/* En-tête : photo/initiale + nom + date */}
      <div className="flex items-center gap-3 mb-3">
        {/* Photo de profil ou initiale */}
        {authorPhoto && !imgError ? (
          <img
            src={authorPhoto}
            alt={`Photo de ${authorName}`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {getInitials(authorName)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-neutral-900 text-sm truncate">
            {authorName}
          </p>
          <p className="text-xs text-neutral-500">{relativeTime}</p>
        </div>
      </div>

      {/* Étoiles */}
      <div className="mb-2">
        <StarRating rating={rating} size={16} />
      </div>

      {/* Texte de l'avis */}
      <p className="text-sm text-neutral-700 leading-relaxed flex-1">
        {truncateText(text)}
      </p>
    </div>
  )
}

// -----------------------------------------------------------------------------
// GoogleReviewsCarousel - Composant principal
// -----------------------------------------------------------------------------

export default function GoogleReviewsCarousel({
  className = "",
  autoplayDelay = 5000,
}: GoogleReviewsCarouselProps) {
  const [data, setData] = useState<GoogleReviewsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Embla Carousel avec autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  // Navigation
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  // Fetch des données
  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch("/api/google-reviews")
        if (!response.ok) throw new Error("Erreur lors du chargement des avis")
        const reviewsData: GoogleReviewsResponse = await response.json()
        setData(reviewsData)
      } catch (error) {
        console.error("[GoogleReviewsCarousel] Erreur:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  // Ne rien afficher si pas de données ou pas d'avis
  if (isLoading) {
    return (
      <section className={`py-12 ${className}`} aria-label="Avis Google en chargement">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-neutral-200 rounded w-64 mx-auto" />
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-48 bg-neutral-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!data || data.reviews.length === 0) {
    return null
  }

  return (
    <section className={`py-12 ${className}`} aria-label="Avis clients Google">
      <div className="max-w-6xl mx-auto px-4">
        {/* Titre de la section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            Ce que disent nos clients
          </h2>
          <p className="text-neutral-600">
            <span className="font-semibold text-neutral-800">
              {data.rating.toFixed(1)}/5
            </span>{" "}
            basé sur{" "}
            <span className="font-semibold text-neutral-800">
              {data.reviewCount} avis Google
            </span>
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Boutons de navigation */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 rounded-full shadow-md flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 rounded-full shadow-md flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {data.reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-none pl-4 w-full sm:w-1/2 lg:w-1/3"
                >
                  <ReviewCard
                    authorName={review.authorName}
                    authorPhoto={review.authorPhoto}
                    rating={review.rating}
                    text={review.text}
                    relativeTime={review.relativeTime}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liens d'action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Voir tous nos avis Google
          </a>

          <span className="hidden sm:inline text-neutral-300">|</span>

          <a
            href={data.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Laisser un avis
          </a>
        </div>
      </div>
    </section>
  )
}
