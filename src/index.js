
const $ = require('jquery');
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

const searchTerm = $("#searchTerm");
const searchButton = $("#searchButton");
const searchContainer = $("#searchContainer");
let idEdited;



const editClick = function (e) {
    $("#content").addClass("noDisplay");
    $("#addMovie").hide();
    $('#loading').show();
    searchContainer.hide();

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
        $('#loading').hide();
        searchContainer.show();
        console.log("Making a request to edit a single movie");
        movieSelected = movie;
        $("#movieEditTitle").val(movieSelected.title);
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
            if (movies[0] === undefined) {
                $("#addMovie").show();
            }
            $('#loading').hide();
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => {
                let result;
                let releaseDate;
                let summary;
                let actualTitle;
                let actualRating;
                console.log({title, rating, id});
                $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + title + "&callback=?")
                    .then(response => {
                        result = `http://image.tmdb.org/t/p/w500/${response.results[0].poster_path}`;
                        releaseDate = `${response.results[0].release_date}`;
                        summary = `${response.results[0].overview}`;
                        actualTitle = `${response.results[0].title}`;
                        actualRating = `${response.results[0].vote_average}`;
                        $('#content').append(`<div class="card m-2 cardBackground d-flex" style="width: 18rem">
            <img src="${result}" class="card-img-top" alt="...">
            <div class="card-body roboto">
            <h5 class="card-text text-center">${actualTitle}</h5>
            <p class="card-text text-center mt-4">Score: ${actualRating}</p>
            <p class="card-text text-center">Released: ${releaseDate}</p>
            <p class="card-text text-center">${summary}</p>
            <p class="card-text text-center mb-5">Personal Rating: ${rating}</p>
            <div class="" id="buttonGroup">
                <button class = "btn btn-dark editButton text-center mr-3" id="button${id}">Edit Movie</button>
                <button class = "btn btn-dark deleteButton text-center ml-3" id="deleteMovie${id}">Delete</button>
            </div>
        </div>
        </div>`)
                        $('.deleteButton').off().on('click', deleteClick);
                        $('.editButton').off().on('click', editClick);
                        $("#addMovie").show();
                        searchContainer.show();

                    })
            });
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
    }));
};

const deleteClick = function (e) {
    $("#content").addClass("noDisplay");
    $("#addMovie").hide();
    $('#loading').show();
    searchContainer.hide();
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
    deleteMovie(id).then(() => {
        $('#content').html("");
        $("#content").removeClass("noDisplay");
        createMovieContent().then(() => {
            $('#loading').hide();
            searchContainer.show();
        });
    })
};

$("#addMovie").hide();

searchContainer.hide();

createMovieContent();

$("#addMovieButton").click(function () {
    $("#content").html("");
    $('#loading').show();
    searchContainer.hide();
    $("#addMovie").hide();
    if ($('#movieTitleInput').val().trim() === "") {
        createMovieContent().then(() => {
            $('#loading').hide();
            searchContainer.hide();
        })
    } else {
        postMovie({
            "title": $('#movieTitleInput').val(),
            "rating": $("#ratingSelect").val(),
        }).then(getMovies).then(() => {
            createMovieContent().then(() => {
                    $('#loading').hide();
                    searchContainer.show();
                }
            );
        });
    }
});

$("#editSave").click(function () {
    $('#loading').show();
    searchContainer.hide();
    $(".modal").hide();
    $('#content').html("");
    $("#content").removeClass("noDisplay");
    let editedMovie = {
        "title": $("#movieEditTitle").val(),
        "rating": $("#ratingEdit").val(),
        "id": idEdited
    };
    if (editedMovie.title.trim() === "") {
        createMovieContent().then(() => {
            $('#loading').hide();
            searchContainer.show();
        });
    } else {
        patchMovie(editedMovie, idEdited).then(() => {
            createMovieContent().then(() => {
                $('#loading').hide();
                searchContainer.show();
            });
        });
    }
});

$(".close").click(function () {
    $(".modal").hide();
    $('#loading').show();
    searchContainer.hide();
    $('#content').html("");
    $("#content").removeClass("noDisplay");
    createMovieContent().then(() => {
        $('#loading').hide();
        searchContainer.show();
    });

});

searchButton.on("click", function () {
    $("#content").addClass("noDisplay");
    $("#addMovie").hide();
    $('#loading').show();
    searchContainer.hide();
    getMovies().then((movies) => {
        $('#content').html("");
        if (movies[0] === undefined) {
            $("#addMovie").show();
        }
        $('#loading').hide();
        searchContainer.show();
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            let result;
            let releaseDate;
            let summary;
            let actualTitle;
            let actualRating;
            console.log({title, rating, id});
            if (title.toLowerCase().includes(searchTerm.val().toLowerCase().trim())) {
                $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + title + "&callback=?")
                    .then(response => {
                        result = `http://image.tmdb.org/t/p/w500/${response.results[0].poster_path}`;
                        releaseDate = `${response.results[0].release_date}`;
                        summary = `${response.results[0].overview}`;
                        actualTitle = `${response.results[0].title}`;
                        actualRating = `${response.results[0].vote_average}`;
                        $('#content').append(`<div class="card m-2 cardBackground d-flex" style="width: 18rem">
            <img src="${result}" class="card-img-top" alt="...">
            <div class="card-body roboto">
            <h5 class="card-text text-center">${actualTitle}</h5>
            <p class="card-text text-center mt-4">Score: ${actualRating}</p>
            <p class="card-text text-center">Released: ${releaseDate}</p>
            <p class="card-text text-center">${summary}</p>
            <p class="card-text text-center mb-5">Personal Rating: ${rating}</p>
            <div class="" id="buttonGroup">
                <button class = "btn btn-dark editButton text-center mr-3" id="button${id}">Edit Movie</button>
                <button class = "btn btn-dark deleteButton text-center ml-3" id="deleteMovie${id}">Delete</button>
            </div>
        </div>
        </div>`);
                        $('.deleteButton').off().on('click', deleteClick);
                        $('.editButton').off().on('click', editClick);
                        $("#addMovie").show();
                        searchContainer.show();
                        $("#content").removeClass("noDisplay");
                    })
            }
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
});


