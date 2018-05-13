/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./api.js');

table();

function showAllMovies() {
    table();
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        document.getElementById("loading").innerHTML = 'here are the movies';
        movies.forEach(({title, rating}) => {
            displayTableMovies(title, rating);

            console.log(` ${title} - rating: ${rating}`);


        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}

showAllMovies();

const header = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})

function table() {
    document.getElementById("movie-list").innerHTML = `<tr><th>Movie Title</th><th>Movie Rating</th></tr>`

}

function displayTableMovies(title, rating) {
    document.getElementById("movie-list").innerHTML +=`<tr><td>${title}</td><td>rating: ${rating}</td></tr>`

}

function addMovie() {
    let movieTitle = document.getElementById('title').value;
    let movieRating = document.getElementById('rating').value
    if (movieTitle === "") {
        alert("its empty")
    } else {
        let movieObj = {
            title: movieTitle,
            rating: movieRating
        };
        let options = {
            method: "POST",
            body: JSON.stringify(movieObj),
            header: header
        };
        document.getElementById("title").value = "";
        document.getElementById("rating").value = "1";
        fetch("/api/movies", options)
            .then(response => response.json())
        displayTableMovies(movieTitle, movieRating)

    }
}


document.getElementById("sub").addEventListener("click", addMovie)