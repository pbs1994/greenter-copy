'use client'

import { useCallback, type KeyboardEvent } from 'react'
import type { BillingPeriod } from '@/types/maintenance'

export interface BillingToggleProps {
  value: BillingPeriod
  onChange: (value: BillingPeriod) => void
  className?: string
}

/**
 * Toggle visuel Mensuel/Annuel avec animation fluide
 * Support clavier complet (Tab, Enter, Space)
 * Validates: Requirements 5.2, 7.10
 */
export function BillingToggle({ value, onChange, className = '' }: BillingToggleProps) {
  const isYearly = value === 'yearly'

  const handleToggle = useCallback(() => {
    onChange(isYearly ? 'monthly' : 'yearly')
  }, [isYearly, onChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleToggle()
      }
    },
    [handleToggle]
  )

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {/* Label Mensuel */}
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          !isYearly ? 'text-green-700' : 'text-neutral-500'
        }`}
      >
        Mensuel
      </span>

      {/* Toggle Switch - min 44x44px touch target */}
      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        aria-label={`Basculer vers ${isYearly ? 'mensuel' : 'annuel'}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="relative inline-flex h-11 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 bg-green-100"
      >
        {/* Track background with gradient */}
        <span
          className={`absolute inset-0 rounded-full transition-colors duration-200 ${
            isYearly ? 'bg-green-500' : 'bg-green-200'
          }`}
        />
        
        {/* Thumb/Knob */}
        <span
          className={`pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
            isYearly ? 'translate-x-[26px]' : 'translate-x-[2px]'
          }`}
        />
      </button>

      {/* Label Annuel */}
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          isYearly ? 'text-green-700' : 'text-neutral-500'
        }`}
      >
        Annuel
      </span>
    </div>
  )
}

export default BillingToggle
