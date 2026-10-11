"use client"

import { useRef } from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/**
 * Cloudflare Turnstile for lead forms. Render `widget` inside the form and send
 * `await getToken()` as `turnstileToken` to /api/contact. The widget stays
 * invisible unless Cloudflare needs the visitor to tick a box.
 *
 * Without NEXT_PUBLIC_TURNSTILE_SITE_KEY nothing is rendered and getToken()
 * resolves to undefined (the API skips the check when its secret is unset too).
 */
export function useTurnstile() {
  const ref = useRef<TurnstileInstance>(null)

  const widget = SITE_KEY ? (
    <Turnstile
      ref={ref}
      siteKey={SITE_KEY}
      options={{ appearance: "interaction-only", size: "flexible", language: "fr" }}
    />
  ) : null

  // Tokens are single-use: reset after reading so a retry gets a fresh one.
  const getToken = async (): Promise<string | undefined> => {
    if (!SITE_KEY || !ref.current) return undefined
    try {
      return await ref.current.getResponsePromise(15000)
    } catch {
      return undefined
    } finally {
      ref.current?.reset()
    }
  }

  return { widget, getToken }
}
