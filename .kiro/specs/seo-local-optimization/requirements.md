# Document d'Exigences — Optimisation SEO Local Greenter

## Introduction

Ce document définit les exigences pour l'optimisation complète du SEO local du site Greenter (greenter.fr), entreprise de rénovation énergétique basée en Seine-et-Marne.

**Objectifs business** :
- Augmenter le CTR sur les requêtes locales (actuellement 0% malgré des impressions)
- Générer 5-10 demandes de devis supplémentaires par mois depuis la zone locale
- Améliorer la confiance avec les avis Google visibles

**Problèmes identifiés** :
- Aucune mention locale dans les titres et descriptions des pages
- Adresse affichée dans le schema LocalBusiness : Paris au lieu d'Ozoir-la-Ferrière
- Absence d'avis Google visibles sur le site
- Pas de schema AggregateRating pour afficher les étoiles dans les SERP
- Pas de pages locales dédiées par ville

**Zone d'intervention principale** : Ozoir-la-Ferrière, Roissy-en-Brie, Chevry-Cossigny, Lésigny, Pontault-Combault, Gretz-Armainvilliers, Tournan-en-Brie, Brie-Comte-Robert (Seine-et-Marne 77).

**Google Place ID** : ChIJ18W1Jb2UBkgRQ0A08rwoyGU

## Glossaire

- **Google_Reviews_API** : Route API Next.js qui récupère les avis via Google Places API (New) et les met en cache
- **Google_Rating_Badge** : Composant affichant la note moyenne Google (ex: 4.8/5 sur 23 avis) avec le logo Google
- **Google_Reviews_Carousel** : Composant carousel affichant les avis clients avec défilement automatique
- **Schema_LocalBusiness** : Données structurées JSON-LD décrivant l'entreprise locale pour les moteurs de recherche
- **Schema_AggregateRating** : Données structurées JSON-LD permettant l'affichage des étoiles dans les résultats Google
- **Service_Area_Section** : Composant affichant la liste des villes desservies avec checkmarks
- **Local_FAQ** : Questions fréquentes avec contexte local pour améliorer le SEO et la conversion
- **Local_Page** : Page d'atterrissage ciblant un service spécifique dans une ville spécifique
- **Zone_de_chalandise** : Ensemble des villes où Greenter intervient principalement (Seine-et-Marne 77)
- **Cache_Reviews** : Système de cache pour limiter les appels API Google Places à 1 par jour maximum
- **Internal_Link_System** : Système de maillage interne entre pages services et pages locales
- **Header** : Composant d'en-tête du site avec navigation et signaux locaux

## Exigences

### Exigence 1 : Intégration des avis Google via API

**User Story :** En tant que visiteur du site, je veux voir les avis Google de Greenter directement sur le site, afin d'avoir confiance dans l'entreprise avant de demander un devis.

#### Critères d'acceptation

1. WHEN une requête est faite à `/api/google-reviews`, THE Google_Reviews_API SHALL récupérer les avis via Google Places API (New) en utilisant le Place ID configuré
2. THE Google_Reviews_API SHALL mettre en cache les résultats pendant 24 heures (revalidate: 86400) pour limiter les coûts API
3. WHEN les données sont récupérées, THE Google_Reviews_API SHALL retourner un objet JSON contenant la note moyenne, le nombre total d'avis, et la liste des avis avec nom, note, texte et date
4. IF une erreur survient lors de l'appel API, THEN THE Google_Reviews_API SHALL retourner les données en cache si disponibles, sinon une réponse d'erreur avec un message explicite
5. THE Google_Reviews_API SHALL utiliser la clé API Google Places stockée dans les variables d'environnement (.env.local)

### Exigence 2 : Composant Google Rating Badge

**User Story :** En tant que visiteur, je veux voir la note Google de Greenter de manière visible sous la vidéo hero, afin de savoir rapidement que l'entreprise est bien notée.

#### Critères d'acceptation

1. THE Google_Rating_Badge SHALL afficher la note moyenne sous forme "X.X/5" avec le nombre d'avis entre parenthèses (ex: "4.8/5 (23 avis)")
2. THE Google_Rating_Badge SHALL afficher le logo Google officiel à côté de la note
3. THE Google_Rating_Badge SHALL afficher des étoiles visuelles correspondant à la note
4. WHEN l'utilisateur clique sur le badge, THE Google_Rating_Badge SHALL ouvrir la fiche Google Maps de Greenter dans un nouvel onglet
5. THE Google_Rating_Badge SHALL être un Server Component pour le SEO et récupérer les données via l'API interne

### Exigence 3 : Composant Google Reviews Carousel

**User Story :** En tant que visiteur, je veux voir les témoignages clients Google défiler automatiquement, afin de lire les expériences d'autres clients et renforcer ma confiance.

#### Critères d'acceptation

1. THE Google_Reviews_Carousel SHALL afficher les avis dans un carousel avec défilement automatique
2. WHEN un avis est affiché, THE Google_Reviews_Carousel SHALL montrer le nom du client, la note en étoiles, le texte de l'avis et la date relative
3. THE Google_Reviews_Carousel SHALL inclure un lien "Voir tous nos avis Google" qui ouvre Google Maps
4. THE Google_Reviews_Carousel SHALL inclure un lien "Laisser un avis" qui ouvre directement la page d'avis Google
5. THE Google_Reviews_Carousel SHALL utiliser les animations CSS ou Framer Motion existant dans le projet, sans dépendance externe
6. THE Google_Reviews_Carousel SHALL être responsive et s'adapter aux écrans mobile et desktop

### Exigence 4 : Mise à jour du Schema LocalBusiness

**User Story :** En tant que moteur de recherche, je veux des données structurées LocalBusiness avec l'adresse réelle et la zone de service correcte, afin d'afficher Greenter dans les résultats locaux pertinents.

#### Critères d'acceptation

1. THE Schema_LocalBusiness SHALL mettre à jour l'adresse avec "Ozoir-la-Ferrière, 77330" au lieu de "38 Rue de Ménilmontant, Paris 75020"
2. THE Schema_LocalBusiness SHALL mettre à jour les coordonnées GPS avec latitude 48.7626 et longitude 2.6721
3. THE Schema_LocalBusiness SHALL remplacer le champ `areaServed` de type "Country: France" par une liste détaillée des villes desservies
4. THE Schema_LocalBusiness SHALL inclure dans `areaServed` les villes : Ozoir-la-Ferrière, Roissy-en-Brie, Chevry-Cossigny, Lésigny, Pontault-Combault, Gretz-Armainvilliers, Tournan-en-Brie, Brie-Comte-Robert
5. THE Schema_LocalBusiness SHALL formater chaque ville dans `areaServed` comme un objet de type "City" avec la propriété "name"

### Exigence 5 : Schema AggregateRating

**User Story :** En tant que propriétaire cherchant un installateur, je veux voir des étoiles dans les résultats Google pour Greenter, afin d'avoir confiance et de cliquer sur le résultat.

#### Critères d'acceptation

1. THE Schema_AggregateRating SHALL être ajouté au schema LocalBusiness avec les propriétés ratingValue, reviewCount et bestRating
2. THE Schema_AggregateRating SHALL utiliser les données récupérées via l'API Google Reviews pour renseigner la note et le nombre d'avis
3. WHEN les données d'avis ne sont pas disponibles, THE Schema_AggregateRating SHALL utiliser des valeurs par défaut configurables
4. THE Schema_AggregateRating SHALL définir bestRating à 5 et worstRating à 1

### Exigence 6 : Optimisation des meta tags locaux

**User Story :** En tant que propriétaire qui voit Greenter dans les résultats Google pour une requête locale, je veux un titre et une description mentionnant ma ville, afin de savoir que Greenter intervient chez moi.

#### Critères d'acceptation

1. THE Meta_Optimizer SHALL mettre à jour le title de la page PAC avec "Installation Pompe à Chaleur Ozoir-la-Ferrière, Roissy-en-Brie | Devis Gratuit"
2. THE Meta_Optimizer SHALL mettre à jour la meta description de la page PAC pour inclure les villes principales et le numéro de téléphone
3. THE Meta_Optimizer SHALL mettre à jour le H1 de la page PAC avec un contexte local : "Installation Pompe à Chaleur à Ozoir-la-Ferrière et environs"
4. THE Meta_Optimizer SHALL conserver la mention "partout en France" dans le contenu de la page pour ne pas limiter le ciblage national

### Exigence 7 : Composant Service Area Section

**User Story :** En tant que visiteur, je veux voir clairement la liste des villes où Greenter intervient, afin de savoir si mon domicile est couvert.

#### Critères d'acceptation

1. THE Service_Area_Section SHALL afficher un titre "Nous intervenons près de chez vous"
2. THE Service_Area_Section SHALL afficher la liste des villes desservies avec des checkmarks visuels
3. THE Service_Area_Section SHALL être intégrable sur les pages services existantes
4. THE Service_Area_Section SHALL inclure un CTA "Demander un devis" ou "Vérifier mon éligibilité"
5. THE Service_Area_Section SHALL être responsive et s'afficher en grille sur desktop et en liste sur mobile

### Exigence 8 : FAQ locale

**User Story :** En tant que propriétaire d'Ozoir-la-Ferrière, je veux trouver des réponses à mes questions spécifiques sur les PAC dans ma zone, afin de prendre une décision éclairée.

#### Critères d'acceptation

1. THE Local_FAQ SHALL ajouter la question "Combien coûte une pompe à chaleur à Ozoir-la-Ferrière ?" avec une réponse incluant les fourchettes de prix et les aides disponibles
2. THE Local_FAQ SHALL ajouter la question "Quelles aides pour une PAC en Seine-et-Marne ?" avec les détails sur MaPrimeRénov' et les aides locales
3. THE Local_FAQ SHALL ajouter la question "Intervenez-vous à Roissy-en-Brie ?" avec confirmation et liste des villes couvertes
4. THE Local_FAQ SHALL mettre à jour le FAQPageSchema avec les nouvelles questions pour le SEO
5. THE Local_FAQ SHALL intégrer les nouvelles questions dans la section FAQ existante de la page PAC

### Exigence 9 : Structure pour pages locales dédiées

**User Story :** En tant que développeur, je veux une structure de pages locales réutilisable, afin de créer facilement des pages ciblant chaque ville pour chaque service.

#### Critères d'acceptation

1. THE Local_Page SHALL créer la structure de route dynamique `/services/pompe-a-chaleur/[ville]` dans Next.js App Router
2. THE Local_Page SHALL utiliser un template réutilisable avec contenu dynamique basé sur le paramètre ville
3. THE Local_Page SHALL générer des meta tags optimisés par ville (title, description, canonical)
4. THE Local_Page SHALL inclure un schema Service avec areaServed ciblant la ville spécifique
5. THE Local_Page SHALL être ajoutée au sitemap.ts avec les URLs des villes prioritaires

### Exigence 10 : Mise à jour du Footer avec lien avis Google

**User Story :** En tant que visiteur, je veux pouvoir accéder facilement aux avis Google depuis n'importe quelle page, afin de vérifier la réputation de Greenter.

#### Critères d'acceptation

1. THE Footer SHALL ajouter un lien "Nos avis Google" dans la section Contact ou Navigation
2. WHEN l'utilisateur clique sur le lien, THE Footer SHALL ouvrir la fiche Google Maps de Greenter dans un nouvel onglet
3. THE Footer SHALL mettre à jour l'adresse affichée avec Ozoir-la-Ferrière au lieu de Paris

### Exigence 11 : Maillage interne entre pages services et pages locales

**User Story :** En tant que visiteur sur la page pompe à chaleur générale, je veux voir des liens vers les pages locales correspondantes, afin de trouver l'information spécifique à ma ville.

#### Critères d'acceptation

1. WHEN une page de service existante est rendue, THE Internal_Link_System SHALL afficher une section "Nos interventions par ville" avec des liens vers les pages locales correspondantes
2. WHEN une page locale est rendue, THE Internal_Link_System SHALL afficher des liens vers les autres services disponibles dans la même ville
3. WHEN une page locale est rendue, THE Internal_Link_System SHALL afficher des liens vers le même service dans les villes voisines
4. THE Internal_Link_System SHALL ajouter dans le Footer une section "Zones d'intervention" listant les villes de la zone de chalandise avec des liens

### Exigence 12 : Signaux locaux dans le Header

**User Story :** En tant que visiteur du site, je veux voir immédiatement que Greenter intervient dans ma zone géographique, afin de ne pas quitter le site en pensant qu'il ne me concerne pas.

#### Critères d'acceptation

1. THE Header SHALL afficher une mention de la zone d'intervention visible (ex: "Intervention en Seine-et-Marne")
2. THE Header SHALL rendre le numéro de téléphone plus visible avec un bouton click-to-call stylisé
3. THE Header SHALL afficher un badge ou indicateur de proximité sur mobile
