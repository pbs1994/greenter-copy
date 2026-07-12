'use client'

import { useState } from 'react'
import { Copy, Check, Link as LinkIcon } from 'lucide-react'

export function ReferralLinkCard({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (old browser, non-HTTPS context) — the
      // link is still selectable by hand from the read-only input below.
    }
  }

  return (
    <div className="bg-white rounded-xl ring-1 ring-neutral-200 p-5 mb-8">
      <div className="flex items-center gap-2 mb-2">
        <LinkIcon className="w-4 h-4 text-green-600" />
        <h2 className="text-sm font-semibold text-neutral-700">Votre lien de parrainage</h2>
      </div>
      <p className="text-xs text-neutral-500 mb-3 max-w-2xl">
        Envoyez ce lien à vos clients (SMS, WhatsApp, email...). Dès qu&apos;ils cliquent dessus —
        sur n&apos;importe quelle page du site — ils vous sont associés pendant 30 jours. S&apos;ils
        vous contactent ensuite via un formulaire, un bouton « Appeler », ou achètent directement dans
        la boutique en ligne, la vente vous sera automatiquement attribuée.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          readOnly
          value={link}
          onFocus={(e) => e.currentTarget.select()}
          className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-mono text-neutral-700 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
    </div>
  )
}
