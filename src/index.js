const $ = require('jquery');

const {getMovies} = require('./api.js');
const {addMovie} = require('./api.js');
// const {createMovie} = require('./api.js');

function renderMovies(movies){
  var html = "";
  movies.forEach(({title, rating, id}) => {
    $('#movieList').empty();
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    html += '<div class="d-flex">' + '<div class="justify-content-start">' + '<h3>'+ `${title}` + '</h3>' + '</div>'
        + '<div class="justify-content-end">' +  '<p>' +` - rating: ${rating}` + '</p>' + '</div>' +  '</div>';
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
        ;
    // }
})
//
// $('#submitAddMovie').click(() => {
// // console.log('test');
//     addMovie(createMovie())
//             .then((movies) => renderMovies(movies))
// })








// let userRating = rating => {
//     // ${userRatingInput}.val()
//     rating = prompt('Please enter a rating for this movie.');
//     return rating
// }
