
-- Table for storing system configuration (key-value pairs)
create table app_config (
  key text primary key,
  value text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Policy to allow only authenticated users to read/write (initially)
-- You might want to restrict write access to specific admin emails in a real production app
alter table app_config enable row level security;

create policy "Allow authenticated read access"
  on app_config for select
  to authenticated
  using (true);

create policy "Allow authenticated insert/update access"
  on app_config for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update access"
  on app_config for update
  to authenticated
  using (true);
