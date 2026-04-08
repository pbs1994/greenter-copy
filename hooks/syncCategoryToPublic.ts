import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

function revalidateProductPages() {
  try {
    revalidatePath('/produits', 'layout')
  } catch (err) {
    console.error('revalidatePath(/produits) failed:', err)
  }
}

/**
 * Sync a Payload category to public.categories on every change.
 * Upsert by slug — the slug is the shared identifier between the
 * Payload-managed CMS and the public Supabase table.
 */
export const syncCategoryToPublic: CollectionAfterChangeHook = async ({
  doc,
}) => {
  try {
    if (!doc?.slug || !doc?.name) return doc

    // Convert Payload spec_fields (with nested options array) to the
    // flat shape the public schema and frontend expect.
    const specFields = Array.isArray(doc.spec_fields)
      ? doc.spec_fields.map((field: {
          name: string
          key: string
          type: string
          unit?: string
          required?: boolean
          options?: Array<{ value: string }>
        }) => ({
          name: field.name,
          key: field.key,
          type: field.type,
          required: field.required ?? false,
          unit: field.unit || undefined,
          options: Array.isArray(field.options)
            ? field.options.map((o) => o.value).filter(Boolean)
            : undefined,
        }))
      : []

    const { error } = await supabase
      .from('categories')
      .upsert(
        {
          name: doc.name,
          slug: doc.slug,
          spec_fields: specFields,
        },
        { onConflict: 'slug' }
      )

    if (error) {
      console.error('syncCategoryToPublic failed:', error)
    }
  } catch (error) {
    console.error('syncCategoryToPublic threw:', error)
  }

  revalidateProductPages()
  return doc
}

/**
 * Delete from public.categories when a category is deleted in Payload.
 *
 * The Categories collection has a beforeDelete guard that refuses to
 * delete a category with attached products, so by the time we get here
 * we know it's safe to drop the row from the public table.
 */
export const deleteCategoryFromPublic: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  try {
    if (doc?.slug) {
      await supabase.from('categories').delete().eq('slug', doc.slug)
    }
  } catch (error) {
    console.error('deleteCategoryFromPublic failed:', error)
  }

  revalidateProductPages()
  return doc
}
