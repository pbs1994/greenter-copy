# Design Document: SEO Audit On-Site Greenter

## Overview

Ce document décrit la conception technique pour l'implémentation de l'audit SEO on-site du site Greenter. L'objectif est de corriger les problèmes SEO identifiés et d'améliorer le référencement naturel du site Next.js 14+ avec App Router.

Les principales améliorations concernent :
- Correction des liens cassés dans la navigation
- Ajout de données structurées (Schema.org) pour les produits, services et FAQ
- Optimisation des images et des balises sémantiques
- Création d'une page catalogue produits
- Amélioration du maillage interne

## Architecture

```mermaid
graph TB
    subgraph "Components Layer"
        Footer[Footer.tsx]
        Services[Services.tsx]
        FAQ[FAQ.tsx]
        JsonLd[JsonLd.tsx]
    end
    
    subgraph "Schema Components"
        ProductSchema[ProductSchema.tsx]
        ServiceSchema[ServiceSchema.tsx]
        BreadcrumbSchema[BreadcrumbSchema.tsx]
        FAQSchema[FAQSchema.tsx]
    end
    
    subgraph "Pages"
        ProductPage[/produits/kstar-blue-s-6kw]
        CatalogPage[/produits]
        ServicePages[/services/*]
    end
    
    Footer --> |links| ServicePages
    Services --> |links| ServicePages
    ProductPage --> ProductSchema
    ProductPage --> FAQSchema
    ProductPage --> BreadcrumbSchema
    ServicePages --> ServiceSchema
    ServicePages --> BreadcrumbSchema
    CatalogPage --> BreadcrumbSchema
    FAQ --> |internal links| ServicePages
```

## Components and Interfaces

### 1. Schema Generator Components

#### ProductSchema Component

```typescript
interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand: string;
  sku: string;
  url: string;
}

function ProductSchema(props: ProductSchemaProps): JSX.Element
```

#### ServiceSchema Component

```typescript
interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed: string;
  url: string;
}

function ServiceSchema(props: ServiceSchemaProps): JSX.Element
```

#### BreadcrumbSchema Component

```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

function BreadcrumbSchema(props: BreadcrumbSchemaProps): JSX.Element
```

#### FAQPageSchema Component

```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  items: FAQItem[];
}

function FAQPageSchema(props: FAQPageSchemaProps): JSX.Element
```

### 2. Updated Components

#### Footer.tsx Changes
- Remove broken links (/about, /realisations)
- Keep only valid navigation links

#### Services.tsx Changes
- Fix link from `/services/pompes-a-chaleur` to `/services/pompe-a-chaleur`
- Fix link from `/services/conformite` to `/services/maintenance`
- Remove `unoptimized={true}` from Image components

#### FAQ.tsx Changes
- Add internal links within FAQ answers
- Link to relevant service pages based on content

### 3. New Pages

#### Catalog Page (/produits/page.tsx)
- Display product grid instead of redirect
- Include product card with image, name, price
- Add ItemList schema for SEO

## Data Models

### Product Data

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  brand: string;
  sku: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  features: string[];
  specs: string[];
}

const kstarProduct: Product = {
  id: 'kstar-blue-s-6kw',
  name: 'KSTAR BluE-S 6kW - Onduleur Hybride Batterie Solaire',
  slug: 'kstar-blue-s-6kw',
  description: 'Onduleur hybride avec batteries LiFePO4 intégrées...',
  shortDescription: 'Onduleur hybride tout-en-un avec stockage',
  price: 2500,
  currency: 'EUR',
  image: '/kstar.png',
  brand: 'KSTAR',
  sku: 'KSTAR-BLUES-6KW',
  availability: 'InStock',
  features: [...],
  specs: [...]
};
```

### Service Data

```typescript
interface Service {
  slug: string;
  name: string;
  title: string;
  description: string;
  metaDescription: string;
  image: string;
}

const services: Service[] = [
  {
    slug: 'pompe-a-chaleur',
    name: 'Installation Pompe à Chaleur',
    title: 'Pompe à chaleur',
    description: 'Installation de pompes à chaleur air-eau et air-air...',
    metaDescription: 'Installation PAC certifiée RGE...',
    image: '/pac.jpg'
  },
  // ... autres services
];
```

### Breadcrumb Data

```typescript
interface BreadcrumbConfig {
  [path: string]: BreadcrumbItem[];
}

const breadcrumbConfig: BreadcrumbConfig = {
  '/': [{ name: 'Accueil', url: 'https://greenter.fr' }],
  '/services': [
    { name: 'Accueil', url: 'https://greenter.fr' },
    { name: 'Services', url: 'https://greenter.fr/services' }
  ],
  '/services/pompe-a-chaleur': [
    { name: 'Accueil', url: 'https://greenter.fr' },
    { name: 'Services', url: 'https://greenter.fr/services' },
    { name: 'Pompe à chaleur', url: 'https://greenter.fr/services/pompe-a-chaleur' }
  ],
  '/produits': [
    { name: 'Accueil', url: 'https://greenter.fr' },
    { name: 'Produits', url: 'https://greenter.fr/produits' }
  ],
  '/produits/kstar-blue-s-6kw': [
    { name: 'Accueil', url: 'https://greenter.fr' },
    { name: 'Produits', url: 'https://greenter.fr/produits' },
    { name: 'KSTAR BluE-S 6kW', url: 'https://greenter.fr/produits/kstar-blue-s-6kw' }
  ]
};
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Product Schema Validity

*For any* product page, the JSON-LD Product schema SHALL contain all required fields: name, description, image, brand, sku, and offers (with price, priceCurrency, and availability).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8**

### Property 2: FAQ Schema Completeness

*For any* page with FAQ content, the number of Question items in the FAQPage schema SHALL equal the number of FAQ items displayed on the page, and each Question SHALL have a corresponding acceptedAnswer.

**Validates: Requirements 3.1, 3.2, 3.3**

### Property 3: Service Schema Validity

*For any* service page, the JSON-LD Service schema SHALL contain: name matching the service title, description, provider with name "Greenter", and areaServed including "France".

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 4: Breadcrumb Schema Correctness

*For any* page with breadcrumbs, the BreadcrumbList schema SHALL have items matching the URL path hierarchy, and each ListItem SHALL contain position (integer), name (string), and item (URL).

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 5: Image Alt Text Quality

*For any* image in the application, the alt attribute SHALL be descriptive (more than 10 characters) and SHALL NOT consist only of a product model number or generic text.

**Validates: Requirements 6.1, 6.2, 6.3**

### Property 6: FAQ Internal Linking

*For any* FAQ answer that mentions a specific service (pompe à chaleur, panneaux solaires, audit, maintenance), the answer text SHALL contain an internal link to the corresponding service page.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

## Error Handling

### Schema Generation Errors

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Missing required product data | Log warning, render page without schema |
| Invalid JSON-LD syntax | Validate schema before rendering, fallback to basic schema |
| Missing breadcrumb configuration | Generate default breadcrumb from URL path |

### Link Validation Errors

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Broken internal link detected | Remove link or redirect to valid page |
| Missing service page | Log error during build, fail CI if critical |

### Image Optimization Errors

| Error Scenario | Handling Strategy |
|----------------|-------------------|
| Missing image file | Display placeholder, log warning |
| Invalid image format | Use Next.js default error handling |

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Schema Component Tests**
   - ProductSchema renders valid JSON-LD with all required fields
   - ServiceSchema renders with correct provider information
   - BreadcrumbSchema generates correct hierarchy for known paths
   - FAQPageSchema includes all provided FAQ items

2. **Link Validation Tests**
   - Footer does not contain /about or /realisations links
   - Services.tsx uses correct href for pompe-a-chaleur (singular)
   - Services.tsx uses /services/maintenance for conformité service

3. **Image Optimization Tests**
   - Services.tsx does not use unoptimized={true}
   - Product image has descriptive alt text

4. **Page Tests**
   - /produits renders catalog instead of redirecting
   - Product page H1 contains context keywords

### Property-Based Tests

Property-based tests will use **fast-check** library for TypeScript to verify universal properties:

1. **Schema Validity Properties**
   - Generate random product data, verify schema always contains required fields
   - Generate random service data, verify schema structure is valid

2. **Breadcrumb Properties**
   - Generate random URL paths, verify breadcrumb hierarchy matches

3. **Alt Text Properties**
   - Generate random image configurations, verify alt texts meet quality criteria

### Test Configuration

- Minimum 100 iterations per property test
- Each property test tagged with: **Feature: seo-audit-onsite, Property {number}: {property_text}**
- Use Jest + React Testing Library for component tests
- Use fast-check for property-based tests

### Test File Structure

```
__tests__/
├── components/
│   ├── ProductSchema.test.tsx
│   ├── ServiceSchema.test.tsx
│   ├── BreadcrumbSchema.test.tsx
│   └── FAQPageSchema.test.tsx
├── pages/
│   ├── produits.test.tsx
│   └── product-detail.test.tsx
├── integration/
│   └── links.test.tsx
└── properties/
    ├── schema.property.test.ts
    ├── breadcrumb.property.test.ts
    └── alt-text.property.test.ts
```
