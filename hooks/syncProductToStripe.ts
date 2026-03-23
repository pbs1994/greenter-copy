import type { CollectionAfterChangeHook } from 'payload'
import { stripe } from '@/lib/stripe'

/**
 * Hook to synchronize products with Stripe
 * 
 * - On create: creates Stripe product and price, stores IDs in document
 * - On update: updates Stripe product, creates new price if changed, archives old price
 * - On deactivation: archives the Stripe product
 * 
 * @validates Requirements 22.1, 22.2, 22.3
 */
export const syncProductToStripe: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  const payload = req.payload

  try {
    // Creation of a new product
    if (operation === 'create') {
      const stripeProduct = await stripe.products.create({
        name: doc.name,
        description: doc.short_description || undefined,
      })

      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: doc.price,
        currency: 'eur',
      })

      // Update the document with Stripe IDs
      await payload.update({
        collection: 'products',
        id: doc.id,
        data: {
          stripe_product_id: stripeProduct.id,
          stripe_price_id: stripePrice.id,
        },
      })

      return { ...doc, stripe_product_id: stripeProduct.id, stripe_price_id: stripePrice.id }
    }

    // Update of an existing product
    if (operation === 'update' && doc.stripe_product_id) {
      // Check if product was deactivated
      const wasDeactivated = previousDoc?.is_active === true && doc.is_active === false

      // Update the Stripe product
      await stripe.products.update(doc.stripe_product_id, {
        name: doc.name,
        description: doc.short_description || '',
        active: doc.is_active,
      })

      // If price has changed, create a new price and archive the old one
      if (previousDoc?.price !== doc.price && doc.stripe_price_id) {
        const newPrice = await stripe.prices.create({
          product: doc.stripe_product_id,
          unit_amount: doc.price,
          currency: 'eur',
        })

        // Archive the old price
        await stripe.prices.update(doc.stripe_price_id, { active: false })

        // Update the document with the new price ID
        await payload.update({
          collection: 'products',
          id: doc.id,
          data: { stripe_price_id: newPrice.id },
        })

        return { ...doc, stripe_price_id: newPrice.id }
      }
    }

    return doc
  } catch (error) {
    // Log error but don't fail the save operation
    console.error('Stripe sync failed:', error)
    payload.logger.error({
      msg: 'Failed to sync product to Stripe',
      productId: doc.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    // Return doc without Stripe IDs - can be retried manually
    return doc
  }
}
