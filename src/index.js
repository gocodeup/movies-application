const $ = require ('jQuery');

const movie = require('./api');

movie.movieListing();

$('#add-movie-btn').click((e) => {
    movie.addMovie(e).then(()=>{movie.movieListing()})
});

$('#movie-select').click(console.log());