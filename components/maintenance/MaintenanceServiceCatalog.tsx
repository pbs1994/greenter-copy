'use client'

import { useMaintenanceConfigurator } from './MaintenanceConfiguratorContext'
import { ServiceCard } from './ServiceCard'

export interface MaintenanceServiceCatalogProps {
  className?: string
}

/**
 * MaintenanceServiceCatalog - Grille responsive des services de maintenance
 * Design Material Design 3 avec fond légèrement teinté
 */
export function MaintenanceServiceCatalog({ className = '' }: MaintenanceServiceCatalogProps) {
  const {
    services,
    selectedServices,
    billingPeriod,
    setBillingPeriod,
    setServiceQuantity,
    setDetailService,
  } = useMaintenanceConfigurator()

  // Filter only active services and sort by sort_order
  const activeServices = services
    .filter((service) => service.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)

  if (activeServices.length === 0) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="container mx-auto px-4">
          <p className="text-center text-neutral-500">
            Aucun service disponible pour le moment
          </p>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="configurateur"
      className={`px-4 sm:px-8 py-16 sm:py-24 bg-green-50/50 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header with billing toggle */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="text-green-700 font-bold tracking-widest uppercase text-sm">
              Catalogue de Maintenance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mt-2">
              Choisissez vos équipements
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-3 bg-white rounded-full p-1.5 shadow-sm border border-neutral-200 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setBillingPeriod('monthly')}
              className={`
                text-sm font-semibold px-5 py-2 rounded-full transition-all
                ${billingPeriod === 'monthly' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-neutral-600 hover:text-green-800'
                }
              `}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod('yearly')}
              className={`
                text-sm font-semibold px-5 py-2 rounded-full transition-all relative
                ${billingPeriod === 'yearly' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-neutral-600 hover:text-green-800'
                }
              `}
            >
              Annuel
              <span className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                -2 mois
              </span>
            </button>
          </div>
        </div>

        {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              quantity={selectedServices[service.id] || 0}
              billingPeriod={billingPeriod}
              onQuantityChange={(qty) => setServiceQuantity(service.id, qty)}
              onShowDetails={() => setDetailService(service)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MaintenanceServiceCatalog
