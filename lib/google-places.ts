// =============================================================================
// Google Places API (New) - Utilitaires pour récupérer les avis Google
// =============================================================================

import { GOOGLE_PLACE_ID, GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from "@/lib/local-seo-data"

// -----------------------------------------------------------------------------
// Types pour l'API Google Places (New)
// -----------------------------------------------------------------------------

export interface GooglePlaceReview {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text?: {
    text: string
    languageCode: string
  }
  originalText?: {
    text: string
    languageCode: string
  }
  authorAttribution: {
    displayName: string
    uri: string
    photoUri: string
  }
  publishTime: string
}

export interface GooglePlaceDetails {
  rating: number
  userRatingCount: number
  reviews: GooglePlaceReview[]
}

export interface GoogleReviewsResponse {
  rating: number
  reviewCount: number
  reviews: {
    authorName: string
    authorPhoto: string
    rating: number
    text: string
    relativeTime: string
    publishTime: string
  }[]
  googleMapsUrl: string
  writeReviewUrl: string
}

// -----------------------------------------------------------------------------
// Valeurs par défaut en cas d'erreur API
// -----------------------------------------------------------------------------

const DEFAULT_RATING_DATA: GoogleReviewsResponse = {
  rating: 4.8,
  reviewCount: 20,
  reviews: [],
  googleMapsUrl: GOOGLE_MAPS_URL,
  writeReviewUrl: GOOGLE_REVIEW_URL,
}

// -----------------------------------------------------------------------------
// Fonctions utilitaires
// -----------------------------------------------------------------------------

/**
 * Transforme la réponse brute de l'API Google Places (New) en format normalisé
 * pour le frontend.
 */
export function transformGoogleResponse(
  data: GooglePlaceDetails
): GoogleReviewsResponse {
  return {
    rating: data.rating,
    reviewCount: data.userRatingCount,
    reviews: (data.reviews ?? [])
      .filter((review) => review.text?.text)
      .map((review) => ({
        authorName: review.authorAttribution.displayName,
        authorPhoto: review.authorAttribution.photoUri,
        rating: review.rating,
        text: review.originalText?.text || review.text.text,
        relativeTime: review.relativePublishTimeDescription,
        publishTime: review.publishTime,
      })),
    googleMapsUrl: GOOGLE_MAPS_URL,
    writeReviewUrl: GOOGLE_REVIEW_URL,
  }
}

/**
 * Récupère les avis Google via l'API Google Places (New).
 *
 * Utilise le endpoint `places/{placeId}` avec les champs rating,
 * userRatingCount et reviews. Le cache Next.js (revalidate: 86400)
 * est géré par l'appelant (route API).
 *
 * @param options.revalidate - Durée du cache en secondes (défaut: 86400 = 24h)
 * @returns Les avis Google normalisés ou les données par défaut en cas d'erreur
 */
export async function fetchGoogleReviews(
  options: { revalidate?: number } = {}
): Promise<GoogleReviewsResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    console.error(
      "[google-places] GOOGLE_PLACES_API_KEY manquante dans les variables d'environnement"
    )
    return DEFAULT_RATING_DATA
  }

  const { revalidate = 86400 } = options

  const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate },
    })

    if (!response.ok) {
      console.error(
        `[google-places] Erreur API Google Places: ${response.status} ${response.statusText}`
      )
      return DEFAULT_RATING_DATA
    }

    const data: GooglePlaceDetails = await response.json()

    return transformGoogleResponse(data)
  } catch (error) {
    console.error("[google-places] Erreur lors de l'appel API:", error)
    return DEFAULT_RATING_DATA
  }
}
