const $ = require('jquery');


/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


const populateMovies = () => {
    getMovies().then((movies) => {
        $('#loading').remove();
        $('h1').remove();
        $('p').remove();

        $('#selectMovieToEdit').click(function () {
            const movieToEdit = $('#moviesToEdit').val();
            const selectedMovie = movies.filter(movie => {
                return [`${movieToEdit}`].includes(movie.title)
            })
            $('#movieToEditTitle').removeAttr('hidden').val(selectedMovie[0].title);
            $('#movieToEditRating').removeAttr('hidden').val(selectedMovie[0].rating);
            $('#submitMovieToEdit').removeAttr('hidden');
            $('#submitMovieToEdit').click(function () {
                const url = './api/movies';
                const updatedMovie = {title: `${selectedMovie.title}`,rating: `${selectedMovie.rating}`}
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedMovie)}
                fetch(url, options)
                    .then(data => {
                        console.log(data);
                    })
                    .catch();
            });
        })

        movies.forEach(({title, rating, id}) => {
            $(`#ID${id}`).remove()
            $('body').append(`<div id=movie${id}></div>`);
            $(`#movie${id}`).append(`<h1>${title}</h1>`);
            $(`#movie${id}`).append(`<p>${rating}</p>`);
            $(`#movie${id}`).append(`<button id='ID${id}'>Delete Movie</button>`);
            $('#moviesToEdit').append(`<option>${title}</option>`);
            $(`#ID${id}`).click(function(e) {
                //this needs to delete movies
                e.preventDefault();
                const deleteMovieTitle = title;

                const url = './api/movies';

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify(newMovie),
                };
                fetch(url, options)
                    .then(data => {
                        if (data.title === deleteMovieTitle) {

                        };
                        populateMovies();
                    })
                    .catch();
            });
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};
populateMovies();

$('#addMovie').click(function () {
  const newMovieTitle = $('#newMovieTitle').val();
  const newMovieRating = $('#newMovieRating').val();
    const newMovie = {title: newMovieTitle, rating: newMovieRating};
    const url = './api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(data => {
            console.log(data);
            populateMovies();
        })
        .catch();
});



