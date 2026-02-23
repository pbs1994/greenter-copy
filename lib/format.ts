/**
 * Currency formatting utilities for the admin panel.
 * All monetary values are displayed in EUR format with French locale.
 * 
 * @module lib/format
 */

/**
 * Formats a monetary value from cents to EUR with French locale.
 * 
 * French locale EUR format uses:
 * - Non-breaking space (U+00A0) as thousands separator
 * - Comma as decimal separator
 * - Euro symbol (€) at the end
 * 
 * @param cents - The monetary value in cents (e.g., 123456 for €1,234.56)
 * @returns Formatted string in French EUR format (e.g., "1 234,56 €")
 * 
 * @example
 * formatEUR(123456) // Returns "1 234,56 €"
 * formatEUR(100)    // Returns "1,00 €"
 * formatEUR(0)      // Returns "0,00 €"
 * 
 * @validates Requirements 3.4 - Dashboard SHALL display all monetary values in EUR format with French locale
 */
export function formatEUR(cents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}
