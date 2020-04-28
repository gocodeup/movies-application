/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

function refreshMovies () {
  getMovies()
      .then((movies) => {
        $('#load').html('');
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
          console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
      }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

refreshMovies();

function addMovie () {
  movies.push({
    "title": $("#movie-title-input").val(),
    "rating": $("#rating").val(),
    "id": movies.length,
  });
}

$("#add-button").click(function () {
  addMovie();
  refreshMovies();
});
