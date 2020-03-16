'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here

const {getMovies, addMovie, getMovieToEdit, editMovie} = require('./api.js'); //Get the get movies function from the api.js file

const updateMovies = () => getMovies().then((movies) => { //use the getmovies function to pull all the movies

  $('#all-movies').html(''); // Empty HTML after AJAX call received

  movies.forEach(({title, rating, id}) => { //iterate through each movie object and get the title, rating, and id


    $('#all-movies').append(`<div>id#${id} - ${title} - rating: ${rating}</div>`); //console.log the id, title, and rating

  });

}).catch((error) => { //If the AJAX request fails

  alert('Oh no! Something went wrong.\nCheck the console for details.'); //display the error message

  console.log(error); //console log the error

});

updateMovies(); // Call updateMovies on page load



// LET USER ADD MOVIE ON BUTTON CLICK

$('#submitBtn').click((e) => {
  e.preventDefault();

  // Add new movie with title and rating given by user inputs

  addMovie({
    "title": $('#new-movie-title').val(),
    "rating": $("input[name='rating']:checked").val()
  })
      .then(getMovies())
      .then(updateMovies());

  // Clear the values of inputs after submission

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

  getMovieToEdit($('#edit-movie-id').val())
      .then(data => {
        $('#edit-movie-title').val(`${data.title}`)
        $('#edit-movie-rating').val(`${data.rating}`);
      });

});


// ---------------SUBMIT THE EDITS BUTTON ----------------

$('#submitEditBtn').click((e) => {

  e.preventDefault();

  let id = $('#edit-movie-id').val();

  editMovie(id, {
    // "id": $('#edit-movie-id').val(),
    "title": $('#edit-movie-title').val(),
    "rating": $('#edit-movie-rating').val()
  })
      .then(getMovies())
      .then(updateMovies());

  $('#edit-movie-title').val("");
  $('#edit-movie-rating').val("");

});