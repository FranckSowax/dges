-- ============================================================
-- MIGRATION VERS GEMINI RAG - DGES Gabon
-- ============================================================
-- Ce script supprime l'ancien système RAG (OpenAI + pgvector)
-- et configure le nouveau système basé sur Gemini File Search
-- 
-- Exécutez ce script dans l'éditeur SQL de Supabase Dashboard
-- ============================================================

-- ============================================================
-- PARTIE 1: NETTOYAGE DE L'ANCIEN SYSTÈME RAG
-- ============================================================

-- Supprimer les anciennes sections de documents (embeddings OpenAI)
DROP TABLE IF EXISTS document_sections CASCADE;

-- Supprimer l'extension pgvector si elle n'est plus nécessaire
-- (Commentez cette ligne si vous utilisez pgvector pour autre chose)
-- DROP EXTENSION IF EXISTS vector;

-- ============================================================
-- PARTIE 2: MISE À JOUR DE LA TABLE DOCUMENTS
-- ============================================================

-- Recréer la table documents avec le nouveau schéma pour Gemini RAG
DROP TABLE IF EXISTS documents CASCADE;

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Gemini RAG',
  file_url TEXT,
  gemini_document_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);

-- Commentaires
COMMENT ON TABLE documents IS 'Documents uploadés pour le RAG Gemini';
COMMENT ON COLUMN documents.gemini_document_name IS 'Nom du document dans Gemini File Search Store';
COMMENT ON COLUMN documents.file_url IS 'Chemin du fichier dans Supabase Storage (backup)';

-- ============================================================
-- PARTIE 3: POLITIQUES RLS (Row Level Security)
-- ============================================================

-- Activer RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
DROP POLICY IF EXISTS "Documents are viewable by everyone" ON documents;
CREATE POLICY "Documents are viewable by everyone" 
  ON documents FOR SELECT 
  USING (true);

-- Politique d'insertion (authentifié ou service role)
DROP POLICY IF EXISTS "Documents can be inserted" ON documents;
CREATE POLICY "Documents can be inserted" 
  ON documents FOR INSERT 
  WITH CHECK (true);

-- Politique de mise à jour
DROP POLICY IF EXISTS "Documents can be updated" ON documents;
CREATE POLICY "Documents can be updated" 
  ON documents FOR UPDATE 
  USING (true);

-- Politique de suppression
DROP POLICY IF EXISTS "Documents can be deleted" ON documents;
CREATE POLICY "Documents can be deleted" 
  ON documents FOR DELETE 
  USING (true);

-- ============================================================
-- PARTIE 4: BUCKET STORAGE (si pas déjà créé)
-- ============================================================

-- Note: Le bucket 'documents' doit être créé manuellement dans 
-- Supabase Dashboard > Storage > New Bucket
-- Nom: documents
-- Public: Non (ou Oui selon vos besoins)

-- ============================================================
-- NOTES IMPORTANTES
-- ============================================================
-- 
-- Avec Gemini File Search, vous n'avez plus besoin de:
-- - pgvector pour les embeddings
-- - La table document_sections
-- - OpenAI pour les embeddings
-- - La fonction match_documents
--
-- Gemini File Search gère automatiquement:
-- - Le chunking intelligent des documents
-- - La génération des embeddings
-- - L'indexation pour la recherche sémantique
-- - Le stockage persistant des données indexées
--
-- Configuration requise dans Netlify:
-- - GEMINI_API_KEY: Votre clé API Google AI
-- - GEMINI_FILE_SEARCH_STORE_NAME: Nom du store (créé via l'API)
-- ============================================================
