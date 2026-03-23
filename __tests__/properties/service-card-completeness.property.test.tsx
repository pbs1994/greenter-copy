/**
 * Property-Based Tests for Service Card Information Completeness
 *
 * Feature: maintenance-page-redesign
 * Property 1: Service Card Information Completeness
 *
 * **Validates: Requirements 2.2**
 *
 * For any MaintenanceService, when rendered as a ServiceCard, the output should
 * contain the service icon, name, monthly price formatted in EUR, and annual
 * price (monthly × 12) formatted in EUR.
 */

import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import { ServiceCard } from '@/components/maintenance/ServiceCard'
import { formatEUR } from '@/lib/format'
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
 * We use alphanumeric characters with single spaces to avoid whitespace normalization issues
 */
const serviceNameArbitrary = fc
  .array(
    fc.stringMatching(/^[A-Za-zÀ-ÿ0-9]+$/),
    { minLength: 1, maxLength: 5 }
  )
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
  isSelected: false,
  onToggle: jest.fn(),
  onShowDetails: jest.fn(),
}

/**
 * Checks if a text is present in the document (handles formatted prices)
 */
function textIsInDocument(text: string): boolean {
  // Use a function matcher to find the text anywhere in the document
  try {
    const elements = screen.getAllByText((content, element) => {
      if (!element) return false
      // Check if the element's text content contains our text
      return element.textContent?.includes(text) ?? false
    })
    return elements.length > 0
  } catch {
    return false
  }
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 1: Service Card Information Completeness', () => {
  // Clean up after each test
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * For any MaintenanceService, the ServiceCard should display the service name.
   */
  describe('Service name display', () => {
    it('should display the service name for any MaintenanceService', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            render(
              <ServiceCard
                service={service}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // The service name should be displayed
            expect(screen.getByText(service.name)).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * For any MaintenanceService, the ServiceCard should display the monthly price
   * formatted in EUR.
   */
  describe('Monthly price display', () => {
    it('should display the monthly price formatted in EUR for any MaintenanceService', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            render(
              <ServiceCard
                service={service}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const formattedMonthlyPrice = formatEUR(service.price_monthly)

            // The monthly price should be displayed (using data-testid)
            const monthlyPriceElement = screen.getByTestId('price-monthly')
            expect(monthlyPriceElement).toBeInTheDocument()
            expect(monthlyPriceElement.textContent).toBe(formattedMonthlyPrice)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * For any MaintenanceService, the ServiceCard should display the annual price
   * (monthly × 12) formatted in EUR.
   */
  describe('Annual price display', () => {
    it('should display the annual price (monthly × 12) formatted in EUR for any MaintenanceService', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            render(
              <ServiceCard
                service={service}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const annualPrice = service.price_monthly * 12
            const formattedAnnualPrice = formatEUR(annualPrice)

            // The annual price should be displayed (using data-testid)
            const annualPriceElement = screen.getByTestId('price-annual')
            expect(annualPriceElement).toBeInTheDocument()
            expect(annualPriceElement.textContent).toBe(formattedAnnualPrice)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * For any MaintenanceService, the ServiceCard should render an icon.
   */
  describe('Icon rendering', () => {
    it('should render an icon for any MaintenanceService', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // The icon should be rendered as an SVG element
            // Lucide icons render as SVG elements with aria-hidden="true"
            const iconElements = container.querySelectorAll('svg[aria-hidden="true"]')
            expect(iconElements.length).toBeGreaterThan(0)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * For any MaintenanceService, all required information (name, monthly price,
   * annual price, icon) should be present simultaneously.
   */
  describe('Complete information display', () => {
    it('should display all required information for any MaintenanceService', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            const { container } = render(
              <ServiceCard
                service={service}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            // 1. Service name is displayed
            expect(screen.getByText(service.name)).toBeInTheDocument()

            // 2. Monthly price is displayed and correctly formatted
            const formattedMonthlyPrice = formatEUR(service.price_monthly)
            const monthlyPriceElement = screen.getByTestId('price-monthly')
            expect(monthlyPriceElement.textContent).toBe(formattedMonthlyPrice)

            // 3. Annual price is displayed and correctly calculated (monthly × 12)
            const annualPrice = service.price_monthly * 12
            const formattedAnnualPrice = formatEUR(annualPrice)
            const annualPriceElement = screen.getByTestId('price-annual')
            expect(annualPriceElement.textContent).toBe(formattedAnnualPrice)

            // 4. Icon is rendered
            const iconElements = container.querySelectorAll('svg[aria-hidden="true"]')
            expect(iconElements.length).toBeGreaterThan(0)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * The annual price calculation should always be exactly monthly × 12.
   */
  describe('Annual price calculation correctness', () => {
    it('should calculate annual price as exactly monthly × 12 for any price', () => {
      fc.assert(
        fc.property(
          maintenanceServiceArbitrary,
          billingPeriodArbitrary,
          (service, billingPeriod) => {
            cleanup()

            render(
              <ServiceCard
                service={service}
                billingPeriod={billingPeriod}
                {...defaultCardProps}
              />
            )

            const monthlyPriceElement = screen.getByTestId('price-monthly')
            const annualPriceElement = screen.getByTestId('price-annual')

            // Parse the displayed prices back to verify the calculation
            const displayedMonthly = monthlyPriceElement.textContent
            const displayedAnnual = annualPriceElement.textContent

            // The displayed values should match the formatted expected values
            expect(displayedMonthly).toBe(formatEUR(service.price_monthly))
            expect(displayedAnnual).toBe(formatEUR(service.price_monthly * 12))
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 2.2**
   *
   * Price formatting should be consistent regardless of billing period selection.
   */
  describe('Price display consistency across billing periods', () => {
    it('should display both monthly and annual prices regardless of billing period', () => {
      fc.assert(
        fc.property(maintenanceServiceArbitrary, (service) => {
          // Test with monthly billing period
          cleanup()
          const { container: containerMonthly } = render(
            <ServiceCard
              service={service}
              billingPeriod="monthly"
              {...defaultCardProps}
            />
          )

          const monthlyPriceMonthlyView = screen.getByTestId('price-monthly')
          const annualPriceMonthlyView = screen.getByTestId('price-annual')

          expect(monthlyPriceMonthlyView).toBeInTheDocument()
          expect(annualPriceMonthlyView).toBeInTheDocument()

          cleanup()

          // Test with yearly billing period
          const { container: containerYearly } = render(
            <ServiceCard
              service={service}
              billingPeriod="yearly"
              {...defaultCardProps}
            />
          )

          const monthlyPriceYearlyView = screen.getByTestId('price-monthly')
          const annualPriceYearlyView = screen.getByTestId('price-annual')

          expect(monthlyPriceYearlyView).toBeInTheDocument()
          expect(annualPriceYearlyView).toBeInTheDocument()

          // Both views should show the same price values
          expect(monthlyPriceYearlyView.textContent).toBe(
            formatEUR(service.price_monthly)
          )
          expect(annualPriceYearlyView.textContent).toBe(
            formatEUR(service.price_monthly * 12)
          )
        }),
        { numRuns: 100 }
      )
    })
  })
})
