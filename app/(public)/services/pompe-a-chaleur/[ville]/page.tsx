// =============================================================================
// Page locale PAC par ville - Route dynamique /services/pompe-a-chaleur/[ville]
// =============================================================================

import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin } from "lucide-react"
import { CITIES, SERVICES, COMPANY_ADDRESS } from "@/lib/local-seo-data"
import { getCityData } from "@/lib/city-data"
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

  if (!city) {
    return { title: "Page non trouvée | Greenter" }
  }

  const title = `Pompe à Chaleur ${city.name} (${city.postalCode}) | Greenter`
  const description = `Installation pompe à chaleur à ${city.name} par Greenter, certifié RGE QualiPAC. Jusqu'à 70% d'économies. Devis gratuit sous 48h. Intervention en Seine-et-Marne.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://greenter.fr/services/pompe-a-chaleur/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://greenter.fr/services/pompe-a-chaleur/${city.slug}`,
      siteName: "Greenter",
      type: "website",
    },
  }
}

function LocalServiceSchema({ cityName, citySlug, postalCode }: { cityName: string; citySlug: string; postalCode: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Installation Pompe à Chaleur ${cityName}`,
    description: `Installation de pompe à chaleur à ${cityName} (${postalCode}). Certifié RGE QualiPAC. Jusqu'à 70% d'économies sur votre chauffage.`,
    url: `https://greenter.fr/services/pompe-a-chaleur/${citySlug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Greenter",
      url: "https://greenter.fr",
      telephone: "+33609455056",
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_ADDRESS.locality,
        postalCode: COMPANY_ADDRESS.postalCode,
        addressCountry: COMPANY_ADDRESS.country,
      },
    },
    areaServed: { "@type": "City", name: cityName },
    serviceType: "Installation Pompe à Chaleur",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function InternalLinksSection({ currentCitySlug, currentCityName }: { currentCitySlug: string; currentCityName: string }) {
  const otherServices = SERVICES.filter((s) => s.slug !== "pompe-a-chaleur")
  const neighboringCities = CITIES.filter((c) => c.slug !== currentCitySlug)

  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Nos autres services à {currentCityName}
          </h2>
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Pompe à chaleur dans les villes voisines
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {neighboringCities.map((city) => (
              <Link key={city.slug} href={`/services/pompe-a-chaleur/${city.slug}`} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-green-300 hover:shadow-sm transition-all group">
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

export default async function LocalPACPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params
  const city = CITIES.find((c) => c.slug === ville)

  if (!city) notFound()

  const cityData = getCityData(city.slug)

  const faqs = [
    {
      question: `Combien coûte l'installation d'une pompe à chaleur à ${city.name} ?`,
      answer: `Le coût d'installation d'une pompe à chaleur à ${city.name} varie entre 8 000€ et 18 000€ selon le modèle (air-eau ou air-air) et la surface de votre logement. Grâce aux aides MaPrimeRénov' et CEE, le reste à charge peut être réduit de 50 à 70%.`,
    },
    {
      question: `Quelles aides pour une pompe à chaleur à ${city.name} (${city.postalCode}) ?`,
      answer: `Les habitants de ${city.name} peuvent bénéficier de MaPrimeRénov' (jusqu'à 5 000€), des primes CEE, de l'éco-PTZ (jusqu'à 50 000€) et d'une TVA réduite à 5,5%. Greenter vous accompagne dans toutes les démarches administratives.`,
    },
    {
      question: `Greenter intervient-il à ${city.name} pour installer une PAC ?`,
      answer: `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department}. Nos techniciens certifiés RGE QualiPAC réalisent l'étude, l'installation et la mise en service de votre pompe à chaleur. Devis gratuit sous 48h.`,
    },
    {
      question: `Quelle pompe à chaleur choisir à ${city.name} ?`,
      answer: `Pour un logement à ${city.name}, nous recommandons généralement une PAC air-eau pour le chauffage central et l'eau chaude, ou une PAC air-air pour un chauffage d'appoint performant. Notre audit gratuit détermine la solution idéale pour votre logement.`,
    },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Pompe à chaleur", url: "https://greenter.fr/services/pompe-a-chaleur" },
    { name: city.name, url: `https://greenter.fr/services/pompe-a-chaleur/${city.slug}` },
  ]

  return (
    <main>
      <LocalServiceSchema cityName={city.name} citySlug={city.slug} postalCode={city.postalCode} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-teal-900 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Certifié RGE QualiPAC
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Installation Pompe à Chaleur à {city.name}
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-8">
                Votre installateur de pompe à chaleur certifié RGE à {city.name} ({city.postalCode}), en {city.department}.
                Profitez d&apos;un chauffage performant et économique, éligible aux aides de l&apos;État. Jusqu&apos;à 70% d&apos;économies sur vos factures.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-teal-400" /><span>Jusqu&apos;à 70% d&apos;économies</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-teal-400" /><span>Éligible MaPrimeRénov&apos;</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-teal-400" /><span>Devis gratuit sous 48h</span></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander un devis gratuit<ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-green-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/pac.jpg" alt={`Installation pompe à chaleur à ${city.name} par Greenter`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white">
        <div className="container mx-auto max-w-6xl px-4 flex justify-center">
          <GoogleRatingBadgeClient />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Pourquoi installer une pompe à chaleur à {city.name} ?
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            À {city.name} ({city.postalCode}), en {city.department}, la pompe à chaleur est la solution idéale pour réduire vos factures de chauffage tout en améliorant votre confort. Greenter, votre installateur certifié RGE, vous accompagne dans votre projet de A à Z.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            Nos techniciens interviennent à {city.name} et dans toute la {city.department} pour l&apos;installation de pompes à chaleur air-eau et air-air. Bénéficiez des aides MaPrimeRénov&apos; et des primes CEE pour réduire le coût de votre installation.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-green-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-green-700 mb-1">70%</p><p className="text-sm text-neutral-600">d&apos;économies sur le chauffage</p></div>
            <div className="bg-green-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-green-700 mb-1">48h</p><p className="text-sm text-neutral-600">pour recevoir votre devis</p></div>
            <div className="bg-green-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-green-700 mb-1">10 ans</p><p className="text-sm text-neutral-600">de garantie décennale</p></div>
          </div>

          {cityData && (
            <>
              <div className="mt-10 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-4">
                  {city.name} en chiffres — Le parc immobilier local
                </h3>
                <p className="text-neutral-600 mb-4">{cityData.caracteristique}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">{cityData.population.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-neutral-500">habitants</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">{cityData.pctMaisons}%</p>
                    <p className="text-xs text-neutral-500">de maisons individuelles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">DPE {cityData.dpeMoyen}</p>
                    <p className="text-xs text-neutral-500">étiquette moyenne</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">{cityData.economieChauffage}</p>
                    <p className="text-xs text-neutral-500">d&apos;économies/an avec PAC</p>
                  </div>
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-3">Sources : INSEE 2022, ADEME, Météo France. Zone climatique {cityData.zoneClimatique}, {cityData.dju} DJU. Parc construit majoritairement {cityData.anneeConstruction}.</p>
            </>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
            Questions fréquentes - Pompe à chaleur à {city.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-neutral-900 hover:text-green-700 transition-colors">
                  {faq.question}
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewsCarousel className="bg-neutral-50" />
      <ServiceAreaSection className="bg-white" />
      <InternalLinksSection currentCitySlug={city.slug} currentCityName={city.name} />

      <section className="py-16 md:py-20 bg-gradient-to-br from-green-900 via-green-800 to-teal-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à installer votre pompe à chaleur à {city.name} ?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Obtenez votre devis personnalisé gratuit sous 48h. Nos experts interviennent à {city.name} et dans toute la {city.department}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander mon devis gratuit<ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-green-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
          </div>
        </div>
      </section>
    </main>
  )
}
