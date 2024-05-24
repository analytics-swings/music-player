const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playlistDiv = document.getElementById('playlist');
const currentSongElement = document.getElementById('current-song');
const directoryStructureDiv = document.getElementById('directory-structure');

let currentSongIndex = 0;
let currentFolder = '';
let songs = [];

async function fetchDirectoryStructure() {
	const response = await fetch('music-data.json');
	return await response.json();
}

function loadSong(index) {
	audio.src = songs[index];
	currentSongElement.textContent = decodeURIComponent(songs[index].split('/').pop());
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

function loadPlaylist(folder, folderName) {
	currentFolder = folderName;
	songs = folder.map(song => `https://coolinkuk.com/AI/${folderName}/${song}`);
	currentSongIndex = 0;
	loadSong(currentSongIndex);
	renderPlaylist();
}

function renderDirectoryStructure(directoryStructure) {
	const ul = document.createElement('ul');
	for (const folder in directoryStructure['AI']) {
		const li = document.createElement('li');
		li.textContent = folder;
		li.addEventListener('click', () => {
			loadPlaylist(directoryStructure['AI'][folder], folder);
		});
		ul.appendChild(li);
	}
	directoryStructureDiv.appendChild(ul);
}

function renderPlaylist() {
	playlistDiv.innerHTML = '';
	songs.forEach((song, index) => {
		const songElement = document.createElement('div');
		songElement.textContent = decodeURIComponent(song.split('/').pop());
		songElement.addEventListener('click', () => {
			currentSongIndex = index;
			loadSong(currentSongIndex);
			playSong();
		});
		playlistDiv.appendChild(songElement);
	});
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

// Initialize the directory structure and load the first playlist
fetchDirectoryStructure().then(directoryStructure => {
	renderDirectoryStructure(directoryStructure);
	const firstFolder = Object.keys(directoryStructure['AI'])[0];
	loadPlaylist(directoryStructure['AI'][firstFolder], firstFolder);
});
