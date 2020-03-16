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
    console.log(`${title} rating: ${rating}`);

    $('#movies').append(
        `<div class="cards">` +
        `<li>${title} rating: ${rating}</li>` +
        `<span class="starRating">` +
        `<input id="${id}rating5" type="radio" name="${rating}" value="5">`+
        `<label for="${id}rating5">5</label>`+
        `<input id="${id}rating4" type="radio" name="${rating}" value="4">`+
        `<label for="${id}rating4">4</label>`+
        `<input id="${id}rating3" type="radio" name="${rating}" value="3">`+
        `<label for="${id}rating3">3</label>`+
        `<input id="${id}rating2" type="radio" name="${rating}" value="2">`+
        `<label for="${id}rating2">2</label>`+
        `<input id="${id}rating1" type="radio" name="${rating}" value="1">`+
        `<label for="${id}rating1">1</label>`+
        `</span>`+
        `<button value="${id}" type="submit" class="deleteButton">delete</button>`+
        `<div>`)
  });
  $('.starRating').children().click(function () {
    console.log(stars);
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

// $('#submitEdit').click(function (e) {
//   e.preventDefault();
//   editMovie($('#idNumber').val());
//   console.log($('#idNumber').val());
//   getMovies().then((movies)=>refresh(movies));
//
// });

$('#submitEdit').click(function (e) {
  e.preventDefault();
 let id = $('#idNumber').val();
 editMovie(id, {
   "rating": $('#ratingEdit').val()
 });
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




