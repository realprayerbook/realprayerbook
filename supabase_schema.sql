
-- Shipping / Dispatch Table
create table if not exists shipping_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_name text,
  user_phone text,
  user_address text,
  friend_name text,
  friend_address text,
  amount integer,
  status text default 'pending'
);

-- Turn on RLS
alter table shipping_requests enable row level security;

-- Allow inserts from anyone (public)
create policy "Allow public insert to shipping_requests"
on shipping_requests for insert
to public
with check (true);

-- Allow admins (or authenticated for now) to view
create policy "Allow authenticated view shipping_requests"
on shipping_requests for select
to authenticated
using (true);

-- Community Posts Table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  content text,
  video_url text, 
  author_id uuid references auth.users
);

alter table posts enable row level security;

-- Allow public read of posts
create policy "Allow public read posts"
on posts for select
to public
using (true);

-- Allow authenticated users (authors) to insert posts
create policy "Allow authenticated insert posts"
on posts for insert
to authenticated
with check (true);
