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



getMovies().then((movies) => {
  $("h1").text("Welcome to the movies");
  let htmlString = "";
  // console.log('Here are all the movies:');
  // movies.forEach(({title, rating, id}) => {
  //   console.log(`id#${id} - ${title} - rating: ${rating}`);
  movies.forEach(function(movie) {
    htmlString += `<div class="panel panel-default"><h2>${movie.title}</h2></div> <div class="panel-body"><p>Rating ${movie.rating}</p></div>`
  });
  $('.htmlHere').html(htmlString);

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// $('.container').html('Here are all the movies:');

const displayMovies = () => {
    $('.main-display').html('Loading...');
};
displayMovies();