

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

//get all movies
getMovies().then((movies) => {
  $('body').removeClass("loading");
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
//get a single book
    getMovie(1)
        .then(movie => {
          console.log("Making a request to a single movie");
          console.log(`${movie.title} by ${movie.author} - ${book.year}`);
        })
        .catch(() => console.log('The important thing is you tried...'));



//davids code

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//     getBooks().then((books) => {
//       console.log('Here are all the books:');
//       books.forEach(({title, author, year}) => {
//         console.log(`${title} by ${author} - ${year}`);
//       });
//     }).catch((error) => {
//       alert('Oh no! Something went wrong.\nCheck the console for details.')
//       alert('Oh no! Something went wrong.\nCheck the console for details.');
//       console.log(error);
//     });
//
//     getBook(1)
//         .then(book => {
//           console.log("Making a request to a single book");
//           console.log(`${book.title} by ${book.author} - ${book.year}`);
//         })
//         .catch(() => console.log('The important thing is you tried...'));
//
// // postBook({
// //   "author": "Jim Davis",
// //   "country": "United States",
// //   "imageLink": "images/???.jpg",
// //   "language": "English",
// //   "link": "https://www.amazon.com/Garfield-Loses-His-Feet-Book/dp/0345464672\n",
// //   "pages": 98,
// //   "title": "Garfield Loses His Feet",
// //   "year": 1984
// // }).then(getBooks).then((books) => {
// //   console.log('Here are all the books:');
// //   books.forEach(({title, author, year}) => {
// //     console.log(`${title} by ${author} - ${year}`);
// //   });
// // }).catch((error) => {
// //   alert('Oh no! Something went wrong.\nCheck the console for details.');
// //   console.log(error);
// // });
//
// // patchBook({
// //   "pages": 1201,
// //   "title": "Garfield Learns Python III",
// //   "year": 2023
// // }, 26).then(getBooks).then((books) => {
// //   console.log('Here are all the books:');
// //   books.forEach(({title, author, year}) => {
// //     console.log(`${title} by ${author} - ${year}`);
// //   });
// // }).catch((error) => {
// //   alert('Oh no! Something went wrong.\nCheck the console for details.');
// //   console.log(error);
// // });
//
//     deleteBook(27).then(postBook({
//       "author": "Jim Davis",
//       "country": "United States",
//       "imageLink": "images/???.jpg",
//       "language": "English",
//       "link": "https://www.amazon.com/Garfield-Loses-His-Feet-Book/dp/0345464672\n",
//       "pages": 98,
//       "title": "Garfield Loses His Feet",
//       "year": 1984
//     })).then(getBooks).then((books) => {
//       console.log('Here are all the books:');
//       books.forEach(({title, author, year}) => {
//         console.log(`${title} by ${author} - ${year}`);
//       });
//     }).catch((error) => {
//       alert('Oh no! Something went wrong.\nCheck the console for details.');
//       console.log(error);
//     });