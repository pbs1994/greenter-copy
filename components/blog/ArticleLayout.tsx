import Link from 'next/link'
import { ChevronRight, Clock, Calendar, User } from 'lucide-react'

interface ArticleLayoutProps {
  title: string
  subtitle: string
  date: string
  readingTime: number
  author?: string
  breadcrumbs: { name: string; url: string }[]
  children: React.ReactNode
}

export function ArticleLayout({
  title,
  subtitle,
  date,
  readingTime,
  author = 'Greenter',
  breadcrumbs,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <header className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="container mx-auto max-w-3xl px-4 py-10 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.url} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.url} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-neutral-600 font-medium">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            {title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            {subtitle}
          </p>

          {/* Meta */}
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
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-3xl px-4 py-10 md:py-16">
        <div className="prose prose-lg prose-slate max-w-none">
          {children}
        </div>
      </div>
    </article>
  )
}
