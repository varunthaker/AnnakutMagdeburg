-- Full schema for the Annakut Utsav Magdeburg registration site.
-- This is the single source of truth: running it replaces any earlier schema.
--
-- DESTRUCTIVE: the drops below remove any existing registration tables and
-- every row in them. Export your data before running this on a live project.
--
-- Head counts are stored as counts, not as one row per attendee: the event
-- needs catering and capacity numbers, not the names of family members who
-- never saw the privacy notice themselves.

drop view     if exists public.registration_summary;
drop view     if exists public.rsvp_summary;
drop function if exists public.create_registration(text, text, text, boolean, jsonb);
drop table    if exists public.members       cascade;
drop table    if exists public.registrations cascade;
drop table    if exists public.rsvps         cascade;

-- registrations -------------------------------------------------------
-- One row per household that signs up.
--
-- extra_adults holds the TOTAL number of adults, registrant included (the
-- form's "Adults (including you)" value, 1–5); children is 0–4.
create table public.registrations (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
  extra_adults int  not null default 0 check (extra_adults between 0 and 5),
  children     int  not null default 0 check (children     between 0 and 4),
  consent      boolean not null,
  created_at   timestamptz not null default now()
);

alter table public.registrations enable row level security;

-- anon may INSERT only, and only with consent = true. The check constraints
-- above enforce the party-size caps, so a direct insert cannot exceed them.
create policy "Anyone can register"
  on public.registrations for insert to anon
  with check (consent = true);
-- (no select / update / delete policy for anon → denied by default)

-- Organiser accounts (Supabase dashboard / authenticated users) read everything.
create policy "authenticated can read registrations"
  on public.registrations for select to authenticated
  using (true);

-- registration_summary -------------------------------------------------
-- Organiser view; extra_adults is already the total adult count.
-- security_invoker = on, so anon (no select policy) sees nothing;
-- service_role bypasses RLS either way.
create view public.registration_summary
  with (security_invoker = on)
  as
  select id, created_at, name, email, phone,
         extra_adults                    as adults,
         children,
         extra_adults + children         as party_size
  from public.registrations
  order by created_at desc;

-- keepalive ------------------------------------------------------------
-- Pinged by the Vercel cron job (/api/keepalive) so Supabase does not pause
-- the free-tier project. Left untouched by the schema change above.
create table if not exists public.keepalive (
  id         bigint generated always as identity primary key,
  note       text,
  created_at timestamptz not null default now()
);
alter table public.keepalive enable row level security;
-- written only by the edge function using the service-role key,
-- which bypasses RLS; no anon policy.
