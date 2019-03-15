// /**
//  * es6 modules and imports
//  */
// import sayHello from './hello';
// sayHello('Dwight');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const {makeHTML} = require('./htmlMaker.js');
// const {getRating} = require('./addMovie.js';)
// const {addMovie} = require('./addMovie.js');
// import banana from './htmlMaker.js'
// console.log(banana.makeHTML('test1', 'test2', 'test3'));

// console.log(message.newBinding());

// $('#movies').html(makeHTML('hi', 'bye', 'ok'));


// const showMovies = () => {
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    let html = "";
    movies.forEach(({title, rating, id}) => {
      html += makeHTML(title, rating, id);
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    });

    $("#movies").html(html);
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
// };

// showMovies().then((e => {
//
// }))



// const myPromise = fetch(`http://img.omdbapi.com/?apikey=${OMDB_KEY}&`)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));

// Add movies to database
// $("#submitMovie").on('click', (e) => {
//   e.preventDefault();
//   console.log('Good Job!');
//   };










////////////////////////////////////////
/////////// TURN BACK ON ///////////////
////////////////////////////////////////
$('#submitMovie').click(function(e) {
  e.preventDefault();
  console.log(getRating($('#movie-rating').val()));
  // let movieRating = getRating($('#movie-rating').val());
  // const newMovie = {
  //   "title": $('#movie-title').val(),
  //   "rating": movieRating
  // };
  // addMovie(newMovie);
  // showMovies();

});
//
//
//
const getRating = (stars) => {
    switch (stars) {
      case "5 Stars":
        console.log('5');
        return 5;
      case "4 Stars":
        console.log('4');
        return 4;
      case "3 Stars":
        console.log('3');
        return 3;
      case "2 Stars":
        console.log('2');
        return 2;
      case "1 Star":
        console.log('1');
        return 1;
      default:
        return "undefined"
    }
  };
//
//
// const addMovie = ({title, rating}) => {
//     let newMovie = { title, rating };
//     fetch('./api/movies', {
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json"},
//       body: JSON.stringify(newMovie)})
//         .then(response => JSON.stringify(response));
//   }
//   addMovie(newMovie);
//
//
// const makeHTML = (title, rating, id) => {
//   let html = `<div>`;
//   html += `<h1>${title}</h1>`;
//   html += `<h2>${rating}</h2>`;
//   html += `<h3>${id}</h3>`;
//   html += `</div>`;
//   return html;
// };





//////// npm run dev in terminal, then refresh window