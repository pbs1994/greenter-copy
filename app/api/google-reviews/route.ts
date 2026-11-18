import { NextRequest, NextResponse } from "next/server"
import { fetchGoogleReviews } from "@/lib/google-places"
import { isRateLimitedPerMinute } from "@/lib/rate-limit"

// La boutique Shopify (shop.greenter.fr) affiche aussi les avis Google en les
// lisant depuis le navigateur. Données publiques, sans cookie ni authentification :
// on autorise toutes les origines (un en-tête fixe reste compatible avec le cache CDN).
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors })
}

export async function GET(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'google-reviews', 15)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429, headers: cors })
    }

    const data = await fetchGoogleReviews({ revalidate: 86400 })

    return NextResponse.json(data, {
      headers: {
        ...cors,
        // Cache CDN : les avis changent rarement, inutile de solliciter la fonction à chaque visite
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error("[api/google-reviews] Erreur inattendue:", error)

    return NextResponse.json(
      { error: "Erreur lors de la récupération des avis Google" },
      { status: 500, headers: cors }
    )
  }
}
