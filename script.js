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
function submitRSVP(event) {
    event.preventDefault();
    alert("Thank you for your RSVP! (Note: Connect this form to a backend service to actually save data).");
}

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