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
var allMovies = [];
var movieEditObject = {};

var movieAddObject = {
  id: 0,
  title:'',
  date:'',
  genre: [],
  description:'',
  rating: 0
};

var searchTitle;
var searchDate;
var searchRating;
var searchGenre = [];

displayMovies();

function searchMovies(){
  let allCards = [];
  $('.movieCard').show();

  console.log(searchGenre);
  allMovies.forEach(function (movie) {
    let compare = searchGenre.some(r => movie.genre.includes(r));

    if((searchTitle && searchRating && searchDate && compare) || (searchTitle && searchRating && searchDate) ){
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
        }
    }else if((searchTitle && searchRating) || (searchTitle && searchRating && compare)){

        if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){
            if(searchRating !== '6'){
              if(movie.rating === searchRating){
                allCards.push(movie);
              }
            }else if(searchRating === '6'){
              allCards.push(movie);
            }
        }

    }else if((searchTitle && searchDate) || ((searchTitle && searchDate && compare))){

      if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){
        if(parseFloat(searchDate) === parseFloat(movie.date)){
            allCards.push(movie);
        }
      }

    }else if((searchDate && searchRating) || ((searchDate && searchRating && compare))){


        if(searchRating !== '6'){
          if((movie.rating === searchRating) && (parseFloat(searchDate) === parseFloat(movie.date))){
            allCards.push(movie);
          }
        }else if(searchRating === '6'&& (parseFloat(searchDate) === parseFloat(movie.date))){
          allCards.push(movie);
        }

    }else if(searchTitle){

      if((movie.title.substr(0, searchTitle.length).toLowerCase() === searchTitle)){
        allCards.push(movie);
      }

    }else if(searchDate){

      if(parseFloat(searchDate) === parseFloat(movie.date)){
        allCards.push(movie);
      }

    }else if(searchRating || (searchRating && compare)){
      if(searchRating !== '6'){
        if(movie.rating === searchRating){
          allCards.push(movie);
        }
      }else if(searchRating === '6'){
        allCards.push(movie);
      }

    }else if(compare){
      allCards.push(movie);
    }

  });

  searchTitle = undefined;
  searchDate = undefined;
  $('#dateSearch').val("");

 if(allCards.length === 0){
   // console.log("No movies matched criteria");
 }
 else{
   console.log(allCards);
   console.log(allMovies);

   let results = allMovies.filter(({ id: id1 }) => !allCards.some(({ id: id2 }) => id2 === id1));

   if(results.length > 0){
     console.log(results);
     results.forEach(function (result) {
       $(`#card${result.id}`).toggle();
     });
   }

 }


}

//event handler to select a movie for editing
$(document).on('click','.edit_movie', function (e) {
  e.preventDefault();

  let idEdit = $(this).attr('id').substring(4,$(this).attr('id').length);
  // alert(idEdit);
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
        //update edit genre tags
        $('#genreListEdit').empty();
        //movieAddObject.genre = [];
        movieEditObject.genre.forEach(genre =>{
          createGenreTag(genre,'genreListEdit');
        });
        // createGenreTag($('#genreMultiSelectE').children('option:selected').val(),'genreListEdit')
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
      .catch((error) => console.log("Error looking at the movie." + error));


});

//event handler for editing the selected movie
$('#editMovieClick').click(function (e) {

  e.preventDefault();
  // let data = new FormData();
  // data.append("opmFile",$('#movieImageEdit').files[0]);

  let editedMovie = {
    title: $('#movieEditInput').val(),
    date: $('#movieEditDate').val(),
    rating: $('input[name="editRadios"]:checked').val(),
    genre: movieAddObject.genre,
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

});

$('#dateSearchButton').click(function (e) {
  e.preventDefault();

  let input = $('#dateSearch').val();

  if((parseFloat(input) > 1900) && (parseFloat(input) < 2099)){
    searchDate = input;
    searchMovies();
  }else {
    alert("Enter a number between 1900 and 2099");
  }

});

//function for button and get genre search results
$('#genreSearchButton').click(function (e) {
  e.preventDefault();
  searchGenre = [];

  let genreResults = $('#allGenresSearch').children('input:checked').map(function () {
    return $(this).val();
  });

  for(let x = 0;  x < genreResults.length; x++){
    searchGenre.push(genreResults[x]);
  }

  searchMovies();

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

function displayMovies(){
  allMovies = [];
  getMovies().then((movies) => {
    // console.log('Here are all the movies:');
    $('#movieContent').html("");

    movies.forEach((movie) => {
      // console.log(`id#${movie.id} - ${movie.title} - rating: ${movie.rating}`);
      allMovies.push(movie);
      let card = createCard(movie);

      $('#movieContent').append(card);

    });
    searchMovies();
    // console.log(allMovies);
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });


}

//function to create a card for each movie
function createCard(movie){
  let editID = `edit${movie.id}`;
  let genres = "";

  movie.genre.forEach(function (genre) {
    genres += `<span class="badge badge-pill badge-light">${genre}</span>`;
  });

  return `<div class="card movieCard mb-3" style="max-width: 540px" id="card${movie.id}">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text"><small class="text-muted mr-3">Date: ${movie.date}</small><small class="text-muted mr-3">Genre: ${genres}</small><small class="text-muted">Rating: ${movie.rating}</small></p>
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

$('#addMovieClick').click(function (event) {
  event.preventDefault();
  console.log($('#movieAddDate').val());
  // event.stopPropagation();
  postMovie({
    title: document.getElementById('movieAddInput').value,
    rating: $('input[name = gridRadios]:checked').val(),
    //id auto generates
    date: $('#movieAddDate').val(),
    genre: movieAddObject.genre, //function for getting array List of genres
    description: document.getElementById('movieDescriptionInput').value,
    image: document.getElementById('movieImageAdd').value
  }).then(getMovies).then(movie =>{
    $('#addMovieModal').modal('toggle');
    $('#addMovieModal').find('form')[0].reset();
    $('#genreListAdd').empty();
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
  }).then(displayMovies).catch((error) =>{
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


function createGenreTag(genre,idTag){
  // global genre array
  if (movieAddObject.genre.includes(genre)){
    alert('Genre already Added');
    return movieAddObject.genre;
  }else {
    $(`#${idTag}`).append(`<li class ="list-group-item mt-2 mr-2" value="${genre}">${genre} | <span class="removeGenre">x</span></li>`);
    return movieAddObject.genre.push(genre);
  }
}

$('#addGenreButton').click(function () {
  return createGenreTag($('#genreMultiSelectA').children('option:selected').val(),'genreListAdd');
});

$('#editGenreButton').click(function () {
  return createGenreTag($('#genreMultiSelectE').children('option:selected').val(),'genreListEdit');
});

// $('span').click(function () {
$('body').on('click', '.removeGenre',function () {
  let liValue = $(this).parent().text();
  liValue = liValue.slice(0,liValue.indexOf(" "));

  if (movieAddObject.genre.length === 1){
    movieAddObject.genre = [];
  }else {
    movieAddObject.genre = movieAddObject.genre.filter(function (genre) {
      return genre !== liValue;
    });
  }

  $(this).parent('li').remove();
  return movieAddObject.genre;
});


$('#addMovie').click(function () {
   movieAddObject = {
    id: 0,
    title:'',
    date:'',
    genre: [],
    description:'',
    rating: 0
  };
});

$('.edit_movie').click(function () {
  movieAddObject = {
    id: 0,
    title:'',
    date:'',
    genre: [],
    description:'',
    rating: 0
  };
});