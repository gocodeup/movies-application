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
    .catch(() => console.log('The important thing is you tried...'));

let moviesDiv = document.getElementById("container");
let loadingGIF = document.getElementById("loading");
let postButton = document.getElementById("create-submit");

function updateMovies() {
function updateListeners() {
    let deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            $(deleteButtons[i]).parent().toggleClass("hide");
            deleteMovie(parseInt(deleteButtons[i].getAttribute("id").substr(7)));
        })
    }

    let edit = document.getElementsByClassName("edit");
    console.log(edit);

    for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener("click", () => {

        })
    }
}

function updateMovies(load = false) {

    getMovies().then((result) => {
        if (load === true) {
            $("#loading").toggleClass("hide");
        }

        moviesDiv.innerHTML = "";
        for (let i = 0; i < result.length; i++) {
            generateCard(result[i].title, result[i].rating, result[i].id);
        }
        if (load === true) {
            $("#main").toggleClass("hide");
        }
        updateListeners();
    });
}

updateMovies(true);

function generateCard(title, rating, cardID) {
    let card = ``;
    card += `<div class="card">`;
    card += `<button class="delete" id="delete-${cardID}">X</button>`;
    card += `<img src="..." class="card-img-top" alt="...">`;
    card += `<div class="card-body">`;
    card += `<p class='card-text'>${title}, ${rating}</p>`;
    card += `</div> </div>`;
    moviesDiv.innerHTML += card;
};

postButton.addEventListener("click", () => {
    postMovie(makeMovie(document.getElementById("create-title").value, document.getElementById("create-rating").value));
    updateMovies();
});

const makeMovie = (title, rating) => {
  return {
    "title" : title,
    "rating" : rating
  };
};

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