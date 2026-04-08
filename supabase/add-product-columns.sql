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

-- ----------------------------------------------------------------------
-- Migrate specs from the legacy object format {key: "value"} to the
-- canonical array format [{label, value}]. The template now reads specs
-- as an array; this conversion keeps existing rows displaying correctly
-- without losing data.
-- ----------------------------------------------------------------------
UPDATE products
SET specs = (
    SELECT jsonb_agg(
        jsonb_build_object(
            'label',
            -- Humanize the key: snake_case → Title Case
            initcap(replace(replace(key, '_', ' '), '-', ' ')),
            'value',
            value
        )
    )
    FROM jsonb_each_text(specs)
)
WHERE jsonb_typeof(specs) = 'object'
  AND specs <> '{}'::jsonb;
