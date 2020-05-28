/**
 * es6 modules and imports
 */
const $ = require('jquery');

import sayHello from './hello';
sayHello('World');



/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const {addMovie} = require('./api.js');
// const {createMovie} = require('./api.js');

function renderMovies(movies){
  var html = "";
  movies.forEach(({title, rating, id}) => {
    $('#movieList').empty();
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    html += '<div>' + `id#${id} - ${title} - rating: ${rating}` + '</div>';
    $('#movieList').append(html);
  })
}

getMovies().then((movies) => renderMovies(movies)).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

let createMovie = (title, rating) => {
  let newMovie = {"title": title, "rating": rating}
  return newMovie;
}


addMovie(createMovie("test1", "4")).then((movies) => renderMovies(movies));


