import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin, Shield } from "lucide-react"
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

  const cityData = getCityData(city.slug)

  const faqs = [
    {
      question: `Combien coûte une isolation thermique à ${city.name} ?`,
      answer: cityData
        ? `À ${city.name}, où la consommation moyenne atteint ${cityData.consommationMoyenne} kWh/m²/an et ${cityData.pctPassoiresThermiques}% des logements sont des passoires thermiques, l'isolation est un investissement particulièrement rentable. Le coût dépend du type de travaux : isolation des combles à partir de 20€/m², isolation des murs par l'extérieur (ITE) entre 100€ et 180€/m², isolation des planchers bas à partir de 30€/m². Avec les aides MaPrimeRénov' et les CEE, le reste à charge peut être considérablement réduit.`
        : `Le coût de l'isolation thermique à ${city.name} (${city.postalCode}) dépend du type de travaux : isolation des combles à partir de 20€/m², isolation des murs par l'extérieur entre 100€ et 180€/m², isolation des planchers bas à partir de 30€/m². Avec les aides MaPrimeRénov' et les CEE, le reste à charge peut être considérablement réduit.`,
    },
    {
      question: `Quels types d'isolation propose Greenter à ${city.name} ?`,
      answer: cityData
        ? `Le parc immobilier de ${city.name}, construit majoritairement ${cityData.anneeConstruction}, nécessite souvent une isolation des combles en priorité (30% des déperditions). Greenter réalise tous les types d'isolation thermique à ${city.name} et en ${city.department} : isolation des combles perdus et aménagés, isolation des murs par l'intérieur (ITI) et par l'extérieur (ITE), ainsi que l'isolation des planchers bas. Nos techniciens certifiés RGE Qualibat utilisent des matériaux performants et durables, adaptés aux constructions ${cityData.anneeConstruction} typiques de la commune.`
        : `Greenter réalise tous les types d'isolation thermique à ${city.name} et en ${city.department} : isolation des combles perdus et aménagés, isolation des murs par l'intérieur (ITI) et par l'extérieur (ITE), ainsi que l'isolation des planchers bas. Nos techniciens certifiés RGE Qualibat utilisent des matériaux performants et durables.`,
    },
    {
      question: `Quelles aides pour l'isolation à ${city.name} (${city.postalCode}) ?`,
      answer: cityData
        ? `Avec ${cityData.pctPassoiresThermiques}% de logements classés F ou G à ${city.name}, de nombreux foyers sont éligibles aux aides maximales. Les habitants peuvent bénéficier de MaPrimeRénov' (jusqu'à 75€/m² pour l'ITE), des Certificats d'Économies d'Énergie (CEE), de la TVA réduite à 5,5%, et de l'éco-PTZ jusqu'à 50 000€. Greenter vous accompagne dans le montage de tous vos dossiers d'aides en ${city.department}.`
        : `Les habitants de ${city.name} peuvent bénéficier de MaPrimeRénov' (jusqu'à 75€/m² pour l'ITE), des Certificats d'Économies d'Énergie (CEE), de la TVA réduite à 5,5%, et de l'éco-PTZ jusqu'à 50 000€. Greenter vous accompagne dans le montage de tous vos dossiers d'aides en ${city.department}.`,
    },
    {
      question: `Greenter réalise-t-il des travaux d'isolation à ${city.name} ?`,
      answer: cityData
        ? `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department} pour vos travaux d'isolation thermique. Grâce à notre connaissance approfondie du parc immobilier local — ${cityData.pctMaisons}% de maisons individuelles, constructions ${cityData.anneeConstruction}, zone climatique ${cityData.zoneClimatique} (${cityData.dju} DJU) — nos artisans certifiés RGE Qualibat assurent l'étude thermique, la préconisation des travaux et la réalisation. Devis gratuit sous 48h.`
        : `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department} pour vos travaux d'isolation thermique. Nos artisans certifiés RGE Qualibat assurent l'étude thermique, la préconisation des travaux et la réalisation. Devis gratuit sous 48h.`,
    },
    ...(cityData && cityData.pctPassoiresThermiques >= 20
      ? [{
          question: `Mon logement à ${city.name} est-il une passoire thermique ?`,
          answer: `À ${city.name}, ${cityData.pctPassoiresThermiques}% des logements sont classés F ou G au DPE (Diagnostic de Performance Énergétique), ce qui les qualifie de passoires thermiques. Pour le savoir, consultez votre DPE existant ou demandez un nouveau diagnostic. Attention aux échéances réglementaires : depuis 2025, les logements classés G sont interdits à la location, les logements F le seront en 2028, et les logements E en 2034. Si votre bien est concerné, l'isolation thermique est la première étape pour améliorer votre classement DPE et rester en conformité. Greenter vous accompagne de l'audit à la réalisation des travaux.`,
        }]
      : []),
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

          {cityData && (
            <>
              {/* Bloc chiffres clés */}
              <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-4">
                  {city.name} en chiffres — Le parc immobilier local
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700">{cityData.population.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-neutral-500">habitants</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{cityData.pctPassoiresThermiques}%</p>
                    <p className="text-xs text-neutral-500">de passoires thermiques</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700">{cityData.consommationMoyenne} kWh/m²</p>
                    <p className="text-xs text-neutral-500">consommation moyenne/an</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700">{cityData.anneeConstruction}</p>
                    <p className="text-xs text-neutral-500">construction dominante</p>
                  </div>
                </div>
              </div>

              {/* Profil énergétique détaillé */}
              <div className="mt-6 p-6 bg-white rounded-2xl border border-neutral-200">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-4">
                  Profil énergétique de {city.name}
                </h3>

                {/* Barres de répartition chauffage */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-neutral-700 mb-3">Répartition du chauffage à {city.name}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 w-20">Gaz</span>
                      <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                        <div className="bg-orange-400 h-full rounded-full" style={{ width: `${cityData.pctChauffageGaz}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-neutral-700 w-10 text-right">{cityData.pctChauffageGaz}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 w-20">Électrique</span>
                      <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                        <div className="bg-blue-400 h-full rounded-full" style={{ width: `${cityData.pctChauffageElec}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-neutral-700 w-10 text-right">{cityData.pctChauffageElec}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 w-20">Fioul</span>
                      <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                        <div className="bg-red-400 h-full rounded-full" style={{ width: `${cityData.pctChauffageFioul}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-neutral-700 w-10 text-right">{cityData.pctChauffageFioul}%</span>
                    </div>
                  </div>
                </div>

                {/* Stats clés énergie */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{cityData.pctPassoiresThermiques}%</p>
                    <p className="text-xs text-neutral-600">de passoires thermiques (F-G)</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{cityData.consommationMoyenne} kWh/m²</p>
                    <p className="text-xs text-neutral-600">consommation moyenne/an</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{cityData.logements.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-neutral-600">logements au total</p>
                  </div>
                </div>

                {/* Contexte énergétique unique */}
                <div className="bg-neutral-50 rounded-xl p-5">
                  <h4 className="font-semibold text-neutral-900 mb-2">Contexte énergétique local</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{cityData.contexteEnergetique}</p>
                </div>

                {/* Recommandation isolation */}
                <div className="mt-4 bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-1">Notre recommandation isolation pour {city.name}</h4>
                  <p className="text-blue-700 text-sm">
                    Avec {cityData.pctPassoiresThermiques}% de passoires thermiques et un parc construit {cityData.anneeConstruction}, l&apos;isolation des combles et murs est prioritaire à {city.name}. La consommation moyenne de {cityData.consommationMoyenne} kWh/m²/an peut être réduite de 30% avec une isolation performante.
                  </p>
                </div>
              </div>

              <p className="text-neutral-400 text-xs mt-3">Sources : INSEE 2022, ADEME, base DPE, Météo France. Zone climatique {cityData.zoneClimatique}, {cityData.dju} DJU. Parc construit majoritairement {cityData.anneeConstruction}. Données indicatives à l&apos;échelle communale.</p>
            </>
          )}
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
