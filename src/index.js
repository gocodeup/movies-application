'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here
// window.$ = $; //What it do? i dont know
require('bootstrap'); // We need bootstrap --> pulling the bootstrap here

/**
* es6 modules and imports
*/
import sayHello from './hello'; // This function says hello imported from hello.js where it is defined, Name the function here
sayHello('World'); // call the hello function

/**
 * require style imports
 */
const {getMovies} = require('./api.js'); //Get the get movies function from the api.js file

getMovies().then((movies) => { //use the getmovies function to pull all the movies

  console.log('Here are all the movies:'); // console this message
  $('#all-movies').html('');

  movies.forEach(({title, rating, id}) => { //iterate through each movie object and get the title, rating, and id


    $('#all-movies').append(`<div class='card'><div class="card-body">id#${id} - ${title} - rating: ${rating} </div></div>`); //console.log the id, title, and rating

  });

}).catch((error) => { //If the AJAX request fails

  alert('Oh no! Something went wrong.\nCheck the console for details.'); //display the error message

  console.log(error); //console log the error

});
