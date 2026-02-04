/**
 * Property-Based Tests for Category Deletion Prevention
 * 
 * Feature: admin-backend
 * Property 4: Category Deletion Prevention
 * 
 * **Validates: Requirements 4.6**
 * 
 * For any category that has one or more associated products, attempting to delete 
 * that category SHALL fail and return an error message indicating products must 
 * be removed first.
 */

import * as fc from 'fast-check'

// Track mock state
let mockProductCount: number | null = null
let mockCountError: { message: string; code?: string } | null = null
let mockDeleteError: { message: string; code?: string } | null = null
let mockDeleteCalled = false
let mockRevalidatePathCalls: string[] = []

// Mock Next.js redirect function
jest.mock('next/navigation', () => ({
  redirect: (url: string) => {
    const error = new Error('NEXT_REDIRECT')
    ;(error as Error & { digest: string }).digest = `NEXT_REDIRECT;replace;${url};307;`
    throw error
  },
}))

// Mock Next.js cache revalidation
jest.mock('next/cache', () => ({
  revalidatePath: (path: string) => {
    mockRevalidatePathCalls.push(path)
  },
}))

// Mock the Supabase server client
jest.mock('@/lib/supabase-server', () => ({
  createSupabaseServerClient: jest.fn().mockImplementation(async () => ({
    from: (table: string) => {
      if (table === 'products') {
        return {
          select: () => ({
            eq: () => ({
              // Return the mock product count
              count: mockProductCount,
              error: mockCountError,
            }),
          }),
        }
      }
      if (table === 'categories') {
        return {
          delete: () => ({
            eq: () => {
              mockDeleteCalled = true
              return {
                error: mockDeleteError,
              }
            },
          }),
        }
      }
      return {}
    },
    auth: {
      getUser: async () => ({ data: { user: { id: 'admin-user-id', email: 'admin@test.com' } } }),
    },
  })),
}))

// Mock the auth module to always return an authenticated admin
jest.mock('@/lib/auth', () => ({
  requireAdmin: jest.fn().mockResolvedValue({ id: 'admin-user-id', email: 'admin@test.com' }),
  getAdminUser: jest.fn().mockResolvedValue({ id: 'admin-user-id', email: 'admin@test.com' }),
}))

// Import after mocks are set up
import { deleteCategory } from '@/app/administrator/actions/categories'

/**
 * Arbitrary generator for valid UUID strings
 */
const uuidArbitrary = fc.uuid()

/**
 * Arbitrary generator for positive product counts (1 or more products)
 */
const positiveProductCountArbitrary = fc.integer({ min: 1, max: 1000 })

/**
 * Arbitrary generator for zero product count
 */
const zeroProductCountArbitrary = fc.constant(0)

/**
 * Arbitrary generator for null product count (edge case)
 */
const nullProductCountArbitrary = fc.constant(null)

/**
 * The expected French error message when deletion is prevented
 */
const EXPECTED_ERROR_MESSAGE = 'Impossible de supprimer une catégorie avec des produits associés'

/**
 * Helper function to reset mock state before each test
 */
function resetMocks() {
  mockProductCount = null
  mockCountError = null
  mockDeleteError = null
  mockDeleteCalled = false
  mockRevalidatePathCalls = []
}

describe('Property 4: Category Deletion Prevention', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Property: For any category with one or more associated products, 
   * deletion SHALL fail with success: false
   * 
   * **Validates: Requirements 4.6**
   */
  it('should fail deletion when category has associated products', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          resetMocks()
          mockProductCount = productCount
          
          const result = await deleteCategory(categoryId)
          
          return result.success === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with one or more associated products, 
   * the error message SHALL be the expected French message
   * 
   * **Validates: Requirements 4.6**
   */
  it('should return the correct French error message when deletion is prevented', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          resetMocks()
          mockProductCount = productCount
          
          const result = await deleteCategory(categoryId)
          
          return result.error === EXPECTED_ERROR_MESSAGE
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with one or more associated products, 
   * the actual delete operation SHALL NOT be called
   * 
   * **Validates: Requirements 4.6**
   */
  it('should not call delete when category has associated products', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          resetMocks()
          mockProductCount = productCount
          
          await deleteCategory(categoryId)
          
          return mockDeleteCalled === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with zero associated products, 
   * deletion SHALL succeed (when no other errors occur)
   * 
   * **Validates: Requirements 4.6** (inverse property - categories without products can be deleted)
   */
  it('should succeed deletion when category has no associated products', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        async (categoryId) => {
          resetMocks()
          mockProductCount = 0
          mockDeleteError = null
          
          const result = await deleteCategory(categoryId)
          
          return result.success === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with zero associated products, 
   * the delete operation SHALL be called
   * 
   * **Validates: Requirements 4.6** (inverse property)
   */
  it('should call delete when category has no associated products', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        async (categoryId) => {
          resetMocks()
          mockProductCount = 0
          mockDeleteError = null
          
          await deleteCategory(categoryId)
          
          return mockDeleteCalled === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any category with null product count (edge case), 
   * deletion SHALL succeed (null is treated as zero)
   * 
   * **Validates: Requirements 4.6**
   */
  it('should succeed deletion when product count is null', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        async (categoryId) => {
          resetMocks()
          mockProductCount = null
          mockDeleteError = null
          
          const result = await deleteCategory(categoryId)
          
          return result.success === true
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Tests for error message consistency
 */
describe('Category Deletion Error Message Consistency', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Property: The error message SHALL be consistent across all product counts > 0
   * 
   * **Validates: Requirements 4.6**
   */
  it('should return the same error message regardless of product count', async () => {
    const productCounts = fc.sample(positiveProductCountArbitrary, 100)
    const errorMessages: string[] = []
    
    for (const count of productCounts) {
      resetMocks()
      mockProductCount = count
      
      const result = await deleteCategory('test-category-id')
      if (result.error) {
        errorMessages.push(result.error)
      }
    }
    
    // All error messages should be identical
    expect(new Set(errorMessages).size).toBe(1)
    expect(errorMessages[0]).toBe(EXPECTED_ERROR_MESSAGE)
  })

  /**
   * Property: The error message SHALL be deterministic
   * 
   * **Validates: Requirements 4.6**
   */
  it('should return deterministic error message', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveProductCountArbitrary,
        async (categoryId, productCount) => {
          resetMocks()
          mockProductCount = productCount
          
          const result1 = await deleteCategory(categoryId)
          
          resetMocks()
          mockProductCount = productCount
          
          const result2 = await deleteCategory(categoryId)
          
          return result1.error === result2.error
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Edge case tests for category deletion
 */
describe('Category Deletion Edge Cases', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Test: Category with exactly 1 product should prevent deletion
   * 
   * **Validates: Requirements 4.6**
   */
  it('should prevent deletion when category has exactly 1 product', async () => {
    mockProductCount = 1
    
    const result = await deleteCategory('test-category-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe(EXPECTED_ERROR_MESSAGE)
    expect(mockDeleteCalled).toBe(false)
  })

  /**
   * Test: Category with many products should prevent deletion
   * 
   * **Validates: Requirements 4.6**
   */
  it('should prevent deletion when category has many products', async () => {
    mockProductCount = 1000
    
    const result = await deleteCategory('test-category-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe(EXPECTED_ERROR_MESSAGE)
    expect(mockDeleteCalled).toBe(false)
  })

  /**
   * Test: Category with exactly 0 products should allow deletion
   * 
   * **Validates: Requirements 4.6**
   */
  it('should allow deletion when category has exactly 0 products', async () => {
    mockProductCount = 0
    mockDeleteError = null
    
    const result = await deleteCategory('test-category-id')
    
    expect(result.success).toBe(true)
    expect(result.error).toBeUndefined()
    expect(mockDeleteCalled).toBe(true)
  })

  /**
   * Test: Invalid category ID should return error
   * 
   * **Validates: Requirements 4.6**
   */
  it('should return error for empty category ID', async () => {
    const result = await deleteCategory('')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('ID de catégorie invalide')
  })

  /**
   * Test: Database count error should be handled
   * 
   * **Validates: Requirements 4.6**
   */
  it('should handle database count error gracefully', async () => {
    mockProductCount = null
    mockCountError = { message: 'Database connection error' }
    
    const result = await deleteCategory('test-category-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('Database connection error')
    expect(mockDeleteCalled).toBe(false)
  })

  /**
   * Test: Database delete error should be handled
   * 
   * **Validates: Requirements 4.6**
   */
  it('should handle database delete error gracefully', async () => {
    mockProductCount = 0
    mockDeleteError = { message: 'Delete operation failed' }
    
    const result = await deleteCategory('test-category-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('Delete operation failed')
  })
})

/**
 * Tests for revalidation behavior
 */
describe('Category Deletion Revalidation', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Test: Successful deletion should trigger path revalidation
   * 
   * **Validates: Requirements 4.6**
   */
  it('should revalidate path on successful deletion', async () => {
    mockProductCount = 0
    mockDeleteError = null
    
    await deleteCategory('test-category-id')
    
    expect(mockRevalidatePathCalls).toContain('/administrator/categories')
  })

  /**
   * Test: Failed deletion (due to products) should NOT trigger path revalidation
   * 
   * **Validates: Requirements 4.6**
   */
  it('should not revalidate path when deletion is prevented', async () => {
    mockProductCount = 5
    
    await deleteCategory('test-category-id')
    
    expect(mockRevalidatePathCalls).toHaveLength(0)
  })
})

/**
 * Property tests for deletion behavior consistency
 */
describe('Deletion Behavior Consistency Properties', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Property: The deletion check should be idempotent - 
   * multiple calls with same state should produce same result
   * 
   * **Validates: Requirements 4.6**
   */
  it('should be idempotent for deletion checks', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        fc.integer({ min: 0, max: 100 }),
        async (categoryId, productCount) => {
          const results: boolean[] = []
          
          for (let i = 0; i < 3; i++) {
            resetMocks()
            mockProductCount = productCount
            mockDeleteError = null
            
            const result = await deleteCategory(categoryId)
            results.push(result.success)
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
   * should be exactly at count > 0
   * 
   * **Validates: Requirements 4.6**
   */
  it('should have clear boundary at product count > 0', async () => {
    // Test with count = 0 (should succeed)
    resetMocks()
    mockProductCount = 0
    mockDeleteError = null
    const resultZero = await deleteCategory('test-id')
    
    // Test with count = 1 (should fail)
    resetMocks()
    mockProductCount = 1
    const resultOne = await deleteCategory('test-id')
    
    expect(resultZero.success).toBe(true)
    expect(resultOne.success).toBe(false)
  })
})
