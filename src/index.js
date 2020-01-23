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
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.Check the console for details.');
  console.log(error);
});
 //functionality for the loading pane//

$(document).ready(function () {
  let loader1 = $('.container').hide().show(8000).hide(8000);
  let loader2 = $('.center').hide().show(8000).hide(8000);
});





