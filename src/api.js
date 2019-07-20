
// import description from './index'
// require('./index.js')
const omdbKey = "aefabb3f";

module.exports = {
  getMovies: () => {
    return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}`)
      .then(response => response.json());
  }
};


