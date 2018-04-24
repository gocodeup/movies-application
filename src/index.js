/**
 * This file is the "entrypoint" into your application
 */
import 'bootstrap'
import $ from 'jquery'

// $(() => {
//   $('[data-toggle="popover"]').popover()
// })

const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  $(".x").toggleClass("invisible");
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });

}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});
