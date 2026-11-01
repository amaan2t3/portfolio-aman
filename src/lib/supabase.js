import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasRealSupabaseCredentials = Boolean(
  supabaseUrl
  && supabaseAnonKey
  && !supabaseUrl.includes('your-project')
  && !supabaseAnonKey.includes('your-supabase'),
);

export const isSupabaseConfigured = hasRealSupabaseCredentials;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
