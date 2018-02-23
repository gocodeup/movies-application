import getMovies from './omdb';

let title = document.getElementById('searchVal');

document.getElementById('searchVal').addEventListener('change', () => getMovies(title.value));
