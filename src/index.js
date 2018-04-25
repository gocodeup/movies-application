/**
 * es6 modules and imports
 */

'use strict';
const $ = require('jquery');
import sayHello from './hello.js';
sayHello('World');

/**
 * require style imports
 */

const {getMovies} = require('./api.js');
$(".loader").css("display", "block");
getMovies().then((movies) => {
    $(".loader").css("display", "none");
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

