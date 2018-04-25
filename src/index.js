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
const {created, editMovie} = require('./create-movie');
const {deleteMovie} = require('./delete-movie');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
      $(".row").append(
          `<div class="col-6">
            <div class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal${id}">
                    Edit
                    </button>
                    <button class="deleteBtn">x</button>
                    <h5 class="card-title">${title}</h5>
                    <h6 class="card-subtitle">rating: ${rating}</h6>
                    <p class="dbId">${id}</p>
                </div>
            </div>
          </div>`);
      $("body").append(`<div class="modal fade" id="modal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Edit Movie Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        Title: <input type="text" id="editTitle" value="${title}">
                        Rating: <input type="text" id="editRating" value="${rating}">
                    </form>
                    <p class="editId">${id}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary editBtn">Save changes</button>
                </div>
            </div>
        </div>
    </div>
`);
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
});

$("body").on('click', '.editBtn', function() {
    const editTitle = $("#editTitle").val();
    const editRating = $("#editRating").val();
    let movieEditId = $(".editId")["0"].innerText;

    console.log(movieEditId);
    console.log(editRating);
    console.log(editTitle);

    editMovie({title: editTitle, rating: editRating, id: movieEditId})
});

