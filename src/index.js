/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('Codeup');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const $ = require('jquery');



getMovies().then((movies) => {
  $('#loading').hide();
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('#content').append(`<div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

