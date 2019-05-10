/**
 * es6 modules and imports
 */

// Loading function

function onReady(callback) {
  let intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 2000);
}

function setVisible(selector, visible) {
  document.querySelector('#loading-thing').style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('#loading-thing', true);
  setVisible('container-page', false);
});


//===========================================//


import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */


const $ = require('jquery');

const {getMovies, addNewMovie, deleteMovie, editMovie, displayMovies} = require('./api.js');

// console.logs movies
getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

//This creates a variable that holds the html data for each movie in the database//
const makeHtml = (movies) => {
    let html = "";
    movies.forEach((movie) => {
      html += '<div class="tile">';
      html += "<div class='movie-info'>";
      html += "<div><em><strong>" + movie.title + "</strong></em></div>";
      html += "<div>" + "ID = " + movie.id + "</div>";
      html += "<div class='rating'>" + movie.rating + " STARS!!!! </div>";
      //Edit button removed, to be added later (will call up edit form)//
      html += "<div><button class='deletebtn' data-dbid=" + movie.id + ">" + "delete"+"</button></div>";
      html += "</div>";
      html += "</div>";
    });
      return html;
};

//This calls the function that uses the information stored in the variable "html"
// and populates the page with movies from our database.//
getMovies().then(data => {
  $("#movie-display").ready().html(makeHtml(data));
//makes the body visible after loading is complete
  $(".bottom").removeClass("hidden");
});

// ******* add event listeners to all delete buttons by class
// ******** When a button is clicked, select the button that was clicked using the this keyword
//******  console.log the value of the data-dbid attribute
//refactor the console log to instead call the delete movie function using the data-dbid.

$(document).on('click', '.deletebtn', function(event){
      deleteMovie($(event.target).data('dbid'));

  getMovies().then(data => {
    $("#movie-display").ready().html(makeHtml(data))
  });

  // console.log($(event.target).data('dbid'));
    // $(this).ready(function(event){
    // })
    });

// Adds new movie on button click
$('#add-movie').click(function(event){
  //prevents the page from refreshing
  event.preventDefault();
 

   //store the value of the text inputs into variables
    let movieTitle = $("#movie-title").val();
    let rating = $("#movie-rating").val();
   // call addMovies, passing in those variables
    addNewMovie(movieTitle, rating);
    //Refreshes the movies//
  getMovies().then(data => {
    $("#movie-display").ready().html(makeHtml(data));
  });
});

//----Here is the function to call the editMovie function with a clicker thing---//

$(document).on('click', '#edit-movie-button', function(event) {
  event.preventDefault();
  editMovie(
      ($('#movie-id').val()),
      ($('#movie-title-edit').val()),
      ($('#movie-rating-edit').val()),
      );
  getMovies().then(data => {
    $("#movie-display").ready().html(makeHtml(data))
  });
});


