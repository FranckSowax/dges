-- ============================================================
-- SCHÉMA SUPABASE - DGES GABON PORTAL
-- ============================================================
-- Version: 2.0 - Gemini RAG Integration
-- Date: Décembre 2024
-- ============================================================

-- 1. Table pour les documents (Gemini RAG)
-- Les embeddings et le chunking sont gérés par Gemini File Search
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default 'Gemini RAG',
  file_url text, -- Chemin dans Supabase Storage (backup)
  gemini_document_name text, -- Référence dans Gemini File Search Store
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index pour les recherches
create index if not exists idx_documents_category on documents(category);
create index if not exists idx_documents_created_at on documents(created_at desc);

-- 2. Table pour les établissements partenaires
create table if not exists partners (
  id bigserial primary key,
  name text not null,
  logo_url text,
  type text not null, -- 'Université Publique', 'Grande École', 'Privé'
  description text,
  website_url text,
  created_at timestamptz default now()
);

-- 4. Table pour les actualités
create table if not exists news (
  id bigserial primary key,
  title text not null,
  excerpt text, -- Résumé court
  content text,
  image_url text,
  published_at timestamptz default now(),
  is_featured boolean default false
);

-- Sécurité : Activer RLS (Row Level Security)
alter table documents enable row level security;
alter table partners enable row level security;
alter table news enable row level security;

-- Politiques pour documents (CRUD complet pour Gemini RAG)
create policy "Documents are viewable by everyone" on documents for select using (true);
create policy "Documents can be inserted" on documents for insert with check (true);
create policy "Documents can be updated" on documents for update using (true);
create policy "Documents can be deleted" on documents for delete using (true);

-- Politiques de lecture publique pour partners et news
create policy "Public read access for partners" on partners for select using (true);
create policy "Public read access for news" on news for select using (true);

-- Insertion de données factices pour tester (Partenaires)
insert into partners (name, type, description) values
('Université Omar Bongo', 'Université Publique', 'La plus ancienne université du Gabon.'),
('USTM', 'Université Publique', 'Université des Sciences et Techniques de Masuku.'),
('Institut Africain d''Informatique', 'Grande École', 'Formation d''excellence en informatique.');

-- Insertion de données factices (Actualités)
insert into news (title, excerpt, is_featured) values
('Lancement de la campagne de bourses 2024', 'Les demandes sont ouvertes jusqu''au 30 décembre.', true),
('Nouveau calendrier académique disponible', 'Consultez les dates clés de l''année 2024-2025.', false);
