const omdb = require('omdb-js')('544a671d');

const search = document.getElementById('searchVal').value();

const getMovies = search => {
  omdb.searchForMovie(search, {type: 'movie', r: 'json', page: 1}).then(results => {
    console.log(results);
  });
};

document.addEventListener('oninput', getMovies());

export default getMovies;
