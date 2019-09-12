/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const makeMovieCard = movie => {
    let html = `<div>`;
    html += `<div><h3>Rating: ${movie.rating} / 5</h3></div>`;
    html += `<div><h2>${movie.title}</h2></div>`;
    html += `</div>`;
    return html;
};

const displayMovies = () => {
    getMovies().then((movies) => {
        $("#viewport").html("");
        movies.forEach((movie) => {
            $("#viewport").append(makeMovieCard(movie));
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

const addNewMovie = () => {
    const newTitle = $('#newTitle').val();
    const newRating = $('#newRating').val();
    // console.log(newTitle);
    // console.log(newRating);
    const newMovie = {
        title: newTitle,
        rating: newRating
    };
    // console.log(newMovie);

    // const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
    // const url = '/posts';
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(displayMovies)
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
};






displayMovies();

$('#newSubmit').click(addNewMovie);
