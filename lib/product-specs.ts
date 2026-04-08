import type { ProductSpec } from '@/types/database'

/**
 * Normalize product specs to a consistent array shape.
 *
 * Accepts:
 *  - The new format: [{label, value, unit?}, ...]
 *  - The legacy object format: {key: "value", ...} (units may be already
 *    embedded in the value, e.g. "5 kW")
 *  - null / undefined / anything weird → []
 *
 * Always returns [{label, value}] where `value` already includes the unit
 * if one was provided. Safe to map directly in templates.
 */
export function normalizeSpecs(
  raw: unknown
): Array<{ label: string; value: string }> {
  if (!raw) return []

  if (Array.isArray(raw)) {
    return raw
      .filter(
        (s): s is ProductSpec =>
          !!s &&
          typeof s === 'object' &&
          'label' in s &&
          'value' in s &&
          typeof (s as ProductSpec).label === 'string' &&
          (s as ProductSpec).value !== undefined &&
          (s as ProductSpec).value !== null
      )
      .map((s) => {
        const value = String(s.value).trim()
        const unit = s.unit ? String(s.unit).trim() : ''
        // Avoid duplicating the unit if the value already ends with it
        const display =
          unit && !value.toLowerCase().endsWith(unit.toLowerCase())
            ? `${value} ${unit}`
            : value
        return { label: s.label, value: display }
      })
  }

  if (typeof raw === 'object') {
    return Object.entries(raw as Record<string, unknown>)
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
      .map(([key, value]) => ({
        label: humanizeKey(key),
        value: String(value),
      }))
  }

  return []
}

/**
 * Convert a snake_case / kebab-case key to a human label.
 * Used as a fallback for legacy specs stored as a flat object.
 */
function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())
}
