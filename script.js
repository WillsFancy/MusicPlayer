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

playPauseButton.addEventListener('click', playPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

audioPlayer.addEventListener('ended', nextTrack);

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
