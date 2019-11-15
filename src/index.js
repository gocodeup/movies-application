/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
import $ from 'jquery';
/**
 * require style imports
 */
const {getMovies} = require('./api.js');

$(document).ready(() => {
  $("main").html("loading...");

  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    $("body").html("Here are all the movies:");
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
      $("body").append(`${title} - rating: ${rating}`);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });



$('#addButton').click(() => {
  $('#modalLabel').html('Add Movie')
});

$('#editButton').click(() => {
  $('#modalLabel').html('Edit Movie')
});


});