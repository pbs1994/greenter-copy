import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin, Sun } from "lucide-react"
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

  const cityData = getCityData(city.slug)

  const faqs = [
    {
      question: `Combien coûte une installation solaire à ${city.name} ?`,
      answer: cityData
        ? `À ${city.name}, avec ${cityData.pctMaisons}% de maisons individuelles, la plupart des toitures sont adaptées au photovoltaïque. Le prix d'une installation varie entre 7 000€ et 20 000€ selon la puissance (3 à 9 kWc). Avec une consommation moyenne de ${cityData.consommationMoyenne} kWh/m²/an dans la commune, une installation de 6 kWc permet de couvrir 50 à 70% de vos besoins électriques. La prime à l'autoconsommation et la TVA réduite ramènent le retour sur investissement à 7 à 10 ans.`
        : `Le prix d'une installation de panneaux solaires à ${city.name} varie entre 7 000€ et 20 000€ selon la puissance (3 à 9 kWc). Avec les aides (prime à l'autoconsommation, TVA réduite), le retour sur investissement est de 7 à 10 ans.`,
    },
    {
      question: `Mon toit à ${city.name} est-il adapté au solaire ?`,
      answer: cityData
        ? `À ${city.name}, ${cityData.pctMaisons}% des logements sont des maisons individuelles avec toiture exploitable. Le parc construit ${cityData.anneeConstruction} offre des charpentes solides adaptées aux panneaux. L'idéal est une orientation sud avec une inclinaison de 30°, mais les orientations est/ouest fonctionnent aussi. Greenter réalise une étude gratuite de votre toiture avec simulation de production personnalisée.`
        : `La plupart des toitures en ${city.department} sont adaptées. L'idéal est une orientation sud avec une inclinaison de 30°, mais les orientations est/ouest fonctionnent aussi. Greenter réalise une étude gratuite de votre toiture.`,
    },
    {
      question: `Quelles aides pour le solaire à ${city.name} (${city.postalCode}) ?`,
      answer: cityData
        ? `Avec ${cityData.pctChauffageElec}% de logements chauffés à l'électricité à ${city.name}, l'autoconsommation solaire est particulièrement rentable car elle réduit directement la facture de chauffage. Les habitants de ${city.name} bénéficient de la prime à l'autoconsommation (jusqu'à 2 340€), de la TVA réduite à 10%, du tarif de rachat EDF OA, et de l'éco-PTZ. ${cityData.pctPassoiresThermiques >= 15 ? `Avec ${cityData.pctPassoiresThermiques}% de passoires thermiques dans la commune, le solaire contribue à améliorer le DPE de votre logement.` : ''} Greenter vous accompagne dans toutes les démarches.`
        : `Les habitants de ${city.name} bénéficient de la prime à l'autoconsommation (jusqu'à 2 340€), de la TVA réduite à 10%, du tarif de rachat EDF OA, et de l'éco-PTZ. Greenter vous accompagne dans toutes les démarches.`,
    },
    {
      question: `Greenter installe-t-il des panneaux solaires à ${city.name} ?`,
      answer: cityData
        ? `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department}. Nous connaissons bien le parc immobilier local, construit majoritairement ${cityData.anneeConstruction}, avec ${cityData.pctMaisons}% de maisons individuelles. Nos installateurs certifiés RGE QualiPV assurent l'étude, la pose et le raccordement de vos panneaux solaires. Devis gratuit sous 48h.`
        : `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department}. Nos installateurs certifiés RGE QualiPV assurent l'étude, la pose et le raccordement. Devis gratuit sous 48h.`,
    },
    ...(cityData && cityData.pctChauffageElec >= 25 ? [{
      question: `Peut-on coupler panneaux solaires et pompe à chaleur à ${city.name} ?`,
      answer: `Absolument, et c'est une combinaison idéale à ${city.name} où ${cityData.pctChauffageElec}% des logements sont chauffés à l'électricité. Les panneaux solaires produisent l'électricité consommée par la pompe à chaleur, ce qui réduit encore davantage votre facture énergétique. Avec une consommation moyenne de ${cityData.consommationMoyenne} kWh/m²/an dans la commune, le couplage PAC + solaire permet de couvrir jusqu'à 70% de vos besoins en chauffage et eau chaude grâce à l'énergie solaire. Greenter, certifié RGE QualiPV et QualiPAC, installe les deux équipements de manière coordonnée pour une performance optimale.`,
    }] : []),
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

          {cityData && (
            <>
              {/* Bloc chiffres clés */}
              <div className="mt-10 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-4">
                  {city.name} en chiffres — Potentiel solaire local
                </h3>
                <p className="text-neutral-600 mb-5">{cityData.caracteristique}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-700">{cityData.population.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-neutral-500">habitants</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-700">{cityData.pctMaisons}%</p>
                    <p className="text-xs text-neutral-500">de maisons individuelles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-700">{cityData.logements.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-neutral-500">logements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-700">{cityData.potentielSolaire}</p>
                    <p className="text-xs text-neutral-500">potentiel solaire</p>
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
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{cityData.pctChauffageElec}%</p>
                    <p className="text-xs text-neutral-600">de chauffage électrique</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">{cityData.consommationMoyenne} kWh/m²</p>
                    <p className="text-xs text-neutral-600">consommation moyenne/an</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{cityData.pctPassoiresThermiques}%</p>
                    <p className="text-xs text-neutral-600">de passoires thermiques (F-G)</p>
                  </div>
                </div>

                {/* Contexte énergétique unique */}
                <div className="bg-neutral-50 rounded-xl p-5">
                  <h4 className="font-semibold text-neutral-900 mb-2">Contexte énergétique local</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{cityData.contexteEnergetique}</p>
                </div>

                {/* Recommandation solaire */}
                <div className="mt-4 bg-amber-50 rounded-xl p-5 border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-800 mb-1">Notre recommandation solaire pour {city.name}</h4>
                  <p className="text-amber-700 text-sm">
                    {cityData.pctChauffageElec >= 25
                      ? `Avec ${cityData.pctChauffageElec}% de chauffage électrique, les panneaux solaires en autoconsommation sont particulièrement rentables à ${city.name}. L'électricité produite couvre directement une partie de la consommation de chauffage et réduit significativement la facture.`
                      : `Avec ${cityData.pctMaisons}% de maisons individuelles, ${city.name} offre un excellent potentiel pour l'installation de panneaux solaires en toiture. L'autoconsommation permet de réduire vos factures d'électricité et de valoriser votre patrimoine immobilier.`
                    }
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
