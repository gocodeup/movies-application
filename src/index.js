'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here


$(document).ready(function() {

  // --------------- FUNCTIONS TO BA CALLED LATER ----------------

  const {getMovies, addMovie, getMovieToEdit, editMovie, deleteMovie} = require('./api.js'); //Get the get movies function from the api.js file



  let updateMovies = () => {getMovies().then((movies) => { //use the getMovies function to pull all the movies

    $('#all-movies').html(''); // Empty HTML after AJAX call received

    movies.forEach(({title, rating, id, posterUrl, director, actors, plot}) => { //iterate through each movie object and get the title, rating, and id

      $('#all-movies').append(`
    <div class="card">
        <img class="card-img" src="${posterUrl}">
        <div class="card-body">
          <div class="card-rating"> Rating: ${rating}</div>
          <h3 class="card-title">${title}</h3>
          <div class="card-director">${director}</div>
          <div class="card-actors">${actors}</div>
          <div class="card-plot">${plot}</div>
        </div>
        <div>
            <i class="fas fa-trash-alt delete-btn" data-id="${id}"></i>
        </div>
    </div>`); // put the id, title, and rating into the html
    // <button class="delete-btn" data-id="${id}">Delete</button>

    });


    // --------------- DELETE MOVIE ENTRIES ----------------

    $('.delete-btn').on("click", function(e){ // when the delete button is clicked

      e.preventDefault(); //Stop the button's default behavior

      // console.log($(this).data("id")); //get the id of the current clicked button

      deleteMovie($(this).data("id"))// call the delete function for the clicked delete button id

          .then(updateMovies()) //refresh the movie list


    });


  // --------------- WHAT'S THE CATCH? ----------------

  }).catch((error) => { //If the AJAX request fails

    console.log(error); //console log the error
    // alert('Oh no! Something went wrong.\nCheck the console for details.'); //display the error message


  })};


  // --------------- UPDATE MOVIES ----------------

  updateMovies(); // Call updateMovies on page load



  // --------------- USER ADD BUTTON ----------------

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


});


// --------------- BLOB ANIMATION ----------------

const box = document.querySelector('.box');

setInterval(setBorderRadius, 300);

function setBorderRadius() {
  box.style.setProperty('--br-blobby', generateBorderRadiusValue());
  box.style.setProperty('--br-blobby-after', generateBorderRadiusValue());
  box.style.setProperty('--br-blobby-before', generateBorderRadiusValue());
}

function generateBorderRadiusValue() {
  return `${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% / ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}%`;
}

function getRandomValue() {
  return Math.floor(Math.random() * 50) + 50;
}