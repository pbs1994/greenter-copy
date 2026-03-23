'use client'

import { useCallback, type KeyboardEvent } from 'react'
import {
  Check,
  ShieldCheck,
  Wrench,
  Sparkles,
  Zap,
  Clock,
  type LucideIcon,
} from 'lucide-react'
import type { MaintenanceOption, BillingPeriod } from '@/types/maintenance'
import { formatEUR } from '@/lib/format'

// Icon mapping from string to Lucide component
const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Wrench,
  Sparkles,
  Zap,
  Clock,
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench
}

export interface OptionCardProps {
  option: MaintenanceOption
  isSelected: boolean
  billingPeriod: BillingPeriod
  onToggle: () => void
  onShowDetails?: () => void
}

/**
 * OptionCard - Carte individuelle pour une option de maintenance
 * 
 * Différencie visuellement options récurrentes vs forfaits uniques
 * Indicateur de sélection (coche ambre, bordure)
 * Bouton "En savoir plus" conditionnel
 * 
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4
 */
export function OptionCard({
  option,
  isSelected,
  billingPeriod,
  onToggle,
  onShowDetails,
}: OptionCardProps) {
  const Icon = getIcon(option.icon)
  const price = option.price_monthly
  const annualPrice = option.price_monthly * 12

  // Handle keyboard activation for the card
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onToggle()
      }
    },
    [onToggle]
  )

  // Handle keyboard activation for the details button
  const handleDetailsKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.stopPropagation()
        onShowDetails?.()
      }
    },
    [onShowDetails]
  )

  // Prevent card toggle when clicking details button
  const handleDetailsClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onShowDetails?.()
    },
    [onShowDetails]
  )

  // Build price display based on option type
  const renderPriceDisplay = () => {
    if (option.is_flat_fee) {
      // Flat fee: show single price with "forfait unique" label
      return (
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-bold text-amber-600"
              data-testid="price-flat-fee"
            >
              {formatEUR(price)}
            </span>
          </div>
          <span 
            className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full w-fit"
            data-testid="flat-fee-label"
          >
            forfait unique
          </span>
        </div>
      )
    }

    // Recurring option: show monthly and annual prices with suffixes
    return (
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-baseline gap-2">
          <span
            className={`text-2xl font-bold ${
              billingPeriod === 'monthly' ? 'text-amber-600' : 'text-neutral-500'
            }`}
            data-testid="price-monthly"
          >
            {formatEUR(price)}
          </span>
          <span className="text-sm text-neutral-500">/mois</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-lg font-semibold ${
              billingPeriod === 'yearly' ? 'text-amber-600' : 'text-neutral-500'
            }`}
            data-testid="price-annual"
          >
            {formatEUR(annualPrice)}
          </span>
          <span className="text-sm text-neutral-500">/an</span>
        </div>
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${option.name}, ${formatEUR(price)}${option.is_flat_fee ? ' forfait unique' : ' par mois'}. ${isSelected ? 'Sélectionné' : 'Non sélectionné'}`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`
        relative flex flex-col p-5 rounded-xl cursor-pointer
        transition-all duration-200 ease-out
        bg-white border-2
        ${isSelected
          ? 'border-amber-500 shadow-lg shadow-amber-100'
          : 'border-neutral-200 hover:border-amber-300 hover:shadow-md'
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
      `}
    >
      {/* Selection indicator - amber checkmark */}
      {isSelected && (
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center"
          aria-hidden="true"
          data-testid="selection-indicator"
        >
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      )}

      {/* Icon */}
      <div
        className={`
          w-12 h-12 rounded-lg flex items-center justify-center mb-4
          ${isSelected ? 'bg-amber-100' : 'bg-neutral-100'}
          transition-colors duration-200
        `}
      >
        <Icon
          className={`w-6 h-6 ${isSelected ? 'text-amber-600' : 'text-neutral-600'}`}
          aria-hidden="true"
        />
      </div>

      {/* Option name */}
      <h3 className="text-lg font-semibold text-neutral-900 mb-3">
        {option.name}
      </h3>

      {/* Price display - different for flat fee vs recurring */}
      {renderPriceDisplay()}

      {/* Brief description if available */}
      {option.description && (
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {option.description}
        </p>
      )}

      {/* "En savoir plus" button - only when onShowDetails is provided */}
      {onShowDetails && (
        <button
          type="button"
          onClick={handleDetailsClick}
          onKeyDown={handleDetailsKeyDown}
          className={`
            mt-auto pt-3 text-sm font-medium
            ${isSelected ? 'text-amber-600 hover:text-amber-700' : 'text-neutral-600 hover:text-amber-600'}
            transition-colors duration-200
            focus:outline-none focus-visible:underline
          `}
          aria-label={`En savoir plus sur ${option.name}`}
        >
          En savoir plus →
        </button>
      )}
    </div>
  )
}

export default OptionCard
