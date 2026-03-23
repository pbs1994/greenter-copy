/**
 * Property-Based Tests for Discount Tier Highlighting
 *
 * Feature: maintenance-page-redesign
 * Property 4: Discount Tier Highlighting
 *
 * **Validates: Requirements 3.4**
 *
 * For any number of selected services (0 to N), the DiscountBanner should highlight
 * exactly one tier: no tier if count < 2, tier 0 (5%) if count = 2, tier 1 (10%)
 * if count = 3, tier 2 (15%) if count >= 4.
 */

import * as fc from 'fast-check'
import { render, cleanup } from '@testing-library/react'
import { MaintenanceDiscountBanner } from '@/components/maintenance/MaintenanceDiscountBanner'
import * as MaintenanceContext from '@/components/maintenance/MaintenanceConfiguratorContext'
import type { MaintenanceConfiguratorContextValue } from '@/components/maintenance/MaintenanceConfiguratorContext'

// ─── Mock Setup ─────────────────────────────────────────────────────────────

// Mock the useMaintenanceConfigurator hook
jest.mock('@/components/maintenance/MaintenanceConfiguratorContext', () => ({
  ...jest.requireActual('@/components/maintenance/MaintenanceConfiguratorContext'),
  useMaintenanceConfigurator: jest.fn(),
}))

const mockUseMaintenanceConfigurator = MaintenanceContext.useMaintenanceConfigurator as jest.MockedFunction<
  typeof MaintenanceContext.useMaintenanceConfigurator
>

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Get the expected tier index based on selection count
 * Returns -1 if no tier should be active (count < 2)
 * Returns 0 for tier 0 (5%, count = 2)
 * Returns 1 for tier 1 (10%, count = 3)
 * Returns 2 for tier 2 (15%, count >= 4)
 */
function getExpectedTierIndex(selectionCount: number): number {
  if (selectionCount >= 4) return 2
  if (selectionCount === 3) return 1
  if (selectionCount === 2) return 0
  return -1
}

/**
 * Create a mock context value with a specific number of selected services
 */
function createMockContextValue(selectedCount: number): MaintenanceConfiguratorContextValue {
  // Generate service IDs for the selection
  const selectedServices = Array.from({ length: selectedCount }, (_, i) => `service-${i}`)

  return {
    services: [],
    options: [],
    selectedServices,
    selectedOptions: [],
    billingPeriod: 'monthly',
    isFloatingPanelExpanded: false,
    toggleService: jest.fn(),
    toggleOption: jest.fn(),
    setBillingPeriod: jest.fn(),
    setFloatingPanelExpanded: jest.fn(),
    pricing: {
      servicesSubtotal: 0,
      discountMultiPercent: 0,
      discountMultiAmount: 0,
      servicesAfterMulti: 0,
      optionsTotal: 0,
      discountAnnualPercent: 0,
      discountAnnualAmount: 0,
      totalMonthly: 0,
      totalAnnual: 0,
      totalDisplay: 0,
      savingsTotal: 0,
      flatFeeTotal: 0,
    },
    hasSelection: selectedCount > 0,
    detailService: null,
    detailOption: null,
    setDetailService: jest.fn(),
    setDetailOption: jest.fn(),
    isLoading: false,
    error: null,
    handleCheckout: jest.fn(),
  }
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 4: Discount Tier Highlighting', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * For any selection count < 2, no tier should be highlighted.
   */
  describe('No tier highlighted when count < 2', () => {
    it('should not highlight any tier when selection count is 0 or 1', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 1 }),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            // No tier should have the .tier-active class
            const activeTiers = container.querySelectorAll('.tier-active')
            expect(activeTiers.length).toBe(0)

            // No tier should have aria-current="true"
            const currentTiers = container.querySelectorAll('[aria-current="true"]')
            expect(currentTiers.length).toBe(0)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * When count = 2, tier 0 (5%) should be highlighted.
   */
  describe('Tier 0 (5%) highlighted when count = 2', () => {
    it('should highlight tier 0 when exactly 2 services are selected', () => {
      fc.assert(
        fc.property(
          fc.constant(2),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            // Exactly one tier should be active
            const activeTiers = container.querySelectorAll('.tier-active')
            expect(activeTiers.length).toBe(1)

            // The active tier should be tier 0 (data-tier="0")
            const activeTier = activeTiers[0]
            expect(activeTier).toHaveAttribute('data-tier', '0')

            // Verify it's the 5% tier by checking content
            expect(activeTier.textContent).toContain('-5%')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * When count = 3, tier 1 (10%) should be highlighted.
   */
  describe('Tier 1 (10%) highlighted when count = 3', () => {
    it('should highlight tier 1 when exactly 3 services are selected', () => {
      fc.assert(
        fc.property(
          fc.constant(3),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            // Exactly one tier should be active
            const activeTiers = container.querySelectorAll('.tier-active')
            expect(activeTiers.length).toBe(1)

            // The active tier should be tier 1 (data-tier="1")
            const activeTier = activeTiers[0]
            expect(activeTier).toHaveAttribute('data-tier', '1')

            // Verify it's the 10% tier by checking content
            expect(activeTier.textContent).toContain('-10%')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * When count >= 4, tier 2 (15%) should be highlighted.
   */
  describe('Tier 2 (15%) highlighted when count >= 4', () => {
    it('should highlight tier 2 when 4 or more services are selected', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 4, max: 10 }),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            // Exactly one tier should be active
            const activeTiers = container.querySelectorAll('.tier-active')
            expect(activeTiers.length).toBe(1)

            // The active tier should be tier 2 (data-tier="2")
            const activeTier = activeTiers[0]
            expect(activeTier).toHaveAttribute('data-tier', '2')

            // Verify it's the 15% tier by checking content
            expect(activeTier.textContent).toContain('-15%')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * For any selection count (0 to 10), exactly one tier should be highlighted
   * when count >= 2, or no tier when count < 2.
   */
  describe('Exactly one tier highlighted at a time (or none if count < 2)', () => {
    it('should highlight exactly one tier based on selection count', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 10 }),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            const activeTiers = container.querySelectorAll('.tier-active')
            const expectedTierIndex = getExpectedTierIndex(selectionCount)

            if (selectionCount < 2) {
              // No tier should be active
              expect(activeTiers.length).toBe(0)
            } else {
              // Exactly one tier should be active
              expect(activeTiers.length).toBe(1)

              // The correct tier should be active
              expect(activeTiers[0]).toHaveAttribute(
                'data-tier',
                expectedTierIndex.toString()
              )
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * Verify the tier highlighting is mutually exclusive - only one tier
   * can be active at any time.
   */
  describe('Tier highlighting is mutually exclusive', () => {
    it('should never have more than one tier highlighted', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 10 }),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            // Count all tiers with active styling
            const activeTiers = container.querySelectorAll('.tier-active')
            const tiersWithAriaCurrent = container.querySelectorAll('[aria-current="true"]')

            // Should never have more than 1 active tier
            expect(activeTiers.length).toBeLessThanOrEqual(1)
            expect(tiersWithAriaCurrent.length).toBeLessThanOrEqual(1)

            // If there's an active tier, it should also have aria-current
            if (activeTiers.length === 1) {
              expect(activeTiers[0]).toHaveAttribute('aria-current', 'true')
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 3.4**
   *
   * Verify that the correct discount percentage is displayed for each tier.
   */
  describe('Correct discount percentage displayed', () => {
    it('should display the correct discount percentage for the active tier', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 2, max: 10 }),
          (selectionCount) => {
            cleanup()
            mockUseMaintenanceConfigurator.mockReturnValue(
              createMockContextValue(selectionCount)
            )

            const { container } = render(<MaintenanceDiscountBanner />)

            const activeTier = container.querySelector('.tier-active')
            expect(activeTier).toBeInTheDocument()

            // Determine expected discount percentage
            let expectedDiscount: string
            if (selectionCount >= 4) {
              expectedDiscount = '-15%'
            } else if (selectionCount === 3) {
              expectedDiscount = '-10%'
            } else {
              expectedDiscount = '-5%'
            }

            expect(activeTier?.textContent).toContain(expectedDiscount)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
