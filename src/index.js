$(document).ajaxStart(function(){
  $("#wait").css("display", "block");
});
$(document).ajaxComplete(function(){
  $("#wait").css("display", "none");
});



const {getMovies} = require('./api.js');
let $movies = $('#movies');

// show a listing of the movies that are in the database

getMovies().then((movies) => {
  // alert('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $movies.append(`<li> id#${id} - ${title} - rating: ${rating}</li>`);
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong. Check the console for details.')
  console.log(error);
});





