import { supabase, supabaseReady } from "./supabase.js";

export async function saveRSVP(data) {
    await supabaseReady;

    if (!supabase) {
        throw new Error('RSVP saving is disabled. Supabase is not configured.');
    }

    const { error } = await supabase
        .from("rsvp")
        .insert([
            {
                name: data.name,
                attendance: data.attendance,
                guest_count: data.guestCount,
                plus_one_name: data.plusOneName,
                wishes: data.wishes
            }
        ]);

    if (error) {
        console.error(error);
        throw error;
    }

    return true;
}

export async function getTotalGuestsAttending() {
    await supabaseReady;

    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase
        .from("rsvp")
        .select("guest_count")
        .eq("attendance", "yes");

    if (error) {
        console.error(error);
        throw error;
    }

    return data.reduce((sum, row) => sum + (row.guest_count || 0), 0);
}