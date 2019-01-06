//Dependencies
const $ = require('jquery');

//import fetch methods from api
const {getMovies, createMovie, editMovie, deleteMovie} = require('./api.js');

//container to add movies to
const movieBlock = document.getElementById('movie-container');

//add movie input fields
let movieNameInput = "";
$('#movie-name').on('input', (event) => {
    movieNameInput = event.target.value;
});
let movieRatingInput = "";
$('#movie-rating').on('input', (event) => {
    movieRatingInput = event.target.value;
});

// function to create movie divs
const movieGenerator = (({title, rating, id}) => {
    //whole container
    let movieContainer = document.createElement('div');
    movieContainer.className = "movie-container";
    //movie title
    let titleDiv = document.createElement('div');
    titleDiv.className = "title";
    titleDiv.textContent = `"${title}"`;
    // sub container
    let subContainer = document.createElement('div');
    subContainer.className = "subContainer";
    //ratings
    let ratingDiv = document.createElement('div');
    ratingDiv.textContent = `${rating} out of 5 stars`;
    ratingDiv.className = "rating";
    //delete button
    let deleteButton = document.createElement('button');
    deleteButton.className = "btn btn-danger";
    deleteButton.id = id;
    deleteButton.textContent = "Delete this movie";
    //edit button
    let editButton = document.createElement('button');
    editButton.className = "btn btn-secondary edit-button";
    editButton.id = id;
    editButton.textContent = "Edit this movie";
    //adding to containers
    movieContainer.appendChild(titleDiv);
    subContainer.appendChild(ratingDiv);
    subContainer.appendChild(editButton);
    subContainer.appendChild(deleteButton);
    movieContainer.appendChild(subContainer);
    movieBlock.prepend(movieContainer);

});

//listener to run add prependMovie function
$('#submit-movie').on('click', (event) => {
    //creates whats being sent to the api
    const content = {
        title: movieNameInput,
        rating: movieRatingInput
    };
    //runs api post request
    createMovie(content)
        .then(
            //display loading screen
            $('.load-screen').show(),
            $('#movie-container').hide()
        )
        .then(() => {
            //get the latest movies
            getMovies()
                .then((movies) => {
                    movieBlock.innerHTML = "";
                    $('.load-screen').hide();
                    $('#movie-container').show();
                    console.log(movies);
                    movies.forEach(({title, rating, id}) => {
                        movieGenerator(({title, rating, id}));
                    });
                })
        })
        .catch(() => {
            $('.load-screen').hide();
        })
});

let editBtnId = null;
let editedMovieTitle = "";
let editedMovieRating = "";
let editedMovie = {};

const movieEdit = (movies, editBtnId) => {
    let targetedMovieIndex = movies.findIndex(movie => {
        return movie.id === editBtnId;
    });
    let editTargetedMovie = movies[targetedMovieIndex];
    console.log(editTargetedMovie.rating);
    $('#edit-movie-name').attr('placeholder', editTargetedMovie.title).val("");
    $('#edit-movie-rating').attr('placeholder', editTargetedMovie.rating).val("");
};

$('html').on('click', '.edit-button', function (event) {
    $('#edit-movie').fadeIn();
    editBtnId = parseFloat(event.target.id);
    getMovies()
        .then((movies) => {
            movieBlock.innerHTML = "";
            movies.forEach(({title, rating, id}) => {
                movieGenerator(({title, rating, id}));
            });
            movieEdit(movies, editBtnId);

            //open up submit listener
            $('html').on('click', '#edit-submit-movie', function (event) {
                event.preventDefault();
                // editBtnId = event.target.id;
                let targetedMovieIndex = movies.findIndex(movie => {
                    return movie.id === editBtnId;
                });
                let editTargetedMovie = movies[targetedMovieIndex];
                //building object to send to api
                editedMovieTitle = $('#edit-movie-name').val();
                editedMovieRating = $('#edit-movie-rating').val();
                editedMovie = {title: editedMovieTitle, rating: editedMovieRating, id: editTargetedMovie.id};
                //sending object
                editMovie(editedMovie, editedMovie.id);
                //deleting old one from html
                $(`#${editTargetedMovie.id}`).parent().remove();
                //making new one wil edited movie
                movieGenerator(editedMovie);
                $('#edit-movie').fadeOut();
            });
        })
});

$('html').on('click', '#cancel-submit-movie', function (event) {
    event.preventDefault();
    $('#edit-movie').fadeOut();
})

//function to be ran inside of event listener
const movieDelete = (movies, btnId) => {
    //determining the index of the selected movie
    let targetedMovieIndex = movies.findIndex(movie => {
        return movie.id === btnId;
    });
    //declaring the movie chosen as a variable
    let targetedMovie = movies[targetedMovieIndex];
    //running the api request to delete
    deleteMovie(targetedMovie, targetedMovie.id);
    //removing the html from the page
    $(`#${targetedMovie.id}`).parent().remove();
};

let btnId = null;
//event listener to fire on delete click
$('html').on('click', '.btn-danger', function (event) {
    event.preventDefault();
    btnId = parseFloat(event.target.id);
    //running the get movies api request to get the latest movies array
    getMovies().then(
        $('.load-screen').show(),
        $('#movie-container').hide()
    )
        .then((movies) => {
            $('.load-screen').hide();
            $('#movie-container').show();
            //wiping the html after page load
            movieBlock.innerHTML = "";
            //looping through movies array and displaying most current movies before deleting
            movies.forEach(({title, rating, id}) => {
                movieGenerator(({title, rating, id}));
            });
            //deleting the selected move from movies array, then removing html within movieDelete
            movieDelete(movies, btnId);
        })
});

// initial load function
const initiateMovies = () => {
    getMovies().then(
        $('.load-screen').show()
    )
        .then((movies) => {
            $('.load-screen').hide();

            $('.post-load-container').show();

            movies.forEach(({title, rating, id}) => {
                movieGenerator(({title, rating, id}));
            });
            // movieEdit(movies);
            // movieDelete(movies);

        }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};

//calling the initial load
initiateMovies();


