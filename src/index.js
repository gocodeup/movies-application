/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

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
  getMovie(3000);
}

const test_patchMovie = () => {

}

const test_postMovie = () => {

}

const test_deleteMovie = () => {

}
