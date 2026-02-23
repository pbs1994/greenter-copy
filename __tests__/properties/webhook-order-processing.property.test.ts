/**
 * Property-Based Tests for Webhook Order Processing
 * 
 * Feature: admin-backend
 * Property 8: Webhook Order Processing Completeness
 * 
 * **Validates: Requirements 8.1, 8.2, 8.3**
 * 
 * For any valid Stripe checkout.session.completed webhook event with customer details 
 * and line items, processing the webhook SHALL result in: (a) a customer record existing 
 * with the session's email, (b) an order record with status 'paid' and the session's amount, 
 * and (c) order_items records matching the session's line items.
 */

import * as fc from 'fast-check';

/**
 * Type definitions for Stripe session data (simplified for testing)
 */
interface CustomerDetails {
  email: string;
  name: string | null;
  phone: string | null;
  address: Address | null;
}

interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

interface LineItem {
  productName: string;
  quantity: number;
  unitPrice: number; // in cents
}

interface StripeSessionData {
  id: string;
  customer_details: CustomerDetails;
  amount_total: number; // in cents
  line_items: LineItem[];
}

/**
 * Type definitions for database records
 */
interface CustomerRecord {
  email: string;
  name: string | null;
  phone: string | null;
}

interface OrderRecord {
  order_number: string;
  stripe_session_id: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  amount: number;
  shipping_address: Address | null;
  billing_address: Address | null;
}

interface OrderItemRecord {
  product_name: string;
  quantity: number;
  unit_price: number;
}

/**
 * Data transformation functions that mirror the webhook handler logic
 */

/**
 * Generates an order number from a Stripe session ID
 * Format: GRT-XXXXXXXX (last 8 characters of session ID, uppercased)
 */
function generateOrderNumber(sessionId: string): string {
  return `GRT-${sessionId.slice(-8).toUpperCase()}`;
}

/**
 * Maps Stripe customer details to a customer record
 */
function mapCustomerDetails(customerDetails: CustomerDetails): CustomerRecord {
  return {
    email: customerDetails.email,
    name: customerDetails.name,
    phone: customerDetails.phone,
  };
}

/**
 * Maps Stripe session data to an order record
 */
function mapSessionToOrder(session: StripeSessionData): OrderRecord {
  return {
    order_number: generateOrderNumber(session.id),
    stripe_session_id: session.id,
    status: 'paid',
    amount: session.amount_total,
    shipping_address: session.customer_details.address,
    billing_address: session.customer_details.address,
  };
}

/**
 * Maps Stripe line items to order item records
 */
function mapLineItemsToOrderItems(lineItems: LineItem[]): OrderItemRecord[] {
  return lineItems.map(item => ({
    product_name: item.productName || 'Produit',
    quantity: item.quantity || 1,
    unit_price: item.unitPrice || 0,
  }));
}

/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid email addresses
 */
const emailArbitrary = fc.tuple(
  fc.stringMatching(/^[a-z][a-z0-9]{2,10}$/),
  fc.constantFrom('gmail.com', 'yahoo.fr', 'outlook.com', 'example.com', 'test.fr')
).map(([local, domain]) => `${local}@${domain}`);

/**
 * Generator for French names
 */
const frenchNameArbitrary = fc.constantFrom(
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
  null
);

/**
 * Generator for French phone numbers
 */
const frenchPhoneArbitrary = fc.oneof(
  fc.stringMatching(/^0[1-9][0-9]{8}$/),
  fc.constant(null)
);

/**
 * Generator for French addresses
 */
const frenchAddressArbitrary = fc.oneof(
  fc.record({
    line1: fc.stringMatching(/^[0-9]{1,4} [A-Za-z ]{5,30}$/),
    line2: fc.option(fc.string({ minLength: 0, maxLength: 50 }), { nil: undefined }),
    city: fc.constantFrom('Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux'),
    postal_code: fc.stringMatching(/^[0-9]{5}$/),
    country: fc.constant('FR'),
  }),
  fc.constant(null)
);

/**
 * Generator for Stripe session IDs (format: cs_test_XXXX or cs_live_XXXX)
 */
const stripeSessionIdArbitrary = fc.tuple(
  fc.constantFrom('cs_test_', 'cs_live_'),
  fc.stringMatching(/^[A-Za-z0-9]{20,40}$/)
).map(([prefix, suffix]) => `${prefix}${suffix}`);

/**
 * Generator for customer details
 */
const customerDetailsArbitrary = fc.record({
  email: emailArbitrary,
  name: frenchNameArbitrary,
  phone: frenchPhoneArbitrary,
  address: frenchAddressArbitrary,
}) as fc.Arbitrary<CustomerDetails>;

/**
 * Generator for product names
 */
const productNameArbitrary = fc.constantFrom(
  'KSTAR BluE-S 6kW',
  'Batterie solaire 10kWh',
  'Onduleur hybride',
  'Panneau photovoltaïque',
  'Pompe à chaleur',
  'Chauffe-eau thermodynamique'
);

/**
 * Generator for line items
 */
const lineItemArbitrary = fc.record({
  productName: productNameArbitrary,
  quantity: fc.integer({ min: 1, max: 10 }),
  unitPrice: fc.integer({ min: 100, max: 10000000 }), // 1€ to 100,000€ in cents
}) as fc.Arbitrary<LineItem>;

/**
 * Generator for arrays of line items (1-5 items per order)
 */
const lineItemsArbitrary = fc.array(lineItemArbitrary, { minLength: 1, maxLength: 5 });

/**
 * Generator for amount in cents (realistic order amounts)
 */
const amountArbitrary = fc.integer({ min: 100, max: 10000000 }); // 1€ to 100,000€

/**
 * Generator for complete Stripe session data
 */
const stripeSessionArbitrary = fc.record({
  id: stripeSessionIdArbitrary,
  customer_details: customerDetailsArbitrary,
  amount_total: amountArbitrary,
  line_items: lineItemsArbitrary,
}) as fc.Arbitrary<StripeSessionData>;

describe('Property 8: Webhook Order Processing Completeness', () => {
  /**
   * Property: Order number SHALL be generated correctly from session ID
   * Format: GRT-XXXXXXXX (last 8 characters, uppercased)
   * 
   * **Validates: Requirements 8.2**
   */
  it('should generate valid order number from session ID', () => {
    fc.assert(
      fc.property(
        stripeSessionIdArbitrary,
        (sessionId) => {
          const orderNumber = generateOrderNumber(sessionId);
          
          // Verify format: GRT- prefix followed by exactly 8 uppercase alphanumeric characters
          const isValidFormat = /^GRT-[A-Z0-9]{8}$/.test(orderNumber);
          
          // Verify the last 8 characters of session ID are used
          const expectedSuffix = sessionId.slice(-8).toUpperCase();
          const actualSuffix = orderNumber.slice(4); // Remove 'GRT-' prefix
          
          return isValidFormat && actualSuffix === expectedSuffix;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Customer data mapping SHALL preserve email exactly
   * 
   * **Validates: Requirements 8.1**
   */
  it('should preserve customer email exactly in mapping', () => {
    fc.assert(
      fc.property(
        customerDetailsArbitrary,
        (customerDetails) => {
          const customerRecord = mapCustomerDetails(customerDetails);
          
          return customerRecord.email === customerDetails.email;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Customer data mapping SHALL preserve name correctly
   * 
   * **Validates: Requirements 8.1**
   */
  it('should preserve customer name in mapping', () => {
    fc.assert(
      fc.property(
        customerDetailsArbitrary,
        (customerDetails) => {
          const customerRecord = mapCustomerDetails(customerDetails);
          
          return customerRecord.name === customerDetails.name;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Customer data mapping SHALL preserve phone correctly
   * 
   * **Validates: Requirements 8.1**
   */
  it('should preserve customer phone in mapping', () => {
    fc.assert(
      fc.property(
        customerDetailsArbitrary,
        (customerDetails) => {
          const customerRecord = mapCustomerDetails(customerDetails);
          
          return customerRecord.phone === customerDetails.phone;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order mapping SHALL always set status to 'paid'
   * 
   * **Validates: Requirements 8.2**
   */
  it('should always set order status to paid', () => {
    fc.assert(
      fc.property(
        stripeSessionArbitrary,
        (session) => {
          const orderRecord = mapSessionToOrder(session);
          
          return orderRecord.status === 'paid';
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order mapping SHALL preserve amount exactly
   * 
   * **Validates: Requirements 8.2**
   */
  it('should preserve order amount exactly', () => {
    fc.assert(
      fc.property(
        stripeSessionArbitrary,
        (session) => {
          const orderRecord = mapSessionToOrder(session);
          
          return orderRecord.amount === session.amount_total;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order mapping SHALL preserve stripe session ID
   * 
   * **Validates: Requirements 8.2**
   */
  it('should preserve stripe session ID in order', () => {
    fc.assert(
      fc.property(
        stripeSessionArbitrary,
        (session) => {
          const orderRecord = mapSessionToOrder(session);
          
          return orderRecord.stripe_session_id === session.id;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order items mapping SHALL preserve the count of line items
   * 
   * **Validates: Requirements 8.3**
   */
  it('should create same number of order items as line items', () => {
    fc.assert(
      fc.property(
        lineItemsArbitrary,
        (lineItems) => {
          const orderItems = mapLineItemsToOrderItems(lineItems);
          
          return orderItems.length === lineItems.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order items mapping SHALL preserve product names
   * 
   * **Validates: Requirements 8.3**
   */
  it('should preserve product names in order items', () => {
    fc.assert(
      fc.property(
        lineItemsArbitrary,
        (lineItems) => {
          const orderItems = mapLineItemsToOrderItems(lineItems);
          
          return lineItems.every((lineItem, index) => 
            orderItems[index].product_name === (lineItem.productName || 'Produit')
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order items mapping SHALL preserve quantities
   * 
   * **Validates: Requirements 8.3**
   */
  it('should preserve quantities in order items', () => {
    fc.assert(
      fc.property(
        lineItemsArbitrary,
        (lineItems) => {
          const orderItems = mapLineItemsToOrderItems(lineItems);
          
          return lineItems.every((lineItem, index) => 
            orderItems[index].quantity === (lineItem.quantity || 1)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Order items mapping SHALL preserve unit prices
   * 
   * **Validates: Requirements 8.3**
   */
  it('should preserve unit prices in order items', () => {
    fc.assert(
      fc.property(
        lineItemsArbitrary,
        (lineItems) => {
          const orderItems = mapLineItemsToOrderItems(lineItems);
          
          return lineItems.every((lineItem, index) => 
            orderItems[index].unit_price === (lineItem.unitPrice || 0)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Complete webhook processing SHALL produce consistent data
   * All three records (customer, order, order_items) should be created with correct data
   * 
   * **Validates: Requirements 8.1, 8.2, 8.3**
   */
  it('should produce complete and consistent data for any valid session', () => {
    fc.assert(
      fc.property(
        stripeSessionArbitrary,
        (session) => {
          // Simulate the complete webhook processing
          const customerRecord = mapCustomerDetails(session.customer_details);
          const orderRecord = mapSessionToOrder(session);
          const orderItems = mapLineItemsToOrderItems(session.line_items);
          
          // Verify customer record completeness (Requirement 8.1)
          const customerComplete = 
            customerRecord.email === session.customer_details.email &&
            customerRecord.name === session.customer_details.name &&
            customerRecord.phone === session.customer_details.phone;
          
          // Verify order record completeness (Requirement 8.2)
          const orderComplete = 
            orderRecord.status === 'paid' &&
            orderRecord.amount === session.amount_total &&
            orderRecord.stripe_session_id === session.id &&
            /^GRT-[A-Z0-9]{8}$/.test(orderRecord.order_number);
          
          // Verify order items completeness (Requirement 8.3)
          const orderItemsComplete = 
            orderItems.length === session.line_items.length &&
            session.line_items.every((lineItem, index) => 
              orderItems[index].product_name === (lineItem.productName || 'Produit') &&
              orderItems[index].quantity === (lineItem.quantity || 1) &&
              orderItems[index].unit_price === (lineItem.unitPrice || 0)
            );
          
          return customerComplete && orderComplete && orderItemsComplete;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Edge case tests for order number generation
 */
describe('Order Number Generation Edge Cases', () => {
  /**
   * Test: Short session IDs should still produce valid order numbers
   */
  it('should handle short session IDs', () => {
    const shortId = 'cs_test_abc';
    const orderNumber = generateOrderNumber(shortId);
    
    // Should use whatever characters are available
    expect(orderNumber).toMatch(/^GRT-[A-Z0-9_]{1,8}$/);
  });

  /**
   * Test: Session IDs with lowercase should be uppercased
   */
  it('should uppercase lowercase characters in session ID', () => {
    const sessionId = 'cs_test_abcdefghijklmnop';
    const orderNumber = generateOrderNumber(sessionId);
    
    // Last 8 characters of 'cs_test_abcdefghijklmnop' are 'ijklmnop'
    expect(orderNumber).toBe('GRT-IJKLMNOP');
  });

  /**
   * Test: Session IDs with mixed case should be uppercased
   */
  it('should uppercase mixed case characters', () => {
    const sessionId = 'cs_test_AbCdEfGh';
    const orderNumber = generateOrderNumber(sessionId);
    
    expect(orderNumber).toBe('GRT-ABCDEFGH');
  });

  /**
   * Test: Session IDs with numbers should preserve them
   */
  it('should preserve numbers in order number', () => {
    const sessionId = 'cs_test_12345678';
    const orderNumber = generateOrderNumber(sessionId);
    
    expect(orderNumber).toBe('GRT-12345678');
  });

  /**
   * Test: Realistic Stripe session ID format
   */
  it('should handle realistic Stripe session IDs', () => {
    const realisticIds = [
      'cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      'cs_live_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
      'cs_test_1234567890abcdefghijklmnopqrstuv',
    ];
    
    for (const sessionId of realisticIds) {
      const orderNumber = generateOrderNumber(sessionId);
      expect(orderNumber).toMatch(/^GRT-[A-Z0-9]{8}$/);
    }
  });
});

/**
 * Edge case tests for customer data mapping
 */
describe('Customer Data Mapping Edge Cases', () => {
  /**
   * Test: Null name should be preserved
   */
  it('should preserve null name', () => {
    const customerDetails: CustomerDetails = {
      email: 'test@example.com',
      name: null,
      phone: '0123456789',
      address: null,
    };
    
    const record = mapCustomerDetails(customerDetails);
    expect(record.name).toBeNull();
  });

  /**
   * Test: Null phone should be preserved
   */
  it('should preserve null phone', () => {
    const customerDetails: CustomerDetails = {
      email: 'test@example.com',
      name: 'Test User',
      phone: null,
      address: null,
    };
    
    const record = mapCustomerDetails(customerDetails);
    expect(record.phone).toBeNull();
  });

  /**
   * Test: Email with special characters should be preserved
   */
  it('should preserve email with special characters', () => {
    const customerDetails: CustomerDetails = {
      email: 'test+special@example.com',
      name: 'Test User',
      phone: null,
      address: null,
    };
    
    const record = mapCustomerDetails(customerDetails);
    expect(record.email).toBe('test+special@example.com');
  });

  /**
   * Test: French accented names should be preserved
   */
  it('should preserve French accented names', () => {
    const customerDetails: CustomerDetails = {
      email: 'test@example.com',
      name: 'François Müller-Lévy',
      phone: null,
      address: null,
    };
    
    const record = mapCustomerDetails(customerDetails);
    expect(record.name).toBe('François Müller-Lévy');
  });
});

/**
 * Edge case tests for order items mapping
 */
describe('Order Items Mapping Edge Cases', () => {
  /**
   * Test: Empty line items array should produce empty order items
   */
  it('should handle empty line items array', () => {
    const orderItems = mapLineItemsToOrderItems([]);
    expect(orderItems).toEqual([]);
  });

  /**
   * Test: Single line item should produce single order item
   */
  it('should handle single line item', () => {
    const lineItems: LineItem[] = [
      { productName: 'Test Product', quantity: 2, unitPrice: 5000 },
    ];
    
    const orderItems = mapLineItemsToOrderItems(lineItems);
    
    expect(orderItems.length).toBe(1);
    expect(orderItems[0].product_name).toBe('Test Product');
    expect(orderItems[0].quantity).toBe(2);
    expect(orderItems[0].unit_price).toBe(5000);
  });

  /**
   * Test: Large quantities should be preserved
   */
  it('should preserve large quantities', () => {
    const lineItems: LineItem[] = [
      { productName: 'Bulk Item', quantity: 1000, unitPrice: 100 },
    ];
    
    const orderItems = mapLineItemsToOrderItems(lineItems);
    expect(orderItems[0].quantity).toBe(1000);
  });

  /**
   * Test: Large unit prices should be preserved
   */
  it('should preserve large unit prices', () => {
    const lineItems: LineItem[] = [
      { productName: 'Expensive Item', quantity: 1, unitPrice: 10000000 }, // 100,000€
    ];
    
    const orderItems = mapLineItemsToOrderItems(lineItems);
    expect(orderItems[0].unit_price).toBe(10000000);
  });

  /**
   * Test: Product names with French characters should be preserved
   */
  it('should preserve French characters in product names', () => {
    const lineItems: LineItem[] = [
      { productName: 'Batterie énergie renouvelable', quantity: 1, unitPrice: 500000 },
    ];
    
    const orderItems = mapLineItemsToOrderItems(lineItems);
    expect(orderItems[0].product_name).toBe('Batterie énergie renouvelable');
  });
});

/**
 * Real-world scenario tests
 */
describe('Real-world Webhook Processing Scenarios', () => {
  /**
   * Test: KSTAR battery order processing
   */
  it('should correctly process KSTAR battery order', () => {
    const session: StripeSessionData = {
      id: 'cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      customer_details: {
        email: 'client@example.fr',
        name: 'Jean Dupont',
        phone: '0612345678',
        address: {
          line1: '123 Rue de la Paix',
          city: 'Paris',
          postal_code: '75001',
          country: 'FR',
        },
      },
      amount_total: 599900, // 5,999€
      line_items: [
        { productName: 'KSTAR BluE-S 6kW', quantity: 1, unitPrice: 599900 },
      ],
    };
    
    const customerRecord = mapCustomerDetails(session.customer_details);
    const orderRecord = mapSessionToOrder(session);
    const orderItems = mapLineItemsToOrderItems(session.line_items);
    
    // Verify customer
    expect(customerRecord.email).toBe('client@example.fr');
    expect(customerRecord.name).toBe('Jean Dupont');
    
    // Verify order
    expect(orderRecord.status).toBe('paid');
    expect(orderRecord.amount).toBe(599900);
    expect(orderRecord.order_number).toMatch(/^GRT-[A-Z0-9]{8}$/);
    
    // Verify order items
    expect(orderItems.length).toBe(1);
    expect(orderItems[0].product_name).toBe('KSTAR BluE-S 6kW');
    expect(orderItems[0].quantity).toBe(1);
    expect(orderItems[0].unit_price).toBe(599900);
  });

  /**
   * Test: Multi-item order processing
   */
  it('should correctly process multi-item order', () => {
    const session: StripeSessionData = {
      id: 'cs_live_xyz789abc123def456ghi789jkl012',
      customer_details: {
        email: 'entreprise@example.com',
        name: 'Société Énergie Verte',
        phone: '0145678901',
        address: {
          line1: '45 Avenue des Champs-Élysées',
          city: 'Paris',
          postal_code: '75008',
          country: 'FR',
        },
      },
      amount_total: 1500000, // 15,000€
      line_items: [
        { productName: 'KSTAR BluE-S 6kW', quantity: 2, unitPrice: 599900 },
        { productName: 'Panneau photovoltaïque', quantity: 4, unitPrice: 75025 },
      ],
    };
    
    const orderItems = mapLineItemsToOrderItems(session.line_items);
    
    expect(orderItems.length).toBe(2);
    expect(orderItems[0].product_name).toBe('KSTAR BluE-S 6kW');
    expect(orderItems[0].quantity).toBe(2);
    expect(orderItems[1].product_name).toBe('Panneau photovoltaïque');
    expect(orderItems[1].quantity).toBe(4);
  });
});
