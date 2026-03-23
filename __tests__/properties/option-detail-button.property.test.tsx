/**
 * Property-Based Tests for Option Detail Button Conditional Display
 *
 * Feature: maintenance-page-redesign
 * Property 6: Option Detail Button Conditional Display
 *
 * **Validates: Requirements 4.4**
 *
 * For any MaintenanceOption, the "En savoir plus" button should be rendered
 * if and only if the option has enriched details defined in the `optionDetails`
 * mapping (keyed by slug).
 *
 * The test validates:
 * 1. When onShowDetails prop is provided, the "En savoir plus" button is displayed
 * 2. When onShowDetails prop is NOT provided (undefined), the "En savoir plus" button is NOT displayed
 * 3. Clicking the button calls the onShowDetails callback
 * 4. Clicking the button does NOT trigger onToggle (event propagation is stopped)
 */

import * as fc from 'fast-check'
import { render, cleanup, fireEvent } from '@testing-library/react'
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
 * Generator for billing period values
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom(
  'monthly',
  'yearly'
)

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 6: Option Detail Button Conditional Display', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 4.4**
   *
   * For any MaintenanceOption, when onShowDetails prop is provided,
   * the "En savoir plus" button should be displayed.
   */
  describe('"En savoir plus" button displayed when onShowDetails is provided', () => {
    it('should display "En savoir plus" button when onShowDetails prop is provided', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            const { getByRole } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            // The "En savoir plus" button should be present
            const detailButton = getByRole('button', {
              name: `En savoir plus sur ${option.name}`,
            })
            expect(detailButton).toBeInTheDocument()
            expect(detailButton.textContent).toContain('En savoir plus')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.4**
   *
   * For any MaintenanceOption, when onShowDetails prop is NOT provided (undefined),
   * the "En savoir plus" button should NOT be displayed.
   */
  describe('"En savoir plus" button NOT displayed when onShowDetails is undefined', () => {
    it('should NOT display "En savoir plus" button when onShowDetails prop is undefined', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()

            const { queryByRole, container } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                // onShowDetails is intentionally NOT provided
              />
            )

            // The "En savoir plus" button should NOT be present
            const detailButton = queryByRole('button', {
              name: `En savoir plus sur ${option.name}`,
            })
            expect(detailButton).not.toBeInTheDocument()

            // Also verify no button with "En savoir plus" text exists
            const allButtons = container.querySelectorAll('button')
            allButtons.forEach((button) => {
              expect(button.textContent).not.toContain('En savoir plus')
            })
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.4**
   *
   * For any MaintenanceOption, clicking the "En savoir plus" button
   * should call the onShowDetails callback.
   */
  describe('Clicking "En savoir plus" button calls onShowDetails callback', () => {
    it('should call onShowDetails when "En savoir plus" button is clicked', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            const { getByRole } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            const detailButton = getByRole('button', {
              name: `En savoir plus sur ${option.name}`,
            })

            // Click the button
            fireEvent.click(detailButton)

            // onShowDetails should have been called exactly once
            expect(onShowDetails).toHaveBeenCalledTimes(1)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.4**
   *
   * For any MaintenanceOption, clicking the "En savoir plus" button
   * should NOT trigger onToggle (event propagation is stopped).
   */
  describe('Clicking "En savoir plus" button does NOT trigger onToggle', () => {
    it('should NOT call onToggle when "En savoir plus" button is clicked', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            const { getByRole } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            const detailButton = getByRole('button', {
              name: `En savoir plus sur ${option.name}`,
            })

            // Click the button
            fireEvent.click(detailButton)

            // onToggle should NOT have been called (event propagation stopped)
            expect(onToggle).not.toHaveBeenCalled()

            // But onShowDetails should have been called
            expect(onShowDetails).toHaveBeenCalledTimes(1)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.4**
   *
   * For any MaintenanceOption, the conditional display of the button
   * should be consistent regardless of other option properties
   * (is_flat_fee, isSelected, billingPeriod, etc.).
   */
  describe('Button display consistency across option variations', () => {
    it('should consistently show/hide button based solely on onShowDetails presence', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          fc.boolean(),
          (option, billingPeriod, isSelected, hasOnShowDetails) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = hasOnShowDetails ? jest.fn() : undefined

            const { queryByRole } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            const detailButton = queryByRole('button', {
              name: `En savoir plus sur ${option.name}`,
            })

            if (hasOnShowDetails) {
              // Button should be present when onShowDetails is provided
              expect(detailButton).toBeInTheDocument()
            } else {
              // Button should NOT be present when onShowDetails is undefined
              expect(detailButton).not.toBeInTheDocument()
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 4.4**
   *
   * For any MaintenanceOption, the "En savoir plus" button should have
   * proper accessibility attributes when displayed.
   */
  describe('"En savoir plus" button accessibility', () => {
    it('should have proper aria-label for accessibility', () => {
      fc.assert(
        fc.property(
          maintenanceOptionArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (option, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            const { getByRole } = render(
              <OptionCard
                option={option}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            const detailButton = getByRole('button', {
              name: `En savoir plus sur ${option.name}`,
            })

            // Button should have proper aria-label
            expect(detailButton).toHaveAttribute(
              'aria-label',
              `En savoir plus sur ${option.name}`
            )

            // Button should be of type "button"
            expect(detailButton).toHaveAttribute('type', 'button')
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
