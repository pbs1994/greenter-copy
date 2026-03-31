-- Migration: Add images gallery and is_featured columns to products
-- Run this in Supabase SQL Editor or via MCP

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN images JSONB DEFAULT '[]';
EXCEPTION WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT false;
EXCEPTION WHEN duplicate_column THEN null;
END $$;
