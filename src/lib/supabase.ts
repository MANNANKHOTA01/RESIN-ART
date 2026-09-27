import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Check if valid credentials exist
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('https://')
);

// Instantiate client (using dummy credentials if unconfigured to prevent crashes)
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-instance.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);

export const AUTHORIZED_ADMIN_EMAILS = [
  'n49224460@gmail.com',
  'n924460@gmail.com'
];

export const AUTHORIZED_ADMIN_EMAIL = 'n49224460@gmail.com';

export function isAuthorizedAdmin(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return (
    clean === 'n49224460@gmail.com' ||
    clean === 'n924460@gmail.com' ||
    clean === 'admin' ||
    clean === 'manan' ||
    clean === 'admin@resinart.com'
  );
}
