-- Greenter Maintenance Contracts Database Schema + Seed
-- Ce fichier contient le schéma complet et les données initiales pour les contrats de maintenance.
-- Exécuter ce fichier directement dans le SQL editor de Supabase.
-- Utilise IF NOT EXISTS et ON CONFLICT pour une exécution safe et re-exécutable.

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

-- Période de facturation (mensuel ou annuel)
DO $$ BEGIN
    CREATE TYPE billing_period AS ENUM ('monthly', 'yearly');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Statut de souscription
DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due', 'paused');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Services de maintenance (ex: Chaudière à gaz, Pompe à chaleur, etc.)
CREATE TABLE IF NOT EXISTS maintenance_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price_monthly INTEGER NOT NULL, -- centimes
    icon TEXT DEFAULT 'Wrench',
    includes JSONB NOT NULL DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Options de maintenance (ex: Intervention urgence 24h)
CREATE TABLE IF NOT EXISTS maintenance_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price_monthly INTEGER NOT NULL, -- centimes (mensuel si is_flat_fee=false, forfait unique si is_flat_fee=true)
    icon TEXT DEFAULT 'Zap',
    is_active BOOLEAN DEFAULT true,
    is_flat_fee BOOLEAN DEFAULT false,
    exempt_from_discount BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Souscriptions de maintenance
CREATE TABLE IF NOT EXISTS maintenance_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    stripe_subscription_id TEXT UNIQUE,
    billing_period billing_period NOT NULL,
    status subscription_status DEFAULT 'active',
    total_monthly INTEGER NOT NULL, -- centimes, avant remises
    discount_multi_percent INTEGER DEFAULT 0,
    discount_annual_percent INTEGER DEFAULT 0,
    total_after_discounts INTEGER NOT NULL, -- centimes, montant final
    created_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ
);

-- Items de souscription (services et options liés à une souscription)
CREATE TABLE IF NOT EXISTS maintenance_subscription_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES maintenance_subscriptions(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('service', 'option')),
    maintenance_service_id UUID REFERENCES maintenance_services(id) ON DELETE SET NULL,
    maintenance_option_id UUID REFERENCES maintenance_options(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    unit_price INTEGER NOT NULL -- centimes
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_maintenance_services_slug ON maintenance_services(slug);
CREATE INDEX IF NOT EXISTS idx_maintenance_options_slug ON maintenance_options(slug);
CREATE INDEX IF NOT EXISTS idx_maintenance_subs_customer ON maintenance_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_subs_stripe ON maintenance_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_subs_status ON maintenance_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_sub_items_sub ON maintenance_subscription_items(subscription_id);

-- ============================================================================
-- SEED DATA: Services de maintenance
-- ============================================================================

INSERT INTO maintenance_services (name, slug, description, price_monthly, icon, includes, is_active, sort_order) VALUES
(
    'Chaudière à gaz',
    'chaudiere-a-gaz',
    'Entretien annuel obligatoire de votre chaudière à gaz. Vérification complète, nettoyage et réglages. Pièces de remplacement non incluses.',
    1500,
    'Flame',
    '["1 intervention annuelle obligatoire", "Vérification de l''état des appareils", "Rapport d''intervention"]'::jsonb,
    true,
    1
),
(
    'Pompe à chaleur',
    'pompe-a-chaleur',
    'Entretien annuel de votre pompe à chaleur. Contrôle du circuit frigorifique, nettoyage des filtres et vérification des performances. Pièces de remplacement non incluses.',
    2500,
    'Wind',
    '["1 intervention annuelle obligatoire", "Vérification de l''état des appareils", "Rapport d''intervention"]'::jsonb,
    true,
    2
),
(
    'Photovoltaïque',
    'photovoltaique',
    'Entretien annuel de votre installation photovoltaïque. Vérification des panneaux, onduleur et connexions. Pièces de remplacement non incluses.',
    2000,
    'Sun',
    '["1 intervention annuelle obligatoire", "Vérification de l''état des appareils", "Rapport d''intervention"]'::jsonb,
    true,
    3
),
(
    'Ballon thermodynamique',
    'ballon-thermodynamique',
    'Entretien annuel de votre ballon thermodynamique. Contrôle de l''anode, du groupe de sécurité et des performances. Pièces de remplacement non incluses.',
    1500,
    'Droplets',
    '["1 intervention annuelle obligatoire", "Vérification de l''état des appareils", "Rapport d''intervention"]'::jsonb,
    true,
    4
),
(
    'Système solaire combiné',
    'systeme-solaire-combine',
    'Entretien annuel de votre système solaire combiné. Vérification du circuit solaire, du ballon et des performances globales. Pièces de remplacement non incluses.',
    2500,
    'SunMedium',
    '["1 intervention annuelle obligatoire", "Vérification de l''état des appareils", "Rapport d''intervention"]'::jsonb,
    true,
    5
),
(
    'Chauffe-eau solaire',
    'chauffe-eau-solaire',
    'Entretien annuel de votre chauffe-eau solaire. Vérification des capteurs, du fluide caloporteur et du ballon. Pièces de remplacement non incluses.',
    1500,
    'SunDim',
    '["1 intervention annuelle obligatoire", "Vérification de l''état des appareils", "Rapport d''intervention"]'::jsonb,
    true,
    6
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price_monthly = EXCLUDED.price_monthly,
    icon = EXCLUDED.icon,
    includes = EXCLUDED.includes,
    is_active = EXCLUDED.is_active,
    sort_order = EXCLUDED.sort_order;

-- ============================================================================
-- SEED DATA: Options de maintenance
-- ============================================================================

-- Ajout de la colonne is_flat_fee si elle n'existe pas encore
DO $$ BEGIN
    ALTER TABLE maintenance_options ADD COLUMN is_flat_fee BOOLEAN DEFAULT false;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

INSERT INTO maintenance_options (name, slug, description, price_monthly, icon, is_active, is_flat_fee, exempt_from_discount, sort_order) VALUES
(
    'Intervention urgence sous 24h',
    'intervention-urgence-24h',
    'En cas de panne, un technicien intervient sous 24h (jours ouvrés). Option disponible pour tous les équipements sous contrat.',
    5000,
    'Zap',
    true,
    true,
    true,
    1
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price_monthly = EXCLUDED.price_monthly,
    icon = EXCLUDED.icon,
    is_active = EXCLUDED.is_active,
    is_flat_fee = EXCLUDED.is_flat_fee,
    exempt_from_discount = EXCLUDED.exempt_from_discount,
    sort_order = EXCLUDED.sort_order;