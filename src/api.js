const omdb = require('omdb-js')('544a671d');

const getMovies = search => {
  omdb.searchForMovie('matrix', {type: 'movie', r: 'json', page: 1}).then(results => {
    console.log(results);
  });
};

export default getMovies;
