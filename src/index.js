//modules required
const $ = require('jquery');
const {updateCRUDyDBFromUser, refreshMovies, searchRapidApiMovieDB, getRapidApiMovieID, idSearchRapidApiMovieDB, updateCRUDyDBFromRapid, readFromCRUDyDB, deleteEntry, updateEntry} = require('./api.js');


refreshMovies();
$('#custom-create-button').click(function() {
    if($('#create-movie-title-input').val()) {
        $('#create-movie-title-input-inner').val($('#create-movie-title-input').val())
    }
})
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
    if (!$('#rating-select').val()) {
        alert('Please select a rating.');
        return;
    }
    let inputObj = {
        Title: $('#create-movie-title-input-inner').val(),
        Overview: $('#overview-input').val(),
        Year: $('#year-input').val(),
        Rated: $('#mpaa-rating-input').val(),
        Genre: $('#genre-input').val(),
        Image: $('#img-url-input').val(),
        Website: $('#overview-input').val(),
        imdbRating: $('#imdb-rating-input').val(),
        Rating: $('#rating-select').val()
    }
    $('#create-movie-title-input-inner').val('');
    $('#overview-input').val('');
    $('#year-input').val('');
    $('#mpaa-rating-input').val('');
    $('#genre-input').val('');
    $('#img-url-input').val('');
    $('#overview-input').val('');
    $('#imdb-rating-input').val('');
    $('#rating-select').val('');
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
//READ
$('#read-data-button').click(function() {
    readFromCRUDyDB($('#read-movie-title-input').val(), $('#read-rating-select').val(), $('#read-genre-input').val(), $('#read-id-input').val());
    $('#read-movie-title-input').val('');
    $('#read-rating-select').val('');
    $('#read-genre-input').val('');
    $('#read-id-input').val('');
});
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
    if (!$('#rating-select').val()) {
        alert('Please select a rating.');
        return;
    }
    let inputObj = {
        Title: $('#create-movie-title-input-inner').val(),
        Overview: $('#overview-input').val(),
        Year: $('#year-input').val(),
        Rated: $('#mpaa-rating-input').val(),
        Genre: $('#genre-input').val(),
        Image: $('#img-url-input').val(),
        Website: $('#overview-input').val(),
        imdbRating: $('#imdb-rating-input').val(),
        Rating: $('#rating-select').val()
    }
    $('#create-movie-title-input-inner').val('');
    $('#overview-input').val('');
    $('#year-input').val('');
    $('#mpaa-rating-input').val('');
    $('#genre-input').val('');
    $('#img-url-input').val('');
    $('#overview-input').val('');
    $('#imdb-rating-input').val('');
    $('#rating-select').val('');
    updateEntry(inputObj, inputID)
        .then(response => refreshMovies());
});















