/**
 * Property-Based Tests for Slug Auto-Generation Field
 * 
 * Feature: payload-cms-migration
 * Property 1: Slug Auto-Generation
 * 
 * **Validates: Requirements 2.11, 3.1**
 * 
 * For any product or category with a name but no slug provided, saving the document
 * should result in a valid slug being auto-generated from the name (lowercase,
 * hyphenated, no special characters).
 */

import * as fc from 'fast-check'

/**
 * Extracts and tests the slug generation logic from the slugField hook.
 * This simulates the beforeValidate hook behavior from fields/slug.ts
 */
function generateSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Simulates the beforeValidate hook behavior from fields/slug.ts
 * Returns the slug value that would be set on the document
 */
function simulateSlugFieldHook(
  value: string | undefined | null,
  data: { name?: string } | undefined,
  sourceField: string = 'name'
): string | undefined | null {
  // Auto-generate slug from source field if not provided
  if (!value && data?.[sourceField as keyof typeof data]) {
    return generateSlugFromName(data[sourceField as keyof typeof data] as string)
  }
  return value
}

/**
 * Helper function to check if a string contains only valid slug characters
 * Valid characters: lowercase a-z, digits 0-9, and hyphens
 */
function isValidSlugCharacters(slug: string): boolean {
  return /^[a-z0-9-]*$/.test(slug)
}

/**
 * Helper function to check if a string has no leading or trailing hyphens
 */
function hasNoLeadingOrTrailingHyphens(slug: string): boolean {
  if (slug.length === 0) return true
  return !slug.startsWith('-') && !slug.endsWith('-')
}

/**
 * Helper function to check if a string is all lowercase
 */
function isLowercase(slug: string): boolean {
  return slug === slug.toLowerCase()
}

/**
 * Character sets for generating test strings
 */
const frenchCharacters = 'éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ'
const asciiLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const digits = '0123456789'
const spaces = ' '
const specialChars = '-_\'.,!?()[]{}:;'

/**
 * Arbitrary generator for product/category names with French characters
 */
const productNameArbitrary = fc.array(
  fc.constantFrom(...(frenchCharacters + asciiLetters + digits + spaces).split('')),
  { minLength: 1, maxLength: 100 }
).map(chars => chars.join(''))

/**
 * Arbitrary generator for realistic French product/category names
 */
const realisticNameArbitrary = fc.constantFrom(
  'Batteries solaires',
  'Énergie renouvelable',
  'Pompes à chaleur',
  'Panneaux photovoltaïques',
  'Système de chauffage écologique',
  'Climatisation réversible',
  'Chauffe-eau thermodynamique',
  'Isolation thermique extérieure',
  'Ventilation mécanique contrôlée',
  'Audit énergétique',
  'Rénovation énergétique',
  'Économies d\'énergie',
  'KSTAR BluE-S 6kW',
  'Onduleur hybride',
  'Stockage d\'énergie',
  'Autoconsommation solaire',
  'Onduleurs',
  'Batteries',
  'Accessoires solaires',
  'Kits complets'
)

/**
 * Arbitrary generator for names with mixed content (French + special chars)
 */
const mixedContentNameArbitrary = fc.array(
  fc.constantFrom(...(frenchCharacters + asciiLetters + digits + spaces + specialChars).split('')),
  { minLength: 1, maxLength: 100 }
).map(chars => chars.join(''))

describe('Property 1: Slug Auto-Generation', () => {
  /**
   * Property: When no slug is provided and a name exists, a slug SHALL be auto-generated
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('Auto-generation behavior', () => {
    it('should auto-generate slug when value is undefined and name is provided', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            // Should return a non-null value (auto-generated slug)
            expect(result).not.toBeUndefined()
            expect(result).not.toBeNull()
            expect(typeof result).toBe('string')
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should auto-generate slug when value is null and name is provided', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(null, { name })
            expect(result).not.toBeNull()
            expect(typeof result).toBe('string')
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should auto-generate slug when value is empty string and name is provided', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook('', { name })
            expect(result).not.toBe('')
            expect(typeof result).toBe('string')
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve existing slug when value is provided', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z0-9-]+$/.test(s)),
            productNameArbitrary
          ),
          ([existingSlug, name]) => {
            const result = simulateSlugFieldHook(existingSlug, { name })
            // Should return the existing slug unchanged
            expect(result).toBe(existingSlug)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Auto-generated slug SHALL be lowercase
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('Lowercase output', () => {
    it('should produce lowercase slug from any name', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect(result).toBe((result as string).toLowerCase())
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should produce lowercase slug from realistic product names', () => {
      fc.assert(
        fc.property(
          realisticNameArbitrary,
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect(isLowercase(result as string)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Auto-generated slug SHALL contain only valid characters (a-z, 0-9, hyphens)
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('Valid slug characters', () => {
    it('should produce slug with only lowercase letters, numbers, and hyphens', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect(isValidSlugCharacters(result as string)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle mixed content with special characters', () => {
      fc.assert(
        fc.property(
          mixedContentNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect(isValidSlugCharacters(result as string)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Auto-generated slug SHALL have no leading or trailing hyphens
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('No leading/trailing hyphens', () => {
    it('should produce slug without leading or trailing hyphens', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect(hasNoLeadingOrTrailingHyphens(result as string)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle names with leading/trailing spaces', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            fc.string({ minLength: 0, maxLength: 5 }).map(s => s.replace(/[^\s]/g, ' ')),
            productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
            fc.string({ minLength: 0, maxLength: 5 }).map(s => s.replace(/[^\s]/g, ' '))
          ),
          ([leadingSpaces, name, trailingSpaces]) => {
            const paddedName = leadingSpaces + name + trailingSpaces
            const result = simulateSlugFieldHook(undefined, { name: paddedName })
            expect(hasNoLeadingOrTrailingHyphens(result as string)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Auto-generated slug SHALL correctly normalize French accented characters
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('French character normalization', () => {
    it('should normalize French accented characters to ASCII equivalents', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            // After slugification, no accented characters should remain
            expect(isValidSlugCharacters(result as string)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle realistic French product/category names', () => {
      fc.assert(
        fc.property(
          realisticNameArbitrary,
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect(isValidSlugCharacters(result as string)).toBe(true)
            expect(hasNoLeadingOrTrailingHyphens(result as string)).toBe(true)
            expect(isLowercase(result as string)).toBe(true)
            expect((result as string).length).toBeGreaterThan(0)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Auto-generated slug SHALL not contain consecutive hyphens
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('No consecutive hyphens', () => {
    it('should not produce consecutive hyphens in slug', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const result = simulateSlugFieldHook(undefined, { name })
            expect((result as string).includes('--')).toBe(false)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Slug generation SHALL be idempotent
   * 
   * **Validates: Requirements 2.11, 3.1**
   */
  describe('Idempotency', () => {
    it('should be idempotent - generating slug from slug produces same result', () => {
      fc.assert(
        fc.property(
          productNameArbitrary.filter(name => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(name)),
          (name) => {
            const slug1 = simulateSlugFieldHook(undefined, { name })
            const slug2 = simulateSlugFieldHook(undefined, { name: slug1 as string })
            expect(slug1).toBe(slug2)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})

/**
 * Specific tests for slug field behavior with Products and Categories
 */
describe('Slug Field Integration', () => {
  /**
   * Test: Product name to slug conversion
   */
  describe('Product slug generation', () => {
    it('should generate correct slug for product names', () => {
      expect(simulateSlugFieldHook(undefined, { name: 'KSTAR BluE-S 6kW' })).toBe('kstar-blue-s-6kw')
      expect(simulateSlugFieldHook(undefined, { name: 'Onduleur hybride' })).toBe('onduleur-hybride')
      expect(simulateSlugFieldHook(undefined, { name: 'Batterie lithium 10kWh' })).toBe('batterie-lithium-10kwh')
    })

    it('should preserve existing product slug', () => {
      expect(simulateSlugFieldHook('custom-slug', { name: 'KSTAR BluE-S 6kW' })).toBe('custom-slug')
    })
  })

  /**
   * Test: Category name to slug conversion
   */
  describe('Category slug generation', () => {
    it('should generate correct slug for category names', () => {
      expect(simulateSlugFieldHook(undefined, { name: 'Batteries solaires' })).toBe('batteries-solaires')
      expect(simulateSlugFieldHook(undefined, { name: 'Pompes à chaleur' })).toBe('pompes-a-chaleur')
      expect(simulateSlugFieldHook(undefined, { name: 'Panneaux photovoltaïques' })).toBe('panneaux-photovoltaiques')
    })

    it('should preserve existing category slug', () => {
      expect(simulateSlugFieldHook('onduleurs', { name: 'Onduleurs hybrides' })).toBe('onduleurs')
    })
  })

  /**
   * Test: Edge cases for slug field
   */
  describe('Edge cases', () => {
    it('should return undefined when no name is provided', () => {
      expect(simulateSlugFieldHook(undefined, undefined)).toBeUndefined()
      expect(simulateSlugFieldHook(undefined, {})).toBeUndefined()
    })

    it('should handle empty name', () => {
      expect(simulateSlugFieldHook(undefined, { name: '' })).toBeUndefined()
    })

    it('should handle name with only special characters', () => {
      const result = simulateSlugFieldHook(undefined, { name: '---' })
      expect(result).toBe('')
    })

    it('should handle name with only spaces', () => {
      const result = simulateSlugFieldHook(undefined, { name: '   ' })
      expect(result).toBe('')
    })
  })
})
