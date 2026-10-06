create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  mobile text not null,
  service text not null,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW','READ','IN_PROGRESS','RESPONDED','CLOSED')),
  email_status text not null default 'PENDING' check (email_status in ('PENDING','SENT','FAILED')),
  email_attempted_at timestamptz,
  email_sent_at timestamptz,
  recipient_email text,
  email_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fourza_admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.fourza_admin_sessions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.fourza_admins(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.fourza_settings (
  id integer primary key check (id = 1),
  recipient_email text,
  business_email text,
  business_phone text,
  notify_admin boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.fourza_admins enable row level security;
alter table public.fourza_admin_sessions enable row level security;
alter table public.fourza_settings enable row level security;

revoke all on public.enquiries from anon, authenticated;
revoke all on public.fourza_admins from anon, authenticated;
revoke all on public.fourza_admin_sessions from anon, authenticated;
revoke all on public.fourza_settings from anon, authenticated;
grant all on public.enquiries to service_role;
grant all on public.fourza_admins to service_role;
grant all on public.fourza_admin_sessions to service_role;
grant all on public.fourza_settings to service_role;

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_email_status_idx on public.enquiries (email_status);
create index if not exists admin_sessions_expiry_idx on public.fourza_admin_sessions (expires_at);
