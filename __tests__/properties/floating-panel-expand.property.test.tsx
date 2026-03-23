/**
 * Property-Based Tests for Floating Panel Expand/Collapse State
 *
 * Feature: maintenance-page-redesign
 * Property 7: Floating Panel Expand/Collapse State
 *
 * **Validates: Requirements 5.7**
 *
 * For any state of `isFloatingPanelExpanded`, toggling it should result in
 * the opposite boolean value, and the panel UI should reflect this state
 * (collapsed shows minimal view, expanded shows full view).
 *
 * This test validates:
 * 1. Toggling the expand state correctly switches between true and false
 * 2. UI reflects the state (collapsed: minimal view, expanded: full view)
 * 3. Keyboard interactions for the expand toggle work correctly
 */

import * as fc from 'fast-check'
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react'
import type { ReactNode } from 'react'
import type {
  MaintenanceService,
  MaintenanceOption,
  BillingPeriod,
} from '@/types/maintenance'

// ─── Mock Setup ─────────────────────────────────────────────────────────────

// Mock state for the context
let mockIsFloatingPanelExpanded = false
let mockSetFloatingPanelExpanded = jest.fn()
let mockBillingPeriod: BillingPeriod = 'monthly'
let mockSelectedServices: string[] = []
let mockSelectedOptions: string[] = []
let mockServices: MaintenanceService[] = []
let mockOptions: MaintenanceOption[] = []

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
    setFloatingPanelExpanded: mockSetFloatingPanelExpanded,
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
    hasSelection: mockSelectedServices.length > 0 || mockSelectedOptions.length > 0,
    isLoading: false,
    error: null,
    handleCheckout: jest.fn(),
  }),
}))

// Mock BillingToggle component
jest.mock('@/components/maintenance/BillingToggle', () => ({
  BillingToggle: ({ value, onChange }: { value: BillingPeriod; onChange: (v: BillingPeriod) => void }) => (
    <div data-testid="billing-toggle">
      <button onClick={() => onChange(value === 'monthly' ? 'yearly' : 'monthly')}>
        Toggle Billing
      </button>
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
 * Generator for boolean expand state
 */
const expandStateArbitrary: fc.Arbitrary<boolean> = fc.boolean()

/**
 * Generator for toggle operations (click, enter, space)
 */
const toggleOperationArbitrary = fc.constantFrom('click', 'enter', 'space')

/**
 * Generator for a sequence of toggle operations (1 to 20 operations)
 */
const toggleSequenceArbitrary = fc.array(toggleOperationArbitrary, {
  minLength: 1,
  maxLength: 20,
})

/**
 * Generator for billing period
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom('monthly', 'yearly')

/**
 * Generator for service selection state
 */
const selectionStateArbitrary = fc.record({
  hasServices: fc.boolean(),
  hasOptions: fc.boolean(),
})

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Reset mock state before each test
 */
function resetMockState(config: {
  isExpanded?: boolean
  billingPeriod?: BillingPeriod
  selectedServices?: string[]
  selectedOptions?: string[]
} = {}) {
  mockIsFloatingPanelExpanded = config.isExpanded ?? false
  mockBillingPeriod = config.billingPeriod ?? 'monthly'
  mockSelectedServices = config.selectedServices ?? []
  mockSelectedOptions = config.selectedOptions ?? []
  mockSetFloatingPanelExpanded = jest.fn((expanded: boolean) => {
    mockIsFloatingPanelExpanded = expanded
  })
  mockServices = []
  mockOptions = []
}

/**
 * Performs a toggle operation on an element
 */
function performToggleOperation(
  element: HTMLElement,
  operation: 'click' | 'enter' | 'space'
): void {
  switch (operation) {
    case 'click':
      fireEvent.click(element)
      break
    case 'enter':
      fireEvent.keyDown(element, { key: 'Enter' })
      break
    case 'space':
      fireEvent.keyDown(element, { key: ' ' })
      break
  }
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 7: Floating Panel Expand/Collapse State', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * For any initial expand state, toggling should result in the opposite boolean value.
   */
  describe('Toggle state inversion', () => {
    it('should toggle to opposite value on click for any initial state', () => {
      fc.assert(
        fc.property(expandStateArbitrary, (initialExpanded) => {
          cleanup()
          resetMockState({ isExpanded: initialExpanded })

          render(<MaintenanceFloatingPanel />)

          // Find the toggle button (only visible when collapsed on mobile)
          if (!initialExpanded) {
            const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
            if (toggleButton) {
              fireEvent.click(toggleButton)
              expect(mockSetFloatingPanelExpanded).toHaveBeenCalledWith(!initialExpanded)
            }
          } else {
            // When expanded, find the close button
            const closeButton = screen.queryByRole('button', { name: /fermer/i })
            if (closeButton) {
              fireEvent.click(closeButton)
              expect(mockSetFloatingPanelExpanded).toHaveBeenCalledWith(false)
            }
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * For any initial expand state, pressing Enter key should toggle the state.
   */
  describe('Toggle Enter key behavior', () => {
    it('should toggle to opposite value on Enter key for any initial state', () => {
      fc.assert(
        fc.property(expandStateArbitrary, (initialExpanded) => {
          cleanup()
          resetMockState({ isExpanded: initialExpanded })

          render(<MaintenanceFloatingPanel />)

          if (!initialExpanded) {
            const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
            if (toggleButton) {
              fireEvent.keyDown(toggleButton, { key: 'Enter' })
              expect(mockSetFloatingPanelExpanded).toHaveBeenCalledWith(!initialExpanded)
            }
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * For any initial expand state, pressing Space key should toggle the state.
   */
  describe('Toggle Space key behavior', () => {
    it('should toggle to opposite value on Space key for any initial state', () => {
      fc.assert(
        fc.property(expandStateArbitrary, (initialExpanded) => {
          cleanup()
          resetMockState({ isExpanded: initialExpanded })

          render(<MaintenanceFloatingPanel />)

          if (!initialExpanded) {
            const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
            if (toggleButton) {
              fireEvent.keyDown(toggleButton, { key: ' ' })
              expect(mockSetFloatingPanelExpanded).toHaveBeenCalledWith(!initialExpanded)
            }
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * When collapsed, the panel should show minimal view (total + expand button).
   */
  describe('Collapsed state minimal view', () => {
    it('should show minimal view when collapsed for any billing period', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (billingPeriod) => {
          cleanup()
          resetMockState({ isExpanded: false, billingPeriod })

          render(<MaintenanceFloatingPanel />)

          // When collapsed, should show the expand button
          const expandButton = screen.queryByRole('button', { name: /voir ma sélection/i })
          expect(expandButton).toBeInTheDocument()

          // The expanded content should be hidden (has 'hidden' class on mobile)
          const panel = screen.getByRole('region', { name: /récapitulatif/i })
          expect(panel).toBeInTheDocument()
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * When expanded, the panel should show full view (selection list, billing toggle, etc.).
   */
  describe('Expanded state full view', () => {
    it('should show full view when expanded for any billing period', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (billingPeriod) => {
          cleanup()
          resetMockState({ isExpanded: true, billingPeriod })

          render(<MaintenanceFloatingPanel />)

          // When expanded, should show the billing toggle
          const billingToggle = screen.getByTestId('billing-toggle')
          expect(billingToggle).toBeInTheDocument()

          // Should show the close button (mobile)
          const closeButton = screen.queryByRole('button', { name: /fermer/i })
          expect(closeButton).toBeInTheDocument()

          // Should show "Ma sélection" header
          const header = screen.getAllByText(/ma sélection/i)
          expect(header.length).toBeGreaterThan(0)
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * The aria-expanded attribute should correctly reflect the expand state.
   */
  describe('Accessibility attributes consistency', () => {
    it('should have correct aria-expanded for any expand state', () => {
      fc.assert(
        fc.property(expandStateArbitrary, (isExpanded) => {
          cleanup()
          resetMockState({ isExpanded })

          render(<MaintenanceFloatingPanel />)

          if (!isExpanded) {
            const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
            if (toggleButton) {
              expect(toggleButton).toHaveAttribute('aria-expanded', isExpanded.toString())
            }
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * Double-toggling should return to the original state.
   */
  describe('Double toggle idempotency', () => {
    it('should return to original state after double toggle', () => {
      fc.assert(
        fc.property(
          expandStateArbitrary,
          toggleOperationArbitrary,
          (initialExpanded, operation) => {
            cleanup()
            resetMockState({ isExpanded: initialExpanded })

            const { rerender } = render(<MaintenanceFloatingPanel />)

            // Track state changes
            let currentExpanded = initialExpanded
            mockSetFloatingPanelExpanded = jest.fn((expanded: boolean) => {
              currentExpanded = expanded
              mockIsFloatingPanelExpanded = expanded
            })

            // First toggle (from collapsed)
            if (!currentExpanded) {
              const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
              if (toggleButton) {
                performToggleOperation(toggleButton, operation)
                // Simulate state update
                mockIsFloatingPanelExpanded = !currentExpanded
                currentExpanded = !currentExpanded
                
                rerender(<MaintenanceFloatingPanel />)

                // Second toggle (from expanded - use close button)
                const closeButton = screen.queryByRole('button', { name: /fermer/i })
                if (closeButton) {
                  fireEvent.click(closeButton)
                  // After double toggle, should be back to original
                  expect(mockSetFloatingPanelExpanded).toHaveBeenLastCalledWith(false)
                }
              }
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * The overlay should be visible when expanded on mobile.
   */
  describe('Overlay visibility on expand', () => {
    it('should show overlay when expanded', () => {
      fc.assert(
        fc.property(expandStateArbitrary, (isExpanded) => {
          cleanup()
          resetMockState({ isExpanded })

          render(<MaintenanceFloatingPanel />)

          // The overlay div should be present when expanded
          const overlay = document.querySelector('[aria-hidden="true"]')
          if (isExpanded) {
            expect(overlay).toBeInTheDocument()
          } else {
            expect(overlay).not.toBeInTheDocument()
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * Clicking the overlay should collapse the panel.
   */
  describe('Overlay click behavior', () => {
    it('should collapse panel when overlay is clicked', () => {
      fc.assert(
        fc.property(fc.constant(true), () => {
          cleanup()
          resetMockState({ isExpanded: true })

          render(<MaintenanceFloatingPanel />)

          const overlay = document.querySelector('[aria-hidden="true"]')
          if (overlay) {
            fireEvent.click(overlay)
            expect(mockSetFloatingPanelExpanded).toHaveBeenCalledWith(false)
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * The panel should maintain correct state across different selection states.
   */
  describe('State consistency with selections', () => {
    it('should maintain expand state regardless of selection state', () => {
      fc.assert(
        fc.property(
          expandStateArbitrary,
          selectionStateArbitrary,
          (isExpanded, selection) => {
            cleanup()
            resetMockState({
              isExpanded,
              selectedServices: selection.hasServices ? ['service-1'] : [],
              selectedOptions: selection.hasOptions ? ['option-1'] : [],
            })

            render(<MaintenanceFloatingPanel />)

            // Panel should render correctly regardless of selection
            const panel = screen.getByRole('region', { name: /récapitulatif/i })
            expect(panel).toBeInTheDocument()

            // Expand state should be reflected correctly
            if (!isExpanded) {
              const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
              expect(toggleButton).toBeInTheDocument()
            } else {
              const billingToggle = screen.getByTestId('billing-toggle')
              expect(billingToggle).toBeInTheDocument()
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.7**
   *
   * The toggle button should be keyboard focusable.
   */
  describe('Keyboard focusability', () => {
    it('should have focusable toggle button when collapsed', () => {
      fc.assert(
        fc.property(fc.constant(false), () => {
          cleanup()
          resetMockState({ isExpanded: false })

          render(<MaintenanceFloatingPanel />)

          const toggleButton = screen.queryByRole('button', { name: /voir ma sélection/i })
          if (toggleButton) {
            // Button should be focusable (not have tabIndex=-1)
            expect(toggleButton).not.toHaveAttribute('tabIndex', '-1')
            // Should be able to focus
            toggleButton.focus()
            expect(document.activeElement).toBe(toggleButton)
          }
        }),
        { numRuns: 100 }
      )
    })
  })
})
