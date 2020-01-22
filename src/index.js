/**
 * es6 modules and imports
 */

const $ = require('jquery');

import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


$('#submit').click(function() {
    getMovies().then((movies) => {
        // console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            $('#movies').append(`${id} - ${title} - rating: ${rating}, `);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
});

// loader------------------------------
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function () {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}

//pulling movie data----------------------


// $.ajax("db.json").done(function(data){
  // $('#submit').click(function(){
  //   $('#movies').html(`<h1> hello</h1>`)
  // });
// }

