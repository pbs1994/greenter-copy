import Link from "next/link"
import { ArrowRight, Phone, Flame, Wind, FileCheck, Thermometer } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { LocalBusinessSchema } from "@/components/schemas/LocalBusinessSchema"
import { AggregateRatingSchema } from "@/components/schemas/AggregateRatingSchema"
import { ArticleSchema } from "@/components/schemas/ArticleSchema"
import { CITIES, COMPANY_PHONES } from "@/lib/local-seo-data"
import ServiceAreaSection from "@/components/ServiceAreaSection"
import { PhoneCallTracker } from "@/components/PhoneCallTracker"
import { IsolationEditorialContent } from "@/components/editorial"
import { ISOLATION_FAQS } from "@/lib/isolation-editorial-data"
import { fetchGoogleReviews } from "@/lib/google-places"
import { HeroSection } from "./HeroSection"

const PHONE = COMPANY_PHONES.primary.display

export default async function IsolationPage() {
  const googleData = await fetchGoogleReviews()
  const rating = googleData.rating > 0 ? googleData.rating : 4.9
  const reviewCount = googleData.reviewCount > 0 ? googleData.reviewCount : 47

  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
    { name: "Isolation à 1€", url: "https://www.greenter.fr/services/isolation" },
  ]

  return (
    <>
      <ServiceSchema
        name="Isolation à 1€ - Combles et planchers bas"
        description="Isolation des combles perdus et planchers bas à partir de 1€* grâce aux aides 2026 (MaPrimeRénov', CEE bonifiés). Artisan certifié RGE Qualibat à Ozoir-la-Ferrière."
        url="https://www.greenter.fr/services/isolation"
        image="https://www.greenter.fr/isolation.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={ISOLATION_FAQS} />
      <LocalBusinessSchema
        name="Greenter - Isolation à 1€"
        description="Isolation des combles et planchers bas à partir de 1€ grâce aux aides 2026. Artisan certifié RGE Qualibat à Ozoir-la-Ferrière."
        address={{
          streetAddress: "Ozoir-la-Ferrière",
          addressLocality: "Ozoir-la-Ferrière",
          postalCode: "77330",
          addressCountry: "FR",
        }}
        telephone={COMPANY_PHONES.primary.raw}
        email="contact@greenter.fr"
        url="https://www.greenter.fr/services/isolation"
        image="https://www.greenter.fr/logo.png"
        priceRange="€"
        areaServed={CITIES.map((c) => c.name)}
        aggregateRating={{ ratingValue: rating, reviewCount }}
      />
      <AggregateRatingSchema
        itemReviewed={{ type: "LocalBusiness", name: "Greenter" }}
        ratingValue={rating}
        reviewCount={reviewCount}
      />
      <ArticleSchema
        headline="Isolation à 1€ en 2026 : ce qu'il faut savoir sur les aides et le dispositif"
        description="Tout savoir sur l'isolation à 1€ en 2026 : aides actuelles (MaPrimeRénov', CEE bonifiés), plafonds de ressources, matériaux et processus d'installation."
        datePublished="2026-01-10"
        dateModified="2026-04-08"
        author={{ name: "Greenter", url: "https://www.greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://www.greenter.fr/logo.png" }}
        image="https://www.greenter.fr/isolation.jpg"
        url="https://www.greenter.fr/services/isolation"
        wordCount={2600}
      />

      <main className="min-h-screen bg-white">
        <HeroSection initialGoogleData={googleData} />

        <IsolationEditorialContent />

        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-sky-800">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <Thermometer className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Testez votre éligibilité à l&apos;isolation à 1€*
            </h2>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
              En 2 minutes au téléphone, nous vérifions votre catégorie MaPrimeRénov&apos;, calculons vos aides et
              vous envoyons un devis transparent. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneCallTracker
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-full hover:from-orange-600 hover:to-red-600 transition-colors shadow-xl"
                showIcon={false}
              >
                <Phone className="w-5 h-5" />
                {PHONE}
              </PhoneCallTracker>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                Formulaire de contact
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sky-200/70 text-xs mt-6 max-w-2xl mx-auto">
              *Vous ne payez que le reste à charge (à partir de 1€ pour les ménages très modestes, catégorie Bleu).
              Aucune avance de trésorerie. Montant variable selon votre situation. Devis détaillé après visite technique gratuite.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <h3 className="font-heading text-xl font-bold text-neutral-900 text-center mb-8">
              Complétez votre rénovation énergétique
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/services/pompe-a-chaleur"
                className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Flame className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-sky-700 transition-colors">
                    Pompe à chaleur
                  </p>
                  <p className="text-sm text-neutral-500">Jusqu&apos;à -70% sur le chauffage</p>
                </div>
              </Link>
              <Link
                href="/services/panneaux-solaires"
                className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Wind className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-sky-700 transition-colors">
                    Panneaux solaires
                  </p>
                  <p className="text-sm text-neutral-500">Produisez votre électricité</p>
                </div>
              </Link>
              <Link
                href="/services/audit"
                className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <FileCheck className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-sky-700 transition-colors">
                    Audit énergétique
                  </p>
                  <p className="text-sm text-neutral-500">Priorisez vos travaux</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <ServiceAreaSection serviceSlug="isolation" title="Isolation thermique près de chez vous" className="bg-white" />
      </main>
    </>
  )
}
