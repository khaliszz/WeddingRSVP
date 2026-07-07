// Function to open the invitation
function openInvitation() {
    const cover = document.getElementById('cover-screen');
    const mainContent = document.getElementById('main-content');
    
    // Slide up animation
    cover.style.transform = 'translateY(-100vh)';
    cover.style.opacity = '0';
    
    setTimeout(() => {
        cover.style.display = 'none';
        mainContent.style.display = 'block';
        // Automatically play music when opened
        document.getElementById('bg-music').play().catch(e => console.log("Audio play blocked by browser"));
    }, 1000);
}

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase client (browser / public key)
const supabaseUrl = '';
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Music Player Toggle
const audio = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    const btn = document.querySelector('.play-btn');
    if (isPlaying) {
        audio.pause();
        btn.innerText = '▶';
    } else {
        audio.play();
        btn.innerText = '⏸';
    }
    isPlaying = !isPlaying;
}

// Simple Countdown Timer Logic
const targetDate = new Date('September 26, 2026 11:30:00').getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerText = 
        `${days} : ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}, 1000);

// Form submission prevention for template
async function submitRSVP(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;

    const name = document.getElementById('name').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || null;
    const guestCount = parseInt(document.getElementById('guest-count').value, 10) || 1;
    const plusOneName = document.getElementById('plus-one-name').value.trim() || null;
    const wishes = document.getElementById('wishes').value.trim() || null;

    try {
        const { data, error } = await supabase
            .from('rsvp')
            .insert([
                {
                    name: name,
                    attendance: attendance,
                    guest_count: guestCount,
                    plus_one_name: plusOneName,
                    wishes: wishes
                }
            ]);

        if (error) {
            console.error('Supabase insert error:', error);
            alert('Unable to save RSVP. Please try again later.');
            return;
        }

        alert('Thank you — your RSVP has been saved.');
        form.reset();
        plusOneSection.style.display = 'none';
    } catch (e) {
        console.error(e);
        alert('Unexpected error. See console for details.');
    } finally {
        submitBtn.disabled = false;
    }
}

// Expose function for inline `onsubmit` handler in the HTML
window.submitRSVP = submitRSVP;
// Expose other handlers used by inline HTML `onclick`
window.openInvitation = openInvitation;
window.toggleMusic = toggleMusic;

// Dropdown Plus One Logic
const guestSelect = document.getElementById('guest-count');
const plusOneSection = document.getElementById('plus-one-section');
const plusOneInput = document.getElementById('plus-one-name');

guestSelect.addEventListener('change', function() {
    if (this.value > 1) {
        plusOneSection.style.display = 'flex';
        plusOneInput.required = true; 
    } else {
        plusOneSection.style.display = 'none';
        plusOneInput.required = false;
        plusOneInput.value = ''; 
    }
});