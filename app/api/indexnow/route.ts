import { NextRequest, NextResponse } from 'next/server'
import { CITIES } from '@/lib/local-seo-data'
import { getPayloadClient } from '@/lib/payload'
import { supabase } from '@/lib/supabase'

const INDEXNOW_KEY = '85e908e620b042a3a0621df9da8a74d7'
const SITE_URL = 'https://www.greenter.fr'
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`

// CRON_SECRET MUST be set at runtime. The previous fallback to INDEXNOW_KEY
// was a public-by-design value (served at /<key>.txt for IndexNow
// verification), so anyone reading that file could trigger this route's
// fan-out to 5 search engines + database queries.
//
// Resolved per-request (not at module load) so `next build` doesn't crash
// when CRON_SECRET isn't present in the build environment. If the env var
// is missing in production, every request is rejected with 503.
function getCronSecret(): string | null {
  return process.env.CRON_SECRET || null
}

// IndexNow accepts up to 10,000 URLs per batch — we chunk to stay safe.
const INDEXNOW_BATCH_SIZE = 1000

/**
 * GET /api/indexnow  — Vercel Cron (Mon/Wed/Fri 08:00 UTC) or manual with ?key=
 * POST /api/indexnow — Manual call with Bearer token
 *
 * Submits every site URL (static + local SEO + products + blog) to:
 *   1. api.indexnow.org  (central — fans out to all participating engines)
 *   2. Bing IndexNow     (bing.com/indexnow)
 *   3. Yandex IndexNow   (yandex.com/indexnow)
 *   4. Seznam IndexNow   (search.seznam.cz/indexnow)
 *   5. Naver IndexNow    (searchadvisor.naver.com/indexnow)
 *   6. Google URL pings  (priority URLs only — fastest path to crawl)
 */

async function getAllUrls(): Promise<string[]> {
  const services = ['pompe-a-chaleur', 'panneaux-solaires', 'isolation', 'audit']

  const staticUrls = [
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
    `${SITE_URL}/mentions-legales`,
    `${SITE_URL}/confidentialite`,
    `${SITE_URL}/retours`,
  ]

  const localUrls = services.flatMap((service) =>
    CITIES.map((city) => `${SITE_URL}/services/${service}/${city.slug}`)
  )

  // Products + categories from Supabase
  const productUrls: string[] = []
  try {
    const { data: categories } = await supabase.from('categories').select('slug')
    if (categories) {
      for (const c of categories) {
        productUrls.push(`${SITE_URL}/produits/${c.slug}`)
      }
    }

    const { data: products } = await supabase
      .from('products')
      .select('slug, category:categories(slug)')
      .eq('is_active', true)

    if (products) {
      for (const p of products) {
        const catSlug = (p.category as unknown as { slug: string } | null)?.slug
        if (catSlug && p.slug) {
          productUrls.push(`${SITE_URL}/produits/${catSlug}/${p.slug}`)
        }
      }
    }
  } catch {
    // Continue without products if DB is unavailable
  }

  // Blog posts from Payload
  const blogUrls: string[] = []
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      limit: 500,
    })
    for (const post of posts.docs) {
      if (post.slug) blogUrls.push(`${SITE_URL}/blog/${post.slug}`)
    }
  } catch {
    // Continue without blog if Payload is unavailable
  }

  // De-duplicate defensively
  return Array.from(new Set([...staticUrls, ...localUrls, ...productUrls, ...blogUrls]))
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function postIndexNow(endpoint: string, urls: string[]): Promise<string> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.greenter.fr',
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    })
    return `${res.status} ${res.statusText}`
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown'}`
  }
}

async function submitToSearchEngines() {
  const urls = await getAllUrls()
  const batches = chunk(urls, INDEXNOW_BATCH_SIZE)
  const results: Record<string, string[]> = {
    indexnow_central: [],
    indexnow_bing: [],
    indexnow_yandex: [],
    indexnow_seznam: [],
    indexnow_naver: [],
  }

  for (const batch of batches) {
    // Submit in parallel to all IndexNow-compatible engines.
    const [central, bing, yandex, seznam, naver] = await Promise.all([
      postIndexNow('https://api.indexnow.org/indexnow', batch),
      postIndexNow('https://www.bing.com/indexnow', batch),
      postIndexNow('https://yandex.com/indexnow', batch),
      postIndexNow('https://search.seznam.cz/indexnow', batch),
      postIndexNow('https://searchadvisor.naver.com/indexnow', batch),
    ])
    results.indexnow_central.push(central)
    results.indexnow_bing.push(bing)
    results.indexnow_yandex.push(yandex)
    results.indexnow_seznam.push(seznam)
    results.indexnow_naver.push(naver)
  }

  let sitemapPings = 0
  for (const target of [
    `https://www.google.com/sitemaps/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`,
  ]) {
    try {
      await fetch(target)
      sitemapPings++
    } catch {
      // continue
    }
  }

  return {
    urls_count: urls.length,
    batches: batches.length,
    sitemap_pings: sitemapPings,
    results,
    timestamp: new Date().toISOString(),
  }
}

export async function GET(request: NextRequest) {
  const secret = getCronSecret()
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const cronHeader = request.headers.get('x-vercel-cron')
  const urlKey = request.nextUrl.searchParams.get('key')

  if (!cronHeader && authHeader !== `Bearer ${secret}` && urlKey !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await submitToSearchEngines()
  return NextResponse.json({
    success: true,
    message: 'Indexation requests sent to IndexNow (central, Bing, Yandex, Seznam, Naver) + sitemap pings',
    ...result,
  })
}

export async function POST(request: NextRequest) {
  const secret = getCronSecret()
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await submitToSearchEngines()
  return NextResponse.json({
    success: true,
    message: 'Indexation requests sent to IndexNow (central, Bing, Yandex, Seznam, Naver) + sitemap pings',
    ...result,
  })
}
