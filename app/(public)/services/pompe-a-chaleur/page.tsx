import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { LocalBusinessSchema } from "@/components/schemas/LocalBusinessSchema"
import { AggregateRatingSchema } from "@/components/schemas/AggregateRatingSchema"
import { ArticleSchema } from "@/components/schemas/ArticleSchema"
import { PACEditorialContent } from "@/components/editorial"
import { CITIES, COMPANY_PHONES } from "@/lib/local-seo-data"
import { fetchGoogleReviews } from "@/lib/google-places"
import { HeroSection } from "./HeroSection"

const faqs = [
  { question: "Quel est le prix d'une pompe à chaleur ?", answer: "Le prix varie selon le type de PAC. Une PAC air/air coûte à partir de 1 500€ par unité intérieure. Une PAC air/eau démarre à 5 000€. Ces prix sont hors aides (MaPrimeRénov', CEE) qui peuvent réduire significativement le reste à charge. Un devis précis est établi après visite technique gratuite." },
  { question: "Quelles économies puis-je réaliser ?", answer: "Une pompe à chaleur permet de réduire votre facture de chauffage de 50 à 70%. Cela s'explique par son rendement exceptionnel : pour 1 kWh d'électricité consommé, une PAC produit 3 à 5 kWh de chaleur. L'énergie supplémentaire est puisée gratuitement dans l'air extérieur." },
  { question: "Une PAC fonctionne-t-elle par grand froid ?", answer: "Oui, les PAC modernes fonctionnent jusqu'à -15°C voire -20°C pour certains modèles. Le rendement diminue légèrement par temps très froid, mais la PAC continue de chauffer. En Seine-et-Marne, les températures descendent rarement en dessous de -10°C, ce qui est parfaitement adapté." },
  { question: "Quelle est la durée de vie d'une PAC ?", answer: "Une pompe à chaleur bien entretenue a une durée de vie de 15 à 20 ans. L'entretien annuel (obligatoire pour les PAC contenant plus de 2kg de fluide frigorigène) permet de maintenir les performances et de prolonger la durée de vie de l'équipement." },
  { question: "Une PAC est-elle bruyante ?", answer: "Les PAC modernes sont conçues pour être silencieuses. L'unité intérieure émet environ 20-25 dB (équivalent à un chuchotement). L'unité extérieure émet 45-55 dB, comparable à une conversation normale. L'emplacement de l'unité extérieure est étudié lors de la visite technique pour minimiser les nuisances." },
  { question: "Comment vérifier votre certification RGE ?", answer: "Notre certification RGE est vérifiable sur le site officiel france-renov.gouv.fr. Cette certification est obligatoire pour que vous puissiez bénéficier des aides de l'État (MaPrimeRénov', CEE, TVA réduite)." },
  { question: "Intervenez-vous dans ma commune ?", answer: "Nous intervenons dans toute la Seine-et-Marne (77) et les communes limitrophes : Ozoir-la-Ferrière, Roissy-en-Brie, Pontault-Combault, Brie-Comte-Robert, Tournan-en-Brie, Gretz-Armainvilliers, Lésigny, Chevry-Cossigny et environs." },
  { question: "Faut-il un entretien régulier ?", answer: "Un entretien annuel est recommandé (et obligatoire pour les PAC de plus de 2kg de fluide). Il comprend : vérification du fluide frigorigène, nettoyage des filtres, contrôle des performances. Coût moyen : 150 à 200€/an. Nous proposons des contrats de maintenance." },
]

export default async function PompeAChaleurPage() {
  const googleData = await fetchGoogleReviews()
  const rating = googleData.rating > 0 ? googleData.rating : 4.9
  const reviewCount = googleData.reviewCount > 0 ? googleData.reviewCount : 47

  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
    { name: "Pompe à chaleur", url: "https://www.greenter.fr/services/pompe-a-chaleur" }
  ]

  return (
    <>
      <ServiceSchema name="Installation Pompe à Chaleur Seine-et-Marne" description="Installation PAC certifié RGE. Prix transparents." url="https://www.greenter.fr/services/pompe-a-chaleur" image="https://www.greenter.fr/pac.png" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      <LocalBusinessSchema name="Greenter" description="Installation pompe à chaleur certifié RGE à Ozoir-la-Ferrière, en Seine-et-Marne (77) et Île-de-France" address={{ streetAddress: "Ozoir-la-Ferrière", addressLocality: "Ozoir-la-Ferrière", postalCode: "77330", addressCountry: "FR" }} telephone={COMPANY_PHONES.primary.raw} email="contact@greenter.fr" url="https://www.greenter.fr" image="https://www.greenter.fr/logo.png" priceRange="€€" areaServed={CITIES.map(city => city.name)} aggregateRating={{ ratingValue: rating, reviewCount }} />
      <AggregateRatingSchema itemReviewed={{ type: "LocalBusiness", name: "Greenter" }} ratingValue={rating} reviewCount={reviewCount} />
      <ArticleSchema
        headline="Guide complet de la pompe à chaleur en 2026 : types, prix, aides et installation"
        description="Tout savoir sur les pompes à chaleur en 2026 : comparatif des types (air/air, air/eau, géothermique), prix, aides MaPrimeRénov' et processus d'installation par un artisan RGE en Seine-et-Marne."
        datePublished="2024-01-15"
        dateModified="2026-03-01"
        author={{ name: "Greenter", url: "https://www.greenter.fr" }}
        publisher={{ name: "Greenter", logo: "https://www.greenter.fr/logo.png" }}
        image="https://www.greenter.fr/pac.png"
        url="https://www.greenter.fr/services/pompe-a-chaleur"
        wordCount={2400}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <HeroSection initialGoogleData={googleData} />

        <PACEditorialContent />

        <section className="bg-neutral-50 py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                <BookOpen className="h-3.5 w-3.5" />
                Pour aller plus loin
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900">
                Guides pompe à chaleur 2026
              </h2>
              <p className="mt-2 text-neutral-600">
                Décryptage complet des aides, prix et démarches par nos experts RGE.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/blog/remplacer-chaudiere-gaz-pompe-a-chaleur-2026"
                className="group flex gap-4 rounded-xl bg-white p-5 ring-1 ring-neutral-200 transition-all hover:ring-emerald-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Nouveau · avril 2026
                  </span>
                  <h3 className="mt-1 font-bold text-neutral-900 leading-tight group-hover:text-emerald-700 transition-colors">
                    Remplacer sa chaudière gaz par une pompe à chaleur en 2026
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                    Prime EDF 1 000&nbsp;€, bonus MaPrimeRénov&apos; +1 000&nbsp;€, Coup de pouce x3 :
                    toutes les aides pour passer du gaz à la PAC.
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    Lire le guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
              <Link
                href="/blog/guide-prix-pompe-a-chaleur-2026"
                className="group flex gap-4 rounded-xl bg-white p-5 ring-1 ring-neutral-200 transition-all hover:ring-emerald-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Guide complet
                  </span>
                  <h3 className="mt-1 font-bold text-neutral-900 leading-tight group-hover:text-emerald-700 transition-colors">
                    Prix d&apos;une pompe à chaleur en 2026
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                    Coûts par type de PAC, barème MaPrimeRénov&apos;, exemple chiffré et
                    calcul du retour sur investissement.
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    Lire le guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
