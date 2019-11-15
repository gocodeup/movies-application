/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

// const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

getMovie(1)
    .then(movie => {
      console.log("Making a request to a single book");
      console.log(`${movie.title} by ${movie.rating}`);
    })
    .catch(() => console.log('The important thing is you tried...'));


postMovie({
  "title": "adsaf",
  "rating": "dasf"

}).then(getMovies).then((movies) => {
  console.log('Here are all the books:');
  movies.forEach(({title, rating}) => {
    console.log(`${title} by ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

deleteMovie(27).then(postMovie({
  "title": "Garfield Loses His Feet",
  "rating": "1"

})).then(getMovies).then((movies) => {
  console.log('Here are all the books:');
  movies.forEach(({title, rating}) => {
    console.log(`${title} by ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


// const makeMovie = (title, rating) => {
//   return {
//     "title" : title,
//     "rating" : rating
//   };
// };

// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(movie),
// };

// console.log(makeMovie("LOTR", 6));
//
// fetch("http://localhost:1313/", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(makeMovie("LOTR", 6)),
// }).then().catch(() => {console.log("FUCC")});