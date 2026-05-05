/**
 * HMAC signing for invoice download URLs.
 *
 * Why: a Stripe checkout session ID (`cs_live_…`) is not a secret. It
 * appears in browser history, server logs, analytics, the Google Ads
 * conversion tracker, the order-success URL, etc. Without a signature,
 * anyone who obtains a session ID can hit `/api/invoice/[sessionId]`
 * and download the customer's invoice (containing name, email, phone,
 * billing address). That's a clear PII leak (RGPD-relevant for a French
 * consumer service).
 *
 * The signature binds (sessionId, expiry) using a server-side secret.
 * Without the secret, an attacker cannot forge a valid signature even
 * with the session ID in hand. Expiry caps the blast radius if a signed
 * URL itself is leaked.
 *
 * The shared secret is `INVOICE_SIGNING_SECRET`. We fall back to
 * `STRIPE_WEBHOOK_SECRET` so existing deployments keep working without
 * a new env var, and bail loudly if neither is set.
 */

import crypto from 'crypto'

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30 // 30 days — covers email links

function getSecret(): string {
  const secret = process.env.INVOICE_SIGNING_SECRET || process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error(
      'Missing INVOICE_SIGNING_SECRET (or fallback STRIPE_WEBHOOK_SECRET) — invoice URLs cannot be signed'
    )
  }
  return secret
}

function sign(sessionId: string, expiresAt: number): string {
  return crypto
    .createHmac('sha256', getSecret())
    .update(`${sessionId}.${expiresAt}`)
    .digest('hex')
}

/**
 * Build a signed invoice URL: /api/invoice/{sessionId}?exp=...&sig=...
 * Pass an absolute base URL (e.g. process.env.NEXT_PUBLIC_SITE_URL) or
 * leave undefined to get a relative path suitable for a client `<a>`.
 */
export function buildSignedInvoiceUrl(
  sessionId: string,
  options: { ttlSeconds?: number; baseUrl?: string } = {}
): string {
  const ttl = options.ttlSeconds ?? DEFAULT_TTL_SECONDS
  const expiresAt = Math.floor(Date.now() / 1000) + ttl
  const sig = sign(sessionId, expiresAt)
  const path = `/api/invoice/${sessionId}?exp=${expiresAt}&sig=${sig}`
  return options.baseUrl ? `${options.baseUrl}${path}` : path
}

/**
 * Verifies a signed URL. Returns true iff sig matches AND exp is in the future.
 * Uses timingSafeEqual to avoid leaking byte-by-byte comparison timing.
 */
export function verifyInvoiceSignature(
  sessionId: string,
  exp: string | null,
  sig: string | null
): boolean {
  if (!exp || !sig) return false

  const expiresAt = Number(exp)
  if (!Number.isFinite(expiresAt)) return false
  if (Math.floor(Date.now() / 1000) > expiresAt) return false

  let expected: string
  try {
    expected = sign(sessionId, expiresAt)
  } catch {
    return false
  }

  // Both must be the same byte length for timingSafeEqual.
  if (expected.length !== sig.length) return false

  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(sig, 'hex'))
  } catch {
    return false
  }
}
