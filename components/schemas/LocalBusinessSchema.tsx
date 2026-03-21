interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  url: string;
  image: string;
  priceRange: string;
  areaServed: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function LocalBusinessSchema({
  name,
  description,
  address,
  telephone,
  email,
  url,
  image,
  priceRange,
  areaServed,
  aggregateRating,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry,
    },
    "telephone": telephone,
    "email": email,
    "url": url,
    "image": image,
    "priceRange": priceRange,
    "areaServed": areaServed,
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue.toString(),
        "reviewCount": aggregateRating.reviewCount.toString(),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
