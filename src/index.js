/**
 * es6 modules and imports

 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

//
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });




//   $('#btn-1').on('click', function () {
//   const movieSearch = $('#searchText').val();
//   if (movieSearch.type != 'string') {
//     alert(movieSearch)
//   } else {
//     console.log(movieSearch)
//   }
// })
const omdbKey = "aefabb3f";
const searchString = ($('#searchText').val());
const search = searchString.replace(/\s/g, "");

$('#btn-1').on('click', function () {
  console.log(search);
  return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t${search}`)
      .then(response => response.json())
      // .then(data => console.log(data))
})


// getMovies()
//     .then(data => console.log(data));











