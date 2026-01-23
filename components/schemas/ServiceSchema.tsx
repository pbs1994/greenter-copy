interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  image?: string
  areaServed?: string
}

export function ServiceSchema({
  name,
  description,
  url,
  image,
  areaServed = 'France',
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    ...(image && { "image": image }),
    "provider": {
      "@type": "LocalBusiness",
      "name": "Greenter",
      "url": "https://greenter.fr",
      "telephone": "+33609455056",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "38 Rue de Ménilmontant",
        "addressLocality": "Paris",
        "postalCode": "75020",
        "addressCountry": "FR"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "serviceType": name
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
