import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { isRateLimitedPerMinute } from '@/lib/rate-limit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

// UUID format validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MAX_ITEMS = 20
const MAX_QUANTITY_PER_ITEM = 100

// Allow-list of hosts Stripe is permitted to fetch product images from.
// Stripe fetches `product_data.images[]` server-side; if a Payload editor
// (or a sync bug) ever sets `image_url` to an arbitrary URL, this guard
// prevents Stripe from being used as an SSRF target on our behalf.
const ALLOWED_IMAGE_HOST_SUFFIXES = ['.supabase.co', '.public.blob.vercel-storage.com']

function isAllowedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    const host = parsed.hostname.toLowerCase()
    return ALLOWED_IMAGE_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))
  } catch {
    return false
  }
}

interface CartItem {
  productId: string
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimitedPerMinute(request, 'checkout', 10)) {
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

      // Resolve relative paths against our own host, then accept only
      // URLs whose host is in our allow-list. Anything else → no image
      // (Stripe falls back to its default), never an arbitrary fetch.
      let images: string[] | undefined
      if (product.image_url) {
        const absoluteUrl = product.image_url.startsWith('http')
          ? product.image_url
          : `${process.env.NEXT_PUBLIC_SITE_URL}${product.image_url}`
        if (isAllowedImageUrl(absoluteUrl)) {
          images = [absoluteUrl]
        }
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.short_description || undefined,
            images,
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
