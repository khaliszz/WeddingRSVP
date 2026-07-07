// backend/supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = '';
const supabaseKey = '';

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
