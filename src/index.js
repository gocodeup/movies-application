/**
 * es6 modules and imports
 */
import sayHello from './hello';
//import $ from 'jquery';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, deleteMovie, patchMovie, getMovie} = require('./api.js');
var allMovies = [];
var movieEditObject = {};
var searchTitle;
var searchDate;
var searchRating;
var searchGenre;

displayMovies();

function searchMovies(){
  let allCards = [];

  allMovies.forEach(function (movie) {
    if(searchTitle && searchRating && searchDate){

        if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){

          if(movie.date === searchDate){
              if(searchRating !== '6'){
                if(movie.rating === searchRating){
                  allCards.push(movie);
                }
              }else if(searchRating === '6'){
                allCards.push(movie);
              }
          }
          else{
            searchDate = undefined;
            $('#dateSearch').val("");
          }

        }else {
          console.log("no movies matched");
        }

    }else if(searchTitle && searchRating){

        if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){
            if(searchRating !== '6'){
              if(movie.rating === searchRating){
                allCards.push(movie);
              }
            }else if(searchRating === '6'){
              allCards.push(movie);
            }
            else {
              allCards.push(movie);
            }
        }else {
          console.log("no movies matched");
        }

    }else if(searchTitle && searchDate){

      if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){
        if(searchDate === movie.date){
            allCards.push(movie);
        }
        else {
          searchDate = undefined;
          $('#dateSearch').val("");
        }
      }else {
        console.log("no movies matched");
      }
    }else if(searchDate && searchRating){

      if(movie.date === searchDate){
        if(searchRating !== '6'){
          if(movie.rating === searchRating){
            allCards.push(movie);
          }
        }else if(searchRating === '6'){
          allCards.push(movie);
        }
      }
      else{
        console.log("no movies matched");
        searchDate = undefined;
        $('#dateSearch').val("");
      }


    }else if(searchTitle){

      if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){
        allCards.push(movie);
      }
      else {
        console.log("no movies matched");
      }

    }else if(searchDate){

      if(movie.date === searchDate){
        allCards.push(movie);
      }
      else{
        console.log("no movies matched");
        searchDate = undefined;
        $('#dateSearch').val("");
      }

    }else if(searchRating){
      if(searchRating !== '6'){
        if(movie.rating === searchRating){
          allCards.push(movie);
        }
      }else if(searchRating === '6'){
        allCards.push(movie);
      }
      else {
        console.log("no movies matched");
      }
    }

  });

  console.log(allCards);

}

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

$('#searchClick').click(function (e) {
  e.preventDefault();

  searchTitle = $('#searchinput').val().toLowerCase();

  searchMovies();

  $('#searchinput').val("");
  searchTitle = undefined;


  // $('#movieContent').html("");
  // let searchName = $('#searchinput').val().toLowerCase();
  //
  // getMovies().then(movies => {
  //   movies.forEach(({id, title, rating, date, genre, description}) => {
  //     if (title.substr(0, searchName.length).toLowerCase() === searchName) {
  //
  //       let card = createCard(id, title, date, genre, rating, description);
  //
  //       $('#movieContent').append(card);
  //     }
  //   })
  // }).catch(error => console.log(error));
});

$('#dateSearchButton').click(function (e) {
  e.preventDefault();

  let input = $('#dateSearch').val();

  if((parseFloat(input) > 1900) && (parseFloat(input) < 2099)){
    searchDate = input;
    alert(typeof searchDate);
    searchMovies();
  }else {
    alert("Enter a number between 1900 and 2099");
  }

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
// function displayMoviesRating(filterRate){
//   $('#movieContent').html("");
//
//   getMovies().then((movies) => {
//     movies.forEach(({id, title, rating, date, genre, description}) => {
//       if(rating === filterRate){
//
//         let card = createCard(id, title, date, genre, rating, description);
//
//         $('#movieContent').append(card);
//       }
//     });
//   }).catch(error => {
//     console.log(`Oh no! Something went wrong. Check the console for details: ${error}`);
//   });
// }

function displayMovies(){
  allMovies = [];
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    $('#movieContent').html("");

    movies.forEach((movie) => {
      console.log(`id#${movie.id} - ${movie.title} - rating: ${movie.rating}`);
      searchMovies(movie);
      allMovies.push(movie);
      let card = createCard(movie);

      $('#movieContent').append(card);

    });

    console.log(allMovies);
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

//function to create a card for each movie
function createCard(movie){
  let editID = `edit${movie.id}`;

  return `<div class="card movieCard mb-3" style="max-width: 540px">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text"><small class="text-muted mr-3">Date: ${movie.date}</small><small class="text-muted mr-3">Genre: ${movie.genre}</small><small class="text-muted">Rating: ${movie.rating}</small></p>
                            <p class="card-text">${movie.description}</p>
                            <p>
                                <button type="button" class="btn btn-info edit_movie" data-toggle="modal" data-target="#editMovieModal" id="${editID}">Edit</button>
                                <button type="submit" class="btn btn-danger delete_movie" id="${movie.id}">Delete</button>
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
  searchRating = $(this).val();
  //displayMoviesRating(searchRating);
  searchMovies();
});

//event handler to display loading animations while API is connecting
$(document).ajaxStart(function () {
  $('.spinner').css('display', 'inline-block');
});
//event handler to set display to none to loading animations after the API is already connected
$(document).ajaxComplete(function (requestName) {
  $('.spinner').css('display', 'none');
});