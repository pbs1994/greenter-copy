'use server'

/**
 * Login server actions. Supabase Auth's `signInWithOtp` sends an email
 * that contains *both* a one-click magic link and a 6-digit token. The
 * user can either:
 *   1. Click the link → /api/auth/callback?code=… → session cookie set.
 *   2. Type the 6-digit code into the form below → `verifyMagicCode`
 *      exchanges it for a session cookie.
 *
 * The Supabase email template needs to include both `{{ .ConfirmationURL }}`
 * and `{{ .Token }}` for option 2 to work. Default templates do; if a
 * custom template was set, double-check in Supabase Dashboard →
 * Authentication → Email Templates → Magic Link.
 *
 * Neither action pre-checks the email against the admins table — doing so
 * would let an attacker enumerate admin addresses via response shape or
 * timing. We always return the same generic outcome and enforce the
 * admin allow-list after the user has authenticated, in the admin
 * layout (`requireAdmin()` in `lib/admin-auth.ts`).
 */

import { createSupabaseServerActionClient } from '@/lib/supabase-server'

export interface MagicLinkResult {
  ok: boolean
  message: string
}

export async function sendMagicLink(formData: FormData): Promise<MagicLinkResult> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Adresse email invalide.' }
  }

  const supabase = await createSupabaseServerActionClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/api/auth/callback?next=/administrator`,
      // shouldCreateUser:false would be tempting (avoid creating a row for
      // non-admins) but it leaks "is this email known?" via the response.
      // Keep the default and rely on the post-login admin gate instead.
    },
  })

  if (error) {
    console.error('signInWithOtp failed:', error.message)
    // Still return a generic success to avoid leaking which addresses
    // Supabase rejects.
  }

  return {
    ok: true,
    message: 'Si cette adresse est autorisée, un email contenant un lien et un code à 6 chiffres vous a été envoyé.',
  }
}

export interface VerifyCodeResult {
  ok: boolean
  message?: string
}

export async function verifyMagicCode(formData: FormData): Promise<VerifyCodeResult> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const token = String(formData.get('token') || '').trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Adresse email invalide.' }
  }
  if (!/^\d{6}$/.test(token)) {
    return { ok: false, message: 'Le code doit comporter 6 chiffres.' }
  }

  const supabase = await createSupabaseServerActionClient()
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

  if (error) {
    return { ok: false, message: 'Code invalide ou expiré. Demandez un nouveau code.' }
  }

  return { ok: true }
}
