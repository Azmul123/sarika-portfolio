// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    htmlElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect with Syncing Icons
const words = ["Musician", "Coder", "Artist", "Programmer"];
const icons = ["icon-musician", "icon-coder", "icon-artist", "icon-coder"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function typeEffect() {
    const currentWord = words[wordIndex];
    const typingTextElement = document.querySelector('.typing-text');
    
    // Sync the correct icon
    document.querySelectorAll('.icon-wrapper').forEach(icon => icon.style.display = 'none');
    document.getElementById(icons[wordIndex]).style.display = 'inline-block';

    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }

    // Word completed typing
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
    } 
    // Word completed deleting
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Pause before new word
    }

    setTimeout(typeEffect, typingDelay);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector('.typing-text')) {
        setTimeout(typeEffect, 1000);
    }
});


// Terminal OS Window Animation
const terminalContent = document.getElementById('terminal-content');

const terminalSequence = [
    { type: 'input', text: 'whoami' },
    { type: 'output', text: 'Sarika Mandal', delay: 400 },
    { type: 'input', text: 'cat education.txt' },
    { type: 'output', text: '1st Sem B.Tech CSE Student @ Narula Institute of Technology', delay: 400 },
    { type: 'input', text: './run_goals.sh' },
    { type: 'output', text: '<span class="text-green">[OK] Initializing Artificial Intelligence...<br>[OK] Building Web Dev foundations...<br>> Mission: Turning learning into impactful digital solutions.</span>', delay: 800 }
];

let termHasAnimated = false;

function typeText(element, text) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, 60); // Typing speed
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTerminalAnimation() {
    if (termHasAnimated) return;
    termHasAnimated = true;
    terminalContent.innerHTML = '';
    
    // Create the blinking cursor element
    const cursorHTML = '<span class="prompt">sarika:~$</span> <span class="blink">_</span>';
    
    for (let i = 0; i < terminalSequence.length; i++) {
        const step = terminalSequence[i];
        
        if (step.type === 'input') {
            const line = document.createElement('div');
            line.className = 'line';
            line.innerHTML = '<span class="prompt">sarika:~$</span> <span class="typing-cmd"></span><span class="blink">_</span>';
            terminalContent.appendChild(line);
            
            const typingSpan = line.querySelector('.typing-cmd');
            const blinkSpan = line.querySelector('.blink');
            
            await sleep(300); // Wait before typing
            await typeText(typingSpan, step.text);
            
            blinkSpan.remove(); // Remove cursor after command is typed and executed
            await sleep(200); 
        } else {
            const outputLine = document.createElement('div');
            outputLine.className = 'output';
            outputLine.innerHTML = step.text;
            terminalContent.appendChild(outputLine);
            await sleep(step.delay || 400);
        }
    }
    
    // Add final prompt
    const finalLine = document.createElement('div');
    finalLine.className = 'line';
    finalLine.innerHTML = cursorHTML;
    terminalContent.appendChild(finalLine);
}

// Start terminal animation when it scrolls into view
if (terminalContent) {
    // Initial state before animation triggers
    terminalContent.innerHTML = '<div class="line"><span class="prompt">sarika:~$</span> <span class="blink">_</span></div>';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runTerminalAnimation();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(terminalContent.parentElement);
}



// Editor Window Animation
const editorContent = document.getElementById('editor-content');
let editorHasAnimated = false;

function runEditorAnimation() {
    if (editorHasAnimated) return;
    editorHasAnimated = true;
    
    const lines = editorContent.querySelectorAll('.line');
    let delay = 0;
    
    lines.forEach((line) => {
        setTimeout(() => {
            line.classList.add('show-code');
        }, delay);
        
        const textLength = line.textContent.length || 1;
        delay += (textLength * 15) + 150; 
        
        setTimeout(() => {
            line.style.whiteSpace = 'normal';
        }, delay + 1000);
    });
}

if (editorContent) {
    const editorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay so it doesn't start exactly at the same time as terminal
                setTimeout(runEditorAnimation, 500); 
            }
        });
    }, { threshold: 0.5 });
    
    editorObserver.observe(editorContent.parentElement);
}


// --- Audio Player Logic ---
const audioPlayer = document.getElementById('main-audio-player');
const playBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-track');
const nextBtn = document.getElementById('next-track');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');
const vinylRecord = document.getElementById('vinyl-record');
const trackTitleDisplay = document.getElementById('track-title');
const trackArtistDisplay = document.getElementById('track-artist');

// Playlist Data
const playlist = [
    {
        title: 'Song One',
        artist: 'Acoustic Cover',
        src: 'assets/audio/uploaded_media_0_1790489444665.mp3'
    },
    {
        title: 'Song Two',
        artist: 'Vocal Melody',
        src: 'assets/audio/uploaded_media_1_1790489444665.mp3'
    },
    {
        title: 'Song Three',
        artist: 'Classical Rendition',
        src: 'assets/audio/uploaded_media_2_1790489444665.mp3'
    }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = playlist[index];
    trackTitleDisplay.textContent = track.title;
    trackArtistDisplay.textContent = track.artist;
    audioPlayer.src = track.src;
    // reset progress
    progressBar.style.width = '0%';
    currentTimeDisplay.textContent = '0:00';
}

function playTrack() {
    audioPlayer.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    vinylRecord.classList.add('playing');
}

function pauseTrack() {
    audioPlayer.pause();
    playIcon.classList.add('fa-play');
    playIcon.classList.remove('fa-pause');
    vinylRecord.classList.remove('playing');
}

// Toggle Play
if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });
}

// Next / Prev Track
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });
}

// Auto play next track when ended
if (audioPlayer) {
    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    // Update Progress
    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeDisplay.textContent = formatTime(currentTime);
        }
    });

    // Load metadata (duration)
    audioPlayer.addEventListener('loadeddata', () => {
        totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
    });
}

// Set Progress Bar via Click
if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    });
}

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize first track
if (audioPlayer) {
    loadTrack(currentTrackIndex);
    audioPlayer.volume = 0.5;
    if (typeof updateVolumeIcon === 'function') updateVolumeIcon(0.5);
}

// Volume Control Logic
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

if (volumeSlider && audioPlayer) {
    volumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        audioPlayer.volume = volume;
        updateVolumeIcon(volume);
    });

    volumeIcon.addEventListener('click', () => {
        if (audioPlayer.volume > 0) {
            audioPlayer.dataset.lastVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
        } else {
            const lastVol = audioPlayer.dataset.lastVolume || 1;
            audioPlayer.volume = lastVol;
            volumeSlider.value = lastVol;
        }
        updateVolumeIcon(audioPlayer.volume);
    });
}

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}
