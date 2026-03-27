import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { supabase } from '@/lib/supabase'

/**
 * Hook to sync Payload products to public.products table
 * so the frontend (which reads from Supabase) stays up to date.
 */
export const syncProductToPublic: CollectionAfterChangeHook = async ({
  doc,
  operation,
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
      const mediaId = typeof doc.main_image === 'object' ? doc.main_image.id : doc.main_image
      const media = typeof doc.main_image === 'object' ? doc.main_image : await req.payload.findByID({
        collection: 'media',
        id: mediaId,
      })
      imageUrl = media?.url || null
    }

    // Convert specs from Payload array format to JSONB object
    const specs: Record<string, string> = {}
    if (doc.specs && Array.isArray(doc.specs)) {
      for (const spec of doc.specs) {
        const key = spec.label?.toLowerCase().replace(/\s+/g, '_') || spec.label
        specs[key] = spec.unit ? `${spec.value} ${spec.unit}` : spec.value
      }
    }

    // Convert features array
    const features = doc.features?.map((f: { icon?: string; title: string; description?: string }) => ({
      icon: f.icon || null,
      title: f.title,
      description: f.description || null,
    })) || null

    // Convert FAQ array (extract plain text from richText)
    const faq = doc.faq?.map((f: { question: string; answer?: { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } } }) => ({
      question: f.question,
      answer: f.answer?.root?.children?.map(
        (node: { children?: Array<{ text?: string }> }) => node.children?.map((c: { text?: string }) => c.text || '').join('') || ''
      ).join('\n') || '',
    })) || null

    const publicProduct = {
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      short_description: doc.short_description || null,
      is_active: doc.is_active ?? true,
      category_id: publicCategoryId,
      image_url: imageUrl,
      description: doc.short_description || null,
      specs: Object.keys(specs).length > 0 ? specs : null,
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
