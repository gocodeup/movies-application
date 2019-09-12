/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const makeMovieCard = movie => {
  let html = `<div>`;
  html += `<div><h3>Rating: ${movie.rating} / 5</h3></div>`;
  html += `<div><h2>${movie.title}</h2></div>`;
  html += `</div>`;
  return html;
};

getMovies().then((movies) => {
  $("#viewport").html("");
  movies.forEach((movie) => {
    $("#viewport").append(makeMovieCard(movie));

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
