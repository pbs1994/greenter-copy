import { COMPANY_ADDRESS, COMPANY_PHONES } from "@/lib/local-seo-data"

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
  areaServed = 'Île-de-France',
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
      "url": "https://www.greenter.fr",
      "telephone": COMPANY_PHONES.primary.raw,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": COMPANY_ADDRESS.locality,
        "postalCode": COMPANY_ADDRESS.postalCode,
        "addressCountry": COMPANY_ADDRESS.country,
      },
    },
    "areaServed": {
      "@type": "Place",
      "name": areaServed,
    },
    "serviceType": name,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
