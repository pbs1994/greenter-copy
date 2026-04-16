import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar, ArrowRight, FileText } from "lucide-react"
import type { Metadata } from "next"
import { getPayloadClient } from "@/lib/payload"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"

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
  published_date?: string | null
  status: 'draft' | 'published'
  featured_image?: Media | string | null
}

export const metadata: Metadata = {
  title: "Blog | Actualités Énergie Solaire & Rénovation | Greenter",
  description: "Découvrez nos articles sur l'énergie solaire, les batteries de stockage, les pompes à chaleur et les conseils pour optimiser votre autoconsommation.",
  openGraph: {
    title: "Blog Rénovation Énergétique | Greenter",
    description: "Actualités et conseils sur l'énergie solaire, pompes à chaleur et autoconsommation.",
    url: "https://greenter.fr/blog",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://greenter.fr/blog",
  },
}

const POSTS_PER_PAGE = 12

interface Props {
  searchParams: Promise<{ page?: string }>
}

/**
 * Blog index page - displays published blog posts with pagination
 * Uses Payload Local API for data fetching.
 * 
 * @validates Requirements 20.1, 20.2
 */
export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10))
  
  const payload = await getPayloadClient()
  
  // Fetch published blog posts with pagination
  const { docs: posts, totalPages, totalDocs } = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    sort: '-published_date',
    depth: 1, // Populate featured_image
    limit: POSTS_PER_PAGE,
    page: currentPage,
  })
  
  const typedPosts = posts as BlogPost[]
  
  // Helper to get image URL
  const getImageUrl = (post: BlogPost): string | null => {
    if (typeof post.featured_image === 'object' && post.featured_image?.url) {
      return post.featured_image.url
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
  
  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Blog", url: "https://greenter.fr/blog" }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">Blog</span>
          </nav>

          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Notre blog
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Actualit�s & Conseils
            </h1>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              D�couvrez nos articles sur l'�nergie solaire, les batteries de stockage, 
              et les conseils pour optimiser votre autoconsommation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          {typedPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Aucun article pour le moment
              </h2>
              <p className="text-neutral-600 mb-6">
                Nos articles arrivent bient�t. Revenez nous voir !
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Retour � l'accueil
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {typedPosts.map((post) => {
                  const imageUrl = getImageUrl(post)
                  return (
                    <Link 
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 hover:ring-green-400 hover:shadow-xl transition-all"
                    >
                      {/* Image */}
                      <div className="relative bg-gradient-to-b from-green-50 to-white h-48 overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-12 h-12 text-green-300" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.published_date || undefined}>
                            {formatDate(post.published_date)}
                          </time>
                        </div>
                        
                        <h2 className="font-heading text-xl font-bold text-neutral-900 group-hover:text-green-700 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        
                        {post.excerpt && (
                          <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Read more */}
                        <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm group-hover:gap-2 transition-all">
                          Lire l'article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-4 py-2 rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors text-sm font-medium"
                    >
                      Pr�c�dent
                    </Link>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-green-700 text-white'
                          : 'border border-green-200 hover:border-green-400 hover:bg-green-50'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                  
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-4 py-2 rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors text-sm font-medium"
                    >
                      Suivant
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
