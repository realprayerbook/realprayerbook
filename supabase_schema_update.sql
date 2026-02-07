
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

-- Add journal_entries table for sacred reflections
create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  content text not null,
  frequency integer default 50,
  prompt text,
  tags text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS policies for journal_entries
alter table journal_entries enable row level security;

drop policy if exists "Users can only see their own journal entries" on journal_entries;
drop policy if exists "Users can only insert their own journal entries" on journal_entries;
drop policy if exists "Users can only update their own journal entries" on journal_entries;

create policy "Users can only see their own journal entries" on journal_entries
  for select to authenticated using (auth.uid() = user_id);

create policy "Users can only insert their own journal entries" on journal_entries
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can only update their own journal entries" on journal_entries
  for update to authenticated using (auth.uid() = user_id);

-- New table for 365-day prayer cycle
create table if not exists daily_messages (
  id uuid primary key default gen_random_uuid(),
  day_of_year integer unique not null,
  title text not null,
  insight text not null,
  command text not null,
  seal text not null default 'Order is restored. And so it is done.',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for daily_messages (Read only for authenticated)
alter table daily_messages enable row level security;
create policy "Anyone can read daily messages" on daily_messages
  for select to authenticated using (true);

-- New table for tracking weekly alignment visits
create table if not exists user_visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  visit_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, visit_date)
);

-- RLS for user_visits
alter table user_visits enable row level security;
create policy "Users can only see their own visits" on user_visits
  for select to authenticated using (auth.uid() = user_id);
create policy "Users can only insert their own visits" on user_visits
  for insert to authenticated with check (auth.uid() = user_id);
