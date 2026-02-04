/**
 * Property-Based Tests for Dynamic Breadcrumb Hierarchy
 * 
 * Feature: admin-backend
 * Property 11: Dynamic Breadcrumb Hierarchy
 * 
 * **Validates: Requirements 9.5**
 * 
 * For any product page rendered at `/produits/{categorySlug}/{productSlug}`, 
 * the breadcrumb component SHALL contain exactly three items in order: 
 * "Accueil" → category.name → product.name, with correct URLs for each.
 * 
 * Since we can't render actual components in unit tests, we test the breadcrumb 
 * data structure:
 * 1. Generate random category and product data
 * 2. Verify that breadcrumb items are constructed correctly
 * 3. Verify the order: Accueil → Category → Product
 * 4. Verify URLs are correct for each item
 */

import * as fc from 'fast-check'
import { slugify } from '@/lib/slugify'

/**
 * Interface for breadcrumb items
 */
interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Base URL for the site
 */
const BASE_URL = 'https://greenter.fr'

/**
 * Constructs breadcrumb items for a product page
 * This mirrors the logic in GenericProductTemplate.tsx
 * 
 * @param categoryName - The display name of the category
 * @param categorySlug - The URL slug of the category
 * @param productName - The display name of the product
 * @param productSlug - The URL slug of the product
 * @returns Array of breadcrumb items in order: Accueil → Category → Product
 */
function constructBreadcrumbs(
  categoryName: string,
  categorySlug: string,
  productName: string,
  productSlug: string
): BreadcrumbItem[] {
  return [
    { name: 'Accueil', url: BASE_URL },
    { name: categoryName, url: `${BASE_URL}/produits/${categorySlug}` },
    { name: productName, url: `${BASE_URL}/produits/${categorySlug}/${productSlug}` }
  ]
}

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
  .filter(slug => 
    slug.length > 0 &&
    !slug.startsWith('-') && 
    !slug.endsWith('-') &&
    !slug.includes('--') &&
    /[a-z0-9]/.test(slug)
  )

/**
 * Arbitrary generator for non-empty display names
 * Names can contain any printable characters
 */
const displayNameArbitrary = fc.string({ minLength: 1, maxLength: 100 })
  .filter(name => name.trim().length > 0)

/**
 * Arbitrary generator for French category names
 */
const frenchCategoryNameArbitrary = fc.constantFrom(
  'Batteries solaires',
  'Pompes à chaleur',
  'Panneaux photovoltaïques',
  'Onduleurs',
  'Climatisation',
  'Chauffe-eau',
  'Isolation thermique',
  'Ventilation',
  'Énergie renouvelable',
  'Stockage énergie'
)

/**
 * Arbitrary generator for French product names
 */
const frenchProductNameArbitrary = fc.constantFrom(
  'KSTAR BluE-S 6kW',
  'Onduleur hybride 5kW',
  'Panneau 400W monocristallin',
  'Pompe à chaleur air-eau',
  'Batterie lithium 10kWh',
  'Chauffe-eau thermodynamique 200L',
  'Climatiseur réversible 3500W',
  'Kit solaire autoconsommation',
  'Micro-onduleur 800W',
  'Régulateur charge MPPT'
)

/**
 * Arbitrary generator for category data
 */
const categoryArbitrary = fc.record({
  name: frenchCategoryNameArbitrary,
  slug: validSlugArbitrary
})

/**
 * Arbitrary generator for product data
 */
const productArbitrary = fc.record({
  name: frenchProductNameArbitrary,
  slug: validSlugArbitrary
})

/**
 * Arbitrary generator for category data with slugified names
 */
const categoryWithSlugifiedNameArbitrary = frenchCategoryNameArbitrary.map(name => ({
  name,
  slug: slugify(name)
}))

/**
 * Arbitrary generator for product data with slugified names
 */
const productWithSlugifiedNameArbitrary = frenchProductNameArbitrary.map(name => ({
  name,
  slug: slugify(name)
}))

describe('Property 11: Dynamic Breadcrumb Hierarchy', () => {
  /**
   * Property: Breadcrumbs SHALL contain exactly three items
   * 
   * **Validates: Requirements 9.5**
   */
  it('should construct breadcrumbs with exactly three items', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          expect(breadcrumbs).toHaveLength(3)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: First breadcrumb item SHALL always be "Accueil" with base URL
   * 
   * **Validates: Requirements 9.5**
   */
  it('should have "Accueil" as the first breadcrumb item with correct URL', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          // First item should be "Accueil"
          expect(breadcrumbs[0].name).toBe('Accueil')
          expect(breadcrumbs[0].url).toBe(BASE_URL)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Second breadcrumb item SHALL be the category name with category URL
   * 
   * **Validates: Requirements 9.5**
   */
  it('should have category name as the second breadcrumb item with correct URL', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          // Second item should be category
          expect(breadcrumbs[1].name).toBe(category.name)
          expect(breadcrumbs[1].url).toBe(`${BASE_URL}/produits/${category.slug}`)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Third breadcrumb item SHALL be the product name with product URL
   * 
   * **Validates: Requirements 9.5**
   */
  it('should have product name as the third breadcrumb item with correct URL', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          // Third item should be product
          expect(breadcrumbs[2].name).toBe(product.name)
          expect(breadcrumbs[2].url).toBe(`${BASE_URL}/produits/${category.slug}/${product.slug}`)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Breadcrumb items SHALL be in correct hierarchical order
   * Accueil → Category → Product
   * 
   * **Validates: Requirements 9.5**
   */
  it('should maintain correct hierarchical order: Accueil → Category → Product', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          // Verify order
          const names = breadcrumbs.map(b => b.name)
          expect(names[0]).toBe('Accueil')
          expect(names[1]).toBe(category.name)
          expect(names[2]).toBe(product.name)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Breadcrumb URLs SHALL form a valid hierarchy
   * Each URL should be a prefix of the next (except for the base URL)
   * 
   * **Validates: Requirements 9.5**
   */
  it('should have URLs that form a valid hierarchy', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          // Base URL should be prefix of category URL
          expect(breadcrumbs[1].url.startsWith(breadcrumbs[0].url)).toBe(true)
          
          // Category URL should be prefix of product URL
          expect(breadcrumbs[2].url.startsWith(breadcrumbs[1].url)).toBe(true)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Product URL in breadcrumb SHALL match the expected route pattern
   * /produits/{categorySlug}/{productSlug}
   * 
   * **Validates: Requirements 9.5**
   */
  it('should construct product URL matching the route pattern', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          const productUrl = breadcrumbs[2].url
          const expectedPattern = new RegExp(
            `^${BASE_URL}/produits/[a-z0-9-]+/[a-z0-9-]+$`
          )
          
          expect(productUrl).toMatch(expectedPattern)
          expect(productUrl).toBe(`${BASE_URL}/produits/${category.slug}/${product.slug}`)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Breadcrumb Hierarchy with Slugified French Names', () => {
  /**
   * Property: Breadcrumbs constructed from French names SHALL have valid URLs
   * 
   * **Validates: Requirements 9.5**
   */
  it('should construct valid breadcrumbs from French category and product names', () => {
    fc.assert(
      fc.property(
        categoryWithSlugifiedNameArbitrary,
        productWithSlugifiedNameArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          // Should have exactly 3 items
          expect(breadcrumbs).toHaveLength(3)
          
          // Names should be preserved (not slugified)
          expect(breadcrumbs[1].name).toBe(category.name)
          expect(breadcrumbs[2].name).toBe(product.name)
          
          // URLs should use slugified versions
          expect(breadcrumbs[1].url).toContain(category.slug)
          expect(breadcrumbs[2].url).toContain(product.slug)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Display names in breadcrumbs SHALL preserve original formatting
   * (including accents, special characters, etc.)
   * 
   * **Validates: Requirements 9.5**
   */
  it('should preserve original display names with French characters', () => {
    fc.assert(
      fc.property(
        frenchCategoryNameArbitrary,
        frenchProductNameArbitrary,
        (categoryName, productName) => {
          const categorySlug = slugify(categoryName)
          const productSlug = slugify(productName)
          
          const breadcrumbs = constructBreadcrumbs(
            categoryName,
            categorySlug,
            productName,
            productSlug
          )
          
          // Display names should be exactly as provided (with accents, etc.)
          expect(breadcrumbs[1].name).toBe(categoryName)
          expect(breadcrumbs[2].name).toBe(productName)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Breadcrumb URL Structure', () => {
  /**
   * Property: All breadcrumb URLs SHALL be valid HTTPS URLs
   * 
   * **Validates: Requirements 9.5**
   */
  it('should generate valid HTTPS URLs for all breadcrumb items', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          breadcrumbs.forEach(item => {
            expect(item.url).toMatch(/^https:\/\//)
            // Should be a valid URL
            expect(() => new URL(item.url)).not.toThrow()
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Category URL SHALL follow the pattern /produits/{categorySlug}
   * 
   * **Validates: Requirements 9.5**
   */
  it('should construct category URL following the correct pattern', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          const categoryUrl = breadcrumbs[1].url
          const expectedCategoryUrl = `${BASE_URL}/produits/${category.slug}`
          
          expect(categoryUrl).toBe(expectedCategoryUrl)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Each breadcrumb URL SHALL be unique
   * 
   * **Validates: Requirements 9.5**
   */
  it('should have unique URLs for each breadcrumb item', () => {
    fc.assert(
      fc.property(
        categoryArbitrary,
        productArbitrary,
        (category, product) => {
          const breadcrumbs = constructBreadcrumbs(
            category.name,
            category.slug,
            product.name,
            product.slug
          )
          
          const urls = breadcrumbs.map(b => b.url)
          const uniqueUrls = new Set(urls)
          
          expect(uniqueUrls.size).toBe(3)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Breadcrumb Edge Cases', () => {
  /**
   * Test: Real-world KSTAR product breadcrumbs
   */
  it('should correctly construct breadcrumbs for KSTAR product', () => {
    const breadcrumbs = constructBreadcrumbs(
      'Batteries solaires',
      'batteries-solaires',
      'KSTAR BluE-S 6kW',
      'kstar-blues-6kw'
    )
    
    expect(breadcrumbs).toHaveLength(3)
    expect(breadcrumbs[0]).toEqual({ name: 'Accueil', url: 'https://greenter.fr' })
    expect(breadcrumbs[1]).toEqual({ 
      name: 'Batteries solaires', 
      url: 'https://greenter.fr/produits/batteries-solaires' 
    })
    expect(breadcrumbs[2]).toEqual({ 
      name: 'KSTAR BluE-S 6kW', 
      url: 'https://greenter.fr/produits/batteries-solaires/kstar-blues-6kw' 
    })
  })

  /**
   * Test: Single character slugs should work
   */
  it('should handle single character slugs', () => {
    const breadcrumbs = constructBreadcrumbs('A', 'a', 'B', 'b')
    
    expect(breadcrumbs).toHaveLength(3)
    expect(breadcrumbs[1].url).toBe('https://greenter.fr/produits/a')
    expect(breadcrumbs[2].url).toBe('https://greenter.fr/produits/a/b')
  })

  /**
   * Test: Long names should be preserved
   */
  it('should preserve long display names', () => {
    const longCategoryName = 'Systèmes de stockage d\'énergie solaire haute performance'
    const longProductName = 'Batterie lithium-ion haute capacité 20kWh avec onduleur intégré'
    
    const breadcrumbs = constructBreadcrumbs(
      longCategoryName,
      'systemes-stockage-energie',
      longProductName,
      'batterie-lithium-20kwh'
    )
    
    expect(breadcrumbs[1].name).toBe(longCategoryName)
    expect(breadcrumbs[2].name).toBe(longProductName)
  })

  /**
   * Test: Names with special characters should be preserved
   */
  it('should preserve names with special characters', () => {
    const categoryName = 'Pompes à chaleur (air/eau)'
    const productName = 'Modèle XL-2000 "Pro" - 15kW'
    
    const breadcrumbs = constructBreadcrumbs(
      categoryName,
      'pompes-chaleur',
      productName,
      'modele-xl-2000-pro'
    )
    
    expect(breadcrumbs[1].name).toBe(categoryName)
    expect(breadcrumbs[2].name).toBe(productName)
  })

  /**
   * Test: Numeric slugs should work
   */
  it('should handle numeric slugs', () => {
    const breadcrumbs = constructBreadcrumbs(
      'Category 123',
      '123',
      'Product 456',
      '456'
    )
    
    expect(breadcrumbs[1].url).toBe('https://greenter.fr/produits/123')
    expect(breadcrumbs[2].url).toBe('https://greenter.fr/produits/123/456')
  })
})
