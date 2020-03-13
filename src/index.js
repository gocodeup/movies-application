const $ = require('jquery');


/**
 * es6 modules and imports
 */
import sayHello  from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie} = require('./api.js');

$('#submit').click(function (e) {
e.preventDefault();
addMovie();
});
$('#hello').css('background', 'blue');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('#movies').append(
        `<p>id#${id} - ${title} - rating: ${rating}</p>`
    )
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


