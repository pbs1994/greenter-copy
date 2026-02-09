# Document d'Exigences — SEO Local Greenter

## Introduction

Ce document définit les exigences pour l'optimisation du SEO local du site Greenter (greenter.fr), entreprise de rénovation énergétique basée en Île-de-France. L'objectif est d'augmenter les appels téléphoniques et demandes de devis provenant de la zone de chalandise autour d'Ozoir-la-Ferrière, Roissy-en-Brie, Chevry-Cossigny, Lésigny et communes environnantes.

Le problème identifié : le site apparaît dans les résultats Google pour des requêtes locales (ex. "installation pompe à chaleur ozoir-la-ferrière") mais obtient 0% de CTR — aucun clic malgré les impressions. Les meta titles/descriptions ne contiennent aucun signal local, le schema LocalBusiness cible "France" entière, et aucune page locale dédiée n'existe.

Ce spec se concentre exclusivement sur le SEO local (ciblage par ville, pages locales, CTR, conversion). Le SEO on-site général (liens cassés, schemas produit, images) est couvert par le spec `seo-audit-onsite`.

## Glossaire

- **Local_SEO_System** : Le système d'optimisation du référencement local du site Greenter
- **Local_Page_Generator** : Le composant qui génère les pages d'atterrissage locales (ville × service)
- **Schema_Updater** : Le composant qui met à jour les données structurées JSON-LD pour le ciblage local
- **Meta_Optimizer** : Le composant qui optimise les balises title et meta description avec des signaux locaux
- **CTA_System** : Le système de call-to-action orienté conversion locale (click-to-call, devis, urgence)
- **Sitemap_Generator** : Le composant qui génère le sitemap XML incluant les nouvelles pages locales
- **Internal_Link_System** : Le système de maillage interne entre pages services et pages locales
- **Zone_de_chalandise** : Ozoir-la-Ferrière, Roissy-en-Brie, Chevry-Cossigny, Lésigny et communes limitrophes en Seine-et-Marne (77)
- **Page_locale** : Page d'atterrissage ciblant un service spécifique dans une ville spécifique
- **Service_existant** : Une des pages services actuelles (pompe-a-chaleur, panneaux-solaires, isolation, audit, maintenance)

## Exigences

### Exigence 1 : Création de pages d'atterrissage locales

**User Story :** En tant que propriétaire cherchant un installateur de pompe à chaleur à Ozoir-la-Ferrière, je veux trouver une page dédiée à ce service dans ma ville, afin de savoir que Greenter intervient chez moi et de les contacter facilement.

#### Critères d'acceptation

1. WHEN un utilisateur accède à une URL de type `/services/[service]/[ville]`, THE Local_Page_Generator SHALL afficher une page d'atterrissage avec un contenu unique ciblant ce service dans cette ville
2. THE Local_Page_Generator SHALL générer des pages locales pour chaque combinaison des 5 services (pompe-a-chaleur, panneaux-solaires, isolation, audit, maintenance) et des 5 villes prioritaires (ozoir-la-ferriere, roissy-en-brie, chevry-cossigny, lesigny, pontault-combault)
3. WHEN une page locale est générée, THE Local_Page_Generator SHALL inclure dans le H1 le nom du service et le nom de la ville (ex. "Installation Pompe à Chaleur à Ozoir-la-Ferrière")
4. WHEN une page locale est générée, THE Local_Page_Generator SHALL inclure une section FAQ avec des questions spécifiques à la ville et au service
5. WHEN une page locale est générée, THE Local_Page_Generator SHALL inclure un bloc CTA avec le numéro de téléphone cliquable et un lien vers le formulaire de contact
6. WHEN une page locale est générée, THE Local_Page_Generator SHALL utiliser un template dynamique basé sur les paramètres `[service]` et `[ville]` via les routes dynamiques Next.js

### Exigence 2 : Optimisation des meta titles et descriptions pour le CTR local

**User Story :** En tant que propriétaire qui voit Greenter dans les résultats Google pour "installateur pompe à chaleur ozoir-la-ferrière", je veux un titre et une description qui me donnent confiance et m'incitent à cliquer, afin de choisir Greenter plutôt qu'un concurrent.

#### Critères d'acceptation

1. WHEN une page locale est rendue, THE Meta_Optimizer SHALL générer un meta title contenant le nom du service, le nom de la ville et "Greenter" (ex. "Installation Pompe à Chaleur Ozoir-la-Ferrière | Devis Gratuit | Greenter")
2. WHEN une page locale est rendue, THE Meta_Optimizer SHALL générer une meta description contenant le nom de la ville, la certification RGE, et un appel à l'action (ex. "Devis gratuit sous 48h")
3. WHEN une page de service existante est rendue, THE Meta_Optimizer SHALL mettre à jour le meta title pour inclure la zone géographique "Seine-et-Marne (77)" au lieu de "partout en France"
4. WHEN une page de service existante est rendue, THE Meta_Optimizer SHALL mettre à jour la meta description pour mentionner les villes principales de la zone de chalandise
5. THE Meta_Optimizer SHALL limiter les meta titles à 60 caractères et les meta descriptions à 155 caractères

### Exigence 3 : Mise à jour du schema LocalBusiness

**User Story :** En tant que moteur de recherche, je veux des données structurées LocalBusiness précises avec la zone de service réelle, afin d'afficher Greenter dans les résultats locaux pertinents.

#### Critères d'acceptation

1. THE Schema_Updater SHALL mettre à jour le champ `areaServed` du schema LocalBusiness pour lister les villes de la zone de chalandise au lieu de "Country: France"
2. THE Schema_Updater SHALL formater chaque ville dans `areaServed` comme un objet `City` avec les propriétés `name` et `sameAs` (lien Wikidata)
3. THE Schema_Updater SHALL ajouter un objet `GeoCircle` dans `areaServed` avec le centre sur Ozoir-la-Ferrière (lat: 48.7631, lon: 2.6731) et un rayon de 20 km
4. THE Schema_Updater SHALL mettre à jour l'adresse du schema LocalBusiness avec "2 Av. du Général Leclerc, 77330 Ozoir-la-Ferrière" au lieu de l'adresse parisienne actuelle
5. WHEN une page locale est rendue, THE Schema_Updater SHALL inclure un schema Service avec `areaServed` ciblant la ville spécifique de la page

### Exigence 4 : Éléments de conversion locale

**User Story :** En tant que propriétaire qui visite une page locale Greenter, je veux voir des preuves de proximité et de fiabilité (témoignages locaux, temps de réponse, certifications), afin de me sentir en confiance pour appeler ou demander un devis.

#### Critères d'acceptation

1. WHEN une page locale est rendue, THE CTA_System SHALL afficher un bouton click-to-call visible en permanence sur mobile avec le numéro de téléphone
2. WHEN une page locale est rendue, THE CTA_System SHALL afficher un badge "Intervention sous 48h" ou "Devis gratuit sous 48h"
3. WHEN une page locale est rendue, THE CTA_System SHALL afficher les certifications RGE, QualiPAC et Qualibat avec les logos
4. WHEN une page locale est rendue, THE CTA_System SHALL afficher une section "Pourquoi choisir Greenter à [ville]" avec des arguments de proximité
5. WHEN une page locale est rendue, THE CTA_System SHALL afficher un formulaire de demande de devis rapide intégré dans la page

### Exigence 5 : Maillage interne entre pages services et pages locales

**User Story :** En tant que visiteur sur la page pompe à chaleur générale, je veux voir des liens vers les pages locales correspondantes, afin de trouver l'information spécifique à ma ville.

#### Critères d'acceptation

1. WHEN une page de service existante est rendue, THE Internal_Link_System SHALL afficher une section "Nos interventions par ville" avec des liens vers les pages locales correspondantes
2. WHEN une page locale est rendue, THE Internal_Link_System SHALL afficher des liens vers les autres services disponibles dans la même ville
3. WHEN une page locale est rendue, THE Internal_Link_System SHALL afficher des liens vers le même service dans les villes voisines
4. THE Internal_Link_System SHALL ajouter dans le Footer une section "Zones d'intervention" listant les villes de la zone de chalandise avec des liens

### Exigence 6 : Mise à jour du sitemap pour les pages locales

**User Story :** En tant que moteur de recherche, je veux découvrir toutes les nouvelles pages locales via le sitemap, afin de les indexer rapidement.

#### Critères d'acceptation

1. WHEN le sitemap est généré, THE Sitemap_Generator SHALL inclure toutes les pages locales (ville × service) avec une priorité de 0.8
2. WHEN le sitemap est généré, THE Sitemap_Generator SHALL définir la fréquence de modification des pages locales à "monthly"
3. THE Sitemap_Generator SHALL générer les URLs des pages locales au format `/services/[service]/[ville]`

### Exigence 7 : Signaux locaux dans le Header et Footer

**User Story :** En tant que visiteur du site, je veux voir immédiatement que Greenter intervient dans ma zone géographique, afin de ne pas quitter le site en pensant qu'il ne me concerne pas.

#### Critères d'acceptation

1. THE Local_SEO_System SHALL ajouter dans le Header une mention de la zone d'intervention (ex. "Intervention en Seine-et-Marne et Île-de-France")
2. THE Local_SEO_System SHALL rendre le numéro de téléphone plus visible dans le Header avec un bouton click-to-call stylisé
3. THE Local_SEO_System SHALL mettre à jour la description du Footer pour remplacer "partout en France" par la zone d'intervention réelle
4. THE Local_SEO_System SHALL ajouter dans le Footer l'adresse ou la mention de la zone d'intervention en Seine-et-Marne

### Exigence 8 : Schema AggregateRating avec avis Google Business

**User Story :** En tant que propriétaire qui voit Greenter dans les résultats Google, je veux voir des étoiles et une note dans le résultat de recherche, afin d'avoir confiance et de cliquer.

#### Critères d'acceptation

1. THE Schema_Updater SHALL ajouter un objet `AggregateRating` dans le schema LocalBusiness avec la note et le nombre d'avis provenant de la fiche Google Business de Greenter
2. THE Schema_Updater SHALL inclure les propriétés `ratingValue`, `reviewCount` et `bestRating` dans le schema AggregateRating
3. WHEN la note ou le nombre d'avis Google change, THE Schema_Updater SHALL permettre la mise à jour manuelle des valeurs dans un fichier de configuration centralisé
4. WHEN une page locale est rendue, THE Schema_Updater SHALL inclure le schema AggregateRating dans les données structurées de la page

### Exigence 9 : Données de configuration locales centralisées

**User Story :** En tant que développeur, je veux une source unique de données pour les villes, services et contenus locaux, afin de maintenir facilement les pages locales et d'en ajouter de nouvelles.

#### Critères d'acceptation

1. THE Local_SEO_System SHALL stocker les données des villes (nom, slug, code postal, coordonnées GPS, population, département) dans un fichier de configuration centralisé
2. THE Local_SEO_System SHALL stocker les données des services (nom, slug, description courte, mots-clés) dans un fichier de configuration centralisé
3. THE Local_SEO_System SHALL stocker les templates de contenu local (FAQ, arguments de proximité, descriptions) dans un fichier de configuration centralisé
4. WHEN une nouvelle ville est ajoutée au fichier de configuration, THE Local_Page_Generator SHALL générer automatiquement les pages locales correspondantes sans modification de code
