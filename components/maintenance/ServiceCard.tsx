'use client'

import { useCallback, type KeyboardEvent } from 'react'
import {
  Check,
  Flame,
  Wind,
  Sun,
  Droplets,
  SunMedium,
  SunDim,
  Zap,
  Wrench,
  ShieldCheck,
  Plus,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import type { MaintenanceService, BillingPeriod } from '@/types/maintenance'
import { formatEUR } from '@/lib/format'

// Icon mapping from string to Lucide component
const iconMap: Record<string, LucideIcon> = {
  Flame,
  Wind,
  Sun,
  Droplets,
  SunMedium,
  SunDim,
  Zap,
  Wrench,
  ShieldCheck,
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench
}

export interface ServiceCardProps {
  service: MaintenanceService
  quantity: number
  billingPeriod: BillingPeriod
  onQuantityChange: (quantity: number) => void
  onShowDetails: () => void
}

/**
 * ServiceCard - Carte individuelle pour un service de maintenance
 * Design Material Design 3 avec quantité sélectionnable
 */
export function ServiceCard({
  service,
  quantity,
  billingPeriod,
  onQuantityChange,
  onShowDetails,
}: ServiceCardProps) {
  const Icon = getIcon(service.icon)
  const monthlyPrice = service.price_monthly
  const annualPrice = service.price_monthly * 12
  const annualPriceWithDiscount = service.price_monthly * 10 // 2 mois offerts
  const displayPrice = billingPeriod === 'monthly' ? monthlyPrice : annualPriceWithDiscount
  const isSelected = quantity > 0

  // Get first 2 includes for preview
  const previewIncludes = service.includes.slice(0, 2)

  const handleIncrement = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onQuantityChange(quantity + 1)
    },
    [quantity, onQuantityChange]
  )

  const handleDecrement = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (quantity > 0) {
        onQuantityChange(quantity - 1)
      }
    },
    [quantity, onQuantityChange]
  )

  const handleSelect = useCallback(() => {
    if (quantity === 0) {
      onQuantityChange(1)
    }
  }, [quantity, onQuantityChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSelect()
      }
    },
    [handleSelect]
  )

  const handleDetailsClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onShowDetails()
    },
    [onShowDetails]
  )

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={`
        relative flex flex-col p-8 rounded-[1.5rem] cursor-pointer
        transition-all duration-300 ease-out
        bg-white border
        ${isSelected
          ? 'border-green-500/30 shadow-xl shadow-green-500/10 -translate-y-2'
          : 'border-neutral-200/50 shadow-lg shadow-neutral-900/5 hover:-translate-y-2 hover:shadow-xl'
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
      `}
    >
      {/* Header: Icon + Price */}
      <div className="flex justify-between items-start mb-6">
        {/* Icon */}
        <div
          className={`
            w-14 h-14 rounded-full flex items-center justify-center
            ${isSelected ? 'bg-green-100' : 'bg-green-50'}
            transition-colors duration-200
          `}
        >
          <Icon
            className={`w-7 h-7 ${isSelected ? 'text-green-600' : 'text-green-700'}`}
            aria-hidden="true"
          />
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="text-3xl font-extrabold text-green-800" data-testid="price-monthly">
            {formatEUR(displayPrice)}
          </p>
          <p className="text-sm text-neutral-500">
            / {billingPeriod === 'monthly' ? 'mois' : 'an'}
            {billingPeriod === 'monthly' && (
              <span className="text-neutral-400"> ({formatEUR(annualPriceWithDiscount)}/an)</span>
            )}
          </p>
          {/* Show savings badge when yearly */}
          {billingPeriod === 'yearly' && (
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              🎁 2 mois offerts
              <span className="line-through text-neutral-400 ml-1">{formatEUR(annualPrice)}</span>
            </p>
          )}
        </div>
      </div>

      {/* Service name */}
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
        {service.name}
      </h3>

      {/* Includes preview */}
      <ul className="space-y-3 mb-8 flex-grow">
        {previewIncludes.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-neutral-600">
            <Check 
              className="w-5 h-5 text-green-600 flex-shrink-0" 
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="space-y-4 mt-auto">
        {/* Quantity selector or Select button */}
        {isSelected ? (
          <div className="flex items-center justify-center gap-4 bg-green-50 rounded-xl p-3">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-green-700 hover:bg-green-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-xl font-bold text-green-800 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-green-700 hover:bg-green-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSelect}
            className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Sélectionner
          </button>
        )}

        {/* Details link */}
        <button
          type="button"
          onClick={handleDetailsClick}
          className="block w-full text-center text-green-700 font-medium hover:underline focus:outline-none focus-visible:underline"
        >
          Voir le détail
        </button>
      </div>
    </div>
  )
}

export default ServiceCard
