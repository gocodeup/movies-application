/**
 * es6 modules and imports

/**
 * require style imports
 */
import getMovies from './api.js';

getMovies().then((movies) => {
  movies.forEach(({title, rating, id}) => {
    $('.movieList').append('' +
        '<div class="card col-3">' +
        '<img src="" class="poster">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + title + '</h5>' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item">Rating: ' + rating + '</li>' +
        '<li class="list-group-item">Genre: </li></ul>' +
        '<div class="card-body">' +
        '<button type="button" class="editButton">Edit</button>' +
        '<button type="button" class="deleteButton">Delete</button></div>');
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
