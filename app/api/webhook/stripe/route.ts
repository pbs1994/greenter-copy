import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendOrderEmails } from '@/lib/send-order-emails'
import { OrderData, MaintenanceSubscriptionData, maintenanceClientEmailTemplate, maintenanceAdminEmailTemplate } from '@/lib/email-templates'
import { resend } from '@/lib/resend'
import type { SubscriptionStatus } from '@/types/maintenance'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@greenter.fr'
const FROM_EMAIL = process.env.FROM_EMAIL ? `Greenter <${process.env.FROM_EMAIL}>` : 'Greenter <contact@greenter.fr>'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Mapping des statuts Stripe vers nos statuts internes
 */
const STRIPE_STATUS_MAP: Record<string, SubscriptionStatus> = {
  active: 'active',
  past_due: 'past_due',
  canceled: 'cancelled',
  paused: 'paused',
}

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

  // Idempotence : vérifier si la commande existe déjà (webhook Stripe peut retenter)
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('id, order_number')
    .eq('stripe_session_id', session.id)
    .single()

  if (existingOrder) {
    console.log(`⏭️ Commande ${existingOrder.order_number} déjà existante, skip`)
    return { order: existingOrder, customer: customerRecord }
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

/**
 * Gère les événements de subscription Stripe pour les contrats de maintenance.
 * - customer.subscription.created → créer maintenance_subscription + items
 * - customer.subscription.updated → mettre à jour le statut
 * - customer.subscription.deleted → marquer comme cancelled
 *
 * Filtre sur metadata.type === 'maintenance' pour ignorer les autres subscriptions.
 */
async function handleSubscriptionEvent(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const metadata = subscription.metadata

  // Ignorer les subscriptions qui ne sont pas de type maintenance
  if (metadata?.type !== 'maintenance') {
    return
  }

  // Créer un client Supabase avec le service role key pour bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  switch (event.type) {
    case 'customer.subscription.created': {
      try {
        console.log(`📋 Traitement subscription.created pour ${subscription.id}`)

        // Récupérer les informations du client Stripe
        const stripeCustomer = await stripe.customers.retrieve(
          subscription.customer as string
        ) as Stripe.Customer

        // Upsert du client dans la table customers
        const { data: customerRecord, error: customerError } = await supabase
          .from('customers')
          .upsert(
            {
              email: stripeCustomer.email!,
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

        console.log(`✅ Client upsert: ${customerRecord.email}`)

        // Extraire les données depuis les metadata
        const billingPeriod = metadata.billing_period || 'monthly'
        const discountMulti = parseInt(metadata.discount_multi || '0', 10)
        const discountAnnual = parseInt(metadata.discount_annual || '0', 10)

        // Calculer le total depuis les items de la subscription
        const totalFromItems = subscription.items.data.reduce(
          (sum, item) => sum + (item.price?.unit_amount || 0),
          0
        )

        // total_monthly = total brut mensuel (avant remises), stocké dans metadata
        const totalMonthly = parseInt(metadata.total_monthly || '0', 10) || totalFromItems
        // total_after_discounts = montant final après remises, stocké dans metadata
        const totalAfterDiscounts = parseInt(metadata.total_after_discounts || '0', 10) || totalFromItems

        // Créer l'enregistrement maintenance_subscription
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

        // Extraire les IDs des services et options depuis les metadata
        const serviceIds = metadata.service_ids
          ? metadata.service_ids.split(',').filter(Boolean)
          : []
        const optionIds = metadata.option_ids
          ? metadata.option_ids.split(',').filter(Boolean)
          : []

        // Créer les items de souscription à partir des line items Stripe
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

          // Déterminer si c'est un service ou une option en cherchant dans les IDs
          // Les services ont le préfixe "Entretien " dans le nom du produit
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
            // Fallback : ajouter comme service ou option sans FK
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

          console.log(
            `✅ ${subscriptionItems.length} item(s) de souscription créé(s)`
          )
        }

        console.log(
          `✅ Souscription maintenance complète: ${subscriptionRecord.id} (${subscriptionItems.length} items)`
        )

        // Envoyer les emails de confirmation maintenance
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

          // 1. Email de confirmation au client
          const clientEmailResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: customerRecord.email,
            subject: `Confirmation de souscription maintenance - Greenter`,
            html: maintenanceClientEmailTemplate(maintenanceEmailData),
          })

          if (clientEmailResult.error) {
            console.error('❌ Erreur envoi email client maintenance:', clientEmailResult.error)
          } else {
            console.log(`✅ Email client maintenance envoyé à ${customerRecord.email}`)
          }

          // 2. Email de notification admin
          const adminEmailResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `🔧 Nouvelle souscription maintenance - ${customerRecord.name || customerRecord.email}`,
            html: maintenanceAdminEmailTemplate(maintenanceEmailData),
          })

          if (adminEmailResult.error) {
            console.error('❌ Erreur envoi email admin maintenance:', adminEmailResult.error)
          } else {
            console.log(`✅ Email admin maintenance envoyé à ${ADMIN_EMAIL}`)
          }
        } catch (emailError) {
          // Les erreurs d'email ne doivent PAS faire échouer le webhook
          console.error('❌ Erreur envoi emails maintenance (non bloquant):', emailError)
        }
      } catch (error) {
        console.error('❌ Erreur traitement subscription.created maintenance:', error)
      }
      break
    }

    case 'customer.subscription.updated': {
      try {
        console.log(`📋 Traitement subscription.updated pour ${subscription.id}`)

        // Mapper le statut Stripe vers notre enum
        const newStatus = STRIPE_STATUS_MAP[subscription.status] || 'active'

        const { error: updateError } = await supabase
          .from('maintenance_subscriptions')
          .update({ status: newStatus })
          .eq('stripe_subscription_id', subscription.id)

        if (updateError) {
          console.error('❌ Erreur mise à jour statut maintenance_subscription:', updateError)
          throw updateError
        }

        console.log(
          `✅ Statut souscription maintenance mis à jour: ${subscription.id} → ${newStatus}`
        )
      } catch (error) {
        console.error('❌ Erreur traitement subscription.updated maintenance:', error)
      }
      break
    }

    case 'customer.subscription.deleted': {
      try {
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

        console.log(
          `✅ Souscription maintenance annulée: ${subscription.id}`
        )
      } catch (error) {
        console.error('❌ Erreur traitement subscription.deleted maintenance:', error)
      }
      break
    }
  }
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

  // Traiter les événements de subscription maintenance
  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    await handleSubscriptionEvent(event)
  }

  return NextResponse.json({ received: true })
}
