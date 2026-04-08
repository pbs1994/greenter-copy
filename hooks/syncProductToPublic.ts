import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { supabase } from '@/lib/supabase'
import { lexicalToHtml } from '@/lib/lexical-to-html'

/**
 * Resolve gallery images from Payload media to URL strings
 */
async function resolveGalleryImages(
  gallery: Array<{ image: { id: string; url?: string } | string }> | undefined | null,
  req: { payload: { findByID: (args: { collection: string; id: string }) => Promise<{ url?: string }> } }
): Promise<string[]> {
  if (!gallery || !Array.isArray(gallery)) return []

  const urls: string[] = []
  for (const item of gallery) {
    if (!item.image) continue
    if (typeof item.image === 'object' && item.image.url) {
      urls.push(item.image.url)
    } else {
      const mediaId = typeof item.image === 'object' ? item.image.id : item.image
      try {
        const media = await req.payload.findByID({ collection: 'media', id: mediaId })
        if (media?.url) urls.push(media.url)
      } catch {
        // Skip unresolvable images
      }
    }
  }
  return urls
}

/**
 * Hook to sync Payload products to public.products table
 * so the frontend (which reads from Supabase) stays up to date.
 */
export const syncProductToPublic: CollectionAfterChangeHook = async ({
  doc,
  req,
}) => {
  try {
    // Resolve category slug to get the public.categories UUID
    let publicCategoryId: string | null = null
    if (doc.category) {
      const categoryId = typeof doc.category === 'object' ? doc.category.id : doc.category
      const category = await req.payload.findByID({
        collection: 'categories',
        id: categoryId,
      })
      if (category?.slug) {
        const { data: publicCat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', category.slug)
          .single()

        if (publicCat) {
          publicCategoryId = publicCat.id
        } else {
          // Category doesn't exist in public yet, create it
          const { data: newCat } = await supabase
            .from('categories')
            .upsert({
              name: category.name,
              slug: category.slug,
              spec_fields: category.spec_fields || null,
            }, { onConflict: 'slug' })
            .select('id')
            .single()
          publicCategoryId = newCat?.id || null
        }
      }
    }

    // Resolve image URL from Payload media
    let imageUrl: string | null = null
    if (doc.main_image) {
      const media = typeof doc.main_image === 'object' ? doc.main_image : await req.payload.findByID({
        collection: 'media',
        id: typeof doc.main_image === 'string' ? doc.main_image : doc.main_image.id,
      })
      imageUrl = media?.url || null
    }

    // Resolve gallery images
    const galleryUrls = await resolveGalleryImages(doc.gallery, req)

    // Specs: keep the Payload array shape verbatim — the public template
    // reads this directly via normalizeSpecs(). No more lossy slugified
    // keys, no more pre-merged units.
    const specs = Array.isArray(doc.specs)
      ? doc.specs
          .filter((s: { label?: string; value?: string }) => s?.label && s?.value !== undefined && s?.value !== null)
          .map((s: { label: string; value: string; unit?: string }) => ({
            label: s.label,
            value: String(s.value),
            unit: s.unit || null,
          }))
      : null

    // Convert features array
    const features = doc.features?.map((f: { icon?: string; title: string; description?: string }) => ({
      icon: f.icon || null,
      title: f.title,
      description: f.description || null,
    })) || null

    // Convert FAQ array — answers are richText, serialize to HTML so the
    // template can render real formatting (bold, links, lists, etc.).
    const faq = doc.faq?.map((f: { question: string; answer?: unknown }) => ({
      question: f.question,
      answer: lexicalToHtml(f.answer) || '',
    })) || null

    // Description: serialize the lexical richText to HTML once at sync
    // time so the public site doesn't need the Payload runtime.
    const descriptionHtml = lexicalToHtml(doc.description)

    const publicProduct = {
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      short_description: doc.short_description || null,
      is_active: doc.is_active ?? true,
      is_featured: doc.is_featured || false,
      category_id: publicCategoryId,
      image_url: imageUrl,
      images: galleryUrls,
      description: descriptionHtml,
      specs: specs && specs.length > 0 ? specs : null,
      features,
      faq,
      stripe_product_id: doc.stripe_product_id || null,
      stripe_price_id: doc.stripe_price_id || null,
    }

    // Upsert by slug (unique identifier)
    const { error } = await supabase
      .from('products')
      .upsert(publicProduct, { onConflict: 'slug' })

    if (error) {
      console.error('Failed to sync product to public:', error)
    }
  } catch (error) {
    console.error('syncProductToPublic failed:', error)
  }

  return doc
}

/**
 * Hook to delete from public.products when deleted in Payload
 */
export const deleteProductFromPublic: CollectionAfterDeleteHook = async ({ doc }) => {
  try {
    if (doc?.slug) {
      await supabase.from('products').delete().eq('slug', doc.slug)
    }
  } catch (error) {
    console.error('deleteProductFromPublic failed:', error)
  }

  return doc
}
