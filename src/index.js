/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
let movieTitles = document.getElementById("movie-title");

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  console.log(movies);
  movies.forEach(({title, rating}) => {
      //   console.log(`id#${id} - ${title} - rating: ${rating}`);
      movieTitles.innerHTML +=
          ` 
          <div>
          ${title} - rating: ${rating}
          </div>
          
          `;
  })
})
  .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
