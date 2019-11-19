/**
 * es6 modules and imports
 */


/**
 * require style imports
 */
const $ = require('jquery');
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

$("#addMovie").hide();

const editClick = function (e) {
    $("#content").addClass("noDisplay");
    $("#addMovie").hide();
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
        $("#ratingEdit").val(movieSelected.rating);
        $(".modal").show();
    })
        .catch(() => console.log('You fudged up'));
    idEdited = id;

};

const createMovieContent = () => {
    return new Promise((() => {

        $('#content').html("");
        getMovies().then((movies) => {
            if(movies[0] === undefined){
                $("#addMovie").show();
            }
            $('#loading').hide();
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id, genre}) => {
                let result;
                console.log({title, rating, id});
                $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + title + "&callback=?")
                    .then(response => {
                        console.log(`http://image.tmdb.org/t/p/w500/${response.results[0].poster_path}`);
                        result = `http://image.tmdb.org/t/p/w500/${response.results[0].poster_path}`;
                        // `http://image.tmdb.org/t/p/w500/${json.results[0].poster_path}`
                $('#content').append(`<div class="card m-2 cardBackground" style="width: 18rem">
            <img src="${result}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-text text-center">${title}</h5>
            <p class="card-text text-center">Rating: ${rating}</p>
            <p class="card-text text-center">${genre}</p>
            <div class="d-flex justify-content-around">
                <button class = "btn btn-dark editButton text-center" id="button${id}">Edit Movie</button>
                <button class = "btn btn-dark deleteButton text-center" id="deleteMovie${id}">Delete</button>
            </div>
        </div>
        </div>`)
            $('.deleteButton').off().on('click', deleteClick);
            $('.editButton').off().on('click', editClick);
            $("#addMovie").show();
                    })});
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
    }));
};
//get all movies
createMovieContent();




$("#addMovieButton").click(function () {
    $("#content").html("");
    $("#loading").show();
    $("#addMovie").hide();
    if($('#movieTitleInput').val().trim() === "" || $("#genreInput").val().trim() === ""){
        createMovieContent().then(() => {
            $("#loading").hide();})
    }else{
    postMovie({
        "title": $('#movieTitleInput').val(),
        "rating": $("#ratingSelect").val(),
        "genre": $("#genreInput").val()
    }).then(getMovies).then(() => {
        createMovieContent().then(() => {
            $("#loading").hide();}
        );});}});

let idEdited;



$("#editSave").click(function () {
    $("#loading").show();
    $(".modal").hide();
    $('#content').html("");
    $("#content").removeClass("noDisplay");
    let editedMovie = {
        "title": $("#movieEditTitle").val(),
        "rating": $("#ratingEdit").val(),
        "genre": $("#movieGenreEdit").val(),
        "id": idEdited
    };
    if(editedMovie.title.trim() === "" || editedMovie.genre.trim() === ""){
        createMovieContent().then(() => {
            $("#loading").hide();
        });
    }
    else{
        patchMovie(editedMovie, idEdited).then(() => {
            createMovieContent().then(() => {
                $("#loading").hide();
            });
        });
    }
});

$(".close").click(function () {
    $(".modal").hide();
    $("#loading").show();
    $('#content').html("");
    $("#content").removeClass("noDisplay");
    createMovieContent().then(() => {
        $("#loading").hide();
    });

});

const deleteClick = function (e) {
    $("#content").addClass("noDisplay");
    $("#addMovie").hide();
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
        console.log("option 2 :" + id);
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
        $("#content").removeClass("noDisplay");
        createMovieContent().then(() => {
            $("#loading").hide();
        });
    })
};


