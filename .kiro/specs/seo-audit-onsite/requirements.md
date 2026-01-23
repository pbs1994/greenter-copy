# Requirements Document

## Introduction

Ce document définit les exigences pour l'audit SEO on-site complet et son implémentation pour le site Greenter, une entreprise de rénovation énergétique opérant en France. L'objectif est de corriger les problèmes SEO identifiés, d'améliorer le référencement naturel et d'optimiser l'expérience utilisateur.

## Glossary

- **SEO_System**: Le système d'optimisation pour les moteurs de recherche du site Greenter
- **Schema_Generator**: Le composant responsable de la génération des données structurées JSON-LD
- **Link_Validator**: Le composant qui vérifie et corrige les liens internes
- **Image_Optimizer**: Le composant qui optimise les attributs des images
- **Breadcrumb_System**: Le système de fil d'Ariane dynamique
- **Product_Page**: La page produit KSTAR BluE-S 6kW
- **Service_Page**: Une page de service individuelle (PAC, solaire, isolation, audit, maintenance)
- **Catalog_Page**: La page catalogue des produits
- **FAQ_Component**: Le composant FAQ global ou spécifique à une page

## Requirements

### Requirement 1: Correction des liens cassés

**User Story:** As a user, I want all navigation links to work correctly, so that I can access all pages without encountering errors.

#### Acceptance Criteria

1. WHEN a user clicks on the "À propos" link in the footer, THE Link_Validator SHALL redirect to a valid page or remove the link
2. WHEN a user clicks on the "Réalisations" link in the footer, THE Link_Validator SHALL redirect to a valid page or remove the link
3. WHEN a user clicks on the "Pompes à chaleur" link in Services.tsx, THE Link_Validator SHALL navigate to /services/pompe-a-chaleur (singular form)
4. WHEN a user clicks on the "Conformité" link in Services.tsx, THE Link_Validator SHALL navigate to /services/maintenance instead of /services/conformite

### Requirement 2: Schema Product pour la page produit

**User Story:** As a search engine, I want structured product data, so that I can display rich snippets in search results.

#### Acceptance Criteria

1. WHEN the Product_Page is rendered, THE Schema_Generator SHALL include a valid Schema.org Product markup
2. THE Schema_Generator SHALL include the product name "KSTAR BluE-S 6kW" in the Product schema
3. THE Schema_Generator SHALL include the price "2500" with currency "EUR" in the Product schema
4. THE Schema_Generator SHALL include availability status "InStock" in the Product schema
5. THE Schema_Generator SHALL include the product description in the Product schema
6. THE Schema_Generator SHALL include the product image URL in the Product schema
7. THE Schema_Generator SHALL include the brand "KSTAR" in the Product schema
8. THE Schema_Generator SHALL include the SKU or product identifier in the Product schema

### Requirement 3: Schema FAQ pour la page produit

**User Story:** As a search engine, I want structured FAQ data on the product page, so that I can display FAQ rich snippets.

#### Acceptance Criteria

1. WHEN the Product_Page is rendered, THE Schema_Generator SHALL include a valid Schema.org FAQPage markup
2. THE Schema_Generator SHALL include all FAQ questions and answers from the product page in the FAQPage schema
3. FOR ALL FAQ items on the Product_Page, THE Schema_Generator SHALL format them as Question/Answer pairs

### Requirement 4: Schema Service pour les pages services

**User Story:** As a search engine, I want structured service data on each service page, so that I can better understand the services offered.

#### Acceptance Criteria

1. WHEN a Service_Page is rendered, THE Schema_Generator SHALL include a valid Schema.org Service markup
2. THE Schema_Generator SHALL include the service name specific to each page
3. THE Schema_Generator SHALL include the service description specific to each page
4. THE Schema_Generator SHALL include the provider information (Greenter) in the Service schema
5. THE Schema_Generator SHALL include the service area (France) in the Service schema

### Requirement 5: Breadcrumbs dynamiques

**User Story:** As a user and search engine, I want accurate breadcrumb navigation, so that I can understand the page hierarchy.

#### Acceptance Criteria

1. WHEN any page is rendered, THE Breadcrumb_System SHALL generate a BreadcrumbList schema matching the current page path
2. THE Breadcrumb_System SHALL include the correct page hierarchy for service pages (Accueil > Services > [Service Name])
3. THE Breadcrumb_System SHALL include the correct page hierarchy for product pages (Accueil > Produits > [Product Name])
4. FOR ALL breadcrumb items, THE Breadcrumb_System SHALL include position, name, and item URL

### Requirement 6: Optimisation des attributs alt des images

**User Story:** As a visually impaired user, I want descriptive image alt texts, so that I can understand the image content through screen readers.

#### Acceptance Criteria

1. WHEN the Product_Page is rendered, THE Image_Optimizer SHALL provide a descriptive alt text for the product image including "Batterie solaire" or "Onduleur hybride"
2. FOR ALL service images, THE Image_Optimizer SHALL provide descriptive alt texts that include the service type and context
3. THE Image_Optimizer SHALL NOT use generic alt texts like just the product model number

### Requirement 7: Amélioration du H1 de la page produit

**User Story:** As a search engine, I want a descriptive H1 tag, so that I can better understand the page content.

#### Acceptance Criteria

1. WHEN the Product_Page is rendered, THE SEO_System SHALL display an H1 that includes context like "Batterie solaire" or "Onduleur hybride" in addition to "KSTAR BluE-S"
2. THE SEO_System SHALL maintain the visual design while improving the semantic H1 content

### Requirement 8: Suppression de unoptimized des images

**User Story:** As a user, I want optimized images, so that pages load faster.

#### Acceptance Criteria

1. WHEN Services.tsx is rendered, THE Image_Optimizer SHALL NOT use the unoptimized={true} attribute on images
2. FOR ALL images in the application, THE Image_Optimizer SHALL use Next.js image optimization by default

### Requirement 9: Création d'une page catalogue produits

**User Story:** As a user, I want to browse available products, so that I can discover what's for sale.

#### Acceptance Criteria

1. WHEN a user navigates to /produits, THE Catalog_Page SHALL display a product listing instead of redirecting
2. THE Catalog_Page SHALL display the KSTAR BluE-S 6kW product with image, name, price, and link to detail page
3. THE Catalog_Page SHALL include appropriate meta tags for SEO
4. THE Catalog_Page SHALL include a Schema.org ItemList markup for the product catalog

### Requirement 10: Liens internes dans la FAQ globale

**User Story:** As a user, I want relevant links in FAQ answers, so that I can easily navigate to related services.

#### Acceptance Criteria

1. WHEN the FAQ_Component is rendered, THE SEO_System SHALL include internal links to relevant service pages within FAQ answers
2. THE FAQ answer about pompe à chaleur SHALL include a link to /services/pompe-a-chaleur
3. THE FAQ answer about panneaux solaires SHALL include a link to /services/panneaux-solaires
4. THE FAQ answer about audit énergétique SHALL include a link to /services/audit
5. THE FAQ answer about contrats d'entretien SHALL include a link to /services/maintenance
