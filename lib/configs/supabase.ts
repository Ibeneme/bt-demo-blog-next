import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw a clear error if the environment variables are missing
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables!");
}

// Now TypeScript knows they are strings
export const supabase = createClient(supabaseUrl, supabaseKey);