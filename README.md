# Annakut Utsav Magdeburg

Single-page event site with free registration and a confirmation email.

**Event:** Saturday, 7 November 2026 · 5:00 PM · Universitätsplatz, Gebäude 03, Raum 315, 39106 Magdeburg

All text (event details, contacts, FAQ, venue) lives in `src/data/data.ts`.

## How registration works

1. The visitor submits the form → a row is inserted into Supabase `registrations`.
2. A Supabase **Database Webhook** (INSERT on `registrations`) calls `POST /api/send-confirmation`
   with header `x-webhook-secret: <RSVP_WEBHOOK_SECRET>`.
3. The function sends the confirmation email through Resend.

## Setup

1. Create a Supabase project, run `supabase/migrations/0001_init.sql` in the SQL editor.
2. Copy `.env.example` → `.env` and fill in the values.
3. In Supabase → Database → Webhooks, create the INSERT webhook described above, pointing at
   `https://<your-domain>/api/send-confirmation`.
4. Deploy to Vercel and add the same env vars there. The cron in `vercel.json` pings
   `/api/keepalive` so the free Supabase project does not pause.

## Admin dashboard (`/admin`)

Organisers sign in at `https://<your-domain>/admin` to see the totals (registrations,
persons, adults, children), search all registrations and **Download Excel** (`.xlsx` with a
"Registrations" sheet incl. totals row and a "Summary" sheet).

To give someone access: Supabase → Authentication → Users → **Add user** (email + password).
They can then sign in at `/admin`.

Recommended: Authentication → Sign In / Providers → turn **off** "Allow new users to sign up",
so only users you create can sign in.

## Development

```bash
npm install
npm run dev      # site + api/ functions on one port
npm run build
```

`/api/email-preview?name=Asha&adults=2&children=1` renders the email in the browser (non-production only).
