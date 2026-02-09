import { CITIES, COMPANY_ADDRESS } from "@/lib/local-seo-data"
import { fetchGoogleReviews } from "@/lib/google-places"

// Default aggregate rating values when API data is unavailable
const DEFAULT_AGGREGATE_RATING = {
  ratingValue: 4.8,
  reviewCount: 20,
}

function JsonLdScripts({ ratingValue, reviewCount }: { ratingValue: number; reviewCount: number }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://greenter.fr/#organization",
    name: "Greenter",
    description:
      "Expert en rénovation énergétique : installation de pompes à chaleur, panneaux solaires, isolation thermique et audit énergétique à Ozoir-la-Ferrière et en Seine-et-Marne. Certifié RGE.",
    url: "https://greenter.fr",
    logo: "https://greenter.fr/logo.png",
    image: "https://greenter.fr/logo.png",
    telephone: "+33609455056",
    email: "contact@greenter.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_ADDRESS.locality,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressCountry: COMPANY_ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: String(COMPANY_ADDRESS.latitude),
      longitude: String(COMPANY_ADDRESS.longitude),
    },
    areaServed: CITIES.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de rénovation énergétique",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Installation pompe à chaleur",
            description: "Installation de pompes à chaleur air-eau et air-air certifiée RGE",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Installation panneaux solaires",
            description: "Installation de panneaux solaires photovoltaïques pour autoconsommation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Isolation thermique",
            description: "Travaux d'isolation des murs, combles et toitures",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Audit énergétique",
            description: "Diagnostic complet de performance énergétique",
          },
        },
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Greenter",
    url: "https://greenter.fr",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://greenter.fr/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://greenter.fr",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

export async function JsonLd() {
  const reviewsData = await fetchGoogleReviews()

  const ratingValue =
    reviewsData.rating > 0
      ? reviewsData.rating
      : DEFAULT_AGGREGATE_RATING.ratingValue
  const reviewCount =
    reviewsData.reviewCount > 0
      ? reviewsData.reviewCount
      : DEFAULT_AGGREGATE_RATING.reviewCount

  return <JsonLdScripts ratingValue={ratingValue} reviewCount={reviewCount} />
}
