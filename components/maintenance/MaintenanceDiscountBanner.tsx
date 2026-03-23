'use client'

import { useMaintenanceConfigurator } from './MaintenanceConfiguratorContext'

/**
 * Get the active tier index based on selected service count
 * Returns -1 if no tier is active (less than 2 services)
 */
function getActiveTierIndex(serviceCount: number): number {
  if (serviceCount >= 4) return 2 // tier 3 (15%)
  if (serviceCount === 3) return 1 // tier 2 (10%)
  if (serviceCount === 2) return 0 // tier 1 (5%)
  return -1 // no tier active
}

export interface MaintenanceDiscountBannerProps {
  className?: string
}

/**
 * MaintenanceDiscountBanner - Bandeau de remises visuelles
 * Design Material Design 3 avec fond vert foncé et cartes transparentes
 */
export function MaintenanceDiscountBanner({ className = '' }: MaintenanceDiscountBannerProps) {
  const { selectedServices } = useMaintenanceConfigurator()
  
  // Count total services (sum of quantities)
  const serviceCount = Object.values(selectedServices).reduce((sum, qty) => sum + qty, 0)
  const activeTierIndex = getActiveTierIndex(serviceCount)

  const tiers = [
    { count: '2 éq.', discount: '-5%' },
    { count: '3 éq.', discount: '-10%' },
    { count: '4+ éq.', discount: '-15%' },
  ]

  return (
    <section className={`px-4 sm:px-8 py-16 ${className}`}>
      <div className="max-w-7xl mx-auto bg-green-800 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-white">
          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Plus vous équipez, plus vous économisez.
            </h2>
            <p className="text-white/80 text-lg">
              Regroupez vos contrats de maintenance pour bénéficier d'une remise exclusive sur l'ensemble de vos abonnements.
            </p>
          </div>

          {/* Discount tiers */}
          <div 
            className="lg:w-1/2 grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-md lg:max-w-none"
            role="list"
            aria-label="Paliers de remise multi-équipements"
          >
            {tiers.map((tier, index) => {
              const isActive = index === activeTierIndex
              const isHighest = index === 2

              return (
                <div
                  key={index}
                  role="listitem"
                  data-tier={index}
                  className={`
                    bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center 
                    border border-white/20
                    transition-all duration-300
                    ${isActive ? 'tier-active ring-2 ring-emerald-300 bg-white/20' : ''}
                    ${isHighest && !isActive ? 'scale-105 shadow-xl shadow-black/20' : ''}
                    ${isHighest && isActive ? 'scale-110 shadow-xl shadow-black/30' : ''}
                  `}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <p className="text-2xl sm:text-3xl font-bold">{tier.count}</p>
                  <p className="text-emerald-300 font-bold text-lg sm:text-xl">{tier.discount}</p>
                  
                  {isActive && (
                    <span className="sr-only">
                      (Palier actif avec {serviceCount} équipements sélectionnés)
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-700/50 rounded-full blur-3xl" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default MaintenanceDiscountBanner
