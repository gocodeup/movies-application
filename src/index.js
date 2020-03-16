const $ = require('jquery');


/**
 * es6 modules and imports
 */
import sayHello  from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

// refresh start
var refresh = (movies) => {

  console.log('Here are all the movies:');
  $('#movies').html('');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);

    $('#movies').append(
        `<li>id#${id} - ${title} - rating: ${rating}</li>` +
        `<button value="${id}" type="submit" class="deleteButton">delete</button>`)

  });
  $('li').click(function () {
    console.log('hi there');
    $(this).toggleClass('highlighted')
  });

  $('.deleteButton').click(function (e) {
    e.preventDefault();
    deleteMovie($(this).val());
    getMovies().then((movies)=>refresh(movies));
    console.log('click')
  });
  // $('li').css('color', 'yellow');
};
// refresh end

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

// $('.deleteButton').click(function (e) {
//   e.preventDefault();
//   deleteMovie($(this).val());
//   getMovies().then((movies)=>refresh(movies));
//   console.log('click')
// });

getMovies().then((movies) => {
  refresh(movies);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});




