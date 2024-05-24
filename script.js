const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playlistDiv = document.getElementById('playlist');

const songs = [
	'https://coolinkuk.com/AI/AI%20B2DB/B2db%20heavy%20metal%20(1).mp3',
	'https://coolinkuk.com/AI/AI%20B2DB/05%20b2db%20mexican.mp3',
	'https://coolinkuk.com/AI/AI%20B2DB/06%20b2db%20mexican%20(1).mp3',
	'https://coolinkuk.com/AI/AI%20B2DB/B2db%20heavy%20metal%202.mp3',
	'https://coolinkuk.com/AI/AI%20B2DB/B2db%20heavy%20metal%20(1)%202.mp3',
	'https://coolinkuk.com/AI/AI%20B2DB/B2db%20heavy%20metal.mp3',
];

let currentSongIndex = 0;

function loadSong(index) {
	audio.src = songs[index];
}

function playSong() {
	audio.play();
	playButton.textContent = 'Pause';
}

function pauseSong() {
	audio.pause();
	playButton.textContent = 'Play';
}

function prevSong() {
	currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs.length - 1;
	loadSong(currentSongIndex);
	playSong();
}

function nextSong() {
	currentSongIndex = (currentSongIndex < songs.length - 1) ? currentSongIndex + 1 : 0;
	loadSong(currentSongIndex);
	playSong();
}

playButton.addEventListener('click', () => {
	if (audio.paused) {
		playSong();
	} else {
		pauseSong();
	}
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

audio.addEventListener('ended', nextSong);

// Load the playlist
songs.forEach((song, index) => {
	const songElement = document.createElement('div');
	songElement.textContent = `Song ${index + 1}`;
	songElement.addEventListener('click', () => {
		currentSongIndex = index;
		loadSong(currentSongIndex);
		playSong();
	});
	playlistDiv.appendChild(songElement);
});

// Load the first song
loadSong(currentSongIndex);
