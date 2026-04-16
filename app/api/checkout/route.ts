import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW = 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip)
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

// UUID format validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MAX_ITEMS = 20
const MAX_QUANTITY_PER_ITEM = 100

interface CartItem {
  productId: string
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
    }

    const body = await request.json()
    // Support ancien format (productId seul) et nouveau format (items array)
    const items: CartItem[] = body.items || (body.productId ? [{ productId: body.productId, quantity: 1 }] : [])

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      )
    }

    // Validate cart size and item format
    if (items.length > MAX_ITEMS) {
      return NextResponse.json({ error: 'Trop d\'articles dans le panier' }, { status: 400 })
    }

    for (const item of items) {
      if (!item.productId || !UUID_REGEX.test(item.productId)) {
        return NextResponse.json({ error: 'ID produit invalide' }, { status: 400 })
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY_PER_ITEM) {
        return NextResponse.json({ error: 'Quantité invalide' }, { status: 400 })
      }
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
