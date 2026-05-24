import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Clock, Calendar, User, ArrowLeft } from 'lucide-react'

interface ArticleLayoutProps {
  title: string
  subtitle: string
  date: string
  readingTime: number
  author?: string
  heroImage: string
  heroAlt: string
  breadcrumbs: { name: string; url: string }[]
  children: React.ReactNode
}

export function ArticleLayout({
  title,
  subtitle,
  date,
  readingTime,
  author = 'Greenter',
  heroImage,
  heroAlt,
  breadcrumbs,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="min-h-screen bg-white">
      {/* ============================================================
          MOBILE: image on top (16:9), title below on dark background.
          ≥md: full-width hero with overlaid title (editorial look).
          ============================================================ */}

      {/* Hero image — mobile: fixed 16:9 ratio, md+: full-viewport height */}
      <div className="relative bg-slate-900 aspect-[16/9] md:aspect-auto md:h-[55vh] lg:h-[65vh]">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — only on md+ where title is overlaid */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-slate-900 via-slate-900/75 to-transparent" />

        {/* Overlaid content — md+ only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto max-w-4xl px-4 pb-10 lg:pb-12">
            <nav className="flex items-center gap-1.5 text-sm mb-5">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/50" />}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.url} className="text-white/70 hover:text-white transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.name}</span>
                  )}
                </span>
              ))}
            </nav>
            <p
              aria-hidden="true"
              className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg"
            >
              {title}
            </p>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE-ONLY title block — under the image */}
      <div className="md:hidden bg-slate-900 px-5 py-8">
        <nav className="flex items-center gap-1.5 text-xs mb-4 flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.url} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 text-white/40" />}
              {i < breadcrumbs.length - 1 ? (
                <Link href={crumb.url} className="text-white/60 hover:text-white transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-white/90 font-medium">{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="font-heading text-2xl font-bold text-white leading-tight mb-3">
          {title}
        </h1>
        <p className="text-base text-white/80 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Meta bar */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {readingTime} min de lecture
            </span>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        {children}
      </div>
    </article>
  )
}
