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
let editing = true;
function updateListeners() {
    let deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            $(deleteButtons[i]).parent().toggleClass("hide");
            deleteMovie(parseInt(deleteButtons[i].getAttribute("id").substr(7)));
        })
    }

    let editButtons = document.getElementsByClassName("edit-button");
    let edit = document.getElementsByClassName("edit");
    console.log(edit);
    for (let i = 0; i < edit.length; i++) {
        editButtons[i].addEventListener("click", () => {
            if (editing === true) {
                editing = false;
                for (let i = 0; i < edit.length; i + 2) {
                    //patchMovie(edit[i].getAttribute("value"), edit[i + 1].getAttribute("value")); //edit[i];
                }
            }
            else {
                editing = true;
                for (let i = 0; i < edit.length; i++) {
                    edit[i].toggleAttribute("readonly");
                }
            }
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
    // $.getJSON(`http://img.omdbapi.com/?apikey=742f6ef9&`);
    let card = ``;
    card += `<div class="card" id="${cardID}">`;
    card += `<button class="delete" id="delete-${cardID}">X</button>`;
    // card += ``;
    card += `<img src="..." class="card-img-top" alt="...">`;
    card += `<div class="card-body">`;
    card += `<input readonly type="text" class="edit titles" id="card-title-${cardID}" value="${title}">`;
    card += `<input readonly type="text" class="edit ratings" id="card-rating-${cardID}" value="${rating}">`;
    card += `</div> </div>`;
    moviesDiv.innerHTML += card;
};

postButton.addEventListener("click", () => {
    postMovie(makeMovie(document.getElementById("create-title").value, document.getElementById("create-rating").value));
    updateMovies();
});

patchMovie();

const makeMovie = (title, rating) => {
    return {
        "title" : title,
        "rating" : rating
    };
};


// $('.editMovie').on('click', function (event) {
//     cardID = $(this).attr("id");
//
//
//     console.log(cardID);
//     $("#saveEdit").on('click', function (event) {
//         patchMovie(
//             {
//                 "title": $("#editMovieTitle").val(),
//                 "rating": $("#editMovieRating").val()
//             },
//             cardID).then(getMovies).then((movies) => {
//             console.log('Here are all the movies:');
//             movies.forEach(({title, rating}) => {
//                 console.log(`${title} ${rating}`);
//             });
//         }).catch((error) => {
//             alert('Oh no! Something went wrong.\nCheck the console for details.');
//             console.log(error);
//         });
//     })
// });



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