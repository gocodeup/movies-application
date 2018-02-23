/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

$(".container").html("<h1>Loading...</h1>");

getMovies().then((movies) => {
  let html = "<table><tr><th>ID</th><th>Movie</th><th>Rating</th></tr>";
  movies.forEach(({title, rating, id}) => {
    html += `<tr><td>${id}</td><td>${title}</td><td>${rating}</td></tr>`;
  });
  html += "</table>";
  $(".container").html(html);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
