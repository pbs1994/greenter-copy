'use server'

/**
 * Server actions for /administrator/team — manage who can access the
 * admin. Adding an email here lets that person sign in via the magic-link
 * flow on /login.
 *
 * The current admin is intentionally allowed to remove themselves; we
 * just stop them from removing the LAST remaining admin (which would
 * leave the system unmanageable).
 */

import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-auth'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export interface ActionResult {
  success: boolean
  error?: string
}

export async function addAdmin(formData: FormData): Promise<ActionResult> {
  const me = await requireAdmin()
  const rawEmail = String(formData.get('email') || '').trim().toLowerCase()
  if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
    return { success: false, error: 'Adresse email invalide.' }
  }

  const supabase = adminClient()
  const { error } = await supabase
    .from('admins')
    .insert({ email: rawEmail, added_by: me.email })

  if (error) {
    if ((error as { code?: string }).code === '23505') {
      return { success: false, error: 'Cet email est déjà administrateur.' }
    }
    return { success: false, error: error.message }
  }

  revalidatePath('/administrator/team')
  return { success: true }
}

export async function removeAdmin(email: string): Promise<ActionResult> {
  await requireAdmin()
  const supabase = adminClient()

  // Refuse to delete the last admin — that would lock everyone out.
  const { count } = await supabase
    .from('admins')
    .select('email', { count: 'exact', head: true })
  if ((count || 0) <= 1) {
    return { success: false, error: 'Impossible de retirer le dernier administrateur.' }
  }

  const { error } = await supabase.from('admins').delete().eq('email', email.toLowerCase())
  if (error) return { success: false, error: error.message }

  revalidatePath('/administrator/team')
  return { success: true }
}
