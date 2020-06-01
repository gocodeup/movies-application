const $ = require('jquery');
const {getMovies} = require('./api.js');
const {addMovie} = require('./api.js');
const {editMovie} = require('./api.js');
const {delMovie} = require('./api.js');


function renderMovies(movies){
    $('h1').html('Movies:');
    var html = "";
    movies.forEach(({title, rating, id}) => {
        $('#movieList').empty();
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
            html += `<br><div class="col-6"> <h3 class="card-text title" data-id="${id}" data-title=${title} data-rating=${rating}> ${title} </h3>
                <h5 class="card-text">  Rated ${rating} Stars</h5></div><br><br>`
    $('#movieList').append(html);
  })
}

getMovies().then((movies) => renderMovies(movies)).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

// let timeoutMsg = (() => {
//     if ($(title === '')) {
//         // alert('please enter a movie title');
//         $('.msg').html("please a movie title.")
//         setTimeout(function () {
//             $('.msg').remove();
//         }, 3000);

//add movie button
$('#addMovieBtn').click(() => {
    $('h1').html('Loading...');
    $('#addMovieForm, #showAddFormBtn, #addMovieBtn').toggleClass("invisible")
    let title = $('#userAddMovie').val();
    let rating = $('#userRatingInput').val();
    // console.log(title, rating);
    //    if ($(title === '')) {
    // //         // alert('please enter a movie title');
    //          $('.msg').html("please add a movie title.")
    //            setTimeout(function () {
    //              $('.msg').remove();
    //              }, 3000);
    //     } else {
   addMovie({title, rating})
       .then(getMovies)
       .then((movies) => renderMovies(movies))
       // }
})


let Id;
//populate edit/delete form
$('#movieList').on('click', 'h3', function(e) {
    e.stopImmediatePropagation();
    // console.log($(e.target));
    let editTitle = $(e.target).data('title');
    let editRating = $(e.target).data('rating');
    let targetId = $(e.target).data('id');
    // console.log(editTitle);
    // console.log(editRating);
    $('#userEditMovie').val(editTitle);
    $('#userEditRating').val(editRating);
    Id = targetId;
})

//edit movie Button
$('#editMovieBtn').on ('click', () => {
    $("#editMovieForm, #editMovieBtn, #deleteMovieBtn, #showEditFormBtn").toggleClass('invisible');
    $('h1').html('Loading...');
    let title = $('#userEditMovie').val();
    let rating = $('#userEditRating').val();
    // console.log(title);
    // console.log(rating);
  editMovie(title, rating, Id)
        .then(getMovies)
        .then((movies) => renderMovies(movies));
        $('#editMovieForm').trigger('reset');
})

//delete movie button
$('#deleteMovieBtn').on('click', () => {
    $(' #showEditFormBtn, #editMovieForm, #deleteMovieBtn, #editMovieBtn').toggleClass('invisible');
    $('h1').html('Loading...');
    delMovie(Id)
        .then(getMovies)
        .then((movies) => renderMovies(movies));
    $('#editMovieForm').trigger('reset');
})

$('#showAddFormBtn').click(() =>{
    $('#addMovieForm, #showAddFormBtn, #addMovieBtn').toggleClass("invisible")
})
$('#showEditFormBtn').click(() => {
    $('#editMovieForm, #showEditFormBtn, #deleteMovieBtn, #editMovieBtn').toggleClass('invisible')
})
