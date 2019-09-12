/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');
const {greeting} = require(`./hello.js`);
greeting('Ceres');
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
//OG
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


// this function displays the movie selection and hides the spinner upon load
  getMovies()
      .then((movies) => {
        // Always hide the spinner
        document.querySelector('#spinner').style.display = 'none';
        console.log('Here are all the movies:');

        movies.forEach(({title, rating, id}) => {
          return $('body').append(`id#${id} - ${title} - rating: ${rating}`);
        })
      })
      .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
      });



