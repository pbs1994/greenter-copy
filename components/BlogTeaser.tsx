import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'

/**
 * Homepage blog teaser — surfaces the most recent blog guides so internal
 * link equity flows from the home page to /blog and the articles.
 *
 * Article list is kept in sync with app/(public)/blog/page.tsx STATIC_ARTICLES.
 * Keep them in the same order (featured first).
 */
const ARTICLES = [
  {
    slug: 'remplacer-chaudiere-gaz-pompe-a-chaleur-2026',
    badge: 'Nouveau · Guide 2026',
    title: 'Remplacer sa chaudière gaz par une pompe à chaleur en 2026',
    excerpt:
      "TVA à 20 % sur les chaudières gaz, prime EDF 1 000 €, bonus MaPrimeRénov' +1 000 € : pourquoi 2026 est l'année idéale pour basculer et comment s'y prendre.",
    image: '/images/blog/remplacer-chaudiere-gaz-pac-hero.png',
    readingTime: 15,
  },
  {
    slug: 'guide-prix-pompe-a-chaleur-2026',
    badge: 'Guide 2026',
    title: "Prix d'une pompe à chaleur en 2026 : coûts, aides et rentabilité",
    excerpt:
      "Comparatif air-eau vs air-air, barème MaPrimeRénov', exemple chiffré complet et calcul du reste à charge. Données officielles du gouvernement.",
    image: '/pac.jpg',
    readingTime: 12,
  },
] as const

export function BlogTeaser() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              <BookOpen className="h-3.5 w-3.5" />
              Blog &amp; guides
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900">
              Tout comprendre sur la rénovation énergétique
            </h2>
            <p className="mt-2 text-neutral-600 max-w-2xl">
              Guides pratiques et chiffrés, basés sur les données officielles du gouvernement
              (MaPrimeRénov&apos;, ADEME, CRE). Mise à jour avril 2026.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-600 hover:text-white"
          >
            Tous les articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/60 transition-all hover:shadow-lg hover:ring-emerald-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  {a.badge}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-neutral-900 leading-tight group-hover:text-emerald-700 transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {a.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                    <Clock className="h-3.5 w-3.5" />
                    {a.readingTime} min de lecture
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    Lire le guide
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
