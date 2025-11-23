-- Activer l'extension pgvector pour stocker les vecteurs d'embeddings (nécessaire pour l'IA)
create extension if not exists vector;

-- 1. Table pour les documents (PDFs, Pages web, etc.)
create table if not exists documents (
  id bigserial primary key,
  title text not null,
  url text not null, -- Lien vers le fichier ou la page
  category text not null, -- ex: 'Bourse', 'Inscription', 'Guide'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Table pour les sections de documents (Chunks) avec Embeddings
-- C'est ici que l'IA ira chercher les réponses
create table if not exists document_sections (
  id bigserial primary key,
  document_id bigint references documents(id) on delete cascade,
  content text not null, -- Le texte brut de la section
  embedding vector(1536), -- Le vecteur généré par OpenAI (1536 dimensions)
  token_count int, -- Utile pour gérer la fenêtre de contexte
  created_at timestamptz default now()
);

-- 3. Table pour les établissements partenaires
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

-- Index pour la recherche vectorielle rapide (IVFFlat)
-- Cela permet au chatbot de trouver les réponses en millisecondes
create index on document_sections using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Fonction de recherche vectorielle (Similitude Cosinus)
-- Cette fonction sera appelée par votre backend Python/LangChain
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float,
  document_title text,
  document_url text
)
language plpgsql
as $$
begin
  return query
  select
    ds.id,
    ds.content,
    1 - (ds.embedding <=> query_embedding) as similarity,
    d.title as document_title,
    d.url as document_url
  from document_sections ds
  join documents d on ds.document_id = d.id
  where 1 - (ds.embedding <=> query_embedding) > match_threshold
  order by ds.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Sécurité : Activer RLS (Row Level Security)
alter table documents enable row level security;
alter table document_sections enable row level security;
alter table partners enable row level security;
alter table news enable row level security;

-- Politiques de lecture publique (Tout le monde peut lire)
create policy "Public read access for documents" on documents for select using (true);
create policy "Public read access for document_sections" on document_sections for select using (true);
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
