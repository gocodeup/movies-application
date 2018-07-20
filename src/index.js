/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

function runMovie() {
    const {getMovies} = require('./api.js');
    const $ = require('jquery');

    getMovies().then((movies) => {
        $('#loading').hide();
        console.log('Here are all the movies:');
        $('#movieList').html("");
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);

            $('#movieList').append(`<div id = ${id}><p><strong>Title:</strong> ${title}</p>
      <strong>Rating:</strong> ${rating}</div>`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}
runMovie();


// $("#addMovie").submit(function() {
//     $(this).preventDefault();
// });

$('#submit').click( e => {
  e.preventDefault();

  let title = $('#movieTitle').val();
  let rating = $('#rating').val();

  $.post("/api/movies", {
    title: title,
    rating: rating
  }).complete( () => console.log("Success!"))

});

