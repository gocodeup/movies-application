/*   ES6 MODULES & IMPORTS  */
// NOTE: ONLY HAVE 'REQUIRE' OR 'IMPORT' METHOD FOR EACH FUNCTION @ THE TOP OF THE PAGE...NOT BOTH!

// const $ = require('jquery'); // Enables jQuery
const {getMovies} = require('./api.js'); // Retrieves movie API data
const {addMovie} = require('./api.js'); // Enables "Add Movie" function
const {deleteMovie} = require('./api.js'); // Enables "Delete Movie" function
const {editMovie} = require('./api.js'); // Enables "Edit Movie" function

//-------ADDING RETRIEVED MOVIES TO AN HTML TABLE WITH REFRESH BUTTON: START-----------

  var displayMovie = 0;

  function loadData() {
    console.log("load data function");

    if (displayMovie === 0) {
      $.get("/api/movies").done(function (data) {
        console.log(data);
        $('#insertMovies').html("");
        $.each(data, function (i, item) {
          $('#insertMovies').append(
              '<tr>' +
              '<td class="text-center">' + item.id + '</td>' +
              '<td>' + '<em>' + item.title + '</em>' + '</td>' +
              '<td class="text-center">' + item.genre + '</td>' +
              '<td class="text-center">' + item.rating + '</td>' +
              // '<td class="text-center">' + '<button type="submit" class="remove-movie btn btn-danger" data-id="movie-id" id="' + item.id.toString() + '">' + 'Remove' + '</button>' + '</td>' +
              '<td class="text-center">' + '<button type="submit" class="remove-movie btn btn-danger" data-toggle="modal" data-target="#exampleModalLong" data-id="movie-id" id="' + item.id.toString() + '">' + 'Remove' + '</button>' + '</td>' +
              '</tr>')
        })
      })


    }
    return displayMovie = 1;
  }
  loadData(displayMovie);



//-------ADDING RETRIEVED MOVIES TO AN HTML TABLE WITH REFRESH BUTTON: END-----------

//-------GET MOVIES: START-----------

getMovies().then((movies) => {
  movies.forEach(({title, rating, id}) => {
  });
}).catch((error) => {
  alert('"getMovies" function is not working. Check JS console for details...');
  console.log(error);
});

//-------GET MOVIES: END-----------

//-------DELETE MOVIE: START-----------

$(document).on('click','.remove-movie', function () {
  console.log('remove button clicked');
  let movieId = $(this).attr('id');
  $('#exampleModalLong').modal('show');
  $('#exampleModalLong').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });
  displayMovie = 0;
  $('#confirm-delete').click(function () {
    // $('#exampleModalLong').css('display', 'none');
    $('#exampleModalLong').modal('hide');
    deleteMovie(movieId).then(response => {
      console.log(response);
      loadData();
    });
  })
  // if (warning === true){
  //   console.log(movieId);

  // }
});

const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const movieTitle = document.querySelector('#movie-title');
const movieRating = document.querySelector('#movie-rating');
const movieGenre = document.querySelector('#movie-genre');

//-------DELETE MOVIE: END-----------

//-------REFRESH MOVIES: START-----------

const movieRefresh = () => {
  getMovies().then((movies) => {
  }).catch((error) => {
    alert('"movieRefresh" function is not working. Check JS console for details...');
    console.log(error);
  });
};

//-------REFRESH MOVIES: END-----------

//-------ADD MOVIE: START-----------

$('#add-movie').click(function (e) {
  e.preventDefault();
  const addedMovieTitle = movieTitle.value;
  const addedMovieRating = movieRating.value;
  const addedMovieGenre = movieGenre.value;
  const addedMovie = {
    title: addedMovieTitle,
    rating: addedMovieRating,
    genre: addedMovieGenre
  };

  addMovie(addedMovie);
  console.log(addedMovie);
  movieRefresh();
});

//Clicking the "Add Movie" button will refresh the table data and auto-populate new entry
$("#add-movie").click(function () {
  $('#insertMovies').html("");
  return loadData(displayMovie = 0);
});

//-------ADD MOVIE: END-----------

//-------EDIT MOVIE: START-----------

$('#edit-submit').on('click', function(e) {
  e.preventDefault();
  let movieName = $('#editTitle').val();
  let rating = $('#editRating').val();
  let newGenre = $('#editGenre').val();
  let editId = $('#editId').val();

  $('#editTitle').val('');
  $('#editRating').val('');
  $('#editGenre').val('');
  $('#editId').val('');

  let movieData = {title: movieName, rating: rating, genre: newGenre};
  console.log(movieData);
  editMovie(movieData, editId);
  movieRefresh();
});

//Clicking the "Edit Movie" button will refresh the table data and auto-populate with the Edited entry
$("#edit-submit").click(function () {
  $('#insertMovies').html("");
  return loadData(displayMovie = 0);
});

//-------EDIT MOVIE: END-----------
