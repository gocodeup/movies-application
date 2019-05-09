/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
<<<<<<< Updated upstream
const {getMovies} = require('./api.js');
=======

const $ = require('jquery');


const {getMovies, addNewMovie, deleteMovie, displayMovies} = require('./api.js');
>>>>>>> Stashed changes

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
<<<<<<< Updated upstream
=======

$('#add-movie').click(function(event){
  //prevents the page from refreshing
  event.preventDefault();

  // //mmmm...store the value of the text inputs into variables
    let movieTitle = $("#movie-title").val();
    let rating = $("#movie-rating").val();
    addNewMovie(movieTitle, rating);
  // // call addMovies, passing in those variables

});

$("#deleteBtn").on("click", function () {
  alert("click");
//  code to send Delete request
});
>>>>>>> Stashed changes
