'use client'

import { useState, useMemo } from 'react'
import { Check, Loader2, ArrowRight, ShieldCheck, Flame, Wind, Sun, Droplets, SunMedium, SunDim, Zap, Wrench, Sparkles, Phone, Info, X, type LucideIcon } from 'lucide-react'
import { formatEUR } from '@/lib/format'
import { getMultiDiscount, calculatePricing } from '@/lib/maintenance-pricing'
import type { MaintenanceService, MaintenanceOption } from '@/types/maintenance'

interface MaintenanceConfiguratorProps {
  services: MaintenanceService[]
  options: MaintenanceOption[]
}

const iconMap: Record<string, LucideIcon> = {
  Flame, Wind, Sun, Droplets, SunMedium, SunDim, Zap, Wrench, ShieldCheck,
}

// Détails enrichis pour les options
const optionDetails: Record<string, { benefits: string[], whyUseful: string }> = {
  'intervention-urgence-24h': {
    whyUseful: "Une panne de chauffage en plein hiver, c'est stressant. Avec cette option, vous passez en priorité : un technicien vous rappelle dans l'heure et intervient sous 24h ouvrées.",
    benefits: [
      "Rappel téléphonique sous 1h après votre signalement",
      "Intervention garantie sous 24h (jours ouvrés)",
      "Priorité absolue sur les interventions classiques",
      "Valable pour tous vos équipements sous contrat",
      "Diagnostic complet inclus",
    ],
  },
}

// Détails spécifiques par service (slug) et par point inclus
const serviceIncludesDetails: Record<string, Record<string, string>> = {
  'chaudiere-a-gaz': {
    "Vérification complète de l'appareil": "Le technicien inspecte le brûleur, l'échangeur, les joints et le vase d'expansion. Il contrôle aussi l'étanchéité du circuit gaz.",
    "Contrôle des émissions et du rendement": "Mesure du CO et du rendement de combustion. Un brûleur mal réglé consomme plus et peut produire des gaz dangereux.",
    "Nettoyage du brûleur et de l'échangeur": "L'encrassement réduit le rendement et augmente la consommation. Un nettoyage régulier maintient les performances.",
    "Test des organes de sécurité": "Vérification du thermocouple, du pressostat et des dispositifs de protection. Votre sécurité en dépend.",
    "Attestation d'entretien": "Document obligatoire à conserver. Votre assurance peut le demander en cas de sinistre.",
  },
  'pompe-a-chaleur': {
    "Contrôle étanchéité circuit frigorifique": "Une fuite de fluide fait chuter les performances et augmente la consommation. On vérifie qu'il n'y a pas de fuite.",
    "Vérification du niveau de fluide": "Le fluide frigorigène doit être au bon niveau pour que la PAC fonctionne correctement.",
    "Nettoyage des filtres et échangeurs": "Des filtres encrassés forcent le compresseur à travailler plus. L'unité extérieure accumule feuilles et débris.",
    "Mesure des performances (COP)": "On mesure le rendement réel de votre PAC. Un COP qui baisse signale un problème à traiter.",
    "Attestation d'entretien": "Document indispensable pour conserver votre garantie constructeur.",
  },
  'photovoltaique': {
    "Inspection visuelle des panneaux": "On repère les micro-fissures, points chauds, traces d'escargots ou dégradations qui affectent la production.",
    "Contrôle de l'onduleur": "L'onduleur convertit le courant. Une panne = zéro production. On vérifie son bon fonctionnement et ses codes erreur.",
    "Vérification des connexions électriques": "Un mauvais contact ou un câble abîmé fait perdre de la production et peut être dangereux.",
    "Bilan de production": "Comparaison entre production réelle et théorique. Un écart important signale un problème.",
    "Nettoyage si nécessaire": "Des panneaux sales perdent du rendement. On nettoie à l'eau déminéralisée si besoin.",
  },
  'ballon-thermodynamique': {
    "Contrôle du compresseur et évaporateur": "Le compresseur est le moteur de votre ballon. L'évaporateur capte les calories de l'air.",
    "Vérification de l'anode de protection": "L'anode protège la cuve contre la corrosion. Quand elle est usée, c'est la cuve qui rouille.",
    "Test du groupe de sécurité": "Il évacue le surplus de pression quand l'eau chauffe. Un groupe bloqué peut être dangereux.",
    "Nettoyage du filtre à air": "Un filtre encrassé réduit le débit d'air et fait baisser les performances.",
    "Contrôle de l'étanchéité": "Vérification qu'il n'y a pas de fuite sur le circuit frigorifique.",
  },
  'systeme-solaire-combine': {
    "Inspection des capteurs solaires": "Vérification de l'état du vitrage, du cadre et des fixations. Un capteur endommagé fait chuter le rendement.",
    "Contrôle du fluide caloporteur": "Le fluide doit être au bon niveau avec un pH correct et une protection antigel suffisante.",
    "Vérification de la régulation": "On s'assure que le solaire et l'appoint travaillent bien ensemble pour optimiser les économies.",
    "Test du circulateur": "La pompe fait circuler le fluide entre les capteurs et le ballon. On vérifie son débit.",
    "Contrôle du ballon de stockage": "Vérification de l'anode, du groupe de sécurité et de l'isolation thermique.",
  },
  'chauffe-eau-solaire': {
    "Inspection des capteurs": "Vérification de l'état du vitrage, du cadre et des fixations.",
    "Contrôle du fluide et antigel": "Le fluide doit être au bon niveau avec une protection antigel suffisante pour l'hiver.",
    "Vérification de la pompe": "La pompe fait circuler le fluide. On vérifie son débit et son état.",
    "Test du groupe de sécurité": "Il protège le ballon contre les surpressions. On vérifie qu'il fonctionne.",
    "Purge du circuit si nécessaire": "Si de l'air s'est infiltré, on purge pour rétablir une bonne circulation.",
  },
}

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench
}

// getMultiDiscount et calculatePricing importes depuis lib/maintenance-pricing.ts

export function MaintenanceConfigurator({ services, options }: MaintenanceConfiguratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detailService, setDetailService] = useState<MaintenanceService | null>(null)
  const [detailOption, setDetailOption] = useState<MaintenanceOption | null>(null)

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
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter.')
      setIsLoading(false)
    }
  }

  const selectedServiceObjects = services.filter(s => selectedServices.includes(s.id))
  const selectedOptionObjects = options.filter(o => selectedOptions.includes(o.id))

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche: Services + Options */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">Vos équipements</h3>
                <p className="text-sm text-neutral-500 mt-1">Sélectionnez les équipements à entretenir</p>
              </div>
              {selectedServices.length > 0 && (
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {selectedServices.length} sélectionné{selectedServices.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(service => {
                const isSelected = selectedServices.includes(service.id)
                const Icon = getIcon(service.icon)
                const priceAnnual = service.price_monthly * 12
                return (
                  <div
                    key={service.id}
                    className={`group relative rounded-2xl border-2 transition-all duration-200 bg-white ${
                      isSelected
                        ? 'border-green-500 shadow-lg shadow-green-100'
                        : 'border-neutral-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className="w-full p-6 text-left"
                    >
                      {/* Checkbox */}
                      <div
                        className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-green-600'
                            : 'border-2 border-neutral-300 group-hover:border-green-400'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-green-600 text-white'
                              : 'bg-neutral-100 text-neutral-400 group-hover:bg-green-100 group-hover:text-green-600'
                          }`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="font-bold text-neutral-900 text-lg">{service.name}</h4>
                        </div>
                      </div>

                      {/* Price */}
                      <div className={`rounded-xl py-3 px-4 ${isSelected ? 'bg-green-50' : 'bg-neutral-50'}`}>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-green-700">{formatEUR(priceAnnual)}</span>
                          <span className="text-neutral-500 font-medium">/an</span>
                        </div>
                        <p className="text-sm text-neutral-500">
                          soit {formatEUR(service.price_monthly)}/mois
                        </p>
                      </div>

                      {/* Preview includes */}
                      {service.includes && service.includes.length > 0 && (
                        <ul className="mt-4 space-y-1.5">
                          {service.includes.slice(0, 2).map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                              <Check className={`w-4 h-4 shrink-0 ${isSelected ? 'text-green-600' : 'text-green-500'}`} />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>

                    {/* See details button */}
                    {service.includes && service.includes.length > 2 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDetailService(service)
                        }}
                        className="w-full py-3 px-6 border-t border-neutral-100 text-sm text-green-700 hover:text-green-800 hover:bg-green-50 transition-colors flex items-center justify-center gap-1.5 font-medium"
                      >
                        <Info className="w-4 h-4" />
                        Voir le détail
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Discount info */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">Cumulez et économisez</p>
                  <p className="text-sm text-green-700">
                    2 équipements = -5% • 3 équipements = -10% • 4+ équipements = -15%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          {options.length > 0 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900">Options</h3>
                <p className="text-sm text-neutral-500 mt-1">Personnalisez votre contrat</p>
              </div>

              <div className="space-y-3">
                {options.map(option => {
                  const isSelected = selectedOptions.includes(option.id)
                  const Icon = getIcon(option.icon)
                  const details = optionDetails[option.slug]
                  return (
                    <div
                      key={option.id}
                      className={`group rounded-2xl border-2 transition-all duration-200 bg-white ${
                        isSelected
                          ? 'border-amber-400 shadow-lg shadow-amber-100'
                          : 'border-neutral-200 hover:border-amber-300 hover:shadow-md'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleOption(option.id)}
                        className="w-full text-left p-5"
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
                              <p className="text-sm text-neutral-500 mt-0.5 line-clamp-2">{option.description}</p>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xl font-bold text-amber-600">
                              +{formatEUR(option.price_monthly)}
                            </span>
                            {option.is_flat_fee ? (
                              <p className="text-xs text-amber-600 font-medium">forfait unique</p>
                            ) : (
                              <p className="text-xs text-neutral-500">/an</p>
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
                      
                      {/* Bouton détails si on a des infos enrichies */}
                      {details && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDetailOption(option)
                          }}
                          className="w-full py-3 px-5 border-t border-neutral-100 text-sm text-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5 font-medium"
                        >
                          <Info className="w-4 h-4" />
                          En savoir plus
                        </button>
                      )}
                    </div>
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
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wrench className="w-8 h-8 text-neutral-300" />
                    </div>
                    <p className="text-neutral-500 font-medium mb-1">
                      Aucune sélection
                    </p>
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
                            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-sm text-neutral-700 flex-1 line-clamp-1">{service.name}</span>
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
                  <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                    <span className="text-sm font-semibold text-green-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Remise -{pricing.discountMultiPercent}%
                    </span>
                    <span className="text-sm font-bold text-green-800 tabular-nums">
                      -{formatEUR(pricing.discountMultiAmount * 12)}
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
                            <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="text-sm text-neutral-700 flex-1 line-clamp-1">{option.name}</span>
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

                {/* Alternative */}
                <a
                  href="tel:+33609455056"
                  className="w-full border-2 border-neutral-200 hover:border-green-300 text-neutral-700 hover:text-green-700 font-semibold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Préférez être rappelé ?
                </a>

                {/* Trust */}
                <p className="text-xs text-neutral-400 text-center">
                  Sans engagement • Paiement sécurisé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal détails service */}
      {detailService && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setDetailService(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-green-700 to-green-800 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getIcon(detailService.icon)
                  return (
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  )
                })()}
                <h3 className="text-lg font-bold text-white">{detailService.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailService(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                Ce qui est inclus
              </p>
              
              <div className="space-y-4">
                {detailService.includes?.map((item, i) => {
                  const serviceDetails = serviceIncludesDetails[detailService.slug] || {}
                  const detail = serviceDetails[item]
                  return (
                    <div key={i} className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{item}</p>
                          {detail && (
                            <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{detail}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-600">Prix annuel</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-700">{formatEUR(detailService.price_monthly * 12)}</span>
                    <p className="text-sm text-neutral-500">soit {formatEUR(detailService.price_monthly)}/mois</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  if (!selectedServices.includes(detailService.id)) {
                    toggleService(detailService.id)
                  }
                  setDetailService(null)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all"
              >
                {selectedServices.includes(detailService.id) ? (
                  <>
                    <Check className="w-5 h-5" />
                    Déjà sélectionné
                  </>
                ) : (
                  <>
                    Ajouter à ma sélection
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal détails option */}
      {detailOption && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setDetailOption(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getIcon(detailOption.icon)
                  return (
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  )
                })()}
                <h3 className="text-lg font-bold text-white">{detailOption.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailOption(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Explication de la valeur */}
              {optionDetails[detailOption.slug]?.whyUseful && (
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  {optionDetails[detailOption.slug].whyUseful}
                </p>
              )}
              
              {/* Bénéfices */}
              {optionDetails[detailOption.slug]?.benefits && (
                <>
                  <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                    Ce que vous obtenez
                  </p>
                  <ul className="space-y-3">
                    {optionDetails[detailOption.slug].benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-amber-600" />
                        </div>
                        <span className="text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-600">
                    {detailOption.is_flat_fee ? 'Forfait unique' : 'Prix annuel'}
                  </span>
                  <span className="text-2xl font-bold text-amber-600">+{formatEUR(detailOption.price_monthly)}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  if (!selectedOptions.includes(detailOption.id)) {
                    toggleOption(detailOption.id)
                  }
                  setDetailOption(null)
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all"
              >
                {selectedOptions.includes(detailOption.id) ? (
                  <>
                    <Check className="w-5 h-5" />
                    Déjà sélectionné
                  </>
                ) : (
                  <>
                    Ajouter cette option
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
