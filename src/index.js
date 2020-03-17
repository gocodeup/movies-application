'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here

$(document).ready(function() {

  console.log( 'The DOM has finished loading!' );


const {getMovies, addMovie, getMovieToEdit, editMovie, deleteMovie} = require('./api.js'); //Get the get movies function from the api.js file

let updateMovies = () => {getMovies().then((movies) => { //use the getMovies function to pull all the movies

  $('#all-movies').html(''); // Empty HTML after AJAX call received

  movies.forEach(({title, rating, id}) => { //iterate through each movie object and get the title, rating, and id

    $('#all-movies').append(`<div>id#${id} - ${title} - rating: ${rating}</div><button class="delete-btn" data-id="${id}">Delete</button>`); // put the id, title, and rating into the html


  });
    // $('.delete-btn').click ((e) => { // when the delete button is clicked
    //   console.log($(this).data("id"));
    //   console.log(e);
    //   e.preventDefault(); //Stop the button's default behavior
    //
    //
    //   // deleteMovie($(this).data("id") )// call the delete function
    //   //
    //   //     .then(updateMovies()) //refresh the movie list
    //
    //
    // });

  $('.delete-btn').on("click", function(e){ // when the delete button is clicked
    e.preventDefault(); //Stop the button's default behavior
    console.log(this)
    console.log($(this))
    console.log($(this).data("id"));
  });

}).catch((error) => { //If the AJAX request fails

  console.log(error); //console log the error
  // alert('Oh no! Something went wrong.\nCheck the console for details.'); //display the error message


})};

updateMovies(); // Call updateMovies on page load



// LET USER ADD MOVIE ON BUTTON CLICK

$('#submitBtn').click((e) => {
  e.preventDefault();

  // Add new movie with title and rating given by user inputs

  addMovie({ // Call the add movie function
    "title": $('#new-movie-title').val(), //get the title value
    "rating": $("input[name='rating']:checked").val() //get the rating value
  })
      .then(getMovies()) // once we have the object information --> call the getMovies function
      .then(updateMovies()); // once we have the object information --> call the updateMovies function

  // Clear the values of inputs after submission

  $('#new-movie-title').val(""); // clear the movie title value after submission
  $("input[name='rating']:checked").prop('checked', false); // clear the movie rating after submission
});


// --------------- HIDE THE NEXT STEP OF EDIT----------------

$('#edit-movie-title, #edit-movie-rating, #submitEditBtn').hide(); //hide the edit movies next step


// ---------------EDIT BUTTON ----------------

$('#editBtn').click((e) => { //When the edit movies button is clicked -->

  e.preventDefault(); //Stahp the default behavior

  $("#edit-movie-id, #editBtn").hide(); // hide the edit movie ide input and edit button
  $('#edit-movie-title, #edit-movie-rating, #submitEditBtn').show(); // Show the edit movie inputs and final submit edit button

  getMovieToEdit($('#edit-movie-id').val()) //Get the value of the id
      .then(data => { // When get have the id , take the data and... -->
        $('#edit-movie-title').val(`${data.title}`); // place value of the data.title into the title input
        $('#edit-movie-rating').val(`${data.rating}`); // place the value of the data.rating into the rating input
      });

});


// ---------------SUBMIT THE EDITS BUTTON ----------------

$('#submitEditBtn').click((e) => { // when we click the final submit edit buttion -->

  e.preventDefault(); //Stop the button's default behavior

  let id = $('#edit-movie-id').val(); //What is the id value? -->

  editMovie(id, { // take the id and edit the values

    "title": $('#edit-movie-title').val(), //edit the title value
    "rating": $('#edit-movie-rating').val() //edit the rating value
  })
      .then(getMovies()) //call the getMovies function
      .then(updateMovies()); // call the updateMovies function

  $('#edit-movie-title').val(""); // clear the movie title input value
  $('#edit-movie-rating').val(""); // clear the movie rating inout value

});


// ---------------DELETE MOVIE BUTTON ----------------

});