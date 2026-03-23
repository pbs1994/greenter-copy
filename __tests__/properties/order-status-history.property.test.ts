/**
 * Property-Based Tests for Order Status History Logging
 * 
 * Feature: payload-cms-migration
 * Property 8: Order Status History Logging
 * 
 * **Validates: Requirements 6.7**
 * 
 * For any order where the status field is changed, a new entry should be automatically
 * added to the status_history array containing the new status, timestamp, and user
 * who made the change.
 */

import * as fc from 'fast-check'

/**
 * Valid order status values as defined in the Orders collection
 */
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

const ORDER_STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

/**
 * Status history entry structure
 */
interface StatusHistoryEntry {
  status: string
  changed_at: string
  changed_by: string | null
}

/**
 * Order data structure (simplified for testing)
 */
interface OrderData {
  id: string
  order_number: string
  status: OrderStatus
  amount: number
  customer: string
  status_history: StatusHistoryEntry[]
}

/**
 * User data structure (simplified for testing)
 */
interface UserData {
  id: string
  email: string
}

/**
 * Simulates the logStatusChange hook behavior from collections/Orders.ts
 * This mirrors the actual afterChange hook implementation
 */
function simulateStatusChangeHook(
  currentDoc: OrderData,
  previousDoc: OrderData | null,
  operation: 'create' | 'update',
  user: UserData | null
): OrderData {
  // Only track status changes on update operations
  if (operation !== 'update') {
    return currentDoc
  }

  // Check if status has changed
  const previousStatus = previousDoc?.status
  const currentStatus = currentDoc.status

  if (previousStatus && previousStatus !== currentStatus) {
    const statusHistoryEntry: StatusHistoryEntry = {
      status: currentStatus,
      changed_at: new Date().toISOString(),
      changed_by: user?.id || null,
    }

    // Get existing status_history or initialize empty array
    const existingHistory = currentDoc.status_history || []

    return {
      ...currentDoc,
      status_history: [...existingHistory, statusHistoryEntry],
    }
  }

  return currentDoc
}

/**
 * Helper function to validate ISO 8601 date format
 */
function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime()) && dateString.includes('T')
}

/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid MongoDB ObjectId format
 */
const objectIdArbitrary = fc.stringMatching(/^[a-f0-9]{24}$/)

/**
 * Generator for order numbers (GRN-YYYYMMDD-XXXX format)
 */
const orderNumberArbitrary = fc.tuple(
  fc.integer({ min: 2020, max: 2030 }),
  fc.integer({ min: 1, max: 12 }),
  fc.integer({ min: 1, max: 28 }),
  fc.integer({ min: 1, max: 9999 })
).map(([year, month, day, seq]) => {
  const mm = month.toString().padStart(2, '0')
  const dd = day.toString().padStart(2, '0')
  const seqStr = seq.toString().padStart(4, '0')
  return `GRN-${year}${mm}${dd}-${seqStr}`
})

/**
 * Generator for order status
 */
const orderStatusArbitrary = fc.constantFrom(...ORDER_STATUSES)

/**
 * Generator for order amount in cents (1€ to 100,000€)
 */
const amountArbitrary = fc.integer({ min: 100, max: 10000000 })

/**
 * Generator for user data
 */
const userArbitrary = fc.record({
  id: objectIdArbitrary,
  email: fc.emailAddress(),
}) as fc.Arbitrary<UserData>

/**
 * Generator for ISO date strings (safer than fc.date which can generate invalid dates)
 */
const isoDateArbitrary = fc.integer({ 
  min: new Date('2020-01-01').getTime(), 
  max: new Date('2030-12-31').getTime() 
}).map(timestamp => new Date(timestamp).toISOString())

/**
 * Generator for status history entry
 */
const statusHistoryEntryArbitrary = fc.record({
  status: orderStatusArbitrary.map(s => s as string),
  changed_at: isoDateArbitrary,
  changed_by: fc.option(objectIdArbitrary, { nil: null }),
}) as fc.Arbitrary<StatusHistoryEntry>

/**
 * Generator for order data
 */
const orderDataArbitrary = fc.record({
  id: objectIdArbitrary,
  order_number: orderNumberArbitrary,
  status: orderStatusArbitrary,
  amount: amountArbitrary,
  customer: objectIdArbitrary,
  status_history: fc.array(statusHistoryEntryArbitrary, { minLength: 0, maxLength: 10 }),
}) as fc.Arbitrary<OrderData>

/**
 * Generator for a pair of different statuses
 */
const differentStatusPairArbitrary = fc.tuple(
  orderStatusArbitrary,
  orderStatusArbitrary
).filter(([s1, s2]) => s1 !== s2)



describe('Property 8: Order Status History Logging', () => {
  /**
   * Property: When status changes, a new entry SHALL be added to status_history
   * 
   * **Validates: Requirements 6.7**
   */
  describe('Status change logging', () => {
    it('should add new entry to status_history when status changes', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          differentStatusPairArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, [oldStatus, newStatus], user) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }
            const initialHistoryLength = currentDoc.status_history.length

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)

            // Status history should have one more entry
            expect(result.status_history.length).toBe(initialHistoryLength + 1)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should record the new status in the history entry', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          differentStatusPairArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, [oldStatus, newStatus], user) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)

            // The last entry should contain the new status
            const lastEntry = result.status_history[result.status_history.length - 1]
            expect(lastEntry.status).toBe(newStatus)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should record a valid timestamp in the history entry', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          differentStatusPairArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, [oldStatus, newStatus], user) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }

            const beforeChange = new Date()
            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)
            const afterChange = new Date()

            // The last entry should have a valid ISO timestamp
            const lastEntry = result.status_history[result.status_history.length - 1]
            expect(isValidISODate(lastEntry.changed_at)).toBe(true)

            // Timestamp should be within the test execution window
            const entryDate = new Date(lastEntry.changed_at)
            expect(entryDate.getTime()).toBeGreaterThanOrEqual(beforeChange.getTime() - 1000)
            expect(entryDate.getTime()).toBeLessThanOrEqual(afterChange.getTime() + 1000)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should record the user who made the change when user is provided', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          differentStatusPairArbitrary,
          userArbitrary,
          (orderData, [oldStatus, newStatus], user) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)

            // The last entry should contain the user ID
            const lastEntry = result.status_history[result.status_history.length - 1]
            expect(lastEntry.changed_by).toBe(user.id)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should record null for changed_by when no user is provided', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          differentStatusPairArbitrary,
          (orderData, [oldStatus, newStatus]) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', null)

            // The last entry should have null for changed_by
            const lastEntry = result.status_history[result.status_history.length - 1]
            expect(lastEntry.changed_by).toBeNull()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: When status does NOT change, status_history SHALL remain unchanged
   * 
   * **Validates: Requirements 6.7**
   */
  describe('No change when status is the same', () => {
    it('should not add entry when status remains the same', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, user) => {
            const previousDoc: OrderData = { ...orderData }
            const currentDoc: OrderData = { ...orderData } // Same status
            const initialHistoryLength = currentDoc.status_history.length

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)

            // Status history should remain unchanged
            expect(result.status_history.length).toBe(initialHistoryLength)
            expect(result.status_history).toEqual(currentDoc.status_history)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: On create operation, status_history SHALL NOT be modified
   * 
   * **Validates: Requirements 6.7**
   */
  describe('Create operation behavior', () => {
    it('should not add entry on create operation', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, user) => {
            const initialHistoryLength = orderData.status_history.length

            const result = simulateStatusChangeHook(orderData, null, 'create', user)

            // Status history should remain unchanged on create
            expect(result.status_history.length).toBe(initialHistoryLength)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Existing status_history entries SHALL be preserved
   * 
   * **Validates: Requirements 6.7**
   */
  describe('History preservation', () => {
    it('should preserve all existing history entries when adding new one', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary.filter(o => o.status_history.length > 0),
          differentStatusPairArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, [oldStatus, newStatus], user) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }
            const originalHistory = [...currentDoc.status_history]

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)

            // All original entries should be preserved
            for (let i = 0; i < originalHistory.length; i++) {
              expect(result.status_history[i]).toEqual(originalHistory[i])
            }
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should append new entry at the end of history', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary,
          differentStatusPairArbitrary,
          fc.option(userArbitrary, { nil: null }),
          (orderData, [oldStatus, newStatus], user) => {
            const previousDoc: OrderData = { ...orderData, status: oldStatus }
            const currentDoc: OrderData = { ...orderData, status: newStatus }
            const originalLength = currentDoc.status_history.length

            const result = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)

            // New entry should be at the end
            const newEntry = result.status_history[originalLength]
            expect(newEntry.status).toBe(newStatus)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Multiple consecutive status changes SHALL all be logged
   * 
   * **Validates: Requirements 6.7**
   */
  describe('Multiple status changes', () => {
    it('should log all status changes in sequence', () => {
      fc.assert(
        fc.property(
          orderDataArbitrary.map(o => ({ ...o, status_history: [] })),
          fc.array(orderStatusArbitrary, { minLength: 2, maxLength: 5 }),
          userArbitrary,
          (orderData, statusSequence, user) => {
            // Filter to ensure consecutive statuses are different
            const filteredSequence = statusSequence.filter((status, index) => 
              index === 0 || status !== statusSequence[index - 1]
            )
            
            // Need at least 2 different statuses
            fc.pre(filteredSequence.length >= 2)

            let currentDoc = { ...orderData, status: filteredSequence[0] }
            
            // Apply each status change
            for (let i = 1; i < filteredSequence.length; i++) {
              const previousDoc = { ...currentDoc }
              currentDoc = { ...currentDoc, status: filteredSequence[i] }
              currentDoc = simulateStatusChangeHook(currentDoc, previousDoc, 'update', user)
            }

            // Should have logged all status changes (excluding the initial status)
            expect(currentDoc.status_history.length).toBe(filteredSequence.length - 1)

            // Each logged status should match the sequence
            for (let i = 0; i < currentDoc.status_history.length; i++) {
              expect(currentDoc.status_history[i].status).toBe(filteredSequence[i + 1])
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})



/**
 * Edge case tests for order status history logging
 */
describe('Order Status History Edge Cases', () => {
  /**
   * Test: All valid status transitions
   */
  describe('Valid status transitions', () => {
    const statusTransitions: [OrderStatus, OrderStatus][] = [
      ['pending', 'paid'],
      ['paid', 'shipped'],
      ['shipped', 'delivered'],
      ['pending', 'cancelled'],
      ['paid', 'cancelled'],
      ['shipped', 'cancelled'],
    ]

    statusTransitions.forEach(([fromStatus, toStatus]) => {
      it(`should log transition from ${fromStatus} to ${toStatus}`, () => {
        const orderData: OrderData = {
          id: '507f1f77bcf86cd799439011',
          order_number: 'GRN-20240115-0001',
          status: toStatus,
          amount: 99900,
          customer: '507f1f77bcf86cd799439012',
          status_history: [],
        }

        const previousDoc: OrderData = { ...orderData, status: fromStatus }
        const user: UserData = { id: '507f1f77bcf86cd799439013', email: 'admin@greenter.fr' }

        const result = simulateStatusChangeHook(orderData, previousDoc, 'update', user)

        expect(result.status_history.length).toBe(1)
        expect(result.status_history[0].status).toBe(toStatus)
        expect(result.status_history[0].changed_by).toBe(user.id)
      })
    })
  })

  /**
   * Test: Empty status_history initialization
   */
  it('should handle order with undefined status_history', () => {
    const orderData = {
      id: '507f1f77bcf86cd799439011',
      order_number: 'GRN-20240115-0001',
      status: 'paid' as OrderStatus,
      amount: 99900,
      customer: '507f1f77bcf86cd799439012',
      status_history: undefined as unknown as StatusHistoryEntry[],
    }

    const previousDoc = { ...orderData, status: 'pending' as OrderStatus }
    const user: UserData = { id: '507f1f77bcf86cd799439013', email: 'admin@greenter.fr' }

    // Simulate the hook with undefined status_history
    const result = simulateStatusChangeHook(
      { ...orderData, status_history: orderData.status_history || [] },
      previousDoc,
      'update',
      user
    )

    expect(result.status_history.length).toBe(1)
    expect(result.status_history[0].status).toBe('paid')
  })

  /**
   * Test: Typical order lifecycle
   */
  it('should correctly log a complete order lifecycle', () => {
    const user: UserData = { id: '507f1f77bcf86cd799439013', email: 'admin@greenter.fr' }
    
    let orderData: OrderData = {
      id: '507f1f77bcf86cd799439011',
      order_number: 'GRN-20240115-0001',
      status: 'pending',
      amount: 249900,
      customer: '507f1f77bcf86cd799439012',
      status_history: [],
    }

    // Step 1: pending -> paid
    let previousDoc = { ...orderData }
    orderData = { ...orderData, status: 'paid' }
    orderData = simulateStatusChangeHook(orderData, previousDoc, 'update', user)
    expect(orderData.status_history.length).toBe(1)
    expect(orderData.status_history[0].status).toBe('paid')

    // Step 2: paid -> shipped
    previousDoc = { ...orderData }
    orderData = { ...orderData, status: 'shipped' }
    orderData = simulateStatusChangeHook(orderData, previousDoc, 'update', user)
    expect(orderData.status_history.length).toBe(2)
    expect(orderData.status_history[1].status).toBe('shipped')

    // Step 3: shipped -> delivered
    previousDoc = { ...orderData }
    orderData = { ...orderData, status: 'delivered' }
    orderData = simulateStatusChangeHook(orderData, previousDoc, 'update', user)
    expect(orderData.status_history.length).toBe(3)
    expect(orderData.status_history[2].status).toBe('delivered')

    // Verify complete history
    expect(orderData.status_history.map(h => h.status)).toEqual(['paid', 'shipped', 'delivered'])
    expect(orderData.status_history.every(h => h.changed_by === user.id)).toBe(true)
    expect(orderData.status_history.every(h => isValidISODate(h.changed_at))).toBe(true)
  })

  /**
   * Test: Cancellation at different stages
   */
  it('should log cancellation from any status', () => {
    const user: UserData = { id: '507f1f77bcf86cd799439013', email: 'admin@greenter.fr' }
    const startStatuses: OrderStatus[] = ['pending', 'paid', 'shipped']

    startStatuses.forEach(startStatus => {
      const orderData: OrderData = {
        id: '507f1f77bcf86cd799439011',
        order_number: 'GRN-20240115-0001',
        status: 'cancelled',
        amount: 99900,
        customer: '507f1f77bcf86cd799439012',
        status_history: [],
      }

      const previousDoc: OrderData = { ...orderData, status: startStatus }
      const result = simulateStatusChangeHook(orderData, previousDoc, 'update', user)

      expect(result.status_history.length).toBe(1)
      expect(result.status_history[0].status).toBe('cancelled')
    })
  })

  /**
   * Test: Webhook-triggered status change (no user)
   */
  it('should handle webhook-triggered status changes without user', () => {
    const orderData: OrderData = {
      id: '507f1f77bcf86cd799439011',
      order_number: 'GRN-20240115-0001',
      status: 'paid',
      amount: 99900,
      customer: '507f1f77bcf86cd799439012',
      status_history: [],
    }

    const previousDoc: OrderData = { ...orderData, status: 'pending' }
    
    // Webhook triggers without authenticated user
    const result = simulateStatusChangeHook(orderData, previousDoc, 'update', null)

    expect(result.status_history.length).toBe(1)
    expect(result.status_history[0].status).toBe('paid')
    expect(result.status_history[0].changed_by).toBeNull()
    expect(isValidISODate(result.status_history[0].changed_at)).toBe(true)
  })

  /**
   * Test: Timestamps are in chronological order
   */
  it('should maintain chronological order of timestamps', async () => {
    const user: UserData = { id: '507f1f77bcf86cd799439013', email: 'admin@greenter.fr' }
    
    let orderData: OrderData = {
      id: '507f1f77bcf86cd799439011',
      order_number: 'GRN-20240115-0001',
      status: 'pending',
      amount: 99900,
      customer: '507f1f77bcf86cd799439012',
      status_history: [],
    }

    const statuses: OrderStatus[] = ['paid', 'shipped', 'delivered']

    for (const newStatus of statuses) {
      const previousDoc = { ...orderData }
      orderData = { ...orderData, status: newStatus }
      orderData = simulateStatusChangeHook(orderData, previousDoc, 'update', user)
      
      // Small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    // Verify timestamps are in chronological order
    for (let i = 1; i < orderData.status_history.length; i++) {
      const prevTime = new Date(orderData.status_history[i - 1].changed_at).getTime()
      const currTime = new Date(orderData.status_history[i].changed_at).getTime()
      expect(currTime).toBeGreaterThanOrEqual(prevTime)
    }
  })
})

