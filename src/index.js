//modules required
const $ = require('jquery');
const {OMDB_API_KEY} = require('./keys.js');
const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
const {getMovies} = require('./api.js');
const {getOMDB} = require('./api.js');
const {searchTheMovieDBID} = require('./api.js');
const {searchMovie} = require('./api.js');
const {updateCRUDyDB} = require('./api.js');
// const {movieData} = require('./api.js');
getMovies()
    .then((movies) => {
      // console.log('Here are all the movies:');
      $('#loading-h1').remove();
      let i = 1
      movies.forEach(({title, rating, id}) => {

        $('#main-container').append(`<div class="movie-container" id="movie-container-${i}">id#${id} - ${title} - rating: ${rating}</div>`)
        i++;
        console.log(`id#${id} - ${title} - rating: ${rating}`);
      });
      return movies;
    })
    .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
// getOMDB("Ninja Turtles")
//     .then(response => console.log(response));
searchTheMovieDBID("Star Wars The Phantom Menace")
    // .then(response => console.log(response))
    .then(response => {
        return response['results'][0];
    })
    .then(response => searchMovie(response))
    // .then(response => console.log(response))
    .then(response => updateCRUDyDB(response))
// updateCRUDyDB('cat');






