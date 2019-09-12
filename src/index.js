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
        $('#spinner').css('display', 'none');
        console.log('Here are all the movies:');

        movies.forEach(({title, rating, id}) => {
          return $('body').append(`id#${id} - ${title} - rating: ${rating}`);
        })
      })
      .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
      });

// this function added movies
  let title;
  let rating;
  let obj = {};
      $('#add-movie').click(function () {
        title = $('#title-input').val();
        rating = $('#rating-input').val();
        fetch("/api/movies", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: obj.title,
        rating: obj.rating
    })
});
      });








