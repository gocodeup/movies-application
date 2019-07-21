//



const omdbKey ='d60b1c83';

// module.exports = {
//   getMovies: () => {
//     return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}`)
//       .then(response => response.json());
//   }
// };

//
// module.exports = {
//   getMovies: () => {
//     return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=batman`)
//         .then(response => response.json());
//   }
// };

const $ = require('jquery');


// module.exports = {
   const getMovies= () => {
    return fetch('/api/movies')
        .then(response => response.json());
  };


// exports = {
  const addMovies = () => {
    let title = $('#inputTitle').val();
    let rating = $('input:radio[name=rating]:checked').val();

    // let rating = $('#inputRating').val();

    const addedMovie = {title: title, rating: rating};
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedMovie),
    };
    fetch('/api/movies', options)
        .then(() => console.log('added the movie'))
        .catch(error => console.log('error'))
  };


export default {getMovies, addMovies}












