/**
 * Property-Based Tests for Collapsed Panel Minimal Display
 *
 * Feature: maintenance-page-redesign
 * Property 8: Collapsed Panel Minimal Display
 *
 * **Validates: Requirements 7.5**
 *
 * For any collapsed state of the FloatingPanel on mobile, the visible content
 * should be limited to: the total price and an expand button ("Voir ma sélection").
 * The full selection list should not be visible.
 *
 * This test validates:
 * 1. When collapsed, the total price is displayed
 * 2. When collapsed, the expand button ("Voir ma sélection") is displayed
 * 3. When collapsed, the full selection list is NOT visible (hidden)
 * 4. When collapsed, the billing toggle is NOT visible (hidden)
 * 5. The minimal display is consistent regardless of selection count
 */

import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import type {
  MaintenanceService,
  MaintenanceOption,
  BillingPeriod,
  PricingSummary,
} from '@/types/maintenance'

// ─── Mock Setup ─────────────────────────────────────────────────────────────

// Mock state for the context
let mockIsFloatingPanelExpanded = false
let mockBillingPeriod: BillingPeriod = 'monthly'
let mockSelectedServices: string[] = []
let mockSelectedOptions: string[] = []
let mockServices: MaintenanceService[] = []
let mockOptions: MaintenanceOption[] = []
let mockPricing: PricingSummary = {
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
}

// Mock the context hook
jest.mock('@/components/maintenance/MaintenanceConfiguratorContext', () => ({
  useMaintenanceConfigurator: () => ({
    services: mockServices,
    options: mockOptions,
    selectedServices: mockSelectedServices,
    selectedOptions: mockSelectedOptions,
    billingPeriod: mockBillingPeriod,
    setBillingPeriod: jest.fn(),
    isFloatingPanelExpanded: mockIsFloatingPanelExpanded,
    setFloatingPanelExpanded: jest.fn(),
    pricing: mockPricing,
    hasSelection: mockSelectedServices.length > 0 || mockSelectedOptions.length > 0,
    isLoading: false,
    error: null,
    handleCheckout: jest.fn(),
  }),
}))

// Mock BillingToggle component
jest.mock('@/components/maintenance/BillingToggle', () => ({
  BillingToggle: ({ value }: { value: BillingPeriod }) => (
    <div data-testid="billing-toggle">
      <span>{value}</span>
    </div>
  ),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <span data-testid="icon-x">X</span>,
  ChevronUp: () => <span data-testid="icon-chevron-up">ChevronUp</span>,
  ShoppingCart: () => <span data-testid="icon-shopping-cart">ShoppingCart</span>,
  Loader2: () => <span data-testid="icon-loader">Loader</span>,
}))

// Import after mocks
import { MaintenanceFloatingPanel } from '@/components/maintenance/MaintenanceFloatingPanel'

// ─── Arbitrary Generators ───────────────────────────────────────────────────

/**
 * Generator for price values (in centimes, 1€ to 500€)
 */
const priceArbitrary = fc.integer({ min: 100, max: 50000 })

/**
 * Generator for billing period
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom('monthly', 'yearly')

/**
 * Generator for a MaintenanceService
 */
const serviceArbitrary: fc.Arbitrary<MaintenanceService> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  slug: fc.string({ minLength: 1, maxLength: 30 }).map(s => s.toLowerCase().replace(/\s/g, '-')),
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: priceArbitrary,
  icon: fc.constantFrom('Flame', 'Wind', 'Sun', 'Droplets', 'Zap', 'Wrench'),
  includes: fc.array(fc.string({ minLength: 5, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
  is_active: fc.constant(true),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: fc.constant('2024-01-15T10:30:00.000Z'),
})

/**
 * Generator for a MaintenanceOption
 */
const optionArbitrary: fc.Arbitrary<MaintenanceOption> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  slug: fc.string({ minLength: 1, maxLength: 30 }).map(s => s.toLowerCase().replace(/\s/g, '-')),
  description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
  price_monthly: priceArbitrary,
  icon: fc.constantFrom('ShieldCheck', 'Wrench', 'Sparkles', 'Zap'),
  is_active: fc.constant(true),
  is_flat_fee: fc.boolean(),
  exempt_from_discount: fc.boolean(),
  sort_order: fc.integer({ min: 0, max: 100 }),
  created_at: fc.constant('2024-01-15T10:30:00.000Z'),
})

/**
 * Generator for pricing summary with arbitrary values
 */
const pricingArbitrary: fc.Arbitrary<PricingSummary> = fc.record({
  servicesSubtotal: priceArbitrary,
  discountMultiPercent: fc.integer({ min: 0, max: 15 }),
  discountMultiAmount: priceArbitrary,
  servicesAfterMulti: priceArbitrary,
  optionsTotal: priceArbitrary,
  discountAnnualPercent: fc.integer({ min: 0, max: 20 }),
  discountAnnualAmount: priceArbitrary,
  totalMonthly: priceArbitrary,
  totalAnnual: priceArbitrary.map(p => p * 12),
  totalDisplay: priceArbitrary,
  savingsTotal: priceArbitrary,
  flatFeeTotal: priceArbitrary,
})

/**
 * Generator for selection state (0 to 6 services, 0 to 4 options)
 */
const selectionStateArbitrary = fc.record({
  services: fc.array(serviceArbitrary, { minLength: 0, maxLength: 6 }),
  options: fc.array(optionArbitrary, { minLength: 0, maxLength: 4 }),
})

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Reset mock state before each test
 */
function resetMockState(config: {
  isExpanded?: boolean
  billingPeriod?: BillingPeriod
  services?: MaintenanceService[]
  options?: MaintenanceOption[]
  selectedServices?: string[]
  selectedOptions?: string[]
  pricing?: PricingSummary
} = {}) {
  mockIsFloatingPanelExpanded = config.isExpanded ?? false
  mockBillingPeriod = config.billingPeriod ?? 'monthly'
  mockServices = config.services ?? []
  mockOptions = config.options ?? []
  mockSelectedServices = config.selectedServices ?? []
  mockSelectedOptions = config.selectedOptions ?? []
  mockPricing = config.pricing ?? {
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
  }
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 8: Collapsed Panel Minimal Display', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * When collapsed, the total price should be displayed.
   */
  describe('Total price visibility when collapsed', () => {
    it('should display total price when collapsed for any pricing value', () => {
      fc.assert(
        fc.property(
          pricingArbitrary,
          billingPeriodArbitrary,
          (pricing, billingPeriod) => {
            cleanup()
            resetMockState({
              isExpanded: false,
              billingPeriod,
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            // The collapsed view should show a price display
            const priceDisplays = screen.getAllByTestId('price-display')
            expect(priceDisplays.length).toBeGreaterThan(0)

            // The panel should be in the document
            const panel = screen.getByRole('region', { name: /récapitulatif/i })
            expect(panel).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * When collapsed, the expand button ("Voir ma sélection") should be displayed.
   */
  describe('Expand button visibility when collapsed', () => {
    it('should display expand button when collapsed for any selection state', () => {
      fc.assert(
        fc.property(
          selectionStateArbitrary,
          billingPeriodArbitrary,
          pricingArbitrary,
          (selection, billingPeriod, pricing) => {
            cleanup()
            const selectedServiceIds = selection.services.map(s => s.id)
            const selectedOptionIds = selection.options.map(o => o.id)

            resetMockState({
              isExpanded: false,
              billingPeriod,
              services: selection.services,
              options: selection.options,
              selectedServices: selectedServiceIds,
              selectedOptions: selectedOptionIds,
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            // The expand button should be present when collapsed
            const expandButton = screen.queryByRole('button', { name: /voir ma sélection/i })
            expect(expandButton).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * When collapsed, the full selection list should NOT be visible.
   */
  describe('Selection list hidden when collapsed', () => {
    it('should hide selection list when collapsed regardless of selection count', () => {
      fc.assert(
        fc.property(
          selectionStateArbitrary,
          billingPeriodArbitrary,
          pricingArbitrary,
          (selection, billingPeriod, pricing) => {
            cleanup()
            const selectedServiceIds = selection.services.map(s => s.id)
            const selectedOptionIds = selection.options.map(o => o.id)

            resetMockState({
              isExpanded: false,
              billingPeriod,
              services: selection.services,
              options: selection.options,
              selectedServices: selectedServiceIds,
              selectedOptions: selectedOptionIds,
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            // The expanded content container should have 'hidden' class on mobile
            // when collapsed (the lg:block class makes it visible on desktop)
            const panel = screen.getByRole('region', { name: /récapitulatif/i })
            
            // Find the expanded content div (contains billing toggle and selection list)
            const expandedContent = panel.querySelector('[class*="hidden"][class*="lg:block"]')
            
            // When collapsed, the expanded content should have the 'hidden' class
            // which hides it on mobile (but lg:block shows it on desktop)
            expect(expandedContent).toBeInTheDocument()
            expect(expandedContent?.className).toContain('hidden')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * When collapsed, the billing toggle should NOT be visible (hidden on mobile).
   */
  describe('Billing toggle hidden when collapsed', () => {
    it('should hide billing toggle when collapsed for any billing period', () => {
      fc.assert(
        fc.property(
          billingPeriodArbitrary,
          pricingArbitrary,
          (billingPeriod, pricing) => {
            cleanup()
            resetMockState({
              isExpanded: false,
              billingPeriod,
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            // The billing toggle is inside the expanded content
            // which has 'hidden' class when collapsed
            const billingToggle = screen.getByTestId('billing-toggle')
            
            // The billing toggle's parent container should have 'hidden' class
            const expandedContent = billingToggle.closest('[class*="hidden"][class*="lg:block"]')
            expect(expandedContent).toBeInTheDocument()
            expect(expandedContent?.className).toContain('hidden')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * The minimal display should be consistent regardless of selection count.
   */
  describe('Minimal display consistency across selection counts', () => {
    it('should show same minimal elements for any number of selections', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 6 }),
          fc.integer({ min: 0, max: 4 }),
          billingPeriodArbitrary,
          pricingArbitrary,
          (serviceCount, optionCount, billingPeriod, pricing) => {
            cleanup()
            
            // Generate mock services and options based on counts
            const services: MaintenanceService[] = Array.from({ length: serviceCount }, (_, i) => ({
              id: `service-${i}`,
              name: `Service ${i}`,
              slug: `service-${i}`,
              description: null,
              price_monthly: 1000 + i * 100,
              icon: 'Flame',
              includes: [],
              is_active: true,
              sort_order: i,
              created_at: new Date().toISOString(),
            }))

            const options: MaintenanceOption[] = Array.from({ length: optionCount }, (_, i) => ({
              id: `option-${i}`,
              name: `Option ${i}`,
              slug: `option-${i}`,
              description: null,
              price_monthly: 500 + i * 50,
              icon: 'ShieldCheck',
              is_active: true,
              is_flat_fee: false,
              exempt_from_discount: false,
              sort_order: i,
              created_at: new Date().toISOString(),
            }))

            resetMockState({
              isExpanded: false,
              billingPeriod,
              services,
              options,
              selectedServices: services.map(s => s.id),
              selectedOptions: options.map(o => o.id),
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            // Regardless of selection count, when collapsed:
            // 1. Expand button should be present
            const expandButton = screen.queryByRole('button', { name: /voir ma sélection/i })
            expect(expandButton).toBeInTheDocument()

            // 2. Price display should be present
            const priceDisplays = screen.getAllByTestId('price-display')
            expect(priceDisplays.length).toBeGreaterThan(0)

            // 3. The expanded content should be hidden
            const panel = screen.getByRole('region', { name: /récapitulatif/i })
            const expandedContent = panel.querySelector('[class*="hidden"][class*="lg:block"]')
            expect(expandedContent).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * The collapsed header should show element count summary.
   */
  describe('Element count display when collapsed', () => {
    it('should display correct element count in collapsed view', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 6 }),
          fc.integer({ min: 0, max: 4 }),
          billingPeriodArbitrary,
          (serviceCount, optionCount, billingPeriod) => {
            cleanup()
            
            const services: MaintenanceService[] = Array.from({ length: serviceCount }, (_, i) => ({
              id: `service-${i}`,
              name: `Service ${i}`,
              slug: `service-${i}`,
              description: null,
              price_monthly: 1000,
              icon: 'Flame',
              includes: [],
              is_active: true,
              sort_order: i,
              created_at: new Date().toISOString(),
            }))

            const options: MaintenanceOption[] = Array.from({ length: optionCount }, (_, i) => ({
              id: `option-${i}`,
              name: `Option ${i}`,
              slug: `option-${i}`,
              description: null,
              price_monthly: 500,
              icon: 'ShieldCheck',
              is_active: true,
              is_flat_fee: false,
              exempt_from_discount: false,
              sort_order: i,
              created_at: new Date().toISOString(),
            }))

            resetMockState({
              isExpanded: false,
              billingPeriod,
              services,
              options,
              selectedServices: services.map(s => s.id),
              selectedOptions: options.map(o => o.id),
            })

            render(<MaintenanceFloatingPanel />)

            const totalCount = serviceCount + optionCount
            
            // The collapsed view should show element count or "Aucune sélection"
            if (totalCount > 0) {
              const countText = screen.getByText(new RegExp(`${totalCount} élément`, 'i'))
              expect(countText).toBeInTheDocument()
            } else {
              const noSelectionText = screen.getByText(/aucune sélection/i)
              expect(noSelectionText).toBeInTheDocument()
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * The collapsed view should show the ChevronUp icon indicating expandability.
   */
  describe('Expand indicator icon when collapsed', () => {
    it('should show chevron icon when collapsed', () => {
      fc.assert(
        fc.property(
          billingPeriodArbitrary,
          pricingArbitrary,
          (billingPeriod, pricing) => {
            cleanup()
            resetMockState({
              isExpanded: false,
              billingPeriod,
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            // The ChevronUp icon should be visible in collapsed state
            const chevronIcon = screen.getByTestId('icon-chevron-up')
            expect(chevronIcon).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 7.5**
   *
   * The collapsed view should have aria-expanded="false" on the toggle button.
   */
  describe('Accessibility attributes when collapsed', () => {
    it('should have aria-expanded="false" on expand button when collapsed', () => {
      fc.assert(
        fc.property(
          billingPeriodArbitrary,
          pricingArbitrary,
          (billingPeriod, pricing) => {
            cleanup()
            resetMockState({
              isExpanded: false,
              billingPeriod,
              pricing,
            })

            render(<MaintenanceFloatingPanel />)

            const expandButton = screen.getByRole('button', { name: /voir ma sélection/i })
            expect(expandButton).toHaveAttribute('aria-expanded', 'false')
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
