# Requirements Document

## Introduction

Ce document définit les exigences pour la fonctionnalité de contrats de maintenance et SAV de Greenter. Le système permettra aux clients de souscrire à des contrats d'entretien annuel pour leurs équipements énergétiques (chaudière à gaz, pompe à chaleur, photovoltaïque, ballon thermodynamique, système solaire combiné, chauffe-eau solaire). Les contrats sont gérés via une table dédiée dans Supabase, administrables depuis le panel admin existant, et souscrits via Stripe Checkout en mode subscription. La page publique propose un configurateur interactif avec checkboxes, récapitulatif temps réel, et système de remises progressives.

## Glossaire

- **Maintenance_Service** : Un type d'équipement pour lequel un contrat d'entretien est proposé (ex: "Pompe à chaleur", 25€/mois)
- **Maintenance_Option** : Une option supplémentaire ajoutée au contrat (ex: "Intervention urgence 24h", 50€/mois)
- **Maintenance_Subscription** : Un abonnement souscrit par un client, regroupant un ou plusieurs services et options
- **Remise_Multi** : Remise progressive appliquée quand le client sélectionne plusieurs équipements (2 = -5%, 3 = -10%, 4+ = -15%)
- **Remise_Annuelle** : Remise de -10% appliquée quand le client choisit le paiement annuel
- **Configurateur** : Interface publique interactive permettant au client de sélectionner ses services, options, et mode de paiement
- **Engagement_Minimum** : Durée minimale de 12 mois pour tout contrat de maintenance

## Requirements

### Requirement 1: Schéma de base de données

**User Story:** En tant qu'administrateur, je veux une structure de données dédiée pour les contrats de maintenance, afin de gérer les services, options et souscriptions indépendamment des produits.

#### Critères d'acceptation

1. LA Base de données DOIT contenir une table `maintenance_services` avec les colonnes : id (UUID), name (text), slug (text unique), description (text), price_monthly (integer, centimes), icon (text), includes (JSONB array), is_active (boolean), sort_order (integer), created_at (timestamp)
2. LA Base de données DOIT contenir une table `maintenance_options` avec les colonnes : id (UUID), name (text), slug (text unique), description (text), price_monthly (integer, centimes), icon (text), is_active (boolean), exempt_from_discount (boolean default true), sort_order (integer), created_at (timestamp)
3. LA Base de données DOIT contenir une table `maintenance_subscriptions` avec les colonnes : id (UUID), customer_id (UUID FK customers), stripe_subscription_id (text unique), billing_period (enum: 'monthly'/'yearly'), status (enum: 'active'/'cancelled'/'past_due'/'paused'), total_monthly (integer, centimes), discount_multi_percent (integer), discount_annual_percent (integer), total_after_discounts (integer, centimes), created_at (timestamp), cancelled_at (timestamp nullable)
4. LA Base de données DOIT contenir une table `maintenance_subscription_items` avec les colonnes : id (UUID), subscription_id (UUID FK), item_type (enum: 'service'/'option'), maintenance_service_id (UUID FK nullable), maintenance_option_id (UUID FK nullable), name (text), unit_price (integer, centimes)
5. LA Base de données DOIT créer les index appropriés sur les colonnes slug, customer_id, stripe_subscription_id et status
6. LA Base de données DOIT appliquer les contraintes de clé étrangère entre les tables liées

### Requirement 2: Données initiales

**User Story:** En tant qu'administrateur, je veux que les 6 services de maintenance et l'option urgence soient pré-configurés, afin de pouvoir lancer le service rapidement.

#### Critères d'acceptation

1. LE Seed DOIT créer les 6 services de maintenance : Chaudière à gaz (1500 cts/mois), Pompe à chaleur (2500), Photovoltaïque (2000), Ballon thermodynamique (1500), Système solaire combiné (2500), Chauffe-eau solaire (1500)
2. LE Seed DOIT créer l'option "Intervention urgence sous 24h" à 5000 cts/mois avec exempt_from_discount=true
3. CHAQUE service DOIT inclure dans son champ `includes` : "1 intervention annuelle obligatoire", "Vérification de l'état des appareils", "Rapport d'intervention"
4. CHAQUE service DOIT préciser dans sa description que les pièces de remplacement ne sont pas incluses

### Requirement 3: Administration des services de maintenance

**User Story:** En tant qu'administrateur, je veux gérer les services et options de maintenance depuis le panel admin, afin de modifier les prix, ajouter ou désactiver des services sans toucher au code.

#### Critères d'acceptation

1. LE Panel_Admin DOIT fournir une section "Maintenance" accessible depuis la navigation sidebar
2. LE Panel_Admin DOIT afficher la liste des services de maintenance avec nom, prix, statut actif/inactif et ordre d'affichage
3. LE Panel_Admin DOIT permettre de créer, modifier et supprimer des services de maintenance
4. LE Panel_Admin DOIT permettre de créer, modifier et supprimer des options de maintenance
5. LE Panel_Admin DOIT permettre d'activer/désactiver un service ou une option
6. LE Panel_Admin DOIT permettre de modifier l'ordre d'affichage des services (sort_order)
7. LE Panel_Admin DOIT afficher la liste des souscriptions avec client, services choisis, statut et montant
8. LA Suppression d'un service ou option ayant des souscriptions actives DOIT être empêchée avec un message d'erreur

### Requirement 4: Configurateur public (page maintenance)

**User Story:** En tant que client, je veux sélectionner mes équipements à entretenir via des checkboxes et voir le prix en temps réel, afin de composer mon contrat sur mesure.

#### Critères d'acceptation

1. LA Page maintenance DOIT afficher les services actifs sous forme de checkboxes avec nom, prix mensuel et description
2. LA Page maintenance DOIT afficher les options actives sous forme de checkboxes séparées
3. QUAND le client coche/décoche un service ALORS le récapitulatif DOIT se mettre à jour en temps réel
4. LE Récapitulatif DOIT afficher : services sélectionnés, remise multi-équipements, sous-total services, options, total mensuel, total annuel, économies réalisées
5. LA Page DOIT proposer un toggle mensuel/annuel pour le mode de paiement
6. LA Page DOIT être mobile-first et responsive
7. LA Page DOIT afficher les données depuis Supabase (pas de données hardcodées)
8. LE Bouton "Souscrire" DOIT être désactivé si aucun service n'est sélectionné
9. LA Page DOIT afficher clairement les conditions : engagement 12 mois, intervention planifiée entre le 10ème et 12ème mois, pièces non incluses

### Requirement 5: Logique de remises

**User Story:** En tant que client, je veux bénéficier de remises progressives quand je souscris à plusieurs services ou que je paie annuellement, afin d'être incité à grouper mes contrats.

#### Critères d'acceptation

1. QUAND le client sélectionne 2 services ALORS une remise de 5% DOIT être appliquée sur le total des services
2. QUAND le client sélectionne 3 services ALORS une remise de 10% DOIT être appliquée sur le total des services
3. QUAND le client sélectionne 4 services ou plus ALORS une remise de 15% DOIT être appliquée sur le total des services (plafonnée à 15%)
4. LA Remise multi-équipements NE DOIT PAS s'appliquer aux options marquées exempt_from_discount=true
5. QUAND le client choisit le paiement annuel ALORS une remise supplémentaire de 10% DOIT être appliquée sur le total des services après remise multi
6. LA Remise annuelle NE DOIT PAS s'appliquer aux options marquées exempt_from_discount=true
7. L'ORDRE de calcul DOIT être : remise multi d'abord, puis remise annuelle sur le restant
8. LE Récapitulatif DOIT afficher le détail de chaque remise et l'économie totale

### Requirement 6: Intégration Stripe (subscriptions)

**User Story:** En tant que client, je veux payer mon contrat de maintenance via Stripe, afin de souscrire de manière sécurisée.

#### Critères d'acceptation

1. LE Système DOIT créer une Stripe Checkout Session en mode `subscription` avec les line_items correspondant aux services et options sélectionnés
2. QUAND le client choisit le paiement mensuel ALORS l'intervalle de facturation DOIT être `month`
3. QUAND le client choisit le paiement annuel ALORS l'intervalle de facturation DOIT être `year` avec le prix annuel remisé
4. LA Session Stripe DOIT collecter : nom, email, adresse, téléphone, moyen de paiement
5. LES Remises DOIVENT être appliquées via des coupons Stripe ou des prix ajustés
6. APRÈS paiement réussi, LE Système DOIT rediriger vers une page de succès dédiée maintenance
7. LE Webhook Stripe DOIT traiter les événements de subscription (created, updated, deleted) pour mettre à jour le statut dans Supabase

### Requirement 7: Suivi des souscriptions

**User Story:** En tant qu'administrateur, je veux voir toutes les souscriptions de maintenance dans l'admin, afin de suivre les clients et planifier les interventions.

#### Critères d'acceptation

1. QUAND un paiement Stripe subscription est confirmé ALORS LE Système DOIT créer un enregistrement dans `maintenance_subscriptions` et `maintenance_subscription_items`
2. LE Panel_Admin DOIT afficher la liste des souscriptions avec filtres par statut
3. LE Panel_Admin DOIT afficher le détail d'une souscription : client, services, options, montants, remises, statut, dates
4. QUAND une subscription Stripe est annulée ALORS LE Système DOIT mettre à jour le statut et la date d'annulation dans Supabase

### Requirement 8: Email de confirmation

**User Story:** En tant que client, je veux recevoir un email de confirmation après ma souscription, afin d'avoir un récapitulatif de mon contrat.

#### Critères d'acceptation

1. APRÈS souscription réussie, LE Système DOIT envoyer un email de confirmation au client
2. L'Email DOIT contenir : récapitulatif des services souscrits, montant mensuel/annuel, conditions (engagement 12 mois, intervention M10-M12, pièces non incluses)
3. LE Système DOIT envoyer une notification email à l'administrateur pour chaque nouvelle souscription

### Requirement 9: Page de succès maintenance

**User Story:** En tant que client, je veux voir une page de confirmation après ma souscription, afin de savoir que tout s'est bien passé.

#### Critères d'acceptation

1. LA Page de succès DOIT afficher un récapitulatif de la souscription (services, options, montants, remises)
2. LA Page de succès DOIT afficher les prochaines étapes (confirmation email, planification intervention entre M10 et M12)
3. LA Page de succès DOIT afficher les conditions du contrat (engagement 12 mois, pièces non incluses)
4. LA Page de succès DOIT proposer un lien de contact et le numéro de téléphone

### Requirement 10: Cohérence UI

**User Story:** En tant que client, je veux que la page maintenance soit cohérente avec le reste du site, afin d'avoir une expérience fluide.

#### Critères d'acceptation

1. LA Page DOIT utiliser les mêmes composants Tailwind CSS, couleurs et typographies que le reste du site
2. LA Page DOIT conserver le Hero section, la section FAQ et les services complémentaires existants
3. LE Configurateur DOIT remplacer la section "Nos contrats" actuelle (les 3 cartes Essentiel/Sérénité/Premium)
4. LA Page DOIT être accessible (labels, focus states, contraste)
5. TOUS les textes DOIVENT être en français
