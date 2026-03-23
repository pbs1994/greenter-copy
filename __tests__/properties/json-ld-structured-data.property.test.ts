/**
 * Property Test: Structured Data Generation
 * 
 * Validates that JSON-LD structured data is correctly generated
 * for products, blog posts, and FAQ sections.
 * 
 * @validates Requirements 14.4, 19.4, 20.4
 */

import * as fc from 'fast-check'

// Product data for JSON-LD generation
interface ProductData {
  name: string
  slug: string
  price: number // in cents
  short_description: string | null
  is_active: boolean
  main_image_url: string | null
}

// Category data
interface CategoryData {
  name: string
  slug: string
}

// Blog post data for JSON-LD generation
interface BlogPostData {
  title: string
  slug: string
  excerpt: string | null
  author: string | null
  published_date: string | null
  featured_image_url: string | null
}

// FAQ item for JSON-LD generation
interface FAQItem {
  question: string
  answer: string
}

// Arbitrary for generating valid slugs
const slugArb = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter(s => s.length >= 3 && s.length <= 50)

// Arbitrary for generating product names
const productNameArb = fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)

// Arbitrary for generating prices (in cents, 1€ to 100,000€)
const priceArb = fc.integer({ min: 100, max: 10000000 })

// Arbitrary for generating URLs
const urlArb = fc.option(
  fc.stringMatching(/^\/[a-z0-9\-\/]+\.(jpg|png|webp)$/).filter(s => s.length <= 100),
  { nil: null }
)

// Arbitrary for generating product data
const productDataArb = fc.record({
  name: productNameArb,
  slug: slugArb,
  price: priceArb,
  short_description: fc.option(fc.string({ minLength: 10, maxLength: 200 }), { nil: null }),
  is_active: fc.boolean(),
  main_image_url: urlArb,
})

// Arbitrary for generating category data
const categoryDataArb = fc.record({
  name: productNameArb,
  slug: slugArb,
})

// Arbitrary for generating blog post data
const blogPostDataArb = fc.record({
  title: productNameArb,
  slug: slugArb,
  excerpt: fc.option(fc.string({ minLength: 10, maxLength: 200 }), { nil: null }),
  author: fc.option(fc.string({ minLength: 2, maxLength: 50 }), { nil: null }),
  published_date: fc.option(
    fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }).map(d => d.toISOString()),
    { nil: null }
  ),
  featured_image_url: urlArb,
})

// Arbitrary for generating FAQ items
const faqItemArb = fc.record({
  question: fc.string({ minLength: 10, maxLength: 200 }).filter(s => s.trim().length > 0),
  answer: fc.string({ minLength: 10, maxLength: 500 }).filter(s => s.trim().length > 0),
})

/**
 * Generate Product JSON-LD
 */
function generateProductJsonLd(product: ProductData, category: CategoryData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || '',
    image: product.main_image_url ? `https://greenter.fr${product.main_image_url}` : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Greenter',
    },
    category: category.name,
    offers: {
      '@type': 'Offer',
      url: `https://greenter.fr/produits/${category.slug}/${product.slug}`,
      priceCurrency: 'EUR',
      price: (product.price / 100).toFixed(2),
      availability: product.is_active
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Greenter',
      },
    },
  }
}

/**
 * Generate Article JSON-LD
 */
function generateArticleJsonLd(post: BlogPostData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.featured_image_url ? `https://greenter.fr${post.featured_image_url}` : undefined,
    author: post.author ? {
      '@type': 'Person',
      name: post.author,
    } : undefined,
    datePublished: post.published_date || undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Greenter',
      logo: {
        '@type': 'ImageObject',
        url: 'https://greenter.fr/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://greenter.fr/blog/${post.slug}`,
    },
  }
}

/**
 * Generate FAQPage JSON-LD
 */
function generateFAQJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

describe('Property: Structured Data Generation', () => {
  describe('Product JSON-LD', () => {
    /**
     * Property 1: Product JSON-LD has required @context
     */
    it('should include schema.org context', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          
          expect(jsonLd['@context']).toBe('https://schema.org')
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 2: Product JSON-LD has correct @type
     */
    it('should have Product type', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          
          expect(jsonLd['@type']).toBe('Product')
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 3: Product name is preserved
     */
    it('should preserve product name', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          
          expect(jsonLd.name).toBe(product.name)
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 4: Price is correctly converted from cents to euros
     */
    it('should convert price from cents to euros', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          const expectedPrice = (product.price / 100).toFixed(2)
          
          expect(jsonLd.offers.price).toBe(expectedPrice)
          expect(jsonLd.offers.priceCurrency).toBe('EUR')
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 5: Availability reflects is_active status
     */
    it('should set availability based on is_active', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          
          if (product.is_active) {
            expect(jsonLd.offers.availability).toBe('https://schema.org/InStock')
          } else {
            expect(jsonLd.offers.availability).toBe('https://schema.org/OutOfStock')
          }
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 6: URL is correctly constructed
     */
    it('should construct correct product URL', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          const expectedUrl = `https://greenter.fr/produits/${category.slug}/${product.slug}`
          
          expect(jsonLd.offers.url).toBe(expectedUrl)
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 7: Image URL is absolute when present
     */
    it('should make image URL absolute', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          
          if (product.main_image_url) {
            expect(jsonLd.image).toBe(`https://greenter.fr${product.main_image_url}`)
            expect(jsonLd.image).toMatch(/^https:\/\//)
          } else {
            expect(jsonLd.image).toBeUndefined()
          }
          
          return true
        }),
        { numRuns: 100 }
      )
    })
  })

  describe('Article JSON-LD', () => {
    /**
     * Property 8: Article JSON-LD has correct @type
     */
    it('should have Article type', () => {
      fc.assert(
        fc.property(blogPostDataArb, (post) => {
          const jsonLd = generateArticleJsonLd(post)
          
          expect(jsonLd['@type']).toBe('Article')
          expect(jsonLd['@context']).toBe('https://schema.org')
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 9: Article headline matches title
     */
    it('should use title as headline', () => {
      fc.assert(
        fc.property(blogPostDataArb, (post) => {
          const jsonLd = generateArticleJsonLd(post)
          
          expect(jsonLd.headline).toBe(post.title)
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 10: Author is included when present
     */
    it('should include author when provided', () => {
      fc.assert(
        fc.property(blogPostDataArb, (post) => {
          const jsonLd = generateArticleJsonLd(post)
          
          if (post.author) {
            expect(jsonLd.author).toBeDefined()
            expect(jsonLd.author?.['@type']).toBe('Person')
            expect(jsonLd.author?.name).toBe(post.author)
          } else {
            expect(jsonLd.author).toBeUndefined()
          }
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 11: Publisher is always Greenter
     */
    it('should have Greenter as publisher', () => {
      fc.assert(
        fc.property(blogPostDataArb, (post) => {
          const jsonLd = generateArticleJsonLd(post)
          
          expect(jsonLd.publisher['@type']).toBe('Organization')
          expect(jsonLd.publisher.name).toBe('Greenter')
          
          return true
        }),
        { numRuns: 100 }
      )
    })
  })

  describe('FAQ JSON-LD', () => {
    /**
     * Property 12: FAQ JSON-LD has correct @type
     */
    it('should have FAQPage type', () => {
      fc.assert(
        fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
          const jsonLd = generateFAQJsonLd(items)
          
          expect(jsonLd['@type']).toBe('FAQPage')
          expect(jsonLd['@context']).toBe('https://schema.org')
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 13: FAQ items count matches input
     */
    it('should include all FAQ items', () => {
      fc.assert(
        fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
          const jsonLd = generateFAQJsonLd(items)
          
          expect(jsonLd.mainEntity.length).toBe(items.length)
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 14: FAQ questions are preserved
     */
    it('should preserve question text', () => {
      fc.assert(
        fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
          const jsonLd = generateFAQJsonLd(items)
          
          items.forEach((item, index) => {
            expect(jsonLd.mainEntity[index].name).toBe(item.question)
          })
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 15: FAQ answers are preserved
     */
    it('should preserve answer text', () => {
      fc.assert(
        fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
          const jsonLd = generateFAQJsonLd(items)
          
          items.forEach((item, index) => {
            expect(jsonLd.mainEntity[index].acceptedAnswer.text).toBe(item.answer)
          })
          
          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Property 16: FAQ items have correct structure
     */
    it('should have correct Question/Answer structure', () => {
      fc.assert(
        fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
          const jsonLd = generateFAQJsonLd(items)
          
          jsonLd.mainEntity.forEach(entity => {
            expect(entity['@type']).toBe('Question')
            expect(entity.acceptedAnswer['@type']).toBe('Answer')
          })
          
          return true
        }),
        { numRuns: 100 }
      )
    })
  })

  describe('JSON-LD Validity', () => {
    /**
     * Property 17: JSON-LD is valid JSON
     */
    it('should produce valid JSON', () => {
      fc.assert(
        fc.property(productDataArb, categoryDataArb, (product, category) => {
          const jsonLd = generateProductJsonLd(product, category)
          
          // Should not throw when stringifying
          const jsonString = JSON.stringify(jsonLd)
          expect(typeof jsonString).toBe('string')
          
          // Should parse back correctly
          const parsed = JSON.parse(jsonString)
          expect(parsed['@context']).toBe('https://schema.org')
          
          return true
        }),
        { numRuns: 100 }
      )
    })
  })
})
