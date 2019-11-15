/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require("jquery");
require('bootstrap');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('#container').append(`<div>Id is ${id} number and the title is: ${title}, rated: ${rating}</div>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


$(window).on("load", function(){
  $(".loader").fadeOut(2000);
});

