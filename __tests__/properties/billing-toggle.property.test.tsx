/**
 * Property-Based Tests for Billing Toggle State Consistency
 *
 * Feature: maintenance-page-redesign
 * Property 12: Billing Toggle State Consistency
 *
 * **Validates: Requirements 5.2**
 *
 * For any value of billingPeriod ('monthly' or 'yearly'), all price displays
 * across the page (ServiceCards, OptionCards, FloatingPanel) should consistently
 * show prices in the selected period format.
 *
 * This test validates:
 * 1. Toggle correctly switches between 'monthly' and 'yearly'
 * 2. Toggle state is consistent (clicking always toggles to the opposite value)
 * 3. Keyboard interactions (Enter and Space keys) work correctly
 */

import * as fc from 'fast-check'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { BillingToggle } from '@/components/maintenance/BillingToggle'
import type { BillingPeriod } from '@/types/maintenance'

// ─── Arbitrary Generators ───────────────────────────────────────────────────

/**
 * Generator for valid billing period values
 */
const billingPeriodArbitrary: fc.Arbitrary<BillingPeriod> = fc.constantFrom(
  'monthly',
  'yearly'
)

/**
 * Generator for a sequence of toggle operations
 * Each operation is either 'click', 'enter', or 'space'
 */
const toggleOperationArbitrary = fc.constantFrom('click', 'enter', 'space')

/**
 * Generator for a sequence of toggle operations (1 to 20 operations)
 */
const toggleSequenceArbitrary = fc.array(toggleOperationArbitrary, {
  minLength: 1,
  maxLength: 20,
})

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Performs a toggle operation on the switch element
 */
function performToggleOperation(
  switchElement: HTMLElement,
  operation: 'click' | 'enter' | 'space'
): void {
  switch (operation) {
    case 'click':
      fireEvent.click(switchElement)
      break
    case 'enter':
      fireEvent.keyDown(switchElement, { key: 'Enter' })
      break
    case 'space':
      fireEvent.keyDown(switchElement, { key: ' ' })
      break
  }
}

/**
 * Gets the opposite billing period
 */
function getOppositePeriod(period: BillingPeriod): BillingPeriod {
  return period === 'monthly' ? 'yearly' : 'monthly'
}

// ─── Property-Based Tests ───────────────────────────────────────────────────

describe('Property 12: Billing Toggle State Consistency', () => {
  // Clean up after each test
  afterEach(() => {
    cleanup()
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * For any initial billing period, clicking the toggle should switch
   * to the opposite value.
   */
  describe('Toggle click behavior', () => {
    it('should toggle to opposite value on click for any initial state', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (initialPeriod) => {
          cleanup() // Clean up before each iteration
          
          let currentValue = initialPeriod
          const handleChange = jest.fn((newValue: BillingPeriod) => {
            currentValue = newValue
          })

          const { rerender } = render(
            <BillingToggle value={currentValue} onChange={handleChange} />
          )

          const switchElement = screen.getByRole('switch')
          fireEvent.click(switchElement)

          // onChange should be called with the opposite value
          expect(handleChange).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledWith(getOppositePeriod(initialPeriod))

          // Rerender with new value and verify aria-checked
          rerender(<BillingToggle value={currentValue} onChange={handleChange} />)

          const expectedChecked = currentValue === 'yearly'
          expect(switchElement).toHaveAttribute(
            'aria-checked',
            expectedChecked.toString()
          )
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * For any initial billing period, pressing Enter key should toggle
   * to the opposite value.
   */
  describe('Toggle Enter key behavior', () => {
    it('should toggle to opposite value on Enter key for any initial state', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (initialPeriod) => {
          cleanup() // Clean up before each iteration
          
          const handleChange = jest.fn()

          render(<BillingToggle value={initialPeriod} onChange={handleChange} />)

          const switchElement = screen.getByRole('switch')
          fireEvent.keyDown(switchElement, { key: 'Enter' })

          expect(handleChange).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledWith(getOppositePeriod(initialPeriod))
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * For any initial billing period, pressing Space key should toggle
   * to the opposite value.
   */
  describe('Toggle Space key behavior', () => {
    it('should toggle to opposite value on Space key for any initial state', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (initialPeriod) => {
          cleanup() // Clean up before each iteration
          
          const handleChange = jest.fn()

          render(<BillingToggle value={initialPeriod} onChange={handleChange} />)

          const switchElement = screen.getByRole('switch')
          fireEvent.keyDown(switchElement, { key: ' ' })

          expect(handleChange).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledWith(getOppositePeriod(initialPeriod))
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * For any sequence of toggle operations, the final state should be
   * predictable based on the number of operations (odd = opposite, even = same).
   */
  describe('Toggle sequence consistency', () => {
    it('should maintain consistent state after any sequence of toggle operations', () => {
      fc.assert(
        fc.property(
          billingPeriodArbitrary,
          toggleSequenceArbitrary,
          (initialPeriod, operations) => {
            cleanup() // Clean up before each iteration
            
            let currentValue = initialPeriod
            const handleChange = jest.fn((newValue: BillingPeriod) => {
              currentValue = newValue
            })

            const { rerender } = render(
              <BillingToggle value={currentValue} onChange={handleChange} />
            )

            const switchElement = screen.getByRole('switch')

            // Perform all operations
            operations.forEach((operation) => {
              performToggleOperation(switchElement, operation)
              rerender(<BillingToggle value={currentValue} onChange={handleChange} />)
            })

            // Final state should be predictable
            const expectedFinalPeriod =
              operations.length % 2 === 1
                ? getOppositePeriod(initialPeriod)
                : initialPeriod

            expect(currentValue).toBe(expectedFinalPeriod)
            expect(handleChange).toHaveBeenCalledTimes(operations.length)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * The toggle should always display the correct visual state
   * (aria-checked attribute) matching the current value.
   */
  describe('Visual state consistency', () => {
    it('should display correct aria-checked for any billing period', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (period) => {
          cleanup() // Clean up before each iteration
          
          render(<BillingToggle value={period} onChange={jest.fn()} />)

          const switchElement = screen.getByRole('switch')
          const expectedChecked = period === 'yearly'

          expect(switchElement).toHaveAttribute(
            'aria-checked',
            expectedChecked.toString()
          )
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * The toggle labels should always be present and correctly styled
   * based on the current value.
   */
  describe('Label display consistency', () => {
    it('should always display both Mensuel and Annuel labels', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (period) => {
          cleanup() // Clean up before each iteration
          
          render(<BillingToggle value={period} onChange={jest.fn()} />)

          // Both labels should always be present
          expect(screen.getByText('Mensuel')).toBeInTheDocument()
          expect(screen.getByText('Annuel')).toBeInTheDocument()
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * The toggle should have correct accessibility attributes for any state.
   */
  describe('Accessibility attributes consistency', () => {
    it('should have correct aria-label for any billing period', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (period) => {
          cleanup() // Clean up before each iteration
          
          render(<BillingToggle value={period} onChange={jest.fn()} />)

          const switchElement = screen.getByRole('switch')
          const expectedLabel =
            period === 'yearly' ? 'Basculer vers mensuel' : 'Basculer vers annuel'

          expect(switchElement).toHaveAttribute('aria-label', expectedLabel)
        }),
        { numRuns: 100 }
      )
    })

    it('should have role="switch" for any billing period', () => {
      fc.assert(
        fc.property(billingPeriodArbitrary, (period) => {
          cleanup() // Clean up before each iteration
          
          render(<BillingToggle value={period} onChange={jest.fn()} />)

          const switchElement = screen.getByRole('switch')
          expect(switchElement).toBeInTheDocument()
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * Double-toggling should return to the original state.
   */
  describe('Double toggle idempotency', () => {
    it('should return to original state after double toggle', () => {
      fc.assert(
        fc.property(
          billingPeriodArbitrary,
          fc.constantFrom('click', 'enter', 'space'),
          (initialPeriod, operation) => {
            cleanup() // Clean up before each iteration
            
            let currentValue = initialPeriod
            const handleChange = jest.fn((newValue: BillingPeriod) => {
              currentValue = newValue
            })

            const { rerender } = render(
              <BillingToggle value={currentValue} onChange={handleChange} />
            )

            const switchElement = screen.getByRole('switch')

            // First toggle
            performToggleOperation(switchElement, operation)
            rerender(<BillingToggle value={currentValue} onChange={handleChange} />)

            // Second toggle
            performToggleOperation(switchElement, operation)
            rerender(<BillingToggle value={currentValue} onChange={handleChange} />)

            // Should be back to initial state
            expect(currentValue).toBe(initialPeriod)
            expect(handleChange).toHaveBeenCalledTimes(2)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * **Validates: Requirements 5.2**
   *
   * Mixed keyboard and click operations should behave consistently.
   */
  describe('Mixed operation consistency', () => {
    it('should handle mixed click and keyboard operations consistently', () => {
      fc.assert(
        fc.property(
          billingPeriodArbitrary,
          fc.array(toggleOperationArbitrary, { minLength: 2, maxLength: 10 }),
          (initialPeriod, operations) => {
            cleanup() // Clean up before each iteration
            
            let currentValue = initialPeriod
            const handleChange = jest.fn((newValue: BillingPeriod) => {
              currentValue = newValue
            })

            const { rerender } = render(
              <BillingToggle value={currentValue} onChange={handleChange} />
            )

            const switchElement = screen.getByRole('switch')

            // Track expected state
            let expectedValue = initialPeriod
            operations.forEach((operation) => {
              expectedValue = getOppositePeriod(expectedValue)
              performToggleOperation(switchElement, operation)
              rerender(<BillingToggle value={currentValue} onChange={handleChange} />)
            })

            expect(currentValue).toBe(expectedValue)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
