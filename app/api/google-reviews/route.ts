import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { fetchGoogleReviews } from "@/lib/google-places"

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 15
const RATE_WINDOW = 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip)
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

export async function GET() {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
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
