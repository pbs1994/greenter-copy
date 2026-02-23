import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'ID du produit requis' },
        { status: 400 }
      )
    }

    // Récupérer le produit depuis Supabase
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*, category:categories(slug)')
      .eq('id', productId)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    // URL de retour en cas d'annulation
    const cancelUrl = product.category?.slug 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/produits/${product.category.slug}/${product.slug}`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/produits`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.short_description || undefined,
              images: product.image_url ? [`${process.env.NEXT_PUBLIC_SITE_URL}${product.image_url}`] : undefined,
            },
            unit_amount: product.price, // Prix en centimes depuis Supabase
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        product_id: product.id,
        product_name: product.name,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}
