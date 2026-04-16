import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin, Shield } from "lucide-react"
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

  const title = `Isolation Thermique ${city.name} (${city.postalCode}) | Greenter`
  const description = `Isolation thermique à ${city.name} par Greenter, certifié RGE Qualibat. Combles, murs, planchers. Jusqu'à 30% d'économies de chauffage. Devis gratuit sous 48h en ${city.department}.`

  return {
    title,
    description,
    alternates: { canonical: `https://greenter.fr/services/isolation/${city.slug}` },
    openGraph: { title, description, url: `https://greenter.fr/services/isolation/${city.slug}`, siteName: "Greenter", type: "website" },
  }
}

function LocalServiceSchema({ cityName, citySlug, postalCode }: { cityName: string; citySlug: string; postalCode: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Isolation Thermique ${cityName}`,
    description: `Travaux d'isolation thermique à ${cityName} (${postalCode}). Certifié RGE Qualibat. Combles, murs extérieurs et planchers bas.`,
    url: `https://greenter.fr/services/isolation/${citySlug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Greenter",
      url: "https://greenter.fr",
      telephone: "+33609455056",
      address: { "@type": "PostalAddress", addressLocality: COMPANY_ADDRESS.locality, postalCode: COMPANY_ADDRESS.postalCode, addressCountry: COMPANY_ADDRESS.country },
    },
    areaServed: { "@type": "City", name: cityName },
    serviceType: "Isolation Thermique",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function InternalLinksSection({ currentCitySlug, currentCityName }: { currentCitySlug: string; currentCityName: string }) {
  const otherServices = SERVICES.filter((s) => s.slug !== "isolation")
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Isolation thermique dans les villes voisines</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {neighboringCities.map((city) => (
              <Link key={city.slug} href={`/services/isolation/${city.slug}`} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-green-300 hover:shadow-sm transition-all group">
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

export default async function LocalIsolationPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params
  const city = CITIES.find((c) => c.slug === ville)
  if (!city) notFound()

  const faqs = [
    { question: `Combien coûte une isolation thermique à ${city.name} ?`, answer: `Le coût de l'isolation thermique à ${city.name} (${city.postalCode}) dépend du type de travaux : isolation des combles à partir de 20€/m², isolation des murs par l'extérieur entre 100€ et 180€/m², isolation des planchers bas à partir de 30€/m². Avec les aides MaPrimeRénov' et les CEE, le reste à charge peut être considérablement réduit.` },
    { question: `Quels types d'isolation propose Greenter à ${city.name} ?`, answer: `Greenter réalise tous les types d'isolation thermique à ${city.name} et en ${city.department} : isolation des combles perdus et aménagés, isolation des murs par l'intérieur (ITI) et par l'extérieur (ITE), ainsi que l'isolation des planchers bas. Nos techniciens certifiés RGE Qualibat utilisent des matériaux performants et durables.` },
    { question: `Quelles aides pour l'isolation à ${city.name} (${city.postalCode}) ?`, answer: `Les habitants de ${city.name} peuvent bénéficier de MaPrimeRénov' (jusqu'à 75€/m² pour l'ITE), des Certificats d'Économies d'Énergie (CEE), de la TVA réduite à 5,5%, et de l'éco-PTZ jusqu'à 50 000€. Greenter vous accompagne dans le montage de tous vos dossiers d'aides en ${city.department}.` },
    { question: `Greenter réalise-t-il des travaux d'isolation à ${city.name} ?`, answer: `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department} pour vos travaux d'isolation thermique. Nos artisans certifiés RGE Qualibat assurent l'étude thermique, la préconisation des travaux et la réalisation. Devis gratuit sous 48h.` },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Isolation thermique", url: "https://greenter.fr/services/isolation" },
    { name: city.name, url: `https://greenter.fr/services/isolation/${city.slug}` },
  ]

  return (
    <main>
      <LocalServiceSchema cityName={city.name} citySlug={city.slug} postalCode={city.postalCode} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-500/20 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">Certifié RGE Qualibat</span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">Isolation Thermique à {city.name}</h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                Votre spécialiste de l&apos;isolation thermique certifié RGE à {city.name} ({city.postalCode}), en {city.department}. Améliorez le confort de votre logement et réduisez vos factures de chauffage jusqu&apos;à 30%.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white"><Shield className="w-5 h-5 text-blue-400" /><span>Jusqu&apos;à 30% d&apos;économies de chauffage</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-blue-400" /><span>Confort été comme hiver</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-blue-400" /><span>Devis gratuit sous 48h</span></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander un devis gratuit<ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-blue-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/isolation.jpg" alt={`Isolation thermique à ${city.name} par Greenter`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white"><div className="container mx-auto max-w-6xl px-4 flex justify-center"><GoogleRatingBadgeClient /></div></section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Pourquoi isoler votre logement à {city.name} ?</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            À {city.name} ({city.postalCode}), en {city.department}, une bonne isolation thermique est essentielle pour garantir votre confort et maîtriser vos dépenses énergétiques. Greenter, certifié RGE Qualibat, vous accompagne dans le choix et la réalisation de vos travaux d&apos;isolation.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            Nos techniciens interviennent à {city.name} et dans toute la {city.department} pour l&apos;isolation des combles, des murs et des planchers bas. Nous utilisons des matériaux performants pour une isolation durable et efficace.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-blue-700 mb-1">30%</p><p className="text-sm text-neutral-600">d&apos;économies de chauffage</p></div>
            <div className="bg-blue-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-blue-700 mb-1">10 ans</p><p className="text-sm text-neutral-600">de garantie travaux</p></div>
            <div className="bg-blue-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-blue-700 mb-1">48h</p><p className="text-sm text-neutral-600">pour votre devis gratuit</p></div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-8">Questions fréquentes - Isolation thermique à {city.name}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-neutral-900 hover:text-blue-700 transition-colors">
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
      <ServiceAreaSection className="bg-neutral-50" serviceSlug="isolation" />
      <InternalLinksSection currentCitySlug={city.slug} currentCityName={city.name} />

      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Prêt à isoler votre logement à {city.name} ?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Obtenez votre devis personnalisé gratuit sous 48h. Nos experts interviennent à {city.name} et dans toute la {city.department}.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander mon devis gratuit<ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-blue-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
          </div>
        </div>
      </section>
    </main>
  )
}
