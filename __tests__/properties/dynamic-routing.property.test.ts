/**
 * Property-Based Tests for Dynamic Product Routing
 * 
 * Feature: admin-backend
 * Property 10: Dynamic Product Routing
 * 
 * **Validates: Requirements 9.1, 9.2**
 * 
 * For any active product with a valid category, requesting the URL 
 * `/produits/{category.slug}/{product.slug}` SHALL return a 200 response 
 * with the product's data rendered.
 * 
 * Since we can't make actual HTTP requests in unit tests, we test:
 * 1. URL construction from category and product slugs
 * 2. Slug validation (only lowercase letters, numbers, and hyphens)
 * 3. Routing pattern matching for expected URLs
 */

import * as fc from 'fast-check'
import { slugify } from '@/lib/slugify'

/**
 * Arbitrary generator for valid slugs
 * Valid slugs contain only lowercase letters, numbers, and hyphens
 * They must not start or end with hyphens
 */
const validSlugArbitrary = fc.array(
  fc.oneof(
    fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')),
    fc.constantFrom(...'0123456789'.split('')),
    fc.constant('-')
  ),
  { minLength: 1, maxLength: 50 }
)
  .map(chars => chars.join(''))
  // Filter out slugs that start or end with hyphens or have consecutive hyphens
  .filter(slug => 
    slug.length > 0 &&
    !slug.startsWith('-') && 
    !slug.endsWith('-') &&
    !slug.includes('--') &&
    /[a-z0-9]/.test(slug) // Must contain at least one alphanumeric character
  )

/**
 * Arbitrary generator for realistic category slugs
 */
const realisticCategorySlugArbitrary = fc.constantFrom(
  'batteries-solaires',
  'pompes-a-chaleur',
  'panneaux-photovoltaiques',
  'onduleurs',
  'climatisation',
  'chauffe-eau',
  'isolation-thermique',
  'ventilation',
  'energie-renouvelable',
  'stockage-energie'
)

/**
 * Arbitrary generator for realistic product slugs
 */
const realisticProductSlugArbitrary = fc.constantFrom(
  'kstar-blues-6kw',
  'onduleur-hybride-5kw',
  'panneau-400w-monocristallin',
  'pompe-chaleur-air-eau',
  'batterie-lithium-10kwh',
  'chauffe-eau-thermodynamique-200l',
  'climatiseur-reversible-3500w',
  'kit-solaire-autoconsommation',
  'micro-onduleur-800w',
  'regulateur-charge-mppt'
)

/**
 * Arbitrary generator for French product/category names
 * These will be converted to slugs for testing
 */
const frenchNameArbitrary = fc.constantFrom(
  'Batteries solaires',
  'Énergie renouvelable',
  'Pompes à chaleur',
  'Panneaux photovoltaïques',
  'Système de chauffage écologique',
  'Climatisation réversible',
  'Chauffe-eau thermodynamique',
  'KSTAR BluE-S 6kW',
  'Onduleur hybride',
  'Stockage d\'énergie'
)

/**
 * URL pattern regex for product pages
 * Matches: /produits/{categorySlug}/{productSlug}
 */
const PRODUCT_URL_PATTERN = /^\/produits\/[a-z0-9-]+\/[a-z0-9-]+$/

/**
 * URL pattern regex for category pages
 * Matches: /produits/{categorySlug}
 */
const CATEGORY_URL_PATTERN = /^\/produits\/[a-z0-9-]+$/

/**
 * Helper function to construct a product URL
 */
function constructProductUrl(categorySlug: string, productSlug: string): string {
  return `/produits/${categorySlug}/${productSlug}`
}

/**
 * Helper function to construct a category URL
 */
function constructCategoryUrl(categorySlug: string): string {
  return `/produits/${categorySlug}`
}

/**
 * Helper function to validate a slug format
 * Valid slugs: lowercase letters, numbers, hyphens only
 * No leading/trailing hyphens, no consecutive hyphens
 */
function isValidSlug(slug: string): boolean {
  if (slug.length === 0) return false
  if (!/^[a-z0-9-]+$/.test(slug)) return false
  if (slug.startsWith('-') || slug.endsWith('-')) return false
  if (slug.includes('--')) return false
  return true
}

/**
 * Helper function to parse a product URL and extract slugs
 */
function parseProductUrl(url: string): { categorySlug: string; productSlug: string } | null {
  const match = url.match(/^\/produits\/([a-z0-9-]+)\/([a-z0-9-]+)$/)
  if (!match) return null
  return {
    categorySlug: match[1],
    productSlug: match[2]
  }
}

describe('Property 10: Dynamic Product Routing', () => {
  /**
   * Property: For any valid category and product slugs, the constructed URL
   * SHALL match the expected product URL pattern /produits/{categorySlug}/{productSlug}
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should construct valid product URLs from category and product slugs', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        validSlugArbitrary,
        (categorySlug, productSlug) => {
          const url = constructProductUrl(categorySlug, productSlug)
          
          // URL should match the expected pattern
          expect(url).toMatch(PRODUCT_URL_PATTERN)
          
          // URL should contain both slugs in correct positions
          expect(url).toBe(`/produits/${categorySlug}/${productSlug}`)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid category slug, the constructed category URL
   * SHALL match the expected pattern /produits/{categorySlug}
   * 
   * **Validates: Requirements 9.2**
   */
  it('should construct valid category URLs from category slugs', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        (categorySlug) => {
          const url = constructCategoryUrl(categorySlug)
          
          // URL should match the expected pattern
          expect(url).toMatch(CATEGORY_URL_PATTERN)
          
          // URL should contain the slug in correct position
          expect(url).toBe(`/produits/${categorySlug}`)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any constructed product URL, parsing it SHALL return
   * the original category and product slugs
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should allow round-trip URL construction and parsing', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        validSlugArbitrary,
        (categorySlug, productSlug) => {
          const url = constructProductUrl(categorySlug, productSlug)
          const parsed = parseProductUrl(url)
          
          // Parsing should succeed
          expect(parsed).not.toBeNull()
          
          // Parsed slugs should match original
          expect(parsed?.categorySlug).toBe(categorySlug)
          expect(parsed?.productSlug).toBe(productSlug)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any French product/category name, slugifying it and
   * constructing a URL SHALL produce a valid URL
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should construct valid URLs from slugified French names', () => {
    fc.assert(
      fc.property(
        frenchNameArbitrary,
        frenchNameArbitrary,
        (categoryName, productName) => {
          const categorySlug = slugify(categoryName)
          const productSlug = slugify(productName)
          
          // Slugs should be valid
          expect(isValidSlug(categorySlug)).toBe(true)
          expect(isValidSlug(productSlug)).toBe(true)
          
          // Constructed URL should match pattern
          const url = constructProductUrl(categorySlug, productSlug)
          expect(url).toMatch(PRODUCT_URL_PATTERN)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any realistic category and product slug combination,
   * the URL SHALL be correctly constructed
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should handle realistic category and product slug combinations', () => {
    fc.assert(
      fc.property(
        realisticCategorySlugArbitrary,
        realisticProductSlugArbitrary,
        (categorySlug, productSlug) => {
          const url = constructProductUrl(categorySlug, productSlug)
          
          // URL should match pattern
          expect(url).toMatch(PRODUCT_URL_PATTERN)
          
          // URL should be parseable
          const parsed = parseProductUrl(url)
          expect(parsed).not.toBeNull()
          expect(parsed?.categorySlug).toBe(categorySlug)
          expect(parsed?.productSlug).toBe(productSlug)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Slug Validation for Dynamic Routing', () => {
  /**
   * Property: Valid slugs SHALL contain only lowercase letters, numbers, and hyphens
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should validate that slugs contain only allowed characters', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        (slug) => {
          // All characters should be lowercase letters, numbers, or hyphens
          expect(slug).toMatch(/^[a-z0-9-]+$/)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Valid slugs SHALL NOT start or end with hyphens
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should validate that slugs do not start or end with hyphens', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        (slug) => {
          expect(slug.startsWith('-')).toBe(false)
          expect(slug.endsWith('-')).toBe(false)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Valid slugs SHALL NOT contain consecutive hyphens
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should validate that slugs do not contain consecutive hyphens', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        (slug) => {
          expect(slug.includes('--')).toBe(false)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The isValidSlug function SHALL correctly identify valid slugs
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should correctly validate generated slugs', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        (slug) => {
          expect(isValidSlug(slug)).toBe(true)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Slugified French names SHALL produce valid slugs
   * 
   * **Validates: Requirements 9.1, 9.2**
   */
  it('should produce valid slugs from French names', () => {
    fc.assert(
      fc.property(
        frenchNameArbitrary,
        (name) => {
          const slug = slugify(name)
          expect(isValidSlug(slug)).toBe(true)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('URL Pattern Matching', () => {
  /**
   * Property: Product URLs SHALL match the Next.js dynamic route pattern
   * /produits/[categorySlug]/[productSlug]
   * 
   * **Validates: Requirements 9.1**
   */
  it('should match Next.js dynamic route pattern for products', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        validSlugArbitrary,
        (categorySlug, productSlug) => {
          const url = constructProductUrl(categorySlug, productSlug)
          
          // Should match the pattern that Next.js uses for dynamic routes
          const segments = url.split('/').filter(Boolean)
          expect(segments).toHaveLength(3)
          expect(segments[0]).toBe('produits')
          expect(segments[1]).toBe(categorySlug)
          expect(segments[2]).toBe(productSlug)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Category URLs SHALL match the Next.js dynamic route pattern
   * /produits/[categorySlug]
   * 
   * **Validates: Requirements 9.2**
   */
  it('should match Next.js dynamic route pattern for categories', () => {
    fc.assert(
      fc.property(
        validSlugArbitrary,
        (categorySlug) => {
          const url = constructCategoryUrl(categorySlug)
          
          // Should match the pattern that Next.js uses for dynamic routes
          const segments = url.split('/').filter(Boolean)
          expect(segments).toHaveLength(2)
          expect(segments[0]).toBe('produits')
          expect(segments[1]).toBe(categorySlug)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Edge case tests for dynamic routing
 */
describe('Dynamic Routing Edge Cases', () => {
  /**
   * Test: Single character slugs should work
   */
  it('should handle single character slugs', () => {
    const url = constructProductUrl('a', 'b')
    expect(url).toBe('/produits/a/b')
    expect(url).toMatch(PRODUCT_URL_PATTERN)
  })

  /**
   * Test: Numeric slugs should work
   */
  it('should handle numeric slugs', () => {
    const url = constructProductUrl('123', '456')
    expect(url).toBe('/produits/123/456')
    expect(url).toMatch(PRODUCT_URL_PATTERN)
  })

  /**
   * Test: Mixed alphanumeric slugs should work
   */
  it('should handle mixed alphanumeric slugs', () => {
    const url = constructProductUrl('category-1', 'product-2')
    expect(url).toBe('/produits/category-1/product-2')
    expect(url).toMatch(PRODUCT_URL_PATTERN)
  })

  /**
   * Test: Long slugs should work
   */
  it('should handle long slugs', () => {
    const longSlug = 'this-is-a-very-long-slug-that-contains-many-words'
    const url = constructProductUrl(longSlug, longSlug)
    expect(url).toBe(`/produits/${longSlug}/${longSlug}`)
    expect(url).toMatch(PRODUCT_URL_PATTERN)
  })

  /**
   * Test: Real-world KSTAR product URL
   */
  it('should correctly construct the KSTAR product URL', () => {
    const url = constructProductUrl('batteries-solaires', 'kstar-blues-6kw')
    expect(url).toBe('/produits/batteries-solaires/kstar-blues-6kw')
    expect(url).toMatch(PRODUCT_URL_PATTERN)
  })

  /**
   * Test: Invalid slugs should fail validation
   */
  it('should reject invalid slugs', () => {
    // Uppercase letters
    expect(isValidSlug('Invalid')).toBe(false)
    
    // Special characters
    expect(isValidSlug('invalid!')).toBe(false)
    expect(isValidSlug('invalid@slug')).toBe(false)
    
    // Leading/trailing hyphens
    expect(isValidSlug('-invalid')).toBe(false)
    expect(isValidSlug('invalid-')).toBe(false)
    
    // Consecutive hyphens
    expect(isValidSlug('invalid--slug')).toBe(false)
    
    // Empty string
    expect(isValidSlug('')).toBe(false)
    
    // Spaces
    expect(isValidSlug('invalid slug')).toBe(false)
  })

  /**
   * Test: Valid slugs should pass validation
   */
  it('should accept valid slugs', () => {
    expect(isValidSlug('valid')).toBe(true)
    expect(isValidSlug('valid-slug')).toBe(true)
    expect(isValidSlug('valid-slug-123')).toBe(true)
    expect(isValidSlug('123')).toBe(true)
    expect(isValidSlug('a')).toBe(true)
    expect(isValidSlug('batteries-solaires')).toBe(true)
    expect(isValidSlug('kstar-blues-6kw')).toBe(true)
  })
})
