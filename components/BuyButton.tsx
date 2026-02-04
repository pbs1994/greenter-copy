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
      className="group bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold text-lg py-4 px-10 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/25 disabled:shadow-none min-w-[180px]"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Redirection...
        </>
      ) : (
        <>
          Acheter maintenant
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  )
}
