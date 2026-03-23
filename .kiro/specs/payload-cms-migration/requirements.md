# Requirements Document

## Introduction

Migration complète du site e-commerce Greenter vers Payload CMS avec MongoDB Atlas. Cette migration remplace entièrement Supabase par Payload CMS pour bénéficier d'une interface admin unifiée, d'une gestion de contenu professionnelle, et d'une architecture simplifiée. Seule l'intégration Stripe est conservée pour les paiements.

## Glossaire

- **Payload_CMS** : Système de gestion de contenu headless basé sur Node.js avec MongoDB, incluant un admin panel complet
- **MongoDB_Atlas** : Service cloud de base de données MongoDB (tier gratuit 512MB)
- **Block** : Composant modulaire réutilisable dans Payload CMS (Hero, FAQ, Gallery, etc.)
- **Collection** : Type de contenu dans Payload CMS (Products, Orders, Customers, Blog_Posts, Pages, etc.)
- **Rich_Text** : Éditeur de texte enrichi Lexical avec formatage, liens, images inline
- **Admin_Panel** : Interface d'administration Payload CMS pour gérer tout le contenu et les commandes
- **Hook** : Fonction déclenchée avant/après une opération CRUD dans Payload
- **Access_Control** : Système de permissions Payload pour sécuriser les collections
- **Local_API** : API interne Payload pour requêter les données côté serveur sans HTTP

## Requirements

### Requirement 1: Installation et Configuration Payload CMS

**User Story:** As a developer, I want to set up Payload CMS with MongoDB Atlas as the sole backend, so that I have a unified system for content and data management.

#### Acceptance Criteria

1. THE Payload_CMS SHALL be installed in the existing Next.js 16 project using the official App Router integration
2. THE Payload_CMS SHALL connect to MongoDB_Atlas using the MONGODB_URI environment variable
3. THE Payload_CMS SHALL expose its Admin_Panel at the route `/admin`
4. THE Payload_CMS SHALL use PAYLOAD_SECRET environment variable for encryption
5. THE Payload_CMS SHALL generate TypeScript types for all collections
6. WHEN the application starts, THE Payload_CMS SHALL initialize and be ready to serve requests
7. THE existing Supabase integration SHALL be completely removed from the codebase

### Requirement 2: Collection Products

**User Story:** As a content editor, I want to manage products entirely in Payload CMS with rich content and modular blocks, so that I can create professional product pages without coding.

#### Acceptance Criteria

1. THE Products_Collection SHALL store fields: name (required), slug (auto-generated), price (number in cents), short_description, is_active (boolean), stripe_product_id, stripe_price_id
2. THE Products_Collection SHALL include a relationship field to Categories_Collection
3. THE Products_Collection SHALL include a Rich_Text field (Lexical editor) for detailed product description
4. THE Products_Collection SHALL include a repeatable group Specs with fields: label, value, unit
5. THE Products_Collection SHALL include a repeatable group Features with fields: icon (select), title, description
6. THE Products_Collection SHALL include a repeatable group FAQ with fields: question, answer (Rich_Text)
7. THE Products_Collection SHALL include an upload field for main product image
8. THE Products_Collection SHALL include a repeatable upload field for gallery images (max 10)
9. THE Products_Collection SHALL include a Blocks field for modular page sections
10. THE Admin_Panel SHALL display products in a sortable, filterable list view
11. WHEN a Product is saved, THE System SHALL auto-generate slug from name if not provided

### Requirement 3: Collection Categories

**User Story:** As a content editor, I want to manage product categories in Payload CMS, so that products are properly organized.

#### Acceptance Criteria

1. THE Categories_Collection SHALL store fields: name (required), slug (auto-generated), description, image (upload)
2. THE Categories_Collection SHALL include a repeatable group Spec_Fields with: name, key, type (text/number/select), unit, required (boolean), options (for select type)
3. THE Admin_Panel SHALL display categories with product count
4. WHEN a Category is deleted, THE System SHALL prevent deletion if products are assigned

### Requirement 4: Collection Media

**User Story:** As a content editor, I want to upload and manage images in a centralized media library, so that I can reuse assets across the site.

#### Acceptance Criteria

1. THE Media_Collection SHALL accept image uploads (jpg, png, webp, svg, gif)
2. THE Media_Collection SHALL enforce maximum file size of 10MB
3. THE Media_Collection SHALL use Vercel Blob for storage
4. THE Media_Collection SHALL store alt text field for accessibility
5. THE Admin_Panel SHALL display media in a grid view with search and filtering
6. WHEN an image is requested, THE System SHALL use next/image for responsive sizes and optimization
7. WHEN an image is requested, THE System SHALL auto-optimize format and quality via next/image

### Requirement 5: Collection Customers

**User Story:** As a business owner, I want customer data stored in Payload CMS, so that I can view customer information in the admin panel.

#### Acceptance Criteria

1. THE Customers_Collection SHALL store fields: email (required, unique), name, phone, created_at
2. THE Customers_Collection SHALL include a relationship to Orders (has many)
3. THE Customers_Collection SHALL include a relationship to Maintenance_Subscriptions (has many)
4. THE Admin_Panel SHALL display customers with order count and total spent
5. THE Customers_Collection SHALL have Access_Control allowing only admin users to view/edit

### Requirement 6: Collection Orders

**User Story:** As a business owner, I want to manage orders in Payload CMS admin panel, so that I can track sales and update order status.

#### Acceptance Criteria

1. THE Orders_Collection SHALL store fields: order_number (auto-generated), stripe_session_id, status (enum: pending/paid/shipped/delivered/cancelled), amount (cents), created_at
2. THE Orders_Collection SHALL include a relationship to Customers_Collection
3. THE Orders_Collection SHALL include shipping_address and billing_address as JSON fields
4. THE Orders_Collection SHALL include a repeatable group Order_Items with: product_name, quantity, unit_price, product_id (relationship to Products)
5. THE Admin_Panel SHALL display orders in a list with status badges and filtering by status/date
6. THE Admin_Panel SHALL allow updating order status with a dropdown
7. WHEN order status changes, THE System SHALL log the change with timestamp
8. THE Orders_Collection SHALL have Access_Control preventing customer modification of orders

### Requirement 7: Collection Maintenance Services

**User Story:** As a content editor, I want to manage maintenance service offerings in Payload CMS, so that I can update pricing and descriptions easily.

#### Acceptance Criteria

1. THE Maintenance_Services_Collection SHALL store fields: name, slug, description, price_monthly (cents), icon (select), is_active, sort_order
2. THE Maintenance_Services_Collection SHALL include a repeatable text field "includes" for service inclusions
3. THE Admin_Panel SHALL allow drag-and-drop reordering of services
4. THE frontend maintenance configurator SHALL fetch services from Payload Local_API

### Requirement 8: Collection Maintenance Options

**User Story:** As a content editor, I want to manage maintenance add-on options, so that customers can customize their contracts.

#### Acceptance Criteria

1. THE Maintenance_Options_Collection SHALL store fields: name, slug, description, price_monthly (cents), icon, is_active, is_flat_fee (boolean), exempt_from_discount (boolean), sort_order
2. THE Admin_Panel SHALL display options with pricing and fee type indicators

### Requirement 9: Collection Maintenance Subscriptions

**User Story:** As a business owner, I want to track maintenance subscriptions in Payload CMS, so that I can manage recurring revenue.

#### Acceptance Criteria

1. THE Maintenance_Subscriptions_Collection SHALL store fields: stripe_subscription_id, billing_period (monthly/yearly), status (active/cancelled/past_due/paused), total_monthly, discount_multi_percent, discount_annual_percent, total_after_discounts, created_at, cancelled_at
2. THE Maintenance_Subscriptions_Collection SHALL include a relationship to Customers_Collection
3. THE Maintenance_Subscriptions_Collection SHALL include a repeatable group Subscription_Items with: item_type (service/option), name, unit_price, service_id, option_id
4. THE Admin_Panel SHALL display subscriptions with status badges and customer info
5. THE Admin_Panel SHALL show monthly recurring revenue (MRR) summary

### Requirement 10: Collection Blog Posts

**User Story:** As a content editor, I want to create and publish blog articles, so that I can improve SEO and generate organic traffic.

#### Acceptance Criteria

1. THE Blog_Posts_Collection SHALL store fields: title, slug, excerpt, author, published_date, status (draft/published)
2. THE Blog_Posts_Collection SHALL include an upload field for featured_image
3. THE Blog_Posts_Collection SHALL include a Rich_Text field (Lexical) for article content with headings, lists, links, images, code blocks
4. THE Blog_Posts_Collection SHALL include SEO fields group: meta_title, meta_description, og_image
5. THE Blog_Posts_Collection SHALL include a repeatable text field for tags
6. THE Admin_Panel SHALL display posts with status, date, and preview link
7. WHEN status is "draft", THE post SHALL only be visible via preview URL with token

### Requirement 11: Collection Pages

**User Story:** As a content editor, I want to create custom landing pages using modular blocks, so that I can build marketing pages without developer help.

#### Acceptance Criteria

1. THE Pages_Collection SHALL store fields: title, slug, status (draft/published)
2. THE Pages_Collection SHALL include SEO fields group: meta_title, meta_description, og_image
3. THE Pages_Collection SHALL include a Blocks field for modular page composition
4. THE Admin_Panel SHALL display pages with status and preview link
5. WHEN slug conflicts with existing routes, THE System SHALL show validation error

### Requirement 12: Block Hero

**User Story:** As a content editor, I want to add hero sections to pages and products, so that I can create impactful visual headers.

#### Acceptance Criteria

1. THE Hero_Block SHALL include fields: heading, subheading, background_image (upload), cta_text, cta_link, alignment (left/center/right)
2. THE Hero_Block SHALL support optional overlay_color with opacity slider
3. THE Hero_Block SHALL render responsively with mobile-optimized layout
4. THE Hero_Block SHALL be available in Products, Pages, and Blog_Posts

### Requirement 13: Block Specs Table

**User Story:** As a content editor, I want to display technical specifications in a formatted table, so that customers can easily review product details.

#### Acceptance Criteria

1. THE Specs_Table_Block SHALL auto-populate from product specs if used in Products_Collection
2. THE Specs_Table_Block SHALL support manual override with custom specs
3. THE Specs_Table_Block SHALL display in two-column format with alternating row colors
4. THE Specs_Table_Block SHALL support optional section grouping with headers

### Requirement 14: Block FAQ

**User Story:** As a content editor, I want to add FAQ sections, so that I can answer common customer questions.

#### Acceptance Criteria

1. THE FAQ_Block SHALL display questions in accordion format (expandable/collapsible)
2. THE FAQ_Block SHALL support Rich_Text in answers
3. THE FAQ_Block SHALL auto-populate from product FAQ if used in Products_Collection
4. THE FAQ_Block SHALL generate FAQ structured data (JSON-LD) for SEO
5. THE Admin_Panel SHALL allow drag-and-drop reordering of questions

### Requirement 15: Block Gallery

**User Story:** As a content editor, I want to add image galleries, so that I can showcase multiple product visuals.

#### Acceptance Criteria

1. THE Gallery_Block SHALL display images in responsive grid (configurable 2/3/4 columns)
2. THE Gallery_Block SHALL support lightbox viewing on click
3. THE Gallery_Block SHALL support optional captions per image
4. THE Gallery_Block SHALL auto-populate from product gallery images if available

### Requirement 16: Block Comparison Chart

**User Story:** As a content editor, I want to create comparison tables, so that customers can compare products or configurations.

#### Acceptance Criteria

1. THE Comparison_Chart_Block SHALL support configurable columns (products/options to compare)
2. THE Comparison_Chart_Block SHALL support configurable rows (features to compare)
3. THE Comparison_Chart_Block SHALL support cell types: text, number, checkmark, cross
4. THE Comparison_Chart_Block SHALL support highlighting a "recommended" column
5. THE Comparison_Chart_Block SHALL render responsively with horizontal scroll on mobile

### Requirement 17: Block CTA

**User Story:** As a content editor, I want to add call-to-action sections, so that I can drive conversions.

#### Acceptance Criteria

1. THE CTA_Block SHALL include fields: heading, description, button_text, button_link, style (primary/secondary/outline)
2. THE CTA_Block SHALL support optional background_color or background_image
3. THE CTA_Block SHALL support optional icon (from Lucide icon set)

### Requirement 18: Block Rich Text

**User Story:** As a content editor, I want to add formatted text sections anywhere on a page.

#### Acceptance Criteria

1. THE Rich_Text_Block SHALL use Lexical editor with: headings (H2-H4), paragraphs, bold, italic, underline, strikethrough
2. THE Rich_Text_Block SHALL support ordered and unordered lists
3. THE Rich_Text_Block SHALL support links with target options (same tab/new tab)
4. THE Rich_Text_Block SHALL support inline images with alignment (left/center/right)
5. THE Rich_Text_Block SHALL support blockquotes and horizontal rules

### Requirement 19: Frontend Product Pages

**User Story:** As a visitor, I want to view product pages with rich content from Payload CMS.

#### Acceptance Criteria

1. THE Product_Page SHALL be accessible at `/produits/[categorySlug]/[productSlug]`
2. THE Product_Page SHALL fetch data using Payload Local_API (no HTTP overhead)
3. THE Product_Page SHALL render all configured blocks in order
4. THE Product_Page SHALL include Product structured data (JSON-LD) for SEO
5. THE Product_Page SHALL include breadcrumb navigation
6. IF is_active is false, THEN THE System SHALL return 404
7. THE Product_Page SHALL use ISR with on-demand revalidation via webhook

### Requirement 20: Frontend Blog

**User Story:** As a visitor, I want to read blog articles and browse the blog.

#### Acceptance Criteria

1. THE Blog_Index SHALL be accessible at `/blog` with paginated article list
2. THE Blog_Index SHALL display article cards with: title, excerpt, featured_image, date
3. THE Blog_Post_Page SHALL be accessible at `/blog/[slug]`
4. THE Blog_Post_Page SHALL include Article structured data for SEO
5. THE Blog_Post_Page SHALL display related articles based on shared tags
6. IF status is "draft", THEN THE System SHALL return 404 for public requests

### Requirement 21: Frontend Custom Pages

**User Story:** As a visitor, I want to view custom landing pages.

#### Acceptance Criteria

1. THE Custom_Page SHALL be accessible at `/[slug]` (catch-all route with priority below static routes)
2. THE Custom_Page SHALL render all configured blocks in order
3. THE Custom_Page SHALL include configured SEO metadata
4. IF status is "draft", THEN THE System SHALL return 404 for public requests

### Requirement 22: Stripe Integration

**User Story:** As a business owner, I want Stripe integration to work with Payload CMS, so that I can process payments.

#### Acceptance Criteria

1. WHEN a Product is created in Payload, THE Hook SHALL create corresponding Stripe product and price
2. WHEN a Product price is updated, THE Hook SHALL create new Stripe price and archive old one
3. WHEN a Product is deactivated, THE Hook SHALL archive the Stripe product
4. THE checkout flow SHALL use stripe_price_id from Payload Products_Collection
5. THE Stripe webhook SHALL create/update Orders in Payload Orders_Collection
6. THE Stripe webhook SHALL create/update Customers in Payload Customers_Collection
7. THE Stripe subscription webhook SHALL create/update Maintenance_Subscriptions in Payload

### Requirement 23: Authentication et Access Control

**User Story:** As a business owner, I want secure admin access, so that only authorized users can manage content.

#### Acceptance Criteria

1. THE Payload Admin_Panel SHALL require authentication to access
2. THE Users_Collection SHALL store admin users with email/password
3. THE Access_Control SHALL restrict Customers, Orders, Subscriptions to admin-only access
4. THE Access_Control SHALL allow public read access to Products, Categories, Blog_Posts (published), Pages (published), Media
5. THE System SHALL support admin user creation via CLI or seed script

### Requirement 24: Migration des Données Existantes

**User Story:** As a developer, I want to migrate existing data from Supabase to Payload CMS.

#### Acceptance Criteria

1. THE Migration_Script SHALL export all products from Supabase and import to Payload Products_Collection
2. THE Migration_Script SHALL export all categories from Supabase and import to Payload Categories_Collection
3. THE Migration_Script SHALL export all customers from Supabase and import to Payload Customers_Collection
4. THE Migration_Script SHALL export all orders from Supabase and import to Payload Orders_Collection
5. THE Migration_Script SHALL export all maintenance services/options from Supabase and import to Payload
6. THE Migration_Script SHALL export all maintenance subscriptions from Supabase and import to Payload
7. THE Migration_Script SHALL preserve all Stripe IDs during migration
8. THE Migration_Script SHALL be idempotent (safe to run multiple times)

### Requirement 25: Suppression de Supabase

**User Story:** As a developer, I want to remove all Supabase code, so that the codebase is clean and maintainable.

#### Acceptance Criteria

1. THE System SHALL remove @supabase/supabase-js and @supabase/ssr dependencies
2. THE System SHALL remove all Supabase client initialization code
3. THE System SHALL remove all Supabase environment variables from .env.local
4. THE System SHALL remove supabase/ folder with SQL schemas
5. THE System SHALL update all data fetching to use Payload Local_API
6. THE System SHALL remove the custom admin panel at /administrator (replaced by Payload /admin)

### Requirement 26: Configuration Vercel

**User Story:** As a developer, I want the application properly configured for Vercel deployment with Payload CMS.

#### Acceptance Criteria

1. THE application SHALL include MONGODB_URI environment variable
2. THE application SHALL include PAYLOAD_SECRET environment variable
3. THE application SHALL include BLOB_READ_WRITE_TOKEN environment variable for Vercel Blob storage
4. THE build process SHALL generate Payload types before Next.js build
5. THE Vercel deployment SHALL support Payload CMS with serverless functions
6. THE application SHALL configure proper CORS for admin panel access
