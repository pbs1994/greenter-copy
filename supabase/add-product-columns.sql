-- Migration: Add images gallery and is_featured columns to products,
-- and uniformize all products on the generic ProductTemplate.
-- Run this in Supabase SQL Editor or via MCP.

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN images JSONB DEFAULT '[]';
EXCEPTION WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT false;
EXCEPTION WHEN duplicate_column THEN null;
END $$;

-- Uniformize: every product now uses the generic ProductTemplate.
-- The is_custom_page column is kept for safety (no DROP) but no longer
-- has any effect in the application code.
UPDATE products SET is_custom_page = false WHERE is_custom_page = true;
