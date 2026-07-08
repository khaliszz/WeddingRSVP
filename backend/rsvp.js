import { supabase } from "./supabase.js";

export async function saveRSVP(data) {
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