//modules required
const $ = require('jquery');
const OMDB_API_KEY = require('./keys.js');
const {getMovies} = require('./api.js');
const {getOMDB} = require('./api.js');
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
getOMDB("Bad Boys")
    .then(response => console.log(response));



