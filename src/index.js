'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here

const {getMovies, addMovie} = require('./api.js'); //Get the get movies function from the api.js file

const updateMovies = () => getMovies().then((movies) => { //use the getmovies function to pull all the movies

  $('#all-movies').html(''); // Empty HTML after AJAX call received

  movies.forEach(({title, rating, id}) => { //iterate through each movie object and get the title, rating, and id


    $('#all-movies').append(`<div>id#${id} - ${title} - rating: ${rating}</div>`); //console.log the id, title, and rating

  });

}).catch((error) => { //If the AJAX request fails

  alert('Oh no! Something went wrong.\nCheck the console for details.'); //display the error message

  console.log(error); //console log the error

});

updateMovies();


// ADD MOVIES CALL RESPONSE

// addMovie(newTitle, newRating)
//     .then(data => updateMovies());


// LET USER ADD MOVIE ON BUTTON CLICK

$('#submitBtn').click((e) => {
  e.preventDefault();

  addMovie({
    "title": $('#new-movie-title').val(),
    "rating": $("input[name='rating']:checked").val()
  })
      .then(data => getMovies())
      .then(movies => updateMovies());

  $('#new-movie-title').val("");
  $("input[name='rating']:checked").prop('checked', false);
});


// --------------- HIDE THE NEXT STEP OF EDIT----------------

$('#edit-movie-title, #edit-movie-rating, #submitEditBtn').hide();


// ---------------EDIT BUTTON ----------------

$('#editBtn').click((e) => {

  e.preventDefault();

  $("#edit-movie-id, #editBtn").hide();
  $('#edit-movie-title, #edit-movie-rating, #submitEditBtn').show();


});


// ---------------SUBMIT THE EDITS BUTTON ----------------

$('#submitEditBtn').click((e) => {

  e.preventDefault();

  editMovie( id , {
    "title": $('#new-movie-title').val(),
    "rating": $("input[name='rating']:checked").val()
  })
      .then(data => getMovies())
      .then(movies => updateMovies());

  $('#new-movie-title').val("");
  $("input[name='rating']:checked").prop('checked', false);

});