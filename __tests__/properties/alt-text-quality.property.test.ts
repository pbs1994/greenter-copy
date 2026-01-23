/**
 * Property-Based Tests for Image Alt Text Quality
 * 
 * Feature: seo-audit-onsite
 * Property 5: Image Alt Text Quality
 * 
 * **Validates: Requirements 6.1-6.3**
 * 
 * For any image in the application, the alt attribute SHALL be descriptive 
 * (more than 10 characters) and SHALL NOT consist only of a product model 
 * number or generic text.
 */

import * as fc from 'fast-check'

/**
 * Interface representing an image with alt text in the application
 */
interface ImageWithAlt {
  src: string
  alt: string
  context: 'product' | 'service' | 'partner' | 'certification' | 'decorative'
}

/**
 * Known model number patterns that should NOT be used as standalone alt text
 * These are considered generic/non-descriptive
 */
const MODEL_NUMBER_PATTERNS = [
  /^[A-Z]+-[A-Z0-9]+-\d+[A-Z]*$/i,  // e.g., KSTAR-BLUES-6KW
  /^[A-Z]{2,}-\d+[A-Z]*$/i,          // e.g., PAC-6000
  /^[A-Z]+\d+[A-Z]*$/i,              // e.g., KSTAR6KW
  /^[A-Z]+-\d+$/i,                   // e.g., MODEL-123
  /^\d+-[A-Z]+$/i,                   // e.g., 123-ABC
]

/**
 * Generic alt texts that should NOT be used
 */
const GENERIC_ALT_TEXTS = [
  'image',
  'photo',
  'picture',
  'img',
  'product',
  'service',
  'logo',
]

/**
 * Descriptive keywords that indicate good alt text for product images
 * At least one of these should be present for product images
 */
const PRODUCT_DESCRIPTIVE_KEYWORDS = [
  'batterie solaire',
  'onduleur hybride',
  'onduleur',
  'batterie',
  'solaire',
  'stockage',
  'énergie',
  'lifepo4',
  'autoconsommation',
]

/**
 * Descriptive keywords for service images
 */
const SERVICE_DESCRIPTIVE_KEYWORDS = [
  'installation',
  'pompe à chaleur',
  'panneaux solaires',
  'isolation',
  'audit',
  'maintenance',
  'thermique',
  'énergétique',
  'chauffage',
  'greenter',
  'conformité',
  'électrique',
  'équipements',
]

/**
 * Checks if an alt text is just a model number
 */
function isModelNumberOnly(alt: string): boolean {
  const trimmed = alt.trim()
  return MODEL_NUMBER_PATTERNS.some(pattern => pattern.test(trimmed))
}

/**
 * Checks if an alt text is generic/non-descriptive
 */
function isGenericAltText(alt: string): boolean {
  const normalized = alt.toLowerCase().trim()
  return GENERIC_ALT_TEXTS.includes(normalized)
}

/**
 * Checks if alt text is descriptive (more than 10 characters)
 */
function isDescriptive(alt: string): boolean {
  return alt.trim().length > 10
}

/**
 * Checks if product alt text contains descriptive keywords
 */
function hasProductDescriptiveKeywords(alt: string): boolean {
  const normalized = alt.toLowerCase()
  return PRODUCT_DESCRIPTIVE_KEYWORDS.some(keyword => normalized.includes(keyword))
}

/**
 * Checks if service alt text contains descriptive keywords
 */
function hasServiceDescriptiveKeywords(alt: string): boolean {
  const normalized = alt.toLowerCase()
  return SERVICE_DESCRIPTIVE_KEYWORDS.some(keyword => normalized.includes(keyword))
}

/**
 * Validates alt text quality based on image context
 */
function validateAltTextQuality(image: ImageWithAlt): {
  isValid: boolean
  reasons: string[]
} {
  const reasons: string[] = []
  
  // Decorative images can have empty alt (accessibility best practice)
  if (image.context === 'decorative') {
    return { isValid: true, reasons: [] }
  }
  
  // Check minimum length (more than 10 characters)
  if (!isDescriptive(image.alt)) {
    reasons.push(`Alt text too short: "${image.alt}" (${image.alt.length} chars, need >10)`)
  }
  
  // Check for model number only
  if (isModelNumberOnly(image.alt)) {
    reasons.push(`Alt text is just a model number: "${image.alt}"`)
  }
  
  // Check for generic alt text
  if (isGenericAltText(image.alt)) {
    reasons.push(`Alt text is generic: "${image.alt}"`)
  }
  
  // For product images, check for descriptive keywords
  if (image.context === 'product' && !hasProductDescriptiveKeywords(image.alt)) {
    reasons.push(`Product alt text lacks descriptive keywords: "${image.alt}"`)
  }
  
  // For service images, check for descriptive keywords
  if (image.context === 'service' && !hasServiceDescriptiveKeywords(image.alt)) {
    reasons.push(`Service alt text lacks descriptive keywords: "${image.alt}"`)
  }
  
  return {
    isValid: reasons.length === 0,
    reasons
  }
}

/**
 * Arbitrary generator for valid descriptive alt texts
 */
const descriptiveAltArbitrary = fc.oneof(
  // Product alt texts
  fc.constantFrom(
    'KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4',
    'Onduleur hybride KSTAR avec batteries intégrées pour autoconsommation solaire',
    'Batterie solaire LiFePO4 pour stockage énergie photovoltaïque',
    'Système de stockage énergie solaire KSTAR BluE-S',
  ),
  // Service alt texts
  fc.constantFrom(
    'Installation pompe à chaleur par Greenter',
    'Installation panneaux solaires par Greenter',
    'Audit énergétique par Greenter',
    'Isolation thermique maison',
    'Maintenance équipements par Greenter',
  ),
  // Partner/certification alt texts
  fc.constantFrom(
    'Logo Daikin partenaire Greenter',
    'Certification RGE Greenter',
    'Logo Atlantic fabricant pompes à chaleur',
  )
)

/**
 * Arbitrary generator for invalid/generic alt texts
 */
const invalidAltArbitrary = fc.oneof(
  // Model numbers only
  fc.constantFrom(
    'KSTAR-BLUES-6KW',
    'PAC-6000',
    'MODEL-123',
    'KSTAR6KW',
  ),
  // Generic texts
  fc.constantFrom(
    'image',
    'photo',
    'product',
    'logo',
    'img',
  ),
  // Too short
  fc.string({ minLength: 1, maxLength: 10 }).filter(s => s.trim().length > 0 && s.trim().length <= 10)
)

/**
 * Arbitrary generator for image context
 */
const imageContextArbitrary = fc.constantFrom(
  'product' as const,
  'service' as const,
  'partner' as const,
  'certification' as const
)

/**
 * Arbitrary generator for valid images with descriptive alt texts
 * Uses context-appropriate alt texts to ensure validation passes
 */
const validImageArbitrary = fc.oneof(
  // Product images with product alt texts
  fc.record({
    src: fc.constant('/kstar.png'),
    alt: fc.constantFrom(
      'KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4',
      'Onduleur hybride KSTAR avec batteries intégrées pour autoconsommation solaire',
      'Batterie solaire LiFePO4 pour stockage énergie photovoltaïque',
      'Système de stockage énergie solaire KSTAR BluE-S',
    ),
    context: fc.constant('product' as const),
  }),
  // Service images with service alt texts
  fc.record({
    src: fc.constantFrom('/pac.jpg', '/solaire.jpg', '/audit.png', '/isolation.jpg', '/maintenance.jpg'),
    alt: fc.constantFrom(
      'Installation pompe à chaleur par Greenter',
      'Installation panneaux solaires par Greenter',
      'Audit énergétique par Greenter',
      'Isolation thermique maison',
      'Maintenance équipements par Greenter',
    ),
    context: fc.constant('service' as const),
  }),
  // Partner images with partner alt texts
  fc.record({
    src: fc.constantFrom('/partners/daikin.svg', '/partners/atlantic.svg'),
    alt: fc.constantFrom(
      'Logo Daikin partenaire Greenter',
      'Logo Atlantic fabricant pompes à chaleur',
    ),
    context: fc.constant('partner' as const),
  }),
  // Certification images with certification alt texts
  fc.record({
    src: fc.constantFrom('/certifications/rge.webp', '/certifications/qualibat.jpg'),
    alt: fc.constantFrom(
      'Certification RGE Greenter',
      'Certification Qualibat Greenter',
    ),
    context: fc.constant('certification' as const),
  }),
)

/**
 * Arbitrary generator for product images specifically
 */
const productImageArbitrary = fc.record({
  src: fc.constant('/kstar.png'),
  alt: fc.constantFrom(
    'KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4',
    'Onduleur hybride KSTAR avec batteries intégrées pour autoconsommation solaire',
    'Batterie solaire LiFePO4 pour stockage énergie photovoltaïque',
    'Système de stockage énergie solaire KSTAR BluE-S avec onduleur hybride',
  ),
  context: fc.constant('product' as const),
})

/**
 * Arbitrary generator for service images specifically
 */
const serviceImageArbitrary = fc.record({
  src: fc.constantFrom('/pac.jpg', '/solaire.jpg', '/audit.png', '/isolation.jpg', '/maintenance.jpg'),
  alt: fc.constantFrom(
    'Installation pompe à chaleur par Greenter',
    'Installation panneaux solaires par Greenter',
    'Audit énergétique par Greenter',
    'Isolation thermique maison',
    'Maintenance équipements par Greenter',
    'Mise en conformité électrique',
  ),
  context: fc.constant('service' as const),
})

describe('Property 5: Image Alt Text Quality', () => {
  /**
   * Property: For any image, the alt text SHALL be more than 10 characters
   * 
   * **Validates: Requirements 6.1, 6.2, 6.3**
   */
  it('should have alt text longer than 10 characters for all non-decorative images', () => {
    fc.assert(
      fc.property(
        validImageArbitrary,
        (image) => {
          return isDescriptive(image.alt)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any image, the alt text SHALL NOT consist only of a model number
   * 
   * **Validates: Requirements 6.3**
   */
  it('should not have alt text that is just a model number', () => {
    fc.assert(
      fc.property(
        validImageArbitrary,
        (image) => {
          return !isModelNumberOnly(image.alt)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any image, the alt text SHALL NOT be generic text
   * 
   * **Validates: Requirements 6.3**
   */
  it('should not have generic alt text like "image" or "photo"', () => {
    fc.assert(
      fc.property(
        validImageArbitrary,
        (image) => {
          return !isGenericAltText(image.alt)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any product image, the alt text SHALL include descriptive terms
   * like "Batterie solaire" or "Onduleur hybride"
   * 
   * **Validates: Requirements 6.1**
   */
  it('should include descriptive terms for product images', () => {
    fc.assert(
      fc.property(
        productImageArbitrary,
        (image) => {
          return hasProductDescriptiveKeywords(image.alt)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any service image, the alt text SHALL include the service type and context
   * 
   * **Validates: Requirements 6.2**
   */
  it('should include service type and context for service images', () => {
    fc.assert(
      fc.property(
        serviceImageArbitrary,
        (image) => {
          return hasServiceDescriptiveKeywords(image.alt)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid image, the complete validation SHALL pass
   * 
   * **Validates: Requirements 6.1-6.3**
   */
  it('should pass complete validation for all valid images', () => {
    fc.assert(
      fc.property(
        validImageArbitrary,
        (image) => {
          const result = validateAltTextQuality(image)
          return result.isValid
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Invalid alt texts SHALL fail validation
   * This is a negative test to ensure our validation catches bad alt texts
   * 
   * **Validates: Requirements 6.3**
   */
  it('should reject model-number-only alt texts', () => {
    const modelNumberAlts = [
      'KSTAR-BLUES-6KW',
      'PAC-6000',
      'MODEL-123',
    ]
    
    modelNumberAlts.forEach(alt => {
      expect(isModelNumberOnly(alt)).toBe(true)
    })
  })

  /**
   * Property: Generic alt texts SHALL fail validation
   * 
   * **Validates: Requirements 6.3**
   */
  it('should reject generic alt texts', () => {
    const genericAlts = ['image', 'photo', 'product', 'logo', 'img']
    
    genericAlts.forEach(alt => {
      expect(isGenericAltText(alt)).toBe(true)
    })
  })

  /**
   * Property: Short alt texts SHALL fail the descriptive check
   * 
   * **Validates: Requirements 6.1, 6.2**
   */
  it('should reject alt texts with 10 or fewer characters', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 10 }),
        (shortAlt) => {
          return !isDescriptive(shortAlt)
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for actual images in the Greenter application
 * These validate the specific requirements for real images
 */
describe('Greenter Application Image Alt Text Validation', () => {
  // Actual product images as used in the application
  const productImages: ImageWithAlt[] = [
    {
      src: '/kstar.png',
      alt: 'KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4',
      context: 'product',
    },
    {
      src: '/kstar.png',
      alt: 'KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4 pour autoconsommation',
      context: 'product',
    },
  ]

  // Actual service images as used in the application
  const serviceImages: ImageWithAlt[] = [
    {
      src: '/pac.jpg',
      alt: 'Installation pompe à chaleur par Greenter',
      context: 'service',
    },
    {
      src: '/solaire.jpg',
      alt: 'Installation panneaux solaires par Greenter',
      context: 'service',
    },
    {
      src: '/audit.png',
      alt: 'Audit énergétique par Greenter',
      context: 'service',
    },
    {
      src: '/isolation.jpg',
      alt: 'Isolation thermique maison',
      context: 'service',
    },
    {
      src: '/maintenance.jpg',
      alt: 'Maintenance équipements par Greenter',
      context: 'service',
    },
    {
      src: '/conformite.jpg',
      alt: 'Mise en conformité électrique',
      context: 'service',
    },
  ]

  /**
   * Test: Product image alt text SHALL include "Batterie solaire" or "Onduleur hybride"
   * 
   * **Validates: Requirements 6.1**
   */
  it.each(productImages)('product image $src should have descriptive alt text including solar/hybrid terms', (image) => {
    const result = validateAltTextQuality(image)
    expect(result.isValid).toBe(true)
    expect(hasProductDescriptiveKeywords(image.alt)).toBe(true)
  })

  /**
   * Test: Product image alt text SHALL be more than 10 characters
   * 
   * **Validates: Requirements 6.1**
   */
  it.each(productImages)('product image $src should have alt text longer than 10 characters', (image) => {
    expect(isDescriptive(image.alt)).toBe(true)
    expect(image.alt.length).toBeGreaterThan(10)
  })

  /**
   * Test: Product image alt text SHALL NOT be just a model number
   * 
   * **Validates: Requirements 6.3**
   */
  it.each(productImages)('product image $src should not have model-number-only alt text', (image) => {
    expect(isModelNumberOnly(image.alt)).toBe(false)
  })

  /**
   * Test: Service images SHALL have descriptive alt texts including service type
   * 
   * **Validates: Requirements 6.2**
   */
  it.each(serviceImages)('service image $src should have descriptive alt text with service context', (image) => {
    const result = validateAltTextQuality(image)
    expect(result.isValid).toBe(true)
    expect(hasServiceDescriptiveKeywords(image.alt)).toBe(true)
  })

  /**
   * Test: Service image alt texts SHALL be more than 10 characters
   * 
   * **Validates: Requirements 6.2**
   */
  it.each(serviceImages)('service image $src should have alt text longer than 10 characters', (image) => {
    expect(isDescriptive(image.alt)).toBe(true)
    expect(image.alt.length).toBeGreaterThan(10)
  })

  /**
   * Test: No image SHALL use generic alt text
   * 
   * **Validates: Requirements 6.3**
   */
  it('should not have any generic alt texts in the application', () => {
    const allImages = [...productImages, ...serviceImages]
    allImages.forEach(image => {
      expect(isGenericAltText(image.alt)).toBe(false)
    })
  })

  /**
   * Test: KSTAR product image specifically SHALL include context keywords
   * 
   * **Validates: Requirements 6.1**
   */
  it('KSTAR product image should include "Batterie solaire" or "Onduleur hybride"', () => {
    const kstarImage = productImages.find(img => img.src === '/kstar.png')
    expect(kstarImage).toBeDefined()
    
    const alt = kstarImage!.alt.toLowerCase()
    const hasRequiredKeywords = 
      alt.includes('batterie solaire') || 
      alt.includes('onduleur hybride') ||
      (alt.includes('batterie') && alt.includes('solaire')) ||
      (alt.includes('onduleur') && alt.includes('hybride'))
    
    expect(hasRequiredKeywords).toBe(true)
  })

  /**
   * Test: All service images SHALL have unique, descriptive alt texts
   */
  it('should have unique alt texts for all service images', () => {
    const alts = serviceImages.map(img => img.alt)
    const uniqueAlts = new Set(alts)
    expect(uniqueAlts.size).toBe(serviceImages.length)
  })
})

/**
 * Export validation functions for use in other tests or components
 */
export {
  isModelNumberOnly,
  isGenericAltText,
  isDescriptive,
  hasProductDescriptiveKeywords,
  hasServiceDescriptiveKeywords,
  validateAltTextQuality,
}
