import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin, ClipboardCheck } from "lucide-react"
import { CITIES, SERVICES, COMPANY_ADDRESS } from "@/lib/local-seo-data"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import ServiceAreaSection from "@/components/ServiceAreaSection"

export async function generateStaticParams() {
  return CITIES.map((city) => ({ ville: city.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>
}): Promise<Metadata> {
  const { ville } = await params
  const city = CITIES.find((c) => c.slug === ville)
  if (!city) return { title: "Page non trouvée | Greenter" }

  const title = `Audit Énergétique ${city.name} (${city.postalCode}) | Greenter`
  const description = `Audit énergétique à ${city.name} par Greenter, certifié RGE. Identifiez jusqu'à 70% d'économies d'énergie, DPE inclus. Devis gratuit sous 48h en ${city.department}.`

  return {
    title,
    description,
    alternates: { canonical: `https://greenter.fr/services/audit/${city.slug}` },
    openGraph: { title, description, url: `https://greenter.fr/services/audit/${city.slug}`, siteName: "Greenter", type: "website" },
  }
}

function LocalServiceSchema({ cityName, citySlug, postalCode }: { cityName: string; citySlug: string; postalCode: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Audit Énergétique ${cityName}`,
    description: `Audit énergétique et diagnostic de performance énergétique (DPE) à ${cityName} (${postalCode}). Certifié RGE. Identification des économies d'énergie et plan de rénovation.`,
    url: `https://greenter.fr/services/audit/${citySlug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Greenter",
      url: "https://greenter.fr",
      telephone: "+33766975099",
      address: { "@type": "PostalAddress", addressLocality: COMPANY_ADDRESS.locality, postalCode: COMPANY_ADDRESS.postalCode, addressCountry: COMPANY_ADDRESS.country },
    },
    areaServed: { "@type": "City", name: cityName },
    serviceType: "Audit Énergétique et Diagnostic de Performance Énergétique",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function InternalLinksSection({ currentCitySlug, currentCityName }: { currentCitySlug: string; currentCityName: string }) {
  const otherServices = SERVICES.filter((s) => s.slug !== "audit")
  const neighboringCities = CITIES.filter((c) => c.slug !== currentCitySlug).slice(0, 12)

  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Nos autres services à {currentCityName}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all group">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">{service.name}</p>
                  <p className="text-sm text-neutral-500 mt-1">{service.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Audit énergétique dans les villes voisines</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {neighboringCities.map((city) => (
              <Link key={city.slug} href={`/services/audit/${city.slug}`} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-green-300 hover:shadow-sm transition-all group">
                <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-700 group-hover:text-green-700 transition-colors">{city.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function LocalAuditPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params
  const city = CITIES.find((c) => c.slug === ville)
  if (!city) notFound()

  const faqs = [
    { question: `Combien coûte un audit énergétique à ${city.name} ?`, answer: `Le prix d'un audit énergétique à ${city.name} (${city.postalCode}) varie entre 800€ et 1 500€ selon la taille du logement et la complexité du bâti. Des aides comme MaPrimeRénov' peuvent couvrir une partie du coût. Greenter vous accompagne dans les démarches pour obtenir ces financements.` },
    { question: `Que comprend un audit énergétique à ${city.name} ?`, answer: `L'audit énergétique réalisé par Greenter à ${city.name} comprend l'analyse complète du bâti (isolation, menuiseries, ventilation), le bilan des consommations énergétiques, un diagnostic thermique avec identification des déperditions, le classement DPE, et un plan de rénovation priorisé avec estimation des économies et des aides disponibles.` },
    { question: `Quand l'audit énergétique est-il obligatoire à ${city.name} (${city.postalCode}) ?`, answer: `En ${city.department}, l'audit énergétique est obligatoire depuis avril 2023 pour la vente de logements classés F ou G au DPE, et depuis janvier 2025 pour les logements classés E. Il est également fortement recommandé avant tout projet de rénovation énergétique pour bénéficier des aides MaPrimeRénov'.` },
    { question: `Greenter réalise-t-il des audits énergétiques à ${city.name} ?`, answer: `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department} pour réaliser des audits énergétiques certifiés RGE. Nos diagnostiqueurs qualifiés assurent l'étude complète de votre logement et vous remettent un rapport détaillé. Devis gratuit sous 48h.` },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Audit énergétique", url: "https://greenter.fr/services/audit" },
    { name: city.name, url: `https://greenter.fr/services/audit/${city.slug}` },
  ]

  return (
    <main>
      <LocalServiceSchema cityName={city.name} citySlug={city.slug} postalCode={city.postalCode} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-slate-500/20 text-slate-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">Certifié RGE</span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">Audit Énergétique à {city.name}</h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Votre expert en audit énergétique certifié RGE à {city.name} ({city.postalCode}), en {city.department}. Identifiez les économies d&apos;énergie de votre logement et planifiez votre rénovation.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white"><ClipboardCheck className="w-5 h-5 text-slate-400" /><span>Jusqu&apos;à 70% d&apos;économies identifiées</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-slate-400" /><span>Obligatoire pour vente/location</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-slate-400" /><span>Devis gratuit sous 48h</span></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander un devis gratuit<ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/audit.png" alt={`Audit énergétique à ${city.name} par Greenter`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white"><div className="container mx-auto max-w-6xl px-4 flex justify-center"><GoogleRatingBadgeClient /></div></section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Pourquoi réaliser un audit énergétique à {city.name} ?</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            À {city.name} ({city.postalCode}), en {city.department}, de nombreux logements présentent des déperditions énergétiques importantes. Greenter, votre diagnostiqueur certifié RGE, réalise un audit complet pour identifier les travaux prioritaires et maximiser vos économies d&apos;énergie.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            Nos experts interviennent à {city.name} et dans toute la {city.department} pour réaliser des audits énergétiques réglementaires (vente, location) et des audits incitatifs dans le cadre de MaPrimeRénov&apos;.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-slate-700 mb-1">70%</p><p className="text-sm text-neutral-600">d&apos;économies identifiées</p></div>
            <div className="bg-slate-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-slate-700 mb-1">DPE</p><p className="text-sm text-neutral-600">inclus dans l&apos;audit</p></div>
            <div className="bg-slate-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-slate-700 mb-1">48h</p><p className="text-sm text-neutral-600">pour votre devis gratuit</p></div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-8">Questions fréquentes - Audit énergétique à {city.name}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-neutral-900 hover:text-slate-700 transition-colors">
                  {faq.question}
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-neutral-600 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewsCarousel className="bg-white" />
      <ServiceAreaSection className="bg-neutral-50" serviceSlug="audit" />
      <InternalLinksSection currentCitySlug={city.slug} currentCityName={city.name} />

      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Prêt à réaliser votre audit énergétique à {city.name} ?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Obtenez votre devis personnalisé gratuit sous 48h. Nos experts interviennent à {city.name} et dans toute la {city.department}.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander mon devis gratuit<ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
          </div>
        </div>
      </section>
    </main>
  )
}
