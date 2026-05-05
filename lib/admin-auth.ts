/**
 * Server-only helpers for the mini-admin (`/administrator/*`).
 *
 * Two-layer gate:
 *   1. Middleware (`middleware.ts`) ensures any /administrator/* request has
 *      a valid Supabase Auth session, otherwise redirects to /administrator/login.
 *   2. The admin layout calls `requireAdmin()` which additionally verifies the
 *      user's email is in the `public.admins` allow-list. A logged-in user
 *      whose email isn't whitelisted is signed out and bounced back to the
 *      login page with `?error=not_authorized`.
 *
 * The allow-list lookup uses the service-role client so it bypasses RLS and
 * never exposes admin emails to the anon key.
 */

import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseServerClient, createSupabaseServerActionClient } from '@/lib/supabase-server'

export interface AdminUser {
  id: string
  email: string
}

/**
 * Returns the currently authenticated user (if any), without checking
 * whether they're an admin. Use `requireAdmin()` for the admin-gated case.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user.email) return null
  return { id: user.id, email: user.email }
}

const LOGIN_PATH = '/login'

/**
 * Service-role client. Only callable from server code. Bypasses RLS — use
 * sparingly and never expose its results to the client.
 */
function getServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

/**
 * Returns true iff `email` is present in the `public.admins` allow-list.
 * Compared case-insensitively because Supabase Auth lowercases emails.
 */
export async function isAdminEmail(email: string): Promise<boolean> {
  const admin = getServiceRoleClient()
  const { data, error } = await admin
    .from('admins')
    .select('email')
    .eq('email', email.toLowerCase())
    .maybeSingle()
  if (error) {
    console.error('isAdminEmail lookup failed:', error)
    return false
  }
  return !!data
}

/**
 * Use at the top of every /administrator/* server component, layout, server
 * action and route handler.
 *   - Not authenticated → redirect to /login.
 *   - Authenticated but email not in admins table → sign out + redirect to
 *     /login?error=not_authorized.
 *   - Otherwise → returns the AdminUser.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser()
  if (!user) redirect(LOGIN_PATH)

  const ok = await isAdminEmail(user.email)
  if (!ok) {
    // Sign the user out so subsequent requests don't keep tripping this gate.
    const supabase = await createSupabaseServerActionClient()
    await supabase.auth.signOut()
    redirect(`${LOGIN_PATH}?error=not_authorized`)
  }
  return user
}
