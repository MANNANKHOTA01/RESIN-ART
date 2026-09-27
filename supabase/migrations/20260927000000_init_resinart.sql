-- ResinArt Database Initialization Schema & RLS Security Policies
-- Migration: 20260927000000_init_resinart.sql
-- Target Database: Supabase PostgreSQL
-- Authorized Admin: N924460@gmail.com

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'reader' check (role in ('admin', 'editor', 'reader')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Categories Table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Tags Table
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- 4. Articles Table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  featured_image text,
  author_id uuid references public.profiles(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean default false,
  reading_time text default '5 min read',
  seo_title text,
  seo_description text,
  canonical_url text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Article Tags Join Table
create table if not exists public.article_tags (
  article_id uuid references public.articles(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

-- 6. Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  featured_image text,
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  estimated_time text,
  featured boolean default false,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Project Materials Table
create table if not exists public.project_materials (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  name text not null,
  quantity text,
  notes text
);

-- 8. Project Steps Table
create table if not exists public.project_steps (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  step_number int not null,
  title text not null,
  content text not null,
  image_url text
);

-- 9. Newsletter Subscribers Table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text default 'active' check (status in ('active', 'unsubscribed')),
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

-- 10. Contact Messages Table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz default now()
);

-- 11. Media Library Table
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null,
  public_url text not null,
  alt_text text,
  uploaded_by text,
  created_at timestamptz default now()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.projects enable row level security;
alter table public.project_materials enable row level security;
alter table public.project_steps enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.media enable row level security;

-- Helper function to check if the caller is the authorized admin: N924460@gmail.com
create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    lower(auth.jwt() ->> 'email') = 'n924460@gmail.com'
  );
end;
$$ language plpgsql security definer;

-- Profiles Policies
create policy "Public can read profiles"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- Categories Policies
create policy "Public can read categories"
  on public.categories for select using (true);

create policy "Admin can insert categories"
  on public.categories for insert with check (public.is_admin());

create policy "Admin can update categories"
  on public.categories for update using (public.is_admin());

create policy "Admin can delete categories"
  on public.categories for delete using (public.is_admin());

-- Tags Policies
create policy "Public can read tags"
  on public.tags for select using (true);

create policy "Admin can manage tags"
  on public.tags for all using (public.is_admin());

-- Articles Policies
create policy "Public can read published articles"
  on public.articles for select
  using (status = 'published' or public.is_admin());

create policy "Admin can insert articles"
  on public.articles for insert with check (public.is_admin());

create policy "Admin can update articles"
  on public.articles for update using (public.is_admin());

create policy "Admin can delete articles"
  on public.articles for delete using (public.is_admin());

-- Article Tags Policies
create policy "Public can read article tags"
  on public.article_tags for select using (true);

create policy "Admin can manage article tags"
  on public.article_tags for all using (public.is_admin());

-- Projects Policies
create policy "Public can read published projects"
  on public.projects for select
  using (status = 'published' or public.is_admin());

create policy "Admin can insert projects"
  on public.projects for insert with check (public.is_admin());

create policy "Admin can update projects"
  on public.projects for update using (public.is_admin());

create policy "Admin can delete projects"
  on public.projects for delete using (public.is_admin());

-- Project Materials & Steps Policies
create policy "Public can read project materials"
  on public.project_materials for select using (true);

create policy "Admin can manage project materials"
  on public.project_materials for all using (public.is_admin());

create policy "Public can read project steps"
  on public.project_steps for select using (true);

create policy "Admin can manage project steps"
  on public.project_steps for all using (public.is_admin());

-- Newsletter Subscribers Policies
create policy "Public can subscribe to newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

create policy "Admin can view newsletter subscribers"
  on public.newsletter_subscribers for select
  using (public.is_admin());

create policy "Admin can manage newsletter subscribers"
  on public.newsletter_subscribers for all
  using (public.is_admin());

-- Contact Messages Policies
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  with check (true);

create policy "Admin can view contact messages"
  on public.contact_messages for select
  using (public.is_admin());

create policy "Admin can update contact messages"
  on public.contact_messages for update
  using (public.is_admin());

create policy "Admin can delete contact messages"
  on public.contact_messages for delete
  using (public.is_admin());

-- Media Policies
create policy "Public can read media metadata"
  on public.media for select using (true);

create policy "Admin can manage media metadata"
  on public.media for all using (public.is_admin());
