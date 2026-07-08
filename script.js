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
        audio.play().catch(() => {});
    }, 1000);
}

// Music Player Toggle
const audio = document.getElementById('bg-music');
const volumeSlider = document.getElementById('volume-slider');
const playBtn = document.querySelector('.play-btn');

audio.volume = volumeSlider.value / 100;
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

function updatePlayButton() {
    playBtn.innerText = audio.paused ? '▶' : '⏸';
}

audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);

function toggleMusic() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Expose handlers early so inline HTML onclick/onsubmit work even if later code fails
window.openInvitation = openInvitation;
window.toggleMusic = toggleMusic;

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
async function loadTotalGuests() {
    const totalEl = document.getElementById('total-guests');
    if (!totalEl) return;

    try {
        const { getTotalGuestsAttending } = await import('./backend/rsvp.js');
        const total = await getTotalGuestsAttending();
        totalEl.textContent = total ?? '—';
    } catch (e) {
        console.error(e);
        totalEl.textContent = '—';
    }
}

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
        const { saveRSVP } = await import('./backend/rsvp.js');
        await saveRSVP({ name, attendance, guestCount, plusOneName, wishes });

        alert('Thank you — your RSVP has been saved.');
        form.reset();
        plusOneSection.style.display = 'none';
        await loadTotalGuests();
    } catch (e) {
        console.error(e);
        alert('Unable to save RSVP. Please try again later.');
    } finally {
        submitBtn.disabled = false;
    }
}

window.submitRSVP = submitRSVP;

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

loadTotalGuests();