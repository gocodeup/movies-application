/**
 * es6 modules and imports

 /**
 * require style imports
 */
import getMovies from './api.js';
import addMovie from './add.js';

getMovies().then((movies) => {
  movies.forEach(({title, rating, id, image, genre, director, date, duration}) => {
    $('.loader').css('visibility', 'hidden');
    $('.movieList').append('' +
        '<div class="card col-3 card-flip h-100">' +
        '<div class="card-front">' +
        '<img src="' + image + '" class="poster"></div>' +
        '<div class="card-back d-flex justify-content-center flex-column">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + title + '</h5>' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item">Rating: ' + rating + '</li>' +
        '<li class="list-group-item">Genre: ' + genre + '</li>' +
        '<li class="list-group-item">Director: ' + director + '</li>' +
        '<li class="list-group-item">Release: ' + date + '</li>' +
        '<li class="list-group-item">Run Time: ' + duration + '</li></ul></div>' +
        '<div class="card-footer justify-content-around d-flex">' +
        '<button type="button" class="editButton btn btn-warning">Edit</button>' +
        '<div class="d-none">' + id + '</div>' +
        '<button type="button" class="deleteButton btn btn-danger">Delete</button></div></div></div>');
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$(".submitAdd").click(function(){
  let addTitle = $('#addTitle').val();
  addMovie(addTitle).then((movie) => {
    console.log(movie);
  })
});