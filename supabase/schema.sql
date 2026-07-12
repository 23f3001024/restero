-- The House of Chilli N Curry — database schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL → New query → Run).

-- ---------- Online orders ----------
create table if not exists public.orders (
  id          text primary key,
  name        text not null,
  phone       text not null,
  mode        text not null,               -- 'dine-in' | 'takeaway'
  table_no    text,
  items       jsonb not null,              -- [{ name, price, qty }]
  notes       text,
  payment     jsonb,                       -- { method, status, reference }
  total       integer not null,
  status      text not null default 'received',
  created_at  timestamptz not null default now()
);
create index if not exists orders_created_at_idx on public.orders (created_at);

-- ---------- Table reservations ----------
create table if not exists public.bookings (
  id          text primary key,
  name        text not null,
  phone       text not null,
  email       text not null,
  guests      integer not null,
  date        text not null,               -- YYYY-MM-DD
  time        text not null,               -- HH:MM
  requests    text,
  status      text not null default 'confirmed',
  created_at  timestamptz not null default now()
);
create index if not exists bookings_slot_idx on public.bookings (date, time, status);

-- Lock the tables down: only the server's service-role key can read/write.
-- (The service role bypasses RLS; the public anon key gets no access.)
alter table public.orders   enable row level security;
alter table public.bookings enable row level security;
