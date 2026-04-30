// =============================================================================
// Page locale PAC par ville - Route dynamique /services/pompe-a-chaleur/[ville]
// =============================================================================

import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Phone, MapPin, Shield, Clock, Star, Zap } from "lucide-react"
import { CITIES, SERVICES, COMPANY_ADDRESS, COMPANY_PHONES } from "@/lib/local-seo-data"
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
      canonical: `https://www.greenter.fr/services/pompe-a-chaleur/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.greenter.fr/services/pompe-a-chaleur/${city.slug}`,
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
    url: `https://www.greenter.fr/services/pompe-a-chaleur/${citySlug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Greenter",
      url: "https://www.greenter.fr",
      telephone: COMPANY_PHONES.primary.raw,
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
      answer: cityData
        ? `À ${city.name}, où ${cityData.pctChauffageGaz}% des logements sont chauffés au gaz et la consommation moyenne atteint ${cityData.consommationMoyenne} kWh/m²/an, le coût d'une PAC varie entre 8 000€ et 18 000€ selon le modèle. Avec MaPrimeRénov' et les CEE, le reste à charge peut être réduit de 50 à 70%, soit une économie de ${cityData.economieChauffage} par an sur votre facture.`
        : `Le coût d'installation d'une pompe à chaleur à ${city.name} varie entre 8 000€ et 18 000€ selon le modèle (air-eau ou air-air) et la surface de votre logement. Grâce aux aides MaPrimeRénov' et CEE, le reste à charge peut être réduit de 50 à 70%.`,
    },
    {
      question: `Quelles aides pour une pompe à chaleur à ${city.name} (${city.postalCode}) ?`,
      answer: `Les habitants de ${city.name} (${city.postalCode}) en ${city.department} peuvent bénéficier de MaPrimeRénov' (jusqu'à 5 000€), des primes CEE, de l'éco-PTZ (jusqu'à 50 000€) et d'une TVA réduite à 5,5%. ${cityData ? `Avec ${cityData.pctPassoiresThermiques}% de passoires thermiques dans la commune, de nombreux foyers sont éligibles aux aides les plus élevées.` : ''} Greenter vous accompagne dans toutes les démarches.`,
    },
    {
      question: `Greenter intervient-il à ${city.name} pour installer une PAC ?`,
      answer: `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department}. ${cityData ? `Nous connaissons bien le parc immobilier local, construit majoritairement ${cityData.anneeConstruction}, avec ${cityData.pctMaisons}% de maisons individuelles.` : ''} Nos techniciens certifiés RGE QualiPAC réalisent l'étude, l'installation et la mise en service. Devis gratuit sous 48h.`,
    },
    {
      question: `Quelle pompe à chaleur choisir à ${city.name} ?`,
      answer: cityData
        ? `${cityData.recommendationPAC} À ${city.name}, avec un parc construit ${cityData.anneeConstruction} et ${cityData.pctChauffageGaz}% de chauffage gaz, la PAC air-eau est le choix le plus fréquent. Notre audit gratuit détermine la solution idéale pour votre logement.`
        : `Pour un logement à ${city.name}, nous recommandons généralement une PAC air-eau pour le chauffage central et l'eau chaude, ou une PAC air-air pour un chauffage d'appoint performant. Notre audit gratuit détermine la solution idéale pour votre logement.`,
    },
    ...(cityData && cityData.pctChauffageFioul >= 10 ? [{
      question: `Peut-on remplacer une chaudière fioul par une PAC à ${city.name} ?`,
      answer: `Absolument, et c'est même urgent : à ${city.name}, ${cityData.pctChauffageFioul}% des logements sont encore chauffés au fioul. L'interdiction d'installer de nouvelles chaudières fioul est en vigueur depuis 2022, et le remplacement sera obligatoire d'ici 2028. La PAC air-eau remplace directement la chaudière fioul sur le circuit de radiateurs existant. La prime "coup de pouce chauffage" peut atteindre 5 000€ pour ce type de remplacement.`,
    }] : []),
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
    { name: "Pompe à chaleur", url: "https://www.greenter.fr/services/pompe-a-chaleur" },
    { name: city.name, url: `https://www.greenter.fr/services/pompe-a-chaleur/${city.slug}` },
  ]

  return (
    <main>
      <LocalServiceSchema cityName={city.name} citySlug={city.slug} postalCode={city.postalCode} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      {/* ============================================================= */}
      {/* HERO SECTION - Full redesign                                 */}
      {/* ============================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-[75vh] bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 container mx-auto max-w-7xl px-4 py-10 lg:py-14">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ---- COLONNE GAUCHE (7 cols) ---- */}
            <div className="lg:col-span-7 pt-4 lg:pt-8">
              {/* Trust badges row */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Shield className="w-3.5 h-3.5" /> Certifié RGE QualiPAC
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-300" /> 4.9/5 sur Google
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5" /> +50 installations
                </span>
              </div>

              {/* H1 — benefit-first */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
                Divisez votre facture de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">chauffage par 3</span>
                {' '}à {city.name}
              </h1>

              {/* Sous-titre contextualisé */}
              <p className="text-emerald-100/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
                {cityData
                  ? `${cityData.pctChauffageGaz}% des foyers de ${city.name} sont encore au gaz. Passez à la PAC et économisez ${cityData.economieChauffage}/an. Posé en 1 à 2 jours.`
                  : `Installation pompe à chaleur certifiée RGE à ${city.name}. Économisez jusqu'à 70% sur votre chauffage. Posé en 1 à 2 jours.`
                }
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">÷3</p>
                  <p className="text-xs text-emerald-300/80 font-medium">votre facture</p>
                </div>
                <div className="relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">8 000€</p>
                  <p className="text-xs text-emerald-300/80 font-medium">d&apos;aides MaPrimeRénov&apos;</p>
                </div>
                <div className="relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">48h</p>
                  <p className="text-xs text-emerald-300/80 font-medium">pour votre devis</p>
                </div>
              </div>

              {/* CTA group */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:scale-[1.02]">
                  Demander mon devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33766975099" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-green-900 text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all">
                  <Phone className="w-5 h-5" />07 66 97 50 99
                </a>
              </div>

              {/* Urgence banner */}
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 rounded-xl px-4 py-2.5">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-amber-200/90 text-sm">Aides MaPrimeRénov&apos; 2026 : <strong>jusqu&apos;à 8 000€</strong> — avant la baisse prévue en 2027</p>
              </div>
            </div>

            {/* ---- COLONNE DROITE (5 cols) — Card tarifs + CTA ---- */}
            <div className="lg:col-span-5 lg:pt-4">
              <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
                {/* Card header */}
                <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-5">
                  <h2 className="text-lg font-bold text-white">Pompe à chaleur à {city.name}</h2>
                  <p className="text-emerald-100 text-sm">Prix après aides MaPrimeRénov&apos;</p>
                </div>

                <div className="p-6">
                  {/* Prix bento */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
                      <p className="text-slate-500 text-xs font-medium mb-1">PAC Air/Air</p>
                      <p className="text-2xl font-bold text-slate-900">1 500€</p>
                      <p className="text-slate-400 text-xs">par unité installée</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
                      <p className="text-slate-500 text-xs font-medium mb-1">PAC Air/Eau</p>
                      <p className="text-2xl font-bold text-slate-900">5 000€</p>
                      <p className="text-slate-400 text-xs">à partir de</p>
                    </div>
                  </div>

                  {/* Avantages */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 text-sm">Visite technique gratuite à {city.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 text-sm">Posé en 1 à 2 jours, devis sous 48h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 text-sm">Garantie décennale 10 ans</span>
                    </div>
                  </div>

                  {/* Economies locales */}
                  {cityData && (
                    <div className="bg-emerald-50 rounded-xl p-4 mb-5 text-center">
                      <p className="text-sm text-emerald-800 font-medium">Économie estimée à {city.name}</p>
                      <p className="text-2xl font-bold text-emerald-700 mt-1">{cityData.economieChauffage}/an</p>
                      <p className="text-xs text-emerald-600 mt-1">sur votre facture de chauffage</p>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 text-center mb-4 italic">Prix indicatifs après aides. Devis personnalisé gratuit.</p>

                  {/* CTA Téléphone */}
                  <a
                    href="tel:+33766975099"
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 hover:from-orange-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02]"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Appeler maintenant</span>
                  </a>

                  {/* Séparateur */}
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-slate-400 text-xs uppercase tracking-wide">ou</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  {/* CTA Devis */}
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all"
                  >
                    Recevoir un devis gratuit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Card footer — Social proof */}
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-700 ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs text-slate-500">+50 installations en IDF</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-4 bg-white border-b border-neutral-100">
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
              {/* Bloc chiffres clés */}
              <div className="mt-10 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100">
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-4">
                  {city.name} en chiffres — Le parc immobilier local
                </h3>
                <p className="text-neutral-600 mb-5">{cityData.caracteristique}</p>
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
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{cityData.logements.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-neutral-600">logements au total</p>
                  </div>
                </div>

                {/* Contexte énergétique unique */}
                <div className="bg-neutral-50 rounded-xl p-5">
                  <h4 className="font-semibold text-neutral-900 mb-2">Contexte énergétique local</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{cityData.contexteEnergetique}</p>
                </div>

                {/* Recommandation PAC */}
                <div className="mt-4 bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-1">Notre recommandation pour {city.name}</h4>
                  <p className="text-green-700 text-sm">{cityData.recommendationPAC}</p>
                </div>
              </div>

              <p className="text-neutral-400 text-xs mt-3">Sources : INSEE 2022, ADEME, base DPE, Météo France. Zone climatique {cityData.zoneClimatique}, {cityData.dju} DJU. Parc construit majoritairement {cityData.anneeConstruction}. Données indicatives à l&apos;échelle communale.</p>
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
      <ServiceAreaSection className="bg-white" serviceSlug="pompe-a-chaleur" />
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
