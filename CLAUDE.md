# CLAUDE.md - Greenter Project Guide

## Project Overview

**Greenter** (https://www.greenter.fr) is a full-stack e-commerce and service management platform for renewable energy solutions in France. It combines a public-facing storefront, a maintenance subscription configurator, a blog/content system, and a Payload CMS admin backend.

**Target audience**: French homeowners interested in energy renovation (pompes a chaleur, panneaux solaires, isolation, audit energetique).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.4 (App Router) + React 19 |
| Language | TypeScript 5 (strict) |
| CMS | Payload CMS 3.79 (headless, PostgreSQL) |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (one-time + subscriptions) |
| Email | Resend |
| Storage | Vercel Blob |
| Styling | Tailwind CSS 4 + Radix UI + shadcn/ui |
| Icons | Lucide React |
| Testing | Jest 30 + React Testing Library + fast-check |
| Deployment | Vercel |

---

## Project Structure

```
greenter/
├── app/
│   ├── (public)/           # Public pages (homepage, services, blog, produits, contact)
│   │   ├── [slug]/         # Dynamic pages from Payload
│   │   ├── blog/           # Blog listing & articles
│   │   ├── produits/       # Product catalog & detail pages
│   │   ├── services/       # Service pages (maintenance, PAC, solaire, isolation, audit)
│   │   ├── commande/       # Order success page
│   │   └── contact/        # Contact form
│   ├── (payload)/          # Payload CMS admin routes (/admin)
│   ├── api/                # Next.js API routes
│   │   ├── checkout/       # Stripe checkout (products + maintenance)
│   │   ├── webhook/stripe/ # Stripe webhook handler
│   │   ├── order/          # Order retrieval
│   │   ├── invoice/        # PDF invoice generation
│   │   ├── contact/        # Contact form submission
│   │   ├── maintenance-services/ # Active services API
│   │   ├── product-price/  # Product pricing
│   │   ├── google-reviews/ # Google reviews fetch
│   │   ├── send-email/     # Transactional emails
│   │   ├── send-order-emails/ # Order email notifications
│   │   ├── blog/create/    # Blog creation
│   │   └── upload/         # File upload
│   ├── layout.tsx          # Root layout
│   ├── robots.ts           # SEO robots
│   └── sitemap.ts          # SEO sitemap
│
├── collections/            # Payload CMS Collections (11 total)
│   ├── Users.ts            # Admin auth (admin/editor roles)
│   ├── Products.ts         # Products with Stripe sync
│   ├── Categories.ts       # Product categories + dynamic spec fields
│   ├── Orders.ts           # Orders (GRT-YYYYMMDD-XXXX format)
│   ├── Customers.ts        # Customer records
│   ├── Media.ts            # Image/file management (Vercel Blob)
│   ├── BlogPosts.ts        # Blog articles
│   ├── Pages.ts            # Dynamic landing pages
│   ├── MaintenanceServices.ts    # Maintenance service offerings
│   ├── MaintenanceOptions.ts     # Maintenance add-on options
│   └── MaintenanceSubscriptions.ts # Subscription tracking
│
├── components/             # React Components (30+)
│   ├── ui/                 # shadcn/ui primitives
│   ├── blocks/             # CMS block renderers (Hero, FAQ, CTA, Gallery, etc.)
│   ├── maintenance/        # Maintenance configurator components
│   ├── products/           # Product page templates (ProductPageV2, Kstar pages)
│   ├── editorial/          # Editorial/article content
│   ├── schemas/            # JSON-LD structured data (Product, Article, LocalBusiness)
│   ├── Header.tsx          # Main navigation
│   ├── Footer.tsx          # Site footer
│   ├── Hero.tsx            # Hero sections
│   └── ...
│
├── blocks/                 # Payload CMS block definitions
│   ├── Hero.ts, RichText.ts, FAQ.ts, Gallery.ts
│   ├── ComparisonChart.ts, CTA.ts, SpecsTable.ts
│   └── index.ts
│
├── hooks/                  # Payload CMS lifecycle hooks
│   ├── generateOrderNumber.ts    # Auto-generate order IDs
│   ├── syncProductToStripe.ts    # Sync products to Stripe
│   └── syncProductToPublic.ts    # Sync products to public DB
│
├── lib/                    # Utility functions
│   ├── supabase.ts / supabase-server.ts  # Supabase clients
│   ├── stripe.ts           # Stripe helpers
│   ├── resend.ts           # Resend email client
│   ├── payload.ts          # Payload CMS client
│   ├── auth.ts             # Authentication helpers
│   ├── maintenance-pricing.ts  # Pricing calculation engine
│   ├── email-templates.ts  # HTML email templates (58KB)
│   ├── google-places.ts    # Google Places API
│   ├── format.ts           # Currency formatting (EUR)
│   ├── slugify.ts          # Slug generation
│   ├── local-seo-data.ts   # City SEO data
│   └── pac-editorial-data.ts # Heat pump content data
│
├── types/                  # TypeScript types
│   ├── database.ts         # Database entity types
│   └── maintenance.ts      # Maintenance domain types
│
├── fields/                 # Payload custom fields
│   └── slug.ts             # Auto-slug field
│
├── supabase/               # SQL schemas & seeds
│   ├── schema.sql          # Main DB schema
│   ├── maintenance.sql     # Maintenance tables
│   ├── seed.sql            # Initial data
│   └── kstar-products.sql  # Product data
│
├── scripts/                # Admin/migration scripts
│   ├── migrate.ts          # DB migrations
│   ├── seed-products.ts    # Product seeding
│   └── sync-stripe-products.ts  # Stripe sync
│
├── __tests__/              # Test suite
│   ├── components/         # Component tests
│   ├── integration/        # Integration tests
│   └── properties/         # Property-based tests (fast-check)
│
├── .kiro/specs/            # Project specifications & requirements
├── public/                 # Static assets (images, videos, certs)
│
├── payload.config.ts       # Payload CMS configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript config (aliases: @/*)
├── jest.config.js          # Jest config
└── package.json            # Dependencies & scripts
```

---

## Key Commands

```bash
# Development
pnpm dev              # Start Next.js dev server (includes Payload admin)
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run Jest tests
pnpm test -- --watch  # Watch mode

# Linting
pnpm lint             # ESLint check

# Database
pnpm tsx scripts/migrate.ts        # Run DB migrations
pnpm tsx scripts/seed-products.ts  # Seed product data
pnpm tsx scripts/sync-stripe-products.ts  # Sync Stripe

# Payload CMS
# Admin panel accessible at /admin after dev server starts
```

---

## Core Business Logic

### Services Offered
1. **Pompe a Chaleur (PAC)** - Heat pump installation (air-air, air-eau)
2. **Panneaux Solaires** - Solar panel installation (autoconsommation)
3. **Isolation Thermique** - Building insulation
4. **Audit Energetique** - Energy audit
5. **Maintenance** - Recurring maintenance contracts
6. **Produits** - E-commerce: KSTAR batteries & inverters

### Maintenance Pricing Engine (`lib/maintenance-pricing.ts`)
- **Multi-service discount**: 1 service = 0%, 2 = 5%, 3 = 10%, 4+ = 15%
- **Annual billing discount**: 2 months free (pay 10 months instead of 12)
- **Options**: flat-fee or per-service, some exempt from discounts
- Prices stored in **cents** (e.g., 1500 = 15.00 EUR)

### Order Flow
1. Customer selects products/maintenance services
2. Stripe Checkout session created via `/api/checkout` or `/api/checkout/maintenance`
3. Stripe processes payment
4. Webhook at `/api/webhook/stripe` creates Order/Subscription in Payload CMS
5. Confirmation emails sent via Resend
6. Customer sees success page with order details & invoice download

### Order Number Format
`GRT-YYYYMMDD-XXXX` (e.g., GRT-20260330-0001)

---

## Payload CMS Collections Summary

| Collection | Purpose | Access |
|-----------|---------|--------|
| Users | Admin auth (admin/editor roles) | Authenticated |
| Products | Product catalog with Stripe sync | Public read |
| Categories | Product groups + spec templates | Public read |
| Orders | Order tracking + status history | Admin only |
| Customers | Customer records (auto-created from Stripe) | Admin only |
| Media | Images/files (Vercel Blob, max 5MB) | Public read |
| BlogPosts | Blog articles (draft/published) | Published = public |
| Pages | Dynamic landing pages | Published = public |
| MaintenanceServices | Service offerings | Public read |
| MaintenanceOptions | Add-on options | Public read |
| MaintenanceSubscriptions | Subscription records | Admin only |

---

## Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=                  # PostgreSQL connection string

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Resend
RESEND_API_KEY=

# Payload CMS
PAYLOAD_SECRET=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Application
NEXT_PUBLIC_SITE_URL=https://www.greenter.fr
ADMIN_EMAIL=contact@greenter.fr
FROM_EMAIL=noreply@greenter.fr
```

---

## Important Patterns & Conventions

### Code Style
- **Language**: All UI/content is in **French** (fr-FR locale)
- **Currency**: All prices in **cents** (integer), formatted with `formatEUR()` from `lib/format.ts`
- **Slugs**: Auto-generated from titles via `fields/slug.ts`
- **Path aliases**: `@/*` maps to project root (tsconfig paths)
- **Components**: shadcn/ui style (Radix + Tailwind)

### Data Flow
- **Payload CMS** = source of truth for content (products, pages, blog)
- **Supabase** = public-facing database (synced from Payload via hooks)
- **Stripe** = payment source of truth (synced from Payload via hooks)
- Webhooks drive order/subscription creation (not manual admin entry)

### CMS Blocks
Modular content system used in Products, Pages, and BlogPosts:
- `Hero`, `RichText`, `FAQ`, `Gallery`, `ComparisonChart`, `CTA`, `SpecsTable`
- Rendered by `components/blocks/BlockRenderer.tsx`

### Product Templates
- Generic product pages use `ProductPageV2.tsx`
- KSTAR products have custom templates: `KstarBatteriePage.tsx`, `KstarOnduleurPage.tsx`, `KstarCustomPage.tsx`
- Toggle via `is_custom_page` field on Product collection

### SEO
- JSON-LD schemas: `ProductSchema`, `ArticleSchema`, `LocalBusinessSchema`, `FAQSchema`, `AggregateRatingSchema`
- Meta tags via Next.js metadata API
- `robots.ts` and `sitemap.ts` for search engines
- City-specific pages for local SEO (`/services/pompe-a-chaleur/[ville]`)

---

## Testing

- **Framework**: Jest 30 + React Testing Library
- **Property-based**: fast-check for pricing logic validation
- **Test location**: `__tests__/` directory
- **Key test files**:
  - `maintenance-pricing.test.ts` - Pricing calculation tests
  - `MaintenanceConfigurator.test.tsx` - Configurator UI tests
  - `pac-editorial-page.integration.test.tsx` - Integration tests

---

## Deployment

- **Platform**: Vercel (direct git push deployment)
- **Domain**: greenter.fr / www.greenter.fr
- **Database**: Supabase PostgreSQL (AWS eu-west region)
- **No Docker/CI files** - Vercel handles build & deploy
- **CORS configured** for greenter.fr domains in `payload.config.ts`

---

## Working Notes

### When Modifying Products
- Changes in Payload CMS auto-sync to Stripe (`syncProductToStripe` hook)
- Changes also sync to public Supabase table (`syncProductToPublic` hook)
- Prices are in **cents** - always multiply by 100

### When Modifying Maintenance Pricing
- Core logic in `lib/maintenance-pricing.ts`
- Tests in `__tests__/` - run tests after changes
- Discount tiers are hardcoded (not configurable via CMS)

### When Adding New Pages
- Use Payload CMS Pages collection with block system
- Or create Next.js pages in `app/(public)/`
- Protected slugs: produits, services, contact, blog, admin, api

### When Working with Emails
- Templates in `lib/email-templates.ts` (large file, ~58KB)
- Sent via Resend through `lib/resend.ts`
- Both customer and admin notifications on orders

### Key Large Components
- `components/Header.tsx` (~29KB) - Main navigation
- `components/products/ProductPageV2.tsx` (~43KB) - Product template
- `components/maintenance/MaintenanceConfigurator.tsx` (~35KB) - Configurator
- `components/editorial/PACEditorialContent.tsx` (~26KB) - PAC article
- `lib/email-templates.ts` (~58KB) - All email HTML templates
