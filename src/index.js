//modules required
const $ = require('jquery');
// const {OMDB_API_KEY} = require('./keys.js');
// const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
// const {getMovies} = require('./api.js');
// const {getOMDB} = require('./api.js');
// const {searchTheMovieDBID} = require('./api.js');
// const {searchMovie} = require('./api.js');
// const {updateCRUDyDBFromTheMovieDB} = require('./api.js');
// const {updateCRUDyDBFromUser} = require('./api.js');
// const {refreshMovies} = require('./api.js');
// const {searchRapidApiMovieDB} = require('./api.js');
const {searchTheMovieDBID, searchMovie, updateCRUDyDBFromTheMovieDB, updateCRUDyDBFromUser, refreshMovies, searchRapidApiMovieDB, getRapidApiMovieID, idSearchRapidApiMovieDB, updateCRUDyDBFromRapid} = require('./api.js');


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
// $('#create-with-the-movie-db').click(function() {
//     if (!$('#select-rating').val()) {
//         alert('Please select a rating.');
//         return;
//     }
//     if (!$('#create-movie-title-input').val()) {
//         alert('Please input a movie title.');
//         return;
//     }
//     let rating = $('#select-rating').val();
//     searchTheMovieDBID($('#create-movie-title-input').val())
//         // .then(response => console.log(response))
//         .then(response => {
//             return response['results'][0];
//         })
//         .then(response => searchMovie(response))
//         // .then(response => console.log(response))
//         .then(response => updateCRUDyDBFromTheMovieDB(response, rating))
//         .then(response => refreshMovies())
//     $('#select-rating').val('');
//     $('#create-movie-title-input').val('');
//
// });
// RapidAPICreate
let globalSearchArr;
$('#create-with-the-movie-db').click(function() {
    let result;
    if (!$('#create-movie-title-input').val()) {
        alert('Please input a movie title.');
        return;
    }

    console.log($('#create-movie-title-input').val())
    searchRapidApiMovieDB($('#create-movie-title-input').val())
        // .then(response => console.log(response))
        .then(searchArr => {
            console.log(searchArr);
            $('#confirm-select-inner').empty()
            searchArr.forEach(obj => {
                $('#confirm-select-inner').append(`<option>${obj['Title']}</option>`)
            })
            globalSearchArr = searchArr;
        })
});
$('#confirm-create-submit-button').click(function() {
    if (!$('#select-rating').val()) {
        alert('Please select a rating.');
        return;
    };
    if (!$('#confirm-select-inner').val()) {
        alert('Please confirm a movie title.');
        return;
    }
    let rating = $('#select-rating').val();
    console.log(rating);
    console.log(globalSearchArr);
    let id = getRapidApiMovieID( globalSearchArr, $('#confirm-select-inner').val());
    idSearchRapidApiMovieDB(id)
        .then(result => {
            console.log(result);
            console.log(rating);
            return updateCRUDyDBFromRapid(result, rating)
        })
        .then(result => refreshMovies())
})





// searchRapidApiMovieDB("Star Wars")
//     .then(result => getRapidApiMovieID(result, "Star Wars: Episode V - The Empire Strikes Back"))
//     .then(result => idSearchRapidApiMovieDB(result))




//more just in case

//     .then(response => searchMovie(response))
//     // .then(response => console.log(response))
//     .then(response => updateCRUDyDBFromTheMovieDB(response, rating))
//     .then(response => refreshMovies())
// $('#select-rating').val('');
// $('#create-movie-title-input').val('');

















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








