-- Autoriser l'insertion, la modification et la suppression des actualités
-- (Idéalement à restreindre aux admins, mais on ouvre pour le dev)

-- 1. Supprimer les anciennes politiques s'il y en a pour éviter les conflits
drop policy if exists "Public Insert News" on news;
drop policy if exists "Public Update News" on news;
drop policy if exists "Public Delete News" on news;

-- 2. Créer les nouvelles politiques permissives
create policy "Public Insert News" on news for insert with check (true);
create policy "Public Update News" on news for update using (true);
create policy "Public Delete News" on news for delete using (true);

-- 3. S'assurer que la table est bien commentée (vérification existence)
comment on table news is 'Table des actualités du site';
