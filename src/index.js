const $ = require('jquery');


/**
 * es6 modules and imports
 */
import sayHello  from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, refresh, deleteMovie} = require('./api.js');

$('#submit').click(function (e) {
e.preventDefault();
addMovie();
  getMovies().then((movies)=>refresh(movies));
});

$('#submitEdit').click(function (e) {
  e.preventDefault();
  editMovie($('#idNumber').val());
  console.log($('#idNumber').val());
  getMovies().then((movies)=>refresh(movies));

});

$('.deleteButton').click(function (e) {
  e.preventDefault();
  deleteMovie($(this).val());
  getMovies().then((movies)=>refresh(movies));
  console.log('click')
});

getMovies().then((movies) => {
  refresh(movies);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});




