import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// FAQ dépliable + cartes de liens internes + liens vers les pages villes PAC.
// Partagé par les articles du cluster pompe à chaleur (nov. 2026).

export function ArticleFaq({ title, items }: { title: string; items: { question: string; answer: string }[] }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">{title}</h2>
      <div className="space-y-4 my-8">
        {items.map((faq, i) => (
          <details key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:text-emerald-700 transition-colors">
              {faq.question}
              <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">{faq.answer}</div>
          </details>
        ))}
      </div>
    </>
  )
}

export interface LinkCard {
  href: string
  kicker: string
  title: string
  cta: string
}

export function ArticleLinkCards({ cards }: { cards: LinkCard[] }) {
  return (
    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{card.kicker}</p>
          <p className="mt-1 font-bold text-slate-900 group-hover:text-emerald-700">{card.title}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-600">
            {card.cta} <ArrowRight className="h-3.5 w-3.5" />
          </p>
        </Link>
      ))}
    </div>
  )
}

export function PacCityLinks({ cities }: { cities: { name: string; slug: string }[] }) {
  return (
    <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Pompe à chaleur par ville en Île-de-France
      </p>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/services/pompe-a-chaleur/${city.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
          >
            Pompe à chaleur {city.name} <ArrowRight className="h-3 w-3" />
          </Link>
        ))}
      </div>
    </div>
  )
}
