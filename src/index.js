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


const populateMovies = getMovies().then((movies) => {
  $('#loading').remove();
  movies.forEach(({title, rating, id}) => {
    $('#container').append(`<h1>${title}</h1>`);
    $('#container').append(`<p>${rating}</p>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$('#addMovie').click(function () {
  const newMovieTitle = $('#newMovieTitle').val();
  const newMovieRating = $('#newMovieRating').val();
    const newMovie = {title: newMovieTitle, rating: newMovieRating};
    const url = './api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(data => {
            console.log(data);
            getMovies();
        })
        .catch();
})

