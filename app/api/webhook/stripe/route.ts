import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendOrderEmails } from '@/lib/send-order-emails'
import { OrderData } from '@/lib/email-templates'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status === 'paid') {
      try {
        // Récupérer les détails complets de la session
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'line_items.data.price.product'],
        })

        const customer = fullSession.customer_details
        const lineItem = fullSession.line_items?.data[0]
        const product = lineItem?.price?.product as Stripe.Product | undefined

        const orderNumber = `GRT-${session.id.slice(-8).toUpperCase()}`
        const orderDate = new Date(session.created * 1000).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })

        const orderData: OrderData = {
          orderNumber,
          customerName: customer?.name || 'Client',
          customerEmail: customer?.email || '',
          customerPhone: customer?.phone || undefined,
          shippingAddress: customer?.address ? {
            line1: customer.address.line1 || undefined,
            line2: customer.address.line2 || undefined,
            city: customer.address.city || undefined,
            postal_code: customer.address.postal_code || undefined,
          } : undefined,
          productName: product?.name || 'KSTAR BluE-S 6kW',
          amount: (fullSession.amount_total || 0) / 100,
          orderDate,
        }

        // Générer la facture PDF
        const invoiceResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/invoice/${session.id}`
        )
        
        if (!invoiceResponse.ok) {
          throw new Error('Failed to generate invoice')
        }

        const invoicePdf = await invoiceResponse.arrayBuffer()

        // Envoyer les emails
        await sendOrderEmails({
          order: orderData,
          invoicePdf: Buffer.from(invoicePdf),
        })

        console.log(`✅ Emails envoyés pour la commande ${orderNumber}`)
      } catch (error) {
        console.error('Erreur traitement webhook:', error)
      }
    }
  }

  return NextResponse.json({ received: true })
}
