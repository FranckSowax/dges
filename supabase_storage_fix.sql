-- Script de correction pour les politiques de stockage Supabase
-- Ce script supprime les anciennes politiques avant de les recréer pour éviter l'erreur "already exists"

-- 1. S'assurer que le bucket existe
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

-- 2. Supprimer les politiques existantes (DROP POLICY IF EXISTS)
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Public Delete" on storage.objects;

-- 3. Recréer les politiques proprement
-- Lecture pour tout le monde
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'documents' );

-- Upload autorisé pour tout le monde (Note: Idéalement restreindre aux admins connectés plus tard)
create policy "Public Upload"
  on storage.objects for insert
  with check ( bucket_id = 'documents' );

-- Suppression autorisée pour tout le monde
create policy "Public Delete"
  on storage.objects for delete
  using ( bucket_id = 'documents' );
