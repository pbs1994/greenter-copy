import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

interface ArticleCTAProps {
  title: string
  description: string
  phone?: string
}

export function ArticleCTA({
  title,
  description,
  phone = '07 66 97 50 99',
}: ArticleCTAProps) {
  return (
    <div className="my-12 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-emerald-100 mb-6 max-w-lg mx-auto">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          Demander un devis gratuit
          <ArrowRight className="w-5 h-5" />
        </Link>
        <a
          href={`tel:+33${phone.replace(/\s/g, '').replace(/^0/, '')}`}
          className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/30 transition-colors"
        >
          <Phone className="w-5 h-5" />
          {phone}
        </a>
      </div>
    </div>
  )
}
