-- ============================================
-- Script pour créer la catégorie "Stockage Solaire" et les 3 produits
-- ============================================

-- 1. Ajouter contrainte UNIQUE sur slug si elle n'existe pas
ALTER TABLE products ADD CONSTRAINT products_slug_unique UNIQUE (slug);
-- Si erreur "already exists", c'est OK, continue

-- 2. Créer la catégorie "Stockage Solaire"
INSERT INTO categories (name, slug, spec_fields)
VALUES (
  'Stockage Solaire',
  'stockage-solaire',
  '[
    {"name": "Puissance", "key": "puissance", "type": "text", "required": true, "unit": "kW"},
    {"name": "Capacité", "key": "capacite", "type": "text", "required": false, "unit": "kWh"},
    {"name": "Technologie", "key": "technologie", "type": "text", "required": true},
    {"name": "Garantie", "key": "garantie", "type": "text", "required": true, "unit": "ans"}
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  spec_fields = EXCLUDED.spec_fields;

-- 3. Créer les 3 produits
-- Produit 1: Onduleur
INSERT INTO products (name, slug, category_id, price, short_description, description, image_url, is_active, is_custom_page, specs)
SELECT 
  'Onduleur Hybride Solaire 5kW',
  'onduleur-hybride-solaire-5kw',
  c.id,
  249900,
  'Le cerveau de votre installation solaire. Compatible batteries, prêt pour le stockage.',
  'Onduleur hybride monophasé 5kW pour autoconsommation solaire. Double MPPT, compatible batteries LiFePO4 48V. Rendement 97.6%, IP65 pour usage extérieur. Monitoring via application smartphone.',
  '/kstar-onduleur.png',
  true,
  true,
  '{"puissance": "5 kW", "technologie": "Onduleur hybride", "garantie": "5 ans"}'::jsonb
FROM categories c WHERE c.slug = 'stockage-solaire'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  is_custom_page = EXCLUDED.is_custom_page,
  specs = EXCLUDED.specs;

-- Produit 2: Batterie
INSERT INTO products (name, slug, category_id, price, short_description, description, image_url, is_active, is_custom_page, specs)
SELECT 
  'Batterie Solaire LiFePO4 5kWh',
  'batterie-solaire-lifepo4-5kwh',
  c.id,
  349900,
  'Stockez votre surplus solaire avec les cellules les plus fiables du marché.',
  'Batterie de stockage solaire LiFePO4 5.12 kWh. 10 000 cycles garantis, extensible jusqu''à 20 kWh (4 modules). Garantie 10 ans. Compatible onduleurs hybrides 48V.',
  '/kstar-batterie.png',
  true,
  true,
  '{"capacite": "5.12 kWh", "technologie": "LiFePO4", "garantie": "10 ans"}'::jsonb
FROM categories c WHERE c.slug = 'stockage-solaire'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  is_custom_page = EXCLUDED.is_custom_page,
  specs = EXCLUDED.specs;

-- Produit 3: Kit complet
INSERT INTO products (name, slug, category_id, price, short_description, description, image_url, is_active, is_custom_page, specs)
SELECT 
  'Kit Stockage Solaire Complet 5kW',
  'kit-stockage-solaire-complet-5kw',
  c.id,
  549900,
  'Votre électricité gratuite, même la nuit. Onduleur + batterie tout-en-un.',
  'Système de stockage solaire tout-en-un. Onduleur hybride 5kW + batterie LiFePO4 5.12 kWh. 10 000 cycles, extensible jusqu''à 20 kWh. Livraison et installation offertes.',
  '/kstar.png',
  true,
  true,
  '{"puissance": "5 kW", "capacite": "5.12 kWh", "technologie": "LiFePO4", "garantie": "10 ans"}'::jsonb
FROM categories c WHERE c.slug = 'stockage-solaire'
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  is_custom_page = EXCLUDED.is_custom_page,
  specs = EXCLUDED.specs;

-- Vérification
SELECT name, slug, price/100 as prix_euros FROM products WHERE category_id = (SELECT id FROM categories WHERE slug = 'stockage-solaire');
