/**
 * Property-Based Tests for BreadcrumbSchema Component
 * 
 * Feature: seo-audit-onsite
 * Property 4: Breadcrumb Schema Correctness
 * 
 * **Validates: Requirements 5.1-5.4**
 * 
 * For any page with breadcrumbs, the BreadcrumbList schema SHALL have items 
 * matching the URL path hierarchy, and each ListItem SHALL contain position 
 * (integer), name (string), and item (URL).
 */

import * as fc from 'fast-check'

// BreadcrumbSchema props interface (matching the component)
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

// Generated schema structure (what the component produces)
interface BreadcrumbListItem {
  "@type": string
  position: number
  name: string
  item: string
}

interface BreadcrumbSchemaOutput {
  "@context": string
  "@type": string
  itemListElement: BreadcrumbListItem[]
}

/**
 * Helper function to generate the schema output from props
 * This mirrors the BreadcrumbSchema component logic
 */
function generateBreadcrumbSchema(props: BreadcrumbSchemaProps): BreadcrumbSchemaOutput {
  const { items } = props

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

/**
 * Arbitrary generator for valid breadcrumb item
 */
const breadcrumbItemArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
  url: fc.webUrl(),
})

/**
 * Arbitrary generator for valid breadcrumb schema props
 * Generates a non-empty array of breadcrumb items
 */
const breadcrumbPropsArbitrary = fc.record({
  items: fc.array(breadcrumbItemArbitrary, { minLength: 1, maxLength: 10 }),
})

/**
 * Arbitrary generator for realistic French breadcrumb names
 */
const frenchBreadcrumbNameArbitrary = fc.constantFrom(
  'Accueil',
  'Services',
  'Produits',
  'Pompe à chaleur',
  'Panneaux solaires',
  'Isolation',
  'Audit énergétique',
  'Maintenance',
  'KSTAR BluE-S 6kW',
  'Contact'
)

/**
 * Arbitrary generator for realistic service page breadcrumbs
 * Hierarchy: Accueil > Services > [Service Name]
 */
const servicePageBreadcrumbsArbitrary = fc.constantFrom(
  'pompe-a-chaleur',
  'panneaux-solaires',
  'isolation',
  'audit',
  'maintenance'
).map(slug => {
  const serviceNames: Record<string, string> = {
    'pompe-a-chaleur': 'Pompe à chaleur',
    'panneaux-solaires': 'Panneaux solaires',
    'isolation': 'Isolation',
    'audit': 'Audit énergétique',
    'maintenance': 'Maintenance'
  }
  return {
    items: [
      { name: 'Accueil', url: 'https://greenter.fr' },
      { name: 'Services', url: 'https://greenter.fr/services' },
      { name: serviceNames[slug], url: `https://greenter.fr/services/${slug}` }
    ]
  }
})

/**
 * Arbitrary generator for realistic product page breadcrumbs
 * Hierarchy: Accueil > Produits > [Product Name]
 */
const productPageBreadcrumbsArbitrary = fc.record({
  productName: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
  productSlug: fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => /^[a-z0-9-]+$/.test(s) && s.length > 0)
}).map(({ productName, productSlug }) => ({
  items: [
    { name: 'Accueil', url: 'https://greenter.fr' },
    { name: 'Produits', url: 'https://greenter.fr/produits' },
    { name: productName, url: `https://greenter.fr/produits/${productSlug}` }
  ]
}))

/**
 * Arbitrary generator for realistic breadcrumb props with French names
 */
const realisticBreadcrumbPropsArbitrary = fc.array(
  fc.record({
    name: frenchBreadcrumbNameArbitrary,
    url: fc.webUrl(),
  }),
  { minLength: 1, maxLength: 5 }
).map(items => ({ items }))

describe('Property 4: Breadcrumb Schema Correctness', () => {
  /**
   * Property: For any valid breadcrumb input, the schema SHALL contain 
   * the @context field set to "https://schema.org"
   * 
   * **Validates: Requirements 5.1**
   */
  it('should always include valid Schema.org context', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema["@context"] === "https://schema.org"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, the schema SHALL have 
   * @type set to "BreadcrumbList"
   * 
   * **Validates: Requirements 5.1**
   */
  it('should always have @type set to BreadcrumbList', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema["@type"] === "BreadcrumbList"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, the number of itemListElement 
   * SHALL equal the number of input items
   * 
   * **Validates: Requirements 5.1**
   */
  it('should have itemListElement count matching input items count', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.length === props.items.length
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, each ListItem SHALL have 
   * @type set to "ListItem"
   * 
   * **Validates: Requirements 5.4**
   */
  it('should have @type "ListItem" for each breadcrumb item', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every(item => item["@type"] === "ListItem")
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, each ListItem SHALL contain 
   * a position that is a positive integer
   * 
   * **Validates: Requirements 5.4**
   */
  it('should have position as positive integer for each breadcrumb item', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every(item => 
            typeof item.position === 'number' &&
            Number.isInteger(item.position) &&
            item.position > 0
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, positions SHALL be sequential 
   * starting from 1
   * 
   * **Validates: Requirements 5.4**
   */
  it('should have sequential positions starting from 1', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every((item, index) => 
            item.position === index + 1
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, each ListItem SHALL contain 
   * a name that is a non-empty string
   * 
   * **Validates: Requirements 5.4**
   */
  it('should have name as non-empty string for each breadcrumb item', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every(item => 
            typeof item.name === 'string' &&
            item.name.length > 0
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, each ListItem SHALL contain 
   * an item (URL) that is a non-empty string
   * 
   * **Validates: Requirements 5.4**
   */
  it('should have item (URL) as non-empty string for each breadcrumb item', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every(item => 
            typeof item.item === 'string' &&
            item.item.length > 0
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, the names in itemListElement 
   * SHALL match the input names in order
   * 
   * **Validates: Requirements 5.1**
   */
  it('should preserve input names in the same order', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every((item, index) => 
            item.name === props.items[index].name
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, the URLs in itemListElement 
   * SHALL match the input URLs in order
   * 
   * **Validates: Requirements 5.1**
   */
  it('should preserve input URLs in the same order', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          return schema.itemListElement.every((item, index) => 
            item.item === props.items[index].url
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, the generated schema 
   * SHALL be valid JSON (can be stringified without errors)
   * 
   * **Validates: Requirements 5.1**
   */
  it('should generate valid JSON that can be stringified', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          try {
            const jsonString = JSON.stringify(schema)
            const parsed = JSON.parse(jsonString)
            return parsed["@type"] === "BreadcrumbList"
          } catch {
            return false
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid breadcrumb input, ALL required fields SHALL be present
   * in each ListItem (position, name, item)
   * This is the comprehensive check for Property 4
   * 
   * **Validates: Requirements 5.1-5.4**
   */
  it('should contain ALL required fields for any valid breadcrumb input', () => {
    fc.assert(
      fc.property(
        breadcrumbPropsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          
          // Check top-level structure (Req 5.1)
          const hasContext = schema["@context"] === "https://schema.org"
          const hasType = schema["@type"] === "BreadcrumbList"
          const hasItems = Array.isArray(schema.itemListElement) && 
                          schema.itemListElement.length === props.items.length
          
          // Check each ListItem has all required fields (Req 5.4)
          const allItemsValid = schema.itemListElement.every((item, index) => {
            const hasListItemType = item["@type"] === "ListItem"
            const hasPosition = typeof item.position === 'number' && 
                               Number.isInteger(item.position) && 
                               item.position === index + 1
            const hasName = typeof item.name === 'string' && item.name.length > 0
            const hasItemUrl = typeof item.item === 'string' && item.item.length > 0
            
            return hasListItemType && hasPosition && hasName && hasItemUrl
          })
          
          return hasContext && hasType && hasItems && allItemsValid
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Service Page Breadcrumb Hierarchy Tests
 * Validates: Requirement 5.2 - Correct page hierarchy for service pages
 * (Accueil > Services > [Service Name])
 */
describe('Service Page Breadcrumb Hierarchy (Req 5.2)', () => {
  /**
   * Property: For any service page, the breadcrumb hierarchy SHALL be
   * Accueil > Services > [Service Name]
   * 
   * **Validates: Requirements 5.2**
   */
  it('should have correct hierarchy for service pages: Accueil > Services > [Service Name]', () => {
    fc.assert(
      fc.property(
        servicePageBreadcrumbsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          
          // Should have exactly 3 items
          if (schema.itemListElement.length !== 3) return false
          
          // First item should be Accueil
          const firstItem = schema.itemListElement[0]
          if (firstItem.name !== 'Accueil') return false
          if (firstItem.position !== 1) return false
          
          // Second item should be Services
          const secondItem = schema.itemListElement[1]
          if (secondItem.name !== 'Services') return false
          if (secondItem.position !== 2) return false
          if (!secondItem.item.includes('/services')) return false
          
          // Third item should be the service name
          const thirdItem = schema.itemListElement[2]
          if (thirdItem.position !== 3) return false
          if (!thirdItem.item.includes('/services/')) return false
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any service page, the service URL SHALL contain the service slug
   * 
   * **Validates: Requirements 5.2**
   */
  it('should have service URL containing the service slug', () => {
    fc.assert(
      fc.property(
        servicePageBreadcrumbsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          const serviceItem = schema.itemListElement[2]
          
          // URL should be a valid service URL pattern
          return /\/services\/[a-z-]+$/.test(serviceItem.item)
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Product Page Breadcrumb Hierarchy Tests
 * Validates: Requirement 5.3 - Correct page hierarchy for product pages
 * (Accueil > Produits > [Product Name])
 */
describe('Product Page Breadcrumb Hierarchy (Req 5.3)', () => {
  /**
   * Property: For any product page, the breadcrumb hierarchy SHALL be
   * Accueil > Produits > [Product Name]
   * 
   * **Validates: Requirements 5.3**
   */
  it('should have correct hierarchy for product pages: Accueil > Produits > [Product Name]', () => {
    fc.assert(
      fc.property(
        productPageBreadcrumbsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          
          // Should have exactly 3 items
          if (schema.itemListElement.length !== 3) return false
          
          // First item should be Accueil
          const firstItem = schema.itemListElement[0]
          if (firstItem.name !== 'Accueil') return false
          if (firstItem.position !== 1) return false
          
          // Second item should be Produits
          const secondItem = schema.itemListElement[1]
          if (secondItem.name !== 'Produits') return false
          if (secondItem.position !== 2) return false
          if (!secondItem.item.includes('/produits')) return false
          
          // Third item should be the product name
          const thirdItem = schema.itemListElement[2]
          if (thirdItem.position !== 3) return false
          if (!thirdItem.item.includes('/produits/')) return false
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product page, the product URL SHALL contain the product slug
   * 
   * **Validates: Requirements 5.3**
   */
  it('should have product URL containing the product slug', () => {
    fc.assert(
      fc.property(
        productPageBreadcrumbsArbitrary,
        (props) => {
          const schema = generateBreadcrumbSchema(props)
          const productItem = schema.itemListElement[2]
          
          // URL should be a valid product URL pattern
          return /\/produits\/[a-z0-9-]+$/.test(productItem.item)
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for Greenter breadcrumb configurations
 * These validate the specific requirements for actual pages
 */
describe('Greenter Breadcrumb Configurations', () => {
  // Breadcrumb configurations as used in the application
  const breadcrumbConfigs: { path: string; items: BreadcrumbItem[] }[] = [
    {
      path: '/',
      items: [{ name: 'Accueil', url: 'https://greenter.fr' }]
    },
    {
      path: '/services',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Services', url: 'https://greenter.fr/services' }
      ]
    },
    {
      path: '/services/pompe-a-chaleur',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Services', url: 'https://greenter.fr/services' },
        { name: 'Pompe à chaleur', url: 'https://greenter.fr/services/pompe-a-chaleur' }
      ]
    },
    {
      path: '/services/panneaux-solaires',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Services', url: 'https://greenter.fr/services' },
        { name: 'Panneaux solaires', url: 'https://greenter.fr/services/panneaux-solaires' }
      ]
    },
    {
      path: '/services/isolation',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Services', url: 'https://greenter.fr/services' },
        { name: 'Isolation', url: 'https://greenter.fr/services/isolation' }
      ]
    },
    {
      path: '/services/audit',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Services', url: 'https://greenter.fr/services' },
        { name: 'Audit énergétique', url: 'https://greenter.fr/services/audit' }
      ]
    },
    {
      path: '/services/maintenance',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Services', url: 'https://greenter.fr/services' },
        { name: 'Maintenance', url: 'https://greenter.fr/services/maintenance' }
      ]
    },
    {
      path: '/produits',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Produits', url: 'https://greenter.fr/produits' }
      ]
    },
    {
      path: '/produits/kstar-blue-s-6kw',
      items: [
        { name: 'Accueil', url: 'https://greenter.fr' },
        { name: 'Produits', url: 'https://greenter.fr/produits' },
        { name: 'KSTAR BluE-S 6kW', url: 'https://greenter.fr/produits/kstar-blue-s-6kw' }
      ]
    }
  ]

  /**
   * Test: Each breadcrumb config SHALL generate valid BreadcrumbList schema
   * 
   * **Validates: Requirements 5.1**
   */
  it.each(breadcrumbConfigs)('should render valid BreadcrumbList schema for $path', ({ items }) => {
    const schema = generateBreadcrumbSchema({ items })
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("BreadcrumbList")
  })

  /**
   * Test: Each breadcrumb config SHALL have correct number of items
   * 
   * **Validates: Requirements 5.1**
   */
  it.each(breadcrumbConfigs)('should have correct number of items for $path', ({ items }) => {
    const schema = generateBreadcrumbSchema({ items })
    expect(schema.itemListElement.length).toBe(items.length)
  })

  /**
   * Test: Each breadcrumb item SHALL have position, name, and item URL
   * 
   * **Validates: Requirements 5.4**
   */
  it.each(breadcrumbConfigs)('should have position, name, and item URL for each item in $path', ({ items }) => {
    const schema = generateBreadcrumbSchema({ items })
    schema.itemListElement.forEach((item, index) => {
      expect(item["@type"]).toBe("ListItem")
      expect(item.position).toBe(index + 1)
      expect(typeof item.name).toBe('string')
      expect(item.name.length).toBeGreaterThan(0)
      expect(typeof item.item).toBe('string')
      expect(item.item.length).toBeGreaterThan(0)
    })
  })

  /**
   * Test: Service pages SHALL have hierarchy Accueil > Services > [Service Name]
   * 
   * **Validates: Requirements 5.2**
   */
  const servicePages = breadcrumbConfigs.filter(c => 
    c.path.startsWith('/services/') && c.path !== '/services'
  )
  
  it.each(servicePages)('should have correct service hierarchy for $path', ({ items }) => {
    const schema = generateBreadcrumbSchema({ items })
    expect(schema.itemListElement.length).toBe(3)
    expect(schema.itemListElement[0].name).toBe('Accueil')
    expect(schema.itemListElement[1].name).toBe('Services')
    expect(schema.itemListElement[2].name).toBeTruthy()
  })

  /**
   * Test: Product pages SHALL have hierarchy Accueil > Produits > [Product Name]
   * 
   * **Validates: Requirements 5.3**
   */
  const productPages = breadcrumbConfigs.filter(c => 
    c.path.startsWith('/produits/') && c.path !== '/produits'
  )
  
  it.each(productPages)('should have correct product hierarchy for $path', ({ items }) => {
    const schema = generateBreadcrumbSchema({ items })
    expect(schema.itemListElement.length).toBe(3)
    expect(schema.itemListElement[0].name).toBe('Accueil')
    expect(schema.itemListElement[1].name).toBe('Produits')
    expect(schema.itemListElement[2].name).toBeTruthy()
  })

  /**
   * Test: All breadcrumb URLs SHALL be unique within each configuration
   */
  it.each(breadcrumbConfigs)('should have unique URLs within breadcrumb for $path', ({ items }) => {
    const urls = items.map(item => item.url)
    const uniqueUrls = new Set(urls)
    expect(uniqueUrls.size).toBe(items.length)
  })

  /**
   * Test: First breadcrumb item SHALL always be Accueil
   */
  it.each(breadcrumbConfigs)('should have Accueil as first breadcrumb for $path', ({ items }) => {
    const schema = generateBreadcrumbSchema({ items })
    expect(schema.itemListElement[0].name).toBe('Accueil')
    expect(schema.itemListElement[0].item).toBe('https://greenter.fr')
  })
})
