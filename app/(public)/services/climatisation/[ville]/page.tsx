// =============================================================================
// Climatisation réversible par ville — /services/climatisation/[ville]
// =============================================================================

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle, Phone, MapPin, Shield, Clock, Star, Wind, Zap, Thermometer } from "lucide-react"
import { CITIES, COMPANY_ADDRESS } from "@/lib/local-seo-data"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"

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

  const title = `Installation Climatisation Réversible ${city.name} (${city.postalCode}) | Pose Clim & PAC Air-Air | Greenter`
  const description = `Pose et installation de climatisation réversible (PAC air-air) à ${city.name} par Greenter, installateur RGE QualiPAC agréé toutes marques : Daikin, Mitsubishi, Atlantic, Panasonic, Toshiba, LG, Hitachi, Samsung. Mono-split, multi-split, devis gratuit sous 48 h.`

  return {
    title,
    description,
    keywords: [
      `climatisation ${city.name}`,
      `clim ${city.name}`,
      `clim réversible ${city.name}`,
      `installation climatisation ${city.name}`,
      `installation clim ${city.name}`,
      `installation clim réversible ${city.name}`,
      `pose climatisation ${city.name}`,
      `pose clim ${city.name}`,
      `pose clim réversible ${city.name}`,
      `PAC air-air ${city.name}`,
      `pose PAC air-air ${city.name}`,
      `installateur Daikin ${city.name}`,
      `installateur Mitsubishi ${city.name}`,
      `installateur climatisation ${city.name}`,
      `climatiseur ${city.name}`,
      `multi-split ${city.name}`,
      `climatisation ${city.department}`,
    ],
    alternates: { canonical: `https://www.greenter.fr/services/climatisation/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.greenter.fr/services/climatisation/${city.slug}`,
      siteName: "Greenter",
      type: "website",
      locale: "fr_FR",
    },
  }
}

function LocalClimServiceSchema({
  cityName,
  citySlug,
  postalCode,
}: {
  cityName: string
  citySlug: string
  postalCode: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Installation Climatisation Réversible ${cityName}`,
    description: `Pose et installation de climatisation réversible (PAC air-air) à ${cityName} (${postalCode}). Installateur RGE QualiPAC agréé toutes marques.`,
    url: `https://www.greenter.fr/services/climatisation/${citySlug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Greenter",
      url: "https://www.greenter.fr",
      telephone: "+33609455056",
      address: {
        "@type": "PostalAddress",
        addressLocality: COMPANY_ADDRESS.locality,
        postalCode: COMPANY_ADDRESS.postalCode,
        addressCountry: COMPANY_ADDRESS.country,
      },
    },
    areaServed: { "@type": "City", name: cityName },
    serviceType: "Installation Climatisation Réversible",
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default async function LocalClimPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params
  const city = CITIES.find((c) => c.slug === ville)
  if (!city) notFound()

  const faqs = [
    {
      question: `Combien coûte la pose d'une climatisation réversible à ${city.name} ?`,
      answer: `À ${city.name} (${city.postalCode}), la pose d'une clim réversible mono-split démarre autour de 1 500 € à 3 000 € par unité. Pour un multi-split (séjour + 2 chambres typiquement), comptez 6 000 à 9 000 € tout compris. Greenter vous remet un devis gratuit sous 48 h après visite technique à domicile.`,
    },
    {
      question: `Quelles aides pour une climatisation réversible à ${city.name} ?`,
      answer: `Les habitants de ${city.name} en ${city.department} ne peuvent pas obtenir MaPrimeRénov' pour la clim réversible (elle reste réservée aux PAC air-eau). En revanche, la prime CEE « Coup de pouce chauffage » est accessible si votre clim remplace un chauffage électrique ou fossile et affiche un COP ≥ 3,9. La TVA réduite à 10 % s'applique sur l'installation dans les logements de plus de 2 ans.`,
    },
    {
      question: `Greenter installe-t-il la clim à ${city.name} ?`,
      answer: `Oui, Greenter intervient à ${city.name} et dans toute la ${city.department} pour la pose de climatisation réversible, PAC air-air mono-split et multi-split. Nos techniciens certifiés RGE QualiPAC réalisent l'étude thermique, la pose et la mise en service. Intervention sous 1 à 2 semaines après signature du devis.`,
    },
    {
      question: `Quelles marques de clim Greenter installe-t-il à ${city.name} ?`,
      answer: `Nous sommes agréés pour la pose des principales marques du marché français : Daikin, Atlantic, Mitsubishi Electric, Panasonic, Toshiba, LG, Hitachi et Samsung. Nous conseillons la marque la plus adaptée à votre logement lors de la visite technique à ${city.name}, sans commission constructeur, pour un conseil neutre.`,
    },
    {
      question: `Mono-split ou multi-split à ${city.name} ?`,
      answer: `Pour une seule pièce (chambre, bureau, séjour), un mono-split suffit. Pour climatiser plusieurs pièces dans votre logement de ${city.name}, le multi-split est plus économique et esthétique (une seule unité extérieure). Pour une maison de 100 m², un tri-split couvrant séjour + 2 chambres est la configuration la plus fréquente.`,
    },
    {
      question: `Combien de temps dure la pose d'une clim à ${city.name} ?`,
      answer: `Une installation mono-split à ${city.name} prend 1 journée. Un bi-split ou tri-split demande 2 à 3 jours selon la complexité des passages de liaisons frigorifiques. Vous pouvez rester dans le logement pendant les travaux, seul un bref arrêt d'électricité est nécessaire pour le raccordement.`,
    },
  ]

  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
    { name: "Climatisation", url: "https://www.greenter.fr/services/climatisation" },
    { name: city.name, url: `https://www.greenter.fr/services/climatisation/${city.slug}` },
  ]

  const neighboringCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 20)

  return (
    <main>
      <LocalClimServiceSchema cityName={city.name} citySlug={city.slug} postalCode={city.postalCode} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      {/* ---- HERO ---- */}
      <section className="relative bg-gradient-to-br from-slate-950 via-sky-950 to-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" /> RGE QualiPAC
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-300" /> 4.9/5 sur Google
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
                Agréé toutes marques
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Installation de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-300">
                climatisation réversible
              </span>{" "}
              à {city.name}
            </h1>
            <p className="text-sky-100/80 text-lg leading-relaxed mb-7 max-w-2xl">
              Pose de clim réversible, PAC air-air mono-split et multi-split à {city.name} ({city.postalCode})
              par un installateur certifié RGE QualiPAC. <strong>Daikin, Mitsubishi, Atlantic, Panasonic…</strong>{" "}
              Devis gratuit sous 48 h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02]"
              >
                Mon devis gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33766975099"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 hover:bg-white hover:text-slate-900 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all"
              >
                <Phone className="w-5 h-5" />
                07 66 97 50 99
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-6xl px-4 flex justify-center">
          <GoogleRatingBadgeClient />
        </div>
      </section>

      {/* ---- BÉNÉFICES ---- */}
      <section className="py-14 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Pose de climatisation réversible à {city.name}
          </h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-3xl">
            À {city.name} ({city.postalCode}), en {city.department}, la <strong>climatisation réversible</strong> —
            aussi appelée <strong>PAC air-air</strong> — est la solution deux-en-un : elle chauffe
            l&apos;hiver (COP ≥ 3) et rafraîchit l&apos;été. Greenter, installateur certifié RGE QualiPAC, prend en
            charge la pose mono-split ou multi-split de A à Z : étude thermique gratuite, fourniture,
            installation, mise en service et SAV.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Thermometer, title: "Chauffe et rafraîchit", desc: "Un seul appareil pour l'hiver et l'été. Température pilotable par pièce." },
              { icon: Zap, title: "Jusqu'à 70 % d'économies", desc: "COP supérieur à 3 : 3 à 4 kWh de chaleur pour 1 kWh consommé." },
              { icon: Wind, title: "Silencieuse et rapide", desc: "Moins de 25 dB à l'intérieur. Posée en 1 jour pour un mono-split." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-sky-700" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">{title}</h3>
                <p className="text-sm text-neutral-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- MARQUES ---- */}
      <section className="py-14 bg-neutral-50">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Installateur agréé toutes marques à {city.name}
          </h2>
          <p className="text-neutral-600 mb-6 max-w-2xl">
            Greenter est agréé pour la pose de climatisations réversibles des principales marques du marché
            français. Conseil neutre lors de la visite technique, sans commission constructeur.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Daikin", "Atlantic", "Mitsubishi Electric", "Panasonic", "Toshiba", "LG", "Hitachi", "Samsung"].map(
              (brand) => (
                <div
                  key={brand}
                  className="bg-white rounded-lg px-3 py-3 text-center border border-neutral-200 text-sm font-semibold text-neutral-700 shadow-sm"
                >
                  {brand}
                </div>
              ),
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-3 italic">
            Installateur indépendant — agréments constructeurs sur demande.
          </p>
        </div>
      </section>

      {/* ---- PROCESS ---- */}
      <section className="py-14 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Comment se déroule la pose d&apos;une clim à {city.name} ?
          </h2>
          <ol className="space-y-3">
            {[
              { t: "Étude technique à domicile (gratuite)", d: `Un technicien se déplace à ${city.name} pour évaluer votre logement, mesurer les surfaces et définir la configuration (mono ou multi-split).`, dur: "1 h" },
              { t: "Devis sous 48 h", d: "Proposition chiffrée détaillée : équipement, pose, mise en service. Sans engagement.", dur: "48 h" },
              { t: "Pose de la climatisation", d: "Installation de l'unité extérieure, des unités intérieures, passage des liaisons frigorifiques, raccordement électrique.", dur: "1 à 3 j" },
              { t: "Mise en service et formation", d: "Tirage au vide, mise sous pression, essai, formation à l'usage de la télécommande et de l'application mobile.", dur: "½ j" },
            ].map((s, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-gradient-to-br from-slate-50 to-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-bold text-neutral-900">{s.t}</h3>
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                      <Clock className="inline w-3 h-3 mr-1" />
                      {s.dur}
                    </span>
                  </div>
                  <p className="text-neutral-600 text-sm">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-14 bg-neutral-50">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Questions fréquentes — Climatisation à {city.name}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-neutral-900 hover:text-sky-700 transition-colors">
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

      {/* ---- VILLES VOISINES ---- */}
      <section className="py-14 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Climatisation dans les villes voisines de {city.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {neighboringCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/climatisation/${c.slug}`}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-sky-300 hover:shadow-sm transition-all group"
                >
                  <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-neutral-700 group-hover:text-sky-700 transition-colors">
                    Clim {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Autres services Greenter à {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/services/pompe-a-chaleur/${city.slug}`} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all group">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Pompe à chaleur air-eau</p>
                  <p className="text-sm text-neutral-500 mt-1">Pour le chauffage central, éligible MaPrimeRénov&apos;</p>
                </div>
              </Link>
              <Link href={`/services/isolation/${city.slug}`} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all group">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Isolation thermique</p>
                  <p className="text-sm text-neutral-500 mt-1">Combles, murs, planchers à partir de 1 €</p>
                </div>
              </Link>
              <Link href={`/services/audit/${city.slug}`} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all group">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Audit énergétique</p>
                  <p className="text-sm text-neutral-500 mt-1">Diagnostic complet avec scénarios chiffrés</p>
                </div>
              </Link>
              <Link href={`/services/panneaux-solaires/${city.slug}`} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all group">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Panneaux solaires</p>
                  <p className="text-sm text-neutral-500 mt-1">Autoconsommation, revente EDF OA</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="py-14 md:py-16 bg-gradient-to-br from-sky-900 via-slate-900 to-emerald-900">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Installer une climatisation réversible à {city.name} ?
          </h2>
          <p className="text-sky-100 mb-6">Devis personnalisé gratuit sous 48 h. Visite technique offerte.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander mon devis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+33766975099"
              className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-sky-900 font-semibold text-base px-8 py-4 rounded-2xl transition-all"
            >
              <Phone className="w-5 h-5" />
              07 66 97 50 99
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
