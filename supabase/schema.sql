-- Greenter E-commerce Admin Backend Database Schema
-- This file contains the complete database schema for the admin backend feature.
-- Execute this file directly in the Supabase SQL editor.
-- Uses IF NOT EXISTS to safely run on existing databases without breaking existing data.

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

-- Order status enum for tracking order lifecycle (used by admin panel)
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    spec_fields JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT,
    description TEXT,
    short_description TEXT,
    specs JSONB DEFAULT '{}',
    features JSONB DEFAULT '[]',
    faq JSONB DEFAULT '[]',
    stripe_product_id TEXT,
    stripe_price_id TEXT,
    is_active BOOLEAN DEFAULT true,
    is_custom_page BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MIGRATIONS - Add missing columns to existing orders table
-- Must run BEFORE indexes and order_items table creation
-- ============================================================================

-- Add customer_id to orders
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN customer_id UUID REFERENCES customers(id);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add order_number to orders
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN order_number TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add shipping_address to orders
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN shipping_address JSONB;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add billing_address to orders
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN billing_address JSONB;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add customer_email to orders (backward compatibility)
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN customer_email TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add customer_name to orders (backward compatibility)
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN customer_name TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add email_sent to orders
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN email_sent BOOLEAN DEFAULT false;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add product_name to orders if missing
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN product_name TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- ============================================================================
-- ORDER ITEMS TABLE (depends on orders existing)
-- ============================================================================

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price INTEGER NOT NULL
);

-- ============================================================================
-- INDEXES (must run AFTER migrations add the columns)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================================================
-- PRODUCTS MIGRATIONS - Add Stripe product ID
-- ============================================================================

-- Add stripe_product_id to products if missing
DO $$ BEGIN
    ALTER TABLE products ADD COLUMN stripe_product_id TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories: public read, service_role write
DO $$ BEGIN
    CREATE POLICY "categories_public_read" ON categories
        FOR SELECT TO anon, authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "categories_service_role_all" ON categories
        FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Products: public read (active only), service_role write
DO $$ BEGIN
    CREATE POLICY "products_public_read" ON products
        FOR SELECT TO anon, authenticated USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "products_service_role_all" ON products
        FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Customers: service_role only (contains PII)
DO $$ BEGIN
    CREATE POLICY "customers_service_role_only" ON customers
        FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Orders: service_role only (sensitive order data)
DO $$ BEGIN
    CREATE POLICY "orders_service_role_only" ON orders
        FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Order items: service_role only
DO $$ BEGIN
    CREATE POLICY "order_items_service_role_only" ON order_items
        FOR ALL TO service_role USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;
