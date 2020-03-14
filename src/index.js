/*   ES6 MODULES & IMPORTS  */
// NOTE: ONLY HAVE 'REQUIRE' OR 'IMPORT' METHOD FOR EACH FUNCTION @ THE TOP OF THE PAGE...NOT BOTH!

const $ = require('jquery'); // Enables jQuery
const {getMovies} = require('./api.js'); // Retrieves movie API data
const {addMovie} = require('./api.js'); // Enables "Add Movie" function
const {deleteMovie} = require('./api.js'); // Enables "Delete Movie" function
// const {editMovie} = require('./api.js'); // Enables "Edit Movie" function

//-------ADDING RETRIEVED MOVIES TO AN HTML TABLE WITH REFRESH BUTTON: START-----------

  var displayMovie = 0;

  function loadData() {
    if (displayMovie === 0) {
      $.get("/api/movies").done(function (data) {
        $.each(data, function (i, items) {
          $('#insertMovies').append(
              '<tr>' +
              '<td>' + '<em>' + items.title + '</em>' + '</td>' +
              '<td>' + items.rating + '</td>' +
              '</tr>');
        })
      })
    }
    return displayMovie = 1;
  }
  loadData(displayMovie);

//Clicking the "Add Movie" button will refresh the table data and auto-populate new entry
  $("#add-movie").click(function () {
    $('#insertMovies').html("");
    return loadData(displayMovie = 0);
  });

//-------ADDING RETRIEVED MOVIES TO AN HTML TABLE WITH REFRESH BUTTON: END-----------

//-------GET MOVIES: START-----------

getMovies().then((movies) => {
  movies.forEach(({title, rating, id}) => {
    console.log(`ID# ${id} - ${title} - Rating: ${rating}`); // Shows all movies in database in JS console
  });
}).catch((error) => {
  alert('"getMovies" function is not working. Check JS console for details...');
  console.log(error);
});

//-------GET MOVIES: END-----------

//-------DELETE MOVIE: START-----------

// deleteMovie().then((movies) => {
//   console.log('DELETE MOVIE WORKING');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('"deleteMovie" function is not working. Check JS console for details...');
//   console.log(error);
// });
//
// // import {getMovies,addMovie,deleteMovie,editMovie} from'./api.js';
// const form = document.querySelector('form');
// const input = document.querySelector('#searchTerm');
// const movieTitle = document.querySelector('#movie-title');
// const movieRating = document.querySelector('#movie-rating');

//-------DELETE MOVIE: END-----------

//-------EDIT MOVIE: START-----------

// editMovie().then((movie, id) => {
//   console.log('EDIT MOVIE WORKING');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('"editMovie" function is not working. Check JS console for details...');
//   console.log(error);
// });

//-------EDIT MOVIE: END-----------

//-------POST MOVIE: START-----------

// postMovie().then((movie, id) => {
//   console.log('POST MOVIE WORKING');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('"postMovie" function is not working. Check JS console for details...');
//   console.log(error);
// });
//
//-------POST MOVIE: END-----------

//-------REFRESH MOVIES: START-----------

const movieRefresh = () => {
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    })

  }).catch((error) => {
    alert('"movieRefresh" function is not working. Check JS console for details...');
    console.log(error);
  });
};

//-------REFRESH MOVIES: END-----------

//-------ADD MOVIE: START-----------

$('#add-movie').click(function (e) {
  e.preventDefault();
  const addedMovieTitle = movieTitle.value;
  const addedMovieRating = movieRating.value;
  const addedMovie = {
    title: addedMovieTitle,
    rating: addedMovieRating
  };

  addMovie(addedMovie);
  console.log(addedMovie);
  movieRefresh();
});

//-------ADD MOVIE: END-----------
