import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 1. Client-side usage (Respects Row Level Security)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Server-side usage (Admin power to generate keys/hash)
// ONLY use this in /app/api routes!
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
