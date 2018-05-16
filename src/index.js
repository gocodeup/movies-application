/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./api.js');


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
});


function addMovie() {
    let movieTitle = document.getElementById("title").value;
    let movieRating = document.getElementById("rating").value;

    if (movieTitle === "") {
        alert("It's Empty")
    } else {
        let movieObj = {
            title: movieTitle,
            rating: movieRating
        };
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(movieObj),
            headers: header
        };
        document.getElementById("title").value = "";
        document.getElementById("rating").value = "1";
        fetch("/api/movies", fetchOptions)
            .then((response) => console.log(response.json()))
        displayTableMovies(movieTitle, movieRating)



    }

}

document.getElementById("sub").addEventListener("click", addMovie)


function table() {
    document.getElementById("movie-list").innerHTML = `<tr><th>Movie Title</th><th>Movie Rating</th></tr>`


}

function displayTableMovies(title, rating) {
    document.getElementById("movie-list").innerHTML += `<tr><td>${title}</td><td>rating: ${rating}</td></tr>`

}

function deleteButton() {
    let movieToDeleteId = document.getElementById("delete-movie").value;
    let fetchOptions = {
        method: "DELETE",
        headers: header
    };
    fetch(`/api/movies/${movieToDeleteId}`, fetchOptions).then(() => {
        document.getElementById("movie-list").innerHTML = "";
        unHide("movie-list-container");
        reHide("delete-form");
        unHide("new-movie-form");
        unHide("delete-a-movie");
        unHide("edit-button");
        reHide("cancel-button");
        disableButton("delete-this-movie")
    })
        .then(() => {
            displayAllMovies()
        })
    // .then(()=>changeHelloAgain());
}

document.getElementById("delete-this-movie").addEventListener("click", deleteButton);
document.getElementById("delete-this-movie").addEventListener("click", function () {
    movieDeleted();
    setInterval(changeHelloAgain, 1000)
});


