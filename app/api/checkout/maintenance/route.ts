import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { calculatePricing } from '@/lib/maintenance-pricing'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceIds, optionIds, billingPeriod } = body

    // Validation des entrées
    if (!Array.isArray(serviceIds)) {
      return NextResponse.json(
        { error: 'Format des services invalide' },
        { status: 400 }
      )
    }

    if (!Array.isArray(optionIds)) {
      return NextResponse.json(
        { error: 'Format des options invalide' },
        { status: 400 }
      )
    }

    if (serviceIds.length === 0 && optionIds.length === 0) {
      return NextResponse.json(
        { error: 'Veuillez sélectionner au moins un service ou une option' },
        { status: 400 }
      )
    }

    if (billingPeriod !== 'monthly' && billingPeriod !== 'yearly') {
      return NextResponse.json(
        { error: 'Période de facturation invalide' },
        { status: 400 }
      )
    }

    // Utiliser le service role key pour accéder aux données (comme le webhook)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Fetch services actifs depuis Supabase
    let services: any[] = []
    if (serviceIds.length > 0) {
      const { data: servicesData, error: servicesError } = await supabase
        .from('maintenance_services')
        .select('*')
        .in('id', serviceIds)
        .eq('is_active', true)

      if (servicesError) {
        console.error('Erreur récupération services:', servicesError)
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des services' },
          { status: 500 }
        )
      }

      services = servicesData || []
    }

    // Fetch options si des IDs sont fournis
    let options: any[] = []
    if (optionIds.length > 0) {
      const { data: optionsData, error: optionsError } = await supabase
        .from('maintenance_options')
        .select('*')
        .in('id', optionIds)
        .eq('is_active', true)

      if (optionsError) {
        console.error('Erreur récupération options:', optionsError)
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des options' },
          { status: 500 }
        )
      }

      options = optionsData || []
    }

    // Vérifier qu'on a au moins un item valide
    if (services.length === 0 && options.length === 0) {
      return NextResponse.json(
        { error: 'Aucun service ou option actif sélectionné' },
        { status: 400 }
      )
    }

    // Calculer les prix avec remises (en passant le billingPeriod)
    const pricing = calculatePricing(
      services,
      options,
      serviceIds,
      optionIds,
      billingPeriod
    )

    // Séparer options flat fee vs récurrentes
    const flatFeeOptions = options.filter((o: any) => o.is_flat_fee)
    const recurringOptions = options.filter((o: any) => !o.is_flat_fee)

    // Déterminer si on a des items récurrents
    const hasRecurringItems = services.length > 0 || recurringOptions.length > 0

    // Compter les quantités de chaque service (serviceIds peut avoir des doublons)
    const serviceQuantities: Record<string, number> = {}
    for (const id of serviceIds) {
      serviceQuantities[id] = (serviceQuantities[id] || 0) + 1
    }

    // Créer les line_items Stripe pour les items récurrents (subscription)
    const recurringLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    // Ajouter chaque service comme line_item avec prix ajusté (remise multi appliquée)
    // Pour l'annuel: 10 mois au lieu de 12 (2 mois offerts)
    const uniqueServiceIds = [...new Set(serviceIds)]
    for (const serviceId of uniqueServiceIds) {
      const service = services.find((s: any) => s.id === serviceId)
      if (!service) continue

      const qty = serviceQuantities[serviceId] || 1
      const discountedPrice = Math.round(
        service.price_monthly * (1 - pricing.discountMultiPercent / 100)
      )
      // Annuel = 10 mois (2 mois offerts), Mensuel = prix mensuel
      const unitAmount = billingPeriod === 'yearly'
        ? discountedPrice * 10  // 2 mois offerts
        : discountedPrice

      recurringLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: `Entretien ${service.name}` },
          unit_amount: unitAmount,
          recurring: {
            interval: billingPeriod === 'yearly' ? 'year' : 'month',
          },
        },
        quantity: qty,
      })
    }

    // Ajouter les options récurrentes comme line_items
    for (const option of recurringOptions) {
      // Annuel = 10 mois (2 mois offerts), Mensuel = prix mensuel
      const unitAmount = billingPeriod === 'yearly'
        ? option.price_monthly * 10  // 2 mois offerts
        : option.price_monthly

      recurringLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: option.name },
          unit_amount: unitAmount,
          recurring: {
            interval: billingPeriod === 'yearly' ? 'year' : 'month',
          },
        },
        quantity: 1,
      })
    }

    // Créer les line_items pour les forfaits uniques (one-time)
    const flatFeeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = flatFeeOptions.map(
      (option: any) => ({
        price_data: {
          currency: 'eur',
          product_data: { name: option.name },
          unit_amount: option.price_monthly, // prix fixe, pas mensuel
        },
        quantity: 1,
      })
    )

    // Metadata partagée entre session et subscription
    const sharedMetadata = {
      type: 'maintenance',
      service_ids: serviceIds.join(','),
      option_ids: optionIds.join(','),
      billing_period: billingPeriod,
      discount_multi: String(pricing.discountMultiPercent),
      discount_annual: String(pricing.discountAnnualPercent),
      total_monthly: String(pricing.totalMonthly),
      total_after_discounts: String(pricing.totalDisplay),
      flat_fee_option_ids: flatFeeOptions.map((o: any) => o.id).join(','),
    }

    // Déterminer le mode de checkout
    // Si on a des items récurrents → mode subscription (flat fees ajoutés via invoice items)
    // Si on a UNIQUEMENT des flat fees → mode payment (one-time)
    if (hasRecurringItems) {
      // Mode subscription : les flat fees sont ajoutés comme invoice items one-time
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [...recurringLineItems, ...flatFeeLineItems],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/maintenance/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/maintenance`,
        billing_address_collection: 'required',
        phone_number_collection: { enabled: true },
        metadata: sharedMetadata,
        subscription_data: {
          metadata: sharedMetadata,
        },
      })

      return NextResponse.json({ url: session.url })
    } else {
      // Mode payment : uniquement des forfaits uniques, pas de subscription
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: flatFeeLineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/maintenance/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/maintenance`,
        billing_address_collection: 'required',
        phone_number_collection: { enabled: true },
        metadata: sharedMetadata,
      })

      return NextResponse.json({ url: session.url })
    }
  } catch (error) {
    console.error('Erreur création session checkout maintenance:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}
