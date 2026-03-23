'use client'

import { useCallback, useEffect } from 'react'
import {
  Check,
  X,
  ShieldCheck,
  Wrench,
  Sparkles,
  Zap,
  Clock,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react'
import { formatEUR } from '@/lib/format'
import {
  useMaintenanceConfigurator,
  optionDetails,
} from './MaintenanceConfiguratorContext'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  ShieldCheck, Wrench, Sparkles, Zap, Clock, AlertCircle,
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? AlertCircle
}

/**
 * OptionDetailModal - Modal moderne pour les détails d'une option
 */
export function OptionDetailModal() {
  const {
    detailOption,
    setDetailOption,
    selectedOptions,
    toggleOption,
  } = useMaintenanceConfigurator()

  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && detailOption) {
        setDetailOption(null)
      }
    },
    [detailOption, setDetailOption]
  )

  useEffect(() => {
    if (detailOption) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [detailOption, handleKeyDown])

  const handleOverlayClick = useCallback(() => {
    setDetailOption(null)
  }, [setDetailOption])

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  if (!detailOption) return null

  const Icon = getIcon(detailOption.icon)
  const isSelected = selectedOptions.includes(detailOption.id)
  const details = optionDetails[detailOption.slug]

  if (!details) return null

  const { benefits, whyUseful } = details

  const handleToggle = () => {
    toggleOption(detailOption.id)
    setDetailOption(null)
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="option-detail-title"
    >
      <div
        className="bg-white rounded-[2rem] max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 px-6 sm:px-8 py-8">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setDetailOption(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Icon and title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 id="option-detail-title" className="text-2xl sm:text-3xl font-bold text-white">
              {detailOption.name}
            </h2>
          </div>

          {/* Price display */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">
                {detailOption.is_flat_fee ? 'Prix forfaitaire' : 'Prix annuel'}
              </p>
              <p className="text-4xl font-extrabold text-white">
                {formatEUR(detailOption.is_flat_fee ? detailOption.price_monthly : detailOption.price_monthly * 12)}
                {!detailOption.is_flat_fee && (
                  <span className="text-lg font-normal text-white/70 ml-1">/an</span>
                )}
              </p>
            </div>
            {detailOption.is_flat_fee && (
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Paiement unique
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto max-h-[40vh]">
          {/* Why useful */}
          <div className="mb-6">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              Pourquoi cette option ?
            </p>
            <p className="text-neutral-600 leading-relaxed" data-testid="why-useful">
              {whyUseful}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
              Ce qui est inclus
            </p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3" data-testid="benefit-item">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-amber-600" strokeWidth={3} />
                  </div>
                  <p className="text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-6 bg-neutral-50 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleToggle}
            className={`
              w-full font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 
              transition-all hover:scale-[1.02] 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${isSelected 
                ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 focus-visible:ring-neutral-400' 
                : 'bg-amber-500 hover:bg-amber-600 text-white focus-visible:ring-amber-500'
              }
            `}
          >
            {isSelected ? (
              <>
                <Check className="w-5 h-5" />
                Retirer de ma sélection
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Ajouter à ma sélection
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OptionDetailModal
