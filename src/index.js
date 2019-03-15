/**
 * es6 modules and imports
 */


/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const {makeHTML} = require('./htmlMaker.js');
const {addMovie} = require('./addMovie.js');



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



////////////////////////////////////////
/////////// TURN BACK ON ///////////////
////////////////////////////////////////
$('#submitMovie').on('click', (e) => {
  e.preventDefault();
  console.log(getRating($('#movie-rating').val()));
  let movieRating = getRating($('#movie-rating').val());
  const newMovie = {
    "title": $('#movie-title').val(),
    "rating": movieRating
  };
  console.log(newMovie);
  addMovie(newMovie);
  // showMovies();

});

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






//////// npm run dev in terminal, then refresh window

//Loading text while our AJAX request processes
// $(document).ready(function () {
//   $(document).ajaxStart(function () {
//     $("#loading").show();
//   }).ajaxStop(function () {
//     $("#loading").hide();
//   });
// });






