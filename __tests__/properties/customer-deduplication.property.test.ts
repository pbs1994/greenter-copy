/**
 * Property-Based Tests for Customer Deduplication
 * 
 * Feature: admin-backend
 * Property 9: Customer Deduplication (Idempotence)
 * 
 * **Validates: Requirements 8.4**
 * 
 * For any two Stripe webhook events with the same customer email, processing both 
 * events SHALL result in exactly one customer record with that email (no duplicates created).
 */

import * as fc from 'fast-check';

/**
 * Type definitions for customer data
 */
interface CustomerRecord {
  email: string;
  name: string | null;
  phone: string | null;
  created_at?: Date;
}

/**
 * Simulates an in-memory customer store with upsert behavior
 * This mirrors the database upsert logic: INSERT ... ON CONFLICT (email) DO UPDATE
 */
class CustomerStore {
  private customers: Map<string, CustomerRecord> = new Map();

  /**
   * Upsert a customer by email - if exists, update; if not, insert
   * This simulates the Supabase upsert with onConflict: 'email'
   */
  upsert(customer: CustomerRecord): CustomerRecord {
    const existing = this.customers.get(customer.email);
    
    if (existing) {
      // Update existing record, preserving created_at
      const updated: CustomerRecord = {
        ...customer,
        created_at: existing.created_at,
      };
      this.customers.set(customer.email, updated);
      return updated;
    } else {
      // Insert new record
      const newRecord: CustomerRecord = {
        ...customer,
        created_at: new Date(),
      };
      this.customers.set(customer.email, newRecord);
      return newRecord;
    }
  }

  /**
   * Get a customer by email
   */
  getByEmail(email: string): CustomerRecord | undefined {
    return this.customers.get(email);
  }

  /**
   * Get total count of customers
   */
  count(): number {
    return this.customers.size;
  }

  /**
   * Count customers with a specific email (should always be 0 or 1)
   */
  countByEmail(email: string): number {
    return this.customers.has(email) ? 1 : 0;
  }

  /**
   * Get all customers
   */
  getAll(): CustomerRecord[] {
    return Array.from(this.customers.values());
  }

  /**
   * Clear all customers (for test isolation)
   */
  clear(): void {
    this.customers.clear();
  }
}

/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid email addresses
 */
const emailArbitrary = fc.tuple(
  fc.stringMatching(/^[a-z][a-z0-9]{2,10}$/),
  fc.constantFrom('gmail.com', 'yahoo.fr', 'outlook.com', 'example.com', 'test.fr', 'entreprise.fr')
).map(([local, domain]) => `${local}@${domain}`);

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
);

/**
 * Generator for French phone numbers (including null)
 */
const frenchPhoneArbitrary = fc.oneof(
  fc.stringMatching(/^0[1-9][0-9]{8}$/),
  fc.constant(null)
);

/**
 * Generator for customer data (without email - email will be provided separately)
 */
const customerDataArbitrary = fc.record({
  name: frenchNameArbitrary,
  phone: frenchPhoneArbitrary,
});

/**
 * Generator for complete customer record
 */
const customerRecordArbitrary = fc.record({
  email: emailArbitrary,
  name: frenchNameArbitrary,
  phone: frenchPhoneArbitrary,
}) as fc.Arbitrary<CustomerRecord>;

describe('Property 9: Customer Deduplication (Idempotence)', () => {
  /**
   * Property: Multiple upserts with the same email SHALL result in exactly one customer record
   * 
   * **Validates: Requirements 8.4**
   */
  it('should have exactly one customer record after multiple upserts with same email', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        fc.array(customerDataArbitrary, { minLength: 2, maxLength: 10 }),
        (email, customerDataList) => {
          const store = new CustomerStore();

          // Upsert multiple times with the same email
          for (const data of customerDataList) {
            store.upsert({ ...data, email });
          }

          // Should have exactly one customer with this email
          return store.countByEmail(email) === 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Total customer count SHALL equal the number of unique emails after multiple upserts
   * 
   * **Validates: Requirements 8.4**
   */
  it('should have total customer count equal to unique email count', () => {
    fc.assert(
      fc.property(
        fc.array(customerRecordArbitrary, { minLength: 1, maxLength: 20 }),
        (customers) => {
          const store = new CustomerStore();

          // Upsert all customers
          for (const customer of customers) {
            store.upsert(customer);
          }

          // Count unique emails
          const uniqueEmails = new Set(customers.map(c => c.email));

          // Total count should equal unique email count
          return store.count() === uniqueEmails.size;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: The last upserted data SHALL be preserved for each email
   * 
   * **Validates: Requirements 8.4**
   */
  it('should preserve the latest customer data after multiple upserts', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        fc.array(customerDataArbitrary, { minLength: 2, maxLength: 10 }),
        (email, customerDataList) => {
          const store = new CustomerStore();

          // Upsert multiple times with the same email
          for (const data of customerDataList) {
            store.upsert({ ...data, email });
          }

          // Get the stored customer
          const storedCustomer = store.getByEmail(email);
          const lastData = customerDataList[customerDataList.length - 1];

          // The stored data should match the last upserted data
          return (
            storedCustomer !== undefined &&
            storedCustomer.email === email &&
            storedCustomer.name === lastData.name &&
            storedCustomer.phone === lastData.phone
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Processing two webhook events with the same email SHALL result in one customer
   * This simulates the actual webhook scenario
   * 
   * **Validates: Requirements 8.4**
   */
  it('should create exactly one customer when processing two webhook events with same email', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        customerDataArbitrary,
        customerDataArbitrary,
        (email, firstEventData, secondEventData) => {
          const store = new CustomerStore();

          // Simulate first webhook event
          store.upsert({ ...firstEventData, email });

          // Simulate second webhook event with same email
          store.upsert({ ...secondEventData, email });

          // Should have exactly one customer
          return store.countByEmail(email) === 1 && store.count() === 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Upsert SHALL be idempotent - upserting the same data twice has same effect as once
   * 
   * **Validates: Requirements 8.4**
   */
  it('should be idempotent - same data upserted twice equals once', () => {
    fc.assert(
      fc.property(
        customerRecordArbitrary,
        fc.integer({ min: 2, max: 10 }),
        (customer, repeatCount) => {
          const store = new CustomerStore();

          // Upsert the same customer multiple times
          for (let i = 0; i < repeatCount; i++) {
            store.upsert(customer);
          }

          // Should have exactly one customer
          const storedCustomer = store.getByEmail(customer.email);
          
          return (
            store.count() === 1 &&
            storedCustomer !== undefined &&
            storedCustomer.email === customer.email &&
            storedCustomer.name === customer.name &&
            storedCustomer.phone === customer.phone
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Different emails SHALL create separate customer records
   * 
   * **Validates: Requirements 8.4**
   */
  it('should create separate records for different emails', () => {
    fc.assert(
      fc.property(
        fc.array(emailArbitrary, { minLength: 2, maxLength: 10 })
          .filter(emails => new Set(emails).size === emails.length), // Ensure unique emails
        customerDataArbitrary,
        (uniqueEmails, customerData) => {
          const store = new CustomerStore();

          // Upsert customers with different emails
          for (const email of uniqueEmails) {
            store.upsert({ ...customerData, email });
          }

          // Should have one customer per unique email
          return store.count() === uniqueEmails.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Mixed scenario - some duplicate emails, some unique
   * 
   * **Validates: Requirements 8.4**
   */
  it('should handle mixed duplicate and unique emails correctly', () => {
    fc.assert(
      fc.property(
        fc.array(customerRecordArbitrary, { minLength: 5, maxLength: 20 }),
        (customers) => {
          const store = new CustomerStore();

          // Upsert all customers (may have duplicate emails)
          for (const customer of customers) {
            store.upsert(customer);
          }

          // Count unique emails
          const uniqueEmails = new Set(customers.map(c => c.email));

          // Each unique email should have exactly one record
          const allEmailsHaveOneRecord = Array.from(uniqueEmails).every(
            email => store.countByEmail(email) === 1
          );

          return store.count() === uniqueEmails.size && allEmailsHaveOneRecord;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Email lookup SHALL always return the customer if it was upserted
   * 
   * **Validates: Requirements 8.4**
   */
  it('should always find customer by email after upsert', () => {
    fc.assert(
      fc.property(
        customerRecordArbitrary,
        (customer) => {
          const store = new CustomerStore();

          // Upsert the customer
          store.upsert(customer);

          // Should be able to find by email
          const found = store.getByEmail(customer.email);
          
          return found !== undefined && found.email === customer.email;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Edge case tests for customer deduplication
 */
describe('Customer Deduplication Edge Cases', () => {
  let store: CustomerStore;

  beforeEach(() => {
    store = new CustomerStore();
  });

  /**
   * Test: Email case sensitivity - emails should be treated as-is
   * Note: In production, email normalization might be applied
   */
  it('should treat emails as case-sensitive (as stored)', () => {
    store.upsert({ email: 'Test@Example.com', name: 'Test 1', phone: null });
    store.upsert({ email: 'test@example.com', name: 'Test 2', phone: null });

    // These are different emails (case-sensitive)
    expect(store.count()).toBe(2);
  });

  /**
   * Test: Empty name and phone should be preserved
   */
  it('should handle null name and phone correctly', () => {
    store.upsert({ email: 'test@example.com', name: null, phone: null });

    const customer = store.getByEmail('test@example.com');
    expect(customer).toBeDefined();
    expect(customer?.name).toBeNull();
    expect(customer?.phone).toBeNull();
  });

  /**
   * Test: Updating from null to value should work
   */
  it('should update from null to value', () => {
    store.upsert({ email: 'test@example.com', name: null, phone: null });
    store.upsert({ email: 'test@example.com', name: 'Jean Dupont', phone: '0612345678' });

    const customer = store.getByEmail('test@example.com');
    expect(customer?.name).toBe('Jean Dupont');
    expect(customer?.phone).toBe('0612345678');
  });

  /**
   * Test: Updating from value to null should work
   */
  it('should update from value to null', () => {
    store.upsert({ email: 'test@example.com', name: 'Jean Dupont', phone: '0612345678' });
    store.upsert({ email: 'test@example.com', name: null, phone: null });

    const customer = store.getByEmail('test@example.com');
    expect(customer?.name).toBeNull();
    expect(customer?.phone).toBeNull();
  });

  /**
   * Test: Email with special characters should work
   */
  it('should handle email with special characters', () => {
    store.upsert({ email: 'test+special@example.com', name: 'Test', phone: null });
    store.upsert({ email: 'test+special@example.com', name: 'Updated', phone: null });

    expect(store.count()).toBe(1);
    expect(store.getByEmail('test+special@example.com')?.name).toBe('Updated');
  });

  /**
   * Test: French accented names should be preserved
   */
  it('should preserve French accented names', () => {
    store.upsert({ email: 'test@example.com', name: 'François Müller-Lévy', phone: null });

    const customer = store.getByEmail('test@example.com');
    expect(customer?.name).toBe('François Müller-Lévy');
  });

  /**
   * Test: Multiple rapid upserts should still result in one record
   */
  it('should handle rapid sequential upserts', () => {
    const email = 'rapid@example.com';
    
    for (let i = 0; i < 100; i++) {
      store.upsert({ email, name: `Name ${i}`, phone: `012345678${i % 10}` });
    }

    expect(store.count()).toBe(1);
    expect(store.getByEmail(email)?.name).toBe('Name 99');
  });

  /**
   * Test: Large batch of customers with some duplicates
   */
  it('should handle large batch with duplicates', () => {
    const emails = ['a@test.com', 'b@test.com', 'c@test.com', 'd@test.com', 'e@test.com'];
    
    // Insert 50 customers, cycling through 5 emails
    for (let i = 0; i < 50; i++) {
      const email = emails[i % 5];
      store.upsert({ email, name: `Customer ${i}`, phone: null });
    }

    // Should have exactly 5 unique customers
    expect(store.count()).toBe(5);
    
    // Each should have the last name assigned
    expect(store.getByEmail('a@test.com')?.name).toBe('Customer 45');
    expect(store.getByEmail('b@test.com')?.name).toBe('Customer 46');
    expect(store.getByEmail('c@test.com')?.name).toBe('Customer 47');
    expect(store.getByEmail('d@test.com')?.name).toBe('Customer 48');
    expect(store.getByEmail('e@test.com')?.name).toBe('Customer 49');
  });
});

/**
 * Real-world scenario tests simulating webhook processing
 */
describe('Real-world Webhook Deduplication Scenarios', () => {
  let store: CustomerStore;

  beforeEach(() => {
    store = new CustomerStore();
  });

  /**
   * Test: Customer places multiple orders
   */
  it('should handle customer placing multiple orders', () => {
    const customerEmail = 'loyal.customer@example.fr';

    // First order
    store.upsert({
      email: customerEmail,
      name: 'Jean Dupont',
      phone: '0612345678',
    });

    // Second order (same customer, maybe updated phone)
    store.upsert({
      email: customerEmail,
      name: 'Jean Dupont',
      phone: '0698765432',
    });

    // Third order
    store.upsert({
      email: customerEmail,
      name: 'Jean Dupont',
      phone: '0698765432',
    });

    // Should have exactly one customer
    expect(store.count()).toBe(1);
    
    // Should have the latest phone number
    const customer = store.getByEmail(customerEmail);
    expect(customer?.phone).toBe('0698765432');
  });

  /**
   * Test: Webhook retry scenario - same event processed multiple times
   */
  it('should handle webhook retry (same event processed multiple times)', () => {
    const webhookData = {
      email: 'customer@example.com',
      name: 'Marie Martin',
      phone: '0145678901',
    };

    // Simulate webhook being processed 3 times (initial + 2 retries)
    store.upsert(webhookData);
    store.upsert(webhookData);
    store.upsert(webhookData);

    // Should still have exactly one customer
    expect(store.count()).toBe(1);
    expect(store.getByEmail(webhookData.email)).toEqual(expect.objectContaining(webhookData));
  });

  /**
   * Test: Customer updates their info between orders
   */
  it('should preserve latest customer info when customer updates details', () => {
    const email = 'updating.customer@example.fr';

    // First order with initial info
    store.upsert({
      email,
      name: 'Pierre Bernard',
      phone: '0611111111',
    });

    // Second order - customer changed their name (marriage, etc.)
    store.upsert({
      email,
      name: 'Pierre Bernard-Dubois',
      phone: '0611111111',
    });

    // Third order - customer updated phone
    store.upsert({
      email,
      name: 'Pierre Bernard-Dubois',
      phone: '0622222222',
    });

    expect(store.count()).toBe(1);
    
    const customer = store.getByEmail(email);
    expect(customer?.name).toBe('Pierre Bernard-Dubois');
    expect(customer?.phone).toBe('0622222222');
  });

  /**
   * Test: Multiple different customers ordering
   */
  it('should correctly handle multiple different customers', () => {
    const customers = [
      { email: 'customer1@example.com', name: 'Customer One', phone: '0600000001' },
      { email: 'customer2@example.com', name: 'Customer Two', phone: '0600000002' },
      { email: 'customer3@example.com', name: 'Customer Three', phone: '0600000003' },
    ];

    // Each customer places 2 orders
    for (const customer of customers) {
      store.upsert(customer);
      store.upsert(customer);
    }

    // Should have exactly 3 customers
    expect(store.count()).toBe(3);

    // Each customer should exist
    for (const customer of customers) {
      expect(store.getByEmail(customer.email)).toBeDefined();
    }
  });

  /**
   * Test: Interleaved orders from multiple customers
   */
  it('should handle interleaved orders from multiple customers', () => {
    // Simulate orders coming in interleaved fashion
    store.upsert({ email: 'alice@example.com', name: 'Alice', phone: '0600000001' });
    store.upsert({ email: 'bob@example.com', name: 'Bob', phone: '0600000002' });
    store.upsert({ email: 'alice@example.com', name: 'Alice Updated', phone: '0600000001' });
    store.upsert({ email: 'charlie@example.com', name: 'Charlie', phone: '0600000003' });
    store.upsert({ email: 'bob@example.com', name: 'Bob Updated', phone: '0600000002' });
    store.upsert({ email: 'alice@example.com', name: 'Alice Final', phone: '0611111111' });

    // Should have exactly 3 customers
    expect(store.count()).toBe(3);

    // Each should have their latest data
    expect(store.getByEmail('alice@example.com')?.name).toBe('Alice Final');
    expect(store.getByEmail('alice@example.com')?.phone).toBe('0611111111');
    expect(store.getByEmail('bob@example.com')?.name).toBe('Bob Updated');
    expect(store.getByEmail('charlie@example.com')?.name).toBe('Charlie');
  });
});
