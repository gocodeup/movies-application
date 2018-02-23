const $ = require('jquery');


/**
 * es6 modules and imports
 */

// this runs the loading.gif image
const loadingGif = () => {
    $('.container').html("<img src='./img/page-loader.gif' class='loader'>");
};
loadingGif();

// hide form until called in getMovies function
$('.page-loader').hide();

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  formLoader();
  let moviesBuilder = [];
  movies.forEach(({title, rating}) => {
    moviesBuilder.push(`The title of the movie is: ${title} and the rating is: ${rating}.`);
  });

// this builds movie html and prints to page
let list = '<ul>';
for (let mov of moviesBuilder) {
  list += `<h2> ${mov} </h2>`;
}
list += '</ul>';
$('.container').html(list);

// this runs if there is an error
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// this function shows the forms upon page load when called
function formLoader() {
    $('.page-loader').show();
}
