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
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


//making ajax request for movie list
var request = $.ajax("db.json");

request.fail(function(jqXhr, status, error) {
    console.log("There was an error!");
    console.log("Response status: " + status);
    console.log("Error obj: " + error);
});
request.done(function(data) {
    console.log(data);
    data.forEach(function(movie) {
        addMovieList(movie);
    });
});

//adding movie list to page
function addMovieList(movies) {
    var htmlString = "";
    htmlString += "<tr>";
    htmlString += "<td>" + movies.title + "</td>";
    htmlString += "<td>" + movies.rating + "</td>";
    htmlString += "<td>$ " + movies.id + "</td>";
    htmlString += "</tr>";
    $("#insertMovies").append(htmlString);
}