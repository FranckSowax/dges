-- Correction CRITIQUE des permissions de stockage (Images)
-- Ce script corrige l'erreur "new row violates row-level security policy" lors de l'upload d'image

-- 1. S'assurer que le bucket 'images' existe
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- 2. Supprimer TOUTES les anciennes politiques sur le bucket 'images' pour repartir propre
drop policy if exists "Images Public Access" on storage.objects;
drop policy if exists "Images Public Upload" on storage.objects;
drop policy if exists "Images Public Delete" on storage.objects;

-- 3. Créer les politiques permissives pour le bucket 'images'
-- Lecture publique
create policy "Images Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Upload public (nécessaire pour votre dashboard actuel)
create policy "Images Public Upload"
  on storage.objects for insert
  with check ( bucket_id = 'images' );

-- Suppression publique
create policy "Images Public Delete"
  on storage.objects for delete
  using ( bucket_id = 'images' );

-- 4. Correction de la table News (si created_at manquait)
-- On ajoute created_at s'il n'existe pas, pour éviter l'erreur 400
alter table news 
add column if not exists created_at timestamptz default now();
