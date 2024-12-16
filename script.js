const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progress = document.getElementById('progress');
const volumeButton = document.getElementById('volume-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeSliderContainer = document.querySelector('.volume-slider-container');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const coverArt = document.getElementById('cover-art');
const background = document.querySelector('.background');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

const playlist = [
    {
        title: "Kilos Milos",
        artist: "Black Sheriff",
        audio: "audio/black sheriff -kilomilos.mp3",
        cover: "images/blacksheriff.jpeg"
    },
    {
        title: "Ye",
        artist: "Burna Boy",
        audio: "audio/Burna Boy - Ye .mp3",
        cover: "images/burnaboy.jpeg"
    },
    {
        title: "Stay High",
        artist: "Juice Wrld",
        audio: "audio/Juice WRLD - Stay High (Official Audio).mp3",
        cover: "images/juicewrld.jpeg"
    }
];

let currentTrack = 0;

function loadTrack(trackIndex) {
    const track = playlist[trackIndex];
    audioPlayer.src = track.audio;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    coverArt.src = track.cover;
    background.style.backgroundImage = `url(${track.cover})`;
    currentTimeDisplay.textContent = '0:00';
    totalTimeDisplay.textContent = '0:00';
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.querySelector('#play-icon').style.display = 'none';
        playPauseButton.querySelector('#pause-icon').style.display = 'block';
    } else {
        audioPlayer.pause();
        playPauseButton.querySelector('#play-icon').style.display = 'block';
        playPauseButton.querySelector('#pause-icon').style.display = 'none';
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audioPlayer.play();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audioPlayer.play();
    
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    progressSlider.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
}

function setProgress() {
    const time = (progressSlider.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
}

playPauseButton.addEventListener('click', playPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);

progressSlider.addEventListener('input', setProgress);

volumeButton.addEventListener('click', () => {
    volumeSliderContainer.classList.toggle('active');
});

volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

document.addEventListener('click', (e) => {
    if (!volumeSliderContainer.contains(e.target) && e.target !== volumeButton) {
        volumeSliderContainer.classList.remove('active');
    }
});

// Initial load
loadTrack(currentTrack);

