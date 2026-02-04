/**
 * Property-Based Tests for Slugify Function
 * 
 * Feature: admin-backend
 * Property 5: Slug Generation Round-Trip
 * 
 * **Validates: Requirements 4.7, 5.8**
 * 
 * For any valid category or product name string containing French characters 
 * (accents, cedillas), the slugify function SHALL produce a lowercase string 
 * containing only ASCII letters, numbers, and hyphens, with no leading or 
 * trailing hyphens.
 */

import * as fc from 'fast-check'
import { slugify } from '@/lib/slugify'

/**
 * Character sets for generating test strings
 */
const frenchCharacters = 'éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ'
const asciiLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const digits = '0123456789'
const spaces = ' '
const specialChars = '-_\'.,!?()[]{}:;'

/**
 * Arbitrary generator for strings containing French characters
 * Uses array of characters joined together
 */
const frenchStringArbitrary = fc.array(
  fc.constantFrom(...(frenchCharacters + asciiLetters + digits + spaces).split('')),
  { minLength: 1, maxLength: 100 }
).map(chars => chars.join(''))

/**
 * Arbitrary generator for realistic French product/category names
 */
const realisticFrenchNameArbitrary = fc.constantFrom(
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
  'Crédit d\'impôt',
  'Prime énergie',
  'Certificats d\'économies d\'énergie',
  'KSTAR BluE-S 6kW',
  'Onduleur hybride',
  'Stockage d\'énergie',
  'Autoconsommation solaire',
  'Réseau électrique intelligent'
)

/**
 * Arbitrary generator for strings with mixed content (French + special chars)
 */
const mixedContentArbitrary = fc.array(
  fc.constantFrom(...(frenchCharacters + asciiLetters + digits + spaces + specialChars).split('')),
  { minLength: 1, maxLength: 100 }
).map(chars => chars.join(''))

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

describe('Property 5: Slug Generation Round-Trip', () => {
  /**
   * Property: For any input string, the slugify function SHALL produce 
   * a string containing only lowercase ASCII letters, numbers, and hyphens
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should produce output containing only lowercase ASCII letters, numbers, and hyphens', () => {
    fc.assert(
      fc.property(
        frenchStringArbitrary,
        (input) => {
          const slug = slugify(input)
          return isValidSlugCharacters(slug)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any input string, the slugify function SHALL produce 
   * a string with no leading or trailing hyphens
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should produce output with no leading or trailing hyphens', () => {
    fc.assert(
      fc.property(
        frenchStringArbitrary,
        (input) => {
          const slug = slugify(input)
          return hasNoLeadingOrTrailingHyphens(slug)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any input string, the slugify function SHALL produce 
   * a lowercase string
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should produce lowercase output', () => {
    fc.assert(
      fc.property(
        frenchStringArbitrary,
        (input) => {
          const slug = slugify(input)
          return isLowercase(slug)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any input string with French accented characters,
   * the slugify function SHALL correctly normalize them to ASCII equivalents
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should normalize French accented characters to ASCII', () => {
    fc.assert(
      fc.property(
        frenchStringArbitrary,
        (input) => {
          const slug = slugify(input)
          // After slugification, no accented characters should remain
          // Check that no characters outside a-z, 0-9, - exist
          return isValidSlugCharacters(slug)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any realistic French product/category name,
   * the slugify function SHALL produce valid slug output
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should handle realistic French product/category names correctly', () => {
    fc.assert(
      fc.property(
        realisticFrenchNameArbitrary,
        (input) => {
          const slug = slugify(input)
          return (
            isValidSlugCharacters(slug) &&
            hasNoLeadingOrTrailingHyphens(slug) &&
            isLowercase(slug) &&
            slug.length > 0 // Realistic names should produce non-empty slugs
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any input with mixed content (French chars + special chars),
   * the slugify function SHALL produce valid slug output
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should handle mixed content with special characters', () => {
    fc.assert(
      fc.property(
        mixedContentArbitrary,
        (input) => {
          const slug = slugify(input)
          return (
            isValidSlugCharacters(slug) &&
            hasNoLeadingOrTrailingHyphens(slug) &&
            isLowercase(slug)
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The slugify function SHALL be idempotent - 
   * applying it twice should produce the same result as applying it once
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should be idempotent (slugify(slugify(x)) === slugify(x))', () => {
    fc.assert(
      fc.property(
        frenchStringArbitrary,
        (input) => {
          const slug1 = slugify(input)
          const slug2 = slugify(slug1)
          return slug1 === slug2
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any non-empty input containing at least one alphanumeric character,
   * the slugify function SHALL produce a non-empty output
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should produce non-empty output for inputs with alphanumeric content', () => {
    const alphanumericInputArbitrary = fc.array(
      fc.constantFrom(...(frenchCharacters + asciiLetters + digits + spaces).split('')),
      { minLength: 1, maxLength: 100 }
    ).map(chars => chars.join(''))
     .filter(s => /[a-zA-Z0-9éèêëàâäçùûüôöîïÉÈÊËÀÂÄÇÙÛÜÔÖÎÏ]/.test(s))

    fc.assert(
      fc.property(
        alphanumericInputArbitrary,
        (input) => {
          const slug = slugify(input)
          return slug.length > 0
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: The slugify function SHALL not produce consecutive hyphens
   * in the output (multiple spaces/special chars become single hyphen)
   * 
   * **Validates: Requirements 4.7, 5.8**
   */
  it('should not produce consecutive hyphens', () => {
    fc.assert(
      fc.property(
        frenchStringArbitrary,
        (input) => {
          const slug = slugify(input)
          return !slug.includes('--')
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for French character normalization
 */
describe('French Character Normalization', () => {
  /**
   * Test: é, è, ê, ë should all normalize to 'e'
   */
  it('should normalize e-variants (é, è, ê, ë) to e', () => {
    expect(slugify('énergie')).toBe('energie')
    expect(slugify('système')).toBe('systeme')
    expect(slugify('être')).toBe('etre')
    expect(slugify('Noël')).toBe('noel')
  })

  /**
   * Test: à, â, ä should all normalize to 'a'
   */
  it('should normalize a-variants (à, â, ä) to a', () => {
    expect(slugify('à')).toBe('a')
    expect(slugify('château')).toBe('chateau')
    expect(slugify('Käse')).toBe('kase') // German umlaut also handled
  })

  /**
   * Test: ç should normalize to 'c'
   */
  it('should normalize ç to c', () => {
    expect(slugify('français')).toBe('francais')
    expect(slugify('façade')).toBe('facade')
    expect(slugify('reçu')).toBe('recu')
  })

  /**
   * Test: ù, û, ü should all normalize to 'u'
   */
  it('should normalize u-variants (ù, û, ü) to u', () => {
    expect(slugify('où')).toBe('ou')
    expect(slugify('sûr')).toBe('sur')
    expect(slugify('Müller')).toBe('muller')
  })

  /**
   * Test: ô, ö should normalize to 'o'
   */
  it('should normalize o-variants (ô, ö) to o', () => {
    expect(slugify('hôtel')).toBe('hotel')
    expect(slugify('Köln')).toBe('koln')
  })

  /**
   * Test: î, ï should normalize to 'i'
   */
  it('should normalize i-variants (î, ï) to i', () => {
    expect(slugify('île')).toBe('ile')
    expect(slugify('naïf')).toBe('naif')
  })
})

/**
 * Edge case tests for slugify function
 */
describe('Slugify Edge Cases', () => {
  /**
   * Test: Empty string should return empty string
   */
  it('should handle empty string', () => {
    expect(slugify('')).toBe('')
  })

  /**
   * Test: String with only spaces should return empty string
   */
  it('should handle string with only spaces', () => {
    expect(slugify('   ')).toBe('')
  })

  /**
   * Test: String with only special characters should return empty string
   */
  it('should handle string with only special characters', () => {
    expect(slugify('---')).toBe('')
    expect(slugify('...')).toBe('')
    expect(slugify('!!!')).toBe('')
  })

  /**
   * Test: String with leading/trailing spaces should trim them
   */
  it('should handle leading and trailing spaces', () => {
    expect(slugify('  hello world  ')).toBe('hello-world')
  })

  /**
   * Test: String with multiple consecutive spaces should produce single hyphen
   */
  it('should handle multiple consecutive spaces', () => {
    expect(slugify('hello    world')).toBe('hello-world')
  })

  /**
   * Test: String with numbers should preserve them
   */
  it('should preserve numbers', () => {
    expect(slugify('KSTAR BluE-S 6kW')).toBe('kstar-blue-s-6kw')
    expect(slugify('123 test')).toBe('123-test')
  })

  /**
   * Test: Already valid slug should remain unchanged
   */
  it('should not change already valid slugs', () => {
    expect(slugify('batteries-solaires')).toBe('batteries-solaires')
    expect(slugify('energie-renouvelable')).toBe('energie-renouvelable')
  })

  /**
   * Test: Mixed case should be lowercased
   */
  it('should lowercase mixed case input', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('UPPERCASE')).toBe('uppercase')
    expect(slugify('MixedCase')).toBe('mixedcase')
  })

  /**
   * Test: Apostrophes and quotes should be replaced with hyphens
   */
  it('should handle apostrophes and quotes', () => {
    expect(slugify("Économies d'énergie")).toBe('economies-d-energie')
    expect(slugify('Test "quoted" text')).toBe('test-quoted-text')
  })
})

/**
 * Real-world product and category name tests
 */
describe('Real-world Product and Category Names', () => {
  /**
   * Test: Actual category names from the Greenter website
   */
  it('should correctly slugify actual category names', () => {
    expect(slugify('Batteries solaires')).toBe('batteries-solaires')
    expect(slugify('Pompes à chaleur')).toBe('pompes-a-chaleur')
    expect(slugify('Panneaux photovoltaïques')).toBe('panneaux-photovoltaiques')
  })

  /**
   * Test: Actual product names from the Greenter website
   */
  it('should correctly slugify actual product names', () => {
    expect(slugify('KSTAR BluE-S 6kW')).toBe('kstar-blue-s-6kw')
    expect(slugify('Onduleur hybride')).toBe('onduleur-hybride')
    expect(slugify('Chauffe-eau thermodynamique')).toBe('chauffe-eau-thermodynamique')
  })

  /**
   * Test: Complex French phrases
   */
  it('should handle complex French phrases', () => {
    expect(slugify('Système de chauffage écologique')).toBe('systeme-de-chauffage-ecologique')
    expect(slugify('Rénovation énergétique complète')).toBe('renovation-energetique-complete')
    expect(slugify("Certificats d'économies d'énergie")).toBe('certificats-d-economies-d-energie')
  })
})
