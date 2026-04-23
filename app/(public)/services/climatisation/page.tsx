// =============================================================================
// Climatisation — Hub service
// =============================================================================

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Phone, Shield, Thermometer, Wind, Zap, MapPin } from "lucide-react"
import { CITIES } from "@/lib/local-seo-data"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"

export const metadata: Metadata = {
  title: "Installation Climatisation Réversible en Île-de-France | Pose Clim & PAC Air-Air | Greenter",
  description:
    "Installateur RGE QualiPAC agréé toutes marques (Daikin, Mitsubishi, Atlantic, Panasonic…) pour la pose de climatisation réversible en Seine-et-Marne, Val-de-Marne, Essonne et Seine-Saint-Denis. PAC air-air, clim multi-split, devis gratuit sous 48 h, aides CEE et TVA réduite.",
  keywords: [
    "climatisation réversible",
    "pose climatisation",
    "installation climatisation",
    "clim réversible",
    "pose clim",
    "PAC air-air",
    "multi-split",
    "installateur Daikin",
    "installateur Mitsubishi",
    "climatisation Île-de-France",
    "clim Seine-et-Marne",
    "RGE QualiPAC",
  ],
  alternates: { canonical: "https://www.greenter.fr/services/climatisation" },
  openGraph: {
    title: "Installation Climatisation Réversible | Greenter",
    description:
      "Pose de climatisation réversible (PAC air-air) partout en Île-de-France. Installateur RGE QualiPAC agréé toutes marques. Devis gratuit sous 48 h, aides CEE incluses.",
    url: "https://www.greenter.fr/services/climatisation",
    siteName: "Greenter",
    type: "website",
    locale: "fr_FR",
    images: [
      { url: "https://www.greenter.fr/pac.jpg", width: 1200, height: 630, alt: "Climatisation réversible installée par Greenter" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Climatisation Réversible | Greenter",
    description:
      "Installation de clim réversible en Île-de-France, toutes marques. Devis gratuit sous 48 h, certifié RGE QualiPAC.",
    images: ["https://www.greenter.fr/pac.jpg"],
  },
}

const FAQS = [
  {
    question: "Quelle différence entre climatisation réversible et pompe à chaleur air-air ?",
    answer:
      "Aucune. La climatisation réversible et la pompe à chaleur air-air désignent exactement le même équipement : un système aérothermique qui chauffe l'hiver et rafraîchit l'été. Le terme « climatisation réversible » est utilisé pour mettre l'accent sur la fonction de rafraîchissement ; « PAC air-air » pour la fonction chauffage. C'est le même appareil.",
  },
  {
    question: "Combien coûte la pose d'une climatisation réversible en 2026 ?",
    answer:
      "En 2026, comptez entre 1 500 € et 5 000 € par unité intérieure (mono-split) et 5 000 à 12 000 € pour un multi-split (plusieurs pièces). La pose par un installateur RGE est comprise. La clim réversible n'est pas éligible à MaPrimeRénov' (seule la PAC air-eau l'est), mais peut bénéficier de la prime CEE « Coup de pouce chauffage » si son COP est ≥ 3,9 et qu'elle remplace un chauffage électrique ou fossile.",
  },
  {
    question: "Faut-il une certification RGE QualiPAC pour installer une climatisation réversible ?",
    answer:
      "Pour bénéficier des aides financières (prime CEE notamment), oui : l'installation doit être réalisée par un artisan certifié RGE QualiPAC. Sans RGE, l'équipement fonctionne mais vous perdez tout droit aux aides. Greenter est certifié RGE QualiPAC et intervient sur toute l'Île-de-France.",
  },
  {
    question: "Mono-split ou multi-split : comment choisir ?",
    answer:
      "Mono-split = 1 unité extérieure pour 1 unité intérieure (une seule pièce climatisée). Idéal pour une chambre ou un séjour. Multi-split = 1 unité extérieure pour 2 à 5 unités intérieures (plusieurs pièces). Plus économique qu'installer plusieurs mono-splits, et esthétiquement mieux intégré (une seule unité dehors). Pour une maison de 100 m² avec séjour + 2 chambres, on recommande un tri-split.",
  },
  {
    question: "La climatisation réversible fonctionne-t-elle quand il fait très froid ?",
    answer:
      "Oui, les modèles récents fonctionnent jusqu'à -15 °C voire -20 °C. En Île-de-France (zone climatique H1a), les températures descendent rarement en dessous de -10 °C, donc aucun souci. Le rendement baisse légèrement par grand froid, mais la clim réversible continue de chauffer. Certains modèles intègrent une résistance d'appoint pour les pics de froid.",
  },
  {
    question: "Quelles marques Greenter installe-t-il ?",
    answer:
      "Greenter est installateur agréé pour les principales marques du marché français : Daikin, Atlantic, Mitsubishi Electric, Panasonic, Toshiba, LG, Hitachi et Samsung. Nous conseillons la marque la plus adaptée à votre logement et à votre budget lors de la visite technique gratuite.",
  },
  {
    question: "Dans quelles villes Greenter intervient-il pour la climatisation ?",
    answer:
      "Nous intervenons dans toute l'Île-de-France : Seine-et-Marne (77), Val-de-Marne (94), Essonne (91), Seine-Saint-Denis (93) et Paris (75). Cela inclut Ozoir-la-Ferrière, Pontault-Combault, Melun, Créteil, Sucy-en-Brie, Montgeron, Noisy-le-Grand et une cinquantaine d'autres communes.",
  },
]

const BREADCRUMBS = [
  { name: "Accueil", url: "https://www.greenter.fr" },
  { name: "Services", url: "https://www.greenter.fr/services" },
  { name: "Climatisation réversible", url: "https://www.greenter.fr/services/climatisation" },
]

export default function ClimatisationHubPage() {
  return (
    <main>
      <BreadcrumbSchema items={BREADCRUMBS} />
      <FAQPageSchema items={FAQS} />
      <ServiceSchema
        name="Installation de climatisation réversible (PAC air-air)"
        description="Pose et installation de climatisation réversible et PAC air-air en Île-de-France par Greenter, installateur certifié RGE QualiPAC agréé toutes marques."
        url="https://www.greenter.fr/services/climatisation"
        areaServed="France"
      />

      {/* ---- HERO ---- */}
      <section className="relative bg-gradient-to-br from-slate-950 via-sky-950 to-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" /> RGE QualiPAC
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                Agréé toutes marques
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Installation de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-300">
                climatisation réversible
              </span>
              <br />en Île-de-France
            </h1>
            <p className="text-sky-100/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Pose de <strong>clim réversible mono-split et multi-split</strong> par un installateur certifié
              RGE QualiPAC. Chauffe l&apos;hiver, rafraîchit l&apos;été. Agréé{" "}
              <strong>Daikin, Mitsubishi, Atlantic, Panasonic, Toshiba, LG, Hitachi, Samsung</strong>.
              Devis gratuit sous 48 h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02]"
              >
                Demander mon devis gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33766975099"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 hover:bg-white hover:text-slate-900 text-white font-semibold px-8 py-4 rounded-2xl transition-all"
              >
                <Phone className="w-5 h-5" />
                07 66 97 50 99
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- BÉNÉFICES ---- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Pourquoi choisir la climatisation réversible ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Deux appareils en un : chauffage économique l&apos;hiver et climatiseur performant l&apos;été.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Thermometer, title: "Chauffe et rafraîchit", desc: "Une seule installation pour le chauffage d'hiver et la climatisation d'été." },
              { icon: Zap, title: "70 % d'économies", desc: "COP supérieur à 3 : 1 kWh consommé = 3 à 4 kWh restitués." },
              { icon: Wind, title: "Silencieuse & rapide", desc: "Moins de 25 dB à l'intérieur. Posée en 1 journée pour un mono-split." },
              { icon: Shield, title: "Aides CEE 2026", desc: "Prime Coup de pouce chauffage éligible sur les modèles performants." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-sky-700" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{title}</h3>
                <p className="text-sm text-neutral-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- MARQUES ---- */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Installateur agréé toutes marques
            </h2>
            <p className="text-neutral-600 text-lg">
              Nous installons les grandes marques du marché français. Conseil neutre, sans marque imposée.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "Daikin",
              "Atlantic",
              "Mitsubishi Electric",
              "Panasonic",
              "Toshiba",
              "LG",
              "Hitachi",
              "Samsung",
            ].map((brand) => (
              <div key={brand} className="bg-white rounded-xl px-4 py-4 text-center border border-neutral-200 font-semibold text-neutral-800 shadow-sm">
                {brand}
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 mt-4 text-center italic">
            Installateur indépendant — agréments constructeurs sur demande.
          </p>
        </div>
      </section>

      {/* ---- VILLES ---- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3 text-center">
            Installation de climatisation dans {CITIES.length} villes
          </h2>
          <p className="text-neutral-600 text-center mb-10 text-lg max-w-2xl mx-auto">
            Nous intervenons dans toute l&apos;Île-de-France pour la pose de clim réversible et PAC air-air.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/services/climatisation/${city.slug}`}
                className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-100 hover:border-sky-300 hover:bg-white hover:shadow-sm transition-all group"
              >
                <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-700 group-hover:text-sky-700 transition-colors">
                  Climatisation {city.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
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

      {/* ---- CTA ---- */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-sky-900 via-slate-900 to-emerald-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à installer votre climatisation réversible ?
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            Devis personnalisé gratuit sous 48 h. Visite technique offerte. Agréé toutes marques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander mon devis gratuit
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
