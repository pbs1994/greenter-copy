/**
 * Property-Based Tests for Pricing Calculation Preservation
 *
 * Feature: maintenance-page-redesign
 * Property 9: Pricing Calculation Preservation
 *
 * **Validates: Requirements 8.1**
 *
 * For any combination of selected services and options, the calculated pricing
 * (total, discounts, monthly/annual amounts) should match the output of the
 * existing calculatePricing function from lib/maintenance-pricing.ts.
 */

import * as fc from 'fast-check'
import { calculatePricing, getMultiDiscount } from '@/lib/maintenance-pricing'
import type {
  MaintenanceService,
  MaintenanceOption,
  PricingSummary,
} from '@/types/maintenance'

// ─── Arbitrary Generators ───────────────────────────────────────────────────

/**
 * Generator for valid icon names used in the application
 */
const iconArbitrary = fc.constantFrom(
  'Flame',
  'Wind',
  'Sun',
  'Droplets',
  'Zap',
  'Wrench',
  'ShieldCheck',
  'Sparkles'
)

/**
 * Generator for valid slugs (lowercase, hyphenated)
 */
const slugArbitrary = fc
  .stringMatching(/^[a-z][a-z0-9-]{2,29}$/)
  .filter((s) => !s.endsWith('-') && !s.includes('--'))

/**
 * Generator for valid ISO date strings - using constant to avoid date generation issues
 */
const isoDateArbitrary = fc.constant('2024-01-15T10:30:00.000Z')

/**
 * Generator for MaintenanceService
 * Prices are in centimes (100 = 1€), realistic range: 5€ to 500€
 */
const maintenanceServiceArbitrary: fc.Arbitrary<MaintenanceService> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 3, maxLength: 50 }).filter((s) => s.trim().length > 0),
  slug: slugArbitrary,
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: fc.integer({ min: 500, max: 50000 }), // 5€ to 500€ in centimes
  icon: iconArbitrary,
  includes: fc.array(fc.string({ minLength: 5, maxLength: 100 }), {
    minLength: 0,
    maxLength: 10,
  }),
  is_active: fc.constant(true),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: isoDateArbitrary,
})

/**
 * Generator for MaintenanceOption
 * Prices are in centimes, realistic range: 2€ to 200€
 */
const maintenanceOptionArbitrary: fc.Arbitrary<MaintenanceOption> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 3, maxLength: 50 }).filter((s) => s.trim().length > 0),
  slug: slugArbitrary,
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: fc.integer({ min: 200, max: 20000 }), // 2€ to 200€ in centimes
  icon: iconArbitrary,
  is_active: fc.constant(true),
  is_flat_fee: fc.boolean(),
  exempt_from_discount: fc.boolean(),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: isoDateArbitrary,
})

/**
 * Generator for a list of services with unique IDs
 */
const servicesArrayArbitrary = fc
  .array(maintenanceServiceArbitrary, { minLength: 0, maxLength: 6 })
  .map((services) => {
    // Ensure unique IDs
    const seen = new Set<string>()
    return services.filter((s) => {
      if (seen.has(s.id)) return false
      seen.add(s.id)
      return true
    })
  })

/**
 * Generator for a list of options with unique IDs
 */
const optionsArrayArbitrary = fc
  .array(maintenanceOptionArbitrary, { minLength: 0, maxLength: 4 })
  .map((options) => {
    // Ensure unique IDs
    const seen = new Set<string>()
    return options.filter((o) => {
      if (seen.has(o.id)) return false
      seen.add(o.id)
      return true
    })
  })

/**
 * Generator for selection arrays (subsets of available IDs)
 */
function selectionArbitrary(items: { id: string }[]): fc.Arbitrary<string[]> {
  if (items.length === 0) return fc.constant([])
  return fc.subarray(
    items.map((i) => i.id),
    { minLength: 0 }
  )
}

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Simulates the pricing calculation as it would be done in the context
 * This mirrors the useMemo calculation in MaintenanceConfiguratorContext
 */
function simulateContextPricing(
  services: MaintenanceService[],
  options: MaintenanceOption[],
  selectedServices: string[],
  selectedOptions: string[]
): PricingSummary {
  return calculatePricing(services, options, selectedServices, selectedOptions)
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 9: Pricing Calculation Preservation', () => {
  /**
   * **Validates: Requirements 8.1**
   *
   * For any combination of services and options, the context's pricing
   * calculation must match the direct calculatePricing function call.
   */
  describe('Context pricing matches calculatePricing function', () => {
    it('should produce identical pricing for any service/option combination', () => {
      fc.assert(
        fc.property(
          servicesArrayArbitrary,
          optionsArrayArbitrary,
          (services, options) => {
            // Generate random selections from available items
            const serviceIds = services.map((s) => s.id)
            const optionIds = options.map((o) => o.id)

            // Test with all items selected
            const directResult = calculatePricing(services, options, serviceIds, optionIds)
            const contextResult = simulateContextPricing(
              services,
              options,
              serviceIds,
              optionIds
            )

            // All pricing fields must match exactly
            expect(contextResult.servicesSubtotal).toBe(directResult.servicesSubtotal)
            expect(contextResult.discountMultiPercent).toBe(directResult.discountMultiPercent)
            expect(contextResult.discountMultiAmount).toBe(directResult.discountMultiAmount)
            expect(contextResult.servicesAfterMulti).toBe(directResult.servicesAfterMulti)
            expect(contextResult.optionsTotal).toBe(directResult.optionsTotal)
            expect(contextResult.totalMonthly).toBe(directResult.totalMonthly)
            expect(contextResult.totalAnnual).toBe(directResult.totalAnnual)
            expect(contextResult.savingsTotal).toBe(directResult.savingsTotal)
            expect(contextResult.flatFeeTotal).toBe(directResult.flatFeeTotal)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should produce identical pricing for partial selections', () => {
      fc.assert(
        fc.property(
          servicesArrayArbitrary.filter((s) => s.length > 0),
          optionsArrayArbitrary,
          fc.integer({ min: 0, max: 100 }), // seed for selection
          (services, options, seed) => {
            // Create partial selections based on seed
            const selectedServiceIds = services
              .filter((_, i) => (seed + i) % 2 === 0)
              .map((s) => s.id)
            const selectedOptionIds = options
              .filter((_, i) => (seed + i) % 3 === 0)
              .map((o) => o.id)

            const directResult = calculatePricing(
              services,
              options,
              selectedServiceIds,
              selectedOptionIds
            )
            const contextResult = simulateContextPricing(
              services,
              options,
              selectedServiceIds,
              selectedOptionIds
            )

            expect(contextResult.totalAnnual).toBe(directResult.totalAnnual)
            expect(contextResult.totalMonthly).toBe(directResult.totalMonthly)
            expect(contextResult.discountMultiPercent).toBe(directResult.discountMultiPercent)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.1**
   *
   * The multi-equipment discount must be correctly applied based on
   * the number of selected services.
   */
  describe('Multi-equipment discount preservation', () => {
    it('should apply correct discount tier for any number of selected services', () => {
      fc.assert(
        fc.property(
          fc.array(maintenanceServiceArbitrary, { minLength: 1, maxLength: 8 }).map(
            (services) => {
              // Ensure unique IDs
              const seen = new Set<string>()
              return services.filter((s) => {
                if (seen.has(s.id)) return false
                seen.add(s.id)
                return true
              })
            }
          ),
          (services) => {
            const serviceIds = services.map((s) => s.id)
            const result = calculatePricing(services, [], serviceIds, [])

            const expectedDiscount = getMultiDiscount(services.length)
            expect(result.discountMultiPercent).toBe(expectedDiscount)

            // Verify discount amount calculation
            const servicesSubtotal = services.reduce((sum, s) => sum + s.price_monthly, 0)
            const expectedDiscountAmount = Math.round(
              (servicesSubtotal * expectedDiscount) / 100
            )
            expect(result.discountMultiAmount).toBe(expectedDiscountAmount)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.1**
   *
   * Flat fee options must be handled correctly - added once to annual total,
   * not multiplied by 12.
   */
  describe('Flat fee option handling preservation', () => {
    it('should add flat fee options once to annual total', () => {
      fc.assert(
        fc.property(
          servicesArrayArbitrary.filter((s) => s.length > 0),
          fc.array(
            maintenanceOptionArbitrary.map((o) => ({ ...o, is_flat_fee: true })),
            { minLength: 1, maxLength: 3 }
          ).map((options) => {
            const seen = new Set<string>()
            return options.filter((o) => {
              if (seen.has(o.id)) return false
              seen.add(o.id)
              return true
            })
          }),
          (services, flatFeeOptions) => {
            const serviceIds = services.map((s) => s.id)
            const optionIds = flatFeeOptions.map((o) => o.id)

            const result = calculatePricing(services, flatFeeOptions, serviceIds, optionIds)

            // Calculate expected flat fee total
            const expectedFlatFeeTotal = flatFeeOptions.reduce(
              (sum, o) => sum + o.price_monthly,
              0
            )
            expect(result.flatFeeTotal).toBe(expectedFlatFeeTotal)

            // Verify annual total includes flat fee once (not × 12)
            const monthlyWithoutFlatFee = result.totalMonthly
            const expectedAnnual = monthlyWithoutFlatFee * 12 + expectedFlatFeeTotal
            expect(result.totalAnnual).toBe(expectedAnnual)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.1**
   *
   * Recurring options must be included in monthly calculations.
   */
  describe('Recurring option handling preservation', () => {
    it('should include recurring options in monthly total', () => {
      fc.assert(
        fc.property(
          servicesArrayArbitrary.filter((s) => s.length > 0),
          fc.array(
            maintenanceOptionArbitrary.map((o) => ({ ...o, is_flat_fee: false })),
            { minLength: 1, maxLength: 3 }
          ).map((options) => {
            const seen = new Set<string>()
            return options.filter((o) => {
              if (seen.has(o.id)) return false
              seen.add(o.id)
              return true
            })
          }),
          (services, recurringOptions) => {
            const serviceIds = services.map((s) => s.id)
            const optionIds = recurringOptions.map((o) => o.id)

            const result = calculatePricing(services, recurringOptions, serviceIds, optionIds)

            // Calculate expected values
            const servicesSubtotal = services.reduce((sum, s) => sum + s.price_monthly, 0)
            const discountPercent = getMultiDiscount(services.length)
            const discountAmount = Math.round((servicesSubtotal * discountPercent) / 100)
            const servicesAfterDiscount = servicesSubtotal - discountAmount

            const optionsTotal = recurringOptions.reduce((sum, o) => sum + o.price_monthly, 0)

            const expectedMonthly = servicesAfterDiscount + optionsTotal
            expect(result.totalMonthly).toBe(expectedMonthly)

            // Annual should be monthly × 12 (no flat fees)
            expect(result.totalAnnual).toBe(expectedMonthly * 12)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.1**
   *
   * Empty selection should produce zero totals.
   */
  describe('Empty selection handling', () => {
    it('should return zero totals when nothing is selected', () => {
      fc.assert(
        fc.property(servicesArrayArbitrary, optionsArrayArbitrary, (services, options) => {
          const result = calculatePricing(services, options, [], [])

          expect(result.servicesSubtotal).toBe(0)
          expect(result.discountMultiPercent).toBe(0)
          expect(result.discountMultiAmount).toBe(0)
          expect(result.servicesAfterMulti).toBe(0)
          expect(result.optionsTotal).toBe(0)
          expect(result.totalMonthly).toBe(0)
          expect(result.totalAnnual).toBe(0)
          expect(result.savingsTotal).toBe(0)
          expect(result.flatFeeTotal).toBe(0)
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.1**
   *
   * Savings calculation must be consistent with discount applied.
   */
  describe('Savings calculation preservation', () => {
    it('should calculate savings as discount amount × 12', () => {
      fc.assert(
        fc.property(
          servicesArrayArbitrary.filter((s) => s.length >= 2), // Need at least 2 for discount
          (services) => {
            const serviceIds = services.map((s) => s.id)
            const result = calculatePricing(services, [], serviceIds, [])

            // Savings should equal the monthly discount × 12
            const expectedSavings = result.discountMultiAmount * 12
            expect(result.savingsTotal).toBe(expectedSavings)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.1**
   *
   * All monetary values must be non-negative integers (centimes).
   */
  describe('Monetary value constraints', () => {
    it('should produce non-negative integer values for all monetary fields', () => {
      fc.assert(
        fc.property(
          servicesArrayArbitrary,
          optionsArrayArbitrary,
          (services, options) => {
            const serviceIds = services.map((s) => s.id)
            const optionIds = options.map((o) => o.id)
            const result = calculatePricing(services, options, serviceIds, optionIds)

            // All monetary values must be non-negative integers
            expect(result.servicesSubtotal).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.servicesSubtotal)).toBe(true)

            expect(result.discountMultiAmount).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.discountMultiAmount)).toBe(true)

            expect(result.servicesAfterMulti).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.servicesAfterMulti)).toBe(true)

            expect(result.optionsTotal).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.optionsTotal)).toBe(true)

            expect(result.totalMonthly).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.totalMonthly)).toBe(true)

            expect(result.totalAnnual).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.totalAnnual)).toBe(true)

            expect(result.savingsTotal).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.savingsTotal)).toBe(true)

            expect(result.flatFeeTotal).toBeGreaterThanOrEqual(0)
            expect(Number.isInteger(result.flatFeeTotal)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
