
// import description from './index'
require('./movieSearch.js')
const omdbKey = "aefabb3f";

module.exports = {
  getMovies: () => {
       return fetch('/api/movies')
      .then(response => response.json());
  }
};


