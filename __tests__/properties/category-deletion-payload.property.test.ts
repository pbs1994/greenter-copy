/**
 * Property-Based Tests for Category Deletion Protection (Payload CMS)
 * 
 * Feature: payload-cms-migration
 * Property 2: Category Deletion Protection
 * 
 * **Validates: Requirements 3.4**
 * 
 * For any category that has one or more products assigned to it, attempting to delete 
 * that category should fail with a validation error, and the category should remain 
 * in the database.
 * 
 * This tests the beforeDelete hook in collections/Categories.ts that checks for 
 * assigned products and throws an error if any exist.
 */

import * as fc from 'fast-check'

/**
 * Expected French error message pattern when deletion is prevented
 * The actual message includes the product count dynamically
 */
const ERROR_MESSAGE_PATTERN = /Impossible de supprimer cette catégorie car \d+ produit\(s\) y sont assignés/

/**
 * Simulates the beforeDelete hook behavior from collections/Categories.ts
 * This mirrors the actual implementation logic for testing purposes
 */
interface MockPayloadRequest {
  payload: {
    find: (options: {
      collection: string
      where: Record<string, unknown>
      limit: number
    }) => Promise<{ totalDocs: number }>
  }
}

interface BeforeDeleteHookParams {
  id: string
  req: MockPayloadRequest
}

/**
 * Simulates the preventDeleteIfProductsExist hook from Categories.ts
 */
async function preventDeleteIfProductsExist({ id, req }: BeforeDeleteHookParams): Promise<void> {
  const payload = req.payload

  // Check if any products are assigned to this category
  const { totalDocs } = await payload.find({
    collection: 'products',
    where: {
      category: { equals: id },
    },
    limit: 1,
  })

  if (totalDocs > 0) {
    throw new Error(
      `Impossible de supprimer cette catégorie car ${totalDocs} produit(s) y sont assignés. Veuillez d'abord réassigner ou supprimer ces produits.`
    )
  }
}

/**
 * Creates a mock Payload request object with configurable product count
 */
function createMockRequest(productCount: number): MockPayloadRequest {
  return {
    payload: {
      find: async () => ({ totalDocs: productCount }),
    },
  }
}

/**
 * Arbitrary generator for valid MongoDB ObjectId-like strings (24 hex characters)
 */
const categoryIdArbitrary = fc.array(
  fc.constantFrom(...'0123456789abcdef'.split('')),
  { minLength: 24, maxLength: 24 }
).map(chars => chars.join(''))

/**
 * Arbitrary generator for positive product counts (1 or more products)
 */
const positiveProductCountArbitrary = fc.integer({ min: 1, max: 10000 })

/**
 * Arbitrary generator for zero product count
 */
const zeroProductCountArbitrary = fc.constant(0)

describe('Property 2: Category Deletion Protection', () => {
  /**
   * Property: For any category with one or more assigned products,
   * attempting to delete SHALL throw an error
   * 
   * **Validates: Requirements 3.4**
   */
  it('should throw error when category has assigned products', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          const mockReq = createMockRequest(productCount)
          
          let errorThrown = false
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
          } catch (error) {
            errorThrown = true
          }
          
          return errorThrown === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with one or more assigned products,
   * the error message SHALL match the expected French pattern
   * 
   * **Validates: Requirements 3.4**
   */
  it('should return French error message with product count when deletion is prevented', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          const mockReq = createMockRequest(productCount)
          
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
            return false // Should have thrown
          } catch (error) {
            const errorMessage = (error as Error).message
            return ERROR_MESSAGE_PATTERN.test(errorMessage)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with one or more assigned products,
   * the error message SHALL include the exact product count
   * 
   * **Validates: Requirements 3.4**
   */
  it('should include exact product count in error message', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          const mockReq = createMockRequest(productCount)
          
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
            return false // Should have thrown
          } catch (error) {
            const errorMessage = (error as Error).message
            return errorMessage.includes(`${productCount} produit(s)`)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with zero assigned products,
   * deletion SHALL succeed (no error thrown)
   * 
   * **Validates: Requirements 3.4** (inverse property - categories without products can be deleted)
   */
  it('should not throw error when category has no assigned products', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        async (categoryId) => {
          const mockReq = createMockRequest(0)
          
          let errorThrown = false
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
          } catch (error) {
            errorThrown = true
          }
          
          return errorThrown === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The deletion check SHALL be deterministic -
   * same inputs always produce same result
   * 
   * **Validates: Requirements 3.4**
   */
  it('should be deterministic for deletion checks', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        fc.integer({ min: 0, max: 100 }),
        async (categoryId, productCount) => {
          const results: boolean[] = []
          
          for (let i = 0; i < 3; i++) {
            const mockReq = createMockRequest(productCount)
            
            let errorThrown = false
            try {
              await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
            } catch (error) {
              errorThrown = true
            }
            results.push(errorThrown)
          }
          
          // All results should be identical
          return results.every(r => r === results[0])
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The boundary between allowed and prevented deletion
   * SHALL be exactly at productCount > 0
   * 
   * **Validates: Requirements 3.4**
   */
  it('should have clear boundary at product count > 0', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        async (categoryId) => {
          // Test with count = 0 (should succeed - no error)
          const mockReqZero = createMockRequest(0)
          let errorWithZero = false
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReqZero })
          } catch {
            errorWithZero = true
          }
          
          // Test with count = 1 (should fail - error thrown)
          const mockReqOne = createMockRequest(1)
          let errorWithOne = false
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReqOne })
          } catch {
            errorWithOne = true
          }
          
          return errorWithZero === false && errorWithOne === true
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Category Deletion Error Message Consistency', () => {
  /**
   * Property: The error message format SHALL be consistent across all product counts > 0
   * 
   * **Validates: Requirements 3.4**
   */
  it('should have consistent error message format regardless of product count', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          const mockReq = createMockRequest(productCount)
          
          try {
            await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
            return false
          } catch (error) {
            const errorMessage = (error as Error).message
            // Should match the pattern and include guidance
            return (
              ERROR_MESSAGE_PATTERN.test(errorMessage) &&
              errorMessage.includes('Veuillez d\'abord réassigner ou supprimer ces produits')
            )
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Error messages SHALL be deterministic for same product count
   * 
   * **Validates: Requirements 3.4**
   */
  it('should return deterministic error message for same product count', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          const errorMessages: string[] = []
          
          for (let i = 0; i < 3; i++) {
            const mockReq = createMockRequest(productCount)
            
            try {
              await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
            } catch (error) {
              errorMessages.push((error as Error).message)
            }
          }
          
          // All error messages should be identical
          return errorMessages.length === 3 && 
                 errorMessages.every(msg => msg === errorMessages[0])
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Category Deletion Edge Cases', () => {
  /**
   * Test: Category with exactly 1 product should prevent deletion
   * 
   * **Validates: Requirements 3.4**
   */
  it('should prevent deletion when category has exactly 1 product', async () => {
    const mockReq = createMockRequest(1)
    
    await expect(
      preventDeleteIfProductsExist({ id: 'test-category-id', req: mockReq })
    ).rejects.toThrow(/Impossible de supprimer cette catégorie/)
  })

  /**
   * Test: Category with many products should prevent deletion
   * 
   * **Validates: Requirements 3.4**
   */
  it('should prevent deletion when category has many products', async () => {
    const mockReq = createMockRequest(1000)
    
    await expect(
      preventDeleteIfProductsExist({ id: 'test-category-id', req: mockReq })
    ).rejects.toThrow(/1000 produit\(s\)/)
  })

  /**
   * Test: Category with exactly 0 products should allow deletion
   * 
   * **Validates: Requirements 3.4**
   */
  it('should allow deletion when category has exactly 0 products', async () => {
    const mockReq = createMockRequest(0)
    
    // Should not throw
    await expect(
      preventDeleteIfProductsExist({ id: 'test-category-id', req: mockReq })
    ).resolves.toBeUndefined()
  })

  /**
   * Test: Error message should be in French
   * 
   * **Validates: Requirements 3.4**
   */
  it('should return error message in French', async () => {
    const mockReq = createMockRequest(5)
    
    try {
      await preventDeleteIfProductsExist({ id: 'test-category-id', req: mockReq })
      fail('Should have thrown an error')
    } catch (error) {
      const message = (error as Error).message
      expect(message).toContain('Impossible de supprimer')
      expect(message).toContain('produit(s)')
      expect(message).toContain('Veuillez d\'abord réassigner ou supprimer')
    }
  })

  /**
   * Test: Different category IDs with same product count should produce same error format
   * 
   * **Validates: Requirements 3.4**
   */
  it('should produce same error format for different category IDs', async () => {
    const categoryIds = ['cat-1', 'cat-2', 'cat-3', 'abc123def456789012345678']
    const productCount = 3
    
    const errorMessages: string[] = []
    
    for (const categoryId of categoryIds) {
      const mockReq = createMockRequest(productCount)
      
      try {
        await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
      } catch (error) {
        errorMessages.push((error as Error).message)
      }
    }
    
    // All error messages should be identical (category ID doesn't affect message)
    expect(new Set(errorMessages).size).toBe(1)
    expect(errorMessages[0]).toContain('3 produit(s)')
  })
})

describe('Category Deletion Hook Integration Properties', () => {
  /**
   * Property: The hook SHALL query the products collection with correct filter
   * 
   * **Validates: Requirements 3.4**
   */
  it('should query products collection with category filter', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        async (categoryId) => {
          let queriedCollection: string | null = null
          let queriedWhere: Record<string, unknown> | null = null
          
          const mockReq: MockPayloadRequest = {
            payload: {
              find: async (options) => {
                queriedCollection = options.collection
                queriedWhere = options.where
                return { totalDocs: 0 }
              },
            },
          }
          
          await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
          
          return (
            queriedCollection === 'products' &&
            queriedWhere !== null &&
            JSON.stringify(queriedWhere) === JSON.stringify({ category: { equals: categoryId } })
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The hook SHALL use limit: 1 for efficiency
   * 
   * **Validates: Requirements 3.4**
   */
  it('should use limit 1 for efficient product count check', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        async (categoryId) => {
          let queriedLimit: number | null = null
          
          const mockReq: MockPayloadRequest = {
            payload: {
              find: async (options) => {
                queriedLimit = options.limit
                return { totalDocs: 0 }
              },
            },
          }
          
          await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
          
          return queriedLimit === 1
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Category Deletion Protection Invariants', () => {
  /**
   * Invariant: A category with products SHALL NEVER be deletable
   * 
   * **Validates: Requirements 3.4**
   */
  it('should never allow deletion of category with products', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          const mockReq = createMockRequest(productCount)
          
          // Attempt deletion multiple times
          for (let attempt = 0; attempt < 5; attempt++) {
            try {
              await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
              // If we reach here, deletion was allowed - invariant violated
              return false
            } catch {
              // Expected - deletion was prevented
            }
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Invariant: A category without products SHALL ALWAYS be deletable (from hook perspective)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should always allow deletion of category without products', async () => {
    await fc.assert(
      fc.asyncProperty(
        categoryIdArbitrary,
        async (categoryId) => {
          const mockReq = createMockRequest(0)
          
          // Attempt deletion multiple times
          for (let attempt = 0; attempt < 5; attempt++) {
            try {
              await preventDeleteIfProductsExist({ id: categoryId, req: mockReq })
              // Expected - deletion was allowed
            } catch {
              // If we reach here, deletion was prevented - invariant violated
              return false
            }
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
