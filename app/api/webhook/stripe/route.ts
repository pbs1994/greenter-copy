import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendOrderEmails } from '@/lib/send-order-emails'
import { OrderData } from '@/lib/email-templates'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Saves order data to the database when a Stripe checkout session is completed.
 * - Upserts customer by email (no duplicates)
 * - Creates order with 'paid' status
 * - Creates order_items from line items
 * 
 * @param session - The Stripe checkout session
 * @returns The created order and customer records
 */
async function saveOrderToDatabase(session: Stripe.Checkout.Session) {
  // Use service role key for webhook to bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const customer = session.customer_details
  const orderNumber = `GRT-${session.id.slice(-8).toUpperCase()}`

  // Upsert customer by email (Requirement 8.4: no duplicates)
  const { data: customerRecord, error: customerError } = await supabase
    .from('customers')
    .upsert(
      {
        email: customer?.email!,
        name: customer?.name,
        phone: customer?.phone,
      },
      { onConflict: 'email' }
    )
    .select()
    .single()

  if (customerError) {
    console.error('Error upserting customer:', customerError)
    throw customerError
  }

  // Create order with 'paid' status (Requirements 8.1, 8.2, 8.3)
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      stripe_session_id: session.id,
      customer_id: customerRecord?.id,
      status: 'paid',
      amount: session.amount_total || 0,
      shipping_address: customer?.address,
      billing_address: session.customer_details?.address,
    })
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    throw orderError
  }

  // Retrieve full session with line items expanded
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  // Create order items from line items (Requirement 8.2)
  const orderItems = fullSession.line_items?.data.map((item) => ({
    order_id: order?.id,
    product_name: (item.price?.product as Stripe.Product)?.name || 'Produit',
    quantity: item.quantity || 1,
    unit_price: item.price?.unit_amount || 0,
  }))

  if (orderItems?.length) {
    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      throw itemsError
    }
  }

  return { order, customer: customerRecord }
}

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
        // Save order to database (Requirements 8.1, 8.2, 8.3, 8.4)
        const { order } = await saveOrderToDatabase(session)
        console.log(`✅ Commande ${order?.order_number} enregistrée en base de données`)

        // Récupérer les détails complets de la session for email
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

        // Envoyer les emails (Requirement 8.5: existing email functionality continues)
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
