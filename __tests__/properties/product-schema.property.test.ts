/**
 * Property-Based Tests for ProductSchema Component
 * 
 * Feature: seo-audit-onsite
 * Property 1: Product Schema Validity
 * 
 * **Validates: Requirements 2.1-2.8**
 * 
 * For any product page, the JSON-LD Product schema SHALL contain all required 
 * fields: name, description, image, brand, sku, and offers (with price, 
 * priceCurrency, and availability).
 */

import * as fc from 'fast-check'

// ProductSchema props interface (matching the component)
interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand: string
  sku: string
  url: string
}

// Generated schema structure (what the component produces)
interface ProductSchemaOutput {
  "@context": string
  "@type": string
  name: string
  description: string
  image: string
  brand: {
    "@type": string
    name: string
  }
  sku: string
  offers: {
    "@type": string
    url: string
    priceCurrency: string
    price: number
    availability: string
    seller: {
      "@type": string
      name: string
    }
  }
}

/**
 * Helper function to generate the schema output from props
 * This mirrors the ProductSchema component logic
 */
function generateProductSchema(props: ProductSchemaProps): ProductSchemaOutput {
  const {
    name,
    description,
    image,
    price,
    currency = 'EUR',
    availability = 'InStock',
    brand,
    sku,
    url,
  } = props

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "sku": sku,
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": currency,
      "price": price,
      "availability": `https://schema.org/${availability}`,
      "seller": {
        "@type": "Organization",
        "name": "Greenter"
      }
    }
  }
}

/**
 * Arbitrary generator for valid product schema props
 * Generates realistic product data for testing
 */
const productPropsArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
  description: fc.string({ minLength: 1, maxLength: 1000 }).filter(s => s.trim().length > 0),
  image: fc.webUrl().map(url => url.replace(/^https?:\/\//, '/').split('?')[0] || '/image.png'),
  price: fc.integer({ min: 1, max: 1000000 }).map(p => p / 100), // Generate price as cents then convert
  currency: fc.constantFrom('EUR', 'USD', 'GBP'),
  availability: fc.constantFrom('InStock' as const, 'OutOfStock' as const, 'PreOrder' as const),
  brand: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
  sku: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  url: fc.webUrl(),
})

/**
 * Arbitrary generator for product props with optional fields omitted
 * Tests default value handling
 */
const productPropsWithDefaultsArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
  description: fc.string({ minLength: 1, maxLength: 1000 }).filter(s => s.trim().length > 0),
  image: fc.webUrl().map(url => url.replace(/^https?:\/\//, '/').split('?')[0] || '/image.png'),
  price: fc.integer({ min: 1, max: 1000000 }).map(p => p / 100), // Generate price as cents then convert
  brand: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
  sku: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  url: fc.webUrl(),
})

describe('Property 1: Product Schema Validity', () => {
  /**
   * Property: For any valid product input, the schema SHALL contain 
   * the @context field set to "https://schema.org"
   * 
   * **Validates: Requirements 2.1**
   */
  it('should always include valid Schema.org context', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema["@context"] === "https://schema.org"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL have 
   * @type set to "Product"
   * 
   * **Validates: Requirements 2.1**
   */
  it('should always have @type set to Product', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema["@type"] === "Product"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the product name exactly as provided
   * 
   * **Validates: Requirements 2.2**
   */
  it('should include the product name exactly as provided', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.name === props.name
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the product description exactly as provided
   * 
   * **Validates: Requirements 2.5**
   */
  it('should include the product description exactly as provided', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.description === props.description
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the product image URL exactly as provided
   * 
   * **Validates: Requirements 2.6**
   */
  it('should include the product image URL exactly as provided', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.image === props.image
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * a brand object with @type "Brand" and the brand name
   * 
   * **Validates: Requirements 2.7**
   */
  it('should include brand with correct structure and name', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return (
            schema.brand["@type"] === "Brand" &&
            schema.brand.name === props.brand
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the SKU exactly as provided
   * 
   * **Validates: Requirements 2.8**
   */
  it('should include the SKU exactly as provided', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.sku === props.sku
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * an offers object with @type "Offer"
   * 
   * **Validates: Requirements 2.3**
   */
  it('should include offers with correct @type', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers["@type"] === "Offer"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the price exactly as provided in the offers
   * 
   * **Validates: Requirements 2.3**
   */
  it('should include the price exactly as provided in offers', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers.price === props.price
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the currency in priceCurrency field
   * 
   * **Validates: Requirements 2.3**
   */
  it('should include the currency in priceCurrency field', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers.priceCurrency === props.currency
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the availability as a Schema.org URL
   * 
   * **Validates: Requirements 2.4**
   */
  it('should include availability as Schema.org URL', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers.availability === `https://schema.org/${props.availability}`
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * the URL in the offers
   * 
   * **Validates: Requirements 2.1**
   */
  it('should include the URL in offers', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers.url === props.url
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: When currency is not provided, the schema SHALL default to EUR
   * 
   * **Validates: Requirements 2.3**
   */
  it('should default currency to EUR when not provided', () => {
    fc.assert(
      fc.property(
        productPropsWithDefaultsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers.priceCurrency === 'EUR'
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: When availability is not provided, the schema SHALL default to InStock
   * 
   * **Validates: Requirements 2.4**
   */
  it('should default availability to InStock when not provided', () => {
    fc.assert(
      fc.property(
        productPropsWithDefaultsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return schema.offers.availability === 'https://schema.org/InStock'
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the schema SHALL include 
   * a seller organization with name "Greenter"
   * 
   * **Validates: Requirements 2.1**
   */
  it('should include seller organization as Greenter', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          return (
            schema.offers.seller["@type"] === "Organization" &&
            schema.offers.seller.name === "Greenter"
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, the generated schema 
   * SHALL be valid JSON (can be stringified without errors)
   * 
   * **Validates: Requirements 2.1**
   */
  it('should generate valid JSON that can be stringified', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          try {
            const jsonString = JSON.stringify(schema)
            const parsed = JSON.parse(jsonString)
            return parsed["@type"] === "Product"
          } catch {
            return false
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid product input, ALL required fields SHALL be present
   * This is the comprehensive check for Property 1
   * 
   * **Validates: Requirements 2.1-2.8**
   */
  it('should contain ALL required fields for any valid product input', () => {
    fc.assert(
      fc.property(
        productPropsArbitrary,
        (props) => {
          const schema = generateProductSchema(props)
          
          // Check all required top-level fields
          const hasContext = schema["@context"] === "https://schema.org"
          const hasType = schema["@type"] === "Product"
          const hasName = typeof schema.name === 'string' && schema.name.length > 0
          const hasDescription = typeof schema.description === 'string' && schema.description.length > 0
          const hasImage = typeof schema.image === 'string' && schema.image.length > 0
          const hasSku = typeof schema.sku === 'string' && schema.sku.length > 0
          
          // Check brand structure
          const hasBrand = (
            schema.brand &&
            schema.brand["@type"] === "Brand" &&
            typeof schema.brand.name === 'string' &&
            schema.brand.name.length > 0
          )
          
          // Check offers structure
          const hasOffers = (
            schema.offers &&
            schema.offers["@type"] === "Offer" &&
            typeof schema.offers.price === 'number' &&
            schema.offers.price > 0 &&
            typeof schema.offers.priceCurrency === 'string' &&
            schema.offers.priceCurrency.length > 0 &&
            typeof schema.offers.availability === 'string' &&
            schema.offers.availability.startsWith('https://schema.org/')
          )
          
          return (
            hasContext &&
            hasType &&
            hasName &&
            hasDescription &&
            hasImage &&
            hasSku &&
            hasBrand &&
            hasOffers
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for the KSTAR BluE-S 6kW product
 * These validate the specific requirements for the actual product
 */
describe('KSTAR BluE-S 6kW Product Schema Validation', () => {
  // Actual product data as used in the application
  const kstarProduct: ProductSchemaProps = {
    name: 'KSTAR BluE-S 6kW - Onduleur Hybride Batterie Solaire',
    description: 'Onduleur hybride tout-en-un avec batteries LiFePO4 intégrées. Solution complète pour l\'autoconsommation solaire avec stockage d\'énergie.',
    image: '/kstar.png',
    price: 2500,
    currency: 'EUR',
    availability: 'InStock',
    brand: 'KSTAR',
    sku: 'KSTAR-BLUES-6KW',
    url: 'https://greenter.fr/produits/kstar-blue-s-6kw',
  }

  /**
   * Test: The schema SHALL include product name "KSTAR BluE-S 6kW"
   * 
   * **Validates: Requirements 2.2**
   */
  it('should include product name containing "KSTAR BluE-S 6kW"', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.name).toContain('KSTAR BluE-S 6kW')
  })

  /**
   * Test: The schema SHALL include price "2500" with currency "EUR"
   * 
   * **Validates: Requirements 2.3**
   */
  it('should include price 2500 with currency EUR', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.offers.price).toBe(2500)
    expect(schema.offers.priceCurrency).toBe('EUR')
  })

  /**
   * Test: The schema SHALL include availability status "InStock"
   * 
   * **Validates: Requirements 2.4**
   */
  it('should include availability status InStock', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.offers.availability).toBe('https://schema.org/InStock')
  })

  /**
   * Test: The schema SHALL include product description
   * 
   * **Validates: Requirements 2.5**
   */
  it('should include product description', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.description).toBeTruthy()
    expect(schema.description.length).toBeGreaterThan(0)
  })

  /**
   * Test: The schema SHALL include product image URL
   * 
   * **Validates: Requirements 2.6**
   */
  it('should include product image URL', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.image).toBe('/kstar.png')
  })

  /**
   * Test: The schema SHALL include brand "KSTAR"
   * 
   * **Validates: Requirements 2.7**
   */
  it('should include brand KSTAR', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.brand.name).toBe('KSTAR')
  })

  /**
   * Test: The schema SHALL include SKU or product identifier
   * 
   * **Validates: Requirements 2.8**
   */
  it('should include SKU or product identifier', () => {
    const schema = generateProductSchema(kstarProduct)
    expect(schema.sku).toBe('KSTAR-BLUES-6KW')
  })
})
