export function getRequiredEnvLiteral(value: string | undefined, name: string): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

// Use literal env references so Next.js can inline them for client bundles
export const SUPABASE_URL = () => getRequiredEnvLiteral(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL')
export const SUPABASE_ANON_KEY = () => getRequiredEnvLiteral(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 'NEXT_PUBLIC_SUPABASE_ANON_KEY') 