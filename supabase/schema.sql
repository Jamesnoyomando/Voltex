-- Voltix Devices: run this in the Supabase SQL editor.
-- It creates the product catalogue (with image URLs in Supabase Storage),
-- the orders table and the storage bucket for product photos.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('laptops', 'phones', 'tablets', 'audio', 'accessories')),
  tagline text not null default '',
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  old_price numeric(12,2),
  in_stock boolean not null default true,
  colour text not null default '',
  image_url text not null,
  alt text not null default '',
  specs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "products are public" on public.products;
create policy "products are public" on public.products for select using (true);
-- writes happen with the service role key (dashboard or an edge function) only
create policy "products admin write" on public.products for all
  using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  city text not null,
  address text not null,
  items jsonb not null default '[]'::jsonb,
  amount numeric(12,2) not null check (amount >= 0),
  method text not null check (method in ('airtel', 'mtn', 'zamtel', 'bank')),
  status text not null default 'awaiting_payment'
    check (status in ('awaiting_payment', 'pending', 'paid', 'failed')),
  provider_reference text,
  failure_reason text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.orders enable row level security;

-- a shopper can read the order they just placed, by reference, only if signed in
create policy "own order read" on public.orders for select
  using (auth.jwt() ->> 'email' = customer_email);
-- inserts and status changes go through a server function with the service role key
create policy "order service write" on public.orders for all
  using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- receipts are logged so the server can resend them
create table if not exists public.order_emails (
  id uuid primary key default gen_random_uuid(),
  order_reference text not null references public.orders(reference) on delete cascade,
  to_email text not null,
  subject text not null,
  kind text not null check (kind in ('success', 'failure')),
  sent_at timestamptz not null default now()
);

alter table public.order_emails enable row level security;
create policy "email service only" on public.order_emails for all
  using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- product photos live in this public bucket: upload to products/<slug>.jpg
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

create policy "product photos are public" on storage.objects for select
  using (bucket_id = 'products');
create policy "product photos admin upload" on storage.objects for insert
  with check (bucket_id = 'products' and auth.role() = 'service_role');

-- example row using a Supabase Storage URL instead of Unsplash
insert into public.products (slug, name, category, tagline, description, price, in_stock, colour, image_url, alt, specs)
values (
  'aero-14-laptop',
  'Aero 14 laptop',
  'laptops',
  '16GB RAM, 512GB SSD, 14-inch display',
  'A 1.3kg aluminium laptop for lectures, spreadsheets and design work.',
  21500,
  true,
  'Silver',
  'https://<your-project>.supabase.co/storage/v1/object/public/products/aero-14-laptop.jpg',
  'Silver laptop open on a wooden desk with its screen off',
  '[{"label":"Memory","value":"16GB"},{"label":"Storage","value":"512GB SSD"}]'::jsonb
)
on conflict (slug) do nothing;
