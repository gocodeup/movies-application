/**
 * es6 modules and imports
 */
const $ = require('jquery');

import sayHello from './hello';

sayHello('World');

const {getMovies, addMovie, deleteMovie, editMovie, getMovie} = require('./api.js');

function refreshMovies() {
    getMovies().then((movies) => {
        $('.movies').html('');
        movies.forEach(({title, rating, id}) => {
            // let movieItems = '';
            //
            // movieItems += `Rating: ${rating} Title: ${title} Id:${id}`;
            // $('.movies').append(movieItems);
            $('.movies').append(`<div class="delete">Rating: ${rating} Title: ${title} Id:${id}<button value="${id}" class="delete">Delete</button></div>`);


            // $(movieItems).click(() => {
            //
            //     $(this).css("visibility", 'hidden')
            //
            //
            // });

        });
    })
        .catch((error) => {
        });


    $('.movies').on('click', '.delete', function (event){
        let deleteId = $(event.target).val();
        deleteMovie(deleteId);
        refreshMovies();
    });
}

$('#addMovie').click(() => {
    let title = $('#inputTitle').val();
    let rating = $('#inputRating').val();
    let genre = $('#inputGenre').val();
    // look up inputs
    addMovie(title, rating, genre);
});


$('#editMovie').click(() => {
    let editTitle = $('#editTitle').val();
    let editRating = $('#editRating').val();
    let editGenre = $('#editGenre').val();
    // look up inputs
    editMovie(editTitle, editRating, editGenre);
});



refreshMovies();

// loader------------------------------
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function () {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}
