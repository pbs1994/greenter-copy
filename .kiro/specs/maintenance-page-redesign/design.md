# Design Document: Maintenance Page Redesign

## Overview

Ce document décrit l'architecture technique pour la refonte de la page de maintenance (/services/maintenance). L'objectif est de moderniser l'interface utilisateur tout en préservant la logique métier existante (calcul des prix, remises multi-équipements, checkout Stripe).

### Objectifs Techniques
- Créer un nouveau composant `MaintenancePageRedesign` qui remplacera progressivement `MaintenanceConfigurator`
- Implémenter un panel flottant responsive avec état rétractable sur mobile
- Ajouter un toggle Mensuel/Annuel pour l'affichage des prix
- Appliquer la palette Material Design 3 avec verts doux
- Garantir une expérience mobile-first premium

### Contraintes
- Conserver l'intégration Supabase existante (tables `maintenance_services`, `maintenance_options`)
- Conserver l'API checkout Stripe (`/api/checkout/maintenance`)
- Réutiliser les types TypeScript existants (`MaintenanceService`, `MaintenanceOption`)
- Maintenir la compatibilité avec le Header/Footer existants

## Architecture

### Vue d'Ensemble des Composants

```mermaid
graph TD
    subgraph Page["app/(public)/services/maintenance/page.tsx"]
        MP[MaintenancePage]
    end
    
    subgraph NewComponents["Nouveaux Composants"]
        MHero[MaintenanceHero]
        MCatalog[MaintenanceServiceCatalog]
        MDiscount[MaintenanceDiscountBanner]
        MOptions[MaintenanceOptionsSection]
        MPanel[MaintenanceFloatingPanel]
        MFAQ[MaintenanceFAQSection]
    end
    
    subgraph SharedState["État Partagé (Context)"]
        MCtx[MaintenanceConfiguratorContext]
    end
    
    subgraph ExistingLogic["Logique Existante"]
        Pricing[calculatePricing]
        Types[MaintenanceService/Option]
        API[/api/checkout/maintenance]
    end
    
    MP --> MHero
    MP --> MCatalog
    MP --> MDiscount
    MP --> MOptions
    MP --> MPanel
    MP --> MFAQ
    
    MCatalog --> MCtx
    MOptions --> MCtx
    MPanel --> MCtx
    MDiscount --> MCtx
    
    MCtx --> Pricing
    MPanel --> API
```

### Structure des Fichiers

```
components/
├── maintenance/
│   ├── MaintenanceConfiguratorContext.tsx  # Context pour l'état partagé
│   ├── MaintenanceHero.tsx                 # Section hero avec image inclinée
│   ├── MaintenanceServiceCatalog.tsx       # Grille des services
│   ├── MaintenanceDiscountBanner.tsx       # Bandeau remises visuelles
│   ├── MaintenanceOptionsSection.tsx       # Section options
│   ├── MaintenanceFloatingPanel.tsx        # Panel flottant récapitulatif
│   ├── MaintenanceFAQSection.tsx           # FAQ avec accordéon animé
│   ├── ServiceCard.tsx                     # Carte service individuelle
│   ├── OptionCard.tsx                      # Carte option individuelle
│   ├── BillingToggle.tsx                   # Toggle Mensuel/Annuel
│   ├── ServiceDetailModal.tsx              # Modal détails service
│   └── OptionDetailModal.tsx               # Modal détails option
```

## Components and Interfaces

### 1. MaintenanceConfiguratorContext

Context React pour partager l'état entre tous les composants de la page.

```typescript
interface MaintenanceConfiguratorContextValue {
  // Données
  services: MaintenanceService[]
  options: MaintenanceOption[]
  
  // État de sélection
  selectedServices: string[]
  selectedOptions: string[]
  
  // État UI
  billingPeriod: 'monthly' | 'yearly'
  isFloatingPanelExpanded: boolean  // Pour mobile
  
  // Actions
  toggleService: (id: string) => void
  toggleOption: (id: string) => void
  setBillingPeriod: (period: 'monthly' | 'yearly') => void
  setFloatingPanelExpanded: (expanded: boolean) => void
  
  // Calculs dérivés
  pricing: PricingSummary
  hasSelection: boolean
  
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
```

### 2. MaintenanceHero

Props:
```typescript
interface MaintenanceHeroProps {
  className?: string
}
```

Responsabilités:
- Afficher le titre "Sérénité Totale pour votre Habitat"
- Image inclinée avec effet de zoom au survol (desktop uniquement)
- Badge RGE flottant sur l'image
- Google Rating Badge intégré
- Bouton CTA vers le configurateur
- Layout vertical sur mobile avec gradient de fond

### 3. MaintenanceServiceCatalog

Props:
```typescript
interface MaintenanceServiceCatalogProps {
  className?: string
}
```

Responsabilités:
- Grille responsive (3 cols desktop, 2 tablette, 1 mobile)
- Cartes avec effet de survol (élévation, bordure colorée)
- Indicateur visuel de sélection (coche verte, bordure)
- Bouton "Voir le détail" pour ouvrir la modale
- Utilise le context pour la sélection

### 4. MaintenanceDiscountBanner

Props:
```typescript
interface MaintenanceDiscountBannerProps {
  className?: string
}
```

Responsabilités:
- Message "Plus vous équipez, plus vous économisez"
- 3 cartes visuelles pour les paliers (2 = -5%, 3 = -10%, 4+ = -15%)
- Mise en surbrillance du palier actif selon la sélection
- Empilement vertical sur mobile

### 5. MaintenanceOptionsSection

Props:
```typescript
interface MaintenanceOptionsSectionProps {
  className?: string
}
```

Responsabilités:
- Affichage cohérent avec le catalogue de services
- Différenciation visuelle options récurrentes vs forfaits uniques
- Indicateur de sélection
- Bouton "En savoir plus" pour les options avec détails

### 6. MaintenanceFloatingPanel

Props:
```typescript
interface MaintenanceFloatingPanelProps {
  className?: string
}
```

Responsabilités:
- Position fixed en bas à droite (desktop) ou pleine largeur en bas (mobile)
- Toggle Mensuel/Annuel (BillingToggle)
- Récapitulatif des sélections avec prix
- Affichage de la remise appliquée
- Bouton "Souscrire" vers checkout Stripe
- État vide avec message d'incitation
- Rétractable sur mobile (affiche uniquement total + bouton "Voir ma sélection")
- Overlay 80% hauteur quand déplié sur mobile

### 7. BillingToggle

Props:
```typescript
interface BillingToggleProps {
  value: 'monthly' | 'yearly'
  onChange: (value: 'monthly' | 'yearly') => void
  className?: string
}
```

Responsabilités:
- Toggle visuel Mensuel/Annuel
- Animation de transition fluide
- Accessible au clavier

### 8. ServiceCard

Props:
```typescript
interface ServiceCardProps {
  service: MaintenanceService
  isSelected: boolean
  billingPeriod: 'monthly' | 'yearly'
  onToggle: () => void
  onShowDetails: () => void
}
```

### 9. OptionCard

Props:
```typescript
interface OptionCardProps {
  option: MaintenanceOption
  isSelected: boolean
  billingPeriod: 'monthly' | 'yearly'
  onToggle: () => void
  onShowDetails?: () => void
}
```

## Data Models

### Types Existants (Réutilisés)

```typescript
// types/maintenance.ts - Déjà existant
interface MaintenanceService {
  id: string
  name: string
  slug: string
  description: string | null
  price_monthly: number  // centimes
  icon: string
  includes: string[]
  is_active: boolean
  sort_order: number
  created_at: string
}

interface MaintenanceOption {
  id: string
  name: string
  slug: string
  description: string | null
  price_monthly: number  // centimes
  icon: string
  is_active: boolean
  is_flat_fee: boolean
  exempt_from_discount: boolean
  sort_order: number
  created_at: string
}

interface PricingSummary {
  servicesSubtotal: number
  discountMultiPercent: number
  discountMultiAmount: number
  servicesAfterMulti: number
  optionsTotal: number
  discountAnnualPercent: number
  discountAnnualAmount: number
  totalMonthly: number
  totalAnnual: number
  totalDisplay: number
  savingsTotal: number
  flatFeeTotal: number
}
```

### Nouveaux Types

```typescript
// État du panel flottant
interface FloatingPanelState {
  isExpanded: boolean  // Pour mobile
  billingPeriod: 'monthly' | 'yearly'
}

// Props pour le context provider
interface MaintenanceConfiguratorProviderProps {
  services: MaintenanceService[]
  options: MaintenanceOption[]
  children: React.ReactNode
}

// Palier de remise pour le bandeau
interface DiscountTier {
  minEquipments: number
  discountPercent: number
  label: string
  icon: string
}

const DISCOUNT_TIERS: DiscountTier[] = [
  { minEquipments: 2, discountPercent: 5, label: '2 équipements', icon: 'Zap' },
  { minEquipments: 3, discountPercent: 10, label: '3 équipements', icon: 'Sparkles' },
  { minEquipments: 4, discountPercent: 15, label: '4+ équipements', icon: 'Award' },
]
```

### Palette de Couleurs Material Design 3

```typescript
// Verts doux MD3
const colors = {
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',  // Principal
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  // Amber pour les options (existant)
  amber: {
    400: '#FFCA28',
    500: '#FFC107',
    600: '#FFB300',
  }
}
```

### Breakpoints Tailwind (Mobile-First)

```typescript
// Breakpoints utilisés
const breakpoints = {
  sm: '640px',   // Tablette portrait
  md: '768px',   // Tablette paysage
  lg: '1024px',  // Desktop
  xl: '1280px',  // Grand écran
}

// Grille responsive
// Mobile: 1 colonne
// sm: 2 colonnes
// lg: 3 colonnes
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Service Card Information Completeness

*For any* MaintenanceService, when rendered as a ServiceCard, the output should contain the service icon, name, monthly price formatted in EUR, and annual price (monthly × 12) formatted in EUR.

**Validates: Requirements 2.2**

### Property 2: Selection Visual Indicator

*For any* selectable item (MaintenanceService or MaintenanceOption), when the item is in the selected state, the rendered component should display a visual selection indicator (check icon present and/or selected CSS class applied).

**Validates: Requirements 2.4, 4.3**

### Property 3: Service Detail Modal Trigger

*For any* MaintenanceService that has a non-empty `includes` array with more than 2 items, clicking the "Voir le détail" button should set the `detailService` state to that service, triggering the modal display.

**Validates: Requirements 2.6**

### Property 4: Discount Tier Highlighting

*For any* number of selected services (0 to N), the DiscountBanner should highlight exactly one tier: no tier if count < 2, tier 1 (5%) if count = 2, tier 2 (10%) if count = 3, tier 3 (15%) if count >= 4.

**Validates: Requirements 3.4**

### Property 5: Flat Fee vs Recurring Option Differentiation

*For any* MaintenanceOption, if `is_flat_fee` is true, the rendered OptionCard should display "forfait unique" label; otherwise, it should display "/an" or "/mois" suffix indicating recurring billing.

**Validates: Requirements 4.2**

### Property 6: Option Detail Button Conditional Display

*For any* MaintenanceOption, the "En savoir plus" button should be rendered if and only if the option has enriched details defined in the `optionDetails` mapping (keyed by slug).

**Validates: Requirements 4.4**

### Property 7: Floating Panel Expand/Collapse State

*For any* state of `isFloatingPanelExpanded`, toggling it should result in the opposite boolean value, and the panel UI should reflect this state (collapsed shows minimal view, expanded shows full view).

**Validates: Requirements 5.7**

### Property 8: Collapsed Panel Minimal Display

*For any* collapsed state of the FloatingPanel on mobile, the visible content should be limited to: the total price and an expand button ("Voir ma sélection"). The full selection list should not be visible.

**Validates: Requirements 7.5**

### Property 9: Pricing Calculation Preservation

*For any* combination of selected services and options, the calculated pricing (total, discounts, monthly/annual amounts) should match the output of the existing `calculatePricing` function from `lib/maintenance-pricing.ts`.

**Validates: Requirements 8.1**

### Property 10: Modal Content Preservation

*For any* MaintenanceService with a `slug` that has entries in `serviceIncludesDetails`, the detail modal should display all items from `service.includes` with their corresponding detailed descriptions from `serviceIncludesDetails[slug]`.

**Validates: Requirements 8.3**

### Property 11: Keyboard Navigation Support

*For any* interactive element (buttons, toggles, cards) in the page, the element should be focusable via Tab key and activatable via Enter or Space key.

**Validates: Requirements 7.10**

### Property 12: Billing Toggle State Consistency

*For any* value of `billingPeriod` ('monthly' or 'yearly'), all price displays across the page (ServiceCards, OptionCards, FloatingPanel) should consistently show prices in the selected period format.

**Validates: Requirements 5.2 (derived)**

## Error Handling

### Checkout Errors

| Error Scenario | Handling Strategy | User Feedback |
|----------------|-------------------|---------------|
| Network failure during checkout | Catch fetch error, set error state | "Une erreur est survenue. Veuillez réessayer ou nous contacter." |
| Stripe session creation fails | Parse error from API response | Display specific error message from API |
| No selection when clicking subscribe | Disable button, prevent action | Button disabled with visual feedback |
| API returns no URL | Throw error, catch in handler | Generic error message |

### Data Loading Errors

| Error Scenario | Handling Strategy | User Feedback |
|----------------|-------------------|---------------|
| Supabase query fails | Server-side error handling | Page shows error boundary or fallback |
| Empty services list | Render empty state | "Aucun service disponible pour le moment" |
| Empty options list | Hide options section | Section not rendered |

### State Management Errors

| Error Scenario | Handling Strategy | User Feedback |
|----------------|-------------------|---------------|
| Invalid service ID in selection | Filter out invalid IDs | Silent recovery, no user impact |
| Context used outside provider | Throw descriptive error | Development-time error |

### Implementation

```typescript
// Error state in context
interface ErrorState {
  checkout: string | null
  general: string | null
}

// Error handling in checkout
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
        billingPeriod: 'yearly', // Toujours annuel pour le checkout
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
    setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    setIsLoading(false)
  }
}
```

## Testing Strategy

### Dual Testing Approach

Cette feature nécessite à la fois des tests unitaires (exemples spécifiques, edge cases) et des tests property-based (propriétés universelles).

### Unit Tests (Jest + React Testing Library)

Tests d'exemples spécifiques et edge cases:

```typescript
// __tests__/maintenance/ServiceCard.test.tsx
describe('ServiceCard', () => {
  it('renders service information correctly', () => {
    // Example: specific service with known values
  })
  
  it('shows empty state when no services selected', () => {
    // Edge case: empty selection
  })
  
  it('handles missing image gracefully', () => {
    // Edge case: fallback to gradient
  })
})

// __tests__/maintenance/FloatingPanel.test.tsx
describe('FloatingPanel', () => {
  it('shows subscribe button when services selected', () => {
    // Example: with selection
  })
  
  it('disables subscribe button when no selection', () => {
    // Edge case: empty state
  })
})
```

### Property-Based Tests (fast-check)

Configuration: minimum 100 iterations par test.

```typescript
// __tests__/maintenance/properties.test.ts
import fc from 'fast-check'

// Feature: maintenance-page-redesign, Property 1: Service Card Information Completeness
describe('Property 1: Service Card Information Completeness', () => {
  it('should display all required information for any service', () => {
    fc.assert(
      fc.property(
        arbitraryMaintenanceService(),
        (service) => {
          const { getByText } = render(<ServiceCard service={service} ... />)
          // Verify icon, name, monthly price, annual price are present
          expect(getByText(service.name)).toBeInTheDocument()
          expect(getByText(formatEUR(service.price_monthly))).toBeInTheDocument()
          expect(getByText(formatEUR(service.price_monthly * 12))).toBeInTheDocument()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: maintenance-page-redesign, Property 4: Discount Tier Highlighting
describe('Property 4: Discount Tier Highlighting', () => {
  it('should highlight correct tier based on selection count', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10 }),
        (selectionCount) => {
          const expectedTier = getExpectedTier(selectionCount)
          const { container } = render(
            <DiscountBanner selectedCount={selectionCount} />
          )
          // Verify exactly one tier is highlighted
          const highlightedTiers = container.querySelectorAll('.tier-active')
          expect(highlightedTiers.length).toBe(selectionCount >= 2 ? 1 : 0)
          if (selectionCount >= 2) {
            expect(highlightedTiers[0]).toHaveAttribute('data-tier', expectedTier)
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: maintenance-page-redesign, Property 9: Pricing Calculation Preservation
describe('Property 9: Pricing Calculation Preservation', () => {
  it('should match existing calculatePricing function', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryMaintenanceService(), { minLength: 0, maxLength: 6 }),
        fc.array(arbitraryMaintenanceOption(), { minLength: 0, maxLength: 4 }),
        (services, options) => {
          const serviceIds = services.map(s => s.id)
          const optionIds = options.map(o => o.id)
          
          const expected = calculatePricing(services, options, serviceIds, optionIds)
          const actual = newCalculatePricing(services, options, serviceIds, optionIds)
          
          expect(actual.totalAnnual).toBe(expected.totalAnnual)
          expect(actual.discountMultiPercent).toBe(expected.discountMultiPercent)
          expect(actual.totalMonthly).toBe(expected.totalMonthly)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: maintenance-page-redesign, Property 12: Billing Toggle State Consistency
describe('Property 12: Billing Toggle State Consistency', () => {
  it('should show consistent prices across all components', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('monthly', 'yearly'),
        arbitraryMaintenanceService(),
        (billingPeriod, service) => {
          const { getAllByTestId } = render(
            <ConfiguratorProvider billingPeriod={billingPeriod}>
              <ServiceCard service={service} />
              <FloatingPanel />
            </ConfiguratorProvider>
          )
          
          const priceDisplays = getAllByTestId('price-display')
          const expectedPrice = billingPeriod === 'monthly' 
            ? service.price_monthly 
            : service.price_monthly * 12
            
          priceDisplays.forEach(display => {
            expect(display.textContent).toContain(formatEUR(expectedPrice))
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

### Arbitrary Generators

```typescript
// __tests__/maintenance/arbitraries.ts
import fc from 'fast-check'

export const arbitraryMaintenanceService = (): fc.Arbitrary<MaintenanceService> =>
  fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    slug: fc.string({ minLength: 1, maxLength: 30 }).map(s => s.toLowerCase().replace(/\s/g, '-')),
    description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
    price_monthly: fc.integer({ min: 100, max: 50000 }), // 1€ to 500€ in centimes
    icon: fc.constantFrom('Flame', 'Wind', 'Sun', 'Droplets', 'Zap', 'Wrench'),
    includes: fc.array(fc.string({ minLength: 5, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
    is_active: fc.constant(true),
    sort_order: fc.integer({ min: 0, max: 100 }),
    created_at: fc.date().map(d => d.toISOString()),
  })

export const arbitraryMaintenanceOption = (): fc.Arbitrary<MaintenanceOption> =>
  fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    slug: fc.string({ minLength: 1, maxLength: 30 }).map(s => s.toLowerCase().replace(/\s/g, '-')),
    description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
    price_monthly: fc.integer({ min: 100, max: 20000 }),
    icon: fc.constantFrom('ShieldCheck', 'Wrench', 'Sparkles', 'Zap'),
    is_active: fc.constant(true),
    is_flat_fee: fc.boolean(),
    exempt_from_discount: fc.boolean(),
    sort_order: fc.integer({ min: 0, max: 100 }),
    created_at: fc.date().map(d => d.toISOString()),
  })
```

### Test Coverage Goals

| Category | Target Coverage |
|----------|-----------------|
| Context logic | 90% |
| Pricing calculations | 100% |
| Component rendering | 80% |
| User interactions | 85% |
| Error handling | 90% |

### Accessibility Testing

```typescript
// __tests__/maintenance/accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('ServiceCard has no accessibility violations', async () => {
    const { container } = render(<ServiceCard ... />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  it('FloatingPanel has no accessibility violations', async () => {
    const { container } = render(<FloatingPanel ... />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  it('all interactive elements are keyboard accessible', () => {
    // Property 11 implementation
    const { getAllByRole } = render(<MaintenancePage ... />)
    const buttons = getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('tabIndex')
      // or not have tabIndex=-1
    })
  })
})
```
