/**
 * es6 modules and imports
 */
import sayHello from './hello';

const $ = require('jquery');
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const movieBlock = document.getElementById('movie-container');

const movieGenerator = (({title, rating, id}) => {
    let movieContainer = document.createElement('div');
    let titleDiv = document.createElement('div');
    let ratingDiv = document.createElement('div');
    movieContainer.className = "movie-container";
    titleDiv.className = "title";
    ratingDiv.className = "rating";
    movieContainer.appendChild(titleDiv);
    movieContainer.appendChild(ratingDiv);
    titleDiv.textContent = `"${title}"`;
    ratingDiv.textContent = `${rating} out of 5 stars`;
    movieBlock.appendChild(movieContainer);
});

getMovies().then(
    $('.stuff').css({
        "display": "block",
    })
)
    .then((movies) => {
        $('.stuff').css({
            "display": "none"
        });
        $('.post-load-container').css({
            "display": "block"
        });


        movies.forEach(({title, rating, id}) => {
            movieGenerator(({title, rating, id}));

            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
    }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});
