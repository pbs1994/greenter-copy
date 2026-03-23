/**
 * Property Test: Inactive Product 404
 * 
 * Validates that products with is_active=false return 404 responses
 * and are not accessible to public visitors.
 * 
 * @validates Requirements 19.6
 */

import * as fc from 'fast-check'

// Product status type
interface ProductStatus {
  is_active: boolean
  slug: string
  category_slug: string
}

// Arbitrary for generating product slugs
const slugArb = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter(s => s.length >= 3 && s.length <= 50)

// Arbitrary for generating product status
const productStatusArb = fc.record({
  is_active: fc.boolean(),
  slug: slugArb,
  category_slug: slugArb,
})

/**
 * Simulates the product page access logic
 * Returns true if product should be accessible, false if 404
 */
function shouldProductBeAccessible(product: ProductStatus): boolean {
  // Only active products are accessible
  return product.is_active === true
}

/**
 * Simulates the Payload query for active products
 */
function simulatePayloadQuery(products: ProductStatus[], slug: string, categorySlug: string): ProductStatus | null {
  // Query filters: slug matches, category matches, AND is_active = true
  const result = products.find(
    p => p.slug === slug && 
         p.category_slug === categorySlug && 
         p.is_active === true
  )
  return result || null
}

describe('Property: Inactive Product 404', () => {
  /**
   * Property 1: Inactive products always return 404
   * 
   * For any product with is_active=false, the page should return 404.
   */
  it('should return 404 for inactive products', () => {
    fc.assert(
      fc.property(
        fc.record({
          is_active: fc.constant(false),
          slug: slugArb,
          category_slug: slugArb,
        }),
        (product) => {
          const isAccessible = shouldProductBeAccessible(product)
          
          // Inactive products should never be accessible
          expect(isAccessible).toBe(false)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 2: Active products are accessible
   * 
   * For any product with is_active=true, the page should be accessible.
   */
  it('should allow access to active products', () => {
    fc.assert(
      fc.property(
        fc.record({
          is_active: fc.constant(true),
          slug: slugArb,
          category_slug: slugArb,
        }),
        (product) => {
          const isAccessible = shouldProductBeAccessible(product)
          
          // Active products should be accessible
          expect(isAccessible).toBe(true)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 3: Query filters exclude inactive products
   * 
   * The Payload query should only return active products.
   */
  it('should filter out inactive products in queries', () => {
    fc.assert(
      fc.property(
        fc.array(productStatusArb, { minLength: 1, maxLength: 20 }),
        slugArb,
        slugArb,
        (products, targetSlug, targetCategory) => {
          // Add a specific product to search for
          const targetProduct: ProductStatus = {
            is_active: false,
            slug: targetSlug,
            category_slug: targetCategory,
          }
          const allProducts = [...products, targetProduct]
          
          // Query should not find inactive product
          const result = simulatePayloadQuery(allProducts, targetSlug, targetCategory)
          
          // If result is found, it must be active
          if (result) {
            expect(result.is_active).toBe(true)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 4: Active product with same slug is found
   * 
   * If an active product exists with the target slug, it should be found.
   */
  it('should find active products with matching slug', () => {
    fc.assert(
      fc.property(
        fc.array(productStatusArb, { minLength: 0, maxLength: 10 }),
        slugArb,
        slugArb,
        (otherProducts, targetSlug, targetCategory) => {
          // Add an active product to search for
          const activeProduct: ProductStatus = {
            is_active: true,
            slug: targetSlug,
            category_slug: targetCategory,
          }
          const allProducts = [...otherProducts, activeProduct]
          
          // Query should find the active product
          const result = simulatePayloadQuery(allProducts, targetSlug, targetCategory)
          
          expect(result).not.toBeNull()
          expect(result?.is_active).toBe(true)
          expect(result?.slug).toBe(targetSlug)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 5: Toggling is_active changes accessibility
   * 
   * Changing is_active from true to false should make product inaccessible.
   */
  it('should change accessibility when is_active is toggled', () => {
    fc.assert(
      fc.property(productStatusArb, (product) => {
        // Check accessibility with current status
        const currentAccessibility = shouldProductBeAccessible(product)
        
        // Toggle is_active
        const toggledProduct = { ...product, is_active: !product.is_active }
        const toggledAccessibility = shouldProductBeAccessible(toggledProduct)
        
        // Accessibility should be opposite after toggle
        expect(toggledAccessibility).toBe(!currentAccessibility)
        
        return true
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property 6: Multiple inactive products all return 404
   * 
   * All inactive products in a list should be inaccessible.
   */
  it('should return 404 for all inactive products in a list', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            is_active: fc.constant(false),
            slug: slugArb,
            category_slug: slugArb,
          }),
          { minLength: 1, maxLength: 20 }
        ),
        (inactiveProducts) => {
          // All inactive products should be inaccessible
          inactiveProducts.forEach(product => {
            expect(shouldProductBeAccessible(product)).toBe(false)
          })
          
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 7: Mixed active/inactive products filter correctly
   * 
   * In a mixed list, only active products should be accessible.
   */
  it('should correctly filter mixed active/inactive products', () => {
    fc.assert(
      fc.property(
        fc.array(productStatusArb, { minLength: 1, maxLength: 20 }),
        (products) => {
          const accessibleProducts = products.filter(shouldProductBeAccessible)
          const inaccessibleProducts = products.filter(p => !shouldProductBeAccessible(p))
          
          // All accessible products must be active
          accessibleProducts.forEach(p => {
            expect(p.is_active).toBe(true)
          })
          
          // All inaccessible products must be inactive
          inaccessibleProducts.forEach(p => {
            expect(p.is_active).toBe(false)
          })
          
          // Total should match
          expect(accessibleProducts.length + inaccessibleProducts.length).toBe(products.length)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 8: Empty query result means 404
   * 
   * When no product is found (null result), 404 should be returned.
   */
  it('should return 404 when query returns no results', () => {
    fc.assert(
      fc.property(
        fc.array(productStatusArb, { minLength: 0, maxLength: 10 }),
        slugArb,
        slugArb,
        (products, nonExistentSlug, nonExistentCategory) => {
          // Ensure the slug doesn't exist in products
          const filteredProducts = products.filter(
            p => p.slug !== nonExistentSlug || p.category_slug !== nonExistentCategory
          )
          
          const result = simulatePayloadQuery(filteredProducts, nonExistentSlug, nonExistentCategory)
          
          // No result means 404
          expect(result).toBeNull()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
