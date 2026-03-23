# Requirements Document

## Introduction

Refonte de la landing page `/services/pompe-a-chaleur` pour Greenter, installateur de pompes à chaleur certifié RGE en Seine-et-Marne (77). L'objectif est de maximiser les conversions Google Ads, améliorer le SEO/GEO, et inspirer confiance aux visiteurs français méfiants face aux arnaques dans le secteur de la rénovation énergétique.

### Contexte problématique
- Beaucoup d'impressions Search Console mais 0 clics sur des requêtes locales
- Page actuelle sans formulaire intégré (CTA renvoie vers /contact)
- Signaux de confiance insuffisants dans le Hero
- Concurrents avec des sites basiques = opportunité de différenciation

### Objectifs business
- Augmenter le taux de conversion des visiteurs Google Ads
- Améliorer le CTR organique sur les requêtes locales
- Réduire le taux de rebond en inspirant confiance immédiatement
- Dominer les concurrents locaux (Periclim, Energical, Proclimat)

## Glossary

- **Landing_Page**: La page web `/services/pompe-a-chaleur` optimisée pour la conversion
- **Hero_Section**: Section visible immédiatement sans scroll (above the fold)
- **Quote_Form**: Formulaire de demande de devis intégré dans la page
- **Trust_Signals**: Éléments visuels inspirant confiance (certifications, avis, garanties)
- **CTA**: Call-to-action, bouton ou élément incitant à l'action
- **Sticky_CTA**: Bouton d'action fixe visible lors du scroll sur mobile
- **Schema_Markup**: Données structurées JSON-LD pour les moteurs de recherche
- **GEO**: Generative Engine Optimization, optimisation pour les réponses IA
- **ANAH**: Agence Nationale de l'Habitat (source des statistiques de fraude)

## Requirements

### Requirement 1: Formulaire de devis intégré dans le Hero

**User Story:** As a visiteur Google Ads, I want to remplir un formulaire de devis directement dans le Hero, so that je peux demander un devis sans quitter la page.

#### Acceptance Criteria

1. WHEN la Landing_Page est chargée, THE Hero_Section SHALL afficher un Quote_Form visible sans scroll sur desktop
2. THE Quote_Form SHALL contenir les champs : nom, téléphone, email, type de projet (select), code postal
3. WHEN le Quote_Form est soumis avec des données valides, THE Landing_Page SHALL envoyer les données à l'API `/api/contact` et afficher un message de confirmation
4. IF le champ honeypot est rempli, THEN THE Quote_Form SHALL simuler un succès sans envoyer les données (protection anti-bot)
5. WHILE le formulaire est en cours d'envoi, THE Quote_Form SHALL afficher un indicateur de chargement et désactiver le bouton submit
6. THE Quote_Form SHALL être accessible (labels associés, focus visible, navigation clavier)

### Requirement 2: Trust signals visibles immédiatement

**User Story:** As a visiteur méfiant, I want to voir les preuves de légitimité de l'entreprise immédiatement, so that je suis rassuré avant de remplir le formulaire.

#### Acceptance Criteria

1. WHEN la Landing_Page est chargée, THE Hero_Section SHALL afficher la note Google moyenne et le nombre d'avis (ex: "4.9/5 - 47 avis Google")
2. THE Hero_Section SHALL afficher au moins 2 garanties clés (garantie décennale, SAV local)
3. THE Trust_Signals SHALL être positionnés à proximité du Quote_Form pour maximiser la conversion
4. THE Landing_Page SHALL afficher un carrousel d'avis Google authentiques avec noms et dates

### Requirement 3: Différenciateurs Greenter clairs

**User Story:** As a visiteur comparant plusieurs installateurs, I want to comprendre pourquoi choisir Greenter, so that je peux prendre une décision éclairée.

#### Acceptance Criteria

1. THE Landing_Page SHALL afficher une section "Pourquoi Greenter" avec 3-4 différenciateurs uniques
2. THE Landing_Page SHALL mentionner la proximité locale (basé à Ozoir-la-Ferrière, intervention en 48h)
3. THE Landing_Page SHALL afficher un élément d'humanisation (photo équipe ou technicien nommé)
4. THE Landing_Page SHALL mentionner l'accompagnement administratif pour les aides (MaPrimeRénov', CEE)

### Requirement 4: Structure optimisée SEO et GEO

**User Story:** As a moteur de recherche ou IA, I want to comprendre le contenu de la page de manière structurée, so that je peux l'afficher dans les résultats pertinents.

#### Acceptance Criteria

1. THE Landing_Page SHALL contenir un H1 unique incluant "Pompe à chaleur" et la localisation principale
2. THE Landing_Page SHALL utiliser une hiérarchie de titres logique (H1 > H2 > H3) sans sauts de niveau
3. THE Landing_Page SHALL inclure le Schema_Markup LocalBusiness avec les coordonnées et zone de service
4. THE Landing_Page SHALL inclure le Schema_Markup Service avec les détails du service PAC
5. THE Landing_Page SHALL inclure le Schema_Markup FAQPage pour les questions fréquentes
6. THE Landing_Page SHALL inclure le Schema_Markup AggregateRating avec la note Google
7. WHEN la page est analysée par un crawler, THE Landing_Page SHALL avoir un temps de chargement LCP < 2.5 secondes

### Requirement 5: Expérience mobile optimisée

**User Story:** As a visiteur mobile, I want to naviguer facilement et accéder au formulaire rapidement, so that je peux demander un devis depuis mon smartphone.

#### Acceptance Criteria

1. WHILE l'utilisateur scroll sur mobile, THE Landing_Page SHALL afficher un Sticky_CTA fixe en bas de l'écran
2. THE Sticky_CTA SHALL contenir un bouton "Devis gratuit" qui scroll vers le Quote_Form
3. THE Quote_Form SHALL être entièrement visible et utilisable sur écran 375px de large
4. THE Landing_Page SHALL avoir un score Lighthouse Performance > 90 sur mobile
5. WHEN l'utilisateur clique sur le numéro de téléphone, THE Landing_Page SHALL déclencher l'appel direct

### Requirement 6: Réponse à la méfiance française

**User Story:** As a visiteur français méfiant des arnaques, I want to voir des preuves concrètes de légitimité, so that je suis rassuré que Greenter n'est pas une arnaque.

#### Acceptance Criteria

1. THE Landing_Page SHALL afficher des avis Google authentiques avec noms et dates
2. THE Landing_Page SHALL mentionner "Pas de démarchage téléphonique" (conformité loi 2020)
3. THE Landing_Page SHALL afficher l'adresse physique complète de l'entreprise
4. THE Landing_Page SHALL inclure une section "Vérifiez notre légitimité" avec lien vers annuaire RGE officiel

### Requirement 7: Optimisation du contenu pour les requêtes locales

**User Story:** As a habitant de Seine-et-Marne cherchant un installateur, I want to trouver du contenu pertinent pour ma ville, so that je sais que Greenter intervient chez moi.

#### Acceptance Criteria

1. THE Landing_Page SHALL afficher une section "Nos interventions par ville" avec les 8 villes principales
2. WHEN une ville est cliquée, THE Landing_Page SHALL rediriger vers la page dédiée `/services/pompe-a-chaleur/{ville-slug}`
3. THE Landing_Page SHALL inclure dans la FAQ au moins 2 questions géolocalisées (ex: "Combien coûte une PAC à Ozoir-la-Ferrière ?")
4. THE Landing_Page SHALL mentionner "Seine-et-Marne (77)" dans le contenu visible

### Requirement 8: Réduction de la longueur de page

**User Story:** As a visiteur pressé, I want to trouver l'information essentielle rapidement, so that je ne suis pas submergé par trop de contenu.

#### Acceptance Criteria

1. THE Landing_Page SHALL avoir une structure en maximum 8 sections distinctes
2. THE Landing_Page SHALL afficher les informations les plus importantes dans les 2 premières sections (Hero + Trust)
3. THE Landing_Page SHALL utiliser des accordéons pour la FAQ (contenu masqué par défaut)
4. THE Landing_Page SHALL limiter la section "Types de PAC" à 3 options maximum
5. WHEN l'utilisateur scroll, THE Landing_Page SHALL afficher un indicateur de progression (optionnel)
