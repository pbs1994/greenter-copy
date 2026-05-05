import { NextRequest, NextResponse } from "next/server"
import { fetchGoogleReviews } from "@/lib/google-places"
import { isRateLimitedPerMinute } from "@/lib/rate-limit"

export async function GET(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'google-reviews', 15)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
    }

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
