import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

interface CartItem {
  productId: string
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Support ancien format (productId seul) et nouveau format (items array)
    const items: CartItem[] = body.items || (body.productId ? [{ productId: body.productId, quantity: 1 }] : [])

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      )
    }

    // Récupérer tous les produits du panier
    const productIds = items.map(item => item.productId)
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*, category:categories(slug)')
      .in('id', productIds)
      .eq('is_active', true)

    if (productsError || !products || products.length === 0) {
      return NextResponse.json(
        { error: 'Produits non trouvés' },
        { status: 404 }
      )
    }

    // Créer les line_items pour Stripe
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => {
      const product = products.find(p => p.id === item.productId)
      if (!product) throw new Error(`Produit ${item.productId} non trouvé`)
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.short_description || undefined,
            images: product.image_url ? [product.image_url.startsWith('http') ? product.image_url : `${process.env.NEXT_PUBLIC_SITE_URL}${product.image_url}`] : undefined,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      }
    })

    // URL de retour - utiliser le premier produit
    const firstProduct = products[0]
    const cancelUrl = firstProduct.category?.slug 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/produits/${firstProduct.category.slug}/${firstProduct.slug}`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/produits`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
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
        items: JSON.stringify(items),
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
