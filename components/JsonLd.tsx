import { CITIES, COMPANY_ADDRESS } from "@/lib/local-seo-data"

interface JsonLdProps {
  ratingValue: number
  reviewCount: number
}

export function JsonLd({ ratingValue, reviewCount }: JsonLdProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.greenter.fr/#organization",
    name: "Greenter",
    description:
      "Expert en rénovation énergétique : installation de pompes à chaleur, panneaux solaires, isolation thermique et audit énergétique à Ozoir-la-Ferrière et en Seine-et-Marne. Certifié RGE.",
    url: "https://www.greenter.fr",
    logo: "https://www.greenter.fr/logo.png",
    image: "https://www.greenter.fr/logo.png",
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
        closes: "19:00",
      },
    ],
    sameAs: (process.env.NEXT_PUBLIC_SOCIAL_PROFILES || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
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
    url: "https://www.greenter.fr",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.greenter.fr/recherche?q={search_term_string}",
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
        item: "https://www.greenter.fr",
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
