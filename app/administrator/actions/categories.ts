'use server'

/**
 * Server actions for /administrator/categories.
 *
 * Categories don't have a Stripe equivalent — they exist purely to group
 * products on the public site. Mutations write to public.categories via
 * the service-role client.
 *
 * Note: spec_fields is intentionally NOT exposed in the admin UI.
 * It was synced from Payload but never rendered on the public site;
 * leaving the column in place avoids migrating data, but we don't add
 * the surface area to maintain.
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

interface CategoryPayload {
  name: string
  slug?: string
}

function parseFormData(formData: FormData): CategoryPayload {
  return {
    name: String(formData.get('name') || '').trim(),
    slug: String(formData.get('slug') || '').trim() || undefined,
  }
}

export async function createCategory(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseFormData(formData)
  if (!payload.name) return { success: false, error: 'Le nom est obligatoire.' }

  const slug = payload.slug || slugify(payload.name)
  const supabase = adminClient()

  const { data, error } = await supabase
    .from('categories')
    .insert({ name: payload.name, slug })
    .select('id')
    .single()

  if (error || !data) return { success: false, error: error?.message || 'Échec de la création.' }
  revalidatePath('/administrator/categories')
  return { success: true, id: data.id }
}

export async function updateCategory(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseFormData(formData)
  if (!payload.name) return { success: false, error: 'Le nom est obligatoire.' }

  const slug = payload.slug || slugify(payload.name)
  const supabase = adminClient()

  const { error } = await supabase
    .from('categories')
    .update({ name: payload.name, slug })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  revalidatePath('/administrator/categories')
  return { success: true }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await requireAdmin()
  const supabase = adminClient()

  // Refuse if any product still belongs to this category. Mirrors the
  // pre-existing property test in
  // __tests__/properties/category-deletion.property.test.ts.
  const { count, error: countErr } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', id)

  if (countErr) return { success: false, error: countErr.message }
  if ((count || 0) > 0) {
    return { success: false, error: 'Impossible de supprimer une catégorie avec des produits associés' }
  }

  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/administrator/categories')
  return { success: true }
}
