'use client'

import { useCallback } from 'react'
import { AlertCircle } from 'lucide-react'
import { useMaintenanceConfigurator, optionDetails } from './MaintenanceConfiguratorContext'
import { formatEUR } from '@/lib/format'

export interface MaintenanceOptionsSectionProps {
  className?: string
}

/**
 * MaintenanceOptionsSection - Section des options personnalisables
 * Design Material Design 3 avec style horizontal pour les options
 */
export function MaintenanceOptionsSection({ className = '' }: MaintenanceOptionsSectionProps) {
  const {
    options,
    selectedOptions,
    toggleOption,
    setDetailOption,
  } = useMaintenanceConfigurator()

  // Filter only active options and sort by sort_order
  const activeOptions = options
    .filter((option) => option.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)

  if (activeOptions.length === 0) {
    return null
  }

  // Check if an option has enriched details
  const hasDetails = (slug: string): boolean => {
    return slug in optionDetails
  }

  return (
    <section className={`px-4 sm:px-8 py-16 sm:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800">
            Personnalisez votre contrat
          </h2>
          <p className="text-neutral-600 mt-4">
            Optimisez votre couverture avec nos services complémentaires.
          </p>
        </div>

        {/* Options list */}
        <div className="space-y-6">
          {activeOptions.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              isSelected={selectedOptions.includes(option.id)}
              onToggle={() => toggleOption(option.id)}
              onShowDetails={hasDetails(option.slug) ? () => setDetailOption(option) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual option row component
interface OptionRowProps {
  option: {
    id: string
    name: string
    description: string | null
    price_monthly: number
    icon: string
    is_flat_fee: boolean
  }
  isSelected: boolean
  onToggle: () => void
  onShowDetails?: () => void
}

function OptionRow({ option, isSelected, onToggle, onShowDetails }: OptionRowProps) {
  const handleToggle = useCallback(() => {
    onToggle()
  }, [onToggle])

  return (
    <div 
      className={`
        bg-neutral-100 p-6 sm:p-8 rounded-[2rem] 
        flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8
        shadow-lg shadow-neutral-900/5
        transition-all duration-200
        ${isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50/50' : ''}
      `}
    >
      {/* Icon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 flex-shrink-0">
        <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
          <h3 className="text-xl sm:text-2xl font-bold text-green-800">
            {option.name}
          </h3>
          <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bold text-sm whitespace-nowrap">
            +{formatEUR(option.price_monthly)} {option.is_flat_fee ? '(forfait)' : '/mois'}
          </span>
        </div>
        {option.description && (
          <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
            {option.description}
          </p>
        )}
        {onShowDetails && (
          <button
            type="button"
            onClick={onShowDetails}
            className="text-emerald-700 font-medium hover:underline mt-2 text-sm"
          >
            En savoir plus →
          </button>
        )}
      </div>

      {/* Toggle switch */}
      <div className="flex-shrink-0">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isSelected}
            onChange={handleToggle}
          />
          <div className="
            w-14 h-7 
            bg-neutral-300 
            peer-focus:outline-none 
            peer-focus:ring-2 
            peer-focus:ring-green-500 
            peer-focus:ring-offset-2
            rounded-full 
            peer 
            peer-checked:after:translate-x-full 
            rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-white 
            after:content-[''] 
            after:absolute 
            after:top-0.5 
            after:start-[4px] 
            after:bg-white 
            after:border-gray-300 
            after:border 
            after:rounded-full 
            after:h-6 
            after:w-6 
            after:transition-all 
            peer-checked:bg-green-700
          " />
        </label>
      </div>
    </div>
  )
}

export default MaintenanceOptionsSection
