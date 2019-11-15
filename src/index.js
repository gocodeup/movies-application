/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');


// import {getMovies} from './api.js';


/**
 * require style imports
 */
const $ = "jquery";
const {getMovie, getMovies, createMovie, patchMovie, deleteMovie} = require('./api.js');
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

////////////////////////
//////GET MOVIES////////
////////////////////////

getMovies()
    .then((movies) => {
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
    }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});


////////////////////////
//////GET ONE MOVIE/////
////////////////////////

getMovie(1)
    .then((movie) => {
        console.log('Here is the first movie: ');
        console.log(`id#${movie.id} - ${movie.title} - rating: ${movie.rating}`);

    })
    .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });

///////////////////////
//////CREATE MOVIE/////
///////////////////////

createMovie({

}).then(getMovies).then((movies) => {
    console.log('Here are all the movies: ');
    movies.forEach(({title, rating}) => {
        console.log(`title:${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});


///////////////////////
//////PATCH MOVIE/////
///////////////////////

patchMovie({
    "title": "Darjeeling Limited",
    "rating": "5"
}, 3).then(getMovies).then((movies) => {
    console.log('Here are all the books:');
    movies.forEach(({title, rating}) => {
        console.log(`${title}, ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

///////////////////////
//////DELETE MOVIE/////
///////////////////////


deleteMovie(4).then(getMovies).then((movies) => {
    console.log('Here are all the books:');
    movies.forEach(({title, rating}) => {
        console.log(`${title} ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});





