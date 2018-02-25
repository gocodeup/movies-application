const $ = require('jquery');

/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

//----------------------------------------------------
// Movie list builder
//----------------------------------------------------


const runMovies = function() {
    getMovies().then((movies) => {
        let htmlString = "";
        movies.forEach(function (movie) {
            htmlString += `<div class="col-xs-12" > <div class="row"><h5 class="col-xs-3">`;
            htmlString += `${movie.title}`;
            htmlString += `</h5>`;
            htmlString += `<h6 class="col-xs-3 ratingCol">`;
            htmlString += `Rating: ${movie.rating}`;
            htmlString += `</h6>`;
            htmlString += `<div class="col-xs-3"><button class="btn btn-info" type="button" id="editBtn${movie.id}">Edit</button><button class="btn btn-danger" type="button" id="deleteBtn${movie.id}">DELETE</button></div>`;
            htmlString += `<div class="col-xs-12" id="editInputs${movie.id}"></div></div></div>`;
        });
        $('#display-movies').html(htmlString);

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};
runMovies();

//----------------------------------------------------
// Display Loading while wait waiting for runMovies to build
//----------------------------------------------------

const displayMovies = () => {
    $('#display-movies').html('Loading...');
};
displayMovies();



//----------------------------------------------------
// on click of button pull in the values from id="movieTitle" id="movieRating"
//----------------------------------------------------

$('#submitBtn').click(function()  {
  const addMovie = $('#movieTitleInput').val();
  const addRating = $('#movieRatingInput').val();
  console.log(addMovie);
  console.log(addRating);
  const addObj = {title: addMovie, rating: addRating};
  const url = '/api/movies';
  const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addObj),
  };
    fetch(url, options)
        .then(runMovies)
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
});

$('h2').click(function() {
    console.log("click");
  const id = (movies.id).val();
  console.log(id);
});

//----------------------------------------------------
// Delete Movie
//----------------------------------------------------


const deleteMovies = (movies) => {
    movies.forEach((element) => {
        $(`#deleteBtn${element.id}`).click(() => {
            console.log(element.id);
            let url;
            let options;
            if (confirm(`Are you Sure you want to delete:  ${element.title}?`)) {
                url = `./api/movies/${element.id}`;
                options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                fetch(url, options)
                    .then(() => {
                        console.log(`new edit function is firing`);
                        fetchingMovieList();
                    })
                    .catch(() => {
                        console.log('the upload failed')
                    });
            }
        });
    });
};
deleteMovies();




