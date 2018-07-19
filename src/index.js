/**
 * require style imports
 */
const {getMovies} = require('./api.js');
require('bootstrap');
const $ = require('jquery');

// Display all movies
const showMovies = () => {
    getMovies().then((movies) => {
        $('#movies').empty();

        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);

            const movies = ('<div class="col">' +
                '<h1>' + `id #${id} - ${title} - rating: ${rating}` + '</h1>' +
                '</div>');
            $('#movies:last').append(movies);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};

// New movie submit
$('#submit').click((e) => {
    e.preventDefault();
    const newMovie = {title: $('#new-movie-title').val(), rating: $('#new-movie-rating').val()};
    const url = '/api/movies/';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    };

    fetch(url, options)
        .then(showMovies);
});

showMovies();