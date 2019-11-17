/**
 * es6 modules and imports
 */
import sayHello from './hello';
//import $ from 'jquery';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, deleteMovie, patchMovie, getMovie} = require('./api.js');
var movieEditObject = {};

displayMovies();

$(document).on('click','.edit_movie', function (e) {
  e.preventDefault();

  let idEdit = $(this).attr('id');
  getMovie(idEdit)
      .then(movie => {
        movieEditObject.id = movie.id;
        movieEditObject.title = movie.title;
        movieEditObject.date = movie.date;
        movieEditObject.genre = movie.genre;
        movieEditObject.rating = movie.rating;
        movieEditObject.description = movie.description;

        $('#movieEditInput').val(movieEditObject.title);
        $('#movieEditDate').val(movieEditObject.date);
        $('#genreMultiSelectEdit').val(movieEditObject.genre);
        switch (movieEditObject.rating) {
          case "1":
            $('#ratingRadios1e').prop("checked", true);
            break;
          case "2":
            $('#ratingRadios2e').prop("checked", true);
            break;
          case "3":
            $('#ratingRadios3e').prop("checked", true);
            break;
          case "4":
            $('#ratingRadios4e').prop("checked", true);
            break;
          case "5":
            $('#ratingRadios5e').prop("checked", true);
            break;
        }
        $('#movieDescriptionInputEdit').val(movieEditObject.description);
      })
      .catch(() => console.log("Error looking at the book."));


});

$('#editMovieClick').click(function (e) {
  //e.preventDefault();

  let editedMovie = {
    title: $('#movieEditInput').val(),
    date: $('#movieEditDate').val(),
    rating: $('input[name="gridRadios"]:checked').val(),
    genre: "",
    description: $('#movieDescriptionInputEdit').val()
  };

  patchMovie(editedMovie, movieEditObject.id)
      .then(displayMovies).catch(error => console.log(`There was an error: ${error}`));

  //$('#editMovieModal').modal('hide');
  $('#editMovieModal').modal('toggle');
});


$(document).on('click', '.delete_movie', function (e) {
  e.preventDefault();

  let decision = confirm("Are you sure you want to Delete this movie?");

  if(decision){

    let idErase = $(this).attr('id');

    deleteMovie(idErase).then(displayMovies).catch(error => {
      alert('Wait. Something went wrong. Check console for details');
      console.log(error);
    });
  }

});

function displayMovies(){
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    $('#movieContent').html("");

    movies.forEach(({title, rating, id, date, genre, description}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);


      let card = `<div class="card mb-3" style="max-width: 540px">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><small class="text-muted mr-3">Date: ${date}</small><small class="text-muted mr-3">Genre: ${genre}</small><small class="text-muted">Rating: ${rating}</small></p>
                            <p class="card-text">${description}</p>
                            <p>
                                <button type="button" class="btn btn-info edit_movie" data-toggle="modal" data-target="#editMovieModal" id="${id}">Edit</button>
                                <button type="submit" class="btn btn-danger delete_movie" id="${id}">Delete</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
      $('#movieContent').append(card);

    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

$('#movieImageEdit').change(function () {
  let file = $(this)[0].files[0].name;
  $(this).text(file);
});

//event handler to display loading animations while API is connecting
$(document).ajaxStart(function () {
  // let html = "<div class='container'><h1><div class='spinner-border' role='status'> <span class='sr-only'>Loading...</span></div></h1></div>";
  // $('#movieContent').html("");
  // $('#movieContent').append(html);
  $('.spinner').show();
});
//event handler to set display to none to loading animations after the API is already connected
$(document).ajaxComplete(function (requestName) {
  $('.spinner').hide();
});