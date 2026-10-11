/**
 * Cloudflare Turnstile server-side verification.
 *
 * Disabled (always passes) until TURNSTILE_SECRET_KEY is set, so the forms keep
 * working before the keys are configured in Vercel. If Cloudflare itself is
 * unreachable we also let the request through: losing a real lead costs more
 * than letting one spam through for a few minutes.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (typeof token !== 'string' || !token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)

  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(5000) })
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    if (!data.success) console.warn('Turnstile rejected:', data['error-codes'])
    return data.success === true
  } catch (error) {
    console.error('Turnstile unreachable, letting request through:', error)
    return true
  }
}
