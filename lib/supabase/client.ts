import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env';

let browserClient: SupabaseClient<Database> | null = null;

export function createClient(): SupabaseClient<Database> {
  if (browserClient) return browserClient;
  const url = SUPABASE_URL();
  const anonKey = SUPABASE_ANON_KEY();
  browserClient = createBrowserClient<Database>(url, anonKey);
  return browserClient;
} 