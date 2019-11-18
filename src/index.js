/**
 * es6 modules and imports
 */
// import sayHello from './hello';
//import $ from 'jquery';

// sayHello('World');

/**
 * require style imports
 */
const {getMovies, deleteMovie, patchMovie, getMovie, postMovie} = require('./api.js');
var movieEditObject = {};
var movieAddObject = {
  id: 0,
  title:'',
  date:'',
  genre: [],
  description:'',
  rating: 0
};
displayMovies();

//event handler to select a movie for editing
$(document).on('click','.edit_movie', function (e) {
  e.preventDefault();

  let idEdit = $(this).attr('id').substring(4,$(this).attr('id').length);
  alert(idEdit);
  getMovie(idEdit)
      .then(movie => {
        movieEditObject.id = movie.id;
        movieEditObject.title = movie.title;
        movieEditObject.date = movie.date;
        movieEditObject.genre = movie.genre;
        movieEditObject.rating = movie.rating;
        movieEditObject.description = movie.description;

        $('#movieEditInput').val(movieEditObject.title);
        $('#movieEditDate').val(movieEditObject.date);
        $('#genreMultiSelectEdit').val(movieEditObject.genre);
        switch (movieEditObject.rating) {
          case "1":
            $('#ratingRadios1e').prop("checked", true);
            break;
          case "2":
            $('#ratingRadios2e').prop("checked", true);
            break;
          case "3":
            $('#ratingRadios3e').prop("checked", true);
            break;
          case "4":
            $('#ratingRadios4e').prop("checked", true);
            break;
          case "5":
            $('#ratingRadios5e').prop("checked", true);
            break;
        }
        $('#movieDescriptionInputEdit').val(movieEditObject.description);
      })
      .catch(() => console.log("Error looking at the book."));


});

//event handler for editing the selected movie
$('#editMovieClick').click(function (e) {
  //e.preventDefault();
  // let data = new FormData();
  // data.append("opmFile",$('#movieImageEdit').files[0]);

  let editedMovie = {
    title: $('#movieEditInput').val(),
    date: $('#movieEditDate').val(),
    rating: $('input[name="gridRadios"]:checked').val(),
    genre: "",
    description: $('#movieDescriptionInputEdit').val()
    //image: data
  };

  patchMovie(editedMovie, movieEditObject.id)
      .then(() => {
        alert("Movie was edited");
        displayMovies();
      }).catch(error => console.log(`There was an error: ${error}`));

  //$('#editMovieModal').modal('hide');
  $('#editMovieModal').modal('toggle');
});


//event handler to delete a movie
$(document).on('click', '.delete_movie', function (e) {
  e.preventDefault();

  let decision = confirm("Are you sure you want to Delete this movie?");

  if(decision){

    let idErase = $(this).attr('id');

    deleteMovie(idErase).then(displayMovies).catch(error => {
      alert('Wait. Something went wrong. Check console for details');
      console.log(error);
    });
  }

});

//function to display movies based on the rating
function displayMoviesRating(filterRate){
  $('#movieContent').html("");

  getMovies().then((movies) => {
    movies.forEach(({id, title, rating, date, genre, description}) => {
      if(rating === filterRate){

        let card = createCard(id, title, date, genre, rating, description);

        $('#movieContent').append(card);
      }
    });
  }).catch(error => {
    console.log(`Oh no! Something went wrong. Check the console for details: ${error}`);
  });
}

function displayMovies(){
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    $('#movieContent').html("");

    movies.forEach(({title, rating, id, date, genre, description}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);

      let card = createCard(id, title, date, genre, rating, description);

      $('#movieContent').append(card);

    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

//function to create a card for each movie
function createCard(id, title, date, genre, rating, description){
  let editID = `edit${id}`;

  return `<div class="card mb-3" style="max-width: 540px">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><small class="text-muted mr-3">Date: ${date}</small><small class="text-muted mr-3">Genre: ${genre}</small><small class="text-muted">Rating: ${rating}</small></p>
                            <p class="card-text">${description}</p>
                            <p>
                                <button type="button" class="btn btn-info edit_movie" data-toggle="modal" data-target="#editMovieModal" id="${editID}">Edit</button>
                                <button type="submit" class="btn btn-danger delete_movie" id="${id}">Delete</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
}

//function to get name of selected image
$('#movieImageEdit').change(function () {
  let file = $(this).files[0].name;
  $(this).text(file);
});

//event handler for filter movies by rating
$('.ratingFilter .dropdown-menu button').click(function () {
  let ratingFilterId = $(this).val();

  displayMoviesRating(ratingFilterId);
});

//event handler to display loading animations while API is connecting
$(document).ajaxStart(function () {
  $('.spinner').css('display', 'inline-block');
});
//event handler to set display to none to loading animations after the API is already connected
$(document).ajaxComplete(function (requestName) {
  $('.spinner').css('display', 'none');
});

$('#addMovieClick').click(function (event) {
  event.preventDefault();
  postMovie({
    title: document.getElementById('movieAddInput').value,
    rating: $('input[name = gridRadios]:checked').val(),
    //id auto generates
    genre: movieAddObject.genre, //function for getting array List of genres
    description: document.getElementById('movieDescriptionInput').value,
    image: document.getElementById('movieImageAdd').value
  }).then(getMovies).then(movie =>{
    movieAddObject = {
      title:'',
      date:'',
      genre: [],
      description:'',
      rating: 0
    };
    console.log('all movies:');
    movie.forEach(({title, rating, id}) =>{
      console.log(`ID: ${id}, Title: ${title}, Rating: ${rating}`);
    });
  }).catch((error) =>{
    movieAddObject = {
      title:'',
      date:'',
      genre: [],
      description:'',
      rating: 0
    };
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
});


function createGenreTag(genre){
  // global genre array
  if (movieAddObject.genre.includes(genre)){
    alert('Genre already Added');
    return movieAddObject.genre;
  }else {
    $('#genreListAdd').append(`<li class ="list-group-item" value="${genre}"> ${genre} | <a class="removeGenre">x</a></li>`);
    return movieAddObject.genre.push(genre);
  }
}

$('.addGenreButton').click(function () {
  return createGenreTag($('#genreMultiSelect').children('option:selected').val());
});


$('.removeGenre').click(function () {
  let liValue = $(this).parent('li').value;
  movieAddObject.genre.slice(movieAddObject.genre.indexOf(liValue),1);
  $(this).parent('li').remove();
  return movieAddObject.genre;
});