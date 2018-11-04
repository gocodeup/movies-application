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
        $('option').remove();
        movies.forEach(({title, rating, id}) => {
            $(`#ID${id}`).remove();
            $('table').append(`<tbody id=movie${id}></tbody>`);
            $(`#movie${id}`).append( // cleaned up and consolidated the below
                `<td><h5>${title}</h5></td>
                 <td>${rating}</td>
                 <td><button class="btn-floating btn-large waves-effect waves-light red">
                 <i class="material-icons" id='ID${id}'>delete_forever</i></button></td>`
            );

            // $(`#movie${id}`).append(`<p>${rating}</p>`);
            // $(`#movie${id}`).append(`<button id='ID${id}'>Delete Movie</button>`);
            $('#moviesToEdit').append(`<option>${title}</option>`);
            $(`#ID${id}`).click(function(e) {
                //this needs to delete movies
                e.preventDefault();
                const deleteMovieTitle = {title,rating,id};
                const url = `./api/movies/${id}`;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(deleteMovieTitle),
                };
                fetch(url, options)
                    .then(data => {
                        console.log(data);
                        populateMovies();
                        $(`#ID${id}`).remove()
                    })
                    .catch();
            });
        });
    }).catch((error) => {
        alert(`Oh no! Something went wrong.
                Check the console for details.`);
        console.log(error);
    });
};
populateMovies();

$('#selectMovieToEdit').click(function (e) {
    e.preventDefault(e);
    getMovies().then((movies => {
        let movieToEdit = $('#moviesToEdit').val();
        let selectedMovie = movies.filter(movie => {
            return [`${movieToEdit}`].includes(movie.title)
        });
        $('#movieToEditTitle').removeAttr('hidden').val(selectedMovie[0].title);
        $('#movieToEditRating').removeAttr('hidden').val(selectedMovie[0].rating);
        $('#submitMovieToEdit').removeAttr('hidden');
        $('#submitMovieToEdit').click(function () {
            const url = `./api/movies/${selectedMovie[0].id}`;
            let updatedMovie = {title: $('#movieToEditTitle').val(), rating: $('#movieToEditRating').val()};
            let options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie)};
            fetch(url, options)
                .then(data => {
                    console.log(data);
                    $('#movieToEditTitle').attr('hidden',true);
                    $('#movieToEditRating').attr('hidden',true);
                    $('#submitMovieToEdit').attr('hidden',true);
                    populateMovies();
                    $('#submitMovieToEdit').off();
                })
                .catch();
        });
    }))});

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
            console.log(options);
            populateMovies();
        })
        .catch();
});



