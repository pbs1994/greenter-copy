/**
 * Property-Based Tests for Product-Stripe Synchronization
 * 
 * Feature: payload-cms-migration
 * Property 12: Product-Stripe Synchronization
 * 
 * **Validates: Requirements 22.1, 22.2, 22.3**
 * 
 * For any product created or updated in Payload:
 * - On create: a corresponding Stripe product and price should be created, and their IDs stored in the document
 * - On price update: a new Stripe price should be created, the old one archived, and the new ID stored
 * - On deactivation: the Stripe product should be archived
 */

import * as fc from 'fast-check'

/**
 * Type definitions for Product data
 */
interface ProductData {
  id: string
  name: string
  price: number // in cents
  short_description?: string
  is_active: boolean
  stripe_product_id?: string
  stripe_price_id?: string
}

/**
 * Type definitions for Stripe API responses (simplified for testing)
 */
interface StripeProduct {
  id: string
  name: string
  description: string | null
  active: boolean
}

interface StripePrice {
  id: string
  product: string
  unit_amount: number
  currency: string
  active: boolean
}


/**
 * Mock Stripe state for testing synchronization logic
 */
interface MockStripeState {
  products: Map<string, StripeProduct>
  prices: Map<string, StripePrice>
  nextProductId: number
  nextPriceId: number
}

/**
 * Creates a fresh mock Stripe state
 */
function createMockStripeState(): MockStripeState {
  return {
    products: new Map(),
    prices: new Map(),
    nextProductId: 1,
    nextPriceId: 1,
  }
}

/**
 * Mock Stripe API functions that simulate real Stripe behavior
 */
function createMockStripeAPI(state: MockStripeState) {
  return {
    products: {
      create: (data: { name: string; description?: string }): StripeProduct => {
        const id = `prod_test_${state.nextProductId++}`
        const product: StripeProduct = {
          id,
          name: data.name,
          description: data.description || null,
          active: true,
        }
        state.products.set(id, product)
        return product
      },
      update: (id: string, data: { name?: string; description?: string; active?: boolean }): StripeProduct => {
        const product = state.products.get(id)
        if (!product) throw new Error(`Product ${id} not found`)
        
        const updated: StripeProduct = {
          ...product,
          name: data.name ?? product.name,
          description: data.description ?? product.description,
          active: data.active ?? product.active,
        }
        state.products.set(id, updated)
        return updated
      },
      retrieve: (id: string): StripeProduct | undefined => {
        return state.products.get(id)
      },
    },
    prices: {
      create: (data: { product: string; unit_amount: number; currency: string }): StripePrice => {
        const id = `price_test_${state.nextPriceId++}`
        const price: StripePrice = {
          id,
          product: data.product,
          unit_amount: data.unit_amount,
          currency: data.currency,
          active: true,
        }
        state.prices.set(id, price)
        return price
      },
      update: (id: string, data: { active?: boolean }): StripePrice => {
        const price = state.prices.get(id)
        if (!price) throw new Error(`Price ${id} not found`)
        
        const updated: StripePrice = {
          ...price,
          active: data.active ?? price.active,
        }
        state.prices.set(id, updated)
        return updated
      },
      retrieve: (id: string): StripePrice | undefined => {
        return state.prices.get(id)
      },
    },
  }
}


/**
 * Simulates the syncProductToStripe hook logic for product creation
 * This mirrors the actual hook implementation in hooks/syncProductToStripe.ts
 */
function simulateProductCreate(
  productData: ProductData,
  stripeAPI: ReturnType<typeof createMockStripeAPI>
): ProductData {
  // Create Stripe product
  const stripeProduct = stripeAPI.products.create({
    name: productData.name,
    description: productData.short_description || undefined,
  })

  // Create Stripe price
  const stripePrice = stripeAPI.prices.create({
    product: stripeProduct.id,
    unit_amount: productData.price,
    currency: 'eur',
  })

  // Return updated product with Stripe IDs
  return {
    ...productData,
    stripe_product_id: stripeProduct.id,
    stripe_price_id: stripePrice.id,
  }
}

/**
 * Simulates the syncProductToStripe hook logic for product update
 * This mirrors the actual hook implementation in hooks/syncProductToStripe.ts
 */
function simulateProductUpdate(
  currentProduct: ProductData,
  previousProduct: ProductData,
  stripeAPI: ReturnType<typeof createMockStripeAPI>
): ProductData {
  if (!currentProduct.stripe_product_id) {
    return currentProduct
  }

  // Update Stripe product (name, description, active status)
  stripeAPI.products.update(currentProduct.stripe_product_id, {
    name: currentProduct.name,
    description: currentProduct.short_description || '',
    active: currentProduct.is_active,
  })

  // If price changed, create new price and archive old one
  if (previousProduct.price !== currentProduct.price && currentProduct.stripe_price_id) {
    const newPrice = stripeAPI.prices.create({
      product: currentProduct.stripe_product_id,
      unit_amount: currentProduct.price,
      currency: 'eur',
    })

    // Archive old price
    stripeAPI.prices.update(currentProduct.stripe_price_id, { active: false })

    return {
      ...currentProduct,
      stripe_price_id: newPrice.id,
    }
  }

  return currentProduct
}


/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid product IDs (MongoDB ObjectId format)
 */
const productIdArbitrary = fc.stringMatching(/^[a-f0-9]{24}$/)

/**
 * Generator for product names (French product names)
 */
const productNameArbitrary = fc.oneof(
  fc.constantFrom(
    'KSTAR BluE-S 6kW',
    'Onduleur hybride 10kW',
    'Batterie lithium 10kWh',
    'Panneau photovoltaïque 400W',
    'Pompe à chaleur air-eau',
    'Chauffe-eau thermodynamique',
    'Kit solaire autoconsommation',
    'Micro-onduleur Enphase',
    'Optimiseur SolarEdge',
    'Câble solaire 6mm²'
  ),
  fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0)
)

/**
 * Generator for product prices in cents (1€ to 50,000€)
 */
const priceArbitrary = fc.integer({ min: 100, max: 5000000 })

/**
 * Generator for short descriptions
 */
const shortDescriptionArbitrary = fc.option(
  fc.constantFrom(
    'Onduleur haute performance pour installation solaire résidentielle',
    'Batterie de stockage pour autoconsommation',
    'Panneau solaire monocristallin haute efficacité',
    'Solution de chauffage écologique et économique',
    null
  ),
  { nil: undefined }
)

/**
 * Generator for complete product data
 */
const productDataArbitrary = fc.record({
  id: productIdArbitrary,
  name: productNameArbitrary,
  price: priceArbitrary,
  short_description: shortDescriptionArbitrary,
  is_active: fc.boolean(),
}) as fc.Arbitrary<ProductData>

/**
 * Generator for product data specifically for creation (always active initially)
 */
const newProductArbitrary = fc.record({
  id: productIdArbitrary,
  name: productNameArbitrary,
  price: priceArbitrary,
  short_description: shortDescriptionArbitrary,
  is_active: fc.constant(true),
}) as fc.Arbitrary<ProductData>


describe('Property 12: Product-Stripe Synchronization', () => {
  /**
   * Property: On product creation, Stripe product and price SHALL be created
   * 
   * **Validates: Requirements 22.1**
   */
  describe('Product Creation Synchronization', () => {
    it('should create Stripe product with correct name for any new product', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            const result = simulateProductCreate(productData, stripeAPI)
            
            // Verify Stripe product was created
            expect(result.stripe_product_id).toBeDefined()
            expect(result.stripe_product_id).toMatch(/^prod_test_/)
            
            // Verify product name matches
            const stripeProduct = stripeAPI.products.retrieve(result.stripe_product_id!)
            expect(stripeProduct).toBeDefined()
            expect(stripeProduct!.name).toBe(productData.name)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should create Stripe price with correct amount for any new product', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            const result = simulateProductCreate(productData, stripeAPI)
            
            // Verify Stripe price was created
            expect(result.stripe_price_id).toBeDefined()
            expect(result.stripe_price_id).toMatch(/^price_test_/)
            
            // Verify price amount matches
            const stripePrice = stripeAPI.prices.retrieve(result.stripe_price_id!)
            expect(stripePrice).toBeDefined()
            expect(stripePrice!.unit_amount).toBe(productData.price)
            expect(stripePrice!.currency).toBe('eur')
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should link Stripe price to the created Stripe product', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            const result = simulateProductCreate(productData, stripeAPI)
            
            // Verify price is linked to product
            const stripePrice = stripeAPI.prices.retrieve(result.stripe_price_id!)
            expect(stripePrice!.product).toBe(result.stripe_product_id)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should store Stripe IDs in the returned product document', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            const result = simulateProductCreate(productData, stripeAPI)
            
            // Both IDs should be stored
            expect(result.stripe_product_id).toBeDefined()
            expect(result.stripe_price_id).toBeDefined()
            
            // Original data should be preserved
            expect(result.id).toBe(productData.id)
            expect(result.name).toBe(productData.name)
            expect(result.price).toBe(productData.price)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle optional short_description correctly', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            const result = simulateProductCreate(productData, stripeAPI)
            
            const stripeProduct = stripeAPI.products.retrieve(result.stripe_product_id!)
            
            if (productData.short_description) {
              expect(stripeProduct!.description).toBe(productData.short_description)
            } else {
              expect(stripeProduct!.description).toBeNull()
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })


  /**
   * Property: On price update, new Stripe price SHALL be created and old one archived
   * 
   * **Validates: Requirements 22.2**
   */
  describe('Price Update Synchronization', () => {
    it('should create new Stripe price when price changes', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          priceArbitrary,
          (productData, newPrice) => {
            // Skip if prices are the same
            fc.pre(newPrice !== productData.price)
            
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // First create the product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            const originalPriceId = createdProduct.stripe_price_id
            
            // Then update with new price
            const updatedProductData = { ...createdProduct, price: newPrice }
            const result = simulateProductUpdate(updatedProductData, createdProduct, stripeAPI)
            
            // New price ID should be different
            expect(result.stripe_price_id).not.toBe(originalPriceId)
            expect(result.stripe_price_id).toMatch(/^price_test_/)
            
            // New price should have correct amount
            const newStripePrice = stripeAPI.prices.retrieve(result.stripe_price_id!)
            expect(newStripePrice!.unit_amount).toBe(newPrice)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should archive old Stripe price when price changes', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          priceArbitrary,
          (productData, newPrice) => {
            fc.pre(newPrice !== productData.price)
            
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            const originalPriceId = createdProduct.stripe_price_id!
            
            // Update with new price
            const updatedProductData = { ...createdProduct, price: newPrice }
            simulateProductUpdate(updatedProductData, createdProduct, stripeAPI)
            
            // Old price should be archived (active: false)
            const oldStripePrice = stripeAPI.prices.retrieve(originalPriceId)
            expect(oldStripePrice!.active).toBe(false)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should keep same price ID when price does not change', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          productNameArbitrary,
          (productData, newName) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            const originalPriceId = createdProduct.stripe_price_id
            
            // Update only name, not price
            const updatedProductData = { ...createdProduct, name: newName }
            const result = simulateProductUpdate(updatedProductData, createdProduct, stripeAPI)
            
            // Price ID should remain the same
            expect(result.stripe_price_id).toBe(originalPriceId)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should link new price to the same Stripe product', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          priceArbitrary,
          (productData, newPrice) => {
            fc.pre(newPrice !== productData.price)
            
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            
            // Update with new price
            const updatedProductData = { ...createdProduct, price: newPrice }
            const result = simulateProductUpdate(updatedProductData, createdProduct, stripeAPI)
            
            // New price should be linked to same product
            const newStripePrice = stripeAPI.prices.retrieve(result.stripe_price_id!)
            expect(newStripePrice!.product).toBe(result.stripe_product_id)
          }
        ),
        { numRuns: 100 }
      )
    })
  })


  /**
   * Property: On product deactivation, Stripe product SHALL be archived
   * 
   * **Validates: Requirements 22.3**
   */
  describe('Product Deactivation Synchronization', () => {
    it('should archive Stripe product when product is deactivated', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create active product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            
            // Verify product is initially active
            const initialStripeProduct = stripeAPI.products.retrieve(createdProduct.stripe_product_id!)
            expect(initialStripeProduct!.active).toBe(true)
            
            // Deactivate product
            const deactivatedProduct = { ...createdProduct, is_active: false }
            simulateProductUpdate(deactivatedProduct, createdProduct, stripeAPI)
            
            // Stripe product should be archived
            const archivedStripeProduct = stripeAPI.products.retrieve(createdProduct.stripe_product_id!)
            expect(archivedStripeProduct!.active).toBe(false)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should reactivate Stripe product when product is reactivated', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create and deactivate product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            const deactivatedProduct = { ...createdProduct, is_active: false }
            simulateProductUpdate(deactivatedProduct, createdProduct, stripeAPI)
            
            // Reactivate product
            const reactivatedProduct = { ...deactivatedProduct, is_active: true }
            simulateProductUpdate(reactivatedProduct, deactivatedProduct, stripeAPI)
            
            // Stripe product should be active again
            const stripeProduct = stripeAPI.products.retrieve(createdProduct.stripe_product_id!)
            expect(stripeProduct!.active).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve Stripe IDs when deactivating product', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          (productData) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            const originalProductId = createdProduct.stripe_product_id
            const originalPriceId = createdProduct.stripe_price_id
            
            // Deactivate product
            const deactivatedProduct = { ...createdProduct, is_active: false }
            const result = simulateProductUpdate(deactivatedProduct, createdProduct, stripeAPI)
            
            // IDs should be preserved
            expect(result.stripe_product_id).toBe(originalProductId)
            expect(result.stripe_price_id).toBe(originalPriceId)
          }
        ),
        { numRuns: 100 }
      )
    })
  })


  /**
   * Property: Product updates SHALL sync name and description to Stripe
   * 
   * **Validates: Requirements 22.1, 22.2**
   */
  describe('Product Metadata Synchronization', () => {
    it('should update Stripe product name when product name changes', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          productNameArbitrary,
          (productData, newName) => {
            fc.pre(newName !== productData.name)
            
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            
            // Update name
            const updatedProduct = { ...createdProduct, name: newName }
            simulateProductUpdate(updatedProduct, createdProduct, stripeAPI)
            
            // Stripe product name should be updated
            const stripeProduct = stripeAPI.products.retrieve(createdProduct.stripe_product_id!)
            expect(stripeProduct!.name).toBe(newName)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should update Stripe product description when short_description changes', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          fc.string({ minLength: 1, maxLength: 200 }),
          (productData, newDescription) => {
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            
            // Update description
            const updatedProduct = { ...createdProduct, short_description: newDescription }
            simulateProductUpdate(updatedProduct, createdProduct, stripeAPI)
            
            // Stripe product description should be updated
            const stripeProduct = stripeAPI.products.retrieve(createdProduct.stripe_product_id!)
            expect(stripeProduct!.description).toBe(newDescription)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Complete synchronization workflow SHALL maintain data consistency
   * 
   * **Validates: Requirements 22.1, 22.2, 22.3**
   */
  describe('Complete Synchronization Workflow', () => {
    it('should maintain consistency through create-update-deactivate cycle', () => {
      fc.assert(
        fc.property(
          newProductArbitrary,
          priceArbitrary,
          productNameArbitrary,
          (productData, newPrice, newName) => {
            fc.pre(newPrice !== productData.price)
            
            const stripeState = createMockStripeState()
            const stripeAPI = createMockStripeAPI(stripeState)
            
            // Step 1: Create product
            const createdProduct = simulateProductCreate(productData, stripeAPI)
            expect(createdProduct.stripe_product_id).toBeDefined()
            expect(createdProduct.stripe_price_id).toBeDefined()
            
            // Step 2: Update price
            const priceUpdatedProduct = { ...createdProduct, price: newPrice }
            const afterPriceUpdate = simulateProductUpdate(priceUpdatedProduct, createdProduct, stripeAPI)
            expect(afterPriceUpdate.stripe_price_id).not.toBe(createdProduct.stripe_price_id)
            
            // Step 3: Update name
            const nameUpdatedProduct = { ...afterPriceUpdate, name: newName }
            const afterNameUpdate = simulateProductUpdate(nameUpdatedProduct, afterPriceUpdate, stripeAPI)
            const stripeProduct = stripeAPI.products.retrieve(afterNameUpdate.stripe_product_id!)
            expect(stripeProduct!.name).toBe(newName)
            
            // Step 4: Deactivate
            const deactivatedProduct = { ...afterNameUpdate, is_active: false }
            simulateProductUpdate(deactivatedProduct, afterNameUpdate, stripeAPI)
            const finalStripeProduct = stripeAPI.products.retrieve(afterNameUpdate.stripe_product_id!)
            expect(finalStripeProduct!.active).toBe(false)
            
            // Verify final state consistency
            const finalPrice = stripeAPI.prices.retrieve(afterNameUpdate.stripe_price_id!)
            expect(finalPrice!.unit_amount).toBe(newPrice)
            expect(finalPrice!.product).toBe(afterNameUpdate.stripe_product_id)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})


/**
 * Edge case tests for Stripe synchronization
 */
describe('Stripe Synchronization Edge Cases', () => {
  /**
   * Test: Product with minimum price (1 cent)
   */
  it('should handle minimum price of 1 cent', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productData: ProductData = {
      id: '507f1f77bcf86cd799439011',
      name: 'Test Product',
      price: 1, // 1 cent
      is_active: true,
    }
    
    const result = simulateProductCreate(productData, stripeAPI)
    const stripePrice = stripeAPI.prices.retrieve(result.stripe_price_id!)
    
    expect(stripePrice!.unit_amount).toBe(1)
  })

  /**
   * Test: Product with maximum realistic price
   */
  it('should handle high price values', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productData: ProductData = {
      id: '507f1f77bcf86cd799439012',
      name: 'Expensive Solar Installation',
      price: 5000000, // 50,000€
      is_active: true,
    }
    
    const result = simulateProductCreate(productData, stripeAPI)
    const stripePrice = stripeAPI.prices.retrieve(result.stripe_price_id!)
    
    expect(stripePrice!.unit_amount).toBe(5000000)
  })

  /**
   * Test: Product with French characters in name
   */
  it('should handle French characters in product name', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productData: ProductData = {
      id: '507f1f77bcf86cd799439013',
      name: 'Pompe à chaleur réversible éco-énergétique',
      price: 899900,
      short_description: 'Solution de chauffage écologique avec économies d\'énergie',
      is_active: true,
    }
    
    const result = simulateProductCreate(productData, stripeAPI)
    const stripeProduct = stripeAPI.products.retrieve(result.stripe_product_id!)
    
    expect(stripeProduct!.name).toBe('Pompe à chaleur réversible éco-énergétique')
    expect(stripeProduct!.description).toBe('Solution de chauffage écologique avec économies d\'énergie')
  })

  /**
   * Test: Multiple price updates in sequence
   */
  it('should handle multiple sequential price updates', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productData: ProductData = {
      id: '507f1f77bcf86cd799439014',
      name: 'Variable Price Product',
      price: 10000,
      is_active: true,
    }
    
    // Create
    let currentProduct = simulateProductCreate(productData, stripeAPI)
    const priceIds: string[] = [currentProduct.stripe_price_id!]
    
    // Update price 3 times
    const newPrices = [15000, 12000, 18000]
    for (const newPrice of newPrices) {
      const previousProduct = { ...currentProduct }
      currentProduct = { ...currentProduct, price: newPrice }
      currentProduct = simulateProductUpdate(currentProduct, previousProduct, stripeAPI)
      priceIds.push(currentProduct.stripe_price_id!)
    }
    
    // All old prices should be archived
    for (let i = 0; i < priceIds.length - 1; i++) {
      const oldPrice = stripeAPI.prices.retrieve(priceIds[i])
      expect(oldPrice!.active).toBe(false)
    }
    
    // Only the last price should be active
    const currentPrice = stripeAPI.prices.retrieve(priceIds[priceIds.length - 1])
    expect(currentPrice!.active).toBe(true)
    expect(currentPrice!.unit_amount).toBe(18000)
  })

  /**
   * Test: Product without short_description
   */
  it('should handle product without short_description', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productData: ProductData = {
      id: '507f1f77bcf86cd799439015',
      name: 'Simple Product',
      price: 5000,
      is_active: true,
      // No short_description
    }
    
    const result = simulateProductCreate(productData, stripeAPI)
    const stripeProduct = stripeAPI.products.retrieve(result.stripe_product_id!)
    
    expect(stripeProduct!.description).toBeNull()
  })

  /**
   * Test: Rapid activation/deactivation cycles
   */
  it('should handle rapid activation/deactivation cycles', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productData: ProductData = {
      id: '507f1f77bcf86cd799439016',
      name: 'Toggle Product',
      price: 25000,
      is_active: true,
    }
    
    let currentProduct = simulateProductCreate(productData, stripeAPI)
    
    // Toggle active status 5 times
    for (let i = 0; i < 5; i++) {
      const previousProduct = { ...currentProduct }
      currentProduct = { ...currentProduct, is_active: !currentProduct.is_active }
      currentProduct = simulateProductUpdate(currentProduct, previousProduct, stripeAPI)
      
      const stripeProduct = stripeAPI.products.retrieve(currentProduct.stripe_product_id!)
      expect(stripeProduct!.active).toBe(currentProduct.is_active)
    }
  })

  /**
   * Test: Update without Stripe IDs (edge case - should not fail)
   */
  it('should handle update when product has no Stripe IDs', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    const productWithoutStripe: ProductData = {
      id: '507f1f77bcf86cd799439017',
      name: 'Legacy Product',
      price: 30000,
      is_active: true,
      // No stripe_product_id or stripe_price_id
    }
    
    const previousProduct = { ...productWithoutStripe }
    const updatedProduct = { ...productWithoutStripe, name: 'Updated Legacy Product' }
    
    // Should not throw and should return the product unchanged
    const result = simulateProductUpdate(updatedProduct, previousProduct, stripeAPI)
    
    expect(result.stripe_product_id).toBeUndefined()
    expect(result.stripe_price_id).toBeUndefined()
    expect(result.name).toBe('Updated Legacy Product')
  })
})

/**
 * Real-world scenario tests
 */
describe('Real-world Stripe Synchronization Scenarios', () => {
  /**
   * Test: KSTAR inverter product lifecycle
   */
  it('should correctly sync KSTAR inverter through full lifecycle', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    // Create KSTAR product
    const kstarProduct: ProductData = {
      id: '507f1f77bcf86cd799439018',
      name: 'KSTAR BluE-S 6kW',
      price: 249900, // 2,499€
      short_description: 'Onduleur hybride haute performance pour installation solaire résidentielle',
      is_active: true,
    }
    
    let product = simulateProductCreate(kstarProduct, stripeAPI)
    
    // Verify initial sync
    expect(product.stripe_product_id).toMatch(/^prod_test_/)
    expect(product.stripe_price_id).toMatch(/^price_test_/)
    
    let stripeProduct = stripeAPI.products.retrieve(product.stripe_product_id!)
    expect(stripeProduct!.name).toBe('KSTAR BluE-S 6kW')
    
    // Price increase (promotion ends)
    const previousProduct = { ...product }
    product = { ...product, price: 279900 } // 2,799€
    product = simulateProductUpdate(product, previousProduct, stripeAPI)
    
    // Verify price update
    const newPrice = stripeAPI.prices.retrieve(product.stripe_price_id!)
    expect(newPrice!.unit_amount).toBe(279900)
    
    // Discontinue product
    const beforeDeactivation = { ...product }
    product = { ...product, is_active: false }
    product = simulateProductUpdate(product, beforeDeactivation, stripeAPI)
    
    // Verify deactivation
    stripeProduct = stripeAPI.products.retrieve(product.stripe_product_id!)
    expect(stripeProduct!.active).toBe(false)
  })

  /**
   * Test: Solar panel bundle with multiple updates
   */
  it('should correctly sync solar panel bundle with multiple updates', () => {
    const stripeState = createMockStripeState()
    const stripeAPI = createMockStripeAPI(stripeState)
    
    // Create bundle
    const bundleProduct: ProductData = {
      id: '507f1f77bcf86cd799439019',
      name: 'Kit solaire autoconsommation 3kWc',
      price: 399900, // 3,999€
      short_description: 'Kit complet avec panneaux, onduleur et fixations',
      is_active: true,
    }
    
    let product = simulateProductCreate(bundleProduct, stripeAPI)
    
    // Update name (marketing change)
    let previousProduct = { ...product }
    product = { ...product, name: 'Kit solaire autoconsommation Premium 3kWc' }
    product = simulateProductUpdate(product, previousProduct, stripeAPI)
    
    let stripeProduct = stripeAPI.products.retrieve(product.stripe_product_id!)
    expect(stripeProduct!.name).toBe('Kit solaire autoconsommation Premium 3kWc')
    
    // Update description
    previousProduct = { ...product }
    product = { ...product, short_description: 'Kit premium avec panneaux haute efficacité, onduleur hybride et fixations renforcées' }
    product = simulateProductUpdate(product, previousProduct, stripeAPI)
    
    stripeProduct = stripeAPI.products.retrieve(product.stripe_product_id!)
    expect(stripeProduct!.description).toContain('premium')
    
    // Price reduction (sale)
    previousProduct = { ...product }
    product = { ...product, price: 349900 } // 3,499€
    product = simulateProductUpdate(product, previousProduct, stripeAPI)
    
    const salePrice = stripeAPI.prices.retrieve(product.stripe_price_id!)
    expect(salePrice!.unit_amount).toBe(349900)
    
    // Product still active
    stripeProduct = stripeAPI.products.retrieve(product.stripe_product_id!)
    expect(stripeProduct!.active).toBe(true)
  })
})
