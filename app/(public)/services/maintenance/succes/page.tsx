import Link from 'next/link'
import Stripe from 'stripe'
import {
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  FileText,
  ChevronRight,
  Wrench,
  Calendar,
  AlertTriangle,
} from 'lucide-react'

export const metadata = {
  title: 'Souscription confirmée | Maintenance Greenter',
  description: 'Votre contrat de maintenance a bien été souscrit. Récapitulatif de votre souscription.',
}

interface LineItemInfo {
  name: string
  amount: number // centimes
  interval: string
}

async function getSessionData(sessionId: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover' as Stripe.LatestApiVersion,
    })

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'subscription'],
    })

    if (!session || session.status !== 'complete') {
      return null
    }

    // Extract line items
    const lineItems: LineItemInfo[] = (session.line_items?.data || []).map((item) => ({
      name: item.description || 'Service',
      amount: item.amount_total || 0,
      interval: (item.price?.recurring?.interval === 'year') ? 'annuel' : 'mensuel',
    }))

    // Extract metadata
    const metadata = session.metadata || {}
    const billingPeriod = metadata.billing_period || 'monthly'
    const discountMulti = parseInt(metadata.discount_multi || '0', 10)
    const discountAnnual = parseInt(metadata.discount_annual || '0', 10)

    // Calculate total from line items
    const totalAmount = session.amount_total || 0

    // Customer info
    const customerName = session.customer_details?.name || null
    const customerEmail = session.customer_details?.email || null

    return {
      lineItems,
      billingPeriod,
      discountMulti,
      discountAnnual,
      totalAmount,
      customerName,
      customerEmail,
    }
  } catch (error) {
    console.error('Erreur récupération session Stripe:', error)
    return null
  }
}

function formatCentimes(centimes: number): string {
  return (centimes / 100).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default async function MaintenanceSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  if (!sessionId) {
    return <ErrorState />
  }

  const sessionData = await getSessionData(sessionId)

  if (!sessionData) {
    return <ErrorState />
  }

  const {
    lineItems,
    billingPeriod,
    discountMulti,
    discountAnnual,
    totalAmount,
    customerName,
  } = sessionData

  const periodLabel = billingPeriod === 'yearly' ? 'annuel' : 'mensuel'
  const periodSuffix = billingPeriod === 'yearly' ? '/an' : '/mois'

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-teal-700 text-white">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            Souscription confirmée !
          </h1>
          <p className="text-green-100 mb-2">
            {customerName
              ? `Merci ${customerName.split(' ')[0]} !`
              : 'Merci pour votre confiance !'}{' '}
            Votre contrat de maintenance a bien été souscrit.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
            <span className="text-green-200">Facturation :</span>
            <span className="font-semibold capitalize">{periodLabel}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 -mt-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-3 space-y-6">
            {/* Récapitulatif souscription */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="font-semibold text-neutral-900">
                  Récapitulatif de votre souscription
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {lineItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Wrench className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-neutral-900">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-neutral-900">
                        {formatCentimes(item.amount)} €{periodSuffix}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Remises */}
                {(discountMulti > 0 || discountAnnual > 0) && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
                    {discountMulti > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700">
                          🎉 Remise multi-équipements
                        </span>
                        <span className="font-medium text-green-700">
                          -{discountMulti}%
                        </span>
                      </div>
                    )}
                    {discountAnnual > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700">
                          🎉 Remise paiement annuel
                        </span>
                        <span className="font-medium text-green-700">
                          -{discountAnnual}%
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-semibold text-neutral-900">Total</span>
                  <span className="text-lg font-bold text-neutral-900">
                    {formatCentimes(totalAmount)} €{periodSuffix}
                  </span>
                </div>
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 p-6">
              <h2 className="font-semibold text-neutral-900 mb-6">
                Prochaines étapes
              </h2>

              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200" />

                <div className="space-y-6">
                  {/* Étape 1 - Email */}
                  <div className="relative flex gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md bg-green-600">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-green-700">
                          Email de confirmation
                        </h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Envoyé
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Un récapitulatif de votre souscription vous a été envoyé par
                        email.
                      </p>
                    </div>
                  </div>

                  {/* Étape 2 - Contact */}
                  <div className="relative flex gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md bg-white ring-2 ring-neutral-200">
                      <Calendar className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-neutral-900">
                          Prise de contact sous 48h
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Notre équipe vous contactera{' '}
                        <strong className="text-neutral-700">
                          sous 48 heures
                        </strong>{' '}
                        pour planifier ensemble votre première intervention
                        d&apos;entretien.
                      </p>
                    </div>
                  </div>

                  {/* Étape 3 - Intervention réalisée */}
                  <div className="relative flex gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md bg-white ring-2 ring-neutral-200">
                      <Wrench className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-neutral-900">
                          Intervention d&apos;entretien
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Un technicien certifié réalisera l&apos;entretien complet de
                        vos équipements à la date convenue, avec remise d&apos;un rapport détaillé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Conditions du contrat */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100">
                <h2 className="font-semibold text-neutral-900 text-sm">
                  Conditions du contrat
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Contrat annuel
                    </p>
                    <p className="text-xs text-neutral-500">
                      Votre contrat est valable 12 mois à compter de la date
                      de souscription.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Intervention incluse
                    </p>
                    <p className="text-xs text-neutral-500">
                      1 intervention d&apos;entretien incluse, planifiée avec vous
                      sous 48h.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Pièces non incluses
                    </p>
                    <p className="text-xs text-neutral-500">
                      Les pièces de remplacement ne sont pas incluses et seront
                      facturées séparément si nécessaire.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Rapport d&apos;intervention
                    </p>
                    <p className="text-xs text-neutral-500">
                      Un rapport détaillé vous sera remis après l&apos;intervention.
                    </p>
                  </div>
                </div>
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
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-green-800 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Nous contacter
                </Link>
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

function ErrorState() {
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
          Impossible de récupérer les détails de votre souscription. Si vous avez
          été débité, contactez-nous immédiatement.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+33609455056"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            06 09 45 50 56
          </a>
          <Link
            href="/services/maintenance"
            className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-sm px-6 py-3 rounded-lg transition-colors"
          >
            Retour à la maintenance
          </Link>
        </div>
      </div>
    </main>
  )
}
