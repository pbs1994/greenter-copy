import Script from 'next/script';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  image?: string;
  url: string;
  wordCount?: number;
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  publisher,
  image,
  url,
  wordCount,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    ...(image && { image }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(wordCount && { wordCount }),
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
