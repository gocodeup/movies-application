


// module.exports = {
//   getMovies: () => {
//     return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}`)
//       .then(response => response.json());
//   }
// };

module.exports = {
  getMovies: () => {
    return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=batman`)
        .then(response => response.json());
  }
};

