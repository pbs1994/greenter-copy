/**
 * Server-only helpers for the Espace Partenaires (`/partenaires/*`).
 *
 * Mirrors the shape of `lib/admin-auth.ts`, but for agents instead of
 * admins. "Admin of the partner network" is intentionally NOT a separate
 * concept here — see `requireNetworkAdmin()`, which reuses the existing
 * `requireAdmin()` / `public.admins` allow-list. This file only deals with
 * the agent side: a row in `public.profiles` with `status = 'approved'`.
 *
 * Two-layer gate, same pattern as the admin area:
 *   1. Middleware (`middleware.ts`) ensures any /partenaires/* request has
 *      a valid Supabase Auth session, otherwise redirects to
 *      /partenaires/login.
 *   2. `requireAgent()` additionally verifies the user has an approved
 *      `profiles` row. A logged-in user who isn't an approved agent is
 *      redirected to /partenaires with an explanatory error — not signed
 *      out, since they might actually be a network admin without an agent
 *      profile of their own.
 */

import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export interface PartenaireUser {
  id: string
  email: string
}

export interface AgentProfile {
  id: string
  status: 'pending' | 'approved' | 'suspended'
  full_name: string | null
  referral_code: string
  commission_rate: number
}

const LOGIN_PATH = '/partenaires/login'

/**
 * Returns the currently authenticated user (if any), without checking
 * whether they have an agent profile. Use `requireAgent()` for the
 * profile-gated case.
 */
export async function getPartenaireUser(): Promise<PartenaireUser | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user.email) return null
  return { id: user.id, email: user.email }
}

/**
 * Service-role client. Only callable from server code. Bypasses RLS —
 * used here purely to gate access, same reasoning as `isAdminEmail()` in
 * lib/admin-auth.ts: never expose this lookup to the anon key.
 */
function getServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

/**
 * Returns the agent's profile row iff it exists and is approved, else null.
 */
export async function getApprovedAgentProfile(userId: string): Promise<AgentProfile | null> {
  const admin = getServiceRoleClient()
  const { data, error } = await admin
    .from('profiles')
    .select('id, status, full_name, referral_code, commission_rate')
    .eq('id', userId)
    .maybeSingle()
  if (error) {
    console.error('getApprovedAgentProfile lookup failed:', error)
    return null
  }
  if (!data || data.status !== 'approved') return null
  return data as AgentProfile
}

/**
 * Use at the top of every /partenaires/dashboard/* server component, layout,
 * server action and route handler.
 *   - Not authenticated → redirect to /partenaires/login.
 *   - Authenticated but no approved profiles row → redirect to
 *     /partenaires?error=not_agent (the role router explains why).
 *   - Otherwise → returns the AgentProfile.
 */
export async function requireAgent(): Promise<AgentProfile> {
  const user = await getPartenaireUser()
  if (!user) redirect(LOGIN_PATH)

  const profile = await getApprovedAgentProfile(user.id)
  if (!profile) redirect('/partenaires?error=not_agent')

  return profile
}
