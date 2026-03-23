/**
 * Property-Based Tests for Service Detail Modal Trigger
 *
 * Feature: maintenance-page-redesign
 * Property 3: Service Detail Modal Trigger
 *
 * **Validates: Requirements 2.6**
 *
 * For any MaintenanceService that has a non-empty `includes` array with more than
 * 2 items, clicking the "Voir le détail" button should set the `detailService`
 * state to that service, triggering the modal display.
 */

import * as fc from 'fast-check'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
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
 * Generator for include items (service features)
 */
const includeItemArbitrary = fc.string({ minLength: 5, maxLength: 100 })

/**
 * Generator for MaintenanceService with configurable includes array length
 * Prices are in centimes (100 = 1€), realistic range: 5€ to 500€
 */
const maintenanceServiceArbitrary = (
  includesConfig: { minLength: number; maxLength: number }
): fc.Arbitrary<MaintenanceService> =>
  fc.record({
    id: fc.uuid(),
    name: serviceNameArbitrary,
    slug: slugArbitrary,
    description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
    price_monthly: fc.integer({ min: 500, max: 50000 }),
    icon: iconArbitrary,
    includes: fc.array(includeItemArbitrary, includesConfig),
    is_active: fc.constant(true),
    sort_order: fc.integer({ min: 0, max: 100 }),
    created_at: isoDateArbitrary,
  })

/**
 * Generator for MaintenanceService with MORE than 2 includes (button should be visible)
 */
const serviceWithDetailedIncludesArbitrary = maintenanceServiceArbitrary({
  minLength: 3,
  maxLength: 10,
})

/**
 * Generator for MaintenanceService with 2 or fewer includes (button should NOT be visible)
 */
const serviceWithFewIncludesArbitrary = maintenanceServiceArbitrary({
  minLength: 0,
  maxLength: 2,
})

/**
 * Generator for billing period values
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom(
  'monthly',
  'yearly'
)

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 3: Service Detail Modal Trigger', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 2.6**
   *
   * For any MaintenanceService with includes.length > 2, the "Voir le détail"
   * button should be displayed.
   */
  describe('Detail button visibility when includes > 2', () => {
    it('should display "Voir le détail" button when service has more than 2 includes', () => {
      fc.assert(
        fc.property(
          serviceWithDetailedIncludesArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (service, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            // The "Voir le détail" button should be present
            const detailButton = screen.getByRole('button', {
              name: `Voir le détail de ${service.name}`,
            })
            expect(detailButton).toBeInTheDocument()
            expect(detailButton).toHaveTextContent('Voir le détail')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.6**
   *
   * For any MaintenanceService with includes.length <= 2, the "Voir le détail"
   * button should NOT be displayed.
   */
  describe('Detail button hidden when includes <= 2', () => {
    it('should NOT display "Voir le détail" button when service has 2 or fewer includes', () => {
      fc.assert(
        fc.property(
          serviceWithFewIncludesArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (service, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            // The "Voir le détail" button should NOT be present
            const detailButton = screen.queryByRole('button', {
              name: `Voir le détail de ${service.name}`,
            })
            expect(detailButton).not.toBeInTheDocument()

            // Also verify by text content
            const detailText = screen.queryByText('Voir le détail')
            expect(detailText).not.toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.6**
   *
   * For any MaintenanceService with includes.length > 2, clicking the "Voir le détail"
   * button should call the onShowDetails callback.
   */
  describe('Detail button click triggers callback', () => {
    it('should call onShowDetails when "Voir le détail" button is clicked', () => {
      fc.assert(
        fc.property(
          serviceWithDetailedIncludesArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (service, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            // Find and click the detail button
            const detailButton = screen.getByRole('button', {
              name: `Voir le détail de ${service.name}`,
            })
            fireEvent.click(detailButton)

            // onShowDetails should have been called exactly once
            expect(onShowDetails).toHaveBeenCalledTimes(1)

            // onToggle should NOT have been called (click should not propagate)
            expect(onToggle).not.toHaveBeenCalled()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.6**
   *
   * Clicking the detail button should NOT toggle the service selection.
   * The click event should be stopped from propagating to the card.
   */
  describe('Detail button click does not toggle selection', () => {
    it('should not call onToggle when detail button is clicked', () => {
      fc.assert(
        fc.property(
          serviceWithDetailedIncludesArbitrary,
          billingPeriodArbitrary,
          fc.boolean(),
          (service, billingPeriod, isSelected) => {
            cleanup()

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            const detailButton = screen.getByRole('button', {
              name: `Voir le détail de ${service.name}`,
            })
            fireEvent.click(detailButton)

            // onToggle should NOT be called - the click should be isolated to the button
            expect(onToggle).not.toHaveBeenCalled()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.6**
   *
   * The detail button visibility should be consistent regardless of selection state.
   */
  describe('Detail button visibility independent of selection state', () => {
    it('should show detail button based on includes length, not selection state', () => {
      fc.assert(
        fc.property(
          serviceWithDetailedIncludesArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            // Test with isSelected = false
            cleanup()
            const onToggle1 = jest.fn()
            const onShowDetails1 = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={false}
                billingPeriod={billingPeriod}
                onToggle={onToggle1}
                onShowDetails={onShowDetails1}
              />
            )

            const buttonWhenNotSelected = screen.getByRole('button', {
              name: `Voir le détail de ${service.name}`,
            })
            expect(buttonWhenNotSelected).toBeInTheDocument()

            // Test with isSelected = true
            cleanup()
            const onToggle2 = jest.fn()
            const onShowDetails2 = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={true}
                billingPeriod={billingPeriod}
                onToggle={onToggle2}
                onShowDetails={onShowDetails2}
              />
            )

            const buttonWhenSelected = screen.getByRole('button', {
              name: `Voir le détail de ${service.name}`,
            })
            expect(buttonWhenSelected).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.6**
   *
   * The boundary condition: exactly 3 includes should show the button,
   * exactly 2 includes should NOT show the button.
   */
  describe('Boundary condition at includes.length = 2/3', () => {
    it('should correctly handle the boundary between 2 and 3 includes', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 10 }),
          billingPeriodArbitrary,
          fc.boolean(),
          (includesCount, billingPeriod, isSelected) => {
            cleanup()

            // Generate a service with exactly includesCount items
            const service: MaintenanceService = {
              id: 'test-service-id',
              name: 'Test Service',
              slug: 'test-service',
              description: null,
              price_monthly: 1500,
              icon: 'Flame',
              includes: Array.from(
                { length: includesCount },
                (_, i) => `Include item ${i + 1}`
              ),
              is_active: true,
              sort_order: 0,
              created_at: '2024-01-15T10:30:00.000Z',
            }

            const onToggle = jest.fn()
            const onShowDetails = jest.fn()

            render(
              <ServiceCard
                service={service}
                isSelected={isSelected}
                billingPeriod={billingPeriod}
                onToggle={onToggle}
                onShowDetails={onShowDetails}
              />
            )

            // Query by aria-label which is more reliable
            const detailButton = screen.queryByRole('button', {
              name: 'Voir le détail de Test Service',
            })

            if (includesCount > 2) {
              // Button should be visible
              expect(detailButton).toBeInTheDocument()
            } else {
              // Button should NOT be visible
              expect(detailButton).not.toBeInTheDocument()
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
