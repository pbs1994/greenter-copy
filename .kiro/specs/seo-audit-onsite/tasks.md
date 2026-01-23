# Implementation Plan: SEO Audit On-Site Greenter

## Overview

Ce plan d'implémentation détaille les tâches de codage pour corriger les problèmes SEO identifiés sur le site Greenter. Les tâches sont organisées de manière incrémentale, chaque étape construisant sur les précédentes.

## Tasks

- [x] 1. Corriger les liens cassés
  - [x] 1.1 Mettre à jour Footer.tsx pour supprimer les liens cassés
    - Supprimer le lien vers /about (À propos)
    - Supprimer le lien vers /realisations (Réalisations)
    - _Requirements: 1.1, 1.2_
  
  - [x] 1.2 Corriger les liens dans Services.tsx
    - Changer `/services/pompes-a-chaleur` en `/services/pompe-a-chaleur`
    - Changer `/services/conformite` en `/services/maintenance`
    - _Requirements: 1.3, 1.4_

- [x] 2. Créer les composants Schema et leurs tests
  - [x] 2.1 Créer le composant ProductSchema
    - Créer `components/schemas/ProductSchema.tsx`
    - Implémenter le schema Product avec name, description, image, brand, sku, offers
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_
  
  - [x] 2.2 Écrire les tests pour ProductSchema
    - **Property 1: Product Schema Validity**
    - **Validates: Requirements 2.1-2.8**
  
  - [x] 2.3 Créer le composant ServiceSchema
    - Créer `components/schemas/ServiceSchema.tsx`
    - Implémenter le schema Service avec name, description, provider, areaServed
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 2.4 Écrire les tests pour ServiceSchema
    - **Property 3: Service Schema Validity**
    - **Validates: Requirements 4.1-4.5**
  
  - [x] 2.5 Créer le composant BreadcrumbSchema
    - Créer `components/schemas/BreadcrumbSchema.tsx`
    - Implémenter le schema BreadcrumbList dynamique basé sur le chemin
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 2.6 Écrire les tests pour BreadcrumbSchema
    - **Property 4: Breadcrumb Schema Correctness**
    - **Validates: Requirements 5.1-5.4**
  
  - [x] 2.7 Créer le composant FAQPageSchema
    - Créer `components/schemas/FAQPageSchema.tsx`
    - Implémenter le schema FAQPage avec Question/Answer pairs
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [x] 2.8 Écrire les tests pour FAQPageSchema
    - **Property 2: FAQ Schema Completeness**
    - **Validates: Requirements 3.1-3.3**

- [x] 3. Checkpoint - Vérifier les composants Schema
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Intégrer les schemas dans les pages
  - [x] 4.1 Ajouter ProductSchema et FAQPageSchema à la page produit
    - Modifier `app/produits/kstar-blue-s-6kw/page.tsx`
    - Ajouter ProductSchema avec les données du produit KSTAR
    - Ajouter FAQPageSchema avec les FAQ existantes
    - Ajouter BreadcrumbSchema pour la page produit
    - _Requirements: 2.1-2.8, 3.1-3.3, 5.3_
  
  - [x] 4.2 Ajouter ServiceSchema aux pages services
    - Modifier chaque page service (pompe-a-chaleur, panneaux-solaires, isolation, audit, maintenance)
    - Ajouter ServiceSchema avec les données spécifiques à chaque service
    - Ajouter BreadcrumbSchema pour chaque page service
    - _Requirements: 4.1-4.5, 5.2_

- [x] 5. Optimiser les images
  - [x] 5.1 Supprimer unoptimized des images dans Services.tsx
    - Retirer l'attribut `unoptimized={true}` des composants Image
    - _Requirements: 8.1, 8.2_
  
  - [x] 5.2 Améliorer les attributs alt des images
    - Mettre à jour l'alt de l'image produit KSTAR avec contexte "Batterie solaire onduleur hybride"
    - Vérifier et améliorer les alt des images services
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 5.3 Écrire les tests pour la qualité des alt
    - **Property 5: Image Alt Text Quality**
    - **Validates: Requirements 6.1-6.3**

- [x] 6. Améliorer le H1 de la page produit
  - [x] 6.1 Modifier le H1 de la page produit
    - Ajouter le contexte "Onduleur Hybride Batterie Solaire" au H1
    - Utiliser un span avec sr-only pour le contexte SEO si nécessaire pour le design
    - _Requirements: 7.1, 7.2_

- [x] 7. Créer la page catalogue produits
  - [x] 7.1 Remplacer la redirection par une vraie page catalogue
    - Modifier `app/produits/page.tsx`
    - Créer une grille de produits avec le KSTAR BluE-S
    - Ajouter les métadonnées SEO (title, description)
    - Ajouter le schema ItemList pour le catalogue
    - Ajouter BreadcrumbSchema pour la page catalogue
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 5.1_

- [x] 8. Checkpoint - Vérifier les pages
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Ajouter les liens internes dans la FAQ
  - [x] 9.1 Modifier le composant FAQ.tsx
    - Ajouter des liens vers /services/pompe-a-chaleur dans la réponse sur les PAC
    - Ajouter des liens vers /services/panneaux-solaires dans la réponse sur le solaire
    - Ajouter des liens vers /services/audit dans la réponse sur l'audit
    - Ajouter des liens vers /services/maintenance dans la réponse sur l'entretien
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [x] 9.2 Écrire les tests pour les liens FAQ
    - **Property 6: FAQ Internal Linking**
    - **Validates: Requirements 10.1-10.5**

- [x] 10. Final checkpoint - Validation complète
  - Ensure all tests pass, ask the user if questions arise.
  - Vérifier que tous les schemas sont valides avec le Rich Results Test de Google
  - Vérifier qu'aucun lien cassé ne subsiste

## Notes

- Toutes les tâches sont obligatoires, y compris les tests
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Les schemas JSON-LD doivent être validés avec https://validator.schema.org/

