import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Phone, Mail, Truck, Wrench, Clock, ChevronRight, Download, Settings, MapPin } from 'lucide-react'
import Stripe from 'stripe'
import { notFound } from 'next/navigation'
import { ConversionTracker } from './ConversionTracker'
import { EmailButton } from './EmailButton'
import { buildSignedInvoiceUrl } from '@/lib/invoice-signing'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

// Window during which the success page will render full PII (name, email,
// shipping address). After this expires we still confirm the order but show
// only the order number — limits the blast radius of a leaked session_id
// (URL is exposed to analytics, browser history, conversion trackers, …).
const FULL_DETAILS_TTL_SECONDS = 30 * 60

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

async function getOrder(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent', 'line_items', 'line_items.data.price.product'],
  })

  if (!session || session.payment_status !== 'paid') return null

  const ageSeconds = Math.floor(Date.now() / 1000) - session.created
  if (ageSeconds > FULL_DETAILS_TTL_SECONDS) return 'expired' as const

  const paymentIntent = session.payment_intent as Stripe.PaymentIntent
  let receiptUrl = null
  if (paymentIntent?.id) {
    const charges = await stripe.charges.list({ payment_intent: paymentIntent.id, limit: 1 })
    if (charges.data.length > 0) receiptUrl = charges.data[0].receipt_url
  }

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

  return {
    id: session.id,
    orderNumber: `GRT-${session.id.slice(-8).toUpperCase()}`,
    amount: session.amount_total ? session.amount_total / 100 : 0,
    currency: session.currency?.toUpperCase() || 'EUR',
    customerEmail: session.customer_details?.email || null,
    customerName: session.customer_details?.name || null,
    customerPhone: session.customer_details?.phone || null,
    shippingAddress: (session as { shipping_details?: { address?: Stripe.Address } }).shipping_details?.address || null,
    items,
    receiptUrl,
    createdAt: new Date(session.created * 1000).toISOString(),
  }
}

const steps = [
  { title: "Confirmation par email", description: "Récapitulatif de commande envoyé dans les prochaines minutes.", icon: Mail, done: true },
  { title: "Livraison", description: "Livraison à domicile sous 2 à 4 jours ouvrés.", icon: Truck, done: false },
  { title: "Installation & mise en service", description: "Installation complète en 1 journée par nos techniciens certifiés RGE.", icon: Settings, done: false },
]

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId) notFound()

  const order = await getOrder(sessionId)

  if (!order) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="font-heading text-xl font-bold text-neutral-900 mb-3">
            Session invalide
          </h1>
          <p className="text-neutral-600 text-sm mb-6">
            Si vous avez été débité, contactez-nous immédiatement.
          </p>
          <a href="tel:+33609455056" className="btn-primary">
            <Phone className="w-4 h-4" />
            06 09 45 50 56
          </a>
        </div>
      </main>
    )
  }

  // Session is valid but the post-checkout window has elapsed. Render a
  // minimal, no-PII confirmation so anyone who later finds the URL in
  // browser history, server logs, or the conversion tracker can't enumerate
  // the customer.
  if (order === 'expired') {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-heading text-xl font-bold text-neutral-900 mb-3">
            Commande confirmée
          </h1>
          <p className="text-neutral-600 text-sm mb-6">
            Votre commande a bien été enregistrée. Pour récupérer le détail ou
            la facture, consultez votre email de confirmation ou contactez-nous.
          </p>
          <a href="tel:+33609455056" className="btn-primary">
            <Phone className="w-4 h-4" />
            06 09 45 50 56
          </a>
        </div>
      </main>
    )
  }

  const invoiceHref = buildSignedInvoiceUrl(sessionId)

  const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50">
      {/* Google Ads conversion tracking (client-side) */}
      <ConversionTracker
        sessionId={sessionId}
        amount={order.amount}
        items={order.items.map((item) => ({
          name: item.name,
          price: item.unitPrice,
          quantity: item.quantity,
        }))}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-teal-700 text-white">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            Commande confirmée
          </h1>
          <p className="text-green-100 mb-4">
            {order.customerName ? `Merci ${order.customerName.split(' ')[0]} !` : 'Merci pour votre confiance !'} Votre commande a bien été enregistrée.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
            <span className="text-green-200">N° de commande :</span>
            <span className="font-mono font-semibold">{order.orderNumber}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 -mt-6">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Colonne principale */}
          <div className="lg:col-span-3 space-y-6">

            {/* Produits commandés */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="font-semibold text-neutral-900">Votre commande</h2>
              </div>
              <div className="p-6 space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      ) : (
                        <Wrench className="w-8 h-8 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-neutral-500 mb-2">{item.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-sm">
                        {item.quantity > 1 && (
                          <span className="text-neutral-500">Qté : {item.quantity}</span>
                        )}
                        <span className="font-medium text-neutral-900">
                          {item.total.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Adresse de livraison */}
              {order.shippingAddress && (
                <div className="px-6 py-4 border-t border-neutral-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Adresse de livraison</p>
                      <p className="text-sm text-neutral-900">
                        {order.customerName}<br />
                        {order.shippingAddress.line1}
                        {order.shippingAddress.line2 && <><br />{order.shippingAddress.line2}</>}
                        <br />
                        {order.shippingAddress.postal_code} {order.shippingAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Services inclus */}
              <div className="px-6 py-4 bg-green-50/50 border-t border-green-100">
                <p className="text-xs text-green-700 font-medium uppercase tracking-wider mb-3">Services inclus</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <Truck className="w-4 h-4" />
                    <span>Livraison</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <Wrench className="w-4 h-4" />
                    <span>Installation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <Settings className="w-4 h-4" />
                    <span>Mise en service</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline des étapes */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 p-6">
              <h2 className="font-semibold text-neutral-900 mb-6">Prochaines étapes</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200" />
                <div className="space-y-6">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={index} className="relative flex gap-5">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md ${
                          step.done ? 'bg-green-600' : 'bg-white ring-2 ring-neutral-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${step.done ? 'text-white' : 'text-neutral-400'}`} />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-sm ${step.done ? 'text-green-700' : 'text-neutral-900'}`}>
                              {step.title}
                            </h3>
                            {step.done && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Fait</span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-500">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Récapitulatif */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100">
                <h2 className="font-semibold text-neutral-900 text-sm">Récapitulatif</h2>
              </div>
              <div className="p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Date</span>
                    <span className="text-neutral-900">{orderDate}</span>
                  </div>
                  {order.customerEmail && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Email</span>
                      <span className="text-neutral-900 text-right truncate ml-2">{order.customerEmail}</span>
                    </div>
                  )}
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-neutral-500">{item.name}{item.quantity > 1 ? ` x${item.quantity}` : ''}</span>
                      <span className="text-neutral-900">{item.total.toLocaleString('fr-FR')} €</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Livraison</span>
                    <span className="text-green-600">Offerte</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Installation</span>
                    <span className="text-green-600">Incluse</span>
                  </div>
                  <div className="border-t border-neutral-100 pt-3 flex justify-between">
                    <span className="font-semibold text-neutral-900">Total TTC</span>
                    <span className="font-bold text-neutral-900">{order.amount.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>
              </div>

              {/* Bouton facture */}
              <div className="px-5 pb-5">
                <a
                  href={invoiceHref}
                  download={`facture-${order.orderNumber}.pdf`}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Télécharger la facture
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-green-900 rounded-2xl p-5 text-white">
              <p className="font-medium mb-1">Une question ?</p>
              <p className="text-green-300 text-sm mb-4 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Lun - Ven : 9h - 19h
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+33609455056"
                  className="w-full flex items-center justify-center gap-2 bg-white text-green-900 font-medium text-sm py-2.5 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  06 09 45 50 56
                </a>
                <EmailButton orderNumber={order.orderNumber} />
              </div>
            </div>
          </div>
        </div>

        {/* Retour */}
        <div className="text-center py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 text-sm transition-colors"
          >
            Retour à l&apos;accueil
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
