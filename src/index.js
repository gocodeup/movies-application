/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require("jquery");

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    document.body.innerHTML =`<h1>Id is ${id} number and the title is: ${title}, rated: ${rating}</h1>`;
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


$(window).load(function(){
  $(".spinnertest").fadeOut("slow");
});