/**
 * es6 modules and imports
 */
const sayHello = require('./hello.js');

sayHello(`Terry`);

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

// console.log(getMovies);

getMovies().then(movies => {
  console.log('Here are all the movies:');
console.log(movies);

  movies.forEach(({title, rating, id}) => {


    console.log(`${id} ${title} ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
