# Implementation Plan: Maintenance Page Redesign

## Overview

Refonte de la page de maintenance avec une architecture modulaire basée sur un Context React partagé. L'implémentation suit une approche mobile-first avec un panel flottant rétractable et un toggle Mensuel/Annuel. La logique métier existante (calcul des prix, checkout Stripe) est préservée.

## Tasks

- [ ] 1. Créer le Context et les composants de base
  - [x] 1.1 Créer MaintenanceConfiguratorContext avec l'état partagé
    - Créer `components/maintenance/MaintenanceConfiguratorContext.tsx`
    - Implémenter le provider avec services, options, sélections, billingPeriod, isFloatingPanelExpanded
    - Réutiliser la fonction `calculatePricing` existante
    - Exposer les actions: toggleService, toggleOption, setBillingPeriod, setFloatingPanelExpanded
    - _Requirements: 8.1, 5.2_

  - [x] 1.2 Écrire le test property-based pour la préservation du calcul des prix
    - **Property 9: Pricing Calculation Preservation**
    - **Validates: Requirements 8.1**

  - [x] 1.3 Créer le composant BillingToggle
    - Créer `components/maintenance/BillingToggle.tsx`
    - Toggle visuel Mensuel/Annuel avec animation fluide
    - Support clavier (Tab, Enter, Space)
    - _Requirements: 5.2, 7.10_

  - [x] 1.4 Écrire le test property-based pour la cohérence du toggle
    - **Property 12: Billing Toggle State Consistency**
    - **Validates: Requirements 5.2**

- [x] 2. Checkpoint - Vérifier le Context et BillingToggle
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Implémenter les composants de cartes (ServiceCard, OptionCard)
  - [x] 3.1 Créer ServiceCard avec indicateur de sélection
    - Créer `components/maintenance/ServiceCard.tsx`
    - Afficher icône, nom, prix mensuel ET annuel
    - Effet de survol (élévation, bordure colorée)
    - Indicateur visuel de sélection (coche verte, bordure)
    - Bouton "Voir le détail" pour services avec includes > 2
    - _Requirements: 2.2, 2.3, 2.4, 2.6_

  - [x] 3.2 Écrire le test property-based pour ServiceCard
    - **Property 1: Service Card Information Completeness**
    - **Validates: Requirements 2.2**

  - [x] 3.3 Écrire le test property-based pour l'indicateur de sélection
    - **Property 2: Selection Visual Indicator**
    - **Validates: Requirements 2.4, 4.3**

  - [x] 3.4 Écrire le test property-based pour le bouton détail
    - **Property 3: Service Detail Modal Trigger**
    - **Validates: Requirements 2.6**

  - [x] 3.5 Créer OptionCard avec différenciation forfait/récurrent
    - Créer `components/maintenance/OptionCard.tsx`
    - Différencier visuellement options récurrentes vs forfaits uniques
    - Indicateur de sélection (coche ambre, bordure)
    - Bouton "En savoir plus" conditionnel
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 3.6 Écrire le test property-based pour la différenciation forfait/récurrent
    - **Property 5: Flat Fee vs Recurring Option Differentiation**
    - **Validates: Requirements 4.2**

  - [x] 3.7 Écrire le test property-based pour le bouton détail option
    - **Property 6: Option Detail Button Conditional Display**
    - **Validates: Requirements 4.4**

- [x] 4. Checkpoint - Vérifier les composants de cartes
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implémenter les sections principales
  - [x] 5.1 Créer MaintenanceHero
    - Créer `components/maintenance/MaintenanceHero.tsx`
    - Titre "Sérénité Totale pour votre Habitat"
    - Image inclinée avec effet zoom au survol (desktop)
    - Badge RGE flottant, Google Rating Badge
    - Layout vertical sur mobile avec gradient
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 7.2, 7.11_

  - [x] 5.2 Créer MaintenanceServiceCatalog
    - Créer `components/maintenance/MaintenanceServiceCatalog.tsx`
    - Grille responsive (3 cols desktop, 2 tablette, 1 mobile)
    - Utiliser ServiceCard pour chaque service
    - Palette Material Design 3 verts doux
    - _Requirements: 2.1, 2.5, 7.3_

  - [x] 5.3 Créer MaintenanceDiscountBanner
    - Créer `components/maintenance/MaintenanceDiscountBanner.tsx`
    - Message "Plus vous équipez, plus vous économisez"
    - 3 cartes visuelles pour les paliers (2=-5%, 3=-10%, 4+=-15%)
    - Mise en surbrillance du palier actif
    - Empilement vertical sur mobile
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 7.7_

  - [x] 5.4 Écrire le test property-based pour le highlighting des paliers
    - **Property 4: Discount Tier Highlighting**
    - **Validates: Requirements 3.4**

  - [x] 5.5 Créer MaintenanceOptionsSection
    - Créer `components/maintenance/MaintenanceOptionsSection.tsx`
    - Style cohérent avec le catalogue de services
    - Utiliser OptionCard pour chaque option
    - _Requirements: 4.1_

- [x] 6. Checkpoint - Vérifier les sections principales
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implémenter le FloatingPanel et les modales
  - [x] 7.1 Créer MaintenanceFloatingPanel
    - Créer `components/maintenance/MaintenanceFloatingPanel.tsx`
    - Position fixed bas droite (desktop), pleine largeur bas (mobile)
    - Intégrer BillingToggle
    - Récapitulatif sélections avec prix et remise
    - Bouton "Souscrire" vers checkout Stripe
    - État vide avec message d'incitation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 7.2 Implémenter le comportement rétractable sur mobile
    - État collapsed: total + bouton "Voir ma sélection"
    - État expanded: overlay 80% hauteur
    - Animation de transition fluide
    - _Requirements: 5.7, 7.4, 7.5, 7.6_

  - [x] 7.3 Écrire le test property-based pour expand/collapse
    - **Property 7: Floating Panel Expand/Collapse State**
    - **Validates: Requirements 5.7**

  - [x] 7.4 Écrire le test property-based pour l'affichage minimal collapsed
    - **Property 8: Collapsed Panel Minimal Display**
    - **Validates: Requirements 7.5**

  - [x] 7.5 Créer ServiceDetailModal
    - Créer `components/maintenance/ServiceDetailModal.tsx`
    - Afficher tous les items de service.includes avec détails enrichis
    - Utiliser serviceIncludesDetails existant
    - _Requirements: 8.3_

  - [x] 7.6 Écrire le test property-based pour le contenu de la modale
    - **Property 10: Modal Content Preservation**
    - **Validates: Requirements 8.3**

  - [x] 7.7 Créer OptionDetailModal
    - Créer `components/maintenance/OptionDetailModal.tsx`
    - Afficher benefits et whyUseful depuis optionDetails
    - _Requirements: 8.3_

- [x] 8. Checkpoint - Vérifier le FloatingPanel et les modales
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implémenter la FAQ et finaliser
  - [x] 9.1 Créer MaintenanceFAQSection
    - Créer `components/maintenance/MaintenanceFAQSection.tsx`
    - Accordéon avec animations fluides
    - Icônes et couleurs cohérentes avec le nouveau design
    - Typographie lisible, espacement généreux
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 9.2 Refactorer la page principale
    - Modifier `app/(public)/services/maintenance/page.tsx`
    - Wrapper avec MaintenanceConfiguratorProvider
    - Remplacer les sections par les nouveaux composants
    - Conserver Header/Footer existants
    - _Requirements: 8.4, 8.5_

  - [-] 9.3 Écrire le test property-based pour la navigation clavier
    - **Property 11: Keyboard Navigation Support**
    - **Validates: Requirements 7.10**

- [x] 10. Tests d'accessibilité et validation finale
  - [x] 10.1 Vérifier les contrastes WCAG AA
    - Valider tous les textes avec les outils d'accessibilité
    - _Requirements: 7.9_

  - [x] 10.2 Vérifier les zones de touch minimum 44x44px
    - Valider tous les éléments interactifs sur mobile
    - _Requirements: 7.8_

- [x] 11. Checkpoint final - Validation complète
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Le projet utilise TypeScript/React (Next.js) avec Tailwind CSS
- La logique de pricing existante dans `lib/maintenance-pricing.ts` doit être réutilisée
- Les types `MaintenanceService` et `MaintenanceOption` sont déjà définis dans `types/maintenance.ts`
- Les données enrichies (serviceIncludesDetails, optionDetails) sont dans le composant existant et doivent être extraites
- fast-check est utilisé pour les tests property-based avec minimum 100 itérations
