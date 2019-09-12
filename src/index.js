/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const makeMovieCard = movie => {
    let html = `<div class="custom-card">`;
    html += `<div><h3 id="${movie.id}-rating">Rating: ${movie.rating} / 5</h3></div>`;
    html += `<div><h2 id="${movie.id}-title">${movie.title}</h2></div>`;
    html += `<div><button class="editSubmit" id="${movie.id}-edit">Edit</button></div>`;
    html += `</div>`;
    return html;
};

const displayMovies = () => {
    getMovies().then((movies) => {
        $("#viewport").html("");
        movies.forEach((movie) => {
            $("#viewport").append(makeMovieCard(movie));
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

const addNewMovie = () => {
    const newTitle = $('#newTitle').val();
    const newRating = $('#newRating').val();
    const newMovie = {
        title: newTitle,
        rating: newRating
    };
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(displayMovies)
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
};


const showEditBar = (event) => {
  const clickID = parseInt(event.target.id);
  const originalTitle = $(`#${clickID}-title`).html();
  let originalRating = $(`#${clickID}-rating`).html();
  originalRating = originalRating.substring(8);
  console.log(originalRating);
  $('#editTitle').val(originalTitle);
  $('#edit').show();
  console.log(clickID);
    $('#editSubmit').off().on('click', () => {

  const editedTitle = $('#editTitle').val();
  const editedRating = $('#editRating').val();
  const editedMovie = {
        title: editedTitle,
        rating: editedRating
  };
    console.log(editedMovie);
  const url = `/api/movies/${clickID}`;
      console.log(url);
      const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMovie)
  };
      console.log(options);
      fetch(url, options)
      .then($("#edit").hide())
      .then(displayMovies)
      .catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
      });
  });
};

// Initial call to display movies upon page load
displayMovies();

// Adds a new movie
$('#newSubmit').click(addNewMovie);



//edit movie button
$(document).on('click', '.editSubmit', showEditBar);