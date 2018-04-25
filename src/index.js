/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const $ = require("jquery");
const {getMovies} = require('./api.js');
const {created} = require('./create-movie');
const {deleteMovie} = require('./delete-movie');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $(".row").append(`<div class="col-6">
        <div class="card">
            <div class="card-body">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Edit
                </button>
                <button class="deleteBtn">x</button>
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle">rating: ${rating}</h6>
                <p class="dbId">${id}</p>
            </div>
        </div>
    </div>`);
    displayLoading();
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

function displayLoading() {
    $(".loadingMessage").css("display", "none");
    $("h1").text("Movie List");
}

$("#createBtn").click(function(){
  const movieTitle = $("#movieTitle").val();
  const movieRating = $("#movieRating").val();

  created({title: movieTitle,
  rating: movieRating})
});

$(".row").on('click', '.deleteBtn', function() {
    let movieId = $(this).parent()["0"].children[4].innerText;
    deleteMovie(movieId);
    $(this).parent().parent().hide();
}).on('click', '.editBtn', function() {
    alert("This should let you edit")
});


