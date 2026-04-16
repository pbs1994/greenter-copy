import { NextRequest, NextResponse } from 'next/server'
import { CITIES } from '@/lib/local-seo-data'

const INDEXNOW_KEY = '85e908e620b042a3a0621df9da8a74d7'
const SITE_URL = 'https://greenter.fr'
const CRON_SECRET = process.env.CRON_SECRET || INDEXNOW_KEY

/**
 * GET /api/indexnow — Called by Vercel Cron daily
 * POST /api/indexnow — Called manually with Bearer token
 *
 * Submits all site URLs to:
 * 1. IndexNow (Bing, Yandex, Seznam, Naver)
 * 2. Google sitemap ping
 * 3. Bing sitemap ping
 * 4. Google URL ping (individual URLs for faster crawling)
 */

// Build the full URL list
function getAllUrls(): string[] {
  const services = ['pompe-a-chaleur', 'panneaux-solaires', 'isolation', 'audit']

  return [
    // Static pages
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
    // City pages for all services
    ...services.flatMap(service =>
      CITIES.map(city => `${SITE_URL}/services/${service}/${city.slug}`)
    ),
  ]
}

async function submitToSearchEngines() {
  const urls = getAllUrls()
  const results: Record<string, string> = {}

  // 1. IndexNow — submit directly to Bing (more reliable than api.indexnow.org)
  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'greenter.fr',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 100),
      }),
    })
    results.indexnow_bing = `${response.status} ${response.statusText}`
  } catch (error) {
    results.indexnow_bing = `Error: ${error instanceof Error ? error.message : 'Unknown'}`
  }

  // 2. IndexNow — Yandex
  try {
    const response = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'greenter.fr',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 100),
      }),
    })
    results.indexnow_yandex = `${response.status} ${response.statusText}`
  } catch (error) {
    results.indexnow_yandex = `Error: ${error instanceof Error ? error.message : 'Unknown'}`
  }

  // 3. Ping Google with individual important URLs
  // Google sometimes picks up URLs faster when directly fetched
  const priorityUrls = [
    `${SITE_URL}/services/pompe-a-chaleur`,
    `${SITE_URL}/services/panneaux-solaires`,
    `${SITE_URL}/services/isolation`,
    `${SITE_URL}/services/audit`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/blog/guide-prix-pompe-a-chaleur-2026`,
    // Top 10 city pages (highest search volume cities)
    ...['ozoir-la-ferriere', 'pontault-combault', 'melun', 'meaux', 'chelles',
        'creteil', 'noisy-le-grand', 'champigny-sur-marne', 'saint-maur-des-fosses', 'paris'
    ].map(slug => `${SITE_URL}/services/pompe-a-chaleur/${slug}`),
  ]

  let googlePingSuccess = 0
  for (const url of priorityUrls) {
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`)
      googlePingSuccess++
    } catch {
      // Continue with next URL
    }
  }
  results.google_url_pings = `${googlePingSuccess}/${priorityUrls.length} success`

  return { urls_count: urls.length, results, timestamp: new Date().toISOString() }
}

// GET — for Vercel Cron or browser call with ?key=
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronHeader = request.headers.get('x-vercel-cron')
  const urlKey = request.nextUrl.searchParams.get('key')

  // Allow: Vercel Cron header, Bearer token, or ?key= query param
  if (!cronHeader && authHeader !== `Bearer ${CRON_SECRET}` && urlKey !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await submitToSearchEngines()

  return NextResponse.json({
    success: true,
    message: 'Indexation requests sent to Google, Bing, Yandex',
    ...result,
  })
}

// POST — for manual calls
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await submitToSearchEngines()

  return NextResponse.json({
    success: true,
    message: 'Indexation requests sent to Google, Bing, Yandex',
    ...result,
  })
}
