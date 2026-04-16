import { NextRequest, NextResponse } from 'next/server'
import { CITIES } from '@/lib/local-seo-data'

const INDEXNOW_KEY = '85e908e620b042a3a0621df9da8a74d7'
const SITE_URL = 'https://greenter.fr'

/**
 * POST /api/indexnow
 *
 * Submits all site URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 * and pings Google/Bing sitemaps.
 *
 * Call this endpoint after each deploy or content update.
 * Protected by a simple secret key in the Authorization header.
 */
export async function POST(request: NextRequest) {
  // Simple auth check
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.INDEXNOW_SECRET || INDEXNOW_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Record<string, string> = {}

  // Build list of all important URLs
  const urls = [
    SITE_URL,
    `${SITE_URL}/services`,
    `${SITE_URL}/services/pompe-a-chaleur`,
    `${SITE_URL}/services/panneaux-solaires`,
    `${SITE_URL}/services/isolation`,
    `${SITE_URL}/services/audit`,
    `${SITE_URL}/services/maintenance`,
    `${SITE_URL}/produits`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/simulateur-solaire`,
    // City pages - PAC
    ...CITIES.map(city => `${SITE_URL}/services/pompe-a-chaleur/${city.slug}`),
    // City pages - Solar
    ...CITIES.map(city => `${SITE_URL}/services/panneaux-solaires/${city.slug}`),
    // City pages - Isolation
    ...CITIES.map(city => `${SITE_URL}/services/isolation/${city.slug}`),
    // City pages - Audit
    ...CITIES.map(city => `${SITE_URL}/services/audit/${city.slug}`),
  ]

  // 1. Submit to IndexNow (Bing, Yandex, etc.)
  try {
    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'greenter.fr',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    })
    results.indexnow = `${indexNowResponse.status} ${indexNowResponse.statusText}`
  } catch (error) {
    results.indexnow = `Error: ${error instanceof Error ? error.message : 'Unknown'}`
  }

  // 2. Ping Google Sitemap
  try {
    const googleResponse = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`
    )
    results.google_ping = `${googleResponse.status} ${googleResponse.statusText}`
  } catch (error) {
    results.google_ping = `Error: ${error instanceof Error ? error.message : 'Unknown'}`
  }

  // 3. Ping Bing Sitemap
  try {
    const bingResponse = await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`
    )
    results.bing_ping = `${bingResponse.status} ${bingResponse.statusText}`
  } catch (error) {
    results.bing_ping = `Error: ${error instanceof Error ? error.message : 'Unknown'}`
  }

  return NextResponse.json({
    success: true,
    urls_submitted: urls.length,
    results,
  })
}
