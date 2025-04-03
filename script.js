const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

// Song List
const songs = [
    { title: "Can't Help Falling in Love", 
      artist: " Elvis Presley",
      src: "https://raw.githubusercontent.com/NOVABROWN/Music-Player1/main/Songs/Elvis%20Presley%20-%20Can%27t%20Help%20Falling%20In%20Love%20(Official%20Audio).mp3", 
      cover: "https://upload.wikimedia.org/wikipedia/en/3/3c/Can%27t_Help_Falling_in_Love_by_Elvis_Presley_US_picture_sleeve.png"
    },
    { title: "this is what falling in love feels like",
      artist: "JVKE",
      src: "https://raw.githubusercontent.com/NOVABROWN/Music-Player1/main/Songs/JVKE%20-%20this%20is%20what%20falling%20in%20love%20feels%20like%20(Lyrics).mp3", 
      cover: "https://i.scdn.co/image/ab67616d0000b273fc4add7266fbfa07c6b16b1c"
    }
];

let songIndex = 0;

// Load Song
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;

// Highlight active song
document.querySelectorAll(".song-item").forEach(item => item.classList.remove("highlight"));
document.getElementById(song.title).classList.add("highlight");
}

// Play & Pause
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<img src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-pause-icon-png-image_4419908.jpg">';
    } else {
        audio.pause();
        playBtn.innerHTML = '<img src="https://icons.veryicon.com/png/o/internet--web/web-video-clip/play-332.png">';
    }
}

// Next & Previous
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

// Progress Bar
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Event Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Load First Song
loadSong(songs[songIndex]);
audio.addEventListener("ended", nextSong);