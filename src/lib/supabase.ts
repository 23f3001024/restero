/**
 * Server-side Supabase client (uses the service-role key, so it must never be
 * imported into client components). When the env vars are absent, `supabase`
 * is null and the data layer falls back to its in-memory store — so the app
 * still runs locally with zero setup.
 *
 * To enable persistence: create a free project at https://supabase.com, run
 * supabase/schema.sql in the SQL editor, then set in .env.local:
 *   SUPABASE_URL=...            (Project Settings → API → Project URL)
 *   SUPABASE_SERVICE_ROLE_KEY=... (Project Settings → API → service_role key)
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
// Server-only secret. Accepts the new sb_secret_ key or the legacy service_role JWT.
const serviceKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase: SupabaseClient | null =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;

export const hasSupabase = !!supabase;
