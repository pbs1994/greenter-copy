'use server'

/**
 * Login server actions for the Espace Partenaires. Same magic-link/OTP flow
 * as app/login/actions.ts (admin side) — see that file for the full
 * rationale (why we don't pre-check the email, why the response message is
 * always generic, etc). Kept as a separate file rather than a shared,
 * parameterized helper: the two flows differ only in their redirect
 * targets, and this repo's own convention (see app/login/actions.ts,
 * product pages, blog articles) favors small, self-contained duplicates
 * over early abstraction.
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
      emailRedirectTo: `${siteUrl}/api/auth/callback?next=/partenaires`,
    },
  })

  if (error) {
    console.error('signInWithOtp failed:', error.message)
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
