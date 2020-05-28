const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log(movies);
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#loading-message').html('');
    $('.container').append(`<div>id#${id} - ${title} - rating: ${rating}</div>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// store inputs for new movie
const newTitle = $('#mtitle').val();
const newRating = $('#mrating').val();

// stores current length of movie list
const moviesList = getMovies().then((movies) => console.log(movies.length));

// create new movie object for json
const newMovie = {title: `${newTitle}`, rating: `${newRating}`, id: `${moviesList}`};

// console.log(`${newTitle}`);
// console.log(`${newRating}`);
console.log(newMovie);

// POST to DB
// const moviePostTest = {title: 'Toy Story', rating: "5", id: 4};
// const url = '/api/movies';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(moviePostTest),
// };
// fetch(url, options)
//     .then(response => {
//       console.log(response);
//     })
//     .catch(response => console.log('Failed'));


$('#mbutton').click(() => {
  const moviePostTest = {title: `${newTitle}`, rating: `${newRating}`, id: `${moviesList().length + 1}`};
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moviePostTest),
  };
  fetch(url, options)
      .then(response => {
        console.log(response);
      })
      .catch(response => console.log('Failed'));
});