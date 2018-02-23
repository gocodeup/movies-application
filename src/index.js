import getMovies from './omdb';

setTimeout(() => {
  document.querySelector('main').style.display = 'block';
  document.getElementById('loading').style.display = 'none';
}, 2000);

let title = document.getElementById('searchVal');

document.getElementById('searchVal').addEventListener('change', () => getMovies(title.value));
