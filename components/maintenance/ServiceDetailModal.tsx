'use client'

import { useCallback, useEffect } from 'react'
import {
  Check,
  X,
  Plus,
  Minus,
  Flame,
  Wind,
  Sun,
  Droplets,
  SunMedium,
  SunDim,
  Zap,
  Wrench,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { formatEUR } from '@/lib/format'
import {
  useMaintenanceConfigurator,
  serviceIncludesDetails,
} from './MaintenanceConfiguratorContext'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Flame, Wind, Sun, Droplets, SunMedium, SunDim, Zap, Wrench, ShieldCheck,
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench
}

/**
 * ServiceDetailModal - Modal moderne pour les détails d'un service
 */
export function ServiceDetailModal() {
  const {
    detailService,
    setDetailService,
    selectedServices,
    setServiceQuantity,
    billingPeriod,
  } = useMaintenanceConfigurator()

  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && detailService) {
        setDetailService(null)
      }
    },
    [detailService, setDetailService]
  )

  useEffect(() => {
    if (detailService) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [detailService, handleKeyDown])

  const handleOverlayClick = useCallback(() => {
    setDetailService(null)
  }, [setDetailService])

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  if (!detailService) return null

  const Icon = getIcon(detailService.icon)
  const quantity = selectedServices[detailService.id] || 0
  const isSelected = quantity > 0
  const serviceDetails = serviceIncludesDetails[detailService.slug] || {}
  
  const monthlyPrice = detailService.price_monthly
  const annualPrice = monthlyPrice * 12
  const annualPriceWithDiscount = monthlyPrice * 10

  const handleIncrement = () => setServiceQuantity(detailService.id, quantity + 1)
  const handleDecrement = () => {
    if (quantity > 0) setServiceQuantity(detailService.id, quantity - 1)
  }
  const handleAddToSelection = () => {
    if (quantity === 0) setServiceQuantity(detailService.id, 1)
    setDetailService(null)
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
    >
      <div
        className="bg-white rounded-[2rem] max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-green-700 to-green-800 px-6 sm:px-8 py-8">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setDetailService(null)}
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
            <h2 id="service-detail-title" className="text-2xl sm:text-3xl font-bold text-white">
              {detailService.name}
            </h2>
          </div>

          {/* Price display */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">
                {billingPeriod === 'monthly' ? 'Prix mensuel' : 'Prix annuel'}
              </p>
              <p className="text-4xl font-extrabold text-white">
                {formatEUR(billingPeriod === 'monthly' ? monthlyPrice : annualPriceWithDiscount)}
                <span className="text-lg font-normal text-white/70 ml-1">
                  /{billingPeriod === 'monthly' ? 'mois' : 'an'}
                </span>
              </p>
            </div>
            {billingPeriod === 'yearly' && (
              <div className="text-right">
                <span className="bg-emerald-400 text-emerald-900 text-xs font-bold px-2 py-1 rounded-full">
                  🎁 2 mois offerts
                </span>
                <p className="text-white/50 text-sm line-through mt-1">
                  {formatEUR(annualPrice)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto max-h-[40vh]">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
            Ce qui est inclus
          </p>

          <div className="space-y-4">
            {detailService.includes?.map((item, index) => {
              const detail = serviceDetails[item]
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{item}</p>
                    {detail && (
                      <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">
                        {detail}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-6 bg-neutral-50 border-t border-neutral-100">
          {isSelected ? (
            /* Quantity selector */
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 font-medium">Quantité sélectionnée</span>
              <div className="flex items-center gap-3 bg-white rounded-full p-1 shadow-sm border border-neutral-200">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold text-green-800 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Add to selection button */
            <button
              type="button"
              onClick={handleAddToSelection}
              className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter à ma sélection
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailModal
