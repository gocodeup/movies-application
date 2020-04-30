const $ = require ('jQuery');

const movie = require('./api');

movie.movieListing();

// ADD MOVIES

$('#add-movie-btn').click((e) => {
    movie.addMovie(e).then(()=>{movie.movieListing()})
});

// EDIT MOVIES

$('#edit-movie-btn').click((j) => {
    movie.editMovie(j).then(()=>{movie.movieListing()})
});

// DELETE MOVIES

$('.delete_movie').click((f) => {
    console.log('clicked!');
    movie.deleteMovie(f).then(()=>{movie.movieListing()})
});