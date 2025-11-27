-- 5. Table Profils Utilisateurs (liée à auth.users de Supabase)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  phone text,
  birth_date date,
  ine text, -- Identifiant National Étudiant
  role text default 'student' check (role in ('student', 'admin', 'agent')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Table des Demandes (Services en ligne)
create table if not exists applications (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null check (type in ('BOURSE', 'HOMOLOGATION', 'ORIENTATION', 'LOGEMENT')),
  status text default 'DRAFT' check (status in ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'INFO_REQUIRED')),
  data jsonb default '{}'::jsonb, -- Stockage flexible des données du formulaire
  tracking_number text unique, -- Numéro de dossier unique
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Table des Pièces Jointes pour les demandes
create table if not exists application_attachments (
  id bigserial primary key,
  application_id bigint references applications(id) on delete cascade not null,
  name text not null,
  file_path text not null, -- Chemin dans Supabase Storage
  file_type text,
  created_at timestamptz default now()
);

-- Sécurité RLS

-- Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can insert their own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Applications
alter table applications enable row level security;

create policy "Users can view own applications"
  on applications for select using (auth.uid() = user_id);

create policy "Users can insert own applications"
  on applications for insert with check (auth.uid() = user_id);

create policy "Users can update own applications"
  on applications for update using (auth.uid() = user_id);

-- Trigger pour créer automatiquement un profil après l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, role)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', 'student');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger sur auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
