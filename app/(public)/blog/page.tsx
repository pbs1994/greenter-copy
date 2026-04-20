import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar, ArrowRight, FileText, Clock, TrendingUp } from "lucide-react"
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

// Articles statiques (créés en dur, pas via Payload CMS)
const STATIC_ARTICLES = [
  {
    id: 'guide-prix-pac-2026',
    title: "Prix d'une pompe à chaleur en 2026 : coûts, aides et rentabilité",
    slug: 'guide-prix-pompe-a-chaleur-2026',
    excerpt: "Combien coûte une PAC en 2026 ? Barème MaPrimeRénov', comparatif air-eau vs air-air, calcul du reste à charge. Données officielles du gouvernement.",
    published_date: '2026-04-15',
    image: '/pac.jpg',
    readingTime: 12,
    category: 'Guide',
    featured: true,
  },
]

export const metadata: Metadata = {
  title: "Blog | Actualités Énergie Solaire & Rénovation | Greenter",
  description: "Guides pratiques, conseils et actualités sur la rénovation énergétique : pompe à chaleur, panneaux solaires, isolation, aides MaPrimeRénov'. Par Greenter.",
  openGraph: {
    title: "Blog Rénovation Énergétique | Greenter",
    description: "Guides et conseils sur la rénovation énergétique par Greenter.",
    url: "https://www.greenter.fr/blog",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.greenter.fr/blog",
  },
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.greenter.fr" },
  { name: "Blog", url: "https://www.greenter.fr/blog" }
]

export default async function BlogPage() {
  // Fetch CMS articles
  let cmsArticles: BlogPost[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      sort: '-published_date',
      depth: 1,
      limit: 20,
    })
    cmsArticles = result.docs as BlogPost[]
  } catch {
    // Payload unavailable
  }

  // Article mis en avant (le plus récent des statiques)
  const featuredArticle = STATIC_ARTICLES.find(a => a.featured) || STATIC_ARTICLES[0]

  // Reste des articles statiques (non featured)
  const otherStaticArticles = STATIC_ARTICLES.filter(a => a.id !== featuredArticle?.id)

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ---- HERO ---- */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white/80 font-medium">Blog</span>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-block text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Le blog Greenter
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Guides & Conseils{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Rénovation Énergétique</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Prix, aides, comparatifs, retours d&apos;expérience. Tout ce qu&apos;il faut savoir avant de rénover votre logement.
            </p>
          </div>
        </div>
      </section>

      {/* ---- ARTICLE MIS EN AVANT ---- */}
      {featuredArticle && (
        <section className="-mt-10 relative z-20 container mx-auto max-w-6xl px-4 mb-16">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-slate-200 hover:ring-emerald-300 hover:shadow-2xl transition-all"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredArticle.published_date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readingTime} min
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-3 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                  Lire l&apos;article complet
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ---- GRILLE ARTICLES ---- */}
      <section className="container mx-auto max-w-6xl px-4 pb-20">
        {(otherStaticArticles.length > 0 || cmsArticles.length > 0) ? (
          <>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">Tous nos articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Articles statiques */}
              {otherStaticArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-100 hover:ring-emerald-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{article.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(article.published_date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readingTime} min</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}

              {/* Articles CMS Payload */}
              {cmsArticles.map((post) => {
                const imageUrl = typeof post.featured_image === 'object' && post.featured_image?.url ? post.featured_image.url : null
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-100 hover:ring-emerald-200 hover:shadow-xl transition-all"
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><FileText className="w-12 h-12 text-slate-300" /></div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.published_date)}</span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && <p className="text-slate-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>}
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Lire <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        ) : (
          /* Empty state — seulement si aucun article du tout */
          featuredArticle ? null : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">D&apos;autres articles arrivent bientôt</h2>
              <p className="text-slate-600 mb-6">Nos guides sur les panneaux solaires et l&apos;isolation sont en préparation.</p>
              <Link href="/" className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Retour à l&apos;accueil <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )
        )}

        {/* Newsletter / CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center border border-emerald-100">
          <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Besoin d&apos;un devis pour votre projet ?
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-6">
            Nos experts certifiés RGE vous conseillent gratuitement sur la meilleure solution pour votre logement.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/30">
            Demander un devis gratuit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
