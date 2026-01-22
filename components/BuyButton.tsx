'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

export function BuyButton() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className="group bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-medium py-3 px-7 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/25 disabled:shadow-none"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirection...
        </>
      ) : (
        <>
          Acheter
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  )
}
