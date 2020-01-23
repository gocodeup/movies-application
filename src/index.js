const $ = require('jquery');

/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies, getMovie} = require('./api.js');

let $movies = $('#movies');


getMovies().then((movies) => {
  $('.movie-database').html('Here are all the movies:');
  movies.forEach(({title, rating, id, genre}) => {
    $movies.append(`<div class="card"><div><ul class="list-group list-group-flush"><li>ID: ${id}</li><li>Title: ${title}</li><li>Rating: ${rating}</li><li>Genre: ${genre}</li><li><button class="btn-dark delete" value="${id}">DELETE</button></li></ul></div></div>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

// getMovie().then((movies) => {
//   $('.movie-database').html('Here is your search:');
//   movies(({title, rating, id}) => {
//     $('.main-container').html(`id#${id} - ${title} - rating: ${rating} `);
//   });
//
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });

console.log(getMovie(1));


//Function for loading screen
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});
function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $( "#loadingDiv" ).remove(); //makes page more lightweight
  });
}