/**
 * Shared rate-limiting helpers.
 *
 * Why a dedicated module:
 *   - Prior code duplicated an in-memory `Map` rate-limiter across 7+ API
 *     routes and used `x-forwarded-for.split(',')[0]` for the client IP.
 *     That entry is the *leftmost* hop, which is fully attacker-controllable
 *     (the client can set their own `X-Forwarded-For` header and proxies
 *     append after it). An attacker bypasses the limiter by rotating the
 *     header value on every request.
 *
 *   - On Vercel (and any reverse-proxy deployment), the trusted client IP
 *     is in the `x-real-ip` header (set by the platform, not forwardable),
 *     or — if you must parse `x-forwarded-for` — the *rightmost* entry,
 *     which the platform appends and the client cannot influence.
 *
 *   - The in-memory `Map` is per-Lambda-instance, so concurrent invocations
 *     each get their own counter. This module keeps the same in-memory
 *     fallback (it's still useful as a soft brake) but the IP key is now
 *     correct, so the bypass via spoofed XFF no longer works.
 *
 * If a real distributed limiter (Upstash Redis, Vercel KV) is introduced
 * later, swap the implementation here and every route benefits.
 */

import type { NextRequest } from 'next/server'

interface Bucket {
  count: number
  resetTime: number
}

const buckets = new Map<string, Bucket>()

/**
 * Extract the most trustworthy client IP we can from a NextRequest.
 *
 * Order of preference:
 *   1. `x-real-ip` — Vercel/most reverse proxies set this to the real
 *      client IP and strip any client-supplied value.
 *   2. The *rightmost* entry of `x-forwarded-for` — added by our platform,
 *      not the client.
 *   3. A literal `'unknown'` sentinel — never empty so it can be used as
 *      a Map key.
 *
 * The leftmost X-Forwarded-For entry is intentionally NOT used because
 * clients can set their own value and have proxies append to it.
 */
export function getClientIp(request: NextRequest | Request): string {
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const parts = xff.split(',').map((p) => p.trim()).filter(Boolean)
    // Rightmost = closest to our server, set by trusted infra.
    if (parts.length > 0) return parts[parts.length - 1]
  }

  return 'unknown'
}

interface RateLimitOptions {
  /** Identifier for this limiter (e.g. 'contact', 'checkout'). */
  bucket: string
  /** Max requests per window per IP. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

/**
 * Returns true when the request should be blocked.
 *
 * Counts are per (bucket, ip) pair. Each route uses its own `bucket` name
 * so a contact-form burst doesn't share quota with checkout calls.
 */
export function isRateLimited(
  request: NextRequest | Request,
  opts: RateLimitOptions
): boolean {
  const ip = getClientIp(request)
  const key = `${opts.bucket}:${ip}`
  const now = Date.now()
  const record = buckets.get(key)

  if (!record || now > record.resetTime) {
    buckets.set(key, { count: 1, resetTime: now + opts.windowMs })
    return false
  }
  if (record.count >= opts.limit) return true
  record.count++
  return false
}

/**
 * Convenience wrapper: 1 minute window, configurable limit.
 */
export function isRateLimitedPerMinute(
  request: NextRequest | Request,
  bucket: string,
  limit: number
): boolean {
  return isRateLimited(request, { bucket, limit, windowMs: 60_000 })
}

/**
 * Test-only: clear all in-memory buckets so each test starts fresh.
 * Production code never calls this.
 */
export function _resetRateLimitsForTests(): void {
  buckets.clear()
}
