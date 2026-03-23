/**
 * Property-Based Tests for Customer Email Uniqueness
 *
 * Feature: payload-cms-migration
 * Property 22: Customer Email Uniqueness
 *
 * **Validates: Requirements 5.1**
 *
 * For any attempt to create a Customer with an email that already exists in the database,
 * the operation should either update the existing customer (upsert) or fail with a
 * uniqueness constraint error.
 */

import * as fc from 'fast-check'

/**
 * Type definitions for customer data in Payload CMS
 */
interface PayloadCustomer {
  id: string
  email: string
  name: string | null
  phone: string | null
  createdAt: Date
  updatedAt: Date
}

interface CreateCustomerInput {
  email: string
  name?: string | null
  phone?: string | null
}

/**
 * Result types for customer operations
 */
type CreateResult =
  | { success: true; customer: PayloadCustomer }
  | { success: false; error: 'DUPLICATE_EMAIL' | 'VALIDATION_ERROR' }

type UpsertResult = { success: true; customer: PayloadCustomer; wasCreated: boolean }

/**
 * Simulates Payload CMS Customers collection with unique email constraint
 * This mirrors the Payload collection behavior with unique: true on email field
 */
class PayloadCustomerStore {
  private customers: Map<string, PayloadCustomer> = new Map()
  private idCounter = 1

  private generateId(): string {
    return `customer_${this.idCounter++}`
  }

  /**
   * Create a new customer - fails if email already exists (Payload default behavior)
   * This simulates: payload.create({ collection: 'customers', data: {...} })
   */
  create(input: CreateCustomerInput): CreateResult {
    const normalizedEmail = input.email.toLowerCase()

    // Check for existing customer with same email
    const existing = this.findByEmail(normalizedEmail)
    if (existing) {
      return { success: false, error: 'DUPLICATE_EMAIL' }
    }

    const now = new Date()
    const customer: PayloadCustomer = {
      id: this.generateId(),
      email: normalizedEmail,
      name: input.name ?? null,
      phone: input.phone ?? null,
      createdAt: now,
      updatedAt: now,
    }

    this.customers.set(normalizedEmail, customer)
    return { success: true, customer }
  }

  /**
   * Upsert a customer - creates if not exists, updates if exists
   * This simulates the webhook behavior that uses findOrCreate pattern
   */
  upsert(input: CreateCustomerInput): UpsertResult {
    const normalizedEmail = input.email.toLowerCase()
    const existing = this.findByEmail(normalizedEmail)

    if (existing) {
      // Update existing customer
      const updated: PayloadCustomer = {
        ...existing,
        name: input.name ?? existing.name,
        phone: input.phone ?? existing.phone,
        updatedAt: new Date(),
      }
      this.customers.set(normalizedEmail, updated)
      return { success: true, customer: updated, wasCreated: false }
    }

    // Create new customer
    const now = new Date()
    const customer: PayloadCustomer = {
      id: this.generateId(),
      email: normalizedEmail,
      name: input.name ?? null,
      phone: input.phone ?? null,
      createdAt: now,
      updatedAt: now,
    }
    this.customers.set(normalizedEmail, customer)
    return { success: true, customer, wasCreated: true }
  }

  /**
   * Find customer by email (case-insensitive)
   */
  findByEmail(email: string): PayloadCustomer | undefined {
    return this.customers.get(email.toLowerCase())
  }

  /**
   * Count all customers
   */
  count(): number {
    return this.customers.size
  }

  /**
   * Count customers with specific email
   */
  countByEmail(email: string): number {
    return this.customers.has(email.toLowerCase()) ? 1 : 0
  }

  /**
   * Get all customers
   */
  getAll(): PayloadCustomer[] {
    return Array.from(this.customers.values())
  }

  /**
   * Clear store for test isolation
   */
  clear(): void {
    this.customers.clear()
    this.idCounter = 1
  }
}

/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid email addresses
 */
const emailArbitrary = fc
  .tuple(
    fc.stringMatching(/^[a-z][a-z0-9]{2,10}$/),
    fc.constantFrom(
      'gmail.com',
      'yahoo.fr',
      'outlook.com',
      'example.com',
      'test.fr',
      'entreprise.fr',
      'greenter.fr'
    )
  )
  .map(([local, domain]) => `${local}@${domain}`)

/**
 * Generator for French names (including null)
 */
const frenchNameArbitrary = fc.oneof(
  fc.constantFrom(
    'Jean Dupont',
    'Marie Martin',
    'Pierre Bernard',
    'Sophie Dubois',
    'François Moreau',
    'Isabelle Laurent',
    'Michel Thomas',
    'Catherine Petit',
    'Philippe Robert',
    'Nathalie Richard',
    'Émilie Lefèvre',
    'André Müller'
  ),
  fc.constant(null)
)

/**
 * Generator for French phone numbers (including null)
 */
const frenchPhoneArbitrary = fc.oneof(fc.stringMatching(/^0[1-9][0-9]{8}$/), fc.constant(null))

/**
 * Generator for customer input data
 */
const customerInputArbitrary: fc.Arbitrary<CreateCustomerInput> = fc.record({
  email: emailArbitrary,
  name: frenchNameArbitrary,
  phone: frenchPhoneArbitrary,
})

describe('Property 22: Customer Email Uniqueness', () => {
  /**
   * Property: Creating a customer with duplicate email SHALL fail with uniqueness error
   *
   * **Validates: Requirements 5.1**
   */
  it('should reject duplicate email on create operation', () => {
    fc.assert(
      fc.property(emailArbitrary, frenchNameArbitrary, frenchPhoneArbitrary, (email, name, phone) => {
        const store = new PayloadCustomerStore()

        // First create should succeed
        const firstResult = store.create({ email, name, phone })
        if (!firstResult.success) return false

        // Second create with same email should fail
        const secondResult = store.create({ email, name: 'Different Name', phone: '0600000000' })

        return secondResult.success === false && secondResult.error === 'DUPLICATE_EMAIL'
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Email uniqueness SHALL be case-insensitive
   *
   * **Validates: Requirements 5.1**
   */
  it('should treat email uniqueness as case-insensitive', () => {
    fc.assert(
      fc.property(emailArbitrary, frenchNameArbitrary, (email, name) => {
        const store = new PayloadCustomerStore()

        // Create with lowercase email
        const lowerResult = store.create({ email: email.toLowerCase(), name })
        if (!lowerResult.success) return false

        // Try to create with uppercase email - should fail
        const upperResult = store.create({ email: email.toUpperCase(), name })

        return upperResult.success === false && upperResult.error === 'DUPLICATE_EMAIL'
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Upsert with existing email SHALL update the existing customer
   *
   * **Validates: Requirements 5.1, 22.6**
   */
  it('should update existing customer on upsert with same email', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        frenchNameArbitrary,
        frenchNameArbitrary,
        frenchPhoneArbitrary,
        frenchPhoneArbitrary,
        (email, firstName, secondName, firstPhone, secondPhone) => {
          const store = new PayloadCustomerStore()

          // First upsert creates customer
          const firstResult = store.upsert({ email, name: firstName, phone: firstPhone })
          if (!firstResult.success || !firstResult.wasCreated) return false

          // Second upsert updates customer
          const secondResult = store.upsert({ email, name: secondName, phone: secondPhone })

          return (
            secondResult.success &&
            !secondResult.wasCreated &&
            store.count() === 1 &&
            secondResult.customer.name === (secondName ?? firstName) &&
            secondResult.customer.phone === (secondPhone ?? firstPhone)
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: After any number of operations, each email SHALL have at most one customer
   *
   * **Validates: Requirements 5.1**
   */
  it('should maintain at most one customer per email after multiple operations', () => {
    fc.assert(
      fc.property(fc.array(customerInputArbitrary, { minLength: 1, maxLength: 20 }), (inputs) => {
        const store = new PayloadCustomerStore()

        // Perform upserts for all inputs
        for (const input of inputs) {
          store.upsert(input)
        }

        // Count unique emails
        const uniqueEmails = new Set(inputs.map((i) => i.email.toLowerCase()))

        // Store count should equal unique email count
        return store.count() === uniqueEmails.size
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Each unique email SHALL have exactly one customer record
   *
   * **Validates: Requirements 5.1**
   */
  it('should have exactly one customer per unique email', () => {
    fc.assert(
      fc.property(fc.array(customerInputArbitrary, { minLength: 5, maxLength: 30 }), (inputs) => {
        const store = new PayloadCustomerStore()

        // Upsert all customers
        for (const input of inputs) {
          store.upsert(input)
        }

        // Get unique emails
        const uniqueEmails = new Set(inputs.map((i) => i.email.toLowerCase()))

        // Each unique email should have exactly one record
        return Array.from(uniqueEmails).every((email) => store.countByEmail(email) === 1)
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Customer ID SHALL remain stable across upserts
   *
   * **Validates: Requirements 5.1**
   */
  it('should preserve customer ID across upserts', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        fc.array(
          fc.record({
            name: frenchNameArbitrary,
            phone: frenchPhoneArbitrary,
          }),
          { minLength: 2, maxLength: 10 }
        ),
        (email, dataList) => {
          const store = new PayloadCustomerStore()

          // First upsert
          const firstResult = store.upsert({ email, ...dataList[0] })
          if (!firstResult.success) return false
          const originalId = firstResult.customer.id

          // Subsequent upserts
          for (let i = 1; i < dataList.length; i++) {
            const result = store.upsert({ email, ...dataList[i] })
            if (!result.success || result.customer.id !== originalId) {
              return false
            }
          }

          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: createdAt SHALL remain unchanged across upserts
   *
   * **Validates: Requirements 5.1**
   */
  it('should preserve createdAt timestamp across upserts', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        frenchNameArbitrary,
        frenchNameArbitrary,
        (email, firstName, secondName) => {
          const store = new PayloadCustomerStore()

          // First upsert
          const firstResult = store.upsert({ email, name: firstName })
          if (!firstResult.success) return false
          const originalCreatedAt = firstResult.customer.createdAt

          // Second upsert
          const secondResult = store.upsert({ email, name: secondName })

          return (
            secondResult.success &&
            secondResult.customer.createdAt.getTime() === originalCreatedAt.getTime()
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Different emails SHALL create separate customer records
   *
   * **Validates: Requirements 5.1**
   */
  it('should create separate records for different emails', () => {
    fc.assert(
      fc.property(
        fc
          .array(emailArbitrary, { minLength: 2, maxLength: 10 })
          .filter((emails) => new Set(emails.map((e) => e.toLowerCase())).size === emails.length),
        frenchNameArbitrary,
        (uniqueEmails, name) => {
          const store = new PayloadCustomerStore()

          // Create customers with different emails
          for (const email of uniqueEmails) {
            store.create({ email, name })
          }

          // Should have one customer per email
          return store.count() === uniqueEmails.length
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Edge case tests for customer email uniqueness
 */
describe('Customer Email Uniqueness Edge Cases', () => {
  let store: PayloadCustomerStore

  beforeEach(() => {
    store = new PayloadCustomerStore()
  })

  /**
   * Test: Email with special characters should maintain uniqueness
   */
  it('should handle email with special characters', () => {
    const email = 'test+special@example.com'

    const first = store.create({ email, name: 'First' })
    expect(first.success).toBe(true)

    const second = store.create({ email, name: 'Second' })
    expect(second.success).toBe(false)
    if (!second.success) {
      expect(second.error).toBe('DUPLICATE_EMAIL')
    }
  })

  /**
   * Test: Email with dots should be treated as-is
   */
  it('should treat emails with dots as distinct', () => {
    store.create({ email: 'test.user@example.com', name: 'Test User' })
    store.create({ email: 'testuser@example.com', name: 'Test User 2' })

    // These are different emails
    expect(store.count()).toBe(2)
  })

  /**
   * Test: Mixed case emails should be normalized
   */
  it('should normalize email case on storage', () => {
    store.create({ email: 'Test@Example.COM', name: 'Test' })

    const customer = store.findByEmail('test@example.com')
    expect(customer).toBeDefined()
    expect(customer?.email).toBe('test@example.com')
  })

  /**
   * Test: Upsert should preserve original createdAt
   */
  it('should preserve createdAt on upsert', () => {
    const firstResult = store.upsert({ email: 'test@example.com', name: 'First' })
    expect(firstResult.success).toBe(true)
    const originalCreatedAt = firstResult.customer.createdAt

    // Wait a bit to ensure different timestamp
    const secondResult = store.upsert({ email: 'test@example.com', name: 'Second' })
    expect(secondResult.success).toBe(true)
    expect(secondResult.customer.createdAt.getTime()).toBe(originalCreatedAt.getTime())
  })

  /**
   * Test: Upsert should update updatedAt
   */
  it('should update updatedAt on upsert', async () => {
    const firstResult = store.upsert({ email: 'test@example.com', name: 'First' })
    expect(firstResult.success).toBe(true)
    const originalUpdatedAt = firstResult.customer.updatedAt

    // Small delay to ensure different timestamp
    await new Promise((resolve) => setTimeout(resolve, 10))

    const secondResult = store.upsert({ email: 'test@example.com', name: 'Second' })
    expect(secondResult.success).toBe(true)
    expect(secondResult.customer.updatedAt.getTime()).toBeGreaterThanOrEqual(
      originalUpdatedAt.getTime()
    )
  })

  /**
   * Test: French accented names should be preserved
   */
  it('should preserve French accented names', () => {
    store.create({ email: 'test@example.com', name: 'François Müller-Lévy' })

    const customer = store.findByEmail('test@example.com')
    expect(customer?.name).toBe('François Müller-Lévy')
  })

  /**
   * Test: Null name and phone should be handled correctly
   */
  it('should handle null name and phone', () => {
    store.create({ email: 'test@example.com', name: null, phone: null })

    const customer = store.findByEmail('test@example.com')
    expect(customer?.name).toBeNull()
    expect(customer?.phone).toBeNull()
  })

  /**
   * Test: Rapid sequential creates should maintain uniqueness
   */
  it('should maintain uniqueness under rapid sequential creates', () => {
    const email = 'rapid@example.com'
    let successCount = 0
    let failCount = 0

    for (let i = 0; i < 100; i++) {
      const result = store.create({ email, name: `Name ${i}` })
      if (result.success) {
        successCount++
      } else {
        failCount++
      }
    }

    expect(successCount).toBe(1)
    expect(failCount).toBe(99)
    expect(store.count()).toBe(1)
  })
})

/**
 * Real-world scenario tests simulating Stripe webhook processing
 */
describe('Customer Email Uniqueness - Webhook Scenarios', () => {
  let store: PayloadCustomerStore

  beforeEach(() => {
    store = new PayloadCustomerStore()
  })

  /**
   * Test: Stripe webhook creates customer on first order
   */
  it('should create customer on first order webhook', () => {
    const result = store.upsert({
      email: 'customer@example.fr',
      name: 'Jean Dupont',
      phone: '0612345678',
    })

    expect(result.success).toBe(true)
    expect(result.wasCreated).toBe(true)
    expect(store.count()).toBe(1)
  })

  /**
   * Test: Stripe webhook updates customer on subsequent orders
   */
  it('should update customer on subsequent order webhooks', () => {
    // First order
    store.upsert({
      email: 'customer@example.fr',
      name: 'Jean Dupont',
      phone: '0612345678',
    })

    // Second order with updated phone
    const result = store.upsert({
      email: 'customer@example.fr',
      name: 'Jean Dupont',
      phone: '0698765432',
    })

    expect(result.success).toBe(true)
    expect(result.wasCreated).toBe(false)
    expect(store.count()).toBe(1)
    expect(result.customer.phone).toBe('0698765432')
  })

  /**
   * Test: Multiple customers from different webhooks
   */
  it('should handle multiple customers from different webhooks', () => {
    const customers = [
      { email: 'alice@example.fr', name: 'Alice Martin', phone: '0600000001' },
      { email: 'bob@example.fr', name: 'Bob Bernard', phone: '0600000002' },
      { email: 'charlie@example.fr', name: 'Charlie Dubois', phone: '0600000003' },
    ]

    for (const customer of customers) {
      store.upsert(customer)
    }

    expect(store.count()).toBe(3)
    for (const customer of customers) {
      expect(store.findByEmail(customer.email)).toBeDefined()
    }
  })

  /**
   * Test: Webhook retry scenario - same event processed multiple times
   */
  it('should handle webhook retry (idempotent)', () => {
    const webhookData = {
      email: 'customer@example.com',
      name: 'Marie Martin',
      phone: '0145678901',
    }

    // Simulate webhook being processed 3 times (initial + 2 retries)
    store.upsert(webhookData)
    store.upsert(webhookData)
    store.upsert(webhookData)

    expect(store.count()).toBe(1)
    const customer = store.findByEmail(webhookData.email)
    expect(customer?.name).toBe(webhookData.name)
    expect(customer?.phone).toBe(webhookData.phone)
  })

  /**
   * Test: Interleaved webhooks from multiple customers
   */
  it('should handle interleaved webhooks correctly', () => {
    // Simulate interleaved webhook events
    store.upsert({ email: 'alice@example.com', name: 'Alice', phone: '0600000001' })
    store.upsert({ email: 'bob@example.com', name: 'Bob', phone: '0600000002' })
    store.upsert({ email: 'alice@example.com', name: 'Alice Updated', phone: '0611111111' })
    store.upsert({ email: 'charlie@example.com', name: 'Charlie', phone: '0600000003' })
    store.upsert({ email: 'bob@example.com', name: 'Bob Updated', phone: '0622222222' })

    expect(store.count()).toBe(3)
    expect(store.findByEmail('alice@example.com')?.name).toBe('Alice Updated')
    expect(store.findByEmail('alice@example.com')?.phone).toBe('0611111111')
    expect(store.findByEmail('bob@example.com')?.name).toBe('Bob Updated')
    expect(store.findByEmail('bob@example.com')?.phone).toBe('0622222222')
    expect(store.findByEmail('charlie@example.com')?.name).toBe('Charlie')
  })

  /**
   * Test: Customer info update between orders
   */
  it('should preserve latest customer info when customer updates details', () => {
    const email = 'updating.customer@example.fr'

    // First order
    store.upsert({ email, name: 'Pierre Bernard', phone: '0611111111' })

    // Second order - customer changed name
    store.upsert({ email, name: 'Pierre Bernard-Dubois', phone: '0611111111' })

    // Third order - customer updated phone
    store.upsert({ email, name: 'Pierre Bernard-Dubois', phone: '0622222222' })

    expect(store.count()).toBe(1)
    const customer = store.findByEmail(email)
    expect(customer?.name).toBe('Pierre Bernard-Dubois')
    expect(customer?.phone).toBe('0622222222')
  })
})
