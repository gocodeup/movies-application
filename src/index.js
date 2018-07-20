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

        $('#show-all-movies').empty();
        movies.forEach(({id, title}) => {
            const movies = ('<option id="' + `${id}` + '">'  + `${title}` + '</option>');
            $('#show-all-movies:last').append(movies);
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


// Edit all movies
$('#edit-submit').click((e) => {
    e.preventDefault();
    const editMovies = {title: $('#edit-movie-title').val(), rating: $('#edit-movie-rating').val()};
// Line 52 is how edited movie id is sent to json database
    const url = `/api/movies/${$("#edit-movie-id").val()}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editMovies)
    };

    fetch(url, options)
        .then(showMovies);
});

$('#show-all-movies').change(() => {
    console.log($('#show-all-movies option:selected').attr('id'));
    const url = `/api/movies/${$('#show-all-movies option:selected').attr('id')}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'applications/json'
        }
    };
    fetch(url, options).then(response => response.json())
        .then(movie => {
            $('#edit-movie-id').val(movie.id);
            $('#edit-movie-title').val(movie.title);
            $('#edit-movie-rating').val(movie.rating);
        })
});

showMovies();
