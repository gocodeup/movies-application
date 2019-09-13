// Feature To-Do List:
// 1. Add genre field to Add New Movie Form
// 2. Add genre field to Edit Movie Form
// 3. Display genre info on card
// 4. Have displayMovies function list out movies by genre
// 5. Make edit movies form be a modal
// 6. Make add movies form be a modal
// 7. Refactor Control Bar to be at top of app
// 8. Make mobile responsive
// 9. Make movie cards circular
// **. Remove filter button (have filter activate on new value selection)
// **. Remove blue outline of button clicks
// **. Change color of select pulldown highlight from blue to red

/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const makeMovieCard = movie => {
    let html = `<div class="custom-card my-4 mx-4">`;
    html += `<div class="mt-3"><h3 id="${movie.id}-rating">Rating: ${movie.rating} / 5</h3></div>`;
    html += `<div class="my-4"><h1 class="" id="${movie.id}-title">${movie.title}</h1></div>`;
    html += `<div class="button-row mb-3">`;
    html += `<button class="editSubmit mr-5" id="${movie.id}-edit">Edit</button>`;
    html += `<button class="deleteSubmit ml-5" id="${movie.id}-delete">Delete</button>`;
    html += `</div>`;
    html += `</div>`;
    return html;
};

const displayMovies = () => {
    $("#viewport").html("<img src=\"img/loading.svg\" alt=\"Loading Spinner\">");
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
    // Determine which genre checkboxes are checked
    const newGenres = [];
    const selectedGenres = document.getElementsByName('genreSelect');
    for (const node of selectedGenres) {
        if (node.checked) {
            newGenres.push(node.value);
        }
    }
    const newMovie = {
        title: newTitle,
        rating: newRating,
        genre: newGenres
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
        }).then(() => {
            $('#newTitle').val("");
            $('#newRating').val("");
    })  ;
};


const showEditBar = (event) => {
  const clickID = parseInt(event.target.id);
  const originalTitle = $(`#${clickID}-title`).html();
  let originalRating = $(`#${clickID}-rating`).html();
  // originalRating = originalRating.substring(8);
    originalRating = parseInt(originalRating.substring(8)).toString();
  console.log(originalRating);
  $('#editTitle').val(originalTitle);
  $('#editRating').val(originalRating);
  $('#edit').show();
  // console.log(clickID);
    $('#editSubmit').off().on('click', () => {

  const editedTitle = $('#editTitle').val();
  const editedRating = $('#editRating').val();
  const editedMovie = {
        title: editedTitle,
        rating: editedRating
  };
    // console.log(editedMovie);
  const url = `/api/movies/${clickID}`;
      // console.log(url);
      const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMovie)
  };
      // console.log(options);
      fetch(url, options)
      .then($("#edit").hide())
      .then(displayMovies)
      .catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
      });
  });
};

const deleteMovie = () => {
    // console.log("Delete button clicked.");
    const clickID = parseInt(event.target.id);
    const url = `/api/movies/${clickID}`;
    fetch(url, {
            method: 'DELETE'
        })
        .then(displayMovies)
        .catch(error => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
};

const filterGenre = () => {
    const genre = $('#genreFilter').val();
    console.log(genre);
    if (genre === "all"){
        displayMovies();
    } else {
        $("#viewport").html("<img src=\"img/loading.svg\" alt=\"Loading Spinner\">");
        getMovies().then((movies) => {
            const filteredMovies = movies.filter(movie => movie.genre.includes(genre));
                // console.log(filteredMovies);
                return filteredMovies;

        }).then(filteredMovies => {
            $("#viewport").html("");
            filteredMovies.forEach((movie) => {
                $("#viewport").append(makeMovieCard(movie));
            });
        })
            .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
    }
};
// Initial call to display movies upon page load
displayMovies();

// Adds a new movie
$('#newSubmit').click(addNewMovie);

//edit movie button
$(document).on('click', '.editSubmit', showEditBar);

// Delete movie button
$(document).on('click', '.deleteSubmit', deleteMovie);

//filter movies by genre
$('#genreFilter').on('input', filterGenre);

