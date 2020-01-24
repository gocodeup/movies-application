//modules required
const $ = require('jquery');
const {updateCRUDyDBFromUser, refreshMovies, searchRapidApiMovieDB, getRapidApiMovieID, idSearchRapidApiMovieDB, updateCRUDyDBFromRapid} = require('./api.js');


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

// RapidAPICreate
let globalSearchArr;
$('#create-with-the-movie-db').click(function() {
    let result;
    if (!$('#create-movie-title-input').val()) {
        alert('Please input a movie title.');
        return;
    }
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
});














