//modules required
const $ = require('jquery');
const {OMDB_API_KEY} = require('./keys.js');
const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
const {getMovies} = require('./api.js');
const {getOMDB} = require('./api.js');
const {searchTheMovieDBID} = require('./api.js');
const {searchMovie} = require('./api.js');
const {updateCRUDyDBFromTheMovieDB} = require('./api.js');
const {updateCRUDyDBFromUser} = require('./api.js');
const {refreshMovies} = require('./api.js');

refreshMovies();

//custom create
$('#custom-create-submit-button').click(function() {
    if (!$('#create-movie-title-input-inner').val()) {
        alert('Please input a movie title.');
        return;
    }
    if (!$('#overview-input').val()) {
        alert('Please input a brief overview of the movie.');
        return;
    }
    if (!$('#genre-input').val()) {
        alert('Please input a genre.');
        return;
    }
    if (!$('#select-rating-inner').val()) {
        alert('Please select a rating.');
        return;
    }
    let inputObj = {
        title: $('#create-movie-title-input-inner').val(),
        overview: $('#overview-input').val(),
        genre: $('#genre-input').val(),
        rating: $('#select-rating-inner').val()
    }
    $('#create-movie-title-input-inner').val('');
    $('#overview-input').val('');
    $('#genre-input').val('');
    $('#select-rating-inner').val('');
    updateCRUDyDBFromUser(inputObj)
        .then(response => refreshMovies());
});
//TheMovieDB Create
$('#create-with-the-movie-db').click(function() {
    if (!$('#select-rating').val()) {
        alert('Please select a rating.');
        return;
    }
    if (!$('#create-movie-title-input').val()) {
        alert('Please input a movie title.');
        return;
    }
    let rating = $('#select-rating').val();
    searchTheMovieDBID($('#create-movie-title-input').val())
        // .then(response => console.log(response))
        .then(response => {
            return response['results'][0];
        })
        .then(response => searchMovie(response))
        // .then(response => console.log(response))
        .then(response => updateCRUDyDBFromTheMovieDB(response, rating))
        .then(response => refreshMovies())
    $('#select-rating').val('');
    $('#create-movie-title-input').val('');

});


















//just in case
// getOMDB("Ninja Turtles")
//     .then(response => console.log(response));
// searchTheMovieDBID("Star Wars The Phantom Menace")
//     // .then(response => console.log(response))
//     .then(response => {
//         return response['results'][0];
//     })
//     .then(response => searchMovie(response))
//     // .then(response => console.log(response))
//     .then(response => updateCRUDyDB(response))
// getOMDB("Ninja Turtles")
//








