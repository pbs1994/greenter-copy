-- ============================================
-- Configuration du Storage Supabase pour les images
-- ============================================

-- 1. Créer le bucket "images" (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Politique pour permettre l'upload aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- 3. Politique pour permettre la lecture publique
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- 4. Politique pour permettre la suppression uniquement par le propriétaire du fichier
CREATE POLICY "Authenticated users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images' AND (auth.uid())::text = owner_id::text);

-- ============================================
-- INSTRUCTIONS
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor
-- Ou créez le bucket manuellement :
-- 1. Allez dans Storage > New bucket
-- 2. Nom: "images"
-- 3. Cochez "Public bucket"
-- 4. Créez les policies ci-dessus dans Authentication > Policies
-- ============================================
