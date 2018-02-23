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
// const movieList =
getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $("span").html(" ");
  movies.map(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
      $("#movie-list").append(`<dl>`);
    $("#movie-list").append(`<dt>${title}</dt><dd>rating: ${rating}</dd>`);
      $("#movie-list").append(`</dl>`);

  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});



//form -------------------


$("#movie-form").submit(function(e) {
    e.preventDefault();
    // $("#city-weather").html("");
    // $("#current-forecast").html("");
    // latLon.newLat = $("#latitude").val();
    // latLon.newLon = $("#longitude").val();
    // forecast(latLon);
    // $("#weather-form")[0].reset();
    console.log($("#movie-title").val());
    console.log($("#movie-rating").val());
const movieList = {title: $("#movie-title").val(), rating: $("#movie-rating").val()};
const url = '/api/movies';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieList),
};
fetch(url, options)
    .then(console.log('post was created successfully'))
    .catch(console.log('error'));
});

// const movieTile;
// const movieRating;
//
//
//
