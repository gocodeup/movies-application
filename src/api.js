const omdb = require('omdb-js')('544a671d');

const getMovies = (title) => {
  console.log(title);
  omdb.searchForMovie(title, {type: 'movie', r: 'json', page: 1}).then(results => {
    console.log(results);
  });
};

export default getMovies;
