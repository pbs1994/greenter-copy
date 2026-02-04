/**
 * Property-Based Tests for EUR Currency Formatting
 * 
 * Feature: admin-backend
 * Property 3: EUR Currency Formatting
 * 
 * **Validates: Requirements 3.4**
 * 
 * For any monetary value displayed in the admin dashboard, the formatted string 
 * SHALL match the French locale EUR format (e.g., "1 234,56 €" for 123456 cents).
 */

import * as fc from 'fast-check'
import { formatEUR } from '@/lib/format'

/**
 * Arbitrary generator for typical monetary values in cents
 * Covers common e-commerce price ranges (0 to 10 million euros)
 */
const typicalCentsArbitrary = fc.integer({ min: 0, max: 1_000_000_000 }) // 0 to 10M EUR

/**
 * Arbitrary generator for small monetary values (under 1000 EUR)
 */
const smallCentsArbitrary = fc.integer({ min: 0, max: 99_999 }) // 0 to 999.99 EUR

/**
 * Arbitrary generator for large monetary values (1000+ EUR)
 * These should have thousands separators
 */
const largeCentsArbitrary = fc.integer({ min: 100_000, max: 1_000_000_000 }) // 1000+ EUR

/**
 * Arbitrary generator for negative monetary values (refunds, discounts)
 */
const negativeCentsArbitrary = fc.integer({ min: -1_000_000_000, max: -1 })

/**
 * Arbitrary generator for any integer monetary value
 */
const anyCentsArbitrary = fc.integer({ min: -1_000_000_000, max: 1_000_000_000 })

/**
 * Helper function to check if output ends with Euro symbol
 * French locale places € at the end with a non-breaking space before it
 */
function endsWithEuroSymbol(formatted: string): boolean {
  return formatted.endsWith('€')
}

/**
 * Helper function to check if output uses comma as decimal separator
 * French locale uses comma for decimal separator
 */
function usesCommaAsDecimalSeparator(formatted: string): boolean {
  // The format should have a comma followed by exactly 2 digits before the space and €
  // Pattern: ...X,XX € or ...X,XX €
  return /,\d{2}\s*€$/.test(formatted)
}

/**
 * Helper function to check if output uses space as thousands separator
 * French locale uses non-breaking space (U+00A0) or regular space as thousands separator
 */
function usesSpaceAsThousandsSeparator(formatted: string): boolean {
  // Remove the currency symbol and decimal part to check thousands separator
  // French format: "1 234,56 €" - space between thousands
  const withoutCurrency = formatted.replace(/\s*€$/, '').trim()
  const withoutDecimals = withoutCurrency.replace(/,\d{2}$/, '')
  
  // If the number is >= 1000, it should have space separators
  // Check that there are no other separators (like dots or commas in the integer part)
  // The integer part should only contain digits and spaces (or non-breaking spaces)
  return /^-?[\d\s\u00A0]+$/.test(withoutDecimals)
}

/**
 * Helper function to check if output has exactly 2 decimal places
 */
function hasExactlyTwoDecimalPlaces(formatted: string): boolean {
  // Pattern should match: comma followed by exactly 2 digits, then space(s) and €
  return /,\d{2}\s*€$/.test(formatted)
}

/**
 * Helper function to extract the numeric value from formatted string
 * Returns the value in cents for verification
 */
function extractCentsFromFormatted(formatted: string): number {
  // Remove € symbol and any surrounding spaces
  let cleaned = formatted.replace(/\s*€\s*$/, '').trim()
  
  // Remove thousands separators (spaces and non-breaking spaces)
  cleaned = cleaned.replace(/[\s\u00A0]/g, '')
  
  // Replace comma with dot for parsing
  cleaned = cleaned.replace(',', '.')
  
  // Parse and convert back to cents
  const euros = parseFloat(cleaned)
  return Math.round(euros * 100)
}

describe('Property 3: EUR Currency Formatting', () => {
  /**
   * Property: For any monetary value, the formatted output SHALL end with 
   * the Euro symbol (€)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should always end with Euro symbol (€)', () => {
    fc.assert(
      fc.property(
        anyCentsArbitrary,
        (cents) => {
          const formatted = formatEUR(cents)
          return endsWithEuroSymbol(formatted)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any monetary value, the formatted output SHALL use 
   * comma as the decimal separator (French locale)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should use comma as decimal separator', () => {
    fc.assert(
      fc.property(
        anyCentsArbitrary,
        (cents) => {
          const formatted = formatEUR(cents)
          return usesCommaAsDecimalSeparator(formatted)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any monetary value >= 1000 EUR (100000 cents), the formatted 
   * output SHALL use space as thousands separator
   * 
   * **Validates: Requirements 3.4**
   */
  it('should use space as thousands separator for values >= 1000 EUR', () => {
    fc.assert(
      fc.property(
        largeCentsArbitrary,
        (cents) => {
          const formatted = formatEUR(cents)
          return usesSpaceAsThousandsSeparator(formatted)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any monetary value, the formatted output SHALL have 
   * exactly 2 decimal places
   * 
   * **Validates: Requirements 3.4**
   */
  it('should always have exactly 2 decimal places', () => {
    fc.assert(
      fc.property(
        anyCentsArbitrary,
        (cents) => {
          const formatted = formatEUR(cents)
          return hasExactlyTwoDecimalPlaces(formatted)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any negative monetary value, the formatted output SHALL 
   * correctly represent the negative sign
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format negative values correctly', () => {
    fc.assert(
      fc.property(
        negativeCentsArbitrary,
        (cents) => {
          const formatted = formatEUR(cents)
          // Negative values should contain a minus sign or be wrapped in parentheses
          // French locale typically uses minus sign
          return formatted.includes('-') || formatted.includes('(')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any monetary value, the formatted output SHALL preserve 
   * the numeric value (round-trip property)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should preserve the numeric value (round-trip)', () => {
    fc.assert(
      fc.property(
        typicalCentsArbitrary,
        (cents) => {
          const formatted = formatEUR(cents)
          const extracted = extractCentsFromFormatted(formatted)
          return extracted === cents
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any small monetary value (< 1000 EUR), the formatted output 
   * SHALL not have thousands separators in the integer part
   * 
   * **Validates: Requirements 3.4**
   */
  it('should not have thousands separators for values < 1000 EUR', () => {
    fc.assert(
      fc.property(
        smallCentsArbitrary.filter(c => c < 100_000), // Less than 1000 EUR
        (cents) => {
          const formatted = formatEUR(cents)
          // Remove the decimal part and currency symbol
          const withoutCurrency = formatted.replace(/\s*€$/, '').trim()
          const integerPart = withoutCurrency.replace(/,\d{2}$/, '')
          
          // For values < 1000, integer part should not contain spaces
          // (except for the minus sign area for negative numbers)
          const cleanedInteger = integerPart.replace(/^-\s*/, '-')
          return !/[\s\u00A0]/.test(cleanedInteger.replace(/^-/, ''))
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for zero value formatting
 */
describe('Zero Value Formatting', () => {
  /**
   * Test: Zero cents should format as "0,00 €"
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format zero correctly', () => {
    const formatted = formatEUR(0)
    
    expect(formatted).toMatch(/0,00\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })
})

/**
 * Specific tests for example values from requirements
 */
describe('Example Values from Requirements', () => {
  /**
   * Test: 123456 cents should format as "1 234,56 €"
   * This is the example given in the design document
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format 123456 cents as "1 234,56 €"', () => {
    const formatted = formatEUR(123456)
    
    // Check the structure matches French locale EUR format
    expect(formatted).toMatch(/1[\s\u00A0]234,56\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(usesCommaAsDecimalSeparator(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })

  /**
   * Test: 100 cents should format as "1,00 €"
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format 100 cents as "1,00 €"', () => {
    const formatted = formatEUR(100)
    
    expect(formatted).toMatch(/1,00\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })

  /**
   * Test: 1 cent should format as "0,01 €"
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format 1 cent as "0,01 €"', () => {
    const formatted = formatEUR(1)
    
    expect(formatted).toMatch(/0,01\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })

  /**
   * Test: 99 cents should format as "0,99 €"
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format 99 cents as "0,99 €"', () => {
    const formatted = formatEUR(99)
    
    expect(formatted).toMatch(/0,99\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })
})

/**
 * Edge case tests for currency formatting
 */
describe('Currency Formatting Edge Cases', () => {
  /**
   * Test: Very large values should format correctly with multiple thousands separators
   * 
   * **Validates: Requirements 3.4**
   */
  it('should handle very large values (millions)', () => {
    const formatted = formatEUR(123456789) // 1,234,567.89 EUR
    
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(usesCommaAsDecimalSeparator(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
    expect(usesSpaceAsThousandsSeparator(formatted)).toBe(true)
  })

  /**
   * Test: Negative values should format correctly
   * 
   * **Validates: Requirements 3.4**
   */
  it('should handle negative values', () => {
    const formatted = formatEUR(-12345) // -123.45 EUR
    
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(usesCommaAsDecimalSeparator(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
    expect(formatted).toMatch(/-/)
  })

  /**
   * Test: Large negative values should format correctly
   * 
   * **Validates: Requirements 3.4**
   */
  it('should handle large negative values', () => {
    const formatted = formatEUR(-123456789) // -1,234,567.89 EUR
    
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(usesCommaAsDecimalSeparator(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
    expect(formatted).toMatch(/-/)
  })

  /**
   * Test: Boundary value at 1000 EUR (100000 cents)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format 1000 EUR correctly with thousands separator', () => {
    const formatted = formatEUR(100000) // 1000.00 EUR
    
    expect(formatted).toMatch(/1[\s\u00A0]000,00\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })

  /**
   * Test: Value just under 1000 EUR (99999 cents = 999.99 EUR)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format 999.99 EUR correctly without thousands separator', () => {
    const formatted = formatEUR(99999) // 999.99 EUR
    
    expect(formatted).toMatch(/999,99\s*€$/)
    expect(endsWithEuroSymbol(formatted)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(formatted)).toBe(true)
  })
})

/**
 * Real-world e-commerce price tests
 */
describe('Real-world E-commerce Prices', () => {
  /**
   * Test: Typical product prices
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format typical product prices correctly', () => {
    // KSTAR battery price example: 5990 EUR
    const batteryPrice = formatEUR(599000)
    expect(batteryPrice).toMatch(/5[\s\u00A0]990,00\s*€$/)
    
    // Small accessory: 29.99 EUR
    const accessoryPrice = formatEUR(2999)
    expect(accessoryPrice).toMatch(/29,99\s*€$/)
    
    // Installation service: 1500 EUR
    const servicePrice = formatEUR(150000)
    expect(servicePrice).toMatch(/1[\s\u00A0]500,00\s*€$/)
  })

  /**
   * Test: Order totals with multiple items
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format order totals correctly', () => {
    // Order total: 7,519.99 EUR
    const orderTotal = formatEUR(751999)
    expect(orderTotal).toMatch(/7[\s\u00A0]519,99\s*€$/)
    expect(endsWithEuroSymbol(orderTotal)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(orderTotal)).toBe(true)
  })

  /**
   * Test: Dashboard total sales (large amounts)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should format dashboard total sales correctly', () => {
    // Total sales: 125,430.50 EUR
    const totalSales = formatEUR(12543050)
    expect(totalSales).toMatch(/125[\s\u00A0]430,50\s*€$/)
    expect(endsWithEuroSymbol(totalSales)).toBe(true)
    expect(hasExactlyTwoDecimalPlaces(totalSales)).toBe(true)
  })
})

/**
 * Consistency property tests
 */
describe('Formatting Consistency Properties', () => {
  /**
   * Property: Formatting should be deterministic - same input always produces same output
   * 
   * **Validates: Requirements 3.4**
   */
  it('should be deterministic (same input produces same output)', () => {
    fc.assert(
      fc.property(
        anyCentsArbitrary,
        (cents) => {
          const formatted1 = formatEUR(cents)
          const formatted2 = formatEUR(cents)
          const formatted3 = formatEUR(cents)
          return formatted1 === formatted2 && formatted2 === formatted3
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: Larger values should produce longer or equal length strings
   * (accounting for negative sign)
   * 
   * **Validates: Requirements 3.4**
   */
  it('should produce longer strings for larger absolute values', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100_000_000 }),
        fc.integer({ min: 1, max: 1000 }),
        (baseCents, multiplier) => {
          const smallValue = baseCents
          const largeValue = baseCents * multiplier
          
          if (largeValue <= smallValue) return true // Skip if overflow or no increase
          
          const smallFormatted = formatEUR(smallValue)
          const largeFormatted = formatEUR(largeValue)
          
          // Remove spaces for length comparison (thousands separators add length)
          const smallClean = smallFormatted.replace(/[\s\u00A0]/g, '')
          const largeClean = largeFormatted.replace(/[\s\u00A0]/g, '')
          
          return largeClean.length >= smallClean.length
        }
      ),
      { numRuns: 100 }
    )
  })
})
