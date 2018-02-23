import getMovies from './api';

let title = document.getElementById('searchVal');

document.getElementById('searchVal').addEventListener('change', () => getMovies(title.value));
