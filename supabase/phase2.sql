-- ============================================================
-- Gotham Protocol — Phase 2: admin auth, content writes, storage
-- Run this in the SQL Editor AFTER schema.sql.
-- Then: create an admin user (Authentication → Users → Add user) and
-- (recommended) turn OFF "Allow new users to sign up" (Authentication → Providers → Email).
-- ============================================================

-- Authenticated users (admins) may read submitted transmissions.
drop policy if exists "auth read transmissions" on public.transmissions;
create policy "auth read transmissions" on public.transmissions
  for select to authenticated using (true);

-- Authenticated users may manage all content (insert / update / delete).
do $$
declare t text;
begin
  foreach t in array array['rogues','allies','suits','vehicles','gadgets'] loop
    execute format('drop policy if exists "auth write %1$s" on public.%1$s;', t);
    execute format('create policy "auth write %1$s" on public.%1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ---------- Storage: public "assets" bucket for uploaded imagery ----------
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do nothing;

drop policy if exists "public read assets" on storage.objects;
create policy "public read assets" on storage.objects
  for select using (bucket_id = 'assets');

drop policy if exists "auth upload assets" on storage.objects;
create policy "auth upload assets" on storage.objects
  for insert to authenticated with check (bucket_id = 'assets');

drop policy if exists "auth update assets" on storage.objects;
create policy "auth update assets" on storage.objects
  for update to authenticated using (bucket_id = 'assets');
