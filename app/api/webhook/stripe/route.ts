import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { sendOrderEmails } from '@/lib/send-order-emails'
import { OrderData, MaintenanceSubscriptionData, maintenanceClientEmailTemplate, maintenanceAdminEmailTemplate } from '@/lib/email-templates'
import { resend } from '@/lib/resend'
import { generateInvoicePdf } from '@/lib/generate-invoice-pdf'
import type { SubscriptionStatus } from '@/types/maintenance'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL ? `Greenter <${process.env.FROM_EMAIL}>` : 'Greenter <contact@greenter.fr>'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const STRIPE_STATUS_MAP: Record<string, SubscriptionStatus> = {
  active: 'active',
  past_due: 'past_due',
  canceled: 'cancelled',
  paused: 'paused',
}

function getSupabase(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Per-event-id idempotency. Stripe webhooks are retried on non-2xx, and a
 * captured signed payload remains valid for the signing window (~5 min) —
 * an adversary with a copy could replay it. The webhook_events table
 * unconditionally records every event we successfully claim; if the insert
 * conflicts on the primary key, we've already processed it and we no-op.
 *
 * Returns true when this event is a fresh one that should be processed.
 */
async function claimEvent(supabase: SupabaseClient, event: Stripe.Event): Promise<boolean> {
  const { data, error } = await supabase
    .from('webhook_events')
    .insert({ id: event.id, event_type: event.type })
    .select('id')
    .maybeSingle()

  if (error) {
    // Postgres 23505 = unique_violation. Anything else is a real error and
    // should bubble up so Stripe retries the delivery.
    if ((error as { code?: string }).code === '23505') {
      return false
    }
    throw error
  }
  return !!data
}

async function saveOrderToDatabase(session: Stripe.Checkout.Session) {
  const supabase = getSupabase()

  const customer = session.customer_details
  const orderNumber = `GRT-${session.id.slice(-8).toUpperCase()}`

  // Stripe should always populate customer.email on a paid session, but the
  // type allows it to be optional. Bail loudly rather than insert an empty
  // string and corrupt the unique-on-email constraint.
  if (!customer?.email) {
    throw new Error(`Session ${session.id} has no customer email`)
  }

  const { data: customerRecord, error: customerError } = await supabase
    .from('customers')
    .upsert(
      {
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
      },
      { onConflict: 'email' }
    )
    .select()
    .single()

  if (customerError) {
    console.error('Error upserting customer:', customerError)
    throw customerError
  }

  // Defense-in-depth: even with event-level idempotency, a rare retry race
  // could land twice — keep the per-session check.
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('id, order_number')
    .eq('stripe_session_id', session.id)
    .single()

  if (existingOrder) {
    console.log(`⏭️ Commande ${existingOrder.order_number} déjà existante, skip`)
    return { order: existingOrder, customer: customerRecord }
  }

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

  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

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

async function handleSubscriptionEvent(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const metadata = subscription.metadata

  if (metadata?.type !== 'maintenance') {
    return
  }

  const supabase = getSupabase()

  switch (event.type) {
    case 'customer.subscription.created': {
      console.log(`📋 Traitement subscription.created pour ${subscription.id}`)

      const stripeCustomer = (await stripe.customers.retrieve(
        subscription.customer as string
      )) as Stripe.Customer

      if (!stripeCustomer.email) {
        throw new Error(`Stripe customer ${stripeCustomer.id} has no email`)
      }

      const { data: customerRecord, error: customerError } = await supabase
        .from('customers')
        .upsert(
          {
            email: stripeCustomer.email,
            name: stripeCustomer.name || stripeCustomer.email,
            phone: stripeCustomer.phone || null,
          },
          { onConflict: 'email' }
        )
        .select()
        .single()

      if (customerError) {
        console.error('❌ Erreur upsert client maintenance:', customerError)
        throw customerError
      }

      console.log(`✅ Client upsert: id=${customerRecord.id}`)

      const billingPeriod = metadata.billing_period || 'monthly'
      const discountMulti = parseInt(metadata.discount_multi || '0', 10)
      const discountAnnual = parseInt(metadata.discount_annual || '0', 10)

      const totalFromItems = subscription.items.data.reduce(
        (sum, item) => sum + (item.price?.unit_amount || 0),
        0
      )
      const totalMonthly = parseInt(metadata.total_monthly || '0', 10) || totalFromItems
      const totalAfterDiscounts = parseInt(metadata.total_after_discounts || '0', 10) || totalFromItems

      const { data: subscriptionRecord, error: subError } = await supabase
        .from('maintenance_subscriptions')
        .insert({
          customer_id: customerRecord.id,
          stripe_subscription_id: subscription.id,
          billing_period: billingPeriod,
          status: 'active',
          total_monthly: totalMonthly,
          discount_multi_percent: discountMulti,
          discount_annual_percent: discountAnnual,
          total_after_discounts: totalAfterDiscounts,
        })
        .select()
        .single()

      if (subError) {
        console.error('❌ Erreur création maintenance_subscription:', subError)
        throw subError
      }

      console.log(`✅ Souscription maintenance créée: ${subscriptionRecord.id}`)

      const serviceIds = metadata.service_ids ? metadata.service_ids.split(',').filter(Boolean) : []
      const optionIds = metadata.option_ids ? metadata.option_ids.split(',').filter(Boolean) : []

      const subscriptionItems: Array<{
        subscription_id: string
        item_type: 'service' | 'option'
        maintenance_service_id: string | null
        maintenance_option_id: string | null
        name: string
        unit_price: number
      }> = []

      for (const lineItem of subscription.items.data) {
        const productName =
          typeof lineItem.price?.product === 'object' && lineItem.price.product !== null
            ? (lineItem.price.product as Stripe.Product).name
            : 'Service'

        const unitPrice = lineItem.price?.unit_amount || 0
        const isService = productName.startsWith('Entretien ')

        if (isService && serviceIds.length > 0) {
          const serviceId = serviceIds.shift()!
          subscriptionItems.push({
            subscription_id: subscriptionRecord.id,
            item_type: 'service',
            maintenance_service_id: serviceId,
            maintenance_option_id: null,
            name: productName,
            unit_price: unitPrice,
          })
        } else if (!isService && optionIds.length > 0) {
          const optionId = optionIds.shift()!
          subscriptionItems.push({
            subscription_id: subscriptionRecord.id,
            item_type: 'option',
            maintenance_service_id: null,
            maintenance_option_id: optionId,
            name: productName,
            unit_price: unitPrice,
          })
        } else {
          subscriptionItems.push({
            subscription_id: subscriptionRecord.id,
            item_type: isService ? 'service' : 'option',
            maintenance_service_id: null,
            maintenance_option_id: null,
            name: productName,
            unit_price: unitPrice,
          })
        }
      }

      if (subscriptionItems.length > 0) {
        const { error: itemsError } = await supabase
          .from('maintenance_subscription_items')
          .insert(subscriptionItems)

        if (itemsError) {
          console.error('❌ Erreur création maintenance_subscription_items:', itemsError)
          throw itemsError
        }

        console.log(`✅ ${subscriptionItems.length} item(s) de souscription créé(s)`)
      }

      // Email failures are non-fatal: Stripe shouldn't retry the webhook for
      // a transient SMTP problem.
      try {
        const emailServices = subscriptionItems
          .filter((item) => item.item_type === 'service')
          .map((item) => ({ name: item.name, price: item.unit_price }))

        const emailOptions = subscriptionItems
          .filter((item) => item.item_type === 'option')
          .map((item) => ({ name: item.name, price: item.unit_price }))

        const maintenanceEmailData: MaintenanceSubscriptionData = {
          customerName: customerRecord.name || customerRecord.email,
          customerEmail: customerRecord.email,
          customerPhone: customerRecord.phone || undefined,
          services: emailServices,
          options: emailOptions,
          billingPeriod: billingPeriod as 'monthly' | 'yearly',
          discountMultiPercent: discountMulti,
          discountAnnualPercent: discountAnnual,
          totalAfterDiscounts: totalAfterDiscounts,
          stripeSubscriptionId: subscription.id,
        }

        const clientEmailResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: customerRecord.email,
          subject: `Confirmation de souscription maintenance - Greenter`,
          html: maintenanceClientEmailTemplate(maintenanceEmailData),
        })
        if (clientEmailResult.error) {
          console.error('❌ Erreur envoi email client maintenance:', clientEmailResult.error)
        } else {
          console.log(`✅ Email client maintenance envoyé (customer ${customerRecord.id})`)
        }

        const adminEmailResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `🔧 Nouvelle souscription maintenance - customer ${customerRecord.id}`,
          html: maintenanceAdminEmailTemplate(maintenanceEmailData),
        })
        if (adminEmailResult.error) {
          console.error('❌ Erreur envoi email admin maintenance:', adminEmailResult.error)
        } else {
          console.log(`✅ Email admin maintenance envoyé`)
        }
      } catch (emailError) {
        console.error('❌ Erreur envoi emails maintenance (non bloquant):', emailError)
      }
      break
    }

    case 'customer.subscription.updated': {
      console.log(`📋 Traitement subscription.updated pour ${subscription.id}`)
      const newStatus = STRIPE_STATUS_MAP[subscription.status] || 'active'

      const { error: updateError } = await supabase
        .from('maintenance_subscriptions')
        .update({ status: newStatus })
        .eq('stripe_subscription_id', subscription.id)

      if (updateError) {
        console.error('❌ Erreur mise à jour statut maintenance_subscription:', updateError)
        throw updateError
      }
      console.log(`✅ Statut souscription maintenance mis à jour: ${subscription.id} → ${newStatus}`)
      break
    }

    case 'customer.subscription.deleted': {
      console.log(`📋 Traitement subscription.deleted pour ${subscription.id}`)
      const { error: deleteError } = await supabase
        .from('maintenance_subscriptions')
        .update({
          status: 'cancelled' as const,
          cancelled_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)

      if (deleteError) {
        console.error('❌ Erreur annulation maintenance_subscription:', deleteError)
        throw deleteError
      }
      console.log(`✅ Souscription maintenance annulée: ${subscription.id}`)
      break
    }
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    console.error('Webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Per-event-id deduplication. Skip silently with 200 if we've already
  // processed this event so Stripe stops retrying.
  let supabaseForClaim: SupabaseClient
  try {
    supabaseForClaim = getSupabase()
    const fresh = await claimEvent(supabaseForClaim, event)
    if (!fresh) {
      console.log(`⏭️ Event ${event.id} (${event.type}) déjà traité, skip`)
      return NextResponse.json({ received: true, deduped: true })
    }
  } catch (claimErr) {
    // Couldn't reach the dedup table — return 5xx so Stripe retries instead
    // of silently losing the event.
    console.error('❌ Erreur dedup webhook_events:', claimErr)
    return NextResponse.json({ error: 'dedup unavailable' }, { status: 500 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.payment_status === 'paid') {
        const { order } = await saveOrderToDatabase(session)
        console.log(`✅ Commande ${order?.order_number} enregistrée en base de données`)

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
          shippingAddress: customer?.address
            ? {
                line1: customer.address.line1 || undefined,
                line2: customer.address.line2 || undefined,
                city: customer.address.city || undefined,
                postal_code: customer.address.postal_code || undefined,
              }
            : undefined,
          productName: product?.name || 'KSTAR BluE-S 6kW',
          amount: (fullSession.amount_total || 0) / 100,
          orderDate,
        }

        // In-process PDF generation. Used to call /api/invoice/[id] over
        // HTTP, which suffered the route's per-IP rate limit (5/min) and
        // could throw under burst load, causing Stripe to retry forever.
        const { bytes } = await generateInvoicePdf(fullSession)

        await sendOrderEmails({
          order: orderData,
          invoicePdf: Buffer.from(bytes),
        })

        console.log(`✅ Emails envoyés pour la commande ${orderNumber}`)
      }
    } else if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      await handleSubscriptionEvent(event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    // Return 5xx so Stripe retries delivery. Previously this returned 200
    // and the customer was charged with no order recorded if the DB hiccupped.
    console.error(`❌ Erreur traitement webhook ${event.id} (${event.type}):`, error)

    // Best-effort: roll back the dedup claim so the retry actually re-runs.
    // If this fails (network), Stripe still retries; we just won't process
    // until the row is manually cleared. Acceptable failure mode.
    try {
      await supabaseForClaim.from('webhook_events').delete().eq('id', event.id)
    } catch (rollbackErr) {
      console.error('❌ Impossible de rollback la dedup:', rollbackErr)
    }

    return NextResponse.json({ error: 'processing failed' }, { status: 500 })
  }
}
