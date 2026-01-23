export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://greenter.fr/#organization",
    "name": "Greenter",
    "description": "Expert en rénovation énergétique : installation de pompes à chaleur, panneaux solaires, isolation thermique et audit énergétique partout en France. Certifié RGE.",
    "url": "https://greenter.fr",
    "logo": "https://greenter.fr/logo.png",
    "image": "https://greenter.fr/logo.png",
    "telephone": "+33609455056",
    "email": "contact@greenter.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "38 Rue de Ménilmontant",
      "addressLocality": "Paris",
      "postalCode": "75020",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.7631",
      "longitude": "2.6731"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/7vZm1VSkB8YdpR2k7"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de rénovation énergétique",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation pompe à chaleur",
            "description": "Installation de pompes à chaleur air-eau et air-air certifiée RGE"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation panneaux solaires",
            "description": "Installation de panneaux solaires photovoltaïques pour autoconsommation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Isolation thermique",
            "description": "Travaux d'isolation des murs, combles et toitures"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Audit énergétique",
            "description": "Diagnostic complet de performance énergétique"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Greenter",
    "url": "https://greenter.fr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://greenter.fr/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://greenter.fr"
      }
    ]
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
