/**
 * require style imports
 */
const {getMovies} = require('./api.js');
require('bootstrap');
const $ = require('jquery');


/* XAVIER: in order to show the loading screen inbetween actions, you will need to write a function that replaces the body
of your html with the loading screen. Run that function while the api call is taking place.
 */


// Display all movies
const showMovies = () => {
    getMovies().then((movies) => {
        $('#t-body').empty();

        movies.forEach(({title, rating, genre, id}) => {
            const movies = ('<tr>' +
                            '</tr><td scope="row">' + `${title}` + '</td>' +
                            '<td>' + `${rating}` + '</td>' +
                            '<td>' + `${genre}` + '</td>' +
                            '<td><button type="button" class="btn btn-primary edit-buttons" data-toggle="modal" data-target="#edit-module"                              id="'+`${id}`+'"><i class="fas fa-pencil-alt"></i>' +
                '</button> ' + ' <button type="button" id="'+`${id}`+'" class="btn btn-danger delete-buttons"><i class="fas fa-trash-alt"></i>' +
                '</button></td>' +
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
                    $('#edit-movie-genre').val(movie.genre);
                });
        });
        //DELETE
        $('.delete-buttons').click((button) => {
            $('.btn').attr('disabled',true);
            const url = `/api/movies/${button.target.id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            fetch(url, options)
                .then(showMovies).then(() => {
                $('.btn').attr('disabled',false);
                button.target.parentNode.parentNode.remove()
            })
        })

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

// ADD MOVIE (New movie submit)
$('#add-movies').click((e) => {


    e.preventDefault();
    const newMovie = {title: $('#add-movie-title').val(), rating: $('#add-movie-rating').val(), genre: $('#add-movie-genre').val()};
    const url = '/api/movies/';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    };


    return fetch(url, options)
        .then(showMovies).then(() => {
        $('#add-movie-title').val("");
        $('#add-movie-rating').val("");
        $('#add-movie-genre').val("");

        });
});


// Save changes button, in edit module
$('#save').click((e) => {
    e.preventDefault();
    const editMovies = {title: $('#edit-movie-title').val(), rating: $('#edit-movie-rating').val(), genre: $('#edit-movie-genre').val()};
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