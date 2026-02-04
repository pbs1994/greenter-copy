# Implementation Plan: Admin Backend

## Overview

This implementation plan breaks down the admin backend feature into discrete coding tasks. The approach starts with database schema and types, then builds authentication, followed by CRUD operations for each entity, webhook enhancement, and finally dynamic frontend routing. Each task builds incrementally on previous work.

## Tasks

- [x] 1. Set up database schema and TypeScript types
  - [x] 1.1 Create single SQL file `supabase/schema.sql` with complete database schema
    - All tables in one file: categories, products, customers, orders, order_items
    - Include ENUM type for order_status
    - Add all foreign key constraints
    - Create indexes on slug columns and foreign keys
    - File ready for direct execution in Supabase SQL editor
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  - [x] 1.2 Create TypeScript interfaces in `types/database.ts`
    - Define Category, SpecField, Product, ProductFeature, FAQItem, Customer, Order, OrderItem, Address interfaces
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 1.3 Create slugify utility function in `lib/slugify.ts`
    - Handle French character normalization (NFD + diacritic removal)
    - Convert to lowercase, replace non-alphanumeric with hyphens
    - _Requirements: 4.7, 5.8_
  - [x] 1.4 Write property test for slugify function
    - **Property 5: Slug Generation Round-Trip**
    - **Validates: Requirements 4.7, 5.8**

- [x] 2. Set up admin authentication
  - [x] 2.1 Install @supabase/ssr package and create server client in `lib/supabase-server.ts`
    - Configure cookie handling for Next.js App Router
    - _Requirements: 2.1_
  - [x] 2.2 Create auth utilities in `lib/auth.ts`
    - Implement getAdminUser() and requireAdmin() functions
    - _Requirements: 2.1, 2.2_
  - [x] 2.3 Create admin login page at `app/admin/login/page.tsx`
    - Email and password form fields
    - French error messages
    - Redirect to /admin on success
    - _Requirements: 2.3, 2.4, 2.5_
  - [x] 2.4 Create admin layout at `app/admin/layout.tsx`
    - Sidebar navigation with links to all admin sections
    - Auth check with redirect to login if unauthenticated
    - Logout button
    - _Requirements: 2.2, 2.6, 11.4_
  - [x] 2.5 Write property test for unauthenticated redirect
    - **Property 2: Unauthenticated Admin Route Redirect**
    - **Validates: Requirements 2.2**

- [x] 3. Checkpoint - Verify auth flow works
  - Ensure login/logout works correctly, ask the user if questions arise.

- [x] 4. Implement admin dashboard
  - [x] 4.1 Create dashboard page at `app/admin/page.tsx`
    - Query total sales amount from orders
    - Query total orders count
    - Query last 10 orders with customer info
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 4.2 Create currency formatting utility in `lib/format.ts`
    - Format cents to EUR with French locale (fr-FR)
    - _Requirements: 3.4_
  - [x] 4.3 Write property test for EUR formatting
    - **Property 3: EUR Currency Formatting**
    - **Validates: Requirements 3.4**

- [x] 5. Implement categories management
  - [x] 5.1 Create server actions in `app/admin/actions/categories.ts`
    - createCategory, updateCategory, deleteCategory actions
    - Deletion check for associated products
    - _Requirements: 4.2, 4.4, 4.5, 4.6_
  - [x] 5.2 Create categories list page at `app/admin/categories/page.tsx`
    - Display all categories with edit/delete buttons
    - _Requirements: 4.1_
  - [x] 5.3 Create category form component with spec_fields editor
    - Dynamic field builder (add/remove fields, set type/required)
    - _Requirements: 4.3_
  - [x] 5.4 Create new category page at `app/admin/categories/new/page.tsx`
    - Use category form component
    - Auto-generate slug from name
    - _Requirements: 4.2, 4.7_
  - [x] 5.5 Create edit category page at `app/admin/categories/[id]/page.tsx`
    - Load existing category data
    - Use category form component
    - _Requirements: 4.4_
  - [x] 5.6 Write property test for category deletion prevention
    - **Property 4: Category Deletion Prevention**
    - **Validates: Requirements 4.6**

- [x] 6. Implement products management
  - [x] 6.1 Create server actions in `app/admin/actions/products.ts`
    - createProduct, updateProduct, deleteProduct, toggleActive actions
    - Deletion check for associated order items
    - Required spec_fields validation
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.9_
  - [x] 6.2 Create products list page at `app/admin/products/page.tsx`
    - Display products with category filter and active status filter
    - Edit/delete/toggle buttons
    - _Requirements: 5.1_
  - [x] 6.3 Create dynamic product form component
    - Render form fields based on selected category's spec_fields
    - Handle all field types (text, number, textarea, select)
    - _Requirements: 5.2, 5.3_
  - [x] 6.4 Create new product page at `app/admin/products/new/page.tsx`
    - Category selector that loads spec_fields
    - Dynamic form based on category
    - Auto-generate slug from name
    - _Requirements: 5.2, 5.8_
  - [x] 6.5 Create edit product page at `app/admin/products/[id]/page.tsx`
    - Load existing product with category
    - Dynamic form with current values
    - _Requirements: 5.3_
  - [x] 6.6 Write property test for product deletion prevention
    - **Property 6: Product Deletion Prevention**
    - **Validates: Requirements 5.7**
  - [x] 6.7 Write property test for required spec_fields validation
    - **Property 7: Required Spec Fields Validation**
    - **Validates: Requirements 5.9**

- [x] 7. Checkpoint - Verify categories and products CRUD
  - Ensure all CRUD operations work, ask the user if questions arise.

- [x] 8. Implement orders management
  - [x] 8.1 Create server actions in `app/admin/actions/orders.ts`
    - updateOrderStatus action
    - _Requirements: 6.3_
  - [x] 8.2 Create orders list page at `app/admin/orders/page.tsx`
    - Display orders with status and date filters
    - Pagination (10 per page)
    - _Requirements: 6.1, 6.5_
  - [x] 8.3 Create order details page at `app/admin/orders/[id]/page.tsx`
    - Display customer info, items, amounts, addresses
    - Status update dropdown
    - _Requirements: 6.2, 6.3, 6.4_

- [x] 9. Implement customers management
  - [x] 9.1 Create customers list page at `app/admin/customers/page.tsx`
    - Display customers with order count
    - _Requirements: 7.1, 7.2_
  - [x] 9.2 Create customer details page at `app/admin/customers/[id]/page.tsx`
    - Display customer info and order history
    - _Requirements: 7.2, 7.3_

- [x] 10. Enhance Stripe webhook
  - [x] 10.1 Update webhook handler at `app/api/webhook/stripe/route.ts`
    - Add saveOrderToDatabase function
    - Upsert customer by email
    - Create order with 'paid' status
    - Create order_items from line items
    - Keep existing email sending logic
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [x] 10.2 Write property test for webhook order processing
    - **Property 8: Webhook Order Processing Completeness**
    - **Validates: Requirements 8.1, 8.2, 8.3**
  - [x] 10.3 Write property test for customer deduplication
    - **Property 9: Customer Deduplication (Idempotence)**
    - **Validates: Requirements 8.4**

- [x] 11. Checkpoint - Verify webhook and admin panels
  - Ensure webhook saves orders correctly, ask the user if questions arise.

- [x] 12. Implement dynamic product routes
  - [x] 12.1 Create category listing page at `app/produits/[categorySlug]/page.tsx`
    - Query products by category slug
    - Display product cards with links
    - _Requirements: 9.2_
  - [x] 12.2 Create generic product template component at `components/GenericProductTemplate.tsx`
    - Render product data (name, price, description, specs, features, FAQ)
    - Dynamic breadcrumbs
    - Buy button integration
    - _Requirements: 9.4, 9.5_
  - [x] 12.3 Create dynamic product page at `app/produits/[categorySlug]/[productSlug]/page.tsx`
    - Query product by category and product slugs
    - Conditional rendering: custom template vs generic template
    - _Requirements: 9.1, 9.3, 9.4_
  - [x] 12.4 Refactor KSTAR custom page to load data from database
    - Create KstarCustomPage component that receives product data
    - Keep existing custom layout and styling
    - _Requirements: 9.3_
  - [x] 12.5 Implement 301 redirect from old URL
    - Add redirect in next.config.ts or middleware
    - `/produits/batterie-solaire-kstar-6kw` → `/produits/batteries-solaires/kstar-blues-6kw`
    - _Requirements: 9.6_
  - [x] 12.6 Write property test for dynamic routing
    - **Property 10: Dynamic Product Routing**
    - **Validates: Requirements 9.1, 9.2**
  - [x] 12.7 Write property test for breadcrumb hierarchy
    - **Property 11: Dynamic Breadcrumb Hierarchy**
    - **Validates: Requirements 9.5**

- [x] 13. Create data migration
  - [x] 13.1 Create migration script for initial data
    - Create "Batteries solaires" category with spec_fields (puissance, capacité, type cellules, cycles, rendement, protection IP, température)
    - Create KSTAR BluE-S 6kW product with all existing data
    - Set is_custom_page=true, preserve stripe_price_id
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 14. Final checkpoint - Full integration test
  - Ensure all features work end-to-end, ask the user if questions arise.

## Notes

- All tasks including property tests are required
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Use `fast-check` library for property-based testing
- All admin UI text must be in French
- Use existing Supabase client pattern from `lib/supabase.ts`
