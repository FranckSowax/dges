-- ============================================================
-- TABLE ESTABLISHMENTS - DGES Gabon
-- ============================================================
-- Gestion des établissements d'enseignement supérieur
-- Exécutez ce script dans l'éditeur SQL de Supabase Dashboard
-- ============================================================

-- Supprimer la table si elle existe (attention: perte de données)
-- DROP TABLE IF EXISTS establishments CASCADE;

-- Créer la table establishments
CREATE TABLE IF NOT EXISTS establishments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  acronym TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Public' CHECK (type IN ('Université', 'Public', 'Privé', 'RUP', 'Inter-État')),
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  director TEXT,
  filieres TEXT[], -- Array de filières
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_establishments_type ON establishments(type);
CREATE INDEX IF NOT EXISTS idx_establishments_is_active ON establishments(is_active);
CREATE INDEX IF NOT EXISTS idx_establishments_display_order ON establishments(display_order);

-- Activer RLS
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
DROP POLICY IF EXISTS "Establishments are viewable by everyone" ON establishments;
CREATE POLICY "Establishments are viewable by everyone" 
  ON establishments FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Establishments can be inserted" ON establishments;
CREATE POLICY "Establishments can be inserted" 
  ON establishments FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Establishments can be updated" ON establishments;
CREATE POLICY "Establishments can be updated" 
  ON establishments FOR UPDATE 
  USING (true);

DROP POLICY IF EXISTS "Establishments can be deleted" ON establishments;
CREATE POLICY "Establishments can be deleted" 
  ON establishments FOR DELETE 
  USING (true);

-- ============================================================
-- DONNÉES INITIALES - Établissements du Gabon
-- ============================================================

INSERT INTO establishments (name, acronym, type, description, director, display_order) VALUES
-- Universités
('Université Omar Bongo', 'UOB', 'Université', 'La plus grande université du Gabon, fondée en 1970. Elle propose des formations en lettres, sciences humaines, droit et économie.', 'Pr. Recteur', 1),
('Université des Sciences et Techniques de Masuku', 'USTM', 'Université', 'Université spécialisée dans les sciences exactes, la technologie et l''ingénierie, située à Franceville.', 'Pr. Recteur', 2),
('Université des Sciences de la Santé', 'USS', 'Université', 'Université dédiée à la formation des professionnels de santé : médecins, pharmaciens, infirmiers.', 'Pr. Recteur', 3),

-- Établissements Publics
('École Normale Supérieure', 'ENS', 'Public', 'Formation des enseignants du secondaire et des inspecteurs pédagogiques.', 'Directeur Général', 4),
('École Polytechnique de Masuku', 'EPM', 'Public', 'Grande école d''ingénieurs formant dans les domaines des mines, du pétrole et du génie civil.', 'Directeur', 5),
('Institut Supérieur de Technologie', 'IST', 'Public', 'Formation technique supérieure dans les domaines industriels et tertiaires.', 'Directeur', 6),
('École Nationale des Eaux et Forêts', 'ENEF', 'Public', 'Formation des cadres forestiers et environnementaux.', 'Directeur', 7),
('Institut National des Sciences de Gestion', 'INSG', 'Public', 'Formation en gestion, comptabilité et administration des entreprises.', 'Directeur', 8),

-- Établissements Inter-État
('Institut Africain d''Informatique', 'IAI', 'Inter-État', 'Centre d''excellence en informatique et technologies de l''information pour l''Afrique Centrale.', 'Directeur Général', 9),

-- Établissements Privés (exemples)
('Institut Privé de Gestion', 'IPG', 'Privé', 'Établissement privé de formation en gestion et commerce.', 'Directeur', 10),
('Université Internationale de Libreville', 'UIL', 'Privé', 'Université privée proposant des formations diversifiées.', 'Président', 11)

ON CONFLICT DO NOTHING;

-- ============================================================
-- BUCKET STORAGE POUR LES LOGOS
-- ============================================================
-- Note: Créez manuellement le bucket 'establishments' dans 
-- Supabase Dashboard > Storage > New Bucket
-- Nom: establishments
-- Public: Oui (pour afficher les logos sur le site)
