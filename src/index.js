const $ = require('jquery');

/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


const runMovies = function() {
    getMovies().then((movies) => {
        let htmlString = "";
        // console.log('Here are all the movies:');
        // movies.forEach(({title, rating, id}) => {
        //   console.log(`id#${id} - ${title} - rating: ${rating}`);
        movies.forEach(function (movie) {
            htmlString += `<div class="box box${movie.id}">${movie.id}. ${movie.title}</div> <div class="box box${movie.id}">Rating: ${movie.rating}</div>`
        });
        $('.container').html(htmlString);

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};
runMovies();

const displayMovies = () => {
    $('.main').html('Loading...');
};
displayMovies();


// on click of button pull in the values from id="movieTitle" id="movieRating"

$('#add-new-movie').click(function()  {
  const addMovie = $('#movieTitle').val();
  const addRating = $('#movieRating').val();
  const addObj = {title: addMovie, rating: addRating};
  const url = '/api/movies';
  const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addObj),
  };
    fetch(url, options)
        .then(runMovies)
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
});

$('h2').click(function() {
    console.log("click");
  const id = (movies.id).val();
  console.log(id);
});









