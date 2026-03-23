/**
 * Property-Based Tests for PAC Landing Page
 *
 * Feature: pac-landing-page-optimization
 * Property 1: Form submission with valid data triggers API call and success message
 *
 * **Validates: Requirements 1.3**
 *
 * For any valid form data (non-empty name, valid phone, valid email, selected project type,
 * valid postal code, empty honeypot), submitting the form should result in a POST request
 * to `/api/contact` and display a success confirmation message.
 */

import * as fc from 'fast-check'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import HeroQuoteForm from '@/components/HeroQuoteForm'
import PompeAChaleurPage from '@/app/(public)/services/pompe-a-chaleur/page'
import { CITIES } from '@/lib/local-seo-data'

// Track fetch calls
let fetchCalls: { url: string; options: RequestInit }[] = []

// Mock global fetch
const mockFetch = jest.fn()

beforeEach(() => {
  fetchCalls = []
  mockFetch.mockReset()
  mockFetch.mockImplementation((url: string, options?: RequestInit) => {
    fetchCalls.push({ url, options: options || {} })
    return Promise.resolve({
      ok: true,
      json: async () => ({}),
    })
  })
  global.fetch = mockFetch
})

afterEach(() => {
  jest.restoreAllMocks()
})

/**
 * Arbitrary generator for valid French phone numbers
 * Format: 0X XX XX XX XX where X is a digit and first digit after 0 is 1-9
 */
const validFrenchPhoneArbitrary = fc
  .tuple(
    fc.constantFrom('1', '2', '3', '4', '5', '6', '7', '8', '9'),
    fc.array(fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), {
      minLength: 8,
      maxLength: 8,
    })
  )
  .map(([firstDigit, rest]) => `0${firstDigit}${rest.join('')}`)

/**
 * Arbitrary generator for valid French postal codes (5 digits)
 */
const validPostalCodeArbitrary = fc
  .array(fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), {
    minLength: 5,
    maxLength: 5,
  })
  .map((digits) => digits.join(''))

/**
 * Arbitrary generator for valid project types
 */
const validProjectTypeArbitrary = fc.constantFrom(
  'pac-air-eau',
  'pac-air-air',
  'pac-geo',
  'ne-sait-pas'
)

/**
 * Arbitrary generator for valid non-empty names (alphanumeric to avoid special chars issues)
 */
const validNameArbitrary = fc
  .array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')), {
    minLength: 2,
    maxLength: 30,
  })
  .map((chars) => chars.join('').trim())
  .filter((s) => s.length > 0)

/**
 * Arbitrary generator for valid email addresses
 */
const validEmailArbitrary = fc.emailAddress()

/**
 * Arbitrary generator for complete valid form data
 */
const validFormDataArbitrary = fc.record({
  name: validNameArbitrary,
  phone: validFrenchPhoneArbitrary,
  email: validEmailArbitrary,
  projectType: validProjectTypeArbitrary,
  postalCode: validPostalCodeArbitrary,
})

/**
 * Helper function to fill and submit the form
 */
async function fillAndSubmitForm(formData: {
  name: string
  phone: string
  email: string
  projectType: string
  postalCode: string
}): Promise<void> {
  // Fill name field
  const nameInput = screen.getByLabelText(/nom complet/i)
  await act(async () => {
    fireEvent.change(nameInput, { target: { value: formData.name } })
  })

  // Fill phone field
  const phoneInput = screen.getByLabelText(/téléphone/i)
  await act(async () => {
    fireEvent.change(phoneInput, { target: { value: formData.phone } })
  })

  // Fill email field
  const emailInput = screen.getByLabelText(/email/i)
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: formData.email } })
  })

  // Select project type
  const projectSelect = screen.getByLabelText(/type de projet/i)
  await act(async () => {
    fireEvent.change(projectSelect, { target: { value: formData.projectType } })
  })

  // Fill postal code
  const postalCodeInput = screen.getByLabelText(/code postal/i)
  await act(async () => {
    fireEvent.change(postalCodeInput, { target: { value: formData.postalCode } })
  })

  // Submit form
  const submitButton = screen.getByRole('button', { name: /recevoir mon devis/i })
  await act(async () => {
    fireEvent.click(submitButton)
  })
}

/**
 * Helper function to fill the honeypot field
 */
async function fillHoneypotField(value: string): Promise<void> {
  const honeypotInput = document.getElementById('honeypot') as HTMLInputElement
  if (honeypotInput) {
    await act(async () => {
      fireEvent.change(honeypotInput, { target: { value } })
    })
  }
}

describe('PAC Landing Page Properties', () => {
  describe('Property 1: Form submission with valid data triggers API call and success message', () => {
    /**
     * Property: For any valid form data, submitting the form should call the API
     * with the correct endpoint and method, and display a success message
     *
     * **Validates: Requirements 1.3**
     */
    it(
      'should call /api/contact with POST method and show success for any valid form data',
      async () => {
        await fc.assert(
          fc.asyncProperty(validFormDataArbitrary, async (formData) => {
            // Reset state
            fetchCalls = []
            mockFetch.mockClear()
            mockFetch.mockImplementation((url: string, options?: RequestInit) => {
              fetchCalls.push({ url, options: options || {} })
              return Promise.resolve({
                ok: true,
                json: async () => ({}),
              })
            })

            // Render fresh component
            const { unmount } = render(<HeroQuoteForm />)

            // Fill and submit form
            await fillAndSubmitForm(formData)

            // Wait for API call and success message
            await waitFor(
              () => {
                expect(fetchCalls.length).toBeGreaterThan(0)
              },
              { timeout: 3000 }
            )

            // Verify API was called with correct endpoint
            expect(fetchCalls[0].url).toBe('/api/contact')
            expect(fetchCalls[0].options.method).toBe('POST')

            // Wait for success message
            await waitFor(
              () => {
                expect(screen.getByText(/demande envoyée/i)).toBeInTheDocument()
              },
              { timeout: 3000 }
            )

            // Cleanup
            unmount()
          }),
          { numRuns: 100 }
        )
      },
      120000
    )

    /**
     * Property: For any valid form data, the API payload should contain
     * the submitted name, email, phone, and service
     *
     * **Validates: Requirements 1.3**
     */
    it(
      'should include form data in API payload for any valid submission',
      async () => {
        await fc.assert(
          fc.asyncProperty(validFormDataArbitrary, async (formData) => {
            // Reset state
            fetchCalls = []
            mockFetch.mockClear()
            mockFetch.mockImplementation((url: string, options?: RequestInit) => {
              fetchCalls.push({ url, options: options || {} })
              return Promise.resolve({
                ok: true,
                json: async () => ({}),
              })
            })

            // Render fresh component
            const { unmount } = render(<HeroQuoteForm />)

            // Fill and submit form
            await fillAndSubmitForm(formData)

            // Wait for API call
            await waitFor(
              () => {
                expect(fetchCalls.length).toBeGreaterThan(0)
              },
              { timeout: 3000 }
            )

            // Parse the request body
            const body = JSON.parse(fetchCalls[0].options.body as string)

            // Verify payload contains the form data
            expect(body.name).toBe(formData.name)
            expect(body.email).toBe(formData.email)
            expect(body.phone).toBe(formData.phone)
            expect(body.service).toBe(formData.projectType)

            // Verify Content-Type header
            const headers = fetchCalls[0].options.headers as Record<string, string>
            expect(headers['Content-Type']).toBe('application/json')

            // Cleanup
            unmount()
          }),
          { numRuns: 100 }
        )
      },
      120000
    )
  })

  /**
   * Property 2: Honeypot protection prevents bot submissions
   *
   * For any form submission where the honeypot field contains any non-empty value,
   * the form should display a fake success message without making any API call to `/api/contact`.
   *
   * **Validates: Requirements 1.4**
   */
  describe('Property 2: Honeypot protection prevents bot submissions', () => {
    /**
     * Arbitrary generator for non-empty honeypot values (bot-like input)
     */
    const nonEmptyHoneypotArbitrary = fc.string({ minLength: 1, maxLength: 100 })

    /**
     * Property: For any non-empty honeypot value, the API should NOT be called
     * but a fake success message should still be displayed (to not alert bots)
     *
     * **Validates: Requirements 1.4**
     */
    it(
      'should not call API when honeypot is filled but still show success message',
      async () => {
        await fc.assert(
          fc.asyncProperty(
            validFormDataArbitrary,
            nonEmptyHoneypotArbitrary,
            async (formData, honeypotValue) => {
              // Reset state
              fetchCalls = []
              mockFetch.mockClear()
              mockFetch.mockImplementation((url: string, options?: RequestInit) => {
                fetchCalls.push({ url, options: options || {} })
                return Promise.resolve({
                  ok: true,
                  json: async () => ({}),
                })
              })

              // Render fresh component
              const { unmount } = render(<HeroQuoteForm />)

              // Fill the form with valid data
              await fillAndSubmitForm(formData)

              // Wait for the form to be ready, then fill honeypot and resubmit
              // We need to reset and fill honeypot before submission
              unmount()

              // Re-render and fill honeypot BEFORE submitting
              const { unmount: unmount2 } = render(<HeroQuoteForm />)

              // Fill honeypot field first (this is what a bot would do)
              await fillHoneypotField(honeypotValue)

              // Fill the rest of the form
              const nameInput = screen.getByLabelText(/nom complet/i)
              await act(async () => {
                fireEvent.change(nameInput, { target: { value: formData.name } })
              })

              const phoneInput = screen.getByLabelText(/téléphone/i)
              await act(async () => {
                fireEvent.change(phoneInput, { target: { value: formData.phone } })
              })

              const emailInput = screen.getByLabelText(/email/i)
              await act(async () => {
                fireEvent.change(emailInput, { target: { value: formData.email } })
              })

              const projectSelect = screen.getByLabelText(/type de projet/i)
              await act(async () => {
                fireEvent.change(projectSelect, { target: { value: formData.projectType } })
              })

              const postalCodeInput = screen.getByLabelText(/code postal/i)
              await act(async () => {
                fireEvent.change(postalCodeInput, { target: { value: formData.postalCode } })
              })

              // Reset fetch calls before submission
              fetchCalls = []
              mockFetch.mockClear()

              // Submit form
              const submitButton = screen.getByRole('button', { name: /recevoir mon devis/i })
              await act(async () => {
                fireEvent.click(submitButton)
              })

              // Wait for success message to appear (fake success for bots)
              await waitFor(
                () => {
                  expect(screen.getByText(/demande envoyée/i)).toBeInTheDocument()
                },
                { timeout: 3000 }
              )

              // Verify API was NOT called (honeypot protection)
              expect(fetchCalls.length).toBe(0)
              expect(mockFetch).not.toHaveBeenCalled()

              // Cleanup
              unmount2()
            }
          ),
          { numRuns: 100 }
        )
      },
      120000
    )
  })

  /**
   * Property 3: Loading state disables form during submission
   *
   * For any form submission in progress, the submit button should be disabled
   * and a loading indicator should be visible until the submission completes.
   *
   * **Validates: Requirements 1.5**
   */
  describe('Property 3: Loading state disables form during submission', () => {
    /**
     * Property: For any valid form data, during submission the button should be
     * disabled and loading indicator ("Envoi en cours...") should be visible.
     * After completion, the button should be re-enabled or success state shown.
     *
     * **Validates: Requirements 1.5**
     */
    it(
      'should disable button and show loading indicator during submission',
      async () => {
        await fc.assert(
          fc.asyncProperty(validFormDataArbitrary, async (formData) => {
            // Create a deferred promise to control when fetch resolves
            let resolvePromise: () => void
            const fetchPromise = new Promise<void>((resolve) => {
              resolvePromise = resolve
            })

            // Reset state
            fetchCalls = []
            mockFetch.mockClear()
            mockFetch.mockImplementation((url: string, options?: RequestInit) => {
              fetchCalls.push({ url, options: options || {} })
              // Return a promise that we control
              return fetchPromise.then(() => ({
                ok: true,
                json: async () => ({}),
              }))
            })

            // Render fresh component
            const { unmount } = render(<HeroQuoteForm />)

            // Fill form fields
            const nameInput = screen.getByLabelText(/nom complet/i)
            await act(async () => {
              fireEvent.change(nameInput, { target: { value: formData.name } })
            })

            const phoneInput = screen.getByLabelText(/téléphone/i)
            await act(async () => {
              fireEvent.change(phoneInput, { target: { value: formData.phone } })
            })

            const emailInput = screen.getByLabelText(/email/i)
            await act(async () => {
              fireEvent.change(emailInput, { target: { value: formData.email } })
            })

            const projectSelect = screen.getByLabelText(/type de projet/i)
            await act(async () => {
              fireEvent.change(projectSelect, { target: { value: formData.projectType } })
            })

            const postalCodeInput = screen.getByLabelText(/code postal/i)
            await act(async () => {
              fireEvent.change(postalCodeInput, { target: { value: formData.postalCode } })
            })

            // Get submit button before submission
            const submitButton = screen.getByRole('button', { name: /recevoir mon devis/i })

            // Verify button is enabled before submission
            expect(submitButton).not.toBeDisabled()

            // Submit form (don't await - we want to check loading state)
            await act(async () => {
              fireEvent.click(submitButton)
            })

            // Verify loading state is shown
            await waitFor(
              () => {
                // Button should be disabled during loading
                const loadingButton = screen.getByRole('button')
                expect(loadingButton).toBeDisabled()

                // Loading text should be visible
                expect(screen.getByText(/envoi en cours/i)).toBeInTheDocument()
              },
              { timeout: 1000 }
            )

            // Now resolve the fetch promise to complete submission
            await act(async () => {
              resolvePromise!()
              // Small delay to let React process the state update
              await new Promise((r) => setTimeout(r, 100))
            })

            // After completion, verify success state is shown
            await waitFor(
              () => {
                expect(screen.getByText(/demande envoyée/i)).toBeInTheDocument()
              },
              { timeout: 3000 }
            )

            // Cleanup
            unmount()
          }),
          { numRuns: 100 }
        )
      },
      120000
    )
  })

  /**
   * Property 4: Unique H1 contains required SEO keywords
   *
   * For any rendered landing page, there should be exactly one H1 element,
   * and it should contain both "pompe à chaleur" (case-insensitive) and
   * a location reference (Ozoir-la-Ferrière or Seine-et-Marne).
   *
   * **Validates: Requirements 4.1**
   */
  describe('Property 4: Unique H1 contains required SEO keywords', () => {
    /**
     * Property: The page should have exactly one H1 element containing
     * the required SEO keywords for pompe à chaleur and location.
     *
     * Note: This is more of a unit test than a property test since there's
     * no random input generation, but it validates an important SEO property.
     *
     * **Validates: Requirements 4.1**
     */
    it('should have exactly one H1 with required keywords', () => {
      // Render the full page
      const { container } = render(<PompeAChaleurPage />)

      // Find all H1 elements on the page
      const h1Elements = container.querySelectorAll('h1')

      // Assert there is exactly one H1
      expect(h1Elements.length).toBe(1)

      // Get the H1 text content
      const h1Text = h1Elements[0].textContent || ''
      const h1TextLower = h1Text.toLowerCase()

      // Assert H1 contains "pompe à chaleur" (case-insensitive)
      expect(h1TextLower).toContain('pompe à chaleur')

      // Assert H1 contains a location reference (Seine-et-Marne)
      // Note: The new design uses "Seine-et-Marne" in the H1
      const hasSeineMarne = h1TextLower.includes('seine-et-marne') || h1TextLower.includes('seine et marne')
      
      expect(hasSeineMarne).toBe(true)
    })
  })

  /**
   * Property 5: Heading hierarchy follows logical order
   *
   * For any rendered landing page, the heading elements (H1-H6) should follow
   * a logical hierarchy without skipping levels (e.g., H1 → H2 → H3, not H1 → H3).
   *
   * **Validates: Requirements 4.2**
   */
  describe('Property 5: Heading hierarchy follows logical order', () => {
    /**
     * Helper function to extract heading level from tag name
     * @param tagName - The HTML tag name (e.g., 'H1', 'H2')
     * @returns The heading level as a number (1-6)
     */
    function getHeadingLevel(tagName: string): number {
      return parseInt(tagName.charAt(1), 10)
    }

    /**
     * Helper function to check if heading hierarchy is valid
     * A valid hierarchy means:
     * 1. The first heading should be H1
     * 2. No level should be skipped (e.g., H1 → H3 without H2 is invalid)
     * 3. Going from a higher level to a lower level is always valid (e.g., H3 → H2)
     *
     * @param headings - Array of heading elements in document order
     * @returns Object with isValid boolean and error message if invalid
     */
    function validateHeadingHierarchy(headings: Element[]): { isValid: boolean; error?: string } {
      if (headings.length === 0) {
        return { isValid: false, error: 'No headings found on the page' }
      }

      // Check that the first heading is H1
      const firstHeadingLevel = getHeadingLevel(headings[0].tagName)
      if (firstHeadingLevel !== 1) {
        return {
          isValid: false,
          error: `First heading should be H1, but found H${firstHeadingLevel}`,
        }
      }

      // Track the maximum heading level seen so far
      // This allows us to detect skipped levels
      let maxLevelSeen = 1

      for (let i = 1; i < headings.length; i++) {
        const currentLevel = getHeadingLevel(headings[i].tagName)
        const previousLevel = getHeadingLevel(headings[i - 1].tagName)

        // If we're going deeper (higher number), we can only go one level at a time
        if (currentLevel > previousLevel) {
          // Check if we're skipping a level
          if (currentLevel > previousLevel + 1) {
            return {
              isValid: false,
              error: `Invalid heading hierarchy: H${previousLevel} → H${currentLevel} (skipped H${previousLevel + 1}). ` +
                `Found at heading "${headings[i].textContent?.trim()}"`,
            }
          }
        }

        // Update max level seen
        maxLevelSeen = Math.max(maxLevelSeen, currentLevel)
      }

      return { isValid: true }
    }

    /**
     * Property: The page should maintain a logical heading hierarchy
     * without skipping levels, and the first heading should be H1.
     *
     * This validates proper semantic structure for SEO and accessibility.
     *
     * **Validates: Requirements 4.2**
     */
    it('should maintain logical heading hierarchy without skipping levels', () => {
      // Render the full page
      const { container } = render(<PompeAChaleurPage />)

      // Find all heading elements (H1-H6) in document order
      const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))

      // Validate the heading hierarchy
      const result = validateHeadingHierarchy(headings)

      // Assert the hierarchy is valid
      expect(result.isValid).toBe(true)
      if (!result.isValid) {
        // This will show the error message in test output if it fails
        expect(result.error).toBeUndefined()
      }
    })

    /**
     * Additional test: Verify that all headings are properly nested
     * This test provides more detailed output about the heading structure
     *
     * **Validates: Requirements 4.2**
     */
    it('should have headings in proper document order with no level skips', () => {
      // Render the full page
      const { container } = render(<PompeAChaleurPage />)

      // Find all heading elements in document order
      const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))

      // Extract heading levels and text for debugging
      const headingInfo = headings.map((h) => ({
        level: getHeadingLevel(h.tagName),
        text: h.textContent?.trim().substring(0, 50) || '',
      }))

      // Verify first heading is H1
      expect(headingInfo[0]?.level).toBe(1)

      // Check each transition between headings
      for (let i = 1; i < headingInfo.length; i++) {
        const current = headingInfo[i]
        const previous = headingInfo[i - 1]

        // When going deeper, we can only increase by 1
        if (current.level > previous.level) {
          const levelDiff = current.level - previous.level
          expect(levelDiff).toBeLessThanOrEqual(1)
        }
        // Going shallower (or same level) is always valid
      }
    })
  })

  /**
   * Property 6: City links navigate to correct URLs
   *
   * For any city link in the "Nos interventions par ville" section, clicking the link
   * should navigate to a URL matching the pattern `/services/pompe-a-chaleur/{city-slug}`
   * where `{city-slug}` corresponds to the city's slug from the CITIES data.
   *
   * **Validates: Requirements 7.2**
   */
  describe('Property 6: City links navigate to correct URLs', () => {
    /**
     * Arbitrary generator for cities from the CITIES array
     */
    const cityArbitrary = fc.constantFrom(...CITIES)

    /**
     * Property: For any city from the CITIES data, the corresponding link
     * in the "Nos interventions par ville" section should have an href
     * matching the pattern `/services/pompe-a-chaleur/{city.slug}`
     *
     * **Validates: Requirements 7.2**
     */
    it(
      'should have correct href for all city links',
      () => {
        fc.assert(
          fc.property(cityArbitrary, (city) => {
            // Render the full page
            const { container, unmount } = render(<PompeAChaleurPage />)

            // Find the link for this city by looking for a link containing the city name
            const cityLinks = Array.from(container.querySelectorAll('a'))
            const cityLink = cityLinks.find((link) => {
              const linkText = link.textContent || ''
              return linkText.includes(city.name)
            })

            // Assert the link exists
            expect(cityLink).toBeDefined()

            // Assert the href matches the expected pattern
            const expectedHref = `/services/pompe-a-chaleur/${city.slug}`
            expect(cityLink?.getAttribute('href')).toBe(expectedHref)

            // Cleanup
            unmount()
          }),
          { numRuns: 100 }
        )
      },
      30000
    )

    /**
     * Additional test: Verify all cities from CITIES data have corresponding links
     * This ensures no city is missing from the page
     *
     * **Validates: Requirements 7.2**
     */
    it('should have links for all cities in CITIES data', () => {
      // Render the full page
      const { container } = render(<PompeAChaleurPage />)

      // For each city in CITIES, verify a link exists with the correct href
      CITIES.forEach((city) => {
        const expectedHref = `/services/pompe-a-chaleur/${city.slug}`
        const cityLink = container.querySelector(`a[href="${expectedHref}"]`)

        // Assert the link exists
        expect(cityLink).not.toBeNull()

        // Assert the link contains the city name
        expect(cityLink?.textContent).toContain(city.name)
      })
    })
  })
})
