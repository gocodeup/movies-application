/**
 * es6 modules and imports
 */
//------Whilst the page loads-----------//

function onReady(callback) {
  let intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector('#loading-thing').style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.page', true);
  setVisible('#loading', false);
});

//===========================================//

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

const $ = require('jquery');


const {getMovies, addNewMovie} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


$('#add-movie').click(function(event){
  //prevents the page from refreshing
  event.preventDefault();

  // //mmmm...store the value of the text inputs into variables
    let movieTitle = $("#movie-title").val();
    let rating = $("#movie-rating").val();
    addNewMovie(movieTitle, rating);
  // // call addMovies, passing in those variables


});
