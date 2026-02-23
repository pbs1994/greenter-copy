# Implementation Plan: SEO Local Optimization Greenter

## Overview

Ce plan implémente l'optimisation SEO local du site Greenter en 6 phases progressives. Chaque phase est testable indépendamment et apporte une valeur immédiate.

**Langage** : TypeScript (Next.js 14+ App Router)
**Tests** : Jest + fast-check (déjà installés)

## Tasks

- [x] 1. Configuration et utilitaires de base
  - [x] 1.1 Créer `lib/local-seo-data.ts` avec les données centralisées
    - Définir les interfaces City et ServiceInfo
    - Configurer la liste des villes (Ozoir-la-Ferrière, Roissy-en-Brie, etc.)
    - Définir les constantes Google (Place ID, URLs)
    - Définir l'adresse de l'entreprise avec coordonnées GPS
    - _Requirements: 4.1, 4.2, 4.4, 9.1_
  
  - [x] 1.2 Créer `lib/google-places.ts` avec les utilitaires API
    - Définir les types pour l'API Google Places (New)
    - Créer la fonction fetchGoogleReviews avec gestion d'erreurs
    - Créer la fonction transformGoogleResponse pour normaliser les données
    - _Requirements: 1.1, 1.3, 1.5_

- [x] 2. API Google Reviews
  - [x] 2.1 Créer `app/api/google-reviews/route.ts`
    - Implémenter le handler GET avec cache Next.js (revalidate: 86400)
    - Appeler Google Places API (New) avec le Place ID
    - Transformer et retourner les données normalisées
    - Gérer les erreurs avec fallback sur données par défaut
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ]* 2.2 Écrire les tests pour l'API Google Reviews
    - **Property 1: API Response Structure Validation**
    - **Validates: Requirements 1.1, 1.3**

- [x] 3. Checkpoint - Vérifier l'API
  - Tester manuellement `/api/google-reviews` en local
  - Vérifier que les données sont retournées correctement
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Composants Google Reviews
  - [x] 4.1 Créer `components/GoogleRatingBadge.tsx`
    - Server Component qui récupère les données via fetch interne
    - Afficher la note "X.X/5 (N avis)" avec logo Google SVG
    - Afficher les étoiles visuelles (composant Star réutilisable)
    - Lien vers Google Maps au clic
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ]* 4.2 Écrire les tests pour GoogleRatingBadge
    - **Property 2: Rating Badge Rendering**
    - **Validates: Requirements 2.1, 2.3**
  
  - [x] 4.3 Créer `components/GoogleReviewsCarousel.tsx`
    - Client Component utilisant Embla Carousel (déjà installé)
    - Récupérer les données via useEffect + fetch `/api/google-reviews`
    - Afficher les avis avec nom, étoiles, texte, date relative
    - Défilement automatique avec pause au hover
    - Liens "Voir tous nos avis" et "Laisser un avis"
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [ ]* 4.4 Écrire les tests pour GoogleReviewsCarousel
    - **Property 3: Review Card Rendering**
    - **Validates: Requirements 3.2**

- [x] 5. Checkpoint - Vérifier les composants
  - Intégrer temporairement les composants sur une page de test
  - Vérifier le rendu visuel et le comportement
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Mise à jour des Schemas JSON-LD
  - [x] 6.1 Mettre à jour `components/JsonLd.tsx`
    - Changer l'adresse vers Ozoir-la-Ferrière, 77330
    - Mettre à jour les coordonnées GPS (48.7626, 2.6721)
    - Remplacer areaServed "Country: France" par liste de villes
    - Ajouter aggregateRating avec données dynamiques ou fallback
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.3, 5.4_
  
  - [ ]* 6.2 Écrire les tests pour le schema LocalBusiness
    - **Property 4: Schema areaServed Structure**
    - **Validates: Requirements 4.3, 4.5**

- [x] 7. Composant Service Area Section
  - [x] 7.1 Créer `components/ServiceAreaSection.tsx`
    - Server Component affichant la liste des villes
    - Titre "Nous intervenons près de chez vous"
    - Grille responsive avec checkmarks (Lucide CheckCircle)
    - CTA "Demander un devis" vers /contact
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Optimisation page PAC existante
  - [x] 8.1 Mettre à jour `app/services/pompe-a-chaleur/layout.tsx`
    - Modifier le title avec villes locales
    - Modifier la meta description avec villes et téléphone
    - _Requirements: 6.1, 6.2_
  
  - [x] 8.2 Mettre à jour `app/services/pompe-a-chaleur/page.tsx`
    - Modifier le H1 avec contexte local
    - Ajouter les 3 questions FAQ locales
    - Intégrer GoogleRatingBadge sous la section hero
    - Intégrer GoogleReviewsCarousel après les avantages
    - Intégrer ServiceAreaSection avant le CTA final
    - Conserver "partout en France" dans le contenu
    - _Requirements: 6.3, 6.4, 8.1, 8.2, 8.3, 8.5_
  
  - [ ]* 8.3 Écrire les tests pour FAQPageSchema
    - **Property 5: FAQPageSchema Completeness**
    - **Validates: Requirements 8.4**

- [x] 9. Checkpoint - Vérifier la page PAC
  - Vérifier le rendu complet de la page PAC mise à jour
  - Tester les schemas avec Google Rich Results Test
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Structure pages locales
  - [x] 10.1 Créer `app/services/pompe-a-chaleur/[ville]/page.tsx`
    - Route dynamique avec generateStaticParams pour les villes prioritaires
    - generateMetadata pour meta tags dynamiques par ville
    - Template réutilisant les composants existants
    - Schema Service avec areaServed spécifique à la ville
    - Section liens internes vers autres services et villes voisines
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 11.2, 11.3_
  
  - [ ]* 10.2 Écrire les tests pour les pages locales
    - **Property 6: Local Page Generation Consistency**
    - **Validates: Requirements 9.2, 9.3, 9.4**
    - **Property 8: Internal Linking on Local Pages**
    - **Validates: Requirements 11.2, 11.3**
  
  - [x] 10.3 Mettre à jour `app/sitemap.ts`
    - Ajouter les URLs des pages locales pour chaque ville prioritaire
    - Définir priority 0.8 et changeFrequency "monthly"
    - _Requirements: 9.5_
  
  - [ ]* 10.4 Écrire les tests pour le sitemap
    - **Property 7: Sitemap Local Pages Coverage**
    - **Validates: Requirements 9.5**

- [x] 11. Mises à jour Header et Footer
  - [x] 11.1 Mettre à jour `components/Footer.tsx`
    - Ajouter lien "Nos avis Google" vers Google Maps
    - Mettre à jour l'adresse avec Ozoir-la-Ferrière
    - Ajouter section "Zones d'intervention" avec liens vers pages locales
    - _Requirements: 10.1, 10.2, 10.3, 11.4_
  
  - [x] 11.2 Mettre à jour `components/Header.tsx`
    - Ajouter mention zone d'intervention (ex: "Seine-et-Marne")
    - Améliorer visibilité du bouton téléphone click-to-call
    - _Requirements: 12.1, 12.2_

- [x] 12. Maillage interne page PAC
  - [x] 12.1 Ajouter section "Nos interventions par ville" sur la page PAC
    - Créer un composant ou section avec liens vers les pages locales
    - Afficher les villes prioritaires avec liens
    - _Requirements: 11.1_

- [x] 13. Checkpoint final
  - Vérifier toutes les pages et composants
  - Tester les schemas avec Google Rich Results Test
  - Vérifier le sitemap XML
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Les tâches marquées `*` sont optionnelles (tests property-based)
- Chaque checkpoint permet de valider une phase avant de continuer
- Les composants Google Reviews nécessitent la clé API dans `.env.local`
- Le cache de 24h évite les coûts excessifs de l'API Google Places
