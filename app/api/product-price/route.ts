import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function GET() {
  try {
    const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!)
    
    // Le prix Stripe est en centimes, on le convertit en euros
    const amount = price.unit_amount ? price.unit_amount / 100 : 0
    
    return NextResponse.json({ 
      price: amount,
      formatted: `${amount.toLocaleString('fr-FR')} €`,
      currency: price.currency
    })
  } catch (error) {
    console.error('Stripe price error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du prix' },
      { status: 500 }
    )
  }
}
