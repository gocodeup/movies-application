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

        movies.forEach(({title, rating, id}) => {
            $('#container').append(`<h1>${title}</h1>`);
            $('#container').append(`<p>${rating}</p>`)
            $('#container').append(`<button id='ID${id}'>Delete Movie</button>`)
            $(`#ID${id}`).click(function(e) {
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

