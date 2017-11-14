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
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

 $.get('api/movies').done(function (data) {
    buildHTML(data);
}).fail(function (jqXhr, status, error) {
    console.log("there was an error!");
    console.log("response status:" + status);
    console.log("check console log for" + error)
});
// text on screen
    function buildHTML(movies) {
        let moviesHTML = "";
        movies.forEach(function (movies) {


            moviesHTML += "<div class='movies'>";
            moviesHTML += "<tr>" + movies.title + " </tr>";
            moviesHTML += "<td>" + movies.rating + " </td>"


        });
        $("#movies").html(moviesHTML);
}


