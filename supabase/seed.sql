-- Greenter E-commerce Initial Data Migration
-- This file seeds the database with the initial category and product data.
-- Execute this file in the Supabase SQL editor AFTER running schema.sql.
-- Uses ON CONFLICT to safely re-run without duplicating data.

-- ============================================================================
-- CATEGORY: Batteries solaires
-- ============================================================================

INSERT INTO categories (name, slug, spec_fields) VALUES (
  'Batteries solaires',
  'batteries-solaires',
  '[
    {
      "name": "Puissance nominale",
      "key": "puissance_nominale",
      "type": "text",
      "required": true,
      "unit": "kW"
    },
    {
      "name": "Capacité batterie",
      "key": "capacite_batterie",
      "type": "number",
      "required": true,
      "unit": "kWh"
    },
    {
      "name": "Type de cellules",
      "key": "type_cellules",
      "type": "select",
      "required": true,
      "options": ["LiFePO4", "Li-ion", "Plomb"]
    },
    {
      "name": "Cycles garantis",
      "key": "cycles_garantis",
      "type": "number",
      "required": true
    },
    {
      "name": "Rendement",
      "key": "rendement",
      "type": "text",
      "required": true,
      "unit": "%"
    },
    {
      "name": "Protection IP",
      "key": "protection_ip",
      "type": "text",
      "required": true
    },
    {
      "name": "Plage température",
      "key": "plage_temperature",
      "type": "text",
      "required": true
    }
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  spec_fields = EXCLUDED.spec_fields;

-- ============================================================================
-- PRODUCT: KSTAR BluE-S 6kW
-- ============================================================================

INSERT INTO products (
  category_id,
  name,
  slug,
  price,
  image_url,
  description,
  short_description,
  specs,
  features,
  faq,
  stripe_price_id,
  is_active,
  is_custom_page
) VALUES (
  (SELECT id FROM categories WHERE slug = 'batteries-solaires'),
  'KSTAR BluE-S 6kW',
  'kstar-blue-s-6kw',
  250000,
  '/kstar.png',
  'Batterie solaire tout-en-un avec onduleur hybride et cellules LiFePO4 CATL intégrées. 6kW de puissance, 10 000 cycles garantis. Stockez votre production solaire et consommez-la le soir. Livraison et installation offertes. Onduleur hybride monophasé 230V compatible batteries LiFePO4 48V. Charge/décharge jusqu''à 100A avec basculement réseau instantané. Compatible panneaux jusqu''à 6.5 kW. Garantie 10 ans batteries.',
  'Votre électricité gratuite, même la nuit.',
  '{
    "puissance_nominale": "6",
    "capacite_batterie": "10.2",
    "type_cellules": "LiFePO4",
    "cycles_garantis": 10000,
    "rendement": "97",
    "protection_ip": "IP65",
    "plage_temperature": "-25°C à +60°C"
  }'::jsonb,
  '[
    {"icon": "Battery", "title": "10 000 cycles", "description": "Cellules LiFePO4 CATL"},
    {"icon": "Gauge", "title": "6 kW", "description": "Puissance nominale"},
    {"icon": "Sun", "title": "97%", "description": "Rendement solaire"},
    {"icon": "Shield", "title": "IP65", "description": "Usage extérieur"},
    {"icon": "Thermometer", "title": "-25° à +60°", "description": "Plage de fonctionnement"},
    {"icon": "Wifi", "title": "Monitoring", "description": "App Solarman Smart"}
  ]'::jsonb,
  '[
    {"question": "Qu''est-ce qui est inclus dans le prix ?", "answer": "Le prix comprend l''onduleur hybride KSTAR BluE-S 6kW, la livraison à domicile et l''installation complète par nos techniciens certifiés. Si vous ne souhaitez pas l''installation, seule la livraison est effectuée au même tarif."},
    {"question": "Quelle est la durée de vie des batteries LiFePO4 ?", "answer": "Les cellules LiFePO4 CATL intégrées sont garanties pour 10 000 cycles de charge/décharge, soit environ 25-30 ans d''utilisation normale. KSTAR offre une garantie de 10 ans sur les batteries."},
    {"question": "Puis-je installer le système en extérieur ?", "answer": "Oui, le système est certifié IP65, ce qui signifie une protection totale contre la poussière et les jets d''eau. Cependant, il est recommandé de l''installer dans un local technique car les batteries ne doivent pas être chargées en dessous de 0°C."},
    {"question": "Quelle est la plage de température de fonctionnement ?", "answer": "L''onduleur fonctionne de -25°C à +60°C. Les batteries fonctionnent de 0°C à +50°C en charge et de -10°C à +50°C en décharge."},
    {"question": "Combien de panneaux solaires puis-je connecter ?", "answer": "Le KSTAR BluE-S 6kW accepte jusqu''à 6,5 kW de panneaux solaires avec une tension d''entrée maximale de 580V et un double tracker MPPT pour optimiser la production."},
    {"question": "Que se passe-t-il en cas de coupure de courant ?", "answer": "Le système bascule instantanément sur les batteries en cas de coupure réseau. Vous ne remarquerez même pas l''interruption - vos appareils continuent de fonctionner normalement."},
    {"question": "Comment surveiller ma production et consommation ?", "answer": "L''application Solarman Smart (disponible sur iOS et Android) permet de suivre en temps réel votre production solaire, consommation, état des batteries et historique. Une interface web est également disponible."},
    {"question": "Puis-je ajouter des batteries supplémentaires plus tard ?", "answer": "Oui, le système est évolutif. Vous pouvez ajouter jusqu''à 4 modules BluE-PACK5.1 (20,4 kWh au total) pour augmenter votre autonomie selon vos besoins."},
    {"question": "Quelle est la garantie du produit ?", "answer": "L''onduleur est garanti 5 ans par le fabricant KSTAR. Les batteries LiFePO4 CATL bénéficient d''une garantie de 10 ans. Notre installation est garantie 2 ans main d''œuvre."},
    {"question": "Le système est-il bruyant ?", "answer": "Non, le KSTAR BluE-S est remarquablement silencieux même sous forte charge. Un léger son haute fréquence peut être perçu à moins de 2-3 mètres, mais il est imperceptible au-delà."},
    {"question": "Quelle autonomie puis-je espérer ?", "answer": "Avec une consommation moyenne de 300-500 Wh (éclairage, réfrigérateur, box internet), une batterie de 10 kWh offre 20 à 30 heures d''autonomie. En mode économique, vous pouvez atteindre près de 3 jours."},
    {"question": "Le système est-il compatible avec mon installation existante ?", "answer": "Le KSTAR BluE-S 6kW est un onduleur hybride monophasé 230V compatible avec la plupart des installations résidentielles françaises. Nos techniciens évaluent la compatibilité lors de la visite préalable incluse."}
  ]'::jsonb,
  'price_1SsprwPdqZafPLpmZlsLtGAb',
  true,
  true
)
ON CONFLICT (category_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  specs = EXCLUDED.specs,
  features = EXCLUDED.features,
  faq = EXCLUDED.faq,
  is_active = EXCLUDED.is_active,
  is_custom_page = EXCLUDED.is_custom_page;
