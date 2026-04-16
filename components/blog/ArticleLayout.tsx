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
      {/* Full-width Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-slate-900">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto max-w-4xl px-4 pb-10 md:pb-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm mb-6">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/40" />}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.url} className="text-white/60 hover:text-white transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-white/80 font-medium">{crumb.name}</span>
                  )}
                </span>
              ))}
            </nav>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
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
