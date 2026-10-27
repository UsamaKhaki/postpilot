-- Postpilot — Supabase schema
-- Run in the Supabase SQL editor. RLS is enabled so users only see their own rows.

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  headline text,
  timezone text default 'UTC',
  voice_persona text default 'storyteller',
  publish_mode text not null default 'manual' check (publish_mode in ('manual','auto')),
  whatsapp_number text,
  created_at timestamptz not null default now()
);

-- Writing samples used to model the user's voice
create table if not exists public.voice_samples (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

-- Posts (drafts → scheduled → published)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  tag text,
  status text not null default 'Draft'
    check (status in ('Draft','Awaiting approval','Scheduled','Published','Failed')),
  scheduled_for timestamptz,
  published_at timestamptz,
  impressions int default 0,
  likes int default 0,
  comments int default 0,
  created_at timestamptz not null default now()
);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  detail text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Subscriptions (synced from Stripe webhooks)
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'active',
  stripe_customer_id text,
  current_period_end timestamptz
);

-- Row Level Security
alter table public.profiles       enable row level security;
alter table public.voice_samples  enable row level security;
alter table public.posts          enable row level security;
alter table public.notifications  enable row level security;
alter table public.subscriptions  enable row level security;

do $$
declare t text;
begin
  foreach t in array array['profiles','voice_samples','posts','notifications','subscriptions']
  loop
    execute format(
      'create policy "own rows - select" on public.%I for select using (auth.uid() = %s);',
      t, case when t = 'profiles' then 'id' else 'user_id' end);
    execute format(
      'create policy "own rows - modify" on public.%I for all using (auth.uid() = %s) with check (auth.uid() = %s);',
      t, case when t = 'profiles' then 'id' else 'user_id' end,
         case when t = 'profiles' then 'id' else 'user_id' end);
  end loop;
end $$;

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
