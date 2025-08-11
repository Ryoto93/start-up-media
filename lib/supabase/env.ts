export function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const SUPABASE_URL = () => getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
export const SUPABASE_ANON_KEY = () => getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'); 