/**
 * es6 modules and imports
 */
const $ = require('jquery');
const {editMovie} = require('./api.js');
const {deleteMovie} = require('./api.js');
const {addMovie} = require('./api.js');


// let $body = $("body");
//
// $(document).on({
//   ajaxStart: function() { $body.addClass("loading");    },
//   ajaxStop: function() { $body.removeClass("loading"); }
// });
//
//
//
// import sayHello from './hello';
// sayHello('World');
//
// /**
//  * require style imports
//  */
// const {getMovies} = require('./api.js');
//
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });
//
// //------------------------------
//
// const {postMovie} = require('./api.js');
//
// postMovie().then((movie, id) => {
//   console.log('POST MOVIE WORKING');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
//
// });
//
// //------------------------------

editMovie().then((movie, id) => {
  console.log('EDIT MOVIE WORKING');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// //------------------------------


deleteMovie().then((movies) => {
  console.log('DELETE MOVIE WORKING');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// import {getMovies,addMovie,deleteMovie,editMovie} from'./api.js';
const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const movieTitle = document.querySelector('#movie-title');
const movieRating = document.querySelector('#movie-rating');


const movieRefresh = () => {
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    })

  }).catch((error) => {
    alert('Oh no! Something went wrong.');
    console.log(error);
  });
};

//---------------------------------------------------------------------------------------------

$('#add-movie').click(function (e) {
  e.preventDefault();
  const addedMovietitle = movieTitle.value;
  const addedMovieRating = movieRating.value;
  const addedMovie = {
    title: addedMovietitle,
    rating: addedMovieRating
  };
  addMovie(addedMovie);
  console.log(addedMovie);
  movieRefresh();

});
