/**
 * This file is the "entrypoint" into your application
 */
import 'bootstrap'
import $ from 'jquery'
import {getMovies} from './api.js';
// import {getMovies()} from '/src/api.js'
//import '../movieStyle.css'

$(() => {
  $('[data-toggle="popover"]').popover()
})
//



// index.js
const data = require('../add_movie.js');

console.log(data.whichSideOfTheForce); // outputs "The Dark Side"



$(document).ready(function(){
    setTimeout(function(){

    $(".loadGif").hide();
},2000);

});

// const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    $(".x").toggleClass("invisible");
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
        //$("table").append(`<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button>delete</button></td></tr>`);
    });

}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});