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
    //delete button
    let deleteButton = document.createElement('button');
    deleteButton.className = "btn btn-danger";
    deleteButton.id = id;
    deleteButton.textContent = "Delete this movie";
    //edit button
    let editButton = document.createElement('button');
    editButton.className = "btn btn-secondary";
    editButton.id = id;
    editButton.textContent = "Edit this movie";
    //whole container
    let movieContainer = document.createElement('div');
    movieContainer.className = "movie-container";
    //movie title
    let titleDiv = document.createElement('div');
    titleDiv.className = "title";
    titleDiv.textContent = `"${title}"`;
    //ratings
    let ratingDiv = document.createElement('div');
    ratingDiv.textContent = `${rating} out of 5 stars`;
    ratingDiv.className = "rating";
    //adding to containers
    movieContainer.appendChild(titleDiv);
    movieContainer.appendChild(ratingDiv);
    movieContainer.appendChild(editButton);
    movieContainer.appendChild(deleteButton);
    movieBlock.prepend(movieContainer);

});

//function to add the created movie to the list
const prependMovie = (movie) => {
    movieGenerator(movie);
};

//listener to run add prependMovie function
$('#submit-movie').on('click', (event) => {
    const content = {
        title: movieNameInput,
        rating: movieRatingInput
    };
    $('.load-screen').show();
    createMovie(content)
        .then(movie => {

            $('.load-screen').hide();
            // runs prepending movie addition
            prependMovie(movie)
        })
    .catch(() => {
        $('.load-screen').hide();
    })
});

// edit movie functionality
const movieEdit = (movies) => {
    let btnId = null;
    let editedMovieTitle = "";
    let editedMovieRating = "";
    let editedMovie = {};
    $('html').on('click', '.btn-secondary', function (event) {
        btnId = event.target.id;
        let targetedMovie = movies[btnId - 1];
        $('#edit-movie').fadeIn();
        $('#edit-movie-name').attr('placeholder', targetedMovie.title).val("");
        $('#edit-movie-rating').attr('placeholder', targetedMovie.rating).val("");
        $('html').on('click', '#edit-submit-movie', function(event){
            event.preventDefault();
            editedMovieTitle = $('#edit-movie-name').val();
            editedMovieRating = $('#edit-movie-rating').val();
            editedMovie = { title: editedMovieTitle, rating: editedMovieRating, id: targetedMovie.id};
            editMovie(editedMovie, targetedMovie.id);
            $(`#${targetedMovie.id}`).parent().remove();
            movieGenerator(editedMovie);
            $('#edit-movie').fadeOut();
        })
        $('html').on('click', '#cancel-submit-movie', function (event){
            event.preventDefault();
            $('#edit-movie').fadeOut();
        })
    });
};

const movieDelete = (movies) => {
    let btnId = null;
    $('html').on('click', '.btn-danger', function (event) {
        event.preventDefault();
        btnId = event.target.id;
        console.log(btnId);
        let targetedMovie = movies[btnId - 1];
        console.log(targetedMovie);
        deleteMovie(targetedMovie, targetedMovie.id);
        $(`#${targetedMovie.id}`).parent().remove();
    });
};

// initial load function
const cycle = () => {
    getMovies().then(
        $('.load-screen').show()
    )
        .then((movies) => {
            $('.load-screen').hide();

            $('.post-load-container').show();

            movies.forEach(({title, rating, id}) => {
                movieGenerator(({title, rating, id}));
            });
            movieEdit(movies);
            movieDelete(movies);

        }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};

//calling the initial load
cycle();


