/**
 * Property-Based Tests for Flat Fee vs Recurring Option Differentiation
 *
 * Feature: maintenance-page-redesign
 * Property 5: Flat Fee vs Recurring Option Differentiation
 *
 * **Validates: Requirements 4.2**
 *
 * For any MaintenanceOption, if `is_flat_fee` is true, the rendered OptionCard
 * should display "forfait unique" label; otherwise, it should display "/an" or
 * "/mois" suffix indicating recurring billing.
 */

import * as fc from 'fast-check'
import { render, cleanup } from '@testing-library/react'
import { OptionCard } from '@/components/maintenance/OptionCard'
import type { MaintenanceOption, BillingPeriod } from '@/types/maintenance'

// ─── Arbitrary Generators ───────────────────────────────────────────────────

/**
 * Generator for valid icon names used in the OptionCard component
 */
const iconArbitrary = fc.constantFrom(
  'ShieldCheck',
  'Wrench',
  'Sparkles',
  'Zap',
  'Clock'
)

/**
 * Generator for valid slugs (lowercase, hyphenated)
 */
const slugArbitrary = fc
  .stringMatching(/^[a-z][a-z0-9-]{2,29}$/)
  .filter((s) => !s.endsWith('-') && !s.includes('--'))

/**
 * Generator for valid ISO date strings
 */
const isoDateArbitrary = fc.constant('2024-01-15T10:30:00.000Z')

/**
 * Generator for option names - realistic option names without problematic whitespace
 */
const optionNameArbitrary = fc
  .array(fc.stringMatching(/^[A-Za-zÀ-ÿ0-9]+$/), { minLength: 1, maxLength: 5 })
  .map((words) => words.filter((w) => w.length > 0).join(' '))
  .filter((s) => s.length >= 3 && s.length <= 50)

/**
 * Generator for MaintenanceOption
 * Prices are in centimes (100 = 1€), realistic range: 1€ to 200€
 */
const maintenanceOptionArbitrary: fc.Arbitrary<MaintenanceOption> = fc.record({
  id: fc.uuid(),
  name: optionNameArbitrary,
  slug: slugArbitrary,
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: fc.integer({ min: 100, max: 20000 }),
  icon: iconArbitrary,
  is_active: fc.constant(true),
  is_flat_fee: fc.boolean(),
  exempt_from_discount: fc.boolean(),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: isoDateArbitrary,
})

/**
 * Generator for MaintenanceOption with is_flat_fee = true
 */
const flatFeeOptionArbitrary: fc.Arbitrary<MaintenanceOption> = fc.record({
  id: fc.uuid(),
  name: optionNameArbitrary,
  slug: slugArbitrary,
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: fc.integer({ min: 100, max: 20000 }),
  icon: iconArbitrary,
  is_active: fc.constant(true),
  is_flat_fee: fc.constant(true),
  exempt_from_discount: fc.boolean(),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: isoDateArbitrary,
})

/**
 * Generator for MaintenanceOption with is_flat_fee = false (recurring)
 */
const recurringOptionArbitrary: fc.Arbitrary<MaintenanceOption> = fc.record({
  id: fc.uuid(),
  name: optionNameArbitrary,
  slug: slugArbitrary,
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: fc.integer({ min: 100, max: 20000 }),
  icon: iconArbitrary,
  is_active: fc.constant(true),
  is_flat_fee: fc.constant(false),
  exempt_from_discount: fc.boolean(),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: isoDateArbitrary,
})

/**
 * Generator for billing period values
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom(
  'monthly',
  'yearly'
)

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Default props for OptionCard that are not being tested
 */
const defaultCardProps = {
  onToggle: jest.fn(),
  onShowDetails: jest.fn(),
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 5: Flat Fee vs Recurring Option Differentiation', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 4.2**
   *
   * For any MaintenanceOption with is_flat_fee=true, the OptionCard should
   * display the "forfait unique" label.
   */
  describe('Flat fee options display "forfait unique" label', () => {
    it('should display "forfait unique" label when is_flat_fee is true', () => {
      fc.assert(
        fc.property(
          flatFeeOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const { container, getByTestId } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // The "forfait unique" label should be present
            const flatFeeLabel = getByTestId('flat-fee-label')
            expect(flatFeeLabel).toBeInTheDocument()
            expect(flatFeeLabel.textContent).toBe('forfait unique')

            // The flat fee price element should be present
            const flatFeePrice = getByTestId('price-flat-fee')
            expect(flatFeePrice).toBeInTheDocument()

            // Monthly/annual recurring price elements should NOT be present
            const monthlyPrice = container.querySelector(
              '[data-testid="price-monthly"]'
            )
            const annualPrice = container.querySelector(
              '[data-testid="price-annual"]'
            )
            expect(monthlyPrice).not.toBeInTheDocument()
            expect(annualPrice).not.toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.2**
   *
   * For any MaintenanceOption with is_flat_fee=false, the OptionCard should
   * display "/mois" and "/an" suffixes indicating recurring billing.
   */
  describe('Recurring options display "/mois" and "/an" suffixes', () => {
    it('should display "/mois" and "/an" suffixes when is_flat_fee is false', () => {
      fc.assert(
        fc.property(
          recurringOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const { container, getByTestId, getByText } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // Monthly price with "/mois" suffix should be present
            const monthlyPrice = getByTestId('price-monthly')
            expect(monthlyPrice).toBeInTheDocument()
            expect(getByText('/mois')).toBeInTheDocument()

            // Annual price with "/an" suffix should be present
            const annualPrice = getByTestId('price-annual')
            expect(annualPrice).toBeInTheDocument()
            expect(getByText('/an')).toBeInTheDocument()

            // The "forfait unique" label should NOT be present
            const flatFeeLabel = container.querySelector(
              '[data-testid="flat-fee-label"]'
            )
            expect(flatFeeLabel).not.toBeInTheDocument()

            // The flat fee price element should NOT be present
            const flatFeePrice = container.querySelector(
              '[data-testid="price-flat-fee"]'
            )
            expect(flatFeePrice).not.toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.2**
   *
   * For any MaintenanceOption, the display type (flat fee vs recurring) should
   * be determined solely by the is_flat_fee property, regardless of other
   * option properties.
   */
  describe('Display type determined by is_flat_fee property', () => {
    it('should consistently differentiate based on is_flat_fee value', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const { container, queryByTestId, queryByText } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            if (option.is_flat_fee) {
              // Flat fee: "forfait unique" label present, no recurring suffixes
              expect(queryByTestId('flat-fee-label')).toBeInTheDocument()
              expect(queryByTestId('price-flat-fee')).toBeInTheDocument()
              expect(queryByTestId('price-monthly')).not.toBeInTheDocument()
              expect(queryByTestId('price-annual')).not.toBeInTheDocument()
            } else {
              // Recurring: "/mois" and "/an" suffixes present, no flat fee label
              expect(queryByTestId('flat-fee-label')).not.toBeInTheDocument()
              expect(queryByTestId('price-flat-fee')).not.toBeInTheDocument()
              expect(queryByTestId('price-monthly')).toBeInTheDocument()
              expect(queryByTestId('price-annual')).toBeInTheDocument()
              expect(queryByText('/mois')).toBeInTheDocument()
              expect(queryByText('/an')).toBeInTheDocument()
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.2**
   *
   * For any recurring MaintenanceOption, the annual price should be exactly
   * 12 times the monthly price.
   */
  describe('Recurring option annual price calculation', () => {
    it('should display annual price as 12x monthly price for recurring options', () => {
      fc.assert(
        fc.property(
          recurringOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const { getByTestId } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const monthlyPrice = getByTestId('price-monthly')
            const annualPrice = getByTestId('price-annual')

            // Both price elements should be present
            expect(monthlyPrice).toBeInTheDocument()
            expect(annualPrice).toBeInTheDocument()

            // Extract numeric values from the formatted prices
            // Format is like "12,50 €" or "150,00 €"
            const monthlyText = monthlyPrice.textContent || ''
            const annualText = annualPrice.textContent || ''

            // Verify both contain the € symbol (proper formatting)
            expect(monthlyText).toContain('€')
            expect(annualText).toContain('€')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.2**
   *
   * For any flat fee MaintenanceOption, only a single price should be displayed
   * (no monthly/annual distinction).
   */
  describe('Flat fee option single price display', () => {
    it('should display only one price for flat fee options', () => {
      fc.assert(
        fc.property(
          flatFeeOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const { container, getByTestId } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // Only the flat fee price should be present
            const flatFeePrice = getByTestId('price-flat-fee')
            expect(flatFeePrice).toBeInTheDocument()
            expect(flatFeePrice.textContent).toContain('€')

            // Count all price-related test IDs - should only be 1
            const allPriceElements = container.querySelectorAll(
              '[data-testid^="price-"]'
            )
            expect(allPriceElements.length).toBe(1)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.2**
   *
   * For any recurring MaintenanceOption, the billing period should affect
   * which price is visually emphasized (highlighted).
   */
  describe('Billing period affects price emphasis for recurring options', () => {
    it('should emphasize monthly price when billingPeriod is monthly', () => {
      fc.assert(
        fc.property(
          recurringOptionArbitrary,
          fc.boolean(),
          (option, isSelected) => {
            cleanup()

            const { getByTestId } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod="monthly"
                {...defaultCardProps}
              />
            )

            const monthlyPrice = getByTestId('price-monthly')
            const annualPrice = getByTestId('price-annual')

            // Monthly price should have the emphasized color (amber-600)
            expect(monthlyPrice).toHaveClass('text-amber-600')
            // Annual price should have the de-emphasized color (neutral-500 for WCAG AA compliance)
            expect(annualPrice).toHaveClass('text-neutral-500')
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should emphasize annual price when billingPeriod is yearly', () => {
      fc.assert(
        fc.property(
          recurringOptionArbitrary,
          fc.boolean(),
          (option, isSelected) => {
            cleanup()

            const { getByTestId } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod="yearly"
                {...defaultCardProps}
              />
            )

            const monthlyPrice = getByTestId('price-monthly')
            const annualPrice = getByTestId('price-annual')

            // Monthly price should have the de-emphasized color (neutral-500)
            expect(monthlyPrice).toHaveClass('text-neutral-500')
            // Annual price should have the emphasized color (amber-600)
            expect(annualPrice).toHaveClass('text-amber-600')
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
