/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies, getMovie, createMovie} = require('./api.js');



////////////////////////
//////GET MOVIES////////
////////////////////////

getMovies()
    .then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


////////////////////////
//////GET ONE MOVIE/////
////////////////////////

getMovie(1)
    .then((movie) => {
  console.log('Here is the first movie: ');
      console.log(`id#${movie.id} - ${movie.title} - rating: ${movie.rating}`);

})
    .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

///////////////////////
//////CREATE MOVIE/////
///////////////////////

createMovie({
  "title": "Vanilla Sky",
  "rating": "4"
}).then(getMovies()).then((movies) => {
  console.log('Here are all the movies: ');

  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


