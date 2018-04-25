/**
 * es6 modules and imports
 */
import 'bootstrap'
import $ from 'jquery'

$(() => {
    $('[data-toggle="popover"]').popover()
});

import sayHello from './hello';
sayHello('World');

import addMovie from './addMovies.js';

import deleteMovie from './deleteMovie.js';

import editMovie from './editMovies.js';

import {getMovies} from './api.js';

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


// getMovies().then((movies) => {
//     movies.forEach((movie) => {
//         console.log(movie);
//     })
// }).catch(error => console.error(error));

const showPage = () => {
    $('#loader').css('display','none');
    $('#myDiv').css('display','block')
};

const loadingTimer = () => {
  const loader = setTimeout(showPage, 3000)
};

$(document).ready(loadingTimer());

$('#submitMovie').on('click', function(){
    addMovie({title: ($('#newMovieTitle').val().toString()),
        genre: ($('#newMovieGenre').val().toString()),
        rating: ($('#newMovieRating').val().toString())})
});

$('#deleteMovie').('click', function(){
    deleteMovie()
});

