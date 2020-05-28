/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
// const {getMovies} = require('./api.js');
import { getMovies } from './api';

console.log(getMovies);

getMovies().then((movies) => {
  // console.log('Here are all the movies:');
  document.body.innerHTML = "<div class='container'><ul id='movies'></ul></div>"
  movies.forEach(({title, rating, id}) => {
    let list = document.createElement('li');
    let currentMovie = document.createTextNode(`ID:${id} Title:${title} Rating:${rating}`);
    list.appendChild(currentMovie);
    document.querySelector('#movies').appendChild(list);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
