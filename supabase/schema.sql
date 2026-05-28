-- ============================================================
-- Gotham Protocol — Supabase schema
-- Run this in your project's SQL Editor (Database → SQL Editor → New query).
-- Then seed content with:  npm run seed   (needs SUPABASE_SERVICE_ROLE_KEY)
-- ============================================================

-- Content tables: each row is one record stored as a JSON `data` blob keyed by
-- id, with a `sort` for display order. Keeps the DB shape identical to the app.
create table if not exists public.rogues   (id text primary key, sort int not null default 0, data jsonb not null, created_at timestamptz not null default now());
create table if not exists public.allies   (id text primary key, sort int not null default 0, data jsonb not null, created_at timestamptz not null default now());
create table if not exists public.suits    (id text primary key, sort int not null default 0, data jsonb not null, created_at timestamptz not null default now());
create table if not exists public.vehicles (id text primary key, sort int not null default 0, data jsonb not null, created_at timestamptz not null default now());
create table if not exists public.gadgets  (id text primary key, sort int not null default 0, data jsonb not null, created_at timestamptz not null default now());

-- User-submitted "transmissions" (the contact form).
create table if not exists public.transmissions (
  id         uuid primary key default gen_random_uuid(),
  codename   text not null check (char_length(codename) between 1 and 120),
  channel    text not null check (char_length(channel)  between 3 and 200),
  message    text not null check (char_length(message)  between 1 and 2000),
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.rogues        enable row level security;
alter table public.allies        enable row level security;
alter table public.suits         enable row level security;
alter table public.vehicles      enable row level security;
alter table public.gadgets       enable row level security;
alter table public.transmissions enable row level security;

-- Content is world-readable (anon + authenticated).
do $$
declare t text;
begin
  foreach t in array array['rogues','allies','suits','vehicles','gadgets'] loop
    execute format('drop policy if exists "public read %1$s" on public.%1$s;', t);
    execute format('create policy "public read %1$s" on public.%1$s for select using (true);', t);
  end loop;
end $$;

-- Anyone may SUBMIT a transmission, but nobody can read them back via the API
-- (no SELECT policy = not publicly exposed; view them in the dashboard).
drop policy if exists "anon submit transmissions" on public.transmissions;
create policy "anon submit transmissions" on public.transmissions for insert with check (true);
