const supabaseUrl = '';
const supabaseKey = '';

export let supabase = null;

const url = supabaseUrl.trim();
const key = supabaseKey.trim();

if (url && key) {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    supabase = createClient(url, key);
} else {
    console.warn('Supabase is not initialized. RSVP saving is disabled.');
}
