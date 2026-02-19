# Plan d'implémentation : Contrats de Maintenance

## Overview

Ce plan découpe la fonctionnalité en tâches incrémentales. On commence par le schéma DB et les types, puis la logique métier (pricing), l'admin panel, le configurateur public, l'intégration Stripe, et enfin les emails et page succès. Chaque tâche s'appuie sur les précédentes.

## Tasks

- [x] 1. Schéma de base de données et types TypeScript
  - [x] 1.1 Créer `supabase/maintenance.sql` — fichier unique avec schéma + seed
    - Tables : maintenance_services, maintenance_options, maintenance_subscriptions, maintenance_subscription_items
    - Types ENUM : billing_period, subscription_status
    - Contraintes FK, index
    - Utiliser IF NOT EXISTS / ON CONFLICT pour exécution safe et re-exécutable
    - Seed : 6 services de maintenance + 1 option urgence 24h dans le même fichier
    - Fichier prêt à copier-coller directement dans le SQL editor de Supabase
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4_
  - [x] 1.2 Créer `types/maintenance.ts` avec les interfaces TypeScript
    - MaintenanceService, MaintenanceOption, MaintenanceSubscription, MaintenanceSubscriptionItem
    - ConfiguratorState, PricingSummary, BillingPeriod, SubscriptionStatus
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Logique de calcul des remises (utiliser pnpm pour toute installation de dépendance)
  - [x] 2.1 Créer `lib/maintenance-pricing.ts`
    - Fonction getMultiDiscount(serviceCount) → pourcentage
    - Fonction calculatePricing(services, options, selectedIds, billingPeriod) → PricingSummary
    - Gestion des options exempt_from_discount
    - Ordre : remise multi d'abord, puis remise annuelle
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  - [x] 2.2 Écrire les tests pour la logique de pricing
    - Test remise multi : 1 service = 0%, 2 = 5%, 3 = 10%, 4+ = 15%
    - Test options exemptées non remisées
    - Test ordre d'application des remises
    - Test total toujours positif
    - Test économies annuelles correctes
    - _Propriétés: 1, 2, 3, 4, 5_

- [ ] 3. Checkpoint — Vérifier schéma DB et logique pricing
  - Exécuter les tests pricing, vérifier que tout passe. Demander à l'utilisateur s'il a exécuté le SQL dans Supabase.

- [ ] 4. API route services maintenance
  - [x] 4.1 Créer `app/api/maintenance-services/route.ts`
    - GET : retourner les services et options actifs, triés par sort_order
    - _Requirements: 4.7_

- [ ] 5. Admin panel — Section Maintenance
  - [x] 5.1 Créer les server actions `app/administrator/actions/maintenance.ts`
    - createService, updateService, deleteService, toggleServiceActive
    - createOption, updateOption, deleteOption, toggleOptionActive
    - Vérification suppression (souscriptions actives)
    - _Requirements: 3.3, 3.4, 3.5, 3.8_
  - [x] 5.2 Créer le formulaire service `components/administrator/MaintenanceServiceForm.tsx`
    - Champs : name, description, price_monthly, icon, includes (éditeur JSON array), is_active, sort_order
    - _Requirements: 3.3_
  - [x] 5.3 Créer le formulaire option `components/administrator/MaintenanceOptionForm.tsx`
    - Champs : name, description, price_monthly, icon, exempt_from_discount, is_active, sort_order
    - _Requirements: 3.4_
  - [x] 5.4 Créer la page liste maintenance `app/administrator/maintenance/page.tsx`
    - Afficher services et options dans deux sections
    - Boutons créer, modifier, supprimer, activer/désactiver
    - _Requirements: 3.1, 3.2_
  - [x] 5.5 Créer les pages CRUD services
    - `app/administrator/maintenance/services/new/page.tsx`
    - `app/administrator/maintenance/services/[id]/page.tsx`
    - _Requirements: 3.3, 3.6_
  - [x] 5.6 Créer les pages CRUD options
    - `app/administrator/maintenance/options/new/page.tsx`
    - `app/administrator/maintenance/options/[id]/page.tsx`
    - _Requirements: 3.4_
  - [x] 5.7 Ajouter le lien "Maintenance" dans la navigation sidebar admin
    - _Requirements: 3.1_

- [ ] 6. Checkpoint — Vérifier admin panel maintenance
  - Tester CRUD services et options dans l'admin. Demander à l'utilisateur de vérifier.

- [ ] 7. Configurateur public
  - [x] 7.1 Créer le composant `components/MaintenanceConfigurator.tsx`
    - Checkboxes services avec nom, prix, description
    - Checkboxes options séparées
    - Toggle mensuel/annuel
    - Récapitulatif temps réel (utilise calculatePricing)
    - Bouton "Souscrire" désactivé si aucun service
    - Conditions affichées (engagement 12 mois, intervention M10-M12, pièces non incluses)
    - Mobile-first : liste verticale + récap bottom, desktop : 2 colonnes + récap sticky
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.8, 4.9_
  - [x] 7.2 Mettre à jour la page maintenance `app/(public)/services/maintenance/page.tsx`
    - Fetch services et options depuis Supabase (server component)
    - Passer les données au Configurateur
    - Remplacer la section "Nos contrats" par le Configurateur
    - Conserver Hero, FAQ, services complémentaires
    - Mettre à jour la section "Types de maintenance" avec les services dynamiques
    - _Requirements: 4.7, 10.1, 10.2, 10.3, 10.5_

- [ ] 8. Checkpoint — Vérifier configurateur public
  - Tester le configurateur sur mobile et desktop. Vérifier les calculs de remises. Demander à l'utilisateur de vérifier.

- [ ] 9. Intégration Stripe subscriptions
  - [x] 9.1 Créer `app/api/checkout/maintenance/route.ts`
    - Recevoir serviceIds, optionIds, billingPeriod
    - Valider les services/options actifs depuis Supabase
    - Calculer les prix avec remises
    - Créer Stripe Checkout Session en mode subscription
    - Stocker metadata (type, service_ids, option_ids, billing_period, remises)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [x] 9.2 Étendre le webhook Stripe `app/api/webhook/stripe/route.ts`
    - Traiter customer.subscription.created → créer maintenance_subscription + items
    - Traiter customer.subscription.updated → mettre à jour statut
    - Traiter customer.subscription.deleted → marquer cancelled
    - Filtrer sur metadata.type === 'maintenance'
    - _Requirements: 6.7, 7.1, 7.4_

- [ ] 10. Admin — Liste des souscriptions
  - [x] 10.1 Créer `app/administrator/maintenance/subscriptions/page.tsx`
    - Liste des souscriptions avec client, services, statut, montant
    - Filtres par statut
    - _Requirements: 3.7, 7.2_
  - [x] 10.2 Créer `app/administrator/maintenance/subscriptions/[id]/page.tsx`
    - Détail souscription : client, services, options, montants, remises, statut, dates
    - _Requirements: 7.3_

- [ ] 11. Page succès et emails
  - [x] 11.1 Créer `app/(public)/services/maintenance/succes/page.tsx`
    - Récapitulatif souscription (services, options, montants, remises)
    - Prochaines étapes (email confirmation, intervention M10-M12)
    - Conditions du contrat
    - Contact et téléphone
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [x] 11.2 Ajouter le template email maintenance dans `lib/email-templates.ts`
    - Email client : récapitulatif services, montant, conditions
    - Email admin : notification nouvelle souscription
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 11.3 Envoyer les emails depuis le webhook subscription.created
    - _Requirements: 8.1, 8.3_

- [ ] 12. Checkpoint final — Test intégration complète
  - Tester le flow complet : sélection → checkout → paiement → webhook → souscription en base → emails → page succès. Demander à l'utilisateur de vérifier sur preprod.

## Notes

- Toutes les tâches référencent les requirements pour la traçabilité
- Les checkpoints permettent une validation incrémentale avec l'utilisateur
- L'UI admin et publique doit être en français
- Suivre les patterns existants (server actions, Supabase client, Stripe checkout)
- Les prix sont toujours en centimes dans la base et les calculs
- Mobile-first pour le configurateur public
- Utiliser pnpm pour toute installation de dépendance (pas npm ni yarn)
- Le fichier SQL est unique (schema + seed) pour copier-coller direct dans le SQL editor Supabase
