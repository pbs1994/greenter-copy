-- Ajouter un champ images (array de URLs) à la table products
-- L'image principale reste dans image_url, les images secondaires dans images

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Vérification
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'images';
