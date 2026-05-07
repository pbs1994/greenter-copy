'use client'

import { Mail } from 'lucide-react'
import { useObfuscatedEmail } from '@/components/ObfuscatedEmail'

export function EmailButton({ orderNumber }: { orderNumber: string }) {
  const email = useObfuscatedEmail()

  return (
    <a
      href={email ? `mailto:${email}?subject=Commande ${orderNumber}` : undefined}
      className="w-full flex items-center justify-center gap-2 bg-green-800 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
    >
      <Mail className="w-4 h-4" />
      Envoyer un email
    </a>
  )
}
