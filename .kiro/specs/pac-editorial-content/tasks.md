# Plan d'implémentation : PAC Editorial Content

## Vue d'ensemble

Transformation du contenu après le Hero de la page `/services/pompe-a-chaleur` en un article éditorial de qualité magazine. Le Hero existant est conservé, seul le contenu après est remplacé par un design éditorial moderne avec typographie soignée, données 2026 vérifiées, et maximum 2 CTA discrets.

**Stack technique :** Next.js, React, TypeScript, Tailwind CSS

## Tâches

- [x] 1. Configuration et données
  - [x] 1.1 Configurer les polices éditoriales dans Tailwind
    - Ajouter Merriweather (serif) et Inter (sans-serif) dans `tailwind.config.ts`
    - Créer les classes `font-editorial-serif` et `font-editorial-sans`
    - Définir la variable `--max-width-prose: 720px`
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Créer le fichier de données `lib/pac-editorial-data.ts`
    - Définir les types TypeScript : `PACType`, `AideFinanciere`, `SourceReference`, `InstallationStep`, `R290Data`, `EnvironmentalData`
    - Implémenter `PAC_TYPES` avec les 4 types (air/air, air/eau, eau/eau, hybride) et données prix 2026
    - Implémenter `AIDES_2026` avec MaPrimeRénov' (rouvert 23/02/2026), Éco-PTZ, CEE, TVA 5.5%
    - Implémenter `INSTALLATION_STEPS` (5 étapes avec durées)
    - Implémenter `OFFICIAL_SOURCES` (minimum 5 sources officielles)
    - Implémenter `R290_DATA` (GWP 3, ODP 0, comparaison R410A)
    - Implémenter `ENVIRONMENTAL_DATA` (90% réduction CO2, 50-70% économies)
    - _Requirements: 2.1, 2.4, 2.5, 2.6, 3.2, 5.1, 5.2, 5.3, 5.9, 6.1, 6.2, 7.1, 7.2, 10.1_

  - [x] 1.3 Écrire les tests property-based pour les données
    - **Property 5: PAC Type Data Completeness** - Tous les types PAC ont les champs requis
    - **Property 6: R290 Data Accuracy** - GWP=3, ODP=0, R410A GWP=1430
    - **Property 7: Aids Data Completeness** - Toutes les aides ont sources officielles
    - **Property 8: Installation Steps Completeness** - Étapes 1-5 complètes et ordonnées
    - **Validates: Requirements 2.1, 2.2, 3.2, 5.3, 5.4, 5.6, 6.1, 6.2**

- [x] 2. Composants éditoriaux de base
  - [x] 2.1 Créer `components/editorial/ReadingProgressBar.tsx`
    - Barre de progression fixe en haut (3px, emerald-500)
    - Apparaît après scroll du Hero
    - Largeur = % de scroll dans l'article
    - _Requirements: 1.6_

  - [x] 2.2 Écrire test property-based pour ReadingProgressBar
    - **Property 4: Reading Progress Accuracy** - Largeur = % scroll position
    - **Validates: Requirements 1.6**

  - [x] 2.3 Créer `components/editorial/ArticleHeader.tsx`
    - Props: `readingTime: number`, `lastUpdated: string`
    - Affiche temps de lecture ("X min de lecture") et date mise à jour
    - Style: texte slate-500, sans-serif, uppercase tracking-wide
    - Fonction `calculateReadingTime(wordCount)` = ceil(wordCount / 200)
    - _Requirements: 1.7_

  - [x] 2.4 Écrire test property-based pour ArticleHeader
    - **Property 3: Reading Time Calculation** - readingTime = ceil(words / 200)
    - **Validates: Requirements 1.7**

  - [x] 2.5 Créer `components/editorial/PullQuote.tsx`
    - Props: `quote: string`, `source?: string`, `variant?: 'default' | 'highlight' | 'stat'`
    - Style: bordure gauche emerald-500, font-serif italic, taille xl
    - Variant 'highlight': fond emerald-50 avec bordure
    - Variant 'stat': pour chiffres clés
    - _Requirements: 1.3_

  - [x] 2.6 Créer `components/editorial/ArticleSection.tsx`
    - Props: `id: string`, `title: string`, `level?: 'h2' | 'h3'`, `children`
    - Style: max-width 720px centré, espacement py-16
    - Titre: font-serif bold, taille 2xl-3xl
    - Corps: font-sans, line-height relaxed, taille lg
    - _Requirements: 1.2, 1.4, 1.8, 9.2_

  - [x] 2.7 Écrire tests unitaires pour ArticleSection
    - Vérifier max-width 720px appliqué
    - Vérifier hiérarchie H2/H3 correcte
    - **Property 2: Prose Width Constraint** - max-width = 720px
    - **Validates: Requirements 1.2, 9.2**

- [x] 3. Checkpoint - Vérifier composants de base
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Composants de contenu
  - [x] 4.1 Créer `components/editorial/InfographicBlock.tsx`
    - Props: `type: 'comparison' | 'timeline' | 'stats' | 'table'`, `data`, `caption?`, `source?`
    - Type 'comparison': pour comparatif 4 types PAC
    - Type 'timeline': pour processus installation
    - Type 'stats': pour données chiffrées (économies, CO2)
    - Type 'table': pour tableau aides financières
    - Style: fond slate-50, rounded-2xl, responsive mobile
    - _Requirements: 2.3, 5.8, 7.4, 11.6_

  - [x] 4.2 Écrire test property-based pour InfographicBlock
    - **Property 20: Infographic Responsive Layout** - Layout adaptatif mobile/desktop
    - **Validates: Requirements 11.6**

  - [x] 4.3 Créer `components/editorial/SidebarCTA.tsx`
    - Props: `title: string`, `description?: string`, `phone: string`, `variant?: 'subtle' | 'editorial'`
    - Style 'subtle': bordure slate-200, fond blanc
    - Style 'editorial': fond emerald-50/30, bordure emerald-100
    - PAS de couleurs orange/rouge (agressives)
    - Lien téléphone ou formulaire de rappel
    - data-testid="sidebar-cta" pour tests
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_

  - [x] 4.4 Écrire tests property-based pour SidebarCTA
    - **Property 10: CTA Non-Intrusive Styling** - Pas de orange-500/600, red-500/600
    - **Property 11: CTA Contact Options** - Contient lien tel: ou formulaire
    - **Validates: Requirements 8.2, 8.3, 8.5**

  - [x] 4.5 Créer `components/editorial/SourceCitation.tsx`
    - Props: `source: string`, `url?: string`, `date?: string`
    - Style: texte xs, slate-400, italic
    - Lien externe avec icône si URL fournie
    - _Requirements: 10.4, 10.5_

  - [x] 4.6 Créer `components/editorial/SourcesSection.tsx`
    - Props: `sources: Array<{name, url, description}>`
    - Encadré "Sources" en fin d'article
    - Style: fond slate-50, liste numérotée, liens cliquables
    - Minimum 5 sources officielles
    - _Requirements: 10.1, 10.2_

  - [x] 4.7 Écrire tests property-based pour SourcesSection
    - **Property 15: Source Citation Minimum Count** - Au moins 5 sources officielles
    - **Property 16: Source Citation No Competitors** - Pas de domaines concurrents
    - **Validates: Requirements 10.1, 10.3**

  - [x] 4.8 Créer `components/editorial/FinalContactBox.tsx`
    - Props: `title?: string`, `phone: string`
    - Encadré final sobre "Besoin d'un conseil ?"
    - Style: fond emerald-50/50, bordure emerald-100
    - Téléphone cliquable mais discret
    - _Requirements: 8.4_

- [x] 5. Checkpoint - Vérifier composants de contenu
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Intégration page principale
  - [x] 6.1 Créer `components/editorial/PACEditorialContent.tsx`
    - Composant principal regroupant tout le contenu éditorial
    - Structure: ArticleHeader → Introduction → Types PAC → SidebarCTA #1 → R290 → Design → Aides 2026 → Installation → SidebarCTA #2 → Impact environnemental → FAQ → Sources → FinalContactBox
    - Intégrer ReadingProgressBar
    - Exactement 2 SidebarCTA (pas plus, pas moins)
    - Réutiliser FAQSection existant
    - _Requirements: 1.1-1.8, 2.1-2.6, 3.1-3.5, 4.1-4.5, 5.1-5.10, 6.1-6.6, 7.1-7.5, 8.1-8.6_

  - [x] 6.2 Écrire test property-based pour PACEditorialContent
    - **Property 1: Editorial Styling Compliance** - Serif body, sans-serif headings
    - **Property 9: CTA Count Constraint** - Exactement 2 SidebarCTA
    - **Property 12: Heading Hierarchy Compliance** - H3 après H2, pas H4 avant H3
    - **Property 14: SEO Keywords Presence** - Tous mots-clés prioritaires présents
    - **Validates: Requirements 1.1, 1.4, 1.8, 8.1, 9.1, 9.2**

  - [x] 6.3 Modifier `app/(public)/services/pompe-a-chaleur/page.tsx`
    - Conserver le Hero existant (ne pas toucher)
    - Remplacer tout le contenu APRÈS le Hero par `<PACEditorialContent />`
    - Supprimer les anciennes sections (Avantages, Types PAC, Fonctionnement, Aides, Installation, FAQ, CTA Final)
    - Conserver les schemas SEO existants
    - Ajouter Schema Article pour le contenu éditorial
    - _Requirements: 9.5_

- [x] 7. Checkpoint - Vérifier intégration page
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. SEO et accessibilité
  - [x] 8.1 Ajouter Schema Article pour le contenu éditorial
    - Créer ou modifier `components/schemas/ArticleSchema.tsx`
    - Intégrer dans la page PAC
    - _Requirements: 9.5_

  - [x] 8.2 Vérifier et optimiser les images
    - Utiliser Next.js Image avec lazy loading
    - Formats WebP/AVIF
    - Alt text descriptif (minimum 5 caractères)
    - _Requirements: 1.5, 9.3, 11.3_

  - [x] 8.3 Écrire tests property-based pour images et accessibilité
    - **Property 13: Image Alt Text Compliance** - Alt présent et > 5 caractères
    - **Property 18: Responsive Image Optimization** - lazy loading, WebP/AVIF
    - **Property 19: Mobile Font Size Minimum** - font-size >= 16px sur mobile
    - **Validates: Requirements 9.3, 11.2, 11.3**

  - [x] 8.4 Ajouter liens internes vers autres pages du site
    - Liens vers blog, autres services
    - _Requirements: 9.4_

- [x] 9. Tests d'intégration finaux
  - [x] 9.1 Écrire tests d'intégration pour la page complète
    - Vérifier toutes les sections présentes
    - Vérifier temps de lecture affiché
    - Vérifier section sources en fin d'article
    - Vérifier accessibilité (jest-axe)
    - **Property 17: Statistics Source Attribution** - Chaque stat a une source
    - **Validates: Requirements 10.4, 10.5**

  - [x] 9.2 Vérifier performance Lighthouse
    - Score Performance > 85 sur mobile
    - Vérifier lazy loading images
    - Vérifier responsive mobile
    - **Validates: Requirements 11.4, 11.5**

- [x] 10. Checkpoint final
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Les tâches marquées avec `*` sont optionnelles et peuvent être ignorées pour un MVP plus rapide
- Chaque tâche référence les requirements spécifiques pour la traçabilité
- Les checkpoints permettent de valider l'avancement incrémental
- Les tests property-based valident les propriétés universelles de correction
- Les tests unitaires valident les exemples spécifiques et edge cases
- Le Hero existant ne doit PAS être modifié (spec `pac-landing-page-optimization`)
- Maximum 2 CTA discrets, pas de couleurs agressives (orange/rouge)
- Toutes les données doivent provenir de sources officielles (EDF, ADEME, economie.gouv.fr, france-renov.gouv.fr)
