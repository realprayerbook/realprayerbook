
-- Rename friend_address to friend_email (if data exists, we might want to be careful, but expecting clean slate or loose data)
-- Since we can't easily rename and keep type if it was text (it is text), we'll just rename
alter table shipping_requests rename column friend_address to friend_email;

-- Add notification_sent flag
alter table shipping_requests add column notification_sent boolean default false;

-- Add app_config if not exists (re-run safe)
create table if not exists app_config (
  key text primary key,
  value text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS policies for app_config (re-run safe - drop if exists)
drop policy if exists "Allow authenticated read access" on app_config;
drop policy if exists "Allow authenticated insert/update access" on app_config;
drop policy if exists "Allow authenticated update access" on app_config;

alter table app_config enable row level security;

create policy "Allow authenticated read access" on app_config for select to authenticated using (true);
create policy "Allow authenticated insert/update access" on app_config for insert to authenticated with check (true);
create policy "Allow authenticated update access" on app_config for update to authenticated using (true);
