const fragment = document.createDocumentFragment();
const container = document.querySelector('section');
const btnList = document.getElementById('btn-list');
const containerListSongs = document.querySelector('.container-list-songs');
const previous = document.getElementById('previous');
const pause = document.getElementById('pause');
const play = document.getElementById('play');
const next = document.getElementById('next');
const containerAudio = document.querySelector('.container-audio');
let audio = document.getElementById('audio');
const audioDescription = document.querySelector('.audio-description');
const backgrounImg = document.querySelector('.backgroun-img');
const pathPre = document.querySelector('#previous svg path');
const pathNex = document.querySelector('#next svg path');

let arraySongs = [];
// audio.addEventListener('timeupdate', updateProgress);

window.addEventListener('DOMContentLoaded', () => {
  dataAudio();
  audio = new Audio(
    'https://scummbar.com/mi2/MI1-CD/01%20-%20Opening%20Themes%20-%20Introduction.mp3'
  );
});

play.addEventListener('click', () => {
  audio.play();
  pause.classList.remove('inactive');
  play.classList.add('inactive');
});
pause.addEventListener('click', () => {
  pause.classList.add('inactive');
  play.classList.remove('inactive');
  audio.pause();
});
previous.addEventListener('click', () => {
  if (audio.id == 0) {
    pathPre.classList.add('previous');
  }
  audio.id--;
  loadSong(audio.id);
  audio.pause();
  setTimeout(() => {
    audio.play();
  }, 100);
});
next.addEventListener('click', () => {
  audio.id++;
  loadSong(audio.id);
  audio.pause();
  setTimeout(() => {
    audio.play();
  }, 100);
  audio.addEventListener('timeupdate', updateProgress);
});

containerListSongs.addEventListener('click', (e) => {
  let id = null;
  if (e.target.id) {
    id = e.target.id;
  }
  if (e.target.id !== audio.id) {
    pause.classList.add('inactive');
    play.classList.remove('inactive');
    audio.pause();
    // console.log('es la misma cancion ');
  }
  setTimeout(() => {
    play.classList.add('inactive');
    pause.classList.remove('inactive');
    audio.play();
  }, 900);

  loadSong(id);
  e.preventDefault();
});

btnList.addEventListener('click', () => {
  containerListSongs.classList.toggle('animation');
});

const dataAudio = async () => {
  const data = await fetch('./audios.json');
  const res = await data.json();
  arraySongs = res;

  printNameSongs(res);
};

const printNameSongs = (data) => {
  const templateListSongs =
    document.getElementById('templateListSongs').content;
  const olList = document.querySelector('.ol-list');

  olList.innerHTML = '';

  data.forEach((element) => {
    const clone = templateListSongs.cloneNode(true);
    clone.querySelector('a').textContent = `${element.title}-${element.artist}`;
    clone.querySelector('a').setAttribute('id', element.id);
    fragment.appendChild(clone);
  });

  olList.appendChild(fragment);
};

const loadSong = async (id) => {
  containerAudio.innerHTML = '';
  const data = await fetch('./audios.json');
  const res = await data.json();
  res.filter((song) => {
    if (song.id == id) {
      audio = new Audio(`${song.url}`);
      audio.setAttribute('id', song.id);
      audioDescription.querySelector('h2').textContent = `${song.title}`;
      audioDescription.querySelector('p').textContent = `${song.artist}`;
      backgrounImg.style.backgroundImage = `url(${song.image})`;
    }
  });
  if (audio.id > 0) {
    pathPre.classList.remove('previous');
  } else if (audio.id == 0) {
    pathPre.classList.add('previous');
  }
  if (audio.id == arraySongs.length - 1) {
    pathNex.classList.add('previous');
  } else if (audio.id < arraySongs.length - 1) {
    pathNex.classList.remove('previous');
  }
  containerAudio.appendChild(audio);
};

const updateProgress = (e) => {
  const progress = document.getElementById('progress');
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
};
