/**
 * Property-Based Tests for Modal Content Preservation
 *
 * Feature: maintenance-page-redesign
 * Property 10: Modal Content Preservation
 *
 * **Validates: Requirements 8.3**
 *
 * For any MaintenanceService with a `slug` that has entries in `serviceIncludesDetails`,
 * the detail modal should display all items from `service.includes` with their
 * corresponding detailed descriptions from `serviceIncludesDetails[slug]`.
 */

import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import { ServiceDetailModal } from '@/components/maintenance/ServiceDetailModal'
import { serviceIncludesDetails } from '@/components/maintenance/MaintenanceConfiguratorContext'
import type { MaintenanceService, MaintenanceOption } from '@/types/maintenance'
import React from 'react'

// ─── Mock Setup ─────────────────────────────────────────────────────────────

// Mock the useMaintenanceConfigurator hook
const mockSetDetailService = jest.fn()
const mockToggleService = jest.fn()

let mockDetailService: MaintenanceService | null = null
let mockSelectedServices: string[] = []

jest.mock('@/components/maintenance/MaintenanceConfiguratorContext', () => {
  const actual = jest.requireActual(
    '@/components/maintenance/MaintenanceConfiguratorContext'
  )
  return {
    ...actual,
    useMaintenanceConfigurator: () => ({
      detailService: mockDetailService,
      setDetailService: mockSetDetailService,
      selectedServices: mockSelectedServices,
      toggleService: mockToggleService,
    }),
  }
})

// ─── Arbitrary Generators ───────────────────────────────────────────────────

/**
 * Generator for valid icon names used in the ServiceDetailModal component
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
 * Must contain non-whitespace characters to be findable by testing-library
 */
const includeItemArbitrary = fc
  .array(fc.stringMatching(/^[A-Za-zÀ-ÿ0-9]+$/), { minLength: 2, maxLength: 10 })
  .map((words) => words.filter((w) => w.length > 0).join(' '))
  .filter((s) => s.trim().length >= 5 && s.length <= 100)

/**
 * Get all slugs that have entries in serviceIncludesDetails
 */
const slugsWithDetails = Object.keys(serviceIncludesDetails)

/**
 * Generator for slugs that have entries in serviceIncludesDetails
 */
const slugWithDetailsArbitrary = fc.constantFrom(...slugsWithDetails)

/**
 * Generator for MaintenanceService with a slug that has entries in serviceIncludesDetails
 * and includes array matching the keys from serviceIncludesDetails
 */
const serviceWithEnrichedDetailsArbitrary = (
  slug: string
): fc.Arbitrary<MaintenanceService> => {
  const detailKeys = Object.keys(serviceIncludesDetails[slug] || {})
  return fc.record({
    id: fc.uuid(),
    name: serviceNameArbitrary,
    slug: fc.constant(slug),
    description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
    price_monthly: fc.integer({ min: 500, max: 50000 }),
    icon: iconArbitrary,
    includes: fc.constant(detailKeys),
    is_active: fc.constant(true),
    sort_order: fc.integer({ min: 0, max: 100 }),
    created_at: isoDateArbitrary,
  })
}

/**
 * Generator for MaintenanceService with arbitrary slug (may or may not have details)
 */
const arbitraryMaintenanceService = (
  includesConfig: { minLength: number; maxLength: number } = {
    minLength: 1,
    maxLength: 10,
  }
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

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Set up the mock context with a specific service
 */
function setupMockContext(
  service: MaintenanceService | null,
  selectedServices: string[] = []
) {
  mockDetailService = service
  mockSelectedServices = selectedServices
  mockSetDetailService.mockClear()
  mockToggleService.mockClear()
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 10: Modal Content Preservation', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
    mockDetailService = null
    mockSelectedServices = []
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * For any MaintenanceService with a slug that has entries in serviceIncludesDetails,
   * all items from service.includes should be displayed in the modal.
   */
  describe('All includes items are displayed', () => {
    it('should display all items from service.includes in the modal', () => {
      fc.assert(
        fc.property(slugWithDetailsArbitrary, (slug) => {
          return fc.assert(
            fc.property(serviceWithEnrichedDetailsArbitrary(slug), (service) => {
              cleanup()
              setupMockContext(service)

              render(<ServiceDetailModal />)

              // Verify each include item is displayed
              service.includes?.forEach((item) => {
                const itemElement = screen.getByText(item)
                expect(itemElement).toBeInTheDocument()
              })
            }),
            { numRuns: 20 }
          )
        }),
        { numRuns: slugsWithDetails.length }
      )
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * For items with enriched details in serviceIncludesDetails, the detail text
   * should be shown in the modal.
   */
  describe('Enriched details are displayed for items with details', () => {
    it('should display detailed descriptions from serviceIncludesDetails', () => {
      fc.assert(
        fc.property(slugWithDetailsArbitrary, (slug) => {
          return fc.assert(
            fc.property(serviceWithEnrichedDetailsArbitrary(slug), (service) => {
              cleanup()
              setupMockContext(service)

              render(<ServiceDetailModal />)

              const serviceDetails = serviceIncludesDetails[slug] || {}

              // Verify each include item has its detail displayed if available
              service.includes?.forEach((item) => {
                const detail = serviceDetails[item]
                if (detail) {
                  const detailElement = screen.getByText(detail)
                  expect(detailElement).toBeInTheDocument()
                }
              })
            }),
            { numRuns: 20 }
          )
        }),
        { numRuns: slugsWithDetails.length }
      )
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * The service name should be displayed as the modal title.
   */
  describe('Service name is displayed as modal title', () => {
    it('should display the service name as the modal title', () => {
      fc.assert(
        fc.property(slugWithDetailsArbitrary, (slug) => {
          return fc.assert(
            fc.property(serviceWithEnrichedDetailsArbitrary(slug), (service) => {
              cleanup()
              setupMockContext(service)

              render(<ServiceDetailModal />)

              // The service name should be in the modal title
              const titleElement = screen.getByRole('heading', {
                name: service.name,
              })
              expect(titleElement).toBeInTheDocument()
              expect(titleElement).toHaveAttribute('id', 'service-detail-title')
            }),
            { numRuns: 20 }
          )
        }),
        { numRuns: slugsWithDetails.length }
      )
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * Services without entries in serviceIncludesDetails should still display
   * all include items, but without detailed descriptions.
   */
  describe('Services without enriched details still display includes', () => {
    it('should display include items even when no enriched details exist', () => {
      fc.assert(
        fc.property(
          arbitraryMaintenanceService({ minLength: 1, maxLength: 5 }),
          (service) => {
            cleanup()
            setupMockContext(service)

            render(<ServiceDetailModal />)

            // Verify each include item is displayed
            service.includes?.forEach((item) => {
              const itemElement = screen.getByText(item)
              expect(itemElement).toBeInTheDocument()
            })

            // Verify service name is displayed
            const titleElement = screen.getByRole('heading', {
              name: service.name,
            })
            expect(titleElement).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * Test with real slugs from serviceIncludesDetails to ensure all real
   * service configurations work correctly.
   */
  describe('Real service configurations display correctly', () => {
    // Test each real slug from serviceIncludesDetails
    slugsWithDetails.forEach((slug) => {
      it(`should correctly display all details for ${slug}`, () => {
        const detailKeys = Object.keys(serviceIncludesDetails[slug])
        const service: MaintenanceService = {
          id: `test-${slug}`,
          name: `Service ${slug}`,
          slug: slug,
          description: null,
          price_monthly: 1500,
          icon: 'Flame',
          includes: detailKeys,
          is_active: true,
          sort_order: 0,
          created_at: '2024-01-15T10:30:00.000Z',
        }

        setupMockContext(service)
        render(<ServiceDetailModal />)

        // Verify all include items are displayed
        detailKeys.forEach((item) => {
          const itemElement = screen.getByText(item)
          expect(itemElement).toBeInTheDocument()
        })

        // Verify all detail descriptions are displayed
        Object.entries(serviceIncludesDetails[slug]).forEach(
          ([item, detail]) => {
            const detailElement = screen.getByText(detail)
            expect(detailElement).toBeInTheDocument()
          }
        )

        cleanup()
      })
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * The modal should not render when detailService is null.
   */
  describe('Modal does not render when no service selected', () => {
    it('should not render modal content when detailService is null', () => {
      setupMockContext(null)

      const { container } = render(<ServiceDetailModal />)

      // Modal should not be rendered
      expect(container.firstChild).toBeNull()
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * For any service, the count of displayed include items should match
   * the count in service.includes.
   */
  describe('Include items count matches service.includes length', () => {
    it('should display exactly the same number of items as in service.includes', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10 }),
          fc.boolean(),
          (includesCount, useRealSlug) => {
            cleanup()

            // Generate includes array
            const includes = Array.from(
              { length: includesCount },
              (_, i) => `Test include item ${i + 1} with unique content`
            )

            const service: MaintenanceService = {
              id: 'test-service-id',
              name: 'Test Service Name',
              slug: useRealSlug && slugsWithDetails.length > 0
                ? slugsWithDetails[0]
                : 'test-slug',
              description: null,
              price_monthly: 1500,
              icon: 'Flame',
              includes: includes,
              is_active: true,
              sort_order: 0,
              created_at: '2024-01-15T10:30:00.000Z',
            }

            setupMockContext(service)
            render(<ServiceDetailModal />)

            // Count displayed include items by looking for the check icons
            // Each include item has a check icon in a green circle
            const checkIcons = screen.getAllByText((content, element) => {
              return includes.some((item) => content === item)
            })

            expect(checkIcons.length).toBe(includesCount)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 8.3**
   *
   * Mixed scenario: some includes have details, some don't.
   * All items should be displayed, but only items with details should show descriptions.
   */
  describe('Mixed includes with and without details', () => {
    it('should handle services with partial detail coverage', () => {
      // Use a real slug and add some items that don't have details
      if (slugsWithDetails.length === 0) return

      fc.assert(
        fc.property(
          fc.constantFrom(...slugsWithDetails),
          fc.array(
            fc
              .array(fc.stringMatching(/^[A-Za-zÀ-ÿ0-9]+$/), { minLength: 2, maxLength: 5 })
              .map((words) => words.filter((w) => w.length > 0).join(' '))
              .filter((s) => s.trim().length >= 10 && s.length <= 50),
            {
              minLength: 1,
              maxLength: 3,
            }
          ),
          (slug, extraItems) => {
            cleanup()

            const realDetailKeys = Object.keys(serviceIncludesDetails[slug])
            // Mix real items with extra items that don't have details
            const allIncludes = [...realDetailKeys.slice(0, 2), ...extraItems]

            const service: MaintenanceService = {
              id: 'test-mixed-service',
              name: 'Mixed Service',
              slug: slug,
              description: null,
              price_monthly: 2000,
              icon: 'Wind',
              includes: allIncludes,
              is_active: true,
              sort_order: 0,
              created_at: '2024-01-15T10:30:00.000Z',
            }

            setupMockContext(service)
            render(<ServiceDetailModal />)

            // All items should be displayed
            allIncludes.forEach((item) => {
              const itemElement = screen.getByText(item)
              expect(itemElement).toBeInTheDocument()
            })

            // Items with details should show their descriptions
            realDetailKeys.slice(0, 2).forEach((item) => {
              const detail = serviceIncludesDetails[slug][item]
              if (detail) {
                const detailElement = screen.getByText(detail)
                expect(detailElement).toBeInTheDocument()
              }
            })
          }
        ),
        { numRuns: 50 }
      )
    })
  })
})
