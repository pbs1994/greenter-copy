# Implementation Plan: PAC Landing Page Optimization

## Overview

Refonte de la landing page `/services/pompe-a-chaleur` pour maximiser les conversions Google Ads. L'implémentation suit une approche incrémentale : d'abord le formulaire Hero (priorité #1), puis les trust signals, le sticky CTA mobile, et enfin les schemas SEO.

## Tasks

- [x] 1. Créer le composant HeroQuoteForm
  - [x] 1.1 Créer le fichier `components/HeroQuoteForm.tsx` avec le formulaire de devis
    - Adapter le formulaire de `app/(public)/contact/page.tsx` pour le Hero
    - Champs : nom, téléphone, email, type de projet (select), code postal
    - Protection honeypot (champ invisible)
    - États : idle, loading, success, error
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x] 1.2 Écrire le test property pour la soumission du formulaire
    - **Property 1: Form submission with valid data triggers API call and success message**
    - **Validates: Requirements 1.3**

  - [x] 1.3 Écrire le test property pour la protection honeypot
    - **Property 2: Honeypot protection prevents bot submissions**
    - **Validates: Requirements 1.4**

  - [x] 1.4 Écrire le test property pour l'état de chargement
    - **Property 3: Loading state disables form during submission**
    - **Validates: Requirements 1.5**

- [x] 2. Checkpoint - Vérifier le formulaire Hero
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Créer le composant StickyCTA pour mobile
  - [x] 3.1 Créer le fichier `components/StickyCTA.tsx`
    - Bouton fixe en bas de l'écran sur mobile (< 768px)
    - Apparaît après scroll de 100vh
    - Scroll smooth vers le formulaire au clic
    - _Requirements: 5.1, 5.2_

  - [x] 3.2 Écrire les tests unitaires pour StickyCTA
    - Tester la visibilité conditionnelle sur mobile
    - Tester le comportement de scroll
    - _Requirements: 5.1, 5.2_

- [x] 4. Créer la section WhyGreenter (différenciateurs)
  - [x] 4.1 Créer le fichier `components/WhyGreenterSection.tsx`
    - 4 différenciateurs : proximité locale, accompagnement aides, pas de démarchage, équipe locale
    - Design avec icônes et descriptions
    - _Requirements: 3.1, 3.2, 3.4, 6.2_

- [x] 5. Créer les schemas SEO
  - [x] 5.1 Créer le fichier `components/schemas/LocalBusinessSchema.tsx`
    - Données structurées LocalBusiness avec coordonnées et zone de service
    - _Requirements: 4.3_

  - [x] 5.2 Créer le fichier `components/schemas/AggregateRatingSchema.tsx`
    - Données structurées AggregateRating avec note Google
    - _Requirements: 4.6_

- [x] 6. Checkpoint - Vérifier les composants créés
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Refactorer la page pompe-a-chaleur
  - [x] 7.1 Modifier `app/(public)/services/pompe-a-chaleur/page.tsx`
    - Intégrer HeroQuoteForm dans le Hero (côté droit)
    - Ajouter les trust signals dans le Hero (note Google, garanties)
    - Ajouter la section WhyGreenter après le Hero
    - Intégrer StickyCTA pour mobile
    - Ajouter LocalBusinessSchema et AggregateRatingSchema
    - Réorganiser en 8 sections max
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 3.1, 4.1, 4.2, 8.1, 8.2_

  - [x] 7.2 Écrire le test property pour le H1 unique avec mots-clés SEO
    - **Property 4: Unique H1 contains required SEO keywords**
    - **Validates: Requirements 4.1**

  - [x] 7.3 Écrire le test property pour la hiérarchie des titres
    - **Property 5: Heading hierarchy follows logical order**
    - **Validates: Requirements 4.2**

  - [x] 7.4 Écrire le test property pour les liens des villes
    - **Property 6: City links navigate to correct URLs**
    - **Validates: Requirements 7.2**

- [x] 8. Ajouter la section "Vérifiez notre légitimité"
  - [x] 8.1 Ajouter dans la page une section avec lien vers annuaire RGE officiel
    - Mention "Pas de démarchage téléphonique"
    - Adresse physique complète
    - _Requirements: 6.2, 6.3, 6.4_

- [x] 9. Optimiser le contenu pour les requêtes locales
  - [x] 9.1 Vérifier que la FAQ contient au moins 2 questions géolocalisées
    - Questions existantes : "Combien coûte une PAC à Ozoir-la-Ferrière ?", "Quelles aides pour une PAC en Seine-et-Marne ?"
    - Mentionner "Seine-et-Marne (77)" dans le contenu visible
    - _Requirements: 7.3, 7.4_

- [x] 10. Final checkpoint - Validation complète
  - Ensure all tests pass, ask the user if questions arise.
  - Vérifier que la page a maximum 8 sections
  - Vérifier que les types de PAC sont limités à 3
  - Vérifier l'accessibilité du formulaire (labels, focus, navigation clavier)

## Notes

- Les tâches marquées avec `*` sont optionnelles et peuvent être ignorées pour un MVP plus rapide
- Le formulaire de référence est dans `app/(public)/contact/page.tsx`
- Les composants existants réutilisés : GoogleRatingBadgeClient, GoogleReviewsCarousel, ServiceAreaSection
- Les schemas existants réutilisés : ServiceSchema, BreadcrumbSchema, FAQPageSchema
- Priorités : Formulaire Hero (#1) > Trust signals (#2) > Sticky CTA (#3) > Schemas SEO (#4)
