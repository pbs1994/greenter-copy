# Requirements Document

## Introduction

Transformation du contenu après le Hero de la page `/services/pompe-a-chaleur` en un article éditorial de qualité magazine/presse. L'objectif est de remplacer le contenu actuel (sections basiques sur les avantages, types de PAC, fonctionnement, aides) par un vrai contenu informatif, moderne et engageant qui positionne Greenter comme expert du secteur.

### Contexte
- Le Hero et le formulaire de devis ont été optimisés (spec `pac-landing-page-optimization`)
- Le contenu actuel après le Hero est "hyper moche" et trop commercial
- L'utilisateur veut un style éditorial inspiré des grands services de presse (The New Yorker, Wired, National Geographic, Time)
- Après le Hero, on ne vend plus ! Juste des rappels discrets pour contacter (max 2)
- Informations à jour pour 2026 (aides, réglementations, technologies)

### Données techniques clés (sources EDF, février 2025)
- Économies : 50-70% sur la consommation de chauffage annuelle
- Jusqu'à 45% d'économies sur le budget chauffage
- Réduction CO2 : jusqu'à 90% vs chaudière gaz/fioul ancienne
- Rendement : 4x plus de chaleur produite que d'électricité consommée
- COP (Coefficient de Performance) : ratio chaleur produite / électricité consommée. COP de 3 = 3 unités de chaleur pour 1 unité d'électricité

### Situation aides financières 2026 (source : economie.gouv.fr, 05/03/2026)
- MaPrimeRénov' : ROUVERT depuis le 23 février 2026 pour tous les ménages et parcours
- Changements 2026 : isolation des murs et chaudières biomasse ne sont plus financées
- PAC air/eau (dont hybrides) et PAC géothermique : toujours éligibles
- Montant exemple : ménage modeste + PAC air/eau = 4 000€ d'aide (plafond 12 000€ de dépense)
- Éco-PTZ cumulable : jusqu'à 50 000€ pour financer le reste à charge
- Obligation RGE : travaux DOIVENT être réalisés par artisan certifié RGE
- Logement éligible : résidence principale, construit depuis au moins 15 ans
- À partir de 2027 : maisons DPE F ou G n'auront plus accès au parcours par geste

### Objectifs
- Créer un contenu éditorial de qualité qui donne envie de lire
- Informer sur les pompes à chaleur : types, designs, installations, innovations
- Intégrer des mots-clés SEO puissants de manière naturelle
- Citer des sources fiables (EDF, ADEME, France Rénov, articles de presse)
- Design moderne style magazine avec typographie soignée

## Glossary

- **Editorial_Content**: Contenu informatif style presse/magazine après le Hero
- **Article_Section**: Section thématique du contenu éditorial (ex: types de PAC, innovations)
- **Pull_Quote**: Citation mise en avant visuellement dans l'article
- **Sidebar_CTA**: Rappel discret pour contacter, positionné en marge du contenu
- **Source_Citation**: Référence à une source fiable (ADEME, EDF, France Rénov, presse)
- **Infographic_Block**: Bloc visuel présentant des données de manière graphique
- **Reading_Progress**: Indicateur de progression de lecture de l'article
- **Magazine_Layout**: Mise en page éditoriale avec colonnes, images, encadrés
- **COP**: Coefficient de Performance - ratio chaleur produite / électricité consommée
- **R290**: Fluide frigorigène propane, nouvelle génération écologique (GWP de 3)
- **GWP**: Global Warming Potential - potentiel de réchauffement climatique d'un fluide
- **RGE**: Reconnu Garant de l'Environnement - certification obligatoire pour les aides

## Requirements

### Requirement 1: Structure éditoriale magazine

**User Story:** As a visiteur, I want to lire un contenu structuré comme un article de presse de qualité, so that je suis informé de manière agréable et professionnelle.

#### Acceptance Criteria

1. THE Editorial_Content SHALL utiliser une typographie éditoriale avec une police serif pour le corps de texte et une police sans-serif pour les titres
2. THE Editorial_Content SHALL avoir une largeur de lecture optimale (max 720px pour le texte principal)
3. THE Editorial_Content SHALL inclure des Pull_Quote stylisées pour mettre en avant les informations clés
4. THE Editorial_Content SHALL utiliser un espacement généreux entre les paragraphes (style magazine avec white space)
5. THE Editorial_Content SHALL inclure des images ou illustrations de qualité pour illustrer les concepts
6. WHEN l'utilisateur scroll dans l'article, THE Editorial_Content SHALL afficher un Reading_Progress indicator discret
7. THE Editorial_Content SHALL afficher un temps de lecture estimé en début d'article (ex: "8 min de lecture")
8. THE Editorial_Content SHALL utiliser une hiérarchie visuelle claire avec featured content visible immédiatement

### Requirement 2: Contenu informatif sur les types de PAC avec données 2026

**User Story:** As a propriétaire intéressé par les PAC, I want to comprendre les différents types de pompes à chaleur disponibles en 2026 avec leurs prix réels, so that je peux identifier celle qui correspond à mon logement et mon budget.

#### Acceptance Criteria

1. THE Editorial_Content SHALL présenter les 4 types principaux de PAC avec leurs fourchettes de prix 2026 :
   - PAC Air/Air (climatisation réversible) : 2 000€ - 5 000€, économies jusqu'à 40%
   - PAC Air/Eau : chauffage central + eau chaude sanitaire
   - PAC Eau/Eau (géothermique) : exploite chaleur du sol/eaux souterraines
   - PAC hybrides : combinaison PAC + chaudière gaz pour optimisation automatique
2. FOR EACH type de PAC, THE Article_Section SHALL expliquer le principe de fonctionnement, les avantages, les inconvénients et le cas d'usage idéal
3. THE Editorial_Content SHALL inclure un comparatif visuel des types de PAC sous forme d'Infographic_Block
4. THE Editorial_Content SHALL expliquer le COP (Coefficient de Performance) : "COP de 3 = 3 unités de chaleur pour 1 unité d'électricité consommée"
5. THE Editorial_Content SHALL mentionner les données de rendement : "4x plus de chaleur produite que d'électricité consommée"
6. THE Editorial_Content SHALL citer EDF comme Source_Citation pour les données techniques et économies (50-70% sur consommation chauffage)

### Requirement 3: Section innovation fluide R290 (2025-2026)

**User Story:** As a propriétaire soucieux de l'environnement, I want to découvrir les innovations écologiques des PAC modernes, so that je peux choisir une solution respectueuse de l'environnement.

#### Acceptance Criteria

1. THE Editorial_Content SHALL inclure une Article_Section dédiée au fluide R290 (propane) comme innovation majeure 2025-2026
2. THE Article_Section SHALL expliquer les avantages du R290 :
   - GWP (Global Warming Potential) de 3 seulement (vs 1430 pour R410A traditionnel)
   - ODP (Ozone Depletion Potential) de 0
   - Meilleur rendement que les fluides traditionnels
3. THE Editorial_Content SHALL mentionner la réglementation EU 2024/573 imposant un GWP < 150 pour les nouveaux équipements
4. THE Editorial_Content SHALL présenter les PAC hybrides comme solution d'optimisation automatique
5. THE Editorial_Content SHALL aborder les PAC haute température pour les rénovations avec radiateurs existants

### Requirement 4: Section design et intégration architecturale

**User Story:** As a propriétaire soucieux de l'esthétique, I want to découvrir les options de design des PAC modernes, so that je sais que l'installation ne défigurera pas ma maison.

#### Acceptance Criteria

1. THE Editorial_Content SHALL inclure une Article_Section dédiée au design des unités extérieures et intérieures
2. THE Article_Section SHALL présenter les tendances 2026 : unités compactes, finitions personnalisables, intégration paysagère
3. THE Editorial_Content SHALL montrer des exemples visuels d'installations réussies (photos ou illustrations)
4. THE Editorial_Content SHALL aborder les solutions pour réduire le bruit des unités extérieures
5. THE Editorial_Content SHALL mentionner les distances réglementaires par rapport aux voisins

### Requirement 5: Guide des aides financières 2026 (données officielles)

**User Story:** As a propriétaire souhaitant financer ma PAC, I want to connaître les aides disponibles en 2026 avec les montants officiels, so that je peux estimer mon reste à charge réel.

#### Acceptance Criteria

1. THE Editorial_Content SHALL informer que MaPrimeRénov' est ROUVERT depuis le 23 février 2026 (source : economie.gouv.fr)
2. THE Editorial_Content SHALL préciser les changements 2026 : isolation des murs et chaudières biomasse ne sont plus financées
3. THE Editorial_Content SHALL présenter les montants officiels pour les PAC :
   - Ménage très modeste + PAC air/eau : montant selon barème officiel
   - Ménage modeste + PAC air/eau : 4 000€ d'aide (plafond 12 000€ de dépense)
   - PAC géothermique : montants selon barème
4. THE Editorial_Content SHALL mentionner les aides cumulables :
   - Éco-PTZ : jusqu'à 50 000€ pour financer le reste à charge
   - CEE (Certificats d'Économies d'Énergie)
   - TVA réduite 5.5%
   - Aides locales (départements, métropoles)
5. THE Editorial_Content SHALL insister sur l'obligation RGE : "Sans artisan certifié RGE = pas d'aides"
6. THE Editorial_Content SHALL mentionner les conditions d'éligibilité :
   - Résidence principale occupée au moins 8 mois/an
   - Logement construit depuis au moins 15 ans
7. THE Editorial_Content SHALL avertir : "À partir de 2027, les maisons DPE F ou G n'auront plus accès au parcours par geste"
8. THE Editorial_Content SHALL inclure un Infographic_Block récapitulatif des aides et montants
9. THE Editorial_Content SHALL citer economie.gouv.fr, france-renov.gouv.fr et l'Anah comme Source_Citation officielles
10. THE Editorial_Content SHALL recommander le simulateur "Mes Aides Réno" pour estimer ses droits

### Requirement 6: Processus d'installation et certification RGE

**User Story:** As a futur client, I want to comprendre comment se déroule une installation de PAC et l'importance du RGE, so that je sais à quoi m'attendre et comment sécuriser mes aides.

#### Acceptance Criteria

1. THE Editorial_Content SHALL décrire les étapes d'une installation type : étude thermique, dimensionnement, installation, mise en service
2. THE Editorial_Content SHALL indiquer les durées moyennes pour chaque étape
3. THE Editorial_Content SHALL expliquer l'importance du dimensionnement correct (ni sous-dimensionné, ni surdimensionné)
4. THE Editorial_Content SHALL mentionner les travaux annexes possibles (isolation, radiateurs basse température)
5. THE Editorial_Content SHALL expliquer clairement l'obligation RGE et comment vérifier la certification sur france-renov.gouv.fr
6. THE Editorial_Content SHALL aborder l'entretien obligatoire et son coût moyen (150-200€/an)

### Requirement 7: Données environnementales et économies

**User Story:** As a propriétaire sensible à l'écologie, I want to connaître l'impact environnemental réel d'une PAC, so that je peux prendre une décision éclairée.

#### Acceptance Criteria

1. THE Editorial_Content SHALL mentionner la réduction CO2 : "jusqu'à 90% vs chaudière gaz/fioul ancienne" (source EDF)
2. THE Editorial_Content SHALL présenter les économies réelles : "50-70% sur la consommation de chauffage annuelle"
3. THE Editorial_Content SHALL expliquer le principe de récupération d'énergie gratuite dans l'air extérieur
4. THE Editorial_Content SHALL inclure un Infographic_Block comparant l'empreinte carbone PAC vs autres systèmes
5. THE Editorial_Content SHALL citer EDF et ADEME comme Source_Citation pour toutes les données chiffrées

### Requirement 8: Rappels discrets pour contacter (max 2)

**User Story:** As a visiteur intéressé, I want to pouvoir contacter facilement sans être agressé par des CTA commerciaux, so that je me sens respecté dans ma lecture.

#### Acceptance Criteria

1. THE Editorial_Content SHALL inclure EXACTEMENT 2 Sidebar_CTA discrets dans tout l'article (pas plus)
2. THE Sidebar_CTA SHALL être stylisé de manière élégante et non intrusive (pas de couleurs criardes, pas d'orange/rouge)
3. THE Sidebar_CTA SHALL proposer un contact par téléphone ou formulaire de rappel
4. THE Editorial_Content SHALL terminer par un encadré "Besoin d'un conseil ?" sobre et informatif
5. THE Editorial_Content SHALL NE PAS utiliser de pop-ups, bannières intrusives ou CTA agressifs
6. THE Sidebar_CTA SHALL s'intégrer naturellement dans le flux de lecture (style encadré éditorial)

### Requirement 9: Optimisation SEO éditoriale

**User Story:** As a moteur de recherche, I want to comprendre le contenu éditorial de manière structurée, so that je peux le positionner sur les requêtes informatives.

#### Acceptance Criteria

1. THE Editorial_Content SHALL intégrer naturellement les mots-clés prioritaires :
   - "pompe à chaleur"
   - "PAC air eau" / "PAC air air"
   - "installation pompe à chaleur"
   - "prix pompe à chaleur 2026"
   - "aides pompe à chaleur"
   - "COP pompe à chaleur"
   - "économies chauffage"
   - "fluide R290"
   - "certifié RGE"
   - "Seine-et-Marne" (localisation)
2. THE Editorial_Content SHALL utiliser une structure de titres H2/H3 logique et descriptive
3. THE Editorial_Content SHALL inclure des balises alt descriptives pour toutes les images
4. THE Editorial_Content SHALL inclure des liens internes vers d'autres pages pertinentes du site (blog, autres services)
5. THE Editorial_Content SHALL utiliser le Schema_Markup Article pour le contenu éditorial

### Requirement 10: Sources et crédibilité

**User Story:** As a lecteur exigeant, I want to voir des sources fiables citées, so that je peux faire confiance aux informations présentées.

#### Acceptance Criteria

1. THE Editorial_Content SHALL citer au minimum 5 Source_Citation de sources officielles :
   - EDF (données techniques et économies)
   - ADEME (données environnementales)
   - economie.gouv.fr (aides MaPrimeRénov' 2026)
   - France Rénov / Anah (certification RGE, barèmes)
   - Réglementation EU 2024/573 (fluides frigorigènes)
2. THE Editorial_Content SHALL afficher les sources de manière visible (encadré "Sources" en fin d'article)
3. THE Editorial_Content SHALL NE PAS citer de sites concurrents ou de sources commerciales
4. THE Editorial_Content SHALL inclure des données chiffrées vérifiables avec leur source et date
5. WHEN une statistique est mentionnée, THE Editorial_Content SHALL indiquer sa source

### Requirement 11: Responsive et performance

**User Story:** As a visiteur mobile, I want to lire l'article confortablement sur mon smartphone, so that je peux m'informer où que je sois.

#### Acceptance Criteria

1. THE Editorial_Content SHALL adapter sa mise en page pour les écrans mobiles (colonnes empilées, images redimensionnées)
2. THE Editorial_Content SHALL maintenir une taille de police lisible sur mobile (minimum 16px)
3. THE Editorial_Content SHALL charger les images de manière optimisée (lazy loading, formats modernes WebP/AVIF)
4. THE Editorial_Content SHALL avoir un score Lighthouse Performance > 85 sur mobile
5. THE Reading_Progress indicator SHALL être visible et fonctionnel sur mobile
6. THE Infographic_Block SHALL être lisible sur mobile (responsive ou version simplifiée)
