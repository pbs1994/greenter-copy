'use server'

/**
 * Server actions for the maintenance offerings (the *services* and
 * *options* Greenter sells). These rows live in
 *   public.maintenance_services
 *   public.maintenance_options
 * and drive the configurator on /services/maintenance.
 *
 * Customer-side subscriptions (i.e. who actually subscribed) live in
 * public.maintenance_subscriptions and are a separate view at
 * /administrator/maintenance/abonnements (read-only).
 */

import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-auth'
import { slugify } from '@/lib/slugify'

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
  id?: string
}

/* ============================================================
 * Services
 * ============================================================ */

interface ServicePayload {
  name: string
  slug?: string
  price_monthly: number  // cents
  is_active: boolean
  sort_order: number
}

function parseServiceFormData(formData: FormData): ServicePayload {
  const priceEur = Number(formData.get('price_monthly') || 0)
  return {
    name: String(formData.get('name') || '').trim(),
    slug: String(formData.get('slug') || '').trim() || undefined,
    price_monthly: Math.round(priceEur * 100),
    is_active: formData.get('is_active') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
  }
}

function validateService(p: ServicePayload): string | null {
  if (!p.name) return 'Le nom est obligatoire.'
  if (!Number.isFinite(p.price_monthly) || p.price_monthly < 0) return 'Le prix doit être positif.'
  return null
}

export async function createMaintenanceService(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseServiceFormData(formData)
  const err = validateService(payload)
  if (err) return { success: false, error: err }

  const supabase = adminClient()
  const { data, error } = await supabase
    .from('maintenance_services')
    .insert({
      name: payload.name,
      slug: payload.slug || slugify(payload.name),
      price_monthly: payload.price_monthly,
      is_active: payload.is_active,
      sort_order: payload.sort_order,
    })
    .select('id')
    .single()

  if (error || !data) return { success: false, error: error?.message || 'Échec de la création.' }
  revalidatePath('/administrator/maintenance')
  return { success: true, id: data.id }
}

export async function updateMaintenanceService(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseServiceFormData(formData)
  const err = validateService(payload)
  if (err) return { success: false, error: err }

  const supabase = adminClient()
  const { error } = await supabase
    .from('maintenance_services')
    .update({
      name: payload.name,
      slug: payload.slug || slugify(payload.name),
      price_monthly: payload.price_monthly,
      is_active: payload.is_active,
      sort_order: payload.sort_order,
    })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  revalidatePath('/administrator/maintenance')
  return { success: true }
}

export async function deleteMaintenanceService(id: string): Promise<ActionResult> {
  await requireAdmin()
  const supabase = adminClient()

  // Refuse if any subscription_item still references this service —
  // would orphan past customer history otherwise.
  const { count, error: countErr } = await supabase
    .from('maintenance_subscription_items')
    .select('id', { count: 'exact', head: true })
    .eq('maintenance_service_id', id)

  if (countErr) return { success: false, error: countErr.message }
  if ((count || 0) > 0) {
    return { success: false, error: 'Impossible de supprimer un service avec des abonnements associés. Désactivez-le plutôt.' }
  }

  const { error } = await supabase.from('maintenance_services').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/administrator/maintenance')
  return { success: true }
}

/* ============================================================
 * Options
 * ============================================================ */

interface OptionPayload {
  name: string
  slug?: string
  price_monthly: number  // cents (mensuel, ou forfait unique si is_flat_fee)
  is_active: boolean
  is_flat_fee: boolean
  exempt_from_discount: boolean
  sort_order: number
}

function parseOptionFormData(formData: FormData): OptionPayload {
  const priceEur = Number(formData.get('price_monthly') || 0)
  return {
    name: String(formData.get('name') || '').trim(),
    slug: String(formData.get('slug') || '').trim() || undefined,
    price_monthly: Math.round(priceEur * 100),
    is_active: formData.get('is_active') === 'on',
    is_flat_fee: formData.get('is_flat_fee') === 'on',
    exempt_from_discount: formData.get('exempt_from_discount') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
  }
}

function validateOption(p: OptionPayload): string | null {
  if (!p.name) return 'Le nom est obligatoire.'
  if (!Number.isFinite(p.price_monthly) || p.price_monthly < 0) return 'Le prix doit être positif.'
  return null
}

export async function createMaintenanceOption(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseOptionFormData(formData)
  const err = validateOption(payload)
  if (err) return { success: false, error: err }

  const supabase = adminClient()
  const { data, error } = await supabase
    .from('maintenance_options')
    .insert({
      name: payload.name,
      slug: payload.slug || slugify(payload.name),
      price_monthly: payload.price_monthly,
      is_active: payload.is_active,
      is_flat_fee: payload.is_flat_fee,
      exempt_from_discount: payload.exempt_from_discount,
      sort_order: payload.sort_order,
    })
    .select('id')
    .single()

  if (error || !data) return { success: false, error: error?.message || 'Échec de la création.' }
  revalidatePath('/administrator/maintenance')
  return { success: true, id: data.id }
}

export async function updateMaintenanceOption(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseOptionFormData(formData)
  const err = validateOption(payload)
  if (err) return { success: false, error: err }

  const supabase = adminClient()
  const { error } = await supabase
    .from('maintenance_options')
    .update({
      name: payload.name,
      slug: payload.slug || slugify(payload.name),
      price_monthly: payload.price_monthly,
      is_active: payload.is_active,
      is_flat_fee: payload.is_flat_fee,
      exempt_from_discount: payload.exempt_from_discount,
      sort_order: payload.sort_order,
    })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  revalidatePath('/administrator/maintenance')
  return { success: true }
}

export async function deleteMaintenanceOption(id: string): Promise<ActionResult> {
  await requireAdmin()
  const supabase = adminClient()

  const { count, error: countErr } = await supabase
    .from('maintenance_subscription_items')
    .select('id', { count: 'exact', head: true })
    .eq('maintenance_option_id', id)

  if (countErr) return { success: false, error: countErr.message }
  if ((count || 0) > 0) {
    return { success: false, error: 'Impossible de supprimer une option avec des abonnements associés. Désactivez-la plutôt.' }
  }

  const { error } = await supabase.from('maintenance_options').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/administrator/maintenance')
  return { success: true }
}
