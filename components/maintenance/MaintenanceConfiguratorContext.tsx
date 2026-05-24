'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import type {
  MaintenanceService,
  MaintenanceOption,
  PricingSummary,
  BillingPeriod,
} from '@/types/maintenance'
import { calculatePricing } from '@/lib/maintenance-pricing'

// Détails enrichis pour les options
export const optionDetails: Record<string, { benefits: string[]; whyUseful: string }> = {
  'intervention-urgence-24h': {
    whyUseful:
      "Une panne de chauffage en plein hiver, c'est stressant. Avec cette option, vous passez en priorité : un technicien vous rappelle dans l'heure et intervient sous 24h ouvrées.",
    benefits: [
      'Rappel téléphonique sous 1h après votre signalement',
      'Intervention garantie sous 24h (jours ouvrés)',
      'Priorité absolue sur les interventions classiques',
      'Valable pour tous vos équipements sous contrat',
      'Diagnostic complet inclus',
    ],
  },
}

// Détails spécifiques par service (slug) et par point inclus
export const serviceIncludesDetails: Record<string, Record<string, string>> = {
  'chaudiere-a-gaz': {
    "Vérification complète de l'appareil":
      "Le technicien inspecte le brûleur, l'échangeur, les joints et le vase d'expansion. Il contrôle aussi l'étanchéité du circuit gaz.",
    'Contrôle des émissions et du rendement':
      'Mesure du CO et du rendement de combustion. Un brûleur mal réglé consomme plus et peut produire des gaz dangereux.',
    "Nettoyage du brûleur et de l'échangeur":
      "L'encrassement réduit le rendement et augmente la consommation. Un nettoyage régulier maintient les performances.",
    'Test des organes de sécurité':
      'Vérification du thermocouple, du pressostat et des dispositifs de protection. Votre sécurité en dépend.',
    "Attestation d'entretien":
      'Document obligatoire à conserver. Votre assurance peut le demander en cas de sinistre.',
  },
  'pompe-a-chaleur': {
    'Contrôle étanchéité circuit frigorifique':
      "Une fuite de fluide fait chuter les performances et augmente la consommation. On vérifie qu'il n'y a pas de fuite.",
    'Vérification du niveau de fluide':
      'Le fluide frigorigène doit être au bon niveau pour que la PAC fonctionne correctement.',
    'Nettoyage des filtres et échangeurs':
      "Des filtres encrassés forcent le compresseur à travailler plus. L'unité extérieure accumule feuilles et débris.",
    'Mesure des performances (COP)':
      'On mesure le rendement réel de votre PAC. Un COP qui baisse signale un problème à traiter.',
    "Attestation d'entretien":
      'Document indispensable pour conserver votre garantie constructeur.',
  },
  photovoltaique: {
    'Inspection visuelle des panneaux':
      'On repère les micro-fissures, points chauds, traces d\'escargots ou dégradations qui affectent la production.',
    "Contrôle de l'onduleur":
      "L'onduleur convertit le courant. Une panne = zéro production. On vérifie son bon fonctionnement et ses codes erreur.",
    'Vérification des connexions électriques':
      'Un mauvais contact ou un câble abîmé fait perdre de la production et peut être dangereux.',
    'Bilan de production':
      'Comparaison entre production réelle et théorique. Un écart important signale un problème.',
    'Nettoyage si nécessaire':
      "Des panneaux sales perdent du rendement. On nettoie à l'eau déminéralisée si besoin.",
  },
  'ballon-thermodynamique': {
    'Contrôle du compresseur et évaporateur':
      "Le compresseur est le moteur de votre ballon. L'évaporateur capte les calories de l'air.",
    "Vérification de l'anode de protection":
      "L'anode protège la cuve contre la corrosion. Quand elle est usée, c'est la cuve qui rouille.",
    'Test du groupe de sécurité':
      "Il évacue le surplus de pression quand l'eau chauffe. Un groupe bloqué peut être dangereux.",
    'Nettoyage du filtre à air':
      "Un filtre encrassé réduit le débit d'air et fait baisser les performances.",
    "Contrôle de l'étanchéité":
      "Vérification qu'il n'y a pas de fuite sur le circuit frigorifique.",
  },
  'systeme-solaire-combine': {
    'Inspection des capteurs solaires':
      'Vérification de l\'état du vitrage, du cadre et des fixations. Un capteur endommagé fait chuter le rendement.',
    'Contrôle du fluide caloporteur':
      'Le fluide doit être au bon niveau avec un pH correct et une protection antigel suffisante.',
    'Vérification de la régulation':
      "On s'assure que le solaire et l'appoint travaillent bien ensemble pour optimiser les économies.",
    'Test du circulateur':
      'La pompe fait circuler le fluide entre les capteurs et le ballon. On vérifie son débit.',
    'Contrôle du ballon de stockage':
      "Vérification de l'anode, du groupe de sécurité et de l'isolation thermique.",
  },
  'chauffe-eau-solaire': {
    'Inspection des capteurs':
      "Vérification de l'état du vitrage, du cadre et des fixations.",
    'Contrôle du fluide et antigel':
      "Le fluide doit être au bon niveau avec une protection antigel suffisante pour l'hiver.",
    'Vérification de la pompe':
      'La pompe fait circuler le fluide. On vérifie son débit et son état.',
    'Test du groupe de sécurité':
      "Il protège le ballon contre les surpressions. On vérifie qu'il fonctionne.",
    'Purge du circuit si nécessaire':
      "Si de l'air s'est infiltré, on purge pour rétablir une bonne circulation.",
  },
}

// Type for service quantities (serviceId -> quantity)
export type ServiceQuantities = Record<string, number>

/**
 * Convertit les quantites (Record<id, qty>) en tableau d'IDs avec doublons
 * pour etre compatible avec calculatePricing de lib/maintenance-pricing.ts
 */
function quantitiesToServiceIds(quantities: ServiceQuantities): string[] {
  const ids: string[] = []
  for (const [id, qty] of Object.entries(quantities)) {
    for (let i = 0; i < qty; i++) {
      ids.push(id)
    }
  }
  return ids
}

// Context value interface
export interface MaintenanceConfiguratorContextValue {
  // Données
  services: MaintenanceService[]
  options: MaintenanceOption[]

  // État de sélection avec quantités
  selectedServices: ServiceQuantities
  selectedOptions: string[]

  // État UI
  billingPeriod: BillingPeriod
  isFloatingPanelExpanded: boolean

  // Actions
  setServiceQuantity: (id: string, quantity: number) => void
  toggleOption: (id: string) => void
  setBillingPeriod: (period: BillingPeriod) => void
  setFloatingPanelExpanded: (expanded: boolean) => void

  // Calculs dérivés
  pricing: PricingSummary
  hasSelection: boolean
  totalServiceCount: number

  // Modales
  detailService: MaintenanceService | null
  detailOption: MaintenanceOption | null
  setDetailService: (service: MaintenanceService | null) => void
  setDetailOption: (option: MaintenanceOption | null) => void

  // Checkout
  isLoading: boolean
  error: string | null
  handleCheckout: () => Promise<void>
}

// Provider props
export interface MaintenanceConfiguratorProviderProps {
  services: MaintenanceService[]
  options: MaintenanceOption[]
  children: ReactNode
}

// Create context with undefined default
const MaintenanceConfiguratorContext = createContext<
  MaintenanceConfiguratorContextValue | undefined
>(undefined)

// Provider component
export function MaintenanceConfiguratorProvider({
  services,
  options,
  children,
}: MaintenanceConfiguratorProviderProps) {
  // Selection state with quantities
  const [selectedServices, setSelectedServices] = useState<ServiceQuantities>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // UI state
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')
  const [isFloatingPanelExpanded, setFloatingPanelExpanded] = useState(false)

  // Modal state
  const [detailService, setDetailService] = useState<MaintenanceService | null>(null)
  const [detailOption, setDetailOption] = useState<MaintenanceOption | null>(null)

  // Checkout state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Derived: pricing calculation (source unique : lib/maintenance-pricing.ts)
  const pricing = useMemo(
    () => calculatePricing(
      services,
      options,
      quantitiesToServiceIds(selectedServices),
      selectedOptions,
      billingPeriod === 'monthly' ? 'monthly' : 'yearly',
    ),
    [services, options, selectedServices, selectedOptions, billingPeriod]
  )

  // Derived: total service count
  const totalServiceCount = useMemo(
    () => Object.values(selectedServices).reduce((sum, qty) => sum + qty, 0),
    [selectedServices]
  )

  // Derived: has selection
  const hasSelection = totalServiceCount > 0 || selectedOptions.length > 0

  // Actions
  const setServiceQuantity = useCallback((id: string, quantity: number) => {
    setSelectedServices((prev) => {
      if (quantity <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: quantity }
    })
    setError(null)
  }, [])

  const toggleOption = useCallback((id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    )
    setError(null)
  }, [])

  // Checkout handler
  const handleCheckout = useCallback(async () => {
    if (!hasSelection) return
    setIsLoading(true)
    setError(null)

    try {
      // Convert quantities to array of service IDs (repeated for quantity)
      const serviceIds: string[] = []
      for (const [id, qty] of Object.entries(selectedServices)) {
        for (let i = 0; i < qty; i++) {
          serviceIds.push(id)
        }
      }

      const response = await fetch('/api/checkout/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceIds,
          optionIds: selectedOptions,
          billingPeriod, // Use the selected billing period
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de paiement non reçue')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(
        err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer ou nous contacter.'
      )
      setIsLoading(false)
    }
  }, [hasSelection, selectedServices, selectedOptions, billingPeriod])

  // Context value
  const value: MaintenanceConfiguratorContextValue = useMemo(
    () => ({
      services,
      options,
      selectedServices,
      selectedOptions,
      billingPeriod,
      isFloatingPanelExpanded,
      setServiceQuantity,
      toggleOption,
      setBillingPeriod,
      setFloatingPanelExpanded,
      pricing,
      hasSelection,
      totalServiceCount,
      detailService,
      detailOption,
      setDetailService,
      setDetailOption,
      isLoading,
      error,
      handleCheckout,
    }),
    [
      services,
      options,
      selectedServices,
      selectedOptions,
      billingPeriod,
      isFloatingPanelExpanded,
      setServiceQuantity,
      toggleOption,
      pricing,
      hasSelection,
      totalServiceCount,
      detailService,
      detailOption,
      isLoading,
      error,
      handleCheckout,
    ]
  )

  return (
    <MaintenanceConfiguratorContext.Provider value={value}>
      {children}
    </MaintenanceConfiguratorContext.Provider>
  )
}

// Custom hook to use the context
export function useMaintenanceConfigurator(): MaintenanceConfiguratorContextValue {
  const context = useContext(MaintenanceConfiguratorContext)
  if (context === undefined) {
    throw new Error(
      'useMaintenanceConfigurator must be used within a MaintenanceConfiguratorProvider'
    )
  }
  return context
}
