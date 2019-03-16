/**
 * es6 modules and imports
 */

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
// const {makeHTML} = require('./htmlMaker.js');
const {addMovie} = require('./addMovie.js');

$('.deleteMovie').click(function(e) {
  e.preventDefault();
  // $(this).parent.css('background', 'yellow');
  console.log('test');

});

const makeHTML = (title, rating, id) => {
  let html = `<div class="col">`;
  html += `<h1>${title}</h1>`;
  html += `<h2>${rating}</h2>`;
  html += `<button class="editMovie" id="${id}">Edit</button>`;
  html += `<button class="deleteMovie" id="${id}">Delete</button>`;
  html += `</div>`;
  return html;
}


// const showMovies = () => {
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    let html = "";
    movies.forEach(({title, rating, id}) => {
      html += makeHTML(title, rating, id);
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    });

    $("#movies").html(html);
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    // console.log(error);
  });
// };

// showMovies().then((e => {
//
// }))



// const myPromise = fetch(`http://img.omdbapi.com/?apikey=${OMDB_KEY}&`)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));



////////////////////////////////////////
//////// ADD MOVIE BUTTON //////////////
////////////////////////////////////////
$('#submitMovie').on('click', (e) => {
  e.preventDefault();

  // console.log(getRating($('#movie-rating').val()));
  // let movieRating = getRating($('#movie-rating').val());
  const newMovie = {
    "title": $('#movie-title').val(),
    "rating": $('#movie-rating').val()
  };
  console.log(newMovie);
  console.log(JSON.stringify(newMovie));
  addMovie(newMovie);
  // showMovies();

});


// const getRating = (stars) => {
//     switch (stars) {
//       case "5 Stars":
//         console.log('5');
//         return 5;
//       case "4 Stars":
//         console.log('4');
//         return 4;
//       case "3 Stars":
//         console.log('3');
//         return 3;
//       case "2 Stars":
//         console.log('2');
//         return 2;
//       case "1 Star":
//         console.log('1');
//         return 1;
//       default:
//         return "undefined"
//     }
//   };


// ////////////////////////////////////////
// //////// EDIT MOVIE BUTTON /////////////
// ////////////////////////////////////////

$(document).on('click', 'button.editMovie', (e) => {
  e.preventDefault();
  $('.edit').toggleClass('hiding');
  let id = $(e.target).attr('id');
  id = parseInt(id);
  pullMovieData(id);
  $('#editMovie').on('click', (e) => {
    e.preventDefault();
    let editedTitle = $('#edit-title').val();
    let editedRating = $('#edit-rating').val();
    let editedMovie = {
      "title": editedTitle,
      "rating": editedRating
    };
    editMovie(id, editedMovie);

  })



});
//
//
//
const pullMovieData = (id) => {
  fetch(`./api/movies`, {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"}
  })
      .then(response => response.json())
      .then(movies => {
          for (let movie of movies) {
              // console.log(movie.id);
              if(movie.id === id) {
                let returnNewObj = {
                  "title": movie.title,
                  "rating": movie.rating
                };

                // let starRating = "";
                // switch (returnNewObj.rating){
                //   case 5:
                //     starRating = "5 Stars";
                //     break;
                //   case 4:
                //     starRating = "4 Stars";
                //     break;
                //   case 3:
                //     starRating = "3 Stars";
                //     break;
                //   case 2:
                //     starRating = "2 Stars";
                //     break;
                //   case 1:
                //     starRating = "1 Star";
                //     break;
                // }

                $('#edit-title').val(returnNewObj.title);
                $('#edit-rating').val(returnNewObj.rating);


              }

          }
  });
};

// console.log(pullMovieData($('#edit-title').val()));

const editMovie = (id, editedMovie) => {
  fetch(`./api/movies/${id}`, {
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json"},
    body: JSON.stringify(editedMovie)})
      .then(response => JSON.stringify(response));
};





////////////////////////////////////////
//////// DELETE MOVIE BUTTON ///////////
////////////////////////////////////////
// const deleteMovie = (id) => {
//   fetch(`./api/movies/${id}`, {
//     "method": "DELETE",
//     "headers": {
//       "Content-Type": "application/json"}
//   })
//       .then(response => JSON.stringify(response));
// };


//////// npm run dev in terminal, then refresh window