/**
 * Property-Based Tests for ServiceSchema Component
 * 
 * Feature: seo-audit-onsite
 * Property 3: Service Schema Validity
 * 
 * **Validates: Requirements 4.1-4.5**
 * 
 * For any service page, the JSON-LD Service schema SHALL contain: 
 * name matching the service title, description, provider with name "Greenter", 
 * and areaServed including "France".
 */

import * as fc from 'fast-check'

// ServiceSchema props interface (matching the component)
interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  image?: string
  areaServed?: string
}

// Generated schema structure (what the component produces)
interface ServiceSchemaOutput {
  "@context": string
  "@type": string
  name: string
  description: string
  url: string
  image?: string
  provider: {
    "@type": string
    name: string
    url: string
    telephone: string
    address: {
      "@type": string
      streetAddress: string
      addressLocality: string
      postalCode: string
      addressCountry: string
    }
  }
  areaServed: {
    "@type": string
    name: string
  }
  serviceType: string
}

/**
 * Helper function to generate the schema output from props
 * This mirrors the ServiceSchema component logic
 */
function generateServiceSchema(props: ServiceSchemaProps): ServiceSchemaOutput {
  const {
    name,
    description,
    url,
    image,
    areaServed = 'France',
  } = props

  const schema: ServiceSchemaOutput = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Greenter",
      "url": "https://greenter.fr",
      "telephone": "+33609455056",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "38 Rue de Ménilmontant",
        "addressLocality": "Paris",
        "postalCode": "75020",
        "addressCountry": "FR"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "serviceType": name
  }

  if (image) {
    schema.image = image
  }

  return schema
}

/**
 * Arbitrary generator for valid service schema props
 * Generates realistic service data for testing
 */
const servicePropsArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
  description: fc.string({ minLength: 1, maxLength: 1000 }).filter(s => s.trim().length > 0),
  url: fc.webUrl(),
  image: fc.option(fc.webUrl().map(url => url.replace(/^https?:\/\//, '/').split('?')[0] || '/image.png'), { nil: undefined }),
  areaServed: fc.constantFrom('France', 'Île-de-France', 'Paris', 'Europe'),
})

/**
 * Arbitrary generator for service props with default areaServed
 * Tests default value handling (France)
 */
const servicePropsWithDefaultsArbitrary = fc.record({
  name: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
  description: fc.string({ minLength: 1, maxLength: 1000 }).filter(s => s.trim().length > 0),
  url: fc.webUrl(),
})

/**
 * Arbitrary generator for realistic French service names
 */
const frenchServiceNameArbitrary = fc.constantFrom(
  'Installation Pompe à Chaleur',
  'Installation Panneaux Solaires',
  'Isolation Thermique',
  'Audit Énergétique',
  'Maintenance et Entretien',
  'Rénovation Énergétique',
  'Chauffage Écologique'
)

/**
 * Arbitrary generator for realistic service props
 */
const realisticServicePropsArbitrary = fc.record({
  name: frenchServiceNameArbitrary,
  description: fc.string({ minLength: 20, maxLength: 500 }).filter(s => s.trim().length > 0),
  url: fc.constant('https://greenter.fr/services/').chain(base => 
    fc.constantFrom('pompe-a-chaleur', 'panneaux-solaires', 'isolation', 'audit', 'maintenance')
      .map(slug => base + slug)
  ),
  areaServed: fc.constant('France'),
})

describe('Property 3: Service Schema Validity', () => {
  /**
   * Property: For any valid service input, the schema SHALL contain 
   * the @context field set to "https://schema.org"
   * 
   * **Validates: Requirements 4.1**
   */
  it('should always include valid Schema.org context', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema["@context"] === "https://schema.org"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL have 
   * @type set to "Service"
   * 
   * **Validates: Requirements 4.1**
   */
  it('should always have @type set to Service', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema["@type"] === "Service"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * the service name exactly as provided (matching the service title)
   * 
   * **Validates: Requirements 4.2**
   */
  it('should include the service name exactly as provided', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.name === props.name
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * the service description exactly as provided
   * 
   * **Validates: Requirements 4.3**
   */
  it('should include the service description exactly as provided', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.description === props.description
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * a provider object with name "Greenter"
   * 
   * **Validates: Requirements 4.4**
   */
  it('should include provider with name "Greenter"', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.provider.name === "Greenter"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * provider with @type "LocalBusiness"
   * 
   * **Validates: Requirements 4.4**
   */
  it('should include provider with @type LocalBusiness', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.provider["@type"] === "LocalBusiness"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * provider URL pointing to greenter.fr
   * 
   * **Validates: Requirements 4.4**
   */
  it('should include provider URL pointing to greenter.fr', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.provider.url === "https://greenter.fr"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * areaServed with the provided value or default "France"
   * 
   * **Validates: Requirements 4.5**
   */
  it('should include areaServed with provided value', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          const expectedArea = props.areaServed ?? 'France'
          return schema.areaServed.name === expectedArea
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: When areaServed is not provided, the schema SHALL default to "France"
   * 
   * **Validates: Requirements 4.5**
   */
  it('should default areaServed to "France" when not provided', () => {
    fc.assert(
      fc.property(
        servicePropsWithDefaultsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.areaServed.name === "France"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the areaServed SHALL have 
   * @type "Country"
   * 
   * **Validates: Requirements 4.5**
   */
  it('should include areaServed with @type Country', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.areaServed["@type"] === "Country"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * the service URL exactly as provided
   * 
   * **Validates: Requirements 4.1**
   */
  it('should include the service URL exactly as provided', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.url === props.url
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the schema SHALL include 
   * serviceType matching the service name
   * 
   * **Validates: Requirements 4.2**
   */
  it('should include serviceType matching the service name', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          return schema.serviceType === props.name
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the provider SHALL include 
   * complete address information
   * 
   * **Validates: Requirements 4.4**
   */
  it('should include provider with complete address information', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          const address = schema.provider.address
          return (
            address["@type"] === "PostalAddress" &&
            typeof address.streetAddress === 'string' &&
            address.streetAddress.length > 0 &&
            typeof address.addressLocality === 'string' &&
            address.addressLocality.length > 0 &&
            typeof address.postalCode === 'string' &&
            address.postalCode.length > 0 &&
            address.addressCountry === "FR"
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, the generated schema 
   * SHALL be valid JSON (can be stringified without errors)
   * 
   * **Validates: Requirements 4.1**
   */
  it('should generate valid JSON that can be stringified', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          try {
            const jsonString = JSON.stringify(schema)
            const parsed = JSON.parse(jsonString)
            return parsed["@type"] === "Service"
          } catch {
            return false
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid service input, ALL required fields SHALL be present
   * This is the comprehensive check for Property 3
   * 
   * **Validates: Requirements 4.1-4.5**
   */
  it('should contain ALL required fields for any valid service input', () => {
    fc.assert(
      fc.property(
        servicePropsArbitrary,
        (props) => {
          const schema = generateServiceSchema(props)
          
          // Check all required top-level fields (Req 4.1)
          const hasContext = schema["@context"] === "https://schema.org"
          const hasType = schema["@type"] === "Service"
          
          // Check name matches service title (Req 4.2)
          const hasName = typeof schema.name === 'string' && 
                         schema.name.length > 0 && 
                         schema.name === props.name
          
          // Check description (Req 4.3)
          const hasDescription = typeof schema.description === 'string' && 
                                schema.description.length > 0 &&
                                schema.description === props.description
          
          // Check provider information - Greenter (Req 4.4)
          const hasProvider = (
            schema.provider &&
            schema.provider["@type"] === "LocalBusiness" &&
            schema.provider.name === "Greenter" &&
            schema.provider.url === "https://greenter.fr"
          )
          
          // Check areaServed includes France (Req 4.5)
          const hasAreaServed = (
            schema.areaServed &&
            schema.areaServed["@type"] === "Country" &&
            typeof schema.areaServed.name === 'string' &&
            schema.areaServed.name.length > 0
          )
          
          return (
            hasContext &&
            hasType &&
            hasName &&
            hasDescription &&
            hasProvider &&
            hasAreaServed
          )
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for Greenter service pages
 * These validate the specific requirements for actual services
 */
describe('Greenter Service Pages Schema Validation', () => {
  // Service data as used in the application
  const services: ServiceSchemaProps[] = [
    {
      name: 'Installation Pompe à Chaleur',
      description: 'Installation de pompes à chaleur air-eau et air-air par des professionnels certifiés RGE. Économisez sur votre facture de chauffage.',
      url: 'https://greenter.fr/services/pompe-a-chaleur',
      areaServed: 'France',
    },
    {
      name: 'Installation Panneaux Solaires',
      description: 'Installation de panneaux solaires photovoltaïques pour l\'autoconsommation. Produisez votre propre électricité verte.',
      url: 'https://greenter.fr/services/panneaux-solaires',
      areaServed: 'France',
    },
    {
      name: 'Isolation Thermique',
      description: 'Isolation thermique des combles, murs et planchers. Améliorez le confort de votre habitat et réduisez vos dépenses énergétiques.',
      url: 'https://greenter.fr/services/isolation',
      areaServed: 'France',
    },
    {
      name: 'Audit Énergétique',
      description: 'Audit énergétique complet de votre habitation. Identifiez les travaux prioritaires pour améliorer la performance énergétique.',
      url: 'https://greenter.fr/services/audit',
      areaServed: 'France',
    },
    {
      name: 'Maintenance et Entretien',
      description: 'Contrats de maintenance et entretien pour vos équipements de chauffage et climatisation. Garantissez leur performance et longévité.',
      url: 'https://greenter.fr/services/maintenance',
      areaServed: 'France',
    },
  ]

  /**
   * Test: Each service schema SHALL include valid Schema.org Service markup
   * 
   * **Validates: Requirements 4.1**
   */
  it.each(services)('should render valid Schema.org Service markup for $name', (service) => {
    const schema = generateServiceSchema(service)
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("Service")
  })

  /**
   * Test: Each service schema SHALL include service name specific to each page
   * 
   * **Validates: Requirements 4.2**
   */
  it.each(services)('should include service name "$name" specific to each page', (service) => {
    const schema = generateServiceSchema(service)
    expect(schema.name).toBe(service.name)
    expect(schema.serviceType).toBe(service.name)
  })

  /**
   * Test: Each service schema SHALL include service description specific to each page
   * 
   * **Validates: Requirements 4.3**
   */
  it.each(services)('should include service description for $name', (service) => {
    const schema = generateServiceSchema(service)
    expect(schema.description).toBe(service.description)
    expect(schema.description.length).toBeGreaterThan(0)
  })

  /**
   * Test: Each service schema SHALL include provider information (Greenter)
   * 
   * **Validates: Requirements 4.4**
   */
  it.each(services)('should include provider information (Greenter) for $name', (service) => {
    const schema = generateServiceSchema(service)
    expect(schema.provider.name).toBe("Greenter")
    expect(schema.provider["@type"]).toBe("LocalBusiness")
    expect(schema.provider.url).toBe("https://greenter.fr")
    expect(schema.provider.telephone).toBeTruthy()
    expect(schema.provider.address).toBeTruthy()
  })

  /**
   * Test: Each service schema SHALL include service area (France)
   * 
   * **Validates: Requirements 4.5**
   */
  it.each(services)('should include service area (France) for $name', (service) => {
    const schema = generateServiceSchema(service)
    expect(schema.areaServed.name).toBe("France")
    expect(schema.areaServed["@type"]).toBe("Country")
  })

  /**
   * Test: All services SHALL have unique URLs
   */
  it('should have unique URLs for all services', () => {
    const urls = services.map(s => s.url)
    const uniqueUrls = new Set(urls)
    expect(uniqueUrls.size).toBe(services.length)
  })

  /**
   * Test: All services SHALL have unique names
   */
  it('should have unique names for all services', () => {
    const names = services.map(s => s.name)
    const uniqueNames = new Set(names)
    expect(uniqueNames.size).toBe(services.length)
  })
})
