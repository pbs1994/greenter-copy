# Implementation Plan: Migration Payload CMS

## Overview

Ce plan d'implémentation couvre la migration complète du site e-commerce Greenter de Supabase vers Payload CMS avec MongoDB Atlas. L'implémentation suit une approche incrémentale : configuration de base, collections, hooks Stripe, blocks, frontend, migration des données, et nettoyage final.

## Tasks

- [x] 1. Configuration Payload CMS et infrastructure
  - [x] 1.1 Installer Payload CMS et dépendances
    - Installer `payload`, `@payloadcms/db-mongodb`, `@payloadcms/richtext-lexical`, `@payloadcms/storage-vercel-blob`
    - Configurer `payload.config.ts` avec MongoDB adapter et Lexical editor
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 1.2 Configurer les routes Payload Admin
    - Créer `app/(payload)/admin/[[...segments]]/page.tsx`
    - Créer `app/(payload)/api/[...slug]/route.ts`
    - _Requirements: 1.3, 1.6_

  - [x] 1.3 Configurer les variables d'environnement
    - Ajouter MONGODB_URI, PAYLOAD_SECRET dans `.env.local`
    - Ajouter CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
    - Configurer le script de génération de types TypeScript
    - _Requirements: 1.2, 1.4, 1.5, 26.1, 26.2, 26.3_

  - [x] 1.4 Créer le helper Local API
    - Créer `lib/payload.ts` avec fonction `getPayloadClient()`
    - _Requirements: 1.6_

- [x] 2. Checkpoint - Vérifier configuration de base
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Collections de base (Media, Users, Categories)
  - [x] 3.1 Créer la collection Media
    - Définir `collections/Media.ts` avec upload config, mimeTypes (jpg, png, webp, svg, gif)
    - Configurer Cloudinary storage adapter
    - Ajouter champ alt pour accessibilité
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [x] 3.2 Écrire test property pour validation fichiers Media
    - **Property 3: Media File Type Validation**
    - **Property 4: Media File Size Limit**
    - **Validates: Requirements 4.1, 4.2**

  - [x] 3.3 Écrire test property pour génération images responsives
    - **Property 5: Responsive Image Generation**
    - **Validates: Requirements 4.3**

  - [x] 3.4 Créer la collection Users
    - Définir `collections/Users.ts` avec email, password, role
    - Configurer comme collection admin dans payload.config.ts
    - _Requirements: 23.1, 23.2, 23.5_

  - [x] 3.5 Créer la collection Categories
    - Définir `collections/Categories.ts` avec name, slug, description, image, spec_fields
    - Ajouter hook beforeDelete pour protection contre suppression
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 3.6 Écrire test property pour protection suppression catégorie
    - **Property 2: Category Deletion Protection**
    - **Validates: Requirements 3.4**

- [x] 4. Collection Products et hook Stripe
  - [x] 4.1 Créer le field helper slug
    - Créer `fields/slug.ts` avec auto-génération depuis le champ source
    - _Requirements: 2.11, 3.1_

  - [x] 4.2 Écrire test property pour auto-génération slug
    - **Property 1: Slug Auto-Generation**
    - **Validates: Requirements 2.11, 3.1**

  - [x] 4.3 Créer la collection Products
    - Définir `collections/Products.ts` avec tous les champs (name, slug, price, description, specs, features, faq, images, gallery)
    - Ajouter relationship vers Categories
    - Ajouter champ blocks pour sections modulaires
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10_

  - [x] 4.4 Créer le hook syncProductToStripe
    - Créer `hooks/syncProductToStripe.ts`
    - Implémenter création Stripe product/price sur create
    - Implémenter mise à jour et archivage prix sur update
    - Implémenter archivage produit sur désactivation
    - _Requirements: 22.1, 22.2, 22.3_

  - [x] 4.5 Écrire test property pour synchronisation Stripe
    - **Property 12: Product-Stripe Synchronization**
    - **Validates: Requirements 22.1, 22.2, 22.3**

- [x] 5. Checkpoint - Vérifier collections produits
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Collections Customers et Orders
  - [x] 6.1 Créer la collection Customers
    - Définir `collections/Customers.ts` avec email (unique), name, phone
    - Configurer Access Control admin-only
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 6.2 Écrire test property pour unicité email customer
    - **Property 22: Customer Email Uniqueness**
    - **Validates: Requirements 5.1**

  - [x] 6.3 Créer le hook generateOrderNumber
    - Créer `hooks/generateOrderNumber.ts` pour auto-génération numéro commande
    - _Requirements: 6.1_

  - [x] 6.4 Créer la collection Orders
    - Définir `collections/Orders.ts` avec order_number, stripe_session_id, status, amount, addresses, items
    - Ajouter relationship vers Customers et Products
    - Ajouter status_history avec hook afterChange
    - Configurer Access Control
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [x] 6.5 Écrire test property pour historique statut commande
    - **Property 8: Order Status History Logging**
    - **Validates: Requirements 6.7**

  - [x] 6.6 Écrire test property pour Access Control admin-only
    - **Property 6: Admin-Only Collection Access**
    - **Validates: Requirements 5.5, 6.8, 23.1, 23.3**

- [x] 7. Collections Maintenance
  - [x] 7.1 Créer la collection MaintenanceServices
    - Définir `collections/MaintenanceServices.ts` avec name, slug, description, price_monthly, icon, includes, is_active, sort_order
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 7.2 Créer la collection MaintenanceOptions
    - Définir `collections/MaintenanceOptions.ts` avec name, slug, description, price_monthly, icon, is_active, is_flat_fee, exempt_from_discount, sort_order
    - _Requirements: 8.1, 8.2_

  - [x] 7.3 Créer la collection MaintenanceSubscriptions
    - Définir `collections/MaintenanceSubscriptions.ts` avec stripe_subscription_id, billing_period, status, totals, discounts, items
    - Ajouter relationship vers Customers
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 7.4 Écrire test property pour calcul MRR
    - **Property 19: MRR Calculation Accuracy**
    - **Validates: Requirements 9.5**

- [x] 8. Checkpoint - Vérifier collections métier
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Collections Blog et Pages
  - [x] 9.1 Créer la collection BlogPosts
    - Définir `collections/BlogPosts.ts` avec title, slug, excerpt, author, published_date, status, featured_image, content, seo, tags
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

  - [x] 9.2 Créer la collection Pages
    - Définir `collections/Pages.ts` avec title, slug, status, seo, blocks
    - Ajouter validation pour slugs réservés
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [x] 9.3 Écrire test property pour validation slugs réservés
    - **Property 11: Reserved Slug Validation**
    - **Validates: Requirements 11.5**

  - [x] 9.4 Écrire test property pour accès contenu draft
    - **Property 9: Draft Content Public Access Denial**
    - **Validates: Requirements 10.7, 20.6, 21.4**

  - [x] 9.5 Écrire test property pour accès public contenu publié
    - **Property 7: Public Content Read Access**
    - **Validates: Requirements 23.4**

- [x] 10. Blocks modulaires
  - [x] 10.1 Créer le block Hero
    - Définir `blocks/Hero.ts` avec heading, subheading, background_image, cta, alignment, overlay
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 10.2 Créer le block SpecsTable
    - Définir `blocks/SpecsTable.ts` avec auto-population depuis product.specs
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [x] 10.3 Créer le block FAQ
    - Définir `blocks/FAQ.ts` avec accordion, Rich_Text answers, auto-population
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [x] 10.4 Créer le block Gallery
    - Définir `blocks/Gallery.ts` avec grid responsive, lightbox, captions, auto-population
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

  - [x] 10.5 Créer le block ComparisonChart
    - Définir `blocks/ComparisonChart.ts` avec colonnes, lignes, types de cellules, highlight
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

  - [x] 10.6 Créer le block CTA
    - Définir `blocks/CTA.ts` avec heading, description, button, style, background
    - _Requirements: 17.1, 17.2, 17.3_

  - [x] 10.7 Créer le block RichText
    - Définir `blocks/RichText.ts` avec Lexical editor complet
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

  - [x] 10.8 Créer l'index des blocks et les ajouter aux collections
    - Créer `blocks/index.ts` exportant ProductBlocks et PageBlocks
    - Mettre à jour Products, Pages, BlogPosts pour utiliser les blocks
    - _Requirements: 2.9, 11.3_

  - [x] 10.9 Écrire test property pour auto-population blocks
    - **Property 16: Block Auto-Population from Parent**
    - **Validates: Requirements 13.1, 14.3, 15.4**

- [x] 11. Checkpoint - Vérifier blocks
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Webhook Stripe
  - [x] 12.1 Créer le webhook handler Stripe
    - Créer `app/api/webhook/stripe/route.ts`
    - Implémenter checkout.session.completed pour créer Orders
    - Implémenter customer.subscription.* pour MaintenanceSubscriptions
    - _Requirements: 22.4, 22.5, 22.6, 22.7_

  - [x] 12.2 Écrire test property pour création commande via webhook
    - **Property 13: Stripe Webhook Order Creation**
    - **Validates: Requirements 22.5, 22.6**

  - [x] 12.3 Écrire test property pour webhook subscription
    - **Property 14: Stripe Subscription Webhook Handling**
    - **Validates: Requirements 22.7**

- [x] 13. Frontend - Pages produits
  - [x] 13.1 Créer les composants de rendu des blocks
    - Créer `components/blocks/HeroBlock.tsx`
    - Créer `components/blocks/SpecsTableBlock.tsx`
    - Créer `components/blocks/FAQBlock.tsx`
    - Créer `components/blocks/GalleryBlock.tsx`
    - Créer `components/blocks/ComparisonChartBlock.tsx`
    - Créer `components/blocks/CTABlock.tsx`
    - Créer `components/blocks/RichTextBlock.tsx`
    - Créer `components/blocks/BlockRenderer.tsx` pour le rendu dynamique
    - _Requirements: 12.3, 13.3, 14.1, 15.1, 15.2, 16.5, 19.3_

  - [x] 13.2 Écrire test property pour ordre de rendu des blocks
    - **Property 15: Blocks Render Order Preservation**
    - **Validates: Requirements 19.3, 21.2**

  - [x] 13.3 Mettre à jour la page produit
    - Modifier `app/(public)/produits/[categorySlug]/[productSlug]/page.tsx`
    - Utiliser Payload Local API au lieu de Supabase
    - Ajouter rendu des blocks
    - Ajouter JSON-LD Product structured data
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

  - [x] 13.4 Écrire test property pour produit inactif 404
    - **Property 10: Inactive Product 404**
    - **Validates: Requirements 19.6**

  - [x] 13.5 Écrire test property pour JSON-LD structured data
    - **Property 17: Structured Data Generation**
    - **Validates: Requirements 14.4, 19.4, 20.4**

  - [x] 13.6 Mettre à jour la page liste produits
    - Modifier `app/(public)/produits/page.tsx` pour utiliser Payload Local API
    - Modifier `app/(public)/produits/[categorySlug]/page.tsx` pour utiliser Payload Local API
    - _Requirements: 19.1, 19.2_

- [x] 14. Frontend - Blog
  - [x] 14.1 Créer la page index blog
    - Créer `app/(public)/blog/page.tsx` avec pagination
    - Afficher cards avec title, excerpt, featured_image, date
    - _Requirements: 20.1, 20.2_

  - [x] 14.2 Créer la page article blog
    - Créer `app/(public)/blog/[slug]/page.tsx`
    - Ajouter JSON-LD Article structured data
    - Ajouter section articles liés par tags
    - _Requirements: 20.3, 20.4, 20.5, 20.6_

  - [x] 14.3 Écrire test property pour articles liés par tags
    - **Property 18: Related Articles by Tags**
    - **Validates: Requirements 20.5**

- [x] 15. Frontend - Pages dynamiques
  - [x] 15.1 Créer la route catch-all pour pages
    - Créer `app/(public)/[slug]/page.tsx`
    - Implémenter rendu des blocks
    - Gérer priorité sous les routes statiques
    - _Requirements: 21.1, 21.2, 21.3, 21.4_

- [x] 16. Checkpoint - Vérifier frontend
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Migration des données (optionnel - customers/orders uniquement)
  - [x] 17.1 Créer le script de migration pour customers et orders existants
    - Créer `scripts/migrate.ts`
    - Migrer uniquement customers et orders depuis Supabase (si nécessaire)
    - Les produits seront ajoutés manuellement via Payload Admin
    - _Requirements: 24.3, 24.4_

  - Note: Les produits ne sont PAS migrés - ils seront créés manuellement dans Payload Admin
  - Le hook syncProductToStripe créera automatiquement les produits/prix Stripe

- [x] 18. Mise à jour des composants existants
  - [x] 18.1 Mettre à jour le configurateur maintenance
    - Modifier `components/MaintenanceConfigurator.tsx` pour utiliser Payload Local API
    - _Requirements: 7.4_

  - [x] 18.2 Mettre à jour les pages services
    - Modifier `app/(public)/services/maintenance/page.tsx` pour utiliser Payload Local API
    - _Requirements: 7.4_

  - [x] 18.3 Mettre à jour les API routes checkout
    - Modifier `app/api/checkout/` pour utiliser stripe_price_id depuis Payload
    - _Requirements: 22.4_

- [ ] 19. Suppression de Supabase ⚠️ À FAIRE UNIQUEMENT APRÈS VALIDATION COMPLÈTE
  - [ ] 19.1 Supprimer les dépendances Supabase
    - ⚠️ NE PAS EXÉCUTER AVANT VALIDATION DE LA MIGRATION
    - Désinstaller `@supabase/supabase-js` et `@supabase/ssr`
    - Supprimer le code d'initialisation client Supabase
    - _Requirements: 25.1, 25.2_

  - [ ] 19.2 Supprimer les fichiers Supabase
    - ⚠️ NE PAS EXÉCUTER AVANT VALIDATION DE LA MIGRATION
    - Supprimer le dossier `supabase/` avec les schémas SQL
    - Supprimer les variables d'environnement Supabase de `.env.local`
    - _Requirements: 25.3, 25.4_

  - [ ] 19.3 Supprimer l'admin custom
    - ⚠️ NE PAS EXÉCUTER AVANT VALIDATION DE LA MIGRATION
    - Supprimer le dossier `app/administrator/` (remplacé par Payload /admin)
    - _Requirements: 25.6_

  - [ ] 19.4 Nettoyer les imports et références Supabase
    - ⚠️ NE PAS EXÉCUTER AVANT VALIDATION DE LA MIGRATION
    - Mettre à jour tous les fichiers utilisant encore Supabase vers Payload Local API
    - _Requirements: 25.5_

- [ ] 20. Configuration Vercel finale
  - [ ] 20.1 Configurer le build Vercel
    - Ajouter script `generate:types` dans package.json
    - Configurer prebuild pour générer les types Payload
    - Vérifier configuration CORS pour admin panel
    - _Requirements: 26.4, 26.5, 26.6_

- [ ] 21. Checkpoint final - Vérifier migration complète
  - ⚠️ VALIDER MANUELLEMENT avant de passer à la tâche 19
  - Tester toutes les pages produits avec Payload
  - Tester le blog et les pages dynamiques
  - Tester le checkout et les webhooks Stripe
  - Tester l'admin Payload à /admin
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Les tâches marquées avec `*` sont optionnelles et peuvent être ignorées pour un MVP plus rapide
- Chaque tâche référence les requirements spécifiques pour la traçabilité
- Les checkpoints permettent de valider l'avancement incrémental
- Les tests property-based valident les propriétés universelles de correction
- Les tests unitaires valident les cas spécifiques et edge cases
- La migration doit être exécutée après que toutes les collections soient créées
- La suppression de Supabase doit être la dernière étape après validation complète
