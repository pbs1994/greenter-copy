import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Hook to auto-generate unique order numbers
 * 
 * Format: GRN-YYYYMMDD-XXXX
 * - GRN: Greenter prefix
 * - YYYYMMDD: Current date
 * - XXXX: Random 4-character alphanumeric suffix for uniqueness
 * 
 * @validates Requirements 6.1
 */
export const generateOrderNumber: CollectionBeforeChangeHook = async ({
  data,
  operation,
}) => {
  // Only generate order number on create and if not already provided
  if (operation === 'create' && !data?.order_number) {
    const orderNumber = generateUniqueOrderNumber()
    return {
      ...data,
      order_number: orderNumber,
    }
  }

  return data
}

/**
 * Generates a unique order number in format GRN-YYYYMMDD-XXXX
 */
export function generateUniqueOrderNumber(): string {
  const now = new Date()
  const dateStr = formatDate(now)
  const suffix = generateRandomSuffix(4)
  
  return `GRN-${dateStr}-${suffix}`
}

/**
 * Formats a date as YYYYMMDD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}${month}${day}`
}

/**
 * Generates a random alphanumeric suffix
 */
function generateRandomSuffix(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  
  return result
}
