import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import type { cookies } from 'next/headers';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? '';
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? '';

// Browser client — use in Client Components
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Server client — use in Server Components and Route Handlers
export function createSupabaseServerClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: async () => {
        const store = await cookieStore;
        return store.getAll();
      },
      setAll: async (cookiesToSet) => {
        try {
          const store = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set(name, value, options);
          });
        } catch {
          // Called from Server Component — can be ignored
        }
      },
    },
  });
}

// Service role client — use only in server-side admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);
