/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('Codeup');

/**
 * require style imports
 */
const $ = require('jquery');
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

const createMovieContent = () => {
    getMovies().then((movies) => {
        $('#loading').hide();
        $("#addMovie").removeClass('noDisplay');
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id, genre}) => {
            console.log({title, rating, id});
            $('#content').append(`<div class="card m-2" style="width: 18rem">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-text text-center">${title}</h5>
        <p class="card-text text-center">Rating: ${rating}</p>
        <p class="card-text text-center">${genre}</p>
        <div class="d-flex justify-content-around">
            <button class = "btn btn-dark editButton text-center" id="button${id}">Edit Movie</button>
            <button class="btn btn-dark deleteButton text-center" id="deleteMovie${id}">Delete</button>
        </div>
    </div>
    </div>`)
        });
        $('.editButton').on('click', editClick);
        $('.deleteButton').on('click', deleteClick);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
    return "Movies have been created";
};

createMovieContent();
//get all movies

//get a single book
getMovie(1)
    .then(movie => {
        console.log("Making a request to a single movie");
        console.log(`${movie}`);
    })
    .catch(() => console.log('The important thing is you tried...'));

$("#addMovieButton").click(function () {
    postMovie({
        "title": $('#movieTitleInput').val(),
        "rating": $("#ratingSelect").val(),
        "genre": $("#genreInput").val()
    }).then(getMovies).then((movies) => {
        console.log('Here are all the movieeees:');
        $('#content').html("");
        movies.forEach(({title, rating, genre}) => {
            console.log(`${title} rated ${rating}`);
            $('#content').append(`<div class="card m-2" style="width: 18rem">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-text text-center">${title}</h5>
        <p class="card-text text-center">Rating: ${rating}</p>
        <p class="card-text text-center">${genre}</p>
    </div>
    </div>`)
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
});

let idEdited;

const editClick = function (e) {
    $("#content").addClass('noDisplay');
    $("#addMovie").addClass('noDisplay');
    $('#loading').show();
    let id = e.currentTarget.id;
    if (id.length === 7) {
        id.split('');
        id = id[6];
    } else if (id.length === 8) {
        let bucket = [];
        id.split('');
        bucket.push(id[6]);
        bucket.push(id[7]);
        id = bucket.join('');
    } else if (id.length === 9) {
        let bucket = [];
        id.split('');
        bucket.push(id[6]);
        bucket.push(id[7]);
        bucket.push(id[8]);
        id = bucket.join('');
    }
    let movieSelected = {};
    getMovie(id).then().then(movie => {
        $("#loading").hide();
        console.log("Making a request to edit a single movie");
        movieSelected = movie;
        $("#movieEditTitle").val(movieSelected.title);
        $("#movieGenreEdit").val(movieSelected.genre);
        $(".modal").show();
    })
        .catch(() => console.log('You fudged up'));
    idEdited = id;

};

$("#editSave").click(function () {
    let editedMovie = {
        "title": $("#movieEditTitle").val(),
        "rating": $("#ratingEdit").val(),
        "genre": $("#movieGenreEdit").val(),
        "id": idEdited
    };
    $(".modal").hide();
    $("#loading").show();
    $('#content').html("");
    $("#content").removeClass('noDisplay');
    patchMovie(editedMovie, idEdited).then(() => {
        createMovieContent().then(() => {
            $("#loading").hide();
            $("#addMovie").removeClass("noDisplay");
        });
    });

});

$(".close").click(function () {
    $(".modal").hide();
    $("#loading").show();
    $('#content').html("");
    $("#content").removeClass('noDisplay');
    createMovieContent().then(() => {
        $("#loading").hide();
    });
    $("#addMovie").removeClass("noDisplay");

});

const deleteClick = function (e) {
    $("#content").addClass('noDisplay');
    $("#addMovie").addClass('noDisplay');
    $('#loading').show();
    let id = e.currentTarget.id;
    if (id.length === 12) {
        id.split('');
        id = id[11];
    } else if (id.length === 13) {
        let bucket = [];
        id.split('');
        bucket.push(id[11]);
        bucket.push(id[12]);
        id = bucket.join('');
    } else if (id.length === 14) {
        let bucket = [];
        id.split('');
        bucket.push(id[11]);
        bucket.push(id[12]);
        bucket.push(id[13]);
        id = bucket.join('');
    }
    console.log(id);
    deleteMovie(id).then(() => {
        $('#content').html("");
        $("#content").removeClass('noDisplay');
        createMovieContent().then(() => {
            $("#loading").hide();
        });
    })
};

