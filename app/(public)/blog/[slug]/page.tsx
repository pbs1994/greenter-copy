import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Calendar, User, ArrowRight, FileText } from "lucide-react"
import type { Metadata } from "next"
import { getPayloadClient } from "@/lib/payload"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { RichTextRenderer } from "@/components/blocks/RichTextBlock"

// Temporary types until payload-types is generated
interface Media {
  id: string
  url?: string | null
  alt?: string | null
}

interface BlogPost {
  id: string
  title: string
  slug?: string | null
  excerpt?: string | null
  author?: string | null
  published_date?: string | null
  status: 'draft' | 'published'
  featured_image?: Media | string | null
  content?: unknown
  seo?: {
    meta_title?: string | null
    meta_description?: string | null
    og_image?: Media | string | null
  } | null
  tags?: Array<{ tag: string }> | null
  updatedAt?: string | null
}

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * Generate JSON-LD Article structured data for SEO
 * 
 * @validates Requirements 20.4
 */
function generateArticleJsonLd(post: BlogPost) {
  const imageUrl = typeof post.featured_image === 'object' && post.featured_image?.url
    ? post.featured_image.url
    : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: imageUrl ? `https://greenter.fr${imageUrl}` : undefined,
    author: post.author ? {
      '@type': 'Person',
      name: post.author,
    } : {
      '@type': 'Organization',
      name: 'Greenter',
    },
    datePublished: post.published_date || undefined,
    dateModified: post.updatedAt || post.published_date || undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Greenter',
      logo: {
        '@type': 'ImageObject',
        url: 'https://greenter.fr/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://greenter.fr/blog/${post.slug}`,
    },
  }
}

/**
 * Generate metadata for SEO
 * 
 * @validates Requirements 20.3
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  })
  
  if (posts.length === 0) {
    return { title: "Article non trouvé | Greenter" }
  }
  
  const post = posts[0] as BlogPost
  const seo = post.seo as { meta_title?: string; meta_description?: string; og_image?: Media } | null
  
  const title = seo?.meta_title || post.title
  const description = seo?.meta_description || post.excerpt || ''
  
  const imageUrl = typeof post.featured_image === 'object' && post.featured_image?.url
    ? post.featured_image.url
    : null
  
  return {
    title: `${title} | Blog Greenter`,
    description,
    openGraph: {
      title,
      description,
      url: `https://greenter.fr/blog/${slug}`,
      siteName: "Greenter",
      locale: "fr_FR",
      type: "article",
      publishedTime: post.published_date || undefined,
      authors: post.author ? [post.author] : undefined,
      images: imageUrl ? [{
        url: `https://greenter.fr${imageUrl}`,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : undefined,
    },
    alternates: {
      canonical: `https://greenter.fr/blog/${slug}`,
    },
  }
}

/**
 * Blog article page
 * Uses Payload Local API for data fetching.
 * 
 * @validates Requirements 20.3, 20.4, 20.5, 20.6
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  
  // Fetch the blog post
  // @validates Requirements 20.6 - Draft posts return 404
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 2,
    limit: 1,
  })
  
  if (posts.length === 0) {
    notFound()
  }
  
  const post = posts[0] as BlogPost
  
  // Fetch related articles by shared tags
  // @validates Requirements 20.5
  let relatedPosts: BlogPost[] = []
  if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
    const tagValues = post.tags
      .map((t) => typeof t === 'object' && t !== null ? (t as { tag: string }).tag : String(t))
      .filter((t): t is string => Boolean(t))
    
    if (tagValues.length > 0) {
      const { docs: related } = await payload.find({
        collection: 'blog-posts',
        where: {
          and: [
            { status: { equals: 'published' } },
            { id: { not_equals: post.id } },
            {
              or: tagValues.map((tag) => ({
                'tags.tag': { contains: tag },
              })),
            },
          ],
        },
        sort: '-published_date',
        depth: 1,
        limit: 3,
      })
      relatedPosts = related as BlogPost[]
    }
  }
  
  // If no related posts by tags, get recent posts
  if (relatedPosts.length === 0) {
    const { docs: recent } = await payload.find({
      collection: 'blog-posts',
      where: {
        and: [
          { status: { equals: 'published' } },
          { id: { not_equals: post.id } },
        ],
      },
      sort: '-published_date',
      depth: 1,
      limit: 3,
    })
    relatedPosts = recent as BlogPost[]
  }
  
  // Helper to get image URL
  const getImageUrl = (item: BlogPost | Media): string | null => {
    if ('featured_image' in item) {
      const img = item.featured_image
      if (typeof img === 'object' && img?.url) {
        return img.url
      }
    }
    if ('url' in item && item.url) {
      return item.url
    }
    return null
  }
  
  // Format date in French
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  
  const imageUrl = getImageUrl(post)
  const jsonLd = generateArticleJsonLd(post)
  
  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Blog", url: "https://greenter.fr/blog" },
    { name: post.title, url: `https://greenter.fr/blog/${slug}` }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <Link href="/blog" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium line-clamp-1">{post.title}</span>
          </nav>

          {/* Title & Meta */}
          <header className="mb-8">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              {post.published_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.published_date}>
                    {formatDate(post.published_date)}
                  </time>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-green max-w-none">
            {post.content ? <RichTextRenderer content={post.content} /> : null}
          </div>

          {/* Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index: number) => {
                  const tagValue = typeof tag === 'object' && tag !== null ? (tag as { tag: string }).tag : String(tag)
                  return (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {tagValue}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-green-50">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-8 text-center">
              Articles similaires
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const relatedImageUrl = getImageUrl(relatedPost)
                return (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 hover:ring-green-400 hover:shadow-xl transition-all"
                  >
                    {/* Image */}
                    <div className="relative bg-gradient-to-b from-green-50 to-white h-40 overflow-hidden">
                      {relatedImageUrl ? (
                        <Image
                          src={relatedImageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-10 h-10 text-green-300" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-bold text-neutral-900 group-hover:text-green-700 transition-colors mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm group-hover:gap-2 transition-all">
                        Lire
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Voir tous les articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
