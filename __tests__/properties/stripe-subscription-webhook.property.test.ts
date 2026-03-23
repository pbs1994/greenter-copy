/**
 * Property-Based Tests for Stripe Subscription Webhook Handling
 *
 * Feature: payload-cms-migration
 * Property 14: Stripe Subscription Webhook Handling
 *
 * **Validates: Requirements 22.7**
 *
 * For any Stripe subscription webhook event (created, updated, deleted) with
 * metadata.type "maintenance", the corresponding Maintenance_Subscription record
 * should be created or updated in Payload with the correct status.
 *
 * Properties tested:
 * - customer.subscription.created should create MaintenanceSubscription in Payload
 * - customer.subscription.updated should update status (active/past_due/paused)
 * - customer.subscription.deleted should mark as cancelled with cancelled_at date
 * - Only subscriptions with metadata.type === 'maintenance' should be processed
 * - Subscription items should be created with correct service/option relationships
 */

import * as fc from 'fast-check'

/**
 * Type definitions for Stripe subscription data
 */
interface StripeSubscriptionItem {
  id: string
  price: {
    id: string
    unit_amount: number
    product: {
      id: string
      name: string
    }
  }
}

interface StripeSubscription {
  id: string
  customer: string
  status: 'active' | 'past_due' | 'canceled' | 'paused' | 'incomplete' | 'trialing'
  metadata: {
    type?: string
    billing_period?: string
    discount_multi?: string
    discount_annual?: string
    total_monthly?: string
    total_after_discounts?: string
    service_ids?: string
    option_ids?: string
  }
  items: {
    data: StripeSubscriptionItem[]
  }
}

interface StripeCustomer {
  id: string
  email: string
  name: string | null
  phone: string | null
}

/**
 * Type definitions for Payload CMS records
 */
interface PayloadCustomer {
  id: string
  email: string
  name: string | null
  phone: string | null
}

interface PayloadSubscriptionItem {
  item_type: 'service' | 'option'
  name: string
  quantity: number
  unit_price: number
  service?: string
  option?: string
}

interface PayloadMaintenanceSubscription {
  id: string
  stripe_subscription_id: string
  customer: string
  billing_period: 'monthly' | 'annual'
  status: 'active' | 'cancelled' | 'past_due' | 'paused'
  totals: {
    subtotal: number
    discount_amount: number
    total: number
  }
  discounts: {
    multi_service_discount: number
    annual_discount: number
  }
  items: PayloadSubscriptionItem[]
  cancelled_at?: string
}

/**
 * Mapping des statuts Stripe vers nos statuts internes
 */
const STRIPE_STATUS_MAP: Record<string, 'active' | 'cancelled' | 'past_due' | 'paused'> = {
  active: 'active',
  past_due: 'past_due',
  canceled: 'cancelled',
  paused: 'paused',
  incomplete: 'active', // Treat as active for simplicity
  trialing: 'active', // Treat as active for simplicity
}

/**
 * Simulates Payload CMS store for testing subscription webhook logic
 */
class MockPayloadStore {
  private customers: Map<string, PayloadCustomer> = new Map()
  private subscriptions: Map<string, PayloadMaintenanceSubscription> = new Map()
  private customerIdCounter = 1
  private subscriptionIdCounter = 1

  /**
   * Find or create customer by email
   */
  findOrCreateCustomer(details: {
    email: string
    name?: string | null
    phone?: string | null
  }): PayloadCustomer {
    const normalizedEmail = details.email.toLowerCase()

    const existing = this.findCustomerByEmail(normalizedEmail)
    if (existing) {
      const updated: PayloadCustomer = {
        ...existing,
        name: details.name ?? existing.name,
        phone: details.phone ?? existing.phone,
      }
      this.customers.set(normalizedEmail, updated)
      return updated
    }

    const customer: PayloadCustomer = {
      id: `customer_${this.customerIdCounter++}`,
      email: normalizedEmail,
      name: details.name ?? null,
      phone: details.phone ?? null,
    }
    this.customers.set(normalizedEmail, customer)
    return customer
  }

  findCustomerByEmail(email: string): PayloadCustomer | undefined {
    return this.customers.get(email.toLowerCase())
  }

  /**
   * Create maintenance subscription from Stripe subscription
   * @validates Requirements 22.7
   */
  createSubscription(
    stripeSubscription: StripeSubscription,
    customerId: string,
    stripeCustomer: StripeCustomer
  ): PayloadMaintenanceSubscription {
    const metadata = stripeSubscription.metadata
    const billingPeriod = (metadata.billing_period === 'annual' ? 'annual' : 'monthly') as 'monthly' | 'annual'
    const discountMulti = parseInt(metadata.discount_multi || '0', 10)
    const discountAnnual = parseInt(metadata.discount_annual || '0', 10)

    const totalFromItems = stripeSubscription.items.data.reduce(
      (sum, item) => sum + (item.price?.unit_amount || 0),
      0
    )

    const subtotal = parseInt(metadata.total_monthly || '0', 10) || totalFromItems
    const totalAfterDiscounts = parseInt(metadata.total_after_discounts || '0', 10) || totalFromItems
    const discountAmount = subtotal - totalAfterDiscounts

    const serviceIds = metadata.service_ids
      ? metadata.service_ids.split(',').filter(Boolean)
      : []
    const optionIds = metadata.option_ids
      ? metadata.option_ids.split(',').filter(Boolean)
      : []

    const subscriptionItems: PayloadSubscriptionItem[] = []

    for (const lineItem of stripeSubscription.items.data) {
      const productName = lineItem.price?.product?.name || 'Service'
      const unitPrice = lineItem.price?.unit_amount || 0
      const isService = productName.startsWith('Entretien ')

      if (isService && serviceIds.length > 0) {
        const serviceId = serviceIds.shift()!
        subscriptionItems.push({
          item_type: 'service',
          name: productName,
          quantity: 1,
          unit_price: unitPrice,
          service: serviceId,
        })
      } else if (!isService && optionIds.length > 0) {
        const optionId = optionIds.shift()!
        subscriptionItems.push({
          item_type: 'option',
          name: productName,
          quantity: 1,
          unit_price: unitPrice,
          option: optionId,
        })
      } else {
        subscriptionItems.push({
          item_type: isService ? 'service' : 'option',
          name: productName,
          quantity: 1,
          unit_price: unitPrice,
        })
      }
    }

    const subscription: PayloadMaintenanceSubscription = {
      id: `subscription_${this.subscriptionIdCounter++}`,
      stripe_subscription_id: stripeSubscription.id,
      customer: customerId,
      billing_period: billingPeriod,
      status: 'active',
      totals: {
        subtotal,
        discount_amount: discountAmount,
        total: totalAfterDiscounts,
      },
      discounts: {
        multi_service_discount: discountMulti,
        annual_discount: discountAnnual,
      },
      items: subscriptionItems,
    }

    this.subscriptions.set(stripeSubscription.id, subscription)
    return subscription
  }

  /**
   * Update subscription status
   * @validates Requirements 22.7
   */
  updateSubscriptionStatus(
    stripeSubscriptionId: string,
    stripeStatus: string
  ): PayloadMaintenanceSubscription | null {
    const subscription = this.subscriptions.get(stripeSubscriptionId)
    if (!subscription) return null

    const newStatus = STRIPE_STATUS_MAP[stripeStatus] || 'active'
    subscription.status = newStatus
    return subscription
  }

  /**
   * Cancel subscription (mark as cancelled with date)
   * @validates Requirements 22.7
   */
  cancelSubscription(stripeSubscriptionId: string): PayloadMaintenanceSubscription | null {
    const subscription = this.subscriptions.get(stripeSubscriptionId)
    if (!subscription) return null

    subscription.status = 'cancelled'
    subscription.cancelled_at = new Date().toISOString()
    return subscription
  }

  findSubscriptionByStripeId(stripeSubscriptionId: string): PayloadMaintenanceSubscription | undefined {
    return this.subscriptions.get(stripeSubscriptionId)
  }

  getSubscriptionCount(): number {
    return this.subscriptions.size
  }

  getCustomerCount(): number {
    return this.customers.size
  }

  clear(): void {
    this.customers.clear()
    this.subscriptions.clear()
    this.customerIdCounter = 1
    this.subscriptionIdCounter = 1
  }
}

/**
 * Simulates the subscription webhook event processing
 * @validates Requirements 22.7
 */
function processSubscriptionEvent(
  store: MockPayloadStore,
  eventType: 'customer.subscription.created' | 'customer.subscription.updated' | 'customer.subscription.deleted',
  subscription: StripeSubscription,
  stripeCustomer: StripeCustomer
): { subscription: PayloadMaintenanceSubscription; customer: PayloadCustomer } | null {
  // Only process maintenance subscriptions
  if (subscription.metadata?.type !== 'maintenance') {
    return null
  }

  switch (eventType) {
    case 'customer.subscription.created': {
      const customer = store.findOrCreateCustomer({
        email: stripeCustomer.email,
        name: stripeCustomer.name,
        phone: stripeCustomer.phone,
      })

      const payloadSubscription = store.createSubscription(subscription, customer.id, stripeCustomer)
      return { subscription: payloadSubscription, customer }
    }

    case 'customer.subscription.updated': {
      const existingSubscription = store.findSubscriptionByStripeId(subscription.id)
      if (!existingSubscription) return null

      const updatedSubscription = store.updateSubscriptionStatus(subscription.id, subscription.status)
      if (!updatedSubscription) return null

      const customer = store.findCustomerByEmail(stripeCustomer.email)
      if (!customer) return null

      return { subscription: updatedSubscription, customer }
    }

    case 'customer.subscription.deleted': {
      const existingSubscription = store.findSubscriptionByStripeId(subscription.id)
      if (!existingSubscription) return null

      const cancelledSubscription = store.cancelSubscription(subscription.id)
      if (!cancelledSubscription) return null

      const customer = store.findCustomerByEmail(stripeCustomer.email)
      if (!customer) return null

      return { subscription: cancelledSubscription, customer }
    }
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
    fc.constantFrom('gmail.com', 'yahoo.fr', 'outlook.com', 'example.com', 'greenter.fr')
  )
  .map(([local, domain]) => `${local}@${domain}`)

/**
 * Generator for French names
 */
const frenchNameArbitrary = fc.oneof(
  fc.constantFrom(
    'Jean Dupont',
    'Marie Martin',
    'Pierre Bernard',
    'Sophie Dubois',
    'François Moreau',
    'Isabelle Laurent'
  ),
  fc.constant(null)
)

/**
 * Generator for French phone numbers
 */
const frenchPhoneArbitrary = fc.oneof(
  fc.stringMatching(/^0[1-9][0-9]{8}$/),
  fc.constant(null)
)

/**
 * Generator for Stripe subscription IDs
 */
const stripeSubscriptionIdArbitrary = fc
  .tuple(
    fc.constantFrom('sub_'),
    fc.stringMatching(/^[A-Za-z0-9]{20,30}$/)
  )
  .map(([prefix, suffix]) => `${prefix}${suffix}`)

/**
 * Generator for Stripe customer IDs
 */
const stripeCustomerIdArbitrary = fc
  .tuple(
    fc.constantFrom('cus_'),
    fc.stringMatching(/^[A-Za-z0-9]{14,20}$/)
  )
  .map(([prefix, suffix]) => `${prefix}${suffix}`)

/**
 * Generator for Stripe customer
 */
const stripeCustomerArbitrary: fc.Arbitrary<StripeCustomer> = fc.record({
  id: stripeCustomerIdArbitrary,
  email: emailArbitrary,
  name: frenchNameArbitrary,
  phone: frenchPhoneArbitrary,
})

/**
 * Generator for maintenance service names (French)
 */
const maintenanceServiceNameArbitrary = fc.constantFrom(
  'Entretien Pompe à chaleur',
  'Entretien Chaudière gaz',
  'Entretien Panneaux solaires',
  'Entretien Climatisation'
)

/**
 * Generator for maintenance option names (French)
 */
const maintenanceOptionNameArbitrary = fc.constantFrom(
  'Dépannage prioritaire',
  'Pièces détachées incluses',
  'Intervention week-end',
  'Garantie étendue'
)

/**
 * Generator for Stripe subscription item (service)
 */
const stripeServiceItemArbitrary: fc.Arbitrary<StripeSubscriptionItem> = fc.record({
  id: fc.stringMatching(/^si_[A-Za-z0-9]{14,20}$/),
  price: fc.record({
    id: fc.stringMatching(/^price_[A-Za-z0-9]{14,20}$/),
    unit_amount: fc.integer({ min: 500, max: 20000 }), // 5€ to 200€ in cents
    product: fc.record({
      id: fc.stringMatching(/^prod_[A-Za-z0-9]{14,20}$/),
      name: maintenanceServiceNameArbitrary,
    }),
  }),
})

/**
 * Generator for Stripe subscription item (option)
 */
const stripeOptionItemArbitrary: fc.Arbitrary<StripeSubscriptionItem> = fc.record({
  id: fc.stringMatching(/^si_[A-Za-z0-9]{14,20}$/),
  price: fc.record({
    id: fc.stringMatching(/^price_[A-Za-z0-9]{14,20}$/),
    unit_amount: fc.integer({ min: 200, max: 5000 }), // 2€ to 50€ in cents
    product: fc.record({
      id: fc.stringMatching(/^prod_[A-Za-z0-9]{14,20}$/),
      name: maintenanceOptionNameArbitrary,
    }),
  }),
})

/**
 * Generator for Payload service/option IDs
 */
const payloadIdArbitrary = fc.stringMatching(/^[a-f0-9]{24}$/)

/**
 * Generator for maintenance subscription metadata
 */
const maintenanceMetadataArbitrary = (serviceCount: number, optionCount: number) =>
  fc.record({
    type: fc.constant('maintenance'),
    billing_period: fc.constantFrom('monthly', 'annual'),
    discount_multi: fc.integer({ min: 0, max: 20 }).map(String),
    discount_annual: fc.integer({ min: 0, max: 15 }).map(String),
    total_monthly: fc.integer({ min: 1000, max: 50000 }).map(String),
    total_after_discounts: fc.integer({ min: 800, max: 45000 }).map(String),
    service_ids: fc.array(payloadIdArbitrary, { minLength: serviceCount, maxLength: serviceCount }).map((ids) => ids.join(',')),
    option_ids: fc.array(payloadIdArbitrary, { minLength: optionCount, maxLength: optionCount }).map((ids) => ids.join(',')),
  })

/**
 * Generator for non-maintenance metadata (should be ignored)
 */
const nonMaintenanceMetadataArbitrary: fc.Arbitrary<StripeSubscription['metadata']> = fc.oneof(
  fc.constant({}),
  fc.record({ type: fc.constantFrom('product', 'other', 'subscription') }),
  fc.record({ type: fc.constant(undefined) }),
)

/**
 * Generator for Stripe subscription status
 */
const stripeStatusArbitrary = fc.constantFrom(
  'active' as const,
  'past_due' as const,
  'canceled' as const,
  'paused' as const
)

/**
 * Generator for complete maintenance Stripe subscription
 */
const maintenanceSubscriptionArbitrary: fc.Arbitrary<StripeSubscription> = fc
  .tuple(
    fc.integer({ min: 1, max: 3 }), // service count
    fc.integer({ min: 0, max: 2 }), // option count
  )
  .chain(([serviceCount, optionCount]) =>
    fc.record({
      id: stripeSubscriptionIdArbitrary,
      customer: stripeCustomerIdArbitrary,
      status: fc.constant('active' as const),
      metadata: maintenanceMetadataArbitrary(serviceCount, optionCount),
      items: fc.record({
        data: fc.tuple(
          fc.array(stripeServiceItemArbitrary, { minLength: serviceCount, maxLength: serviceCount }),
          fc.array(stripeOptionItemArbitrary, { minLength: optionCount, maxLength: optionCount })
        ).map(([services, options]) => [...services, ...options]),
      }),
    })
  )

/**
 * Generator for non-maintenance Stripe subscription (should be ignored)
 */
const nonMaintenanceSubscriptionArbitrary: fc.Arbitrary<StripeSubscription> = fc.record({
  id: stripeSubscriptionIdArbitrary,
  customer: stripeCustomerIdArbitrary,
  status: stripeStatusArbitrary,
  metadata: nonMaintenanceMetadataArbitrary,
  items: fc.record({
    data: fc.array(stripeServiceItemArbitrary, { minLength: 1, maxLength: 2 }),
  }),
})

describe('Property 14: Stripe Subscription Webhook Handling', () => {
  /**
   * Property: customer.subscription.created should create MaintenanceSubscription
   *
   * **Validates: Requirements 22.7**
   */
  describe('Subscription Created Event', () => {
    it('should create a MaintenanceSubscription for any maintenance subscription', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return result !== null && result.subscription !== undefined
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should store correct stripe_subscription_id', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return (
              result !== null &&
              result.subscription.stripe_subscription_id === subscription.id
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should set initial status to active', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return result !== null && result.subscription.status === 'active'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should create customer if not exists', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return (
              result !== null &&
              result.customer !== undefined &&
              store.getCustomerCount() === 1
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve customer email', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return (
              result !== null &&
              result.customer.email === stripeCustomer.email.toLowerCase()
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should link subscription to correct customer', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return (
              result !== null &&
              result.subscription.customer === result.customer.id
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should extract billing period from metadata', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            const expectedPeriod = subscription.metadata.billing_period === 'annual' ? 'annual' : 'monthly'
            return (
              result !== null &&
              result.subscription.billing_period === expectedPeriod
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should extract discount percentages from metadata', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            const expectedMulti = parseInt(subscription.metadata.discount_multi || '0', 10)
            const expectedAnnual = parseInt(subscription.metadata.discount_annual || '0', 10)

            return (
              result !== null &&
              result.subscription.discounts.multi_service_discount === expectedMulti &&
              result.subscription.discounts.annual_discount === expectedAnnual
            )
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Subscription items should be created with correct service/option relationships
   *
   * **Validates: Requirements 22.7**
   */
  describe('Subscription Items Creation', () => {
    it('should create same number of items as Stripe subscription items', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return (
              result !== null &&
              result.subscription.items.length === subscription.items.data.length
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve item names from Stripe products', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            if (!result) return false

            return subscription.items.data.every((stripeItem, index) => {
              const payloadItem = result.subscription.items[index]
              return payloadItem.name === stripeItem.price.product.name
            })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve unit prices from Stripe', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            if (!result) return false

            return subscription.items.data.every((stripeItem, index) => {
              const payloadItem = result.subscription.items[index]
              return payloadItem.unit_price === stripeItem.price.unit_amount
            })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should correctly identify services (items starting with "Entretien ")', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            if (!result) return false

            return result.subscription.items.every((item) => {
              const isServiceName = item.name.startsWith('Entretien ')
              return isServiceName ? item.item_type === 'service' : item.item_type === 'option'
            })
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: customer.subscription.updated should update status
   *
   * **Validates: Requirements 22.7**
   */
  describe('Subscription Updated Event', () => {
    it('should update status to active for Stripe active status', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            // First create the subscription
            processSubscriptionEvent(store, 'customer.subscription.created', subscription, stripeCustomer)

            // Then update with active status
            const updatedSubscription = { ...subscription, status: 'active' as const }
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.updated',
              updatedSubscription,
              stripeCustomer
            )

            return result !== null && result.subscription.status === 'active'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should update status to past_due for Stripe past_due status', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            processSubscriptionEvent(store, 'customer.subscription.created', subscription, stripeCustomer)

            const updatedSubscription = { ...subscription, status: 'past_due' as const }
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.updated',
              updatedSubscription,
              stripeCustomer
            )

            return result !== null && result.subscription.status === 'past_due'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should update status to paused for Stripe paused status', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            processSubscriptionEvent(store, 'customer.subscription.created', subscription, stripeCustomer)

            const updatedSubscription = { ...subscription, status: 'paused' as const }
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.updated',
              updatedSubscription,
              stripeCustomer
            )

            return result !== null && result.subscription.status === 'paused'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return null for non-existent subscription', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            // Don't create the subscription first
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.updated',
              subscription,
              stripeCustomer
            )

            return result === null
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: customer.subscription.deleted should mark as cancelled with cancelled_at date
   *
   * **Validates: Requirements 22.7**
   */
  describe('Subscription Deleted Event', () => {
    it('should set status to cancelled', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            processSubscriptionEvent(store, 'customer.subscription.created', subscription, stripeCustomer)

            const result = processSubscriptionEvent(
              store,
              'customer.subscription.deleted',
              subscription,
              stripeCustomer
            )

            return result !== null && result.subscription.status === 'cancelled'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should set cancelled_at date', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            processSubscriptionEvent(store, 'customer.subscription.created', subscription, stripeCustomer)

            const beforeDelete = new Date()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.deleted',
              subscription,
              stripeCustomer
            )
            const afterDelete = new Date()

            if (!result || !result.subscription.cancelled_at) return false

            const cancelledAt = new Date(result.subscription.cancelled_at)
            return cancelledAt >= beforeDelete && cancelledAt <= afterDelete
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return null for non-existent subscription', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            
            // Don't create the subscription first
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.deleted',
              subscription,
              stripeCustomer
            )

            return result === null
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Only subscriptions with metadata.type === 'maintenance' should be processed
   *
   * **Validates: Requirements 22.7**
   */
  describe('Metadata Type Filtering', () => {
    it('should NOT process subscriptions without maintenance type', () => {
      fc.assert(
        fc.property(
          nonMaintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return result === null && store.getSubscriptionCount() === 0
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should process subscriptions with metadata.type === "maintenance"', () => {
      fc.assert(
        fc.property(
          maintenanceSubscriptionArbitrary,
          stripeCustomerArbitrary,
          (subscription, stripeCustomer) => {
            const store = new MockPayloadStore()
            const result = processSubscriptionEvent(
              store,
              'customer.subscription.created',
              subscription,
              stripeCustomer
            )

            return result !== null && store.getSubscriptionCount() === 1
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})

/**
 * Edge case tests for Stripe subscription webhook handling
 */
describe('Stripe Subscription Webhook Edge Cases', () => {
  let store: MockPayloadStore

  beforeEach(() => {
    store = new MockPayloadStore()
  })

  /**
   * Test: Subscription with single service
   */
  it('should handle subscription with single service', () => {
    const subscription: StripeSubscription = {
      id: 'sub_test_single_service',
      customer: 'cus_test123',
      status: 'active',
      metadata: {
        type: 'maintenance',
        billing_period: 'monthly',
        discount_multi: '0',
        discount_annual: '0',
        total_monthly: '1500',
        total_after_discounts: '1500',
        service_ids: '507f1f77bcf86cd799439011',
        option_ids: '',
      },
      items: {
        data: [
          {
            id: 'si_test1',
            price: {
              id: 'price_test1',
              unit_amount: 1500,
              product: { id: 'prod_test1', name: 'Entretien Pompe à chaleur' },
            },
          },
        ],
      },
    }

    const stripeCustomer: StripeCustomer = {
      id: 'cus_test123',
      email: 'test@example.fr',
      name: 'Jean Dupont',
      phone: '0612345678',
    }

    const result = processSubscriptionEvent(
      store,
      'customer.subscription.created',
      subscription,
      stripeCustomer
    )

    expect(result).not.toBeNull()
    expect(result?.subscription.items.length).toBe(1)
    expect(result?.subscription.items[0].item_type).toBe('service')
    expect(result?.subscription.items[0].name).toBe('Entretien Pompe à chaleur')
    expect(result?.subscription.items[0].service).toBe('507f1f77bcf86cd799439011')
  })

  /**
   * Test: Subscription with multiple services and options
   */
  it('should handle subscription with multiple services and options', () => {
    const subscription: StripeSubscription = {
      id: 'sub_test_multi',
      customer: 'cus_test456',
      status: 'active',
      metadata: {
        type: 'maintenance',
        billing_period: 'annual',
        discount_multi: '10',
        discount_annual: '5',
        total_monthly: '4500',
        total_after_discounts: '3825',
        service_ids: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012',
        option_ids: '507f1f77bcf86cd799439021',
      },
      items: {
        data: [
          {
            id: 'si_test1',
            price: {
              id: 'price_test1',
              unit_amount: 1500,
              product: { id: 'prod_test1', name: 'Entretien Pompe à chaleur' },
            },
          },
          {
            id: 'si_test2',
            price: {
              id: 'price_test2',
              unit_amount: 2000,
              product: { id: 'prod_test2', name: 'Entretien Chaudière gaz' },
            },
          },
          {
            id: 'si_test3',
            price: {
              id: 'price_test3',
              unit_amount: 1000,
              product: { id: 'prod_test3', name: 'Dépannage prioritaire' },
            },
          },
        ],
      },
    }

    const stripeCustomer: StripeCustomer = {
      id: 'cus_test456',
      email: 'multi@example.fr',
      name: 'Marie Martin',
      phone: '0698765432',
    }

    const result = processSubscriptionEvent(
      store,
      'customer.subscription.created',
      subscription,
      stripeCustomer
    )

    expect(result).not.toBeNull()
    expect(result?.subscription.items.length).toBe(3)
    expect(result?.subscription.billing_period).toBe('annual')
    expect(result?.subscription.discounts.multi_service_discount).toBe(10)
    expect(result?.subscription.discounts.annual_discount).toBe(5)
    
    // Check services
    const services = result?.subscription.items.filter((i) => i.item_type === 'service')
    expect(services?.length).toBe(2)
    
    // Check options
    const options = result?.subscription.items.filter((i) => i.item_type === 'option')
    expect(options?.length).toBe(1)
    expect(options?.[0].option).toBe('507f1f77bcf86cd799439021')
  })

  /**
   * Test: Status transitions through lifecycle
   */
  it('should handle complete subscription lifecycle', () => {
    const subscription: StripeSubscription = {
      id: 'sub_lifecycle_test',
      customer: 'cus_lifecycle',
      status: 'active',
      metadata: {
        type: 'maintenance',
        billing_period: 'monthly',
        discount_multi: '0',
        discount_annual: '0',
        total_monthly: '1500',
        total_after_discounts: '1500',
        service_ids: '507f1f77bcf86cd799439011',
        option_ids: '',
      },
      items: {
        data: [
          {
            id: 'si_test1',
            price: {
              id: 'price_test1',
              unit_amount: 1500,
              product: { id: 'prod_test1', name: 'Entretien Pompe à chaleur' },
            },
          },
        ],
      },
    }

    const stripeCustomer: StripeCustomer = {
      id: 'cus_lifecycle',
      email: 'lifecycle@example.fr',
      name: 'Pierre Bernard',
      phone: null,
    }

    // 1. Create subscription
    const createResult = processSubscriptionEvent(
      store,
      'customer.subscription.created',
      subscription,
      stripeCustomer
    )
    expect(createResult?.subscription.status).toBe('active')

    // 2. Update to past_due
    const pastDueSubscription = { ...subscription, status: 'past_due' as const }
    const pastDueResult = processSubscriptionEvent(
      store,
      'customer.subscription.updated',
      pastDueSubscription,
      stripeCustomer
    )
    expect(pastDueResult?.subscription.status).toBe('past_due')

    // 3. Update back to active
    const activeSubscription = { ...subscription, status: 'active' as const }
    const activeResult = processSubscriptionEvent(
      store,
      'customer.subscription.updated',
      activeSubscription,
      stripeCustomer
    )
    expect(activeResult?.subscription.status).toBe('active')

    // 4. Delete (cancel)
    const deleteResult = processSubscriptionEvent(
      store,
      'customer.subscription.deleted',
      subscription,
      stripeCustomer
    )
    expect(deleteResult?.subscription.status).toBe('cancelled')
    expect(deleteResult?.subscription.cancelled_at).toBeDefined()
  })

  /**
   * Test: French characters in customer name
   */
  it('should preserve French characters in customer name', () => {
    const subscription: StripeSubscription = {
      id: 'sub_french_chars',
      customer: 'cus_french',
      status: 'active',
      metadata: {
        type: 'maintenance',
        billing_period: 'monthly',
        discount_multi: '0',
        discount_annual: '0',
        total_monthly: '1500',
        total_after_discounts: '1500',
        service_ids: '507f1f77bcf86cd799439011',
        option_ids: '',
      },
      items: {
        data: [
          {
            id: 'si_test1',
            price: {
              id: 'price_test1',
              unit_amount: 1500,
              product: { id: 'prod_test1', name: 'Entretien Pompe à chaleur' },
            },
          },
        ],
      },
    }

    const stripeCustomer: StripeCustomer = {
      id: 'cus_french',
      email: 'francois@example.fr',
      name: 'François Müller-Lévy',
      phone: '0612345678',
    }

    const result = processSubscriptionEvent(
      store,
      'customer.subscription.created',
      subscription,
      stripeCustomer
    )

    expect(result).not.toBeNull()
    expect(result?.customer.name).toBe('François Müller-Lévy')
  })

  /**
   * Test: Subscription without service_ids in metadata (fallback)
   */
  it('should handle subscription without service_ids in metadata', () => {
    const subscription: StripeSubscription = {
      id: 'sub_no_ids',
      customer: 'cus_no_ids',
      status: 'active',
      metadata: {
        type: 'maintenance',
        billing_period: 'monthly',
        discount_multi: '0',
        discount_annual: '0',
        total_monthly: '1500',
        total_after_discounts: '1500',
        service_ids: '',
        option_ids: '',
      },
      items: {
        data: [
          {
            id: 'si_test1',
            price: {
              id: 'price_test1',
              unit_amount: 1500,
              product: { id: 'prod_test1', name: 'Entretien Pompe à chaleur' },
            },
          },
        ],
      },
    }

    const stripeCustomer: StripeCustomer = {
      id: 'cus_no_ids',
      email: 'noids@example.fr',
      name: 'Test User',
      phone: null,
    }

    const result = processSubscriptionEvent(
      store,
      'customer.subscription.created',
      subscription,
      stripeCustomer
    )

    expect(result).not.toBeNull()
    expect(result?.subscription.items.length).toBe(1)
    expect(result?.subscription.items[0].item_type).toBe('service')
    expect(result?.subscription.items[0].service).toBeUndefined()
  })
})
