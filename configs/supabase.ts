import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://icstsbvoookvzyxhjwre.supabase.co'
const supabaseKey = 'sb_publishable_9dc0h-8ClfWTdNrZo6Ec_Q_eAjthZ6r'

export const supabase = createClient(supabaseUrl, supabaseKey);