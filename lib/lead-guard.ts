/**
 * Server-side plausibility checks for lead forms (/api/contact).
 *
 * Bots post straight to the API, so every check done in the browser
 * (honeypot, required fields) must be repeated here. These rules reject
 * the garbage we actually receive — 20-digit "phone numbers", names made of
 * random letters and digits — without blocking real French prospects.
 */

/** French number (0X XX XX XX XX, +33, 0033) or an international E.164 number. */
export function isPlausiblePhone(raw: string): boolean {
  const compact = raw.replace(/[\s./-]/g, '').replace(/^(\+33|0033)\(0\)/, '$1').replace(/[()]/g, '')
  if (/^(?:\+33|0033|0)[1-9]\d{8}$/.test(compact)) return true
  return /^(?:\+|00)(?!33)[1-9]\d{7,13}$/.test(compact)
}

/**
 * Rejects keyboard-mash names ("ujuucduu6jcruyjyduuuffuuj6cfdy…"): no real
 * name or company has a 26+ character word. Deliberately loose otherwise —
 * some forms send "Nom — Société" or a fixed label such as
 * "Demande de rappel Isolation 1€" as the name.
 */
export function isPlausibleName(raw: string): boolean {
  const name = raw.trim()
  if (name.length < 2 || name.length > 120) return false
  return name.split(/\s+/).every((word) => word.length <= 25)
}
