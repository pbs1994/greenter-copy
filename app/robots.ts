import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/commande/'],
    },
    sitemap: 'https://greenter.fr/sitemap.xml',
  }
}
