'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Phone, Mail, Truck, Wrench, Shield, Clock, FileText, ChevronRight, Download, Settings, MapPin } from 'lucide-react'
import { useObfuscatedEmail } from '@/components/ObfuscatedEmail'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

interface OrderItem {
  name: string
  description: string | null
  quantity: number
  unitPrice: number
  total: number
  image: string | null
}

interface OrderDetails {
  id: string
  orderNumber: string
  status: string
  amount: number
  currency: string
  customerEmail: string | null
  customerName: string | null
  customerPhone: string | null
  shippingAddress: {
    line1?: string
    line2?: string
    city?: string
    postal_code?: string
    country?: string
  } | null
  items: OrderItem[]
  receiptUrl: string | null
  createdAt: string
}

const steps = [
  {
    number: "1",
    title: "Confirmation par email",
    description: "Récapitulatif de commande envoyé dans les prochaines minutes.",
    icon: Mail,
    done: true,
  },
  {
    number: "2",
    title: "Livraison",
    description: "Livraison à domicile sous 2 à 4 jours ouvrés.",
    icon: Truck,
    done: false,
  },
  {
    number: "3",
    title: "Installation & mise en service",
    description: "Installation complète en 1 journée par nos techniciens certifiés RGE.",
    icon: Settings,
    done: false,
  },
]

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const decodedEmail = useObfuscatedEmail()

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/${sessionId}`)
        if (!response.ok) throw new Error('Failed to fetch order')

        const orderData = await response.json()
        setOrder(orderData)

        // Google Ads conversion tracking
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'purchase',
            'transaction_id': sessionId,
            'value': orderData.amount,
            'currency': 'EUR',
            'items': orderData.items.map((item: OrderItem) => ({
              'item_name': item.name,
              'price': item.unitPrice,
              'quantity': item.quantity,
            })),
          });

          if (window.gtag) {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-17839863014/BTP5CNrp-ewbEObp2rpC',
              'value': orderData.amount,
              'currency': 'EUR',
              'transaction_id': sessionId,
            });
          }
        }

        setStatus('success')
      } catch (error) {
        console.error('Error:', error)
        setStatus('error')
      }
    }

    fetchOrder()
  }, [sessionId])

  if (status === 'loading') {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-neutral-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Confirmation en cours...</p>
        </div>
      </main>
    )
  }

  if (status === 'error' || !order) {
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

  const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50">
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
                {/* Ligne verticale */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-200" />

                <div className="space-y-6">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={index} className="relative flex gap-5">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md ${
                          step.done
                            ? 'bg-green-600'
                            : 'bg-white ring-2 ring-neutral-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${step.done ? 'text-white' : 'text-neutral-400'}`} />
                        </div>

                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-sm ${step.done ? 'text-green-700' : 'text-neutral-900'}`}>
                              {step.title}
                            </h3>
                            {step.done && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Fait
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-500">
                            {step.description}
                          </p>
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
                  href={`/api/invoice/${sessionId}`}
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
                <button
                  onClick={() => decodedEmail && (window.location.href = `mailto:${decodedEmail}?subject=Commande ${order.orderNumber}`)}
                  className="w-full flex items-center justify-center gap-2 bg-green-800 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Envoyer un email
                </button>
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
            Retour à l'accueil
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-50">
        <div className="w-12 h-12 border-3 border-neutral-200 border-t-green-600 rounded-full animate-spin" />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
