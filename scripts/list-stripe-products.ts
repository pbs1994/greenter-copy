import { stripe } from '../lib/stripe'

async function listProducts() {
  console.log('=== Produits Stripe ===\n')
  
  const products = await stripe.products.list({ limit: 100 })
  
  for (const p of products.data) {
    const prices = await stripe.prices.list({ product: p.id, active: true, limit: 1 })
    const price = prices.data[0]?.unit_amount || 0
    console.log(`${p.name}`)
    console.log(`  ID: ${p.id}`)
    console.log(`  Prix: ${price/100}€`)
    console.log(`  Actif: ${p.active}`)
    console.log('')
  }
  
  process.exit(0)
}

listProducts()
