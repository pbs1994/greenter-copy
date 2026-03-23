/**
 * Script to create Stripe products and sync IDs to Payload
 * Run with: npx tsx --env-file=.env.local scripts/sync-stripe-products.ts
 */

import { getPayloadClient } from '../lib/payload'
import { stripe } from '../lib/stripe'

async function syncStripeProducts() {
  console.log('🔄 Syncing products with Stripe...')
  
  const payload = await getPayloadClient()
  
  // Get all products from Payload
  const { docs: products } = await payload.find({
    collection: 'products',
    where: { is_active: { equals: true } },
    limit: 100,
  })
  
  for (const product of products) {
    console.log(`\n📦 Processing: ${product.name}`)
    
    try {
      // Check if product already has Stripe IDs
      if (product.stripe_product_id && product.stripe_price_id) {
        // Verify they exist in Stripe
        try {
          const stripeProduct = await stripe.products.retrieve(product.stripe_product_id)
          const stripePrice = await stripe.prices.retrieve(product.stripe_price_id)
          console.log(`  ✅ Already synced - Product: ${stripeProduct.id}, Price: ${stripePrice.unit_amount}c`)
          
          // Update Payload price if different from Stripe
          if (stripePrice.unit_amount && stripePrice.unit_amount !== product.price) {
            console.log(`  ⚠️ Price mismatch! Stripe: ${stripePrice.unit_amount}c, Payload: ${product.price}c`)
            // Optionally update Payload with Stripe price
            // await payload.update({ collection: 'products', id: product.id, data: { price: stripePrice.unit_amount } })
          }
          continue
        } catch {
          console.log(`  ⚠️ Stripe IDs invalid, recreating...`)
        }
      }
      
      // Create new Stripe product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.short_description || undefined,
        metadata: {
          payload_id: String(product.id),
          slug: product.slug || '',
        },
      })
      console.log(`  ✅ Created Stripe product: ${stripeProduct.id}`)
      
      // Create Stripe price
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'eur',
      })
      console.log(`  ✅ Created Stripe price: ${stripePrice.id} (${product.price}c)`)
      
      // Update Payload with Stripe IDs
      await payload.update({
        collection: 'products',
        id: product.id,
        data: {
          stripe_product_id: stripeProduct.id,
          stripe_price_id: stripePrice.id,
        },
      })
      console.log(`  ✅ Updated Payload with Stripe IDs`)
      
    } catch (error) {
      console.error(`  ❌ Error:`, error instanceof Error ? error.message : error)
    }
  }
  
  console.log('\n🎉 Sync complete!')
  process.exit(0)
}

syncStripeProducts().catch((err) => {
  console.error('❌ Sync failed:', err)
  process.exit(1)
})
