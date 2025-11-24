-- Activer la sécurité au niveau des lignes (RLS)
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent pour éviter les conflits
DROP POLICY IF EXISTS "Enable read access for all users" ON establishments;
DROP POLICY IF EXISTS "Enable insert for all users" ON establishments;
DROP POLICY IF EXISTS "Enable update for all users" ON establishments;
DROP POLICY IF EXISTS "Enable delete for all users" ON establishments;

-- Créer des politiques permissives pour permettre le CRUD complet
-- NOTE: Dans un environnement de production strict, restreignez ces accès aux utilisateurs authentifiés ou admin

-- 1. Lecture : Tout le monde peut voir les établissements
CREATE POLICY "Enable read access for all users" ON establishments 
FOR SELECT USING (true);

-- 2. Insertion : Tout le monde peut ajouter (pour le développement)
CREATE POLICY "Enable insert for all users" ON establishments 
FOR INSERT WITH CHECK (true);

-- 3. Mise à jour : Tout le monde peut modifier
CREATE POLICY "Enable update for all users" ON establishments 
FOR UPDATE USING (true);

-- 4. Suppression : Tout le monde peut supprimer
CREATE POLICY "Enable delete for all users" ON establishments 
FOR DELETE USING (true);
