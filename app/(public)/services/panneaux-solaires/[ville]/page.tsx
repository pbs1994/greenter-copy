import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin, Sun } from "lucide-react"
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

  const title = `Panneaux Solaires ${city.name} (${city.postalCode}) | Greenter`
  const description = `Installation panneaux solaires à ${city.name} par Greenter, certifié RGE QualiPV. Autoconsommation, économies jusqu'à 70%. Devis gratuit sous 48h en ${city.department}.`

  return {
    title,
    description,
    alternates: { canonical: `https://greenter.fr/services/panneaux-solaires/${city.slug}` },
    openGraph: { title, description, url: `https://greenter.fr/services/panneaux-solaires/${city.slug}`, siteName: "Greenter", type: "website" },
  }
}

function LocalServiceSchema({ cityName, citySlug, postalCode }: { cityName: string; citySlug: string; postalCode: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Installation Panneaux Solaires ${cityName}`,
    description: `Installation de panneaux solaires photovoltaïques à ${cityName} (${postalCode}). Certifié RGE QualiPV. Autoconsommation et revente.`,
    url: `https://greenter.fr/services/panneaux-solaires/${citySlug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Greenter",
      url: "https://greenter.fr",
      telephone: "+33609455056",
      address: { "@type": "PostalAddress", addressLocality: COMPANY_ADDRESS.locality, postalCode: COMPANY_ADDRESS.postalCode, addressCountry: COMPANY_ADDRESS.country },
    },
    areaServed: { "@type": "City", name: cityName },
    serviceType: "Installation Panneaux Solaires Photovoltaïques",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function InternalLinksSection({ currentCitySlug, currentCityName }: { currentCitySlug: string; currentCityName: string }) {
  const otherServices = SERVICES.filter((s) => s.slug !== "panneaux-solaires")
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Panneaux solaires dans les villes voisines</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {neighboringCities.map((city) => (
              <Link key={city.slug} href={`/services/panneaux-solaires/${city.slug}`} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-green-300 hover:shadow-sm transition-all group">
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

export default async function LocalSolairePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params
  const city = CITIES.find((c) => c.slug === ville)
  if (!city) notFound()

  const faqs = [
    { question: `Combien coûte une installation solaire à ${city.name} ?`, answer: `Le prix d'une installation de panneaux solaires à ${city.name} varie entre 7 000€ et 20 000€ selon la puissance (3 à 9 kWc). Avec les aides (prime à l'autoconsommation, TVA réduite), le retour sur investissement est de 7 à 10 ans.` },
    { question: `Mon toit à ${city.name} est-il adapté au solaire ?`, answer: `La plupart des toitures en ${city.department} sont adaptées. L'idéal est une orientation sud avec une inclinaison de 30°, mais les orientations est/ouest fonctionnent aussi. Greenter réalise une étude gratuite de votre toiture.` },
    { question: `Quelles aides pour le solaire à ${city.name} (${city.postalCode}) ?`, answer: `Les habitants de ${city.name} bénéficient de la prime à l'autoconsommation (jusqu'à 2 340€), de la TVA réduite à 10%, du tarif de rachat EDF OA, et de l'éco-PTZ. Greenter vous accompagne dans toutes les démarches.` },
    { question: `Greenter installe-t-il des panneaux solaires à ${city.name} ?`, answer: `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department}. Nos installateurs certifiés RGE QualiPV assurent l'étude, la pose et le raccordement. Devis gratuit sous 48h.` },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Panneaux solaires", url: "https://greenter.fr/services/panneaux-solaires" },
    { name: city.name, url: `https://greenter.fr/services/panneaux-solaires/${city.slug}` },
  ]

  return (
    <main>
      <LocalServiceSchema cityName={city.name} citySlug={city.slug} postalCode={city.postalCode} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">Certifié RGE QualiPV</span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">Installation Panneaux Solaires à {city.name}</h1>
              <p className="text-amber-100 text-lg leading-relaxed mb-8">
                Votre installateur de panneaux solaires certifié RGE à {city.name} ({city.postalCode}), en {city.department}. Passez à l&apos;autoconsommation et réduisez vos factures d&apos;électricité jusqu&apos;à 70%.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white"><Sun className="w-5 h-5 text-amber-400" /><span>Jusqu&apos;à 70% d&apos;économies</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-amber-400" /><span>Prime autoconsommation</span></div>
                <div className="flex items-center gap-2 text-white"><CheckCircle className="w-5 h-5 text-amber-400" /><span>Devis gratuit sous 48h</span></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander un devis gratuit<ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-amber-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/solaire.jpg" alt={`Installation panneaux solaires à ${city.name} par Greenter`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white"><div className="container mx-auto max-w-6xl px-4 flex justify-center"><GoogleRatingBadgeClient /></div></section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Pourquoi installer des panneaux solaires à {city.name} ?</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            À {city.name} ({city.postalCode}), en {city.department}, l&apos;ensoleillement permet une production solaire performante. Greenter, votre installateur certifié RGE QualiPV, vous accompagne de l&apos;étude à la mise en service.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            Nos techniciens interviennent à {city.name} et dans toute la {city.department} pour l&apos;installation de panneaux solaires en autoconsommation avec ou sans revente du surplus à EDF OA.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-amber-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-amber-700 mb-1">70%</p><p className="text-sm text-neutral-600">d&apos;économies sur l&apos;électricité</p></div>
            <div className="bg-amber-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-amber-700 mb-1">25 ans</p><p className="text-sm text-neutral-600">de garantie panneaux</p></div>
            <div className="bg-amber-50 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-amber-700 mb-1">48h</p><p className="text-sm text-neutral-600">pour votre devis gratuit</p></div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-8">Questions fréquentes - Panneaux solaires à {city.name}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-neutral-900 hover:text-amber-700 transition-colors">
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
      <ServiceAreaSection className="bg-neutral-50" serviceSlug="panneaux-solaires" />
      <InternalLinksSection currentCitySlug={city.slug} currentCityName={city.name} />

      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Prêt à passer au solaire à {city.name} ?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">Obtenez votre devis personnalisé gratuit sous 48h. Nos experts interviennent à {city.name} et dans toute la {city.department}.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">Demander mon devis gratuit<ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+33766975099" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-amber-900 text-base px-8 py-4"><Phone className="w-5 h-5" />07 66 97 50 99</a>
          </div>
        </div>
      </section>
    </main>
  )
}
