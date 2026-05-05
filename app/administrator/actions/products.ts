'use server'

/**
 * Server actions for the /administrator/products screens.
 *
 * Every mutation:
 *   1. Calls `requireAdmin()` first — defense in depth on top of middleware.
 *   2. Writes to public.products via the service-role client.
 *   3. Mirrors the change to Stripe (create/update/archive product + price).
 *
 * Stripe sync semantics match the Payload-era `hooks/syncProductToStripe.ts`:
 *   - On create: create Stripe product + price, store IDs.
 *   - On price change: create a new price, archive the old one (Stripe
 *     prices are immutable so we can never edit one in place).
 *   - On is_active toggle: update Stripe product `active` flag.
 *   - Sync failures DO NOT roll back the DB write — they're logged and
 *     surfaced as a non-blocking warning. This mirrors the previous
 *     behavior where an admin could fix the sync later via the script.
 */

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-auth'
import { slugify } from '@/lib/slugify'
import {
  stripe,
  createStripeProduct,
  updateStripeProduct,
  updateStripePrice,
  archiveStripeProduct,
} from '@/lib/stripe'

const STORAGE_BUCKET = 'product-images'

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
  warning?: string
}

interface ProductPayload {
  name: string
  slug?: string
  price: number          // cents
  category_id: string
  short_description?: string
  description?: string
  image_url?: string | null
  is_active: boolean
  is_featured: boolean
}

function parseFormData(formData: FormData): ProductPayload {
  const priceEur = Number(formData.get('price') || 0)
  return {
    name: String(formData.get('name') || '').trim(),
    slug: String(formData.get('slug') || '').trim() || undefined,
    price: Math.round(priceEur * 100),
    category_id: String(formData.get('category_id') || '').trim(),
    short_description: String(formData.get('short_description') || '').trim() || undefined,
    description: String(formData.get('description') || '').trim() || undefined,
    image_url: (String(formData.get('image_url') || '').trim() || null),
    is_active: formData.get('is_active') === 'on',
    is_featured: formData.get('is_featured') === 'on',
  }
}

function validate(payload: ProductPayload): string | null {
  if (!payload.name) return 'Le nom est obligatoire.'
  if (!payload.category_id) return 'La catégorie est obligatoire.'
  if (!Number.isFinite(payload.price) || payload.price <= 0) return 'Le prix doit être supérieur à zéro.'
  return null
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseFormData(formData)
  const err = validate(payload)
  if (err) return { success: false, error: err }

  const slug = payload.slug || slugify(payload.name)
  const supabase = adminClient()

  const { data: inserted, error: insertErr } = await supabase
    .from('products')
    .insert({
      name: payload.name,
      slug,
      price: payload.price,
      category_id: payload.category_id,
      short_description: payload.short_description ?? null,
      description: payload.description ?? null,
      image_url: payload.image_url,
      is_active: payload.is_active,
      is_featured: payload.is_featured,
    })
    .select('id, name, short_description, price, image_url')
    .single()

  if (insertErr || !inserted) {
    return { success: false, error: insertErr?.message || 'Échec de la création du produit.' }
  }

  // Push to Stripe. Failures are logged and surfaced as a warning so the
  // admin can re-run the sync; we don't roll back the DB row.
  let warning: string | undefined
  try {
    const { productId, priceId } = await createStripeProduct({
      name: inserted.name,
      description: inserted.short_description || undefined,
      imageUrl: inserted.image_url || undefined,
      priceInCents: inserted.price,
    })
    await supabase
      .from('products')
      .update({ stripe_product_id: productId, stripe_price_id: priceId })
      .eq('id', inserted.id)
  } catch (e) {
    console.error('Stripe sync failed on create:', e)
    warning = 'Produit enregistré, mais la synchronisation Stripe a échoué. Voir les logs.'
  }

  revalidatePath('/administrator/products')
  redirect(`/administrator/products/${inserted.id}/edit?created=1${warning ? '&stripe_warning=1' : ''}`)
}

export async function updateProduct(id: string, formData: FormData): Promise<ActionResult> {
  await requireAdmin()
  const payload = parseFormData(formData)
  const err = validate(payload)
  if (err) return { success: false, error: err }

  const supabase = adminClient()

  const { data: previous, error: fetchErr } = await supabase
    .from('products')
    .select('id, price, is_active, stripe_product_id, stripe_price_id')
    .eq('id', id)
    .single()

  if (fetchErr || !previous) {
    return { success: false, error: 'Produit introuvable.' }
  }

  const slug = payload.slug || slugify(payload.name)
  const { error: updateErr } = await supabase
    .from('products')
    .update({
      name: payload.name,
      slug,
      price: payload.price,
      category_id: payload.category_id,
      short_description: payload.short_description ?? null,
      description: payload.description ?? null,
      image_url: payload.image_url,
      is_active: payload.is_active,
      is_featured: payload.is_featured,
    })
    .eq('id', id)

  if (updateErr) {
    return { success: false, error: updateErr.message }
  }

  // Stripe sync.
  let warning: string | undefined
  try {
    if (previous.stripe_product_id) {
      await updateStripeProduct(previous.stripe_product_id, {
        name: payload.name,
        description: payload.short_description || '',
        imageUrl: payload.image_url || undefined,
      })
      // Toggle active flag.
      if (previous.is_active !== payload.is_active) {
        await stripe.products.update(previous.stripe_product_id, { active: payload.is_active })
      }
      // Price change: Stripe prices are immutable, so we mint a new one.
      if (previous.price !== payload.price && previous.stripe_price_id) {
        const newPriceId = await updateStripePrice(
          previous.stripe_product_id,
          previous.stripe_price_id,
          payload.price
        )
        await supabase.from('products').update({ stripe_price_id: newPriceId }).eq('id', id)
      }
    } else {
      // No Stripe product yet — create one now (recovery path for rows
      // whose initial sync had failed).
      const { productId, priceId } = await createStripeProduct({
        name: payload.name,
        description: payload.short_description || undefined,
        imageUrl: payload.image_url || undefined,
        priceInCents: payload.price,
      })
      await supabase
        .from('products')
        .update({ stripe_product_id: productId, stripe_price_id: priceId })
        .eq('id', id)
    }
  } catch (e) {
    console.error('Stripe sync failed on update:', e)
    warning = 'Produit mis à jour, mais la synchronisation Stripe a échoué. Voir les logs.'
  }

  revalidatePath('/administrator/products')
  revalidatePath(`/administrator/products/${id}/edit`)
  return { success: true, warning }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin()
  const supabase = adminClient()

  // Refuse if any order_items references this product — keeps the foreign
  // key intact for accounting/history. Mirrors the property test in
  // __tests__/properties/product-deletion.property.test.ts.
  const { count, error: countErr } = await supabase
    .from('order_items')
    .select('id', { count: 'exact', head: true })
    .eq('product_id', id)

  if (countErr) {
    return { success: false, error: countErr.message }
  }
  if ((count || 0) > 0) {
    return { success: false, error: 'Impossible de supprimer un produit avec des commandes associées' }
  }

  const { data: existing } = await supabase
    .from('products')
    .select('stripe_product_id')
    .eq('id', id)
    .single()

  const { error: deleteErr } = await supabase.from('products').delete().eq('id', id)
  if (deleteErr) {
    return { success: false, error: deleteErr.message }
  }

  // Archive on Stripe (never hard-delete — keeps order history coherent).
  if (existing?.stripe_product_id) {
    try {
      await archiveStripeProduct(existing.stripe_product_id)
    } catch (e) {
      console.error('Stripe archive failed:', e)
    }
  }

  revalidatePath('/administrator/products')
  return { success: true }
}

/**
 * Upload a product image to Supabase Storage and return the public URL.
 * Called from a client component via a server action that wraps a File
 * supplied through FormData.
 */
export async function uploadProductImage(formData: FormData): Promise<{
  success: boolean
  url?: string
  error?: string
}> {
  await requireAdmin()
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: 'Aucun fichier fourni.' }
  }
  const MAX = 5 * 1024 * 1024
  if (file.size > MAX) return { success: false, error: 'Image trop volumineuse (max 5 Mo).' }
  if (!file.type.startsWith('image/')) return { success: false, error: 'Le fichier doit être une image.' }

  const ext = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : 'png'
  const safeExt = /^[a-z0-9]{1,5}$/.test(ext) ? ext : 'png'
  const key = `products/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`

  const supabase = adminClient()
  const { error: uploadErr } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(key, file, { contentType: file.type, upsert: false })

  if (uploadErr) return { success: false, error: uploadErr.message }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key)
  return { success: true, url: data.publicUrl }
}
