/**
 * es6 modules and imports
 */
import sayHello from './hello';
import { getMovies } from './api.js';


/**
 * require style imports
 */
sayHello('World');


getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
