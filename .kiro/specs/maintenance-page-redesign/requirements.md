# Requirements Document

## Introduction

Refonte complète du design de la page de maintenance (/services/maintenance) pour la rendre plus moderne, chaleureuse et compréhensible. La page permet aux utilisateurs de souscrire à des contrats d'entretien pour leurs équipements (chaudière, PAC, photovoltaïque, etc.). Le nouveau design doit être plus impactant visuellement tout en conservant la logique métier existante (sélection, calcul des prix avec remises multi-équipements, checkout Stripe).

## Glossaire

- **Hero_Section**: Section d'en-tête principale de la page avec titre, image et appels à l'action
- **Service_Catalog**: Grille affichant les services d'entretien disponibles avec leurs prix
- **Discount_Banner**: Bandeau visuel présentant les paliers de remise multi-équipements
- **Options_Section**: Section permettant de personnaliser le contrat avec des options additionnelles
- **Floating_Panel**: Panel de sélection/récapitulatif flottant en bas à droite de l'écran
- **FAQ_Section**: Section des questions fréquentes avec accordéon
- **Google_Rating_Badge**: Badge affichant la note Google et le nombre d'avis
- **RGE_Badge**: Badge flottant indiquant la certification RGE de l'entreprise
- **Billing_Toggle**: Interrupteur permettant de basculer entre affichage mensuel et annuel

## Requirements

### Requirement 1: Hero Section Impactante

**User Story:** En tant que visiteur, je veux voir une section hero moderne et impactante, afin de comprendre immédiatement la valeur du service d'entretien.

#### Acceptance Criteria

1. THE Hero_Section SHALL afficher un titre principal avec typographie massive "Sérénité Totale pour votre Habitat"
2. THE Hero_Section SHALL afficher une image inclinée (rotation légère) avec effet de zoom au survol
3. THE Hero_Section SHALL afficher un RGE_Badge flottant positionné sur l'image
4. THE Hero_Section SHALL intégrer le Google_Rating_Badge dans la zone hero
5. THE Hero_Section SHALL afficher un sous-titre explicatif et un bouton d'appel à l'action vers le configurateur
6. WHILE l'écran est de taille mobile, THE Hero_Section SHALL empiler les éléments verticalement et masquer l'image inclinée

### Requirement 2: Catalogue de Services Modernisé

**User Story:** En tant que visiteur, je veux voir les services d'entretien dans une grille aérée et moderne, afin de comparer facilement les offres.

#### Acceptance Criteria

1. THE Service_Catalog SHALL afficher les services dans une grille responsive (3 colonnes desktop, 2 tablette, 1 mobile)
2. THE Service_Catalog SHALL afficher pour chaque service : icône, nom, prix mensuel ET annuel bien visibles
3. THE Service_Catalog SHALL utiliser des cartes avec effet de survol (élévation, bordure colorée)
4. WHEN un service est sélectionné, THE Service_Catalog SHALL afficher un indicateur visuel de sélection (coche, bordure verte)
5. THE Service_Catalog SHALL utiliser la palette Material Design 3 avec des verts plus doux (#4CAF50 → #66BB6A)
6. WHEN l'utilisateur clique sur "Voir le détail", THE Service_Catalog SHALL ouvrir la modale de détails existante

### Requirement 3: Bandeau de Remises Visuelles

**User Story:** En tant que visiteur, je veux comprendre visuellement les remises multi-équipements, afin d'être incité à souscrire plusieurs services.

#### Acceptance Criteria

1. THE Discount_Banner SHALL afficher le message "Plus vous équipez, plus vous économisez"
2. THE Discount_Banner SHALL présenter les 3 paliers de remise (2 équipements = -5%, 3 = -10%, 4+ = -15%) sous forme de cartes visuelles
3. THE Discount_Banner SHALL utiliser des icônes et couleurs distinctives pour chaque palier
4. WHEN l'utilisateur a sélectionné des services, THE Discount_Banner SHALL mettre en surbrillance le palier actif

### Requirement 4: Section Options Personnalisables

**User Story:** En tant que visiteur, je veux voir les options additionnelles de manière claire, afin de personnaliser mon contrat.

#### Acceptance Criteria

1. THE Options_Section SHALL afficher les options dans un style cohérent avec le catalogue de services
2. THE Options_Section SHALL différencier visuellement les options récurrentes des forfaits uniques
3. WHEN une option est sélectionnée, THE Options_Section SHALL afficher un indicateur visuel de sélection
4. THE Options_Section SHALL conserver le bouton "En savoir plus" pour les options avec détails enrichis

### Requirement 5: Panel de Sélection Flottant

**User Story:** En tant que visiteur, je veux voir mon récapitulatif de sélection dans un panel flottant accessible, afin de suivre ma configuration sans perdre le contexte.

#### Acceptance Criteria

1. THE Floating_Panel SHALL être positionné en bas à droite de l'écran (position fixed)
2. THE Floating_Panel SHALL afficher un Billing_Toggle pour basculer entre affichage Mensuel/Annuel
3. THE Floating_Panel SHALL afficher le total avec la remise appliquée
4. THE Floating_Panel SHALL afficher un bouton "Souscrire" menant au checkout Stripe
5. WHILE aucun service n'est sélectionné, THE Floating_Panel SHALL afficher un état vide avec message d'incitation
6. WHILE l'écran est de taille mobile, THE Floating_Panel SHALL s'afficher en pleine largeur en bas de l'écran
7. THE Floating_Panel SHALL être rétractable/expansible sur mobile pour ne pas gêner la navigation

### Requirement 6: FAQ Modernisée

**User Story:** En tant que visiteur, je veux consulter les questions fréquentes dans un style moderne, afin de trouver rapidement les réponses à mes questions.

#### Acceptance Criteria

1. THE FAQ_Section SHALL utiliser un style d'accordéon avec animations fluides
2. THE FAQ_Section SHALL utiliser des icônes et couleurs cohérentes avec le nouveau design
3. THE FAQ_Section SHALL afficher les questions avec une typographie lisible et un espacement généreux
4. WHEN une question est ouverte, THE FAQ_Section SHALL afficher une transition animée pour la réponse

### Requirement 7: Design Mobile-First Premium

**User Story:** En tant que visiteur sur mobile, je veux une expérience de navigation fluide et un design soigné, afin de pouvoir souscrire facilement depuis mon smartphone.

#### Acceptance Criteria

1. THE Page SHALL être conçue en mobile-first avec des breakpoints Tailwind (sm, md, lg, xl)
2. THE Hero_Section SHALL afficher un design épuré sur mobile avec le titre en pleine largeur et un gradient de fond élégant
3. THE Service_Catalog SHALL afficher les cartes en une seule colonne sur mobile avec un espacement généreux
4. THE Floating_Panel SHALL s'afficher en pleine largeur en bas de l'écran sur mobile (sticky bottom)
5. THE Floating_Panel SHALL être rétractable sur mobile (afficher uniquement le total et un bouton "Voir ma sélection")
6. WHEN le Floating_Panel est déplié sur mobile, THE Floating_Panel SHALL occuper 80% de la hauteur de l'écran avec un overlay
7. THE Discount_Banner SHALL empiler les 3 paliers verticalement sur mobile
8. THE Page SHALL avoir des zones de touch suffisamment grandes (minimum 44x44px) pour tous les éléments interactifs
9. THE Page SHALL respecter les contrastes WCAG AA pour tous les textes
10. THE Page SHALL supporter la navigation au clavier pour tous les éléments interactifs
11. IF l'image hero n'est pas encore fournie, THEN THE Page SHALL afficher un gradient de fond élégant

### Requirement 8: Conservation de la Logique Métier

**User Story:** En tant que développeur, je veux que la logique métier existante soit préservée, afin de ne pas introduire de régressions.

#### Acceptance Criteria

1. THE Page SHALL conserver le calcul des prix avec remises multi-équipements existant
2. THE Page SHALL conserver l'intégration checkout Stripe existante
3. THE Page SHALL conserver les modales de détails des services et options existantes
4. THE Page SHALL conserver la récupération des données depuis Supabase (maintenance_services, maintenance_options)
5. THE Page SHALL conserver le Header et Footer existants sans modification
