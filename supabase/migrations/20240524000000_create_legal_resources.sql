-- Table pour les ressources juridiques (Lois, Décrets, Arrêtés)
CREATE TABLE IF NOT EXISTS legal_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Loi', 'Décret', 'Arrêté')),
  reference TEXT, -- Ex: "Loi n° 21.84 du 29.12.1984"
  description TEXT,
  file_url TEXT,
  file_name TEXT,
  file_type TEXT DEFAULT 'pdf',
  file_size TEXT,
  publication_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_legal_resources_category ON legal_resources(category);
CREATE INDEX IF NOT EXISTS idx_legal_resources_created_at ON legal_resources(created_at DESC);

-- Activer RLS
ALTER TABLE legal_resources ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Legal resources are viewable by everyone" ON legal_resources FOR SELECT USING (true);
CREATE POLICY "Legal resources can be inserted" ON legal_resources FOR INSERT WITH CHECK (true);
CREATE POLICY "Legal resources can be updated" ON legal_resources FOR UPDATE USING (true);
CREATE POLICY "Legal resources can be deleted" ON legal_resources FOR DELETE USING (true);

-- Insertion des données initiales
INSERT INTO legal_resources (title, category, reference, description) VALUES
-- Lois
('Loi fixant les règles applicables à l''enseignement privé', 'Loi', 'Loi n° 21.84 du 29.12.1984', 'Règles applicables à l''enseignement privé en République gabonaise'),
('Loi déterminant les principes fondamentaux de l''enseignement supérieur', 'Loi', 'Loi n° 21.2000 du 10.01.2001', 'Principes fondamentaux de l''enseignement supérieur en République gabonaise'),
('Loi portant orientation générale de l''Education, de la Formation et de la Recherche', 'Loi', 'Loi n° 21.2011 du 14.02.2012', 'Orientation générale de l''Education, de la Formation et de la Recherche'),

-- Décrets
('Décret portant habilitation à fonder des établissements privés d''enseignement supérieur', 'Décret', 'Décret n°0071.PR.MESRSIT du 14.02.2024', 'Habilitation à fonder des établissements privés d''enseignement supérieur'),
('Décret portant autorisation d''ouverture des établissements privés d''enseignement supérieur', 'Décret', 'Décret n°0072.PR.MESRSIT du 14.02.2024', 'Autorisation d''ouverture des établissements privés d''enseignement supérieur'),
('Décret portant reconnaissance d''utilité publique des établissements privés d''enseignement supérieur', 'Décret', 'Décret n°0073.PR.MESRSIT du 14.02.2024', 'Reconnaissance d''utilité publique des établissements privés'),
('Décret fixant les régimes de bourse d''études en République Gabonaise', 'Décret', 'Décret n°00148.PR.MESRSTTENFC du 07.06.2021', 'Régimes de bourse d''études en République Gabonaise'),
('Décret portant réorganisation de la Direction Générale de l''Enseignement Supérieur', 'Décret', 'Décret n° 0292.PR.MESRS du 04.06.2015', 'Réorganisation de la DGES'),
('Décret portant application du système LMD', 'Décret', 'Décret n°0340.PR.MENESTFPCJS du 28.02.2013', 'Application du système Licence-Master-Doctorat dans les universités et établissements d''enseignement supérieur'),
('Décret fixant les modalités d''habilitation et d''ouverture des établissements privés', 'Décret', 'Décret n°001039PRMESRIT du 07.11.2000', 'Modalités d''habilitation et d''ouverture des établissements privés d''enseignement supérieur'),

-- Arrêtés
('Arrêté fixant les conditions de reconnaissance d''utilité publique', 'Arrêté', 'Arrêté n°0103MESRSTTENFC', 'Conditions de reconnaissance d''utilité publique des établissements d''enseignement privé'),
('Arrêté fixant les charges horaires statutaires des Enseignants-Chercheurs', 'Arrêté', 'Arrêté n°00011.MESRSFC du 07.07.2017', 'Charges horaires statutaires des Enseignants-Chercheurs des Etablissements Publics d''Enseignement Supérieur'),
('Arrêté portant critères et modalités des partenariats public-privé', 'Arrêté', 'Arrêté n°00003.MENESTFPRSCJS du 09.01.2013', 'Critères et modalités des partenariats public-privé avec les promoteurs ou gestionnaires d''établissements privés');
