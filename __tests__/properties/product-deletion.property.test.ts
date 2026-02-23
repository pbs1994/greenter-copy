/**
 * Property-Based Tests for Product Deletion Prevention
 * 
 * Feature: admin-backend
 * Property 6: Product Deletion Prevention
 * 
 * **Validates: Requirements 5.7**
 * 
 * For any product that has one or more associated order items, attempting to delete 
 * that product SHALL fail and return an error message indicating the product has 
 * order history.
 */

import * as fc from 'fast-check'

// Track mock state
let mockOrderItemCount: number | null = null
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
      if (table === 'order_items') {
        return {
          select: () => ({
            eq: () => ({
              // Return the mock order item count
              count: mockOrderItemCount,
              error: mockCountError,
            }),
          }),
        }
      }
      if (table === 'products') {
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
import { deleteProduct } from '@/app/administrator/actions/products'

/**
 * Arbitrary generator for valid UUID strings
 */
const uuidArbitrary = fc.uuid()

/**
 * Arbitrary generator for positive order item counts (1 or more order items)
 */
const positiveOrderItemCountArbitrary = fc.integer({ min: 1, max: 1000 })

/**
 * Arbitrary generator for zero order item count
 */
const zeroOrderItemCountArbitrary = fc.constant(0)

/**
 * Arbitrary generator for null order item count (edge case)
 */
const nullOrderItemCountArbitrary = fc.constant(null)

/**
 * The expected French error message when deletion is prevented
 */
const EXPECTED_ERROR_MESSAGE = 'Impossible de supprimer un produit avec des commandes associées'

/**
 * Helper function to reset mock state before each test
 */
function resetMocks() {
  mockOrderItemCount = null
  mockCountError = null
  mockDeleteError = null
  mockDeleteCalled = false
  mockRevalidatePathCalls = []
}

describe('Property 6: Product Deletion Prevention', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Property: For any product with one or more associated order items, 
   * deletion SHALL fail with success: false
   * 
   * **Validates: Requirements 5.7**
   */
  it('should fail deletion when product has associated order items', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveOrderItemCountArbitrary,
        async (productId, orderItemCount) => {
          resetMocks()
          mockOrderItemCount = orderItemCount
          
          const result = await deleteProduct(productId)
          
          return result.success === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product with one or more associated order items, 
   * the error message SHALL be the expected French message
   * 
   * **Validates: Requirements 5.7**
   */
  it('should return the correct French error message when deletion is prevented', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveOrderItemCountArbitrary,
        async (productId, orderItemCount) => {
          resetMocks()
          mockOrderItemCount = orderItemCount
          
          const result = await deleteProduct(productId)
          
          return result.error === EXPECTED_ERROR_MESSAGE
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product with one or more associated order items, 
   * the actual delete operation SHALL NOT be called
   * 
   * **Validates: Requirements 5.7**
   */
  it('should not call delete when product has associated order items', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveOrderItemCountArbitrary,
        async (productId, orderItemCount) => {
          resetMocks()
          mockOrderItemCount = orderItemCount
          
          await deleteProduct(productId)
          
          return mockDeleteCalled === false
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product with zero associated order items, 
   * deletion SHALL succeed (when no other errors occur)
   * 
   * **Validates: Requirements 5.7** (inverse property - products without order items can be deleted)
   */
  it('should succeed deletion when product has no associated order items', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        async (productId) => {
          resetMocks()
          mockOrderItemCount = 0
          mockDeleteError = null
          
          const result = await deleteProduct(productId)
          
          return result.success === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product with zero associated order items, 
   * the delete operation SHALL be called
   * 
   * **Validates: Requirements 5.7** (inverse property)
   */
  it('should call delete when product has no associated order items', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        async (productId) => {
          resetMocks()
          mockOrderItemCount = 0
          mockDeleteError = null
          
          await deleteProduct(productId)
          
          return mockDeleteCalled === true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product with null order item count (edge case), 
   * deletion SHALL succeed (null is treated as zero)
   * 
   * **Validates: Requirements 5.7**
   */
  it('should succeed deletion when order item count is null', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        async (productId) => {
          resetMocks()
          mockOrderItemCount = null
          mockDeleteError = null
          
          const result = await deleteProduct(productId)
          
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
describe('Product Deletion Error Message Consistency', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Property: The error message SHALL be consistent across all order item counts > 0
   * 
   * **Validates: Requirements 5.7**
   */
  it('should return the same error message regardless of order item count', async () => {
    const orderItemCounts = fc.sample(positiveOrderItemCountArbitrary, 100)
    const errorMessages: string[] = []
    
    for (const count of orderItemCounts) {
      resetMocks()
      mockOrderItemCount = count
      
      const result = await deleteProduct('test-product-id')
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
   * **Validates: Requirements 5.7**
   */
  it('should return deterministic error message', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        positiveOrderItemCountArbitrary,
        async (productId, orderItemCount) => {
          resetMocks()
          mockOrderItemCount = orderItemCount
          
          const result1 = await deleteProduct(productId)
          
          resetMocks()
          mockOrderItemCount = orderItemCount
          
          const result2 = await deleteProduct(productId)
          
          return result1.error === result2.error
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Edge case tests for product deletion
 */
describe('Product Deletion Edge Cases', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Test: Product with exactly 1 order item should prevent deletion
   * 
   * **Validates: Requirements 5.7**
   */
  it('should prevent deletion when product has exactly 1 order item', async () => {
    mockOrderItemCount = 1
    
    const result = await deleteProduct('test-product-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe(EXPECTED_ERROR_MESSAGE)
    expect(mockDeleteCalled).toBe(false)
  })

  /**
   * Test: Product with many order items should prevent deletion
   * 
   * **Validates: Requirements 5.7**
   */
  it('should prevent deletion when product has many order items', async () => {
    mockOrderItemCount = 1000
    
    const result = await deleteProduct('test-product-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe(EXPECTED_ERROR_MESSAGE)
    expect(mockDeleteCalled).toBe(false)
  })

  /**
   * Test: Product with exactly 0 order items should allow deletion
   * 
   * **Validates: Requirements 5.7**
   */
  it('should allow deletion when product has exactly 0 order items', async () => {
    mockOrderItemCount = 0
    mockDeleteError = null
    
    const result = await deleteProduct('test-product-id')
    
    expect(result.success).toBe(true)
    expect(result.error).toBeUndefined()
    expect(mockDeleteCalled).toBe(true)
  })

  /**
   * Test: Invalid product ID should return error
   * 
   * **Validates: Requirements 5.7**
   */
  it('should return error for empty product ID', async () => {
    const result = await deleteProduct('')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('ID de produit invalide')
  })

  /**
   * Test: Database count error should be handled
   * 
   * **Validates: Requirements 5.7**
   */
  it('should handle database count error gracefully', async () => {
    mockOrderItemCount = null
    mockCountError = { message: 'Database connection error' }
    
    const result = await deleteProduct('test-product-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('Database connection error')
    expect(mockDeleteCalled).toBe(false)
  })

  /**
   * Test: Database delete error should be handled
   * 
   * **Validates: Requirements 5.7**
   */
  it('should handle database delete error gracefully', async () => {
    mockOrderItemCount = 0
    mockDeleteError = { message: 'Delete operation failed' }
    
    const result = await deleteProduct('test-product-id')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('Delete operation failed')
  })
})

/**
 * Tests for revalidation behavior
 */
describe('Product Deletion Revalidation', () => {
  beforeEach(() => {
    resetMocks()
  })

  /**
   * Test: Successful deletion should trigger path revalidation
   * 
   * **Validates: Requirements 5.7**
   */
  it('should revalidate path on successful deletion', async () => {
    mockOrderItemCount = 0
    mockDeleteError = null
    
    await deleteProduct('test-product-id')
    
    expect(mockRevalidatePathCalls).toContain('/administrator/products')
  })

  /**
   * Test: Failed deletion (due to order items) should NOT trigger path revalidation
   * 
   * **Validates: Requirements 5.7**
   */
  it('should not revalidate path when deletion is prevented', async () => {
    mockOrderItemCount = 5
    
    await deleteProduct('test-product-id')
    
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
   * **Validates: Requirements 5.7**
   */
  it('should be idempotent for deletion checks', async () => {
    await fc.assert(
      fc.asyncProperty(
        uuidArbitrary,
        fc.integer({ min: 0, max: 100 }),
        async (productId, orderItemCount) => {
          const results: boolean[] = []
          
          for (let i = 0; i < 3; i++) {
            resetMocks()
            mockOrderItemCount = orderItemCount
            mockDeleteError = null
            
            const result = await deleteProduct(productId)
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
   * **Validates: Requirements 5.7**
   */
  it('should have clear boundary at order item count > 0', async () => {
    // Test with count = 0 (should succeed)
    resetMocks()
    mockOrderItemCount = 0
    mockDeleteError = null
    const resultZero = await deleteProduct('test-id')
    
    // Test with count = 1 (should fail)
    resetMocks()
    mockOrderItemCount = 1
    const resultOne = await deleteProduct('test-id')
    
    expect(resultZero.success).toBe(true)
    expect(resultOne.success).toBe(false)
  })
})
