/**
 * es6 modules and imports
 */
const $ = require('jquery');

$(document).ready(function(){
  var remove = $('#loading_wrap').remove();
  setTimeout(remove, 5000);
});
/**
 * require style imports
 */
const {
  getMovies,
  patchMovie,
  postMovie,
  getMovie,
  deleteMovie
} = require('./api.js');

getMovies().then(movies => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  })
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

function test_getMovie() {
  getMovie(3213123)
}

const test_patchMovie = () => {

};

const test_postMovie = () => {

};

const test_deleteMovie = () => {

};
test_getMovie();
