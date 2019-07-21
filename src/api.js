
import description from './index'
require('./index.js')
const omdbKey = "aefabb3f";

module.exports = {
  getMovies: () => {
    return fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=aefabb3f&tbatman`)
      .then(response => response.json());
  }
};


// return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}`)
