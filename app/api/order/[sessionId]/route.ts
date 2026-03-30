import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    // Récupérer la session Stripe avec les produits
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer', 'line_items', 'line_items.data.price.product'],
    })

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Session non trouvée ou paiement non confirmé' },
        { status: 404 }
      )
    }

    // Récupérer le PaymentIntent pour avoir le reçu
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent

    // Récupérer les charges pour avoir le receipt_url
    let receiptUrl = null
    if (paymentIntent?.id) {
      const charges = await stripe.charges.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      })
      if (charges.data.length > 0) {
        receiptUrl = charges.data[0].receipt_url
      }
    }

    // Extraire les produits depuis les line items
    const items = session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product | undefined
      return {
        name: product?.name || 'Produit',
        description: product?.description || null,
        quantity: item.quantity || 1,
        unitPrice: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
        total: item.amount_total ? item.amount_total / 100 : 0,
        image: product?.images?.[0] || null,
      }
    }) || []

    // Construire la réponse
    const orderDetails = {
      id: session.id,
      orderNumber: `GRT-${session.id.slice(-8).toUpperCase()}`,
      status: session.payment_status,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency?.toUpperCase() || 'EUR',
      customerEmail: session.customer_details?.email || null,
      customerName: session.customer_details?.name || null,
      customerPhone: session.customer_details?.phone || null,
      shippingAddress: (session as { shipping_details?: { address?: Stripe.Address } }).shipping_details?.address || null,
      billingAddress: session.customer_details?.address || null,
      receiptUrl: receiptUrl,
      items,
      createdAt: new Date(session.created * 1000).toISOString(),
    }

    return NextResponse.json(orderDetails)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la commande' },
      { status: 500 }
    )
  }
}
