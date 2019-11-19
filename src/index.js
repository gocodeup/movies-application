/**
 * es6 modules and imports
 */

/**
 * require style imports
 */

import $ from "jquery";
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');

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
    let confirm = document.getElementsByClassName("confirm");
    // console.log(editButtons);
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", () => {
            edit[i * 2].toggleAttribute("readonly");
            edit[(i * 2) + 1].toggleAttribute("readonly");
        })
    }
    for (let i = 0; i < confirm.length; i++) {
        confirm[i].addEventListener("click", () => {
            patchMovie(parseInt(confirm[i].id.substr(8)), {"title" : document.getElementById(`card-title-${parseInt(confirm[i].id.substr(8))}`).value, "rating" : document.getElementById(`card-rating-${parseInt(confirm[i].id.substr(8))}`).value});
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
    card += `<button class="edit-button" id="edit-${cardID}">Edit</button>`;
    card += `<button class="confirm" id="confirm-${cardID}">Confirm changes</button>`;
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

const makeMovie = (title, rating) => {
    return {
        "title" : title,
        "rating" : rating
    };
};