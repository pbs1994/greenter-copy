/**
 * Shared pricing constants for product pages.
 * Single source of truth for discount rates and default prices.
 */

/** Discount multiplier for extra batteries (beyond the first one): ~15% off */
export const EXTRA_BATTERY_DISCOUNT = 0.857

/** Default product prices in cents (used as fallback if DB unavailable) */
export const DEFAULT_PRODUCT_PRICES = {
  inverter: 249900,
  battery: 349900,
}

/** Calculate extra battery price from base battery price */
export function getExtraBatteryPrice(batteryPrice: number): number {
  return Math.round(batteryPrice * EXTRA_BATTERY_DISCOUNT)
}
