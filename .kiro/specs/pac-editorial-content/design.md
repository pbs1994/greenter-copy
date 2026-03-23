# Design Document: PAC Editorial Content

## Overview

Ce document décrit l'architecture technique pour la transformation du contenu après le Hero de la page `/services/pompe-a-chaleur` en un article éditorial de qualité magazine. L'objectif est de remplacer les sections actuelles (avantages, types de PAC, fonctionnement, aides) par un contenu informatif moderne, engageant et crédible.

### Objectifs principaux
- Créer une expérience de lecture style presse/magazine (The New Yorker, Wired)
- Informer sur les PAC avec données 2026 vérifiées (EDF, ADEME, economie.gouv.fr)
- Intégrer les mots-clés SEO de manière naturelle et éditoriale
- Limiter les CTA à 2 rappels discrets maximum (pas de vente agressive)
- Garantir une typographie éditoriale soignée (serif corps, sans-serif titres)

### Contexte technique
- Le Hero et formulaire existants sont conservés (spec `pac-landing-page-optimization`)
- On remplace tout le contenu APRÈS le Hero jusqu'au footer
- Composant FAQSection existant réutilisable pour les accordéons
- Stack : Next.js, React, Tailwind CSS

### Recherches intégrées
- MaPrimeRénov' rouvert depuis le 23/02/2026 (source: economie.gouv.fr)
- Fluide R290 : GWP de 3 vs 1430 pour R410A (réglementation EU 2024/573)
- Économies PAC : 50-70% sur consommation chauffage (source: EDF)
- COP moyen : 3-5 (4 kWh chaleur pour 1 kWh électricité)


## Architecture

### Structure de page éditoriale

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HERO EXISTANT (conservé - spec pac-landing-page-optimization)          │
│  - Formulaire de devis                                                  │
│  - Trust signals (Google rating, garanties)                             │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  ARTICLE HEADER                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ReadingProgress (barre de progression fixe en haut)             │   │
│  │ Temps de lecture estimé : "8 min de lecture"                    │   │
│  │ Date de mise à jour : "Mis à jour en mars 2026"                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 1: Introduction éditoriale                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Chapô accrocheur (style magazine)                               │   │
│  │ PullQuote: "Diviser sa facture par 3, c'est possible"           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 2: Les types de PAC en 2026                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ArticleSection avec Infographic (comparatif 4 types)            │   │
│  │ - PAC Air/Air, Air/Eau, Eau/Eau, Hybrides                       │   │
│  │ PullQuote: données COP                                          │   │
│  │ Source: EDF                                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SIDEBAR CTA #1 (discret, style encadré éditorial)                      │
│  "Besoin d'un conseil personnalisé ?"                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 3: L'innovation R290                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ArticleSection sur le fluide propane nouvelle génération        │   │
│  │ Infographic: GWP comparatif (R290 vs R410A)                     │   │
│  │ Source: Réglementation EU 2024/573                              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 4: Design et intégration                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ArticleSection sur l'esthétique des PAC modernes                │   │
│  │ Images d'installations réussies                                  │   │
│  │ Conseils bruit et distances réglementaires                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 5: Guide des aides 2026                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ArticleSection avec Infographic (tableau aides)                 │   │
│  │ MaPrimeRénov' rouvert 23/02/2026                                │   │
│  │ Éco-PTZ, CEE, TVA 5.5%                                          │   │
│  │ PullQuote: "Sans RGE, pas d'aides"                              │   │
│  │ Source: economie.gouv.fr, france-renov.gouv.fr                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 6: Processus d'installation                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ArticleSection avec timeline visuelle                           │   │
│  │ Étapes: Étude → Dimensionnement → Installation → Mise en service│   │
│  │ Importance du dimensionnement correct                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SIDEBAR CTA #2 (discret, dernier rappel)                               │
│  "Prêt à passer à l'action ?"                                           │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 7: Impact environnemental                                      │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ArticleSection avec Infographic (empreinte carbone)             │   │
│  │ Réduction CO2: jusqu'à 90% vs chaudière gaz/fioul               │   │
│  │ Source: EDF, ADEME                                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTION 8: FAQ (accordéons - réutilise FAQSection existant)            │
├─────────────────────────────────────────────────────────────────────────┤
│  SOURCES SECTION                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ SourcesCitation: liste des 5+ sources officielles               │   │
│  │ EDF, ADEME, economie.gouv.fr, france-renov.gouv.fr, EU 2024/573 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  ENCADRÉ FINAL "Besoin d'un conseil ?"                                  │
│  (sobre, informatif, pas de CTA agressif)                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### Principes de design éditorial 2026

Basé sur les tendances design éditorial web 2026 :

1. **"Less Website, More Publication"** : chaque section se lit comme un spread de magazine
2. **Typographie = cœur du design** : serif bold pour titres, sans-serif léger pour corps
3. **Storytelling > Flash** : flow narratif, pas d'animations distrayantes
4. **White space généreux** : espacement qui laisse respirer le contenu
5. **Scroll-based storytelling** : chaque section se déroule comme une histoire
6. **Soft gradients atmosphériques** : subtils, pas néon
7. **Grain/texture pour authenticité** : anti-AI aesthetic
8. **Motion fonctionnelle** : scroll-triggered, pas distrayante

### Inspirations visuelles
- The New Yorker : minimaliste, focus contenu
- Kinfolk, The Gentlewoman : typographie élégante, white space
- Wired : colonnes variées, sans-serif lisible


## Components and Interfaces

### Hiérarchie des composants

```
PACEditorialContent (composant principal)
├── ReadingProgressBar
├── ArticleHeader
│   ├── ReadingTime
│   └── LastUpdated
├── ArticleIntro
│   └── PullQuote
├── ArticleSection (réutilisable x7)
│   ├── SectionTitle
│   ├── SectionContent (prose éditoriale)
│   ├── PullQuote (optionnel)
│   ├── InfographicBlock (optionnel)
│   └── SourceCitation (optionnel)
├── SidebarCTA (x2 max)
├── FAQSection (existant, réutilisé)
├── SourcesSection
└── FinalContactBox
```

### Composants à créer

#### 1. ReadingProgressBar
```typescript
interface ReadingProgressBarProps {
  // Pas de props - utilise scroll position
}

// Barre de progression fixe en haut de page
// Apparaît après le Hero (scroll > hero height)
// Largeur = % de scroll dans l'article
// Style: hauteur 3px, couleur emerald-500, z-index élevé
```

#### 2. ArticleHeader
```typescript
interface ArticleHeaderProps {
  readingTime: number; // en minutes
  lastUpdated: string; // "mars 2026"
}

// Affiche temps de lecture et date de mise à jour
// Style: texte slate-500, police sans-serif, uppercase tracking-wide
```

#### 3. PullQuote
```typescript
interface PullQuoteProps {
  quote: string;
  source?: string; // optionnel, ex: "Source: EDF"
  variant?: 'default' | 'highlight' | 'stat';
}

// Citation mise en avant visuellement
// Style: bordure gauche emerald-500, font-serif italic, taille xl
// Variant 'stat': pour les chiffres clés (ex: "70% d'économies")
// Variant 'highlight': fond emerald-50 avec bordure
```

#### 4. ArticleSection
```typescript
interface ArticleSectionProps {
  id: string; // pour ancrage et SEO
  title: string;
  level?: 'h2' | 'h3'; // niveau de titre
  children: React.ReactNode;
  className?: string;
}

// Section thématique de l'article
// Style: max-width 720px centré, espacement généreux (py-16)
// Titre: font-serif bold, taille 2xl-3xl
// Corps: font-sans, line-height relaxed, taille lg
```

#### 5. InfographicBlock
```typescript
interface InfographicBlockProps {
  type: 'comparison' | 'timeline' | 'stats' | 'table';
  data: InfographicData;
  caption?: string;
  source?: string;
}

type InfographicData = 
  | ComparisonData   // Pour comparatif types PAC
  | TimelineData     // Pour processus installation
  | StatsData        // Pour données chiffrées
  | TableData;       // Pour tableau aides

// Bloc visuel pour données
// Style: fond slate-50, rounded-2xl, padding généreux
// Responsive: version simplifiée sur mobile
```

#### 6. SidebarCTA
```typescript
interface SidebarCTAProps {
  title: string;
  description?: string;
  phone: string;
  variant?: 'subtle' | 'editorial';
}

// Rappel discret pour contacter
// Style 'subtle': bordure slate-200, fond blanc, texte slate-700
// Style 'editorial': fond emerald-50/30, bordure emerald-100
// PAS de couleurs criardes (orange/rouge)
// Intégration naturelle dans le flux de lecture
```

#### 7. SourceCitation
```typescript
interface SourceCitationProps {
  source: string; // ex: "EDF", "ADEME"
  url?: string;
  date?: string; // ex: "février 2025"
}

// Référence à une source fiable
// Style: texte xs, slate-400, italic
// Lien externe avec icône si URL fournie
```

#### 8. SourcesSection
```typescript
interface SourcesSectionProps {
  sources: Array<{
    name: string;
    url: string;
    description: string;
  }>;
}

// Encadré "Sources" en fin d'article
// Style: fond slate-50, liste numérotée, liens cliquables
```

#### 9. FinalContactBox
```typescript
interface FinalContactBoxProps {
  title?: string; // default: "Besoin d'un conseil ?"
  phone: string;
}

// Encadré final sobre et informatif
// Style: fond emerald-50/50, bordure emerald-100
// Texte informatif, pas de CTA agressif
// Téléphone cliquable mais discret
```

### Styles typographiques

```css
/* Variables CSS pour typographie éditoriale */
:root {
  --font-editorial-serif: 'Merriweather', 'Georgia', serif;
  --font-editorial-sans: 'Inter', system-ui, sans-serif;
  
  /* Tailles */
  --text-article-body: 1.125rem; /* 18px */
  --text-article-lead: 1.25rem;  /* 20px */
  --text-pull-quote: 1.5rem;     /* 24px */
  
  /* Espacement */
  --spacing-paragraph: 1.75rem;
  --spacing-section: 4rem;
  
  /* Largeur de lecture optimale */
  --max-width-prose: 720px;
}
```

### Tailwind config additions

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'editorial-serif': ['Merriweather', 'Georgia', 'serif'],
        'editorial-sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        editorial: {
          css: {
            maxWidth: '720px',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            p: {
              marginBottom: '1.75rem',
            },
            h2: {
              fontFamily: 'Merriweather, Georgia, serif',
              fontWeight: '700',
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
          },
        },
      },
    },
  },
}
```


## Data Models

### Types TypeScript

```typescript
// Types pour le contenu éditorial PAC

interface PACType {
  id: 'air-air' | 'air-eau' | 'eau-eau' | 'hybride';
  name: string;
  description: string;
  priceRange: {
    min: number;
    max: number;
    unit?: string; // ex: "par unité"
  };
  savings: string; // ex: "jusqu'à 40%"
  advantages: string[];
  disadvantages: string[];
  idealFor: string;
  cop: {
    min: number;
    max: number;
  };
}

interface AideFinanciere {
  id: string;
  name: string;
  description: string;
  amounts: {
    tresModeste?: number;
    modeste?: number;
    intermediaire?: number;
    aise?: number;
  };
  plafond?: number;
  conditions: string[];
  source: SourceReference;
  cumulable: boolean;
}

interface SourceReference {
  name: string;
  url: string;
  date: string; // ex: "mars 2026"
  type: 'official' | 'study' | 'regulation';
}

interface InstallationStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  icon?: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category?: 'technique' | 'prix' | 'aides' | 'installation';
}

interface EditorialContent {
  readingTime: number;
  lastUpdated: string;
  sections: ArticleSectionData[];
  sources: SourceReference[];
  faqs: FAQItem[];
}

interface ArticleSectionData {
  id: string;
  title: string;
  content: string; // HTML ou MDX
  pullQuote?: {
    quote: string;
    source?: string;
  };
  infographic?: InfographicData;
  sources?: SourceReference[];
}
```

### Données statiques (constantes)

```typescript
// lib/pac-editorial-data.ts

export const PAC_TYPES: PACType[] = [
  {
    id: 'air-air',
    name: 'PAC Air/Air',
    description: 'Climatisation réversible',
    priceRange: { min: 2000, max: 5000, unit: 'par unité' },
    savings: "jusqu'à 40%",
    advantages: ['Climatisation été incluse', 'Installation rapide', 'Coût abordable'],
    disadvantages: ['Ne produit pas d\'eau chaude', 'Moins efficace par grand froid'],
    idealFor: 'Appartements, maisons sans chauffage central',
    cop: { min: 3, max: 4 },
  },
  {
    id: 'air-eau',
    name: 'PAC Air/Eau',
    description: 'Chauffage central + eau chaude',
    priceRange: { min: 5000, max: 15000 },
    savings: "50-70%",
    advantages: ['Remplace chaudière', 'Eau chaude sanitaire', 'Compatible radiateurs'],
    disadvantages: ['Coût initial plus élevé', 'Travaux plus importants'],
    idealFor: 'Maisons avec chauffage central existant',
    cop: { min: 3, max: 5 },
  },
  {
    id: 'eau-eau',
    name: 'PAC Géothermique',
    description: 'Exploite chaleur du sol',
    priceRange: { min: 15000, max: 25000 },
    savings: "60-75%",
    advantages: ['Rendement constant', 'Très efficace', 'Durée de vie longue'],
    disadvantages: ['Coût élevé', 'Travaux de forage', 'Terrain nécessaire'],
    idealFor: 'Constructions neuves, grands terrains',
    cop: { min: 4, max: 5.5 },
  },
  {
    id: 'hybride',
    name: 'PAC Hybride',
    description: 'PAC + chaudière gaz',
    priceRange: { min: 6000, max: 12000 },
    savings: "40-60%",
    advantages: ['Optimisation automatique', 'Sécurité par grand froid', 'Transition douce'],
    disadvantages: ['Dépendance gaz partielle', 'Entretien double système'],
    idealFor: 'Rénovation progressive, climats rigoureux',
    cop: { min: 3, max: 4.5 },
  },
];

export const AIDES_2026: AideFinanciere[] = [
  {
    id: 'maprimerenov',
    name: "MaPrimeRénov'",
    description: 'Aide principale de l\'État pour la rénovation énergétique',
    amounts: {
      tresModeste: 5000,
      modeste: 4000,
      intermediaire: 3000,
    },
    plafond: 12000,
    conditions: [
      'Résidence principale occupée 8 mois/an minimum',
      'Logement construit depuis au moins 15 ans',
      'Travaux réalisés par artisan RGE',
    ],
    source: {
      name: 'economie.gouv.fr',
      url: 'https://www.economie.gouv.fr/particuliers/prime-renovation-energetique',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
  {
    id: 'ecoptz',
    name: 'Éco-PTZ',
    description: 'Prêt à taux zéro pour financer le reste à charge',
    amounts: {},
    plafond: 50000,
    conditions: [
      'Logement de plus de 2 ans',
      'Travaux réalisés par artisan RGE',
    ],
    source: {
      name: 'service-public.fr',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F19905',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
  {
    id: 'cee',
    name: 'CEE (Certificats d\'Économies d\'Énergie)',
    description: 'Prime versée par les fournisseurs d\'énergie',
    amounts: {
      tresModeste: 4000,
      modeste: 2500,
      intermediaire: 1500,
    },
    conditions: [
      'Logement de plus de 2 ans',
      'Travaux réalisés par artisan RGE',
    ],
    source: {
      name: 'ecologie.gouv.fr',
      url: 'https://www.ecologie.gouv.fr/dispositif-des-certificats-deconomies-denergie',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
  {
    id: 'tva-reduite',
    name: 'TVA réduite 5,5%',
    description: 'Taux réduit sur l\'installation',
    amounts: {},
    conditions: [
      'Logement de plus de 2 ans',
      'Résidence principale ou secondaire',
    ],
    source: {
      name: 'service-public.fr',
      url: 'https://www.service-public.fr/particuliers/vosdroits/F10871',
      date: 'mars 2026',
      type: 'official',
    },
    cumulable: true,
  },
];

export const INSTALLATION_STEPS: InstallationStep[] = [
  {
    step: 1,
    title: 'Visite technique gratuite',
    duration: '1h environ',
    description: 'Évaluation du logement : isolation, surface, système actuel, emplacement unité extérieure.',
  },
  {
    step: 2,
    title: 'Étude et dimensionnement',
    duration: '48h',
    description: 'Calcul thermique précis pour dimensionner correctement la PAC (ni sous, ni surdimensionnée).',
  },
  {
    step: 3,
    title: 'Devis détaillé',
    duration: 'Sous 48h',
    description: 'Matériel, installation, aides déduites, reste à charge. Tout est transparent.',
  },
  {
    step: 4,
    title: 'Installation',
    duration: '1 à 2 jours',
    description: 'Pose unité extérieure, raccordement, mise en service et réglages.',
  },
  {
    step: 5,
    title: 'Accompagnement aides',
    duration: 'On s\'en occupe',
    description: 'Constitution des dossiers MaPrimeRénov\' et CEE. Vous signez, on gère.',
  },
];

export const OFFICIAL_SOURCES: SourceReference[] = [
  {
    name: 'EDF',
    url: 'https://www.edf.fr/groupe-edf/espaces-dedies/l-energie-de-a-a-z/tout-sur-l-energie/le-developpement-durable/la-pompe-a-chaleur',
    date: 'février 2025',
    type: 'study',
  },
  {
    name: 'ADEME',
    url: 'https://www.ademe.fr/particuliers-eco-citoyens/habitation/construire/pompe-chaleur/',
    date: 'mars 2026',
    type: 'official',
  },
  {
    name: 'economie.gouv.fr',
    url: 'https://www.economie.gouv.fr/particuliers/prime-renovation-energetique',
    date: 'mars 2026',
    type: 'official',
  },
  {
    name: 'France Rénov\'',
    url: 'https://france-renov.gouv.fr/',
    date: 'mars 2026',
    type: 'official',
  },
  {
    name: 'Règlement EU 2024/573',
    url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R0573',
    date: '2024',
    type: 'regulation',
  },
];

// Données R290
export const R290_DATA = {
  gwp: 3,
  gwpR410A: 1430,
  odp: 0,
  regulation: 'EU 2024/573',
  maxGwpNewEquipment: 150,
  advantages: [
    'GWP 477x plus faible que R410A',
    'Meilleur rendement thermodynamique',
    'Fluide naturel (propane)',
    'Conforme réglementation EU 2024',
  ],
};

// Données environnementales
export const ENVIRONMENTAL_DATA = {
  co2Reduction: '90%', // vs chaudière gaz/fioul
  savingsRange: '50-70%', // sur consommation chauffage
  copRange: { min: 3, max: 5 },
  freeEnergyRatio: 0.75, // 3/4 de l'énergie est gratuite (air)
  source: 'EDF',
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Editorial Styling Compliance

*For any* rendered Editorial_Content, the component SHALL apply correct typography classes: serif font family for body text paragraphs and sans-serif font family for all headings (H2, H3), with paragraph spacing of at least 1.5rem between consecutive paragraphs.

**Validates: Requirements 1.1, 1.4, 1.8**

### Property 2: Prose Width Constraint

*For any* ArticleSection component, the prose container SHALL have a maximum width of 720px (or equivalent Tailwind class `max-w-prose` or custom `max-w-[720px]`).

**Validates: Requirements 1.2**

### Property 3: Reading Time Calculation

*For any* Editorial_Content with N words, the displayed reading time SHALL equal ceil(N / 200) minutes, where 200 is the average words per minute reading speed.

**Validates: Requirements 1.7**

### Property 4: Reading Progress Accuracy

*For any* scroll position P within the article content (from 0 to 100%), the ReadingProgressBar width SHALL equal P% of its container width.

**Validates: Requirements 1.6**

### Property 5: PAC Type Data Completeness

*For any* PAC type displayed in the Editorial_Content, the data object SHALL contain all required fields: id, name, description, priceRange (with min and max), savings percentage, advantages array (non-empty), disadvantages array (non-empty), idealFor string, and cop range (with min and max).

**Validates: Requirements 2.1, 2.2**

### Property 6: R290 Data Accuracy

*For any* R290 section content, the displayed GWP value SHALL equal 3, the ODP value SHALL equal 0, and the R410A comparison GWP SHALL equal 1430.

**Validates: Requirements 3.2**

### Property 7: Aids Data Completeness

*For any* AideFinanciere displayed in the Editorial_Content, the data object SHALL contain: name, description, at least one amount or plafond value, conditions array (non-empty), and a source reference with name, url, and date.

**Validates: Requirements 5.3, 5.4, 5.6**

### Property 8: Installation Steps Completeness

*For any* installation step displayed, the data SHALL contain: step number (1-5), title, duration string, and description. The steps SHALL be rendered in ascending order by step number.

**Validates: Requirements 6.1, 6.2**

### Property 9: CTA Count Constraint

*For any* rendered Editorial_Content, the total count of SidebarCTA components SHALL equal exactly 2 (not more, not less).

**Validates: Requirements 8.1**

### Property 10: CTA Non-Intrusive Styling

*For any* SidebarCTA component, the styling SHALL NOT include aggressive colors (orange-500, orange-600, red-500, red-600 or equivalent hex values #f97316, #ea580c, #ef4444, #dc2626) in background or border properties.

**Validates: Requirements 8.2, 8.5**

### Property 11: CTA Contact Options

*For any* SidebarCTA component, the rendered output SHALL contain either a telephone link (href starting with "tel:") OR a callback form input element.

**Validates: Requirements 8.3**

### Property 12: Heading Hierarchy Compliance

*For any* Editorial_Content, all H3 elements SHALL appear after at least one H2 element, and no H4 elements SHALL appear before an H3 element (proper nesting).

**Validates: Requirements 9.2**

### Property 13: Image Alt Text Compliance

*For any* image element within Editorial_Content, the alt attribute SHALL be present and contain at least 5 characters of descriptive text.

**Validates: Requirements 9.3**

### Property 14: SEO Keywords Presence

*For any* rendered Editorial_Content text, the content SHALL contain all priority keywords: "pompe à chaleur", "PAC", "installation", "aides", "RGE", and "Seine-et-Marne".

**Validates: Requirements 9.1**

### Property 15: Source Citation Minimum Count

*For any* SourcesSection, the sources array SHALL contain at least 5 items, each with type 'official' or 'regulation'.

**Validates: Requirements 10.1**

### Property 16: Source Citation No Competitors

*For any* source URL in SourcesSection, the URL domain SHALL NOT match known competitor domains (engie.fr, totalenergies.fr, effy.fr, quelleenergie.fr, etc.).

**Validates: Requirements 10.3**

### Property 17: Statistics Source Attribution

*For any* statistic displayed (percentage, currency amount, or numeric comparison), there SHALL be an associated SourceCitation component within the same section or a reference to the sources section.

**Validates: Requirements 10.4, 10.5**

### Property 18: Responsive Image Optimization

*For any* image in Editorial_Content, the element SHALL use Next.js Image component with loading="lazy" attribute (or priority for above-fold images) and support WebP/AVIF formats.

**Validates: Requirements 11.3**

### Property 19: Mobile Font Size Minimum

*For any* text element in Editorial_Content on mobile viewport (< 768px), the computed font-size SHALL be at least 16px (1rem).

**Validates: Requirements 11.2**

### Property 20: Infographic Responsive Layout

*For any* InfographicBlock component, the layout SHALL adapt to mobile viewports using responsive classes (flex-col on mobile, flex-row on desktop) or provide a simplified mobile version.

**Validates: Requirements 11.6**


## Error Handling

### Content Loading Errors

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Missing PAC type data | Display fallback message "Données en cours de mise à jour" with contact CTA |
| Missing aids data | Show generic message "Consultez france-renov.gouv.fr pour les montants actuels" |
| Image load failure | Display placeholder with descriptive alt text, log error |
| Source URL invalid | Render source name without link, log warning |

### User Interaction Errors

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Callback form submission failure | Show inline error message, retry button, fallback to phone number |
| Scroll position calculation error | Gracefully hide ReadingProgressBar, no user-facing error |
| Invalid phone number format | Client-side validation with helpful message |

### Data Validation

```typescript
// Validation functions for editorial data

function validatePACType(pac: PACType): ValidationResult {
  const errors: string[] = [];
  
  if (!pac.id || !['air-air', 'air-eau', 'eau-eau', 'hybride'].includes(pac.id)) {
    errors.push('Invalid PAC type ID');
  }
  if (!pac.name || pac.name.length < 3) {
    errors.push('PAC name required');
  }
  if (!pac.priceRange || pac.priceRange.min >= pac.priceRange.max) {
    errors.push('Invalid price range');
  }
  if (!pac.advantages || pac.advantages.length === 0) {
    errors.push('At least one advantage required');
  }
  if (!pac.cop || pac.cop.min < 1 || pac.cop.max > 7) {
    errors.push('COP values out of realistic range');
  }
  
  return { valid: errors.length === 0, errors };
}

function validateAide(aide: AideFinanciere): ValidationResult {
  const errors: string[] = [];
  
  if (!aide.name) errors.push('Aide name required');
  if (!aide.source || !aide.source.url) errors.push('Source URL required');
  if (aide.conditions.length === 0) errors.push('At least one condition required');
  
  // Validate source is official
  const officialDomains = ['gouv.fr', 'ademe.fr', 'europa.eu'];
  const isOfficial = officialDomains.some(d => aide.source.url.includes(d));
  if (!isOfficial) errors.push('Source must be official');
  
  return { valid: errors.length === 0, errors };
}

function validateSources(sources: SourceReference[]): ValidationResult {
  const errors: string[] = [];
  
  if (sources.length < 5) {
    errors.push('Minimum 5 sources required');
  }
  
  const competitorDomains = ['engie.fr', 'totalenergies.fr', 'effy.fr', 'quelleenergie.fr'];
  sources.forEach(s => {
    if (competitorDomains.some(d => s.url.includes(d))) {
      errors.push(`Competitor source not allowed: ${s.name}`);
    }
  });
  
  return { valid: errors.length === 0, errors };
}
```

### Graceful Degradation

- Si JavaScript désactivé : contenu statique lisible, pas de ReadingProgressBar
- Si images non chargées : alt text descriptif visible
- Si fonts custom non chargées : fallback sur Georgia (serif) et system-ui (sans)
- Si scroll events non supportés : masquer ReadingProgressBar


## Testing Strategy

### Dual Testing Approach

Cette feature nécessite à la fois des tests unitaires (exemples spécifiques) et des tests property-based (propriétés universelles).

### Unit Tests (Jest + React Testing Library)

Tests d'exemples spécifiques et edge cases :

```typescript
// __tests__/components/editorial/PullQuote.test.tsx
describe('PullQuote', () => {
  it('renders quote text with serif font', () => {
    render(<PullQuote quote="Test quote" />);
    expect(screen.getByText('Test quote')).toHaveClass('font-editorial-serif');
  });

  it('renders source when provided', () => {
    render(<PullQuote quote="Test" source="EDF" />);
    expect(screen.getByText('Source: EDF')).toBeInTheDocument();
  });

  it('applies highlight variant styling', () => {
    render(<PullQuote quote="Test" variant="highlight" />);
    expect(screen.getByRole('blockquote')).toHaveClass('bg-emerald-50');
  });
});

// __tests__/components/editorial/SidebarCTA.test.tsx
describe('SidebarCTA', () => {
  it('renders phone link', () => {
    render(<SidebarCTA title="Contact" phone="0609455056" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'tel:+33609455056');
  });

  it('does not use aggressive colors', () => {
    const { container } = render(<SidebarCTA title="Test" phone="0609455056" />);
    const styles = window.getComputedStyle(container.firstChild as Element);
    expect(styles.backgroundColor).not.toMatch(/orange|red/i);
  });
});

// __tests__/components/editorial/ReadingProgressBar.test.tsx
describe('ReadingProgressBar', () => {
  it('renders with 0% width initially', () => {
    render(<ReadingProgressBar />);
    expect(screen.getByRole('progressbar')).toHaveStyle({ width: '0%' });
  });

  it('updates width on scroll', () => {
    render(<ReadingProgressBar />);
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    // Assert width updated based on scroll position
  });
});
```

### Property-Based Tests (fast-check)

Tests de propriétés universelles avec génération aléatoire :

```typescript
// __tests__/properties/pac-editorial-content.property.test.ts
import fc from 'fast-check';

describe('PAC Editorial Content Properties', () => {
  // Feature: pac-editorial-content, Property 3: Reading Time Calculation
  it('reading time equals ceil(wordCount / 200)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (wordCount) => {
          const expectedTime = Math.ceil(wordCount / 200);
          const calculatedTime = calculateReadingTime(wordCount);
          return calculatedTime === expectedTime;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: pac-editorial-content, Property 4: Reading Progress Accuracy
  it('progress bar width equals scroll percentage', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        (scrollPercent) => {
          const progressWidth = calculateProgressWidth(scrollPercent);
          return progressWidth === scrollPercent;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: pac-editorial-content, Property 5: PAC Type Data Completeness
  it('all PAC types have required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PAC_TYPES),
        (pacType) => {
          return (
            pacType.id !== undefined &&
            pacType.name.length >= 3 &&
            pacType.priceRange.min < pacType.priceRange.max &&
            pacType.advantages.length > 0 &&
            pacType.disadvantages.length > 0 &&
            pacType.idealFor.length > 0 &&
            pacType.cop.min >= 1 &&
            pacType.cop.max <= 7
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: pac-editorial-content, Property 6: R290 Data Accuracy
  it('R290 data values are accurate', () => {
    expect(R290_DATA.gwp).toBe(3);
    expect(R290_DATA.gwpR410A).toBe(1430);
    expect(R290_DATA.odp).toBe(0);
  });

  // Feature: pac-editorial-content, Property 7: Aids Data Completeness
  it('all aids have required fields and official sources', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...AIDES_2026),
        (aide) => {
          const hasRequiredFields = 
            aide.name.length > 0 &&
            aide.description.length > 0 &&
            aide.conditions.length > 0 &&
            aide.source.url.length > 0;
          
          const isOfficialSource = 
            aide.source.url.includes('gouv.fr') ||
            aide.source.url.includes('ademe.fr') ||
            aide.source.url.includes('europa.eu');
          
          return hasRequiredFields && isOfficialSource;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: pac-editorial-content, Property 8: Installation Steps Completeness
  it('installation steps are complete and ordered', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...INSTALLATION_STEPS),
        (step) => {
          return (
            step.step >= 1 &&
            step.step <= 5 &&
            step.title.length > 0 &&
            step.duration.length > 0 &&
            step.description.length > 0
          );
        }
      ),
      { numRuns: 100 }
    );

    // Verify ordering
    const stepNumbers = INSTALLATION_STEPS.map(s => s.step);
    expect(stepNumbers).toEqual([1, 2, 3, 4, 5]);
  });

  // Feature: pac-editorial-content, Property 9: CTA Count Constraint
  it('exactly 2 SidebarCTA components are rendered', () => {
    const { container } = render(<PACEditorialContent />);
    const ctaElements = container.querySelectorAll('[data-testid="sidebar-cta"]');
    expect(ctaElements.length).toBe(2);
  });

  // Feature: pac-editorial-content, Property 15: Source Citation Minimum Count
  it('at least 5 official sources are cited', () => {
    expect(OFFICIAL_SOURCES.length).toBeGreaterThanOrEqual(5);
    
    fc.assert(
      fc.property(
        fc.constantFrom(...OFFICIAL_SOURCES),
        (source) => {
          return source.type === 'official' || source.type === 'regulation';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: pac-editorial-content, Property 16: Source Citation No Competitors
  it('no competitor sources are cited', () => {
    const competitorDomains = ['engie.fr', 'totalenergies.fr', 'effy.fr', 'quelleenergie.fr'];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...OFFICIAL_SOURCES),
        (source) => {
          return !competitorDomains.some(d => source.url.includes(d));
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Tests

```typescript
// __tests__/integration/pac-editorial-page.test.tsx
describe('PAC Editorial Page Integration', () => {
  it('renders all required sections', async () => {
    render(<PompeAChaleurPage />);
    
    // Verify all sections are present
    expect(screen.getByText(/types de pompes à chaleur/i)).toBeInTheDocument();
    expect(screen.getByText(/fluide R290/i)).toBeInTheDocument();
    expect(screen.getByText(/aides financières/i)).toBeInTheDocument();
    expect(screen.getByText(/processus d'installation/i)).toBeInTheDocument();
    expect(screen.getByText(/impact environnemental/i)).toBeInTheDocument();
  });

  it('displays reading time at article start', () => {
    render(<PompeAChaleurPage />);
    expect(screen.getByText(/min de lecture/i)).toBeInTheDocument();
  });

  it('shows sources section at the end', () => {
    render(<PompeAChaleurPage />);
    expect(screen.getByText(/Sources/i)).toBeInTheDocument();
    expect(screen.getByText(/EDF/i)).toBeInTheDocument();
    expect(screen.getByText(/ADEME/i)).toBeInTheDocument();
  });
});
```

### Accessibility Tests

```typescript
// __tests__/a11y/pac-editorial.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('PAC Editorial Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<PACEditorialContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('all images have descriptive alt text', () => {
    const { container } = render(<PACEditorialContent />);
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('alt')!.length).toBeGreaterThan(5);
    });
  });

  it('heading hierarchy is correct', () => {
    const { container } = render(<PACEditorialContent />);
    const headings = container.querySelectorAll('h2, h3, h4');
    let lastLevel = 1;
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      expect(level).toBeLessThanOrEqual(lastLevel + 1);
      lastLevel = level;
    });
  });
});
```

### Test Configuration

```javascript
// jest.config.js additions
module.exports = {
  // ... existing config
  testMatch: [
    '**/__tests__/**/*.test.ts?(x)',
    '**/__tests__/properties/**/*.property.test.ts?(x)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'components/editorial/**/*.tsx',
    'lib/pac-editorial-data.ts',
  ],
};
```

### Property Test Tagging Convention

Chaque test property-based DOIT inclure un commentaire de tag :

```typescript
// Feature: pac-editorial-content, Property {number}: {property_text}
```

Cela permet de tracer chaque test vers sa propriété de design correspondante.
