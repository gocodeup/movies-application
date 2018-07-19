/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
import $ from 'jquery';


import {getMovies, addMovies} from './api';


getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#movie-info').append(`<li> id#${id} - ${title} - rating: ${rating} </li>`);

  });
    loader.removeClass("visible");
    loader.addClass("invisible");
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
const loader = $('#loading');
$(document).ready(() => {
  loader.addClass("visible")
});

addMovies();





