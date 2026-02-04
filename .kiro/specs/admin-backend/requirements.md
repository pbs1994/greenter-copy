# Requirements Document

## Introduction

This document defines the requirements for the Greenter e-commerce admin backend feature. The system will provide an administrative interface for managing products, categories, orders, and customers. It will integrate with the existing Supabase database and Stripe payment system to enable dynamic product management and order tracking for the Greenter solar energy products e-commerce website.

## Glossary

- **Admin_Panel**: The protected administrative interface accessible at `/admin/*` routes for managing the e-commerce platform
- **Category**: A product grouping with customizable specification fields (e.g., "Batteries solaires", "Pompes à chaleur")
- **Product**: A purchasable item belonging to a category with dynamic specifications based on category configuration
- **Order**: A customer purchase record created from Stripe checkout sessions
- **Customer**: A person who has placed at least one order on the platform
- **Spec_Fields**: A JSONB configuration defining the dynamic form fields for products in a category
- **Supabase_Client**: The existing database client configured in `lib/supabase.ts`
- **Stripe_Webhook**: The existing webhook handler at `/api/webhook/stripe` that processes payment events

## Requirements

### Requirement 1: Database Schema

**User Story:** As a system administrator, I want a properly structured database schema, so that I can store and manage all e-commerce data efficiently.

#### Acceptance Criteria

1. THE Database SHALL contain a `categories` table with columns: id (UUID), name (text), slug (text unique), spec_fields (JSONB), created_at (timestamp)
2. THE Database SHALL contain a `products` table with columns: id (UUID), category_id (UUID FK), name (text), slug (text), price (integer cents), image_url (text), description (text), short_description (text), specs (JSONB), features (JSONB array), faq (JSONB array), stripe_price_id (text), is_active (boolean), is_custom_page (boolean), created_at (timestamp)
3. THE Database SHALL contain an `orders` table with columns: id (UUID), order_number (text unique), stripe_session_id (text unique), customer_id (UUID FK), status (enum: pending/paid/shipped/delivered/cancelled), amount (integer cents), shipping_address (JSONB), billing_address (JSONB), created_at (timestamp)
4. THE Database SHALL contain an `order_items` table with columns: id (UUID), order_id (UUID FK), product_id (UUID nullable FK), product_name (text), quantity (integer), unit_price (integer cents)
5. THE Database SHALL contain a `customers` table with columns: id (UUID), email (text unique), name (text), phone (text), created_at (timestamp)
6. THE Database SHALL enforce referential integrity with foreign key constraints between related tables
7. THE Database SHALL create appropriate indexes on slug columns and foreign keys for query performance

### Requirement 2: Admin Authentication

**User Story:** As an administrator, I want secure authentication for the admin panel, so that only authorized users can access administrative functions.

#### Acceptance Criteria

1. THE Admin_Panel SHALL use Supabase Auth with email/password authentication
2. WHEN an unauthenticated user accesses any `/admin/*` route THEN THE System SHALL redirect them to the admin login page
3. THE Admin_Panel SHALL provide a login page at `/admin/login` with email and password fields
4. WHEN valid credentials are submitted THEN THE System SHALL authenticate the user and redirect to `/admin`
5. WHEN invalid credentials are submitted THEN THE System SHALL display an error message in French
6. THE Admin_Panel SHALL provide a logout function that clears the session and redirects to the login page

### Requirement 3: Admin Dashboard Overview

**User Story:** As an administrator, I want a dashboard overview, so that I can quickly see key business metrics.

#### Acceptance Criteria

1. WHEN an authenticated admin visits `/admin` THEN THE Dashboard SHALL display total sales amount
2. WHEN an authenticated admin visits `/admin` THEN THE Dashboard SHALL display total orders count
3. WHEN an authenticated admin visits `/admin` THEN THE Dashboard SHALL display a list of recent orders (last 10)
4. THE Dashboard SHALL display all monetary values in EUR format with French locale

### Requirement 4: Categories Management

**User Story:** As an administrator, I want to manage product categories with custom specification fields, so that I can organize products and define category-specific attributes.

#### Acceptance Criteria

1. THE Admin_Panel SHALL provide a categories list page at `/admin/categories`
2. THE Admin_Panel SHALL allow creating a new category with name, slug, and spec_fields
3. THE Admin_Panel SHALL provide a spec_fields editor to define dynamic form fields (field name, type, required flag)
4. THE Admin_Panel SHALL allow editing existing categories
5. THE Admin_Panel SHALL allow deleting categories that have no associated products
6. IF a category has associated products THEN THE System SHALL prevent deletion and display a warning message
7. THE Admin_Panel SHALL auto-generate slug from category name with French character normalization

### Requirement 5: Products Management

**User Story:** As an administrator, I want to manage products with dynamic forms based on category specifications, so that I can add and edit products with category-appropriate fields.

#### Acceptance Criteria

1. THE Admin_Panel SHALL provide a products list page at `/admin/products` with filtering by category and active status
2. THE Admin_Panel SHALL allow creating a new product with a form that dynamically renders fields based on selected category's spec_fields
3. THE Admin_Panel SHALL allow editing existing products with the same dynamic form behavior
4. THE Admin_Panel SHALL allow toggling product active status
5. THE Admin_Panel SHALL allow setting the is_custom_page flag for products requiring custom templates
6. THE Admin_Panel SHALL allow deleting products that have no associated order items
7. IF a product has associated order items THEN THE System SHALL prevent deletion and display a warning message
8. THE Admin_Panel SHALL auto-generate slug from product name with French character normalization
9. WHEN saving a product THEN THE System SHALL validate that all required spec_fields are filled

### Requirement 6: Orders Management

**User Story:** As an administrator, I want to view and manage orders, so that I can track sales and update order statuses.

#### Acceptance Criteria

1. THE Admin_Panel SHALL provide an orders list page at `/admin/orders` with filtering by status and date range
2. THE Admin_Panel SHALL display order details including customer info, items, amounts, and addresses
3. THE Admin_Panel SHALL allow updating order status (pending → paid → shipped → delivered or cancelled)
4. THE Admin_Panel SHALL display order items with product names, quantities, and unit prices
5. THE Admin_Panel SHALL provide pagination for the orders list

### Requirement 7: Customers Management

**User Story:** As an administrator, I want to view customer information, so that I can access customer data when needed.

#### Acceptance Criteria

1. THE Admin_Panel SHALL provide a customers list page at `/admin/customers`
2. THE Admin_Panel SHALL display customer details including email, name, phone, and order count
3. THE Admin_Panel SHALL allow viewing a customer's order history

### Requirement 8: Stripe Webhook Enhancement

**User Story:** As a system administrator, I want orders to be automatically saved when payments complete, so that order data is persisted in the database.

#### Acceptance Criteria

1. WHEN a Stripe checkout.session.completed event is received THEN THE Stripe_Webhook SHALL create or update a customer record
2. WHEN a Stripe checkout.session.completed event is received THEN THE Stripe_Webhook SHALL create an order record with status 'paid'
3. WHEN a Stripe checkout.session.completed event is received THEN THE Stripe_Webhook SHALL create order_items records for each line item
4. IF customer email already exists THEN THE Stripe_Webhook SHALL use the existing customer record
5. THE Stripe_Webhook SHALL continue sending confirmation emails after saving order data

### Requirement 9: Dynamic Product Routes

**User Story:** As a customer, I want to access products via clean URLs organized by category, so that I can easily navigate and share product links.

#### Acceptance Criteria

1. THE Frontend SHALL serve product pages at `/produits/[categorySlug]/[productSlug]`
2. THE Frontend SHALL serve category listing pages at `/produits/[categorySlug]`
3. WHEN a product has is_custom_page=true THEN THE Frontend SHALL render the custom template with data from database
4. WHEN a product has is_custom_page=false THEN THE Frontend SHALL render a generic product template
5. THE Frontend SHALL display dynamic breadcrumbs based on category and product hierarchy
6. THE Frontend SHALL implement a 301 redirect from `/produits/batterie-solaire-kstar-6kw` to `/produits/batteries-solaires/kstar-blues-6kw`

### Requirement 10: Data Migration

**User Story:** As a system administrator, I want existing product data migrated to the database, so that the current KSTAR product is available through the new system.

#### Acceptance Criteria

1. THE Migration SHALL create a "Batteries solaires" category with appropriate spec_fields for battery products
2. THE Migration SHALL create the KSTAR BluE-S 6kW product record with all existing data (specs, features, FAQ)
3. THE Migration SHALL preserve the existing Stripe price_id for the KSTAR product
4. THE Migration SHALL set is_custom_page=true for the KSTAR product to maintain its custom template

### Requirement 11: Admin UI Consistency

**User Story:** As an administrator, I want the admin interface to be consistent with the main site design, so that the experience feels cohesive.

#### Acceptance Criteria

1. THE Admin_Panel SHALL use Tailwind CSS consistent with the existing site styling
2. THE Admin_Panel SHALL display all text in French language
3. THE Admin_Panel SHALL be responsive and usable on tablet and desktop devices
4. THE Admin_Panel SHALL provide clear navigation between all admin sections
