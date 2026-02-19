'use client'

import { useState, useMemo } from 'react'
import { Check, Loader2, ArrowRight, ShieldCheck, Flame, Wind, Sun, Droplets, SunMedium, SunDim, Zap, Wrench, Sparkles, type LucideIcon } from 'lucide-react'
import { formatEUR } from '@/lib/format'
import type { MaintenanceService, MaintenanceOption } from '@/types/maintenance'

interface MaintenanceConfiguratorProps {
  services: MaintenanceService[]
  options: MaintenanceOption[]
}

const iconMap: Record<string, LucideIcon> = {
  Flame, Wind, Sun, Droplets, SunMedium, SunDim, Zap, Wrench, ShieldCheck,
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench
}

function getMultiDiscount(serviceCount: number): number {
  if (serviceCount >= 4) return 15
  if (serviceCount === 3) return 10
  if (serviceCount === 2) return 5
  return 0
}

function calculatePricing(
  services: MaintenanceService[],
  options: MaintenanceOption[],
  selectedServiceIds: string[],
  selectedOptionIds: string[]
) {
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id))
  const selectedOptions = options.filter(o => selectedOptionIds.includes(o.id))

  const flatFeeOptions = selectedOptions.filter(o => o.is_flat_fee)
  const recurringOptions = selectedOptions.filter(o => !o.is_flat_fee)

  const servicesMonthly = selectedServices.reduce((sum, s) => sum + s.price_monthly, 0)
  const discountMultiPercent = getMultiDiscount(selectedServices.length)
  const discountMultiMonthly = Math.round(servicesMonthly * discountMultiPercent / 100)
  const servicesAfterMultiMonthly = servicesMonthly - discountMultiMonthly

  const optionsMonthly = recurringOptions.reduce((sum, o) => sum + o.price_monthly, 0)
  const flatFeeTotal = flatFeeOptions.reduce((sum, o) => sum + o.price_monthly, 0)

  const totalMonthly = servicesAfterMultiMonthly + optionsMonthly
  const totalAnnual = totalMonthly * 12 + flatFeeTotal
  const savingsAnnual = discountMultiMonthly * 12

  return {
    servicesMonthly,
    discountMultiPercent,
    discountMultiMonthly,
    discountMultiAnnual: discountMultiMonthly * 12,
    servicesAfterMultiMonthly,
    optionsMonthly,
    flatFeeTotal,
    totalMonthly,
    totalAnnual,
    savingsAnnual,
  }
}

export function MaintenanceConfigurator({ services, options }: MaintenanceConfiguratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pricing = useMemo(
    () => calculatePricing(services, options, selectedServices, selectedOptions),
    [services, options, selectedServices, selectedOptions]
  )

  const hasSelection = selectedServices.length > 0 || selectedOptions.length > 0

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
    setError(null)
  }

  const toggleOption = (id: string) => {
    setSelectedOptions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
    setError(null)
  }

  const handleCheckout = async () => {
    if (!hasSelection) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceIds: selectedServices,
          optionIds: selectedOptions,
          billingPeriod: 'yearly',
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Erreur lors de la création de la session de paiement')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Une erreur est survenue lors de la redirection vers le paiement. Veuillez réessayer.')
      setIsLoading(false)
    }
  }

  const selectedServiceObjects = services.filter(s => selectedServices.includes(s.id))
  const selectedOptionObjects = options.filter(o => selectedOptions.includes(o.id))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Colonne gauche: Services + Options */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Services */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-neutral-900">Vos équipements</h3>
            <span className="text-sm text-neutral-500">{selectedServices.length} sélectionné{selectedServices.length > 1 ? 's' : ''}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map(service => {
              const isSelected = selectedServices.includes(service.id)
              const Icon = getIcon(service.icon)
              const priceAnnual = service.price_monthly * 12
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`group relative rounded-2xl border-2 p-6 transition-all duration-200 text-center ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100 scale-[1.02]'
                      : 'border-neutral-200 bg-white hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  {/* Checkbox en haut à droite */}
                  <div
                    className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-green-600'
                        : 'border-2 border-neutral-300 group-hover:border-green-400'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>

                  {/* Icon centrée */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                      isSelected
                        ? 'bg-green-600 text-white'
                        : 'bg-neutral-100 text-neutral-400 group-hover:bg-green-100 group-hover:text-green-600'
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Titre */}
                  <h4 className="font-bold text-neutral-900 text-lg mb-4">{service.name}</h4>

                  {/* Prix - bien mis en valeur */}
                  <div className={`rounded-xl py-3 px-4 mb-4 ${isSelected ? 'bg-green-100' : 'bg-neutral-50'}`}>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-green-700">{formatEUR(priceAnnual)}</span>
                      <span className="text-neutral-500 font-medium">/an</span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">
                      soit {formatEUR(service.price_monthly)}/mois
                    </p>
                  </div>

                  {/* Includes */}
                  {service.includes && service.includes.length > 0 && (
                    <ul className="space-y-2">
                      {service.includes.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center justify-center gap-2 text-sm text-neutral-600">
                          <Check className={`w-4 h-4 shrink-0 ${isSelected ? 'text-green-600' : 'text-green-500'}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              )
            })}
          </div>

          {/* Info remises - discret */}
          <p className="text-sm text-green-700 mt-4 text-center">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Cumulez : 2 équipements = -5% • 3 = -10% • 4+ = -15%
          </p>
        </div>

        {/* Options */}
        {options.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-5">Options</h3>

            <div className="space-y-3">
              {options.map(option => {
                const isSelected = selectedOptions.includes(option.id)
                const Icon = getIcon(option.icon)
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleOption(option.id)}
                    className={`group w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-100'
                        : 'border-neutral-200 bg-white hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-white'
                            : 'bg-neutral-100 text-neutral-400 group-hover:bg-amber-100 group-hover:text-amber-600'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-neutral-900">{option.name}</h4>
                        {option.description && (
                          <p className="text-sm text-neutral-500 mt-0.5">{option.description}</p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-amber-600">
                          +{formatEUR(option.price_monthly)}
                        </span>
                        {option.is_flat_fee && (
                          <p className="text-xs text-amber-600">forfait unique</p>
                        )}
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-amber-500'
                            : 'border-2 border-neutral-300 group-hover:border-amber-400'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Colonne droite: Récapitulatif sticky */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-green-700 to-green-800 px-6 py-5">
              <h3 className="text-lg font-bold text-white">Récapitulatif</h3>
              <p className="text-green-200 text-sm">Facturation annuelle</p>
            </div>

            <div className="p-6 space-y-5">
              {/* Empty state */}
              {!hasSelection && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-neutral-300" />
                  </div>
                  <p className="text-sm text-neutral-400">
                    Sélectionnez vos équipements<br />pour voir le récapitulatif
                  </p>
                </div>
              )}

              {/* Selected services */}
              {selectedServiceObjects.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Équipements
                  </p>
                  <ul className="space-y-3">
                    {selectedServiceObjects.map(service => {
                      const Icon = getIcon(service.icon)
                      return (
                        <li key={service.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm text-neutral-700 flex-1">{service.name}</span>
                          <span className="text-sm font-semibold text-neutral-900 tabular-nums">
                            {formatEUR(service.price_monthly * 12)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Discount */}
              {pricing.discountMultiPercent > 0 && (
                <div className="flex items-center justify-between bg-green-100 rounded-xl px-4 py-3">
                  <span className="text-sm font-semibold text-green-800">
                    🎉 Remise -{pricing.discountMultiPercent}%
                  </span>
                  <span className="text-sm font-bold text-green-800 tabular-nums">
                    -{formatEUR(pricing.discountMultiAnnual)}
                  </span>
                </div>
              )}

              {/* Selected options */}
              {selectedOptionObjects.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Options
                  </p>
                  <ul className="space-y-3">
                    {selectedOptionObjects.map(option => {
                      const Icon = getIcon(option.icon)
                      return (
                        <li key={option.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="text-sm text-neutral-700 flex-1">{option.name}</span>
                          <span className="text-sm font-semibold text-neutral-900 tabular-nums">
                            +{formatEUR(option.price_monthly)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Total */}
              {hasSelection && (
                <div className="border-t-2 border-neutral-100 pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-neutral-600">Total annuel</span>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-neutral-900 tabular-nums">
                        {formatEUR(pricing.totalAnnual)}
                      </p>
                      <p className="text-sm text-neutral-500">
                        soit {formatEUR(pricing.totalMonthly)}/mois
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* CTA */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={!hasSelection || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-base shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    Souscrire
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Infos */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-400">
                <span>Sans engagement</span>
                <span>•</span>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
