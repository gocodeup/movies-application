/**
 * es6 modules and imports
 */
const $ = require('jquery');

let $body = $("body");

$(document).on({
  ajaxStart: function() { $body.addClass("loading");    },
  ajaxStop: function() { $body.removeClass("loading"); }
});



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
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});



