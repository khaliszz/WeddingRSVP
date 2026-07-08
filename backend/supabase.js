export let supabase = null;

async function initSupabase() {
    try {
        const res = await fetch(new URL('./config.php', import.meta.url));
        if (!res.ok) {
            throw new Error(`Config request failed (${res.status})`);
        }

        const { supabaseUrl, supabaseKey } = await res.json();
        const url = (supabaseUrl || '').trim();
        const key = (supabaseKey || '').trim();

        if (url && key) {
            const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
            supabase = createClient(url, key);
        } else {
            console.warn('Supabase is not initialized. RSVP saving is disabled.');
        }
    } catch (err) {
        console.warn('Supabase config load failed. RSVP saving is disabled.', err);
    }
}

export const supabaseReady = initSupabase();
