/**
 * es6 modules and imports
 */
// import sayHello from './hello.js';
// sayHello('World');

/**
 * require style imports
 */

import $ from "jquery";
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');



// import {getMovies, getMovie, postMovie, patchMovie, deleteMovie} from "./api" ;
// const {getMovies} = require('./api.js');

// fetch("./api.js").then();

getMovies().catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

let movies;


getMovie(1)
    .then(movie => {
      console.log(`Title:${movie.title} Rating: ${movie.rating}`);
    })
    .catch(() => console.log('The important thing is you tried...'));

let moviesDiv = document.getElementById("container");
let loadingGIF = document.getElementById("loading");
let postButton = document.getElementById("create-submit");

function updateMovies() {
    getMovies().then((result) => {
        $("#loading").toggleClass("hide");
        moviesDiv.innerHTML = "<p> HELLO </p>";
        moviesDiv.innerHTML = "";
        for (let i = 0; i < result.length; i++) {
            generateCard(result[i].title, result[i].rating);
        }

        $("#main").toggleClass("hide");
    });
}

updateMovies();

function generateCard(title, rating) {
    let card = ``;
    card += `<div class="card">`;
    card += `<button class="delete">`;
    card += `<img src="..." class="card-img-top" alt="...">`;
    card += `<div class="card-body">`;
    card += `<p class='card-text'>${title}, ${rating}</p>`;
    card += `</div> </div>`;
    moviesDiv.innerHTML += card;
};

postButton.addEventListener("click", () => {
    postMovie(makeMovie(document.getElementById("create-title").value, document.getElementById("create-rating").value));
    console.log("success");
    generateCard(document.getElementById("create-title").value, document.getElementById("create-rating").value)
});

const makeMovie = (title, rating) => {
  return {
    "title" : title,
    "rating" : rating
  };
};

// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(movie),
// };

// console.log(makeMovie("LOTR", 6));
//
// fetch("http://localhost:1313/", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(makeMovie("LOTR", 6)),
// }).then().catch(() => {console.log("FUCC")});

// getMovies().then((movies) => {
//     console.log('Here are all the movies:');
//     movies.forEach(({title, rating}) => {
//         console.log(`id#${id} - ${title} - rating: ${rating}`);
//         let newTitle = `${title}`;
//         let newRating = `${rating}`;
//         makeCard(newTitle, newRating);
//     });
// }).catch((error) => {
//     alert('Oh no! Something went wrong.\nCheck the console for details.');
//     console.log(error);
// });
