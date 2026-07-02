import { MetadataRoute } from 'next'
import { SITEMAP_CITIES } from '@/lib/local-seo-data'
import { supabase } from '@/lib/supabase'

// Date de dernière mise à jour significative du contenu des pages locales
const CITY_PAGES_UPDATED = new Date('2026-05-24')

// Tier 1 : grandes villes / chefs-lieux — fort potentiel de trafic local
const HIGH_PRIORITY_CITIES = new Set([
  'paris', 'versailles', 'creteil', 'vincennes', 'saint-maur-des-fosses',
  'champigny-sur-marne', 'meaux', 'melun', 'noisy-le-grand', 'evry-courcouronnes',
])

// Tier 2 : villes moyennes
const MED_PRIORITY_CITIES = new Set([
  'chelles', 'pontault-combault', 'maisons-alfort', 'massy', 'corbeil-essonnes',
  'palaiseau', 'sartrouville', 'saint-germain-en-laye',
])

function cityPriority(slug: string): number {
  if (HIGH_PRIORITY_CITIES.has(slug)) return 0.72
  if (MED_PRIORITY_CITIES.has(slug)) return 0.62
  return 0.5
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.greenter.fr'

  // Pages statiques avec vraies dates de dernière modification
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date('2026-05-24'), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date('2026-01-15'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/pompe-a-chaleur`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/panneaux-solaires`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/isolation`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/audit`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/maintenance`, lastModified: new Date('2026-01-15'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/produits`, lastModified: new Date('2026-05-01'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date('2026-05-01'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog/guide-prix-pompe-a-chaleur-2026`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/isolation-pour-sol-beton`, lastModified: new Date('2026-06-18'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/pompe-a-chaleur-piege-a-eviter`, lastModified: new Date('2026-06-21'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/isolation-sol-sous-parquet`, lastModified: new Date('2026-06-25'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/isolation-rampants-de-toiture`, lastModified: new Date('2026-07-02'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/simulateur-solaire`, lastModified: new Date('2026-01-15'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-01-15'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date('2025-09-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/confidentialite`, lastModified: new Date('2025-09-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/retours`, lastModified: new Date('2025-09-01'), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Pages locales SEO (villes × services)
  const localServices = ['pompe-a-chaleur', 'panneaux-solaires', 'isolation', 'audit']
  const localPages: MetadataRoute.Sitemap = localServices.flatMap((service) =>
    SITEMAP_CITIES.map((city) => ({
      url: `${baseUrl}/services/${service}/${city.slug}`,
      lastModified: CITY_PAGES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: cityPriority(city.slug),
    }))
  )

  // Produits dynamiques depuis Supabase (catégories + produits)
  let productPages: MetadataRoute.Sitemap = []
  try {
    const { data: categories } = await supabase
      .from('categories')
      .select('slug')

    if (categories) {
      productPages = categories.map((c) => ({
        url: `${baseUrl}/produits/${c.slug}`,
        lastModified: new Date('2026-05-01'),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      }))
    }

    const { data: products } = await supabase
      .from('products')
      .select('slug, category:categories(slug), updated_at')
      .eq('is_active', true)

    if (products) {
      const pages = products
        .filter((p) => p.category && p.slug)
        .map((p) => ({
          url: `${baseUrl}/produits/${(p.category as unknown as { slug: string }).slug}/${p.slug}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : new Date('2026-05-01'),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      productPages = [...productPages, ...pages]
    }
  } catch {
    // Silently continue if DB unavailable during build
  }

  return [...staticPages, ...localPages, ...productPages]
}
