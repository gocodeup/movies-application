const $ = require('jquery');

/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  $('.movie-database').html('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('.main-container').append(`id#${id} - ${title} - rating: ${rating} `);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

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