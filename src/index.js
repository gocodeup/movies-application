const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log(movies);
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#loading-message').html('');
    $('.container').append(`<div>id#${id} - ${title} - rating: ${rating}</div>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
