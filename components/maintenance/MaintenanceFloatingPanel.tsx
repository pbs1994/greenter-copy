'use client'

import { useCallback, type KeyboardEvent } from 'react'
import { X, ChevronUp, ShoppingCart, Loader2, Lock } from 'lucide-react'
import { useMaintenanceConfigurator } from './MaintenanceConfiguratorContext'
import { formatEUR } from '@/lib/format'

export interface MaintenanceFloatingPanelProps {
  className?: string
}

/**
 * MaintenanceFloatingPanel - Panel flottant récapitulatif
 * Design Material Design 3 épuré avec toggle Mensuel/Annuel en pills
 */
export function MaintenanceFloatingPanel({ className = '' }: MaintenanceFloatingPanelProps) {
  const {
    services,
    options,
    selectedServices,
    selectedOptions,
    billingPeriod,
    setBillingPeriod,
    isFloatingPanelExpanded,
    setFloatingPanelExpanded,
    pricing,
    hasSelection,
    isLoading,
    error,
    handleCheckout,
  } = useMaintenanceConfigurator()

  // Get selected service/option objects with quantities
  const selectedServiceItems = services
    .filter((s) => (selectedServices[s.id] || 0) > 0)
    .map((s) => ({ ...s, quantity: selectedServices[s.id] }))
  
  const selectedOptionItems = options.filter((o) => selectedOptions.includes(o.id))

  // Calculate display price based on billing period
  const displayTotal = billingPeriod === 'monthly' ? pricing.totalMonthly : pricing.totalAnnual

  // Handle expand/collapse toggle
  const handleToggleExpand = useCallback(() => {
    setFloatingPanelExpanded(!isFloatingPanelExpanded)
  }, [isFloatingPanelExpanded, setFloatingPanelExpanded])

  // Handle keyboard for expand toggle
  const handleToggleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleToggleExpand()
      }
    },
    [handleToggleExpand]
  )

  // Handle checkout button keyboard
  const handleCheckoutKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleCheckout()
      }
    },
    [handleCheckout]
  )

  // Don't render the panel at all if no selection
  if (!hasSelection) {
    return null
  }

  return (
    <>
      {/* Mobile overlay when expanded */}
      {isFloatingPanelExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setFloatingPanelExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed z-50
          bg-white
          shadow-xl shadow-neutral-900/10
          transition-all duration-300 ease-out
          
          /* Mobile: full width at bottom */
          bottom-0 left-0 right-0
          ${isFloatingPanelExpanded ? 'max-h-[85vh]' : 'max-h-[100px]'}
          rounded-t-[2rem]
          
          /* Desktop: fixed bottom-right */
          lg:bottom-8 lg:right-8 lg:left-auto
          lg:w-[400px] lg:max-w-sm lg:max-h-none
          lg:rounded-[2rem]
          lg:border lg:border-neutral-200/50
          
          ${className}
        `}
        role="region"
        aria-label="Votre sélection"
      >
        {/* Mobile collapsed header */}
        <div className="lg:hidden">
          {!isFloatingPanelExpanded && (
            <button
              type="button"
              onClick={handleToggleExpand}
              onKeyDown={handleToggleKeyDown}
              className="w-full p-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-inset"
              aria-expanded={isFloatingPanelExpanded}
              aria-label="Voir ma sélection"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-green-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-neutral-500">
                    {selectedServiceItems.reduce((sum, s) => sum + s.quantity, 0) + selectedOptionItems.length} élément(s)
                  </p>
                  <p className="text-xl font-bold text-green-800" data-testid="price-display">
                    {formatEUR(displayTotal)}
                    <span className="text-sm font-normal text-neutral-500 ml-1">
                      /{billingPeriod === 'monthly' ? 'mois' : 'an'}
                    </span>
                  </p>
                </div>
              </div>
              <ChevronUp className="w-6 h-6 text-neutral-400" />
            </button>
          )}
        </div>

        {/* Expanded content */}
        <div
          className={`
            ${isFloatingPanelExpanded ? 'block' : 'hidden'}
            lg:block
            overflow-y-auto
            max-h-[calc(85vh-20px)] lg:max-h-[600px]
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h4 className="font-bold text-lg text-green-800">Votre Sélection</h4>
            
            {/* Billing Toggle Pills */}
            <div className="bg-neutral-100 flex p-1 rounded-full relative">
              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`
                  text-xs font-bold px-3 py-1.5 rounded-full transition-all
                  ${billingPeriod === 'monthly' 
                    ? 'bg-white text-green-800 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-700'
                  }
                `}
              >
                Mensuel
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod('yearly')}
                className={`
                  text-xs font-bold px-3 py-1.5 rounded-full transition-all relative
                  ${billingPeriod === 'yearly' 
                    ? 'bg-white text-green-800 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-700'
                  }
                `}
              >
                Annuel
                {/* Badge "2 mois offerts" */}
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                  -2 mois
                </span>
              </button>
            </div>

            {/* Close button (mobile only) */}
            <button
              type="button"
              onClick={() => setFloatingPanelExpanded(false)}
              className="lg:hidden w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Selection list */}
          <div className="px-6 space-y-3 max-h-48 overflow-y-auto">
            {selectedServiceItems.map((service) => (
              <div key={service.id} className="flex justify-between items-center text-sm">
                <span className="text-neutral-600">
                  {service.name}
                  {service.quantity > 1 && (
                    <span className="ml-1 text-green-700 font-medium">×{service.quantity}</span>
                  )}
                </span>
                <span className="font-bold text-neutral-900">
                  {formatEUR(
                    (billingPeriod === 'monthly' 
                      ? service.price_monthly 
                      : service.price_monthly * 12
                    ) * service.quantity
                  )}
                </span>
              </div>
            ))}
            {selectedOptionItems.map((option) => (
              <div key={option.id} className="flex justify-between items-center text-sm">
                <span className="text-neutral-600">{option.name}</span>
                <span className="font-bold text-neutral-900">
                  {option.is_flat_fee 
                    ? `+${formatEUR(option.price_monthly)}`
                    : formatEUR(
                        billingPeriod === 'monthly' 
                          ? option.price_monthly 
                          : option.price_monthly * 12
                      )
                  }
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-6 py-4 mt-4 border-t border-dashed border-neutral-200">
            {/* Multi-equipment discount */}
            {pricing.discountMultiPercent > 0 && (
              <div className="flex justify-between items-center text-emerald-600 font-bold mb-3">
                <span>Remise Multi-contrat (-{pricing.discountMultiPercent}%)</span>
                <span>
                  -{formatEUR(
                    billingPeriod === 'monthly' 
                      ? pricing.discountMultiAmount 
                      : pricing.discountMultiAmount * 12
                  )}
                </span>
              </div>
            )}

            {/* Annual discount (2 months free) - only show when yearly */}
            {billingPeriod === 'yearly' && pricing.discountAnnualAmount > 0 && (
              <div className="flex justify-between items-center text-emerald-600 font-bold mb-3">
                <span>🎁 2 mois offerts</span>
                <span>-{formatEUR(pricing.discountAnnualAmount)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-end">
              <span className="text-neutral-500">
                Total {billingPeriod === 'monthly' ? 'Mensuel' : 'Annuel'}
              </span>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-green-800" data-testid="price-display">
                  {formatEUR(displayTotal)}
                </span>
                {billingPeriod === 'yearly' && pricing.discountAnnualAmount > 0 && (
                  <p className="text-xs text-emerald-600 font-medium">
                    soit {formatEUR(Math.round(displayTotal / 12))}/mois
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Checkout button */}
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={handleCheckout}
              onKeyDown={handleCheckoutKeyDown}
              disabled={isLoading}
              className={`
                w-full py-4 rounded-xl font-bold text-white
                flex items-center justify-center gap-2
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
                ${isLoading
                  ? 'bg-neutral-300 cursor-not-allowed'
                  : 'bg-green-800 hover:bg-green-700 hover:scale-[1.02]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Chargement...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Passer au paiement sécurisé
                </>
              )}
            </button>

            {/* Security badge */}
            <p className="text-center text-[10px] text-neutral-400 mt-3 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Paiement sécurisé par SSL
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default MaintenanceFloatingPanel
