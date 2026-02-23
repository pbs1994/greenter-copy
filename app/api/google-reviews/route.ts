import { NextResponse } from "next/server"
import { fetchGoogleReviews } from "@/lib/google-places"

/**
 * GET /api/google-reviews
 *
 * Récupère les avis Google via l'API Google Places (New).
 * Les résultats sont mis en cache pendant 24 heures (revalidate: 86400)
 * via le mécanisme de cache Next.js dans fetchGoogleReviews.
 *
 * En cas d'erreur API, retourne les données par défaut (fallback).
 */
export async function GET() {
  try {
    const data = await fetchGoogleReviews({ revalidate: 86400 })

    return NextResponse.json(data)
  } catch (error) {
    console.error("[api/google-reviews] Erreur inattendue:", error)

    return NextResponse.json(
      { error: "Erreur lors de la récupération des avis Google" },
      { status: 500 }
    )
  }
}
