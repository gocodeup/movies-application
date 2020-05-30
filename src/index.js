const $ = require('jquery');

const {getMovies} = require('./api.js');
const {addMovie} = require('./api.js');
const {editMovie} = require('./api.js');


function renderMovies(movies){
  var html = "";
  movies.forEach(({title, rating, id}) => {
    $('#movieList').empty();
    // console.log(`id#${id} - ${title} - rating: ${rating}`);

    html += `<div class="d-flex">
                <div class="justify-content-start"> 
                    <h3 class="title" data-id="${id}" data-title=${title} data-rating=${rating}> ${title} </h3>
                </div>
                <div class="justify-content-end"> 
                    <p>  - rating: ${rating} </p>
                </div>
            </div>`;

    $('#movieList').append(html);
  })
}

getMovies().then((movies) => renderMovies(movies)).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

$('#submitAddMovie').click(() => {
    // console.log('test')
    let title = $('#userAddMovie').val();
    let rating = $('#userRatingInput').val();
    // console.log(title, rating);
    // let createMovie = (userAddMovie, userRatingInput) => {
    //    if ($('#userAddMovie').val() === undefined) {
    //         alert('please enter a move title');
    //         // $('.msg').html("please a movie title.")
    //         //
    //         // setTimeout(function () {
    //         //     $('.msg').remove();
    //         // }, 3000);
    //     } else {
    //         return newMovie;
    //     }

        addMovie({title, rating})
            .then(getMovies)
            .then((movies) => renderMovies(movies))
        // clearField(title);
        // clearField(rating);
})

// function clearField(input) {
//
//     input.value = "";
// }


$('#movieList').on('click', 'h3', function(e) {
    // console.log($(e.target));
    let editTitle = $(e.target).data('title');
    let editRating = $(e.target).data('rating');
    let targetId = $(e.target).data('id');
    // console.log($(e.target).data('id'));
    // var name = $('#input').val();
    console.log(editTitle);
    console.log(editRating);

  $('#userEditMovie').val(editTitle);
  $('#userEditRating').val(editRating);

$('#editMovie').click(() => {
    let title = $('#userEditMovie').val();
    let rating = $('#userEditRating').val();
    console.log(title);
    console.log(rating);
  editMovie({title, rating}, targetId)
        .then(getMovies)
        .then((movies) => renderMovies(movies));
});
})







// function input(editTitle, editRating){
//     // $('#userEditMovie').val()
// }





