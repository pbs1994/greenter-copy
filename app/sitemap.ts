import { MetadataRoute } from 'next'
import { CITIES } from '@/lib/local-seo-data'
import { getPayloadClient } from '@/lib/payload'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://greenter.fr'
  const currentDate = new Date()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/pompe-a-chaleur`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/panneaux-solaires`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/isolation`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/audit`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/maintenance`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/produits`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/simulateur-solaire`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/mentions-legales`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/confidentialite`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/retours`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Pages locales SEO (villes × services)
  const localServices = ['pompe-a-chaleur', 'panneaux-solaires', 'isolation', 'audit']
  const localPages: MetadataRoute.Sitemap = localServices.flatMap((service) =>
    CITIES.map((city) => ({
      url: `${baseUrl}/services/${service}/${city.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
        lastModified: currentDate,
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
          lastModified: p.updated_at ? new Date(p.updated_at) : currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      productPages = [...productPages, ...pages]
    }
  } catch {
    // Silently continue if DB unavailable during build
  }

  // Blog posts dynamiques depuis Payload
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      limit: 100,
    })

    blogPages = posts.docs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Silently continue if Payload unavailable during build
  }

  return [...staticPages, ...localPages, ...productPages, ...blogPages]
}
