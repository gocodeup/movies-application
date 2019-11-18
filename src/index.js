/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies, postMovie} = require('./api.js');
const $ = require("jquery");

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('#container').append(`<div class="card-img-top">pictures<div class="card"><div class="card-body">Id is ${id} number and the title is: ${title}, rated: ${rating}<br><span class="badge badge-primary">Edit Reel</span><span class="badge badge-danger">Trash Reel</span>
</div></div></div>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


$(window).on("load", function(){
  let movie = {};
  $(".loader").fadeOut(2000);
  $("#buttonadd").click(function(e){
    (e).preventDefault();
    console.log($('#movietitle').val());
    console.log($('#movierating').val());
  movie.title = $("#movietitle").val();
  movie.rating = $("#movierating").val();
       postMovie(movie);
       getMovies().then((movies) => {
         console.log('Here are all the movies:');
         $("#container").empty();
         movies.forEach(({title, rating, id}) => {
           $('#container').append(`<div class="card-img-top">pictures<div class="card"><div class="card-body">Id is ${id} number and the title is: ${title}, rated: ${rating}<br><span class="badge badge-primary">Edit Reel</span><span class="badge badge-danger">Trash Reel</span>
</div></div></div>`);
         })
    })
  })
});

