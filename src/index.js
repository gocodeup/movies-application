/**
 * require style imports
 */
const {getMovies} = require('./api.js');
require('bootstrap');
const $ = require('jquery');

// Display all movies
const showMovies = () => {
    getMovies().then((movies) => {
        $('#t-body').empty();

        movies.forEach(({title, rating, id}) => {
            const movies = ('<tr>' +
                            '</tr><th scope="row">' + `${title}` + '</th>' +
                            '<td>' + `${rating}` + '</td>' +
                            '<td><button type="button" class="btn btn-primary edit-buttons" data-toggle="modal" data-target="#edit-module" id="'+`${id}`+'">Edit</button> ' + ' <button type="button" id="'+`${id}`+'" class="btn btn-danger delete-buttons">Delete</button></td>' +
                            '</tr>'
            );
            $('#t-body:last').append(movies);
        });

        $('#show-all-movies').empty();
        movies.forEach(({id, title}) => {
            const movies = ('<option id="' + `${id}` + '">'  + `${title}` + '</option>');
            $('#show-all-movies:last').append(movies);
        });


        // Edit
        $('.edit-buttons').click((button) => {
            const url = `/api/movies/${button.target.id}`;
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
                });
        });
        //DELETE
        $('.delete-buttons').click((button) => {
            const url = `/api/movies/${button.target.id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            fetch(url, options)
                .then(showMovies).then(() => {
                button.target.parentNode.parentNode.remove()
            })
        })

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

// New movie submit
$('#add-movies').click((e) => {
    e.preventDefault();
    const newMovie = {title: $('#add-movie-title').val(), rating: $('#add-movie-rating').val()};
    const url = '/api/movies/';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    };

    fetch(url, options)
        .then(showMovies).then(() => {
        $('#add-movie-title').val("");
        $('#add-movie-rating').val("");
    });
});


// Save changes button, in edit module
$('#save').click((e) => {
    e.preventDefault();
    const editMovies = {title: $('#edit-movie-title').val(), rating: $('#edit-movie-rating').val()};
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

showMovies();