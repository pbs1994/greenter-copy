'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [orderSaved, setOrderSaved] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    const saveOrder = async () => {
      try {
        // Vérifier si la commande existe déjà
        const { data: existing } = await supabase
          .from('orders')
          .select('id')
          .eq('stripe_session_id', sessionId)
          .single()

        if (existing) {
          setOrderSaved(true)
          setStatus('success')
          return
        }

        // Enregistrer la nouvelle commande
        const { error } = await supabase.from('orders').insert({
          stripe_session_id: sessionId,
          product_name: 'KSTAR BluE-S 6kW',
          amount: 2500,
          status: 'paid',
          created_at: new Date().toISOString(),
        })

        if (error) throw error

        setOrderSaved(true)
        setStatus('success')
      } catch (error) {
        console.error('Error saving order:', error)
        // Même si l'enregistrement échoue, le paiement est OK
        setStatus('success')
      }
    }

    saveOrder()
  }, [sessionId])

  if (status === 'loading') {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Confirmation en cours...</p>
        </div>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
        <div className="text-center max-w-md">
          <p className="text-neutral-600 mb-6">Une erreur est survenue. Contactez-nous si vous avez été débité.</p>
          <Link href="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Merci pour votre commande !
        </h1>
        
        <p className="text-neutral-600 mb-8">
          Votre paiement a été confirmé. Vous recevrez un email de confirmation avec les détails de votre commande.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-neutral-100 mb-8">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">KSTAR BluE-S 6kW</p>
              <p className="text-sm text-neutral-500">Nous vous contacterons pour planifier la livraison</p>
            </div>
          </div>
        </div>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors"
        >
          Retour à l'accueil
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  )
}
