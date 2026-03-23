/**
 * Unit Tests for StickyCTA Component
 *
 * Tests the sticky CTA button that appears on mobile after scrolling.
 *
 * **Validates: Requirements 5.1, 5.2**
 */

import { render, screen, fireEvent, act } from '@testing-library/react'
import StickyCTA from '@/components/StickyCTA'

// Mock window properties
const mockScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    value,
    writable: true,
    configurable: true,
  })
}

const mockInnerHeight = (value: number) => {
  Object.defineProperty(window, 'innerHeight', {
    value,
    writable: true,
    configurable: true,
  })
}

// Mock scrollIntoView
const mockScrollIntoView = jest.fn()

describe('StickyCTA', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockScrollY(0)
    mockInnerHeight(800)
    mockScrollIntoView.mockClear()
    
    // Mock scrollIntoView on Element prototype
    Element.prototype.scrollIntoView = mockScrollIntoView
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  /**
   * Requirement 5.1: Sticky CTA appears after scroll
   * Component should be hidden initially (before scrolling 100vh)
   */
  it('should be hidden initially before scrolling 100vh', () => {
    mockScrollY(0)
    mockInnerHeight(800)

    render(<StickyCTA targetId="quote-form" />)

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-full')
  })

  /**
   * Requirement 5.1: Sticky CTA appears after scroll
   * Component should become visible after scrolling past 100vh
   */
  it('should become visible after scrolling past 100vh', () => {
    mockScrollY(0)
    mockInnerHeight(800)

    render(<StickyCTA targetId="quote-form" />)

    // Simulate scroll past 100vh (800px)
    act(() => {
      mockScrollY(850)
      window.dispatchEvent(new Event('scroll'))
    })

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-0')
    expect(ctaContainer).not.toHaveClass('translate-y-full')
  })

  /**
   * Requirement 5.1: Sticky CTA visibility based on scroll
   * Component should hide again when scrolling back up
   */
  it('should hide again when scrolling back up above 100vh', () => {
    mockScrollY(0)
    mockInnerHeight(800)

    render(<StickyCTA targetId="quote-form" />)

    // First scroll down past 100vh
    act(() => {
      mockScrollY(850)
      window.dispatchEvent(new Event('scroll'))
    })

    // Verify it's visible
    let ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-0')

    // Scroll back up
    act(() => {
      mockScrollY(400)
      window.dispatchEvent(new Event('scroll'))
    })

    // Verify it's hidden again
    ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-full')
  })

  /**
   * Requirement 5.2: Sticky CTA scrolls to form
   * Clicking the button should trigger smooth scroll to target element
   */
  it('should trigger smooth scroll to target element when clicked', () => {
    mockScrollY(850)
    mockInnerHeight(800)

    // Create a target element
    const targetElement = document.createElement('div')
    targetElement.id = 'quote-form'
    document.body.appendChild(targetElement)

    render(<StickyCTA targetId="quote-form" />)

    // Make component visible
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Click the button
    const button = screen.getByRole('button', { name: /devis gratuit/i })
    fireEvent.click(button)

    // Verify scrollIntoView was called with smooth behavior
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    // Cleanup
    document.body.removeChild(targetElement)
  })

  /**
   * Requirement 5.1: Mobile-only visibility
   * Component should have correct CSS classes for mobile-only visibility (md:hidden)
   */
  it('should have md:hidden class for mobile-only visibility', () => {
    render(<StickyCTA targetId="quote-form" />)

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('md:hidden')
  })

  /**
   * Component should be fixed at the bottom of the screen
   */
  it('should be fixed at the bottom of the screen', () => {
    render(<StickyCTA targetId="quote-form" />)

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('fixed')
    expect(ctaContainer).toHaveClass('bottom-0')
    expect(ctaContainer).toHaveClass('left-0')
    expect(ctaContainer).toHaveClass('right-0')
  })

  /**
   * Component should have high z-index for proper stacking
   */
  it('should have high z-index for proper stacking', () => {
    render(<StickyCTA targetId="quote-form" />)

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('z-50')
  })

  /**
   * Component should have smooth transition for visibility changes
   */
  it('should have transition classes for smooth animation', () => {
    render(<StickyCTA targetId="quote-form" />)

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('transition-transform')
    expect(ctaContainer).toHaveClass('duration-300')
  })

  /**
   * Button should display "Devis gratuit" text
   */
  it('should display "Devis gratuit" button text', () => {
    render(<StickyCTA targetId="quote-form" />)

    expect(screen.getByRole('button', { name: /devis gratuit/i })).toBeInTheDocument()
  })

  /**
   * Component should accept custom className prop
   */
  it('should accept and apply custom className prop', () => {
    render(<StickyCTA targetId="quote-form" className="custom-class" />)

    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('custom-class')
  })

  /**
   * Component should handle missing target element gracefully
   */
  it('should handle missing target element gracefully without errors', () => {
    mockScrollY(850)
    mockInnerHeight(800)

    render(<StickyCTA targetId="non-existent-element" />)

    // Make component visible
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Click the button - should not throw
    const button = screen.getByRole('button', { name: /devis gratuit/i })
    expect(() => fireEvent.click(button)).not.toThrow()

    // scrollIntoView should not be called since element doesn't exist
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  /**
   * Component should check initial scroll position on mount
   */
  it('should check initial scroll position on mount', () => {
    // Set scroll position before rendering
    mockScrollY(1000)
    mockInnerHeight(800)

    render(<StickyCTA targetId="quote-form" />)

    // Component should be visible immediately since we're already scrolled past 100vh
    const ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-0')
  })

  /**
   * Component should clean up scroll event listener on unmount
   */
  it('should clean up scroll event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<StickyCTA targetId="quote-form" />)

    // Verify scroll listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })

    // Unmount component
    unmount()

    // Verify scroll listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  /**
   * Component should be visible at exactly 100vh + 1px scroll
   */
  it('should become visible at exactly 100vh + 1px scroll', () => {
    mockScrollY(0)
    mockInnerHeight(800)

    render(<StickyCTA targetId="quote-form" />)

    // Scroll to exactly 100vh (should still be hidden)
    act(() => {
      mockScrollY(800)
      window.dispatchEvent(new Event('scroll'))
    })

    let ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-full')

    // Scroll to 100vh + 1px (should be visible)
    act(() => {
      mockScrollY(801)
      window.dispatchEvent(new Event('scroll'))
    })

    ctaContainer = screen.getByRole('button', { name: /devis gratuit/i }).closest('div[class*="fixed"]')
    expect(ctaContainer).toHaveClass('translate-y-0')
  })
})
