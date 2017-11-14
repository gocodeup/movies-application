/**
 * es6 modules and imports
 */
const sayHello = require('./hello.js');

sayHello(`Terry`);

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require ('jquery');

// console.log(getMovies);

getMovies().then(movies => {
    let moviesHTML = "";

    movies.forEach(function (movie) {

        moviesHTML += "<div class='row col-sm-offset-2 col-sm-8'>";
        moviesHTML += "<div class='row col-sm-4'>" + 'Movie' + "</div>";
        moviesHTML += "<div class='row col-sm-4'>" + 'ID' + "</div>";
        moviesHTML += "<div class='row col-sm-4'>" + 'Rating' + "</div>";
        moviesHTML += "<div class='row col-sm-4'>" + movie.title + "</div>";
        moviesHTML += "<div class='row col-sm-4'>" + movie.id + "</div>";
        moviesHTML += "<div class='row col-sm-4'>" + movie.rating + "</div>";
        moviesHTML += "</div>";

    });

    $(".bodyHTML").html(moviesHTML);

  console.log('Here are all the movies:');
  console.log(movies);

  movies.forEach(({title, rating, id}) => {

    console.log(`${id} ${title} ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
