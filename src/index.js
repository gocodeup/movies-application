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
// patchMovie({
//     "title": "movie",
//     "rating": "4"
// }, 1);
// postMovie( {
//     "title": "movie",
//     "rating": "4",
//     "id": 1
// });
getMovies().then(movies => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  })
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
// const addMovies = (response) => {
//   $('#searchButton').on('click', function(){
//     $('#addMovie').append()
//   })
// };
getMovie(2);

patchMovie({"title":"some movie", "rating":"3"}, 3);

patchMovie({"title":"Star Wars VII", "rating":"0.5"}, 4);

deleteMovie(4);
