const fragment = document.createDocumentFragment();
const container = document.querySelector('section');
const dataAudio = async () => {
  const data = await fetch('./audios.json');
  const res = await data.json();
  console.log(res);
};

dataAudio();

const btnList = document.getElementById('btn-list');
const containerListSongs = document.querySelector('.container-list-songs');
btnList.addEventListener('click', () => {
  containerListSongs.classList.toggle('animation');
});
