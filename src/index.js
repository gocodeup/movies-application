const $ = require ('jQuery');

const movie = require('./api');

movie.movieListing();

$('#add-movie-btn').click((e) => {
    movie.addMovie(e).then(()=>{movie.movieListing()})
});
$('#edit-movie-btn').click((j) => {
    movie.editMovie(j).then(()=>{movie.movieListing(e)})
});