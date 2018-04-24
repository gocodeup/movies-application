/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const $ = require("jquery");
const {getMovies} = require('./api.js');
const {created} = require('./create-movie');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $(".container").append(`<table><tr><td>${title} - rating: ${rating}</td></tr></table>`);
    displayLoading();
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

function displayLoading() {
    $(".loadingMessage").css("display", "none");
    $("h1").text("Movie List");
}

$("#createBtn").click(function(){
  const movieTitle = $("#movieTitle").val();
  const movieRating = $("#movieRating").val();

  created({title: movieTitle,
  rating: movieRating})
});

