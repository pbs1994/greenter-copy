interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand: string
  sku: string
  url: string
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = 'EUR',
  availability = 'InStock',
  brand,
  sku,
  url,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "sku": sku,
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": currency,
      "price": price,
      "availability": `https://schema.org/${availability}`,
      "seller": {
        "@type": "Organization",
        "name": "Greenter"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
