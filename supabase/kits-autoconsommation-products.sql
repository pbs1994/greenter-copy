-- ============================================
-- Script pour créer la catégorie "Kits Autoconsommation Solaire"
-- et les 2 kits (3 kWc et 6 kWc)
--
-- Ces produits utilisent is_custom_page = true : leur contenu détaillé
-- (description, specs, FAQ, comparatif) vit dans une page Next.js dédiée
-- (app/(public)/produits/kit-autoconsommation-3kwc/page.tsx et
-- .../kit-autoconsommation-6kwc/page.tsx), pas dans les colonnes JSONB
-- ci-dessous. Ces colonnes ne servent qu'aux cartes du catalogue
-- (/produits et /produits/kits-autoconsommation).
-- ============================================

-- 1. Contrainte UNIQUE sur slug (no-op si déjà présente)
DO $$ BEGIN
  ALTER TABLE products ADD CONSTRAINT products_slug_unique UNIQUE (slug);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Créer la catégorie "Kits Autoconsommation Solaire"
INSERT INTO categories (name, slug, spec_fields)
VALUES (
  'Kits Autoconsommation Solaire',
  'kits-autoconsommation',
  '[
    {"name": "Puissance", "key": "puissance", "type": "text", "required": true, "unit": "kWc"},
    {"name": "Nombre de panneaux", "key": "panneaux", "type": "text", "required": true},
    {"name": "Micro-onduleurs", "key": "onduleurs", "type": "text", "required": true},
    {"name": "Garantie", "key": "garantie", "type": "text", "required": true, "unit": "ans"}
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  spec_fields = EXCLUDED.spec_fields;

-- 3. Kit 3 kWc
INSERT INTO products (name, slug, category_id, price, short_description, description, image_url, is_active, is_custom_page, specs)
SELECT
  'Kit Autoconsommation Solaire 3 kWc',
  'kit-autoconsommation-3kwc',
  c.id,
  350000,
  '6 panneaux DMEGC 500 Wc + 3 micro-onduleurs Hoymiles + fixations ISY-PV. Fixation, livraison, pose, déclaration préalable mairie et garantie inclus. Monophasé ou triphasé. Hors Consuel/raccordement Enedis (+700 €).',
  'Kit autoconsommation 3 kWc à 3 500 € (au lieu de 4 100 €) : 6 panneaux photovoltaïques DMEGC 500 Wc, 3 micro-onduleurs Hoymiles HMS-1000-2T et fixations ISY-PV pour toiture inclinée. Installation en monophasé ou triphasé selon le choix du client. Consuel et raccordement Enedis facturés séparément (+700 €).',
  '/kit-solaire-3kwc.png',
  true,
  true,
  '[
    {"label": "Puissance", "value": "3", "unit": "kWc"},
    {"label": "Nombre de panneaux", "value": "6"},
    {"label": "Micro-onduleurs", "value": "3 x Hoymiles HMS-1000-2T"},
    {"label": "Garantie", "value": "25", "unit": "ans"}
  ]'::jsonb
FROM categories c WHERE c.slug = 'kits-autoconsommation'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_custom_page = EXCLUDED.is_custom_page,
  specs = EXCLUDED.specs;

-- 4. Kit 6 kWc
INSERT INTO products (name, slug, category_id, price, short_description, description, image_url, is_active, is_custom_page, specs)
SELECT
  'Kit Autoconsommation Solaire 6 kWc',
  'kit-autoconsommation-6kwc',
  c.id,
  660000,
  '12 panneaux DMEGC 500 Wc + 6 micro-onduleurs Hoymiles + fixations ISY-PV. Fixation, livraison, pose, déclaration préalable mairie et garantie inclus. Monophasé ou triphasé. Hors Consuel/raccordement Enedis (+700 €).',
  'Kit autoconsommation 6 kWc à 6 600 € (au lieu de 7 800 €) : 12 panneaux photovoltaïques DMEGC 500 Wc, 6 micro-onduleurs Hoymiles HMS-1000-2T et fixations ISY-PV pour toiture inclinée. Installation en monophasé ou triphasé selon le choix du client. Consuel et raccordement Enedis facturés séparément (+700 €).',
  '/kit-solaire-6kwc.png',
  true,
  true,
  '[
    {"label": "Puissance", "value": "6", "unit": "kWc"},
    {"label": "Nombre de panneaux", "value": "12"},
    {"label": "Micro-onduleurs", "value": "6 x Hoymiles HMS-1000-2T"},
    {"label": "Garantie", "value": "25", "unit": "ans"}
  ]'::jsonb
FROM categories c WHERE c.slug = 'kits-autoconsommation'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_custom_page = EXCLUDED.is_custom_page,
  specs = EXCLUDED.specs;

-- Vérification
SELECT name, slug, price/100 as prix_euros, is_custom_page
FROM products WHERE category_id = (SELECT id FROM categories WHERE slug = 'kits-autoconsommation');
