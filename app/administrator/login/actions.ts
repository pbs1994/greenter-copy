'use server'

/**
 * Magic-link request server action. We do NOT pre-check the email against
 * the admins table here — that would let an attacker enumerate admin
 * addresses via timing or response shape. Always return the same generic
 * "email sent" outcome regardless of whether the email is whitelisted.
 *
 * Authorization is enforced after the user clicks the link, in the admin
 * layout (`requireAdmin()` in `lib/admin-auth.ts`). A non-admin who
 * authenticates is signed out and bounced back with `?error=not_authorized`.
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
    message: 'Si cette adresse est autorisée, un lien de connexion a été envoyé. Vérifiez votre boîte de réception.',
  }
}
