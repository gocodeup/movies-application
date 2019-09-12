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
 let  html = `<p>${movie.title}</p>`;
  html += `<p>${movie.rating}</p>`;
  return html;
};

getMovies().then((movies) => {
  // $("#viewport").html("All done!");
  // console.log('Here are all the movies:');
  // movies.forEach(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
  $("#viewport").html("");
  movies.forEach((movie) => {
    $("#viewport").append(makeMovieCard(movie));

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
