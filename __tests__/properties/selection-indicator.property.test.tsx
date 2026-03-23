/**
 * Property-Based Tests for Selection Visual Indicator
 *
 * Feature: maintenance-page-redesign
 * Property 2: Selection Visual Indicator
 *
 * **Validates: Requirements 2.4, 4.3**
 *
 * For any selectable item (MaintenanceService or MaintenanceOption), when the item
 * is in the selected state, the rendered component should display a visual selection
 * indicator (check icon present and/or selected CSS class applied).
 */

import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import { ServiceCard } from '@/components/maintenance/ServiceCard'
import type { MaintenanceService, BillingPeriod } from '@/types/maintenance'

// ─── Arbitrary Generators ───────────────────────────────────────────────────

/**
 * Generator for valid icon names used in the ServiceCard component
 */
const iconArbitrary = fc.constantFrom(
  'Flame',
  'Wind',
  'Sun',
  'Droplets',
  'SunMedium',
  'SunDim',
  'Zap',
  'Wrench',
  'ShieldCheck'
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
 * Generator for service names - realistic service names without problematic whitespace
 */
const serviceNameArbitrary = fc
  .array(fc.stringMatching(/^[A-Za-zÀ-ÿ0-9]+$/), { minLength: 1, maxLength: 5 })
  .map((words) => words.filter((w) => w.length > 0).join(' '))
  .filter((s) => s.length >= 3 && s.length <= 50)

/**
 * Generator for MaintenanceService
 * Prices are in centimes (100 = 1€), realistic range: 5€ to 500€
 */
const maintenanceServiceArbitrary: fc.Arbitrary<MaintenanceService> = fc.record({
  id: fc.uuid(),
  name: serviceNameArbitrary,
  slug: slugArbitrary,
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: fc.integer({ min: 500, max: 50000 }),
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
 * Generator for billing period values
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom(
  'monthly',
  'yearly'
)

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Default props for ServiceCard that are not being tested
 */
const defaultCardProps = {
  onToggle: jest.fn(),
  onShowDetails: jest.fn(),
}

/**
 * Gets the main card element (the one with aria-pressed attribute)
 * This distinguishes it from the "Voir le détail" button inside
 */
function getCardElement(container: HTMLElement): HTMLElement {
  const card = container.querySelector('[aria-pressed]')
  if (!card) {
    throw new Error('Card element with aria-pressed not found')
  }
  return card as HTMLElement
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 2: Selection Visual Indicator', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 2.4**
   *
   * For any MaintenanceService in selected state, the ServiceCard should display
   * a check icon as visual indicator.
   */
  describe('Check icon presence when selected', () => {
    it('should display a check icon when service is selected', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={true}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // When selected, a check icon should be present
            // The check icon is rendered inside a div with specific classes
            const checkIconContainer = container.querySelector(
              '.bg-green-500.rounded-full'
            )
            expect(checkIconContainer).toBeInTheDocument()

            // The SVG check icon should be inside
            const checkIcon = checkIconContainer?.querySelector('svg')
            expect(checkIcon).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.4**
   *
   * For any MaintenanceService in unselected state, the ServiceCard should NOT
   * display a check icon.
   */
  describe('No check icon when not selected', () => {
    it('should NOT display a check icon when service is not selected', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={false}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // When not selected, the check icon container should not be present
            const checkIconContainer = container.querySelector(
              '.bg-green-500.rounded-full'
            )
            expect(checkIconContainer).not.toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.4**
   *
   * For any MaintenanceService in selected state, the aria-pressed attribute
   * should be "true".
   */
  describe('Aria-pressed attribute when selected', () => {
    it('should have aria-pressed="true" when service is selected', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={true}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // The card should have aria-pressed="true"
            const card = getCardElement(container)
            expect(card).toHaveAttribute('aria-pressed', 'true')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.4**
   *
   * For any MaintenanceService in unselected state, the aria-pressed attribute
   * should be "false".
   */
  describe('Aria-pressed attribute when not selected', () => {
    it('should have aria-pressed="false" when service is not selected', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={false}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // The card should have aria-pressed="false"
            const card = getCardElement(container)
            expect(card).toHaveAttribute('aria-pressed', 'false')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.4**
   *
   * For any MaintenanceService in selected state, the card should have
   * selected CSS classes applied (border-green-500).
   */
  describe('Selected CSS classes when selected', () => {
    it('should apply border-green-500 class when service is selected', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={true}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const card = getCardElement(container)
            expect(card).toHaveClass('border-green-500')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.4**
   *
   * For any MaintenanceService in unselected state, the card should NOT have
   * selected CSS classes applied.
   */
  describe('No selected CSS classes when not selected', () => {
    it('should NOT apply border-green-500 class when service is not selected', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={false}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const card = getCardElement(container)
            expect(card).not.toHaveClass('border-green-500')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.4, 4.3**
   *
   * For any MaintenanceService, toggling between selected and unselected states
   * should consistently show/hide the visual indicators.
   */
  describe('Selection state consistency', () => {
    it('should consistently show/hide visual indicators based on selection state', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (service, billingPeriod, isSelected) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const card = getCardElement(container)
            const checkIconContainer = container.querySelector(
              '.bg-green-500.rounded-full'
            )

            if (isSelected) {
              // When selected: check icon present, aria-pressed true, green border
              expect(checkIconContainer).toBeInTheDocument()
              expect(card).toHaveAttribute('aria-pressed', 'true')
              expect(card).toHaveClass('border-green-500')
            } else {
              // When not selected: no check icon, aria-pressed false, no green border
              expect(checkIconContainer).not.toBeInTheDocument()
              expect(card).toHaveAttribute('aria-pressed', 'false')
              expect(card).not.toHaveClass('border-green-500')
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
