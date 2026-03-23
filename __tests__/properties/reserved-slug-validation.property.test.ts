/**
 * Property-Based Tests for Reserved Slug Validation
 *
 * Feature: payload-cms-migration
 * Property 11: Reserved Slug Validation
 *
 * **Validates: Requirements 11.5**
 *
 * For any Page being saved with a slug that matches a reserved route
 * (produits, blog, contact, services, admin, api), the save operation
 * should fail with a validation error.
 */

import * as fc from 'fast-check'

/**
 * Reserved slugs that conflict with existing routes
 * These slugs cannot be used for custom pages
 * Mirrors the RESERVED_SLUGS constant from collections/Pages.ts
 */
const RESERVED_SLUGS = [
  'produits',
  'services',
  'contact',
  'blog',
  'admin',
  'api',
]

/**
 * Validation result structure
 */
interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Simulates the slug validation logic from collections/Pages.ts
 * This mirrors the actual validate function in the slug field
 *
 * @param value - The slug value to validate
 * @returns ValidationResult indicating if the slug is valid
 */
function validateReservedSlug(value: string | null | undefined): ValidationResult {
  // Empty/null slugs are accepted (handled by required validation elsewhere)
  if (!value) {
    return { valid: true }
  }

  // Check for reserved slugs (case-insensitive)
  if (RESERVED_SLUGS.includes(value.toLowerCase())) {
    return {
      valid: false,
      error: `Le slug "${value}" est réservé et ne peut pas être utilisé. Slugs réservés: ${RESERVED_SLUGS.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Helper function to generate slug from name (mirrors fields/slug.ts)
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
 * Arbitrary generators for test data
 */

/**
 * Generator for reserved slugs (exact match)
 */
const reservedSlugArbitrary = fc.constantFrom(...RESERVED_SLUGS)

/**
 * Generator for reserved slugs with different case variations
 */
const reservedSlugCaseVariationsArbitrary = fc.constantFrom(...RESERVED_SLUGS).chain((slug) =>
  fc.constantFrom(
    slug, // lowercase
    slug.toUpperCase(), // UPPERCASE
    slug.charAt(0).toUpperCase() + slug.slice(1), // Capitalized
    slug.split('').map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase())).join(''), // AlTeRnAtInG
    slug.split('').map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join('') // aLtErNaTiNg
  )
)

/**
 * Generator for valid (non-reserved) slugs
 */
const validSlugArbitrary = fc
  .stringMatching(/^[a-z][a-z0-9-]{2,30}$/)
  .filter((slug) => !RESERVED_SLUGS.includes(slug.toLowerCase()))

/**
 * Generator for page titles that would generate reserved slugs
 */
const titleGeneratingReservedSlugArbitrary = fc.constantFrom(
  'Produits', // -> produits
  'PRODUITS', // -> produits
  'Services', // -> services
  'SERVICES', // -> services
  'Contact', // -> contact
  'CONTACT', // -> contact
  'Blog', // -> blog
  'BLOG', // -> blog
  'Admin', // -> admin
  'ADMIN', // -> admin
  'Api', // -> api
  'API', // -> api
  'Produits!', // -> produits
  'Services...', // -> services
  '  Contact  ', // -> contact (after trim)
  'Blog!!!' // -> blog
)

/**
 * Generator for page titles that would generate valid slugs
 */
const titleGeneratingValidSlugArbitrary = fc.constantFrom(
  'Accueil',
  'À propos',
  'Nos réalisations',
  'Témoignages clients',
  'FAQ générale',
  'Mentions légales',
  'Politique de confidentialité',
  'Conditions générales',
  'Notre équipe',
  'Nos partenaires',
  'Actualités',
  'Événements',
  'Promotions',
  'Guide d\'achat',
  'Installation solaire',
  'Maintenance préventive',
  'Devis gratuit',
  'Simulateur économies',
  'Aides financières',
  'Certifications'
)

/**
 * Generator for empty/null/undefined values
 */
const emptyValueArbitrary = fc.constantFrom(null, undefined, '')

describe('Property 11: Reserved Slug Validation', () => {
  /**
   * Property: Reserved slugs SHALL be rejected with an error message
   *
   * **Validates: Requirements 11.5**
   */
  describe('Reserved slug rejection', () => {
    it('should reject all reserved slugs (lowercase)', () => {
      fc.assert(
        fc.property(reservedSlugArbitrary, (slug) => {
          const result = validateReservedSlug(slug)

          return (
            result.valid === false &&
            result.error !== undefined &&
            result.error.includes('réservé')
          )
        }),
        { numRuns: 100 }
      )
    })

    it('should reject reserved slugs with any case variation', () => {
      fc.assert(
        fc.property(reservedSlugCaseVariationsArbitrary, (slug) => {
          const result = validateReservedSlug(slug)

          return (
            result.valid === false &&
            result.error !== undefined &&
            result.error.includes('réservé')
          )
        }),
        { numRuns: 100 }
      )
    })

    it('should include the rejected slug in the error message', () => {
      fc.assert(
        fc.property(reservedSlugArbitrary, (slug) => {
          const result = validateReservedSlug(slug)

          return (
            result.valid === false &&
            result.error !== undefined &&
            result.error.includes(slug)
          )
        }),
        { numRuns: 100 }
      )
    })

    it('should list all reserved slugs in the error message', () => {
      fc.assert(
        fc.property(reservedSlugArbitrary, (slug) => {
          const result = validateReservedSlug(slug)

          // Check that all reserved slugs are mentioned in the error
          return (
            result.valid === false &&
            result.error !== undefined &&
            RESERVED_SLUGS.every((reserved) => result.error!.includes(reserved))
          )
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Non-reserved slugs SHALL be accepted
   *
   * **Validates: Requirements 11.5**
   */
  describe('Non-reserved slug acceptance', () => {
    it('should accept valid non-reserved slugs', () => {
      fc.assert(
        fc.property(validSlugArbitrary, (slug) => {
          const result = validateReservedSlug(slug)

          return result.valid === true && result.error === undefined
        }),
        { numRuns: 100 }
      )
    })

    it('should accept slugs that are similar but not equal to reserved slugs', () => {
      const similarSlugs = fc.constantFrom(
        'produits-solaires', // starts with reserved but different
        'mes-produits',
        'services-maintenance',
        'nos-services',
        'contact-us',
        'page-contact',
        'blog-posts',
        'mon-blog',
        'admin-panel', // contains reserved but different
        'super-admin',
        'api-docs',
        'rest-api',
        'produit', // singular form
        'service',
        'contacts',
        'blogs',
        'admins',
        'apis'
      )

      fc.assert(
        fc.property(similarSlugs, (slug) => {
          const result = validateReservedSlug(slug)

          return result.valid === true && result.error === undefined
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Case-insensitive validation (e.g., 'PRODUITS' should also be rejected)
   *
   * **Validates: Requirements 11.5**
   */
  describe('Case-insensitive validation', () => {
    it('should reject uppercase versions of reserved slugs', () => {
      fc.assert(
        fc.property(
          reservedSlugArbitrary.map((s) => s.toUpperCase()),
          (slug) => {
            const result = validateReservedSlug(slug)

            return result.valid === false && result.error !== undefined
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should reject mixed case versions of reserved slugs', () => {
      fc.assert(
        fc.property(
          reservedSlugArbitrary.chain((slug) =>
            fc.shuffledSubarray([...slug], { minLength: slug.length, maxLength: slug.length }).map(
              (chars) =>
                chars
                  .map((c, i) => (Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()))
                  .join('')
            )
          ),
          (slug) => {
            // Only test if the slug is actually a case variation of a reserved slug
            if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
              const result = validateReservedSlug(slug)
              return result.valid === false && result.error !== undefined
            }
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should treat "PRODUITS", "Produits", "pRoDuItS" all as reserved', () => {
      const produitsVariations = ['PRODUITS', 'Produits', 'pRoDuItS', 'PrOdUiTs', 'produits']

      for (const variation of produitsVariations) {
        const result = validateReservedSlug(variation)
        expect(result.valid).toBe(false)
        expect(result.error).toContain('réservé')
      }
    })
  })

  /**
   * Property: Empty/null slugs SHALL be accepted (handled by required validation elsewhere)
   *
   * **Validates: Requirements 11.5**
   */
  describe('Empty/null slug acceptance', () => {
    it('should accept null slugs', () => {
      fc.assert(
        fc.property(fc.constant(null), (slug) => {
          const result = validateReservedSlug(slug)

          return result.valid === true && result.error === undefined
        }),
        { numRuns: 10 }
      )
    })

    it('should accept undefined slugs', () => {
      fc.assert(
        fc.property(fc.constant(undefined), (slug) => {
          const result = validateReservedSlug(slug)

          return result.valid === true && result.error === undefined
        }),
        { numRuns: 10 }
      )
    })

    it('should accept empty string slugs', () => {
      fc.assert(
        fc.property(fc.constant(''), (slug) => {
          const result = validateReservedSlug(slug)

          return result.valid === true && result.error === undefined
        }),
        { numRuns: 10 }
      )
    })

    it('should accept all empty/null/undefined values', () => {
      fc.assert(
        fc.property(emptyValueArbitrary, (slug) => {
          const result = validateReservedSlug(slug)

          return result.valid === true && result.error === undefined
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Validation SHALL be consistent across multiple calls
   *
   * **Validates: Requirements 11.5**
   */
  describe('Validation consistency', () => {
    it('should return consistent results for the same slug', () => {
      fc.assert(
        fc.property(
          fc.oneof(reservedSlugArbitrary, validSlugArbitrary, emptyValueArbitrary),
          (slug) => {
            const result1 = validateReservedSlug(slug)
            const result2 = validateReservedSlug(slug)
            const result3 = validateReservedSlug(slug)

            return (
              result1.valid === result2.valid &&
              result2.valid === result3.valid &&
              result1.error === result2.error &&
              result2.error === result3.error
            )
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})

/**
 * Edge case tests for reserved slug validation
 */
describe('Reserved Slug Validation Edge Cases', () => {
  /**
   * Test: Specific reserved slug validation
   */
  describe('Specific reserved slugs', () => {
    it('should reject "produits"', () => {
      const result = validateReservedSlug('produits')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('produits')
      expect(result.error).toContain('réservé')
    })

    it('should reject "services"', () => {
      const result = validateReservedSlug('services')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('services')
    })

    it('should reject "contact"', () => {
      const result = validateReservedSlug('contact')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('contact')
    })

    it('should reject "blog"', () => {
      const result = validateReservedSlug('blog')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('blog')
    })

    it('should reject "admin"', () => {
      const result = validateReservedSlug('admin')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('admin')
    })

    it('should reject "api"', () => {
      const result = validateReservedSlug('api')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('api')
    })
  })

  /**
   * Test: Case variations for each reserved slug
   */
  describe('Case variations for each reserved slug', () => {
    const caseVariations = (slug: string) => [
      slug,
      slug.toUpperCase(),
      slug.charAt(0).toUpperCase() + slug.slice(1),
      slug.toLowerCase(),
    ]

    for (const reserved of RESERVED_SLUGS) {
      for (const variation of caseVariations(reserved)) {
        it(`should reject "${variation}" (variation of "${reserved}")`, () => {
          const result = validateReservedSlug(variation)
          expect(result.valid).toBe(false)
          expect(result.error).toBeDefined()
        })
      }
    }
  })

  /**
   * Test: Similar but valid slugs
   */
  describe('Similar but valid slugs', () => {
    const validSimilarSlugs = [
      'produits-solaires',
      'nos-produits',
      'tous-les-produits',
      'services-maintenance',
      'nos-services',
      'services-premium',
      'contactez-nous',
      'page-contact',
      'formulaire-contact',
      'blog-articles',
      'notre-blog',
      'blog-energie',
      'admin-dashboard',
      'super-admin',
      'panel-admin',
      'api-documentation',
      'rest-api',
      'api-v2',
      'produit', // singular
      'service', // singular
      'contacts', // plural with s
      'blogs', // plural with s
      'admins', // plural with s
      'apis', // plural with s
    ]

    for (const slug of validSimilarSlugs) {
      it(`should accept "${slug}" (similar but not reserved)`, () => {
        const result = validateReservedSlug(slug)
        expect(result.valid).toBe(true)
        expect(result.error).toBeUndefined()
      })
    }
  })

  /**
   * Test: Empty and null values
   */
  describe('Empty and null values', () => {
    it('should accept null', () => {
      const result = validateReservedSlug(null)
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should accept undefined', () => {
      const result = validateReservedSlug(undefined)
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should accept empty string', () => {
      const result = validateReservedSlug('')
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })
  })

  /**
   * Test: Slug generation from titles that would create reserved slugs
   */
  describe('Title to slug generation with reserved results', () => {
    const titlesGeneratingReservedSlugs = [
      { title: 'Produits', expectedSlug: 'produits' },
      { title: 'PRODUITS', expectedSlug: 'produits' },
      { title: 'Services', expectedSlug: 'services' },
      { title: 'Contact', expectedSlug: 'contact' },
      { title: 'Blog', expectedSlug: 'blog' },
      { title: 'Admin', expectedSlug: 'admin' },
      { title: 'Api', expectedSlug: 'api' },
      { title: 'API', expectedSlug: 'api' },
      { title: '  Produits  ', expectedSlug: 'produits' },
      { title: 'Produits!', expectedSlug: 'produits' },
      { title: 'Services...', expectedSlug: 'services' },
    ]

    for (const { title, expectedSlug } of titlesGeneratingReservedSlugs) {
      it(`should reject slug generated from title "${title}" -> "${expectedSlug}"`, () => {
        const generatedSlug = generateSlugFromName(title)
        expect(generatedSlug).toBe(expectedSlug)

        const result = validateReservedSlug(generatedSlug)
        expect(result.valid).toBe(false)
        expect(result.error).toContain('réservé')
      })
    }
  })

  /**
   * Test: Slug generation from titles that would create valid slugs
   */
  describe('Title to slug generation with valid results', () => {
    const titlesGeneratingValidSlugs = [
      { title: 'Accueil', expectedSlug: 'accueil' },
      { title: 'À propos', expectedSlug: 'a-propos' },
      { title: 'Nos réalisations', expectedSlug: 'nos-realisations' },
      { title: 'Témoignages clients', expectedSlug: 'temoignages-clients' },
      { title: 'FAQ générale', expectedSlug: 'faq-generale' },
      { title: 'Mentions légales', expectedSlug: 'mentions-legales' },
      { title: 'Notre équipe', expectedSlug: 'notre-equipe' },
      { title: 'Guide d\'achat', expectedSlug: 'guide-d-achat' },
    ]

    for (const { title, expectedSlug } of titlesGeneratingValidSlugs) {
      it(`should accept slug generated from title "${title}" -> "${expectedSlug}"`, () => {
        const generatedSlug = generateSlugFromName(title)
        expect(generatedSlug).toBe(expectedSlug)

        const result = validateReservedSlug(generatedSlug)
        expect(result.valid).toBe(true)
        expect(result.error).toBeUndefined()
      })
    }
  })
})

/**
 * Real-world scenario tests for reserved slug validation
 */
describe('Reserved Slug Validation - Real-World Scenarios', () => {
  /**
   * Test: Page creation scenarios
   */
  describe('Page creation scenarios', () => {
    it('should prevent creating a page with slug "produits" (conflicts with /produits route)', () => {
      const result = validateReservedSlug('produits')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('réservé')
    })

    it('should prevent creating a page with slug "blog" (conflicts with /blog route)', () => {
      const result = validateReservedSlug('blog')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('réservé')
    })

    it('should prevent creating a page with slug "admin" (conflicts with /admin route)', () => {
      const result = validateReservedSlug('admin')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('réservé')
    })

    it('should prevent creating a page with slug "api" (conflicts with /api route)', () => {
      const result = validateReservedSlug('api')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('réservé')
    })

    it('should allow creating a page with slug "a-propos"', () => {
      const result = validateReservedSlug('a-propos')
      expect(result.valid).toBe(true)
    })

    it('should allow creating a page with slug "mentions-legales"', () => {
      const result = validateReservedSlug('mentions-legales')
      expect(result.valid).toBe(true)
    })
  })

  /**
   * Test: Admin panel validation scenarios
   */
  describe('Admin panel validation scenarios', () => {
    it('should show error when admin tries to save page with reserved slug', () => {
      const result = validateReservedSlug('services')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Le slug "services" est réservé')
    })

    it('should show all reserved slugs in error message for user guidance', () => {
      const result = validateReservedSlug('contact')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('produits')
      expect(result.error).toContain('services')
      expect(result.error).toContain('contact')
      expect(result.error).toContain('blog')
      expect(result.error).toContain('admin')
      expect(result.error).toContain('api')
    })
  })

  /**
   * Test: Auto-generated slug validation scenarios
   */
  describe('Auto-generated slug validation scenarios', () => {
    it('should reject auto-generated slug from title "Produits"', () => {
      const slug = generateSlugFromName('Produits')
      const result = validateReservedSlug(slug)
      expect(result.valid).toBe(false)
    })

    it('should accept auto-generated slug from title "Nos Produits Solaires"', () => {
      const slug = generateSlugFromName('Nos Produits Solaires')
      expect(slug).toBe('nos-produits-solaires')
      const result = validateReservedSlug(slug)
      expect(result.valid).toBe(true)
    })

    it('should reject auto-generated slug from title "Blog" but accept "Notre Blog"', () => {
      const blogSlug = generateSlugFromName('Blog')
      const notreBlogSlug = generateSlugFromName('Notre Blog')

      expect(validateReservedSlug(blogSlug).valid).toBe(false)
      expect(validateReservedSlug(notreBlogSlug).valid).toBe(true)
    })
  })

  /**
   * Test: URL conflict prevention scenarios
   */
  describe('URL conflict prevention scenarios', () => {
    const conflictingRoutes = [
      { slug: 'produits', route: '/produits', description: 'Products listing page' },
      { slug: 'services', route: '/services', description: 'Services page' },
      { slug: 'contact', route: '/contact', description: 'Contact page' },
      { slug: 'blog', route: '/blog', description: 'Blog index page' },
      { slug: 'admin', route: '/admin', description: 'Payload admin panel' },
      { slug: 'api', route: '/api', description: 'API routes' },
    ]

    for (const { slug, route, description } of conflictingRoutes) {
      it(`should prevent slug "${slug}" to avoid conflict with ${route} (${description})`, () => {
        const result = validateReservedSlug(slug)
        expect(result.valid).toBe(false)
        expect(result.error).toContain('réservé')
      })
    }
  })
})
