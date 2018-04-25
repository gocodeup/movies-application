import $ from 'jquery';
window.jQuery = $;
require('rateyo/src/jquery.rateyo');

/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

setTimeout(function () {
    $('body > div > h1:nth-child(1)').addClass('poof');
}, 2000);

//console.log($("#rateYo").rateYo);

$("#rateYo").rateYo({
    rating: 1,
    starWidth: "20px"

});
