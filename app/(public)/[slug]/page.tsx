import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPayloadClient } from "@/lib/payload"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { BlockRenderer } from "@/components/blocks"
import type { Page, Media } from "@/payload-types"

interface Props {
  params: Promise<{ slug: string }>
}

// Reserved slugs that should not be handled by this catch-all route
const RESERVED_SLUGS = [
  'produits',
  'blog',
  'contact',
  'services',
  'confidentialite',
  'mentions-legales',
  'retours',
  'simulateur-solaire',
  'commande',
  'administrator',
  'admin',
  'api',
]

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { status: { equals: 'published' } },
      limit: 100,
    })
    return pages
      .filter((p) => p.slug && !RESERVED_SLUGS.includes(p.slug))
      .map((p) => ({ slug: p.slug as string }))
  } catch {
    return []
  }
}

/**
 * Generate metadata for SEO
 *
 * @validates Requirements 21.3
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  // Check if slug is reserved
  if (RESERVED_SLUGS.includes(slug)) {
    return { title: "Page non trouvée | Greenter" }
  }
  
  const payload = await getPayloadClient()
  
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  })
  
  if (pages.length === 0) {
    return { title: "Page non trouvée | Greenter" }
  }
  
  const page = pages[0] as Page
  const seo = page.seo as { meta_title?: string; meta_description?: string; og_image?: Media } | null
  
  const title = seo?.meta_title || page.title
  const description = seo?.meta_description || ''
  
  const ogImage = seo?.og_image
  const imageUrl = typeof ogImage === 'object' && ogImage?.url ? ogImage.url : null
  
  return {
    title: `${title} | Greenter`,
    description,
    openGraph: {
      title,
      description,
      url: `https://greenter.fr/${slug}`,
      siteName: "Greenter",
      locale: "fr_FR",
      type: "website",
      images: imageUrl ? [{
        url: `https://greenter.fr${imageUrl}`,
        width: 1200,
        height: 630,
        alt: title,
      }] : undefined,
    },
    alternates: {
      canonical: `https://greenter.fr/${slug}`,
    },
  }
}

/**
 * Dynamic page component - catch-all route for custom pages
 * Uses Payload Local API for data fetching.
 * Priority is below static routes.
 * 
 * @validates Requirements 21.1, 21.2, 21.3, 21.4
 */
export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  
  // Check if slug is reserved - let Next.js handle these routes
  if (RESERVED_SLUGS.includes(slug)) {
    notFound()
  }
  
  const payload = await getPayloadClient()
  
  // Fetch the page by slug
  // @validates Requirements 21.4 - Draft pages return 404
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 2, // Populate media in blocks
    limit: 1,
  })
  
  if (pages.length === 0) {
    notFound()
  }
  
  const page = pages[0] as Page
  
  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: page.title, url: `https://greenter.fr/${slug}` }
  ]

  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Page Title (if no hero block) */}
      {page.blocks && Array.isArray(page.blocks) && !page.blocks.some(b => b.blockType === 'hero') && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 text-center">
              {page.title}
            </h1>
          </div>
        </section>
      )}
      
      {/* Render blocks in order */}
      {/* @validates Requirements 21.2 */}
      {page.blocks && Array.isArray(page.blocks) && page.blocks.length > 0 && (
        <BlockRenderer
          blocks={page.blocks as Parameters<typeof BlockRenderer>[0]['blocks']}
        />
      )}
    </main>
  )
}
