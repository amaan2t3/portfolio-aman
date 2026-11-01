const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasRealSupabaseCredentials = Boolean(
  supabaseUrl
  && supabaseAnonKey
  && !supabaseUrl.includes('your-project')
  && !supabaseAnonKey.includes('your-supabase'),
);

export const isSupabaseConfigured = hasRealSupabaseCredentials;

export async function fetchPublicPortfolio() {
  const endpoint = new URL('/rest/v1/portfolio_content', supabaseUrl);
  endpoint.searchParams.set('select', 'content');
  endpoint.searchParams.set('id', 'eq.1');

  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase returned ${response.status}: ${details.slice(0, 200)}`);
  }

  const rows = await response.json();
  return rows[0]?.content ?? null;
}
