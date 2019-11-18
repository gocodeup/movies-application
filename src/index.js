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
    $('#container').append(`<div class="card" id=${id}><div class="card-img-top">picture placeholder<div class="card-body"><span id="${title}">Title: ${title}</span> rated: ${rating}<br><button class="testbutton">Edit Reel</button></div></div></div>`);
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
  //  Getting values and saving them to post
  movie.title = $("#movietitle").val();
  movie.rating = $("#movierating").val();
       //Ability to post movies dynamically
       postMovie(movie);
       getMovies().then((movies) => {
         $("#container").empty();
         movies.forEach(({title, rating, id}) => {
           $('#container').append(`<div class="card-img-top">pictures<div class="card"><div class="card-body">title: ${title}, rated: ${rating}<br><span class="badge badge-primary">Edit Reel</span><span class="badge badge-danger">Trash Reel</span>
</div></div></div>`);
         })
    })
  });
//  Updating the edit modal dynamically

  $(document).ready(function(){
  $('body').on('click', '.testbutton', function() {
      let buttonclicked = $(this);
      let movietitle = buttonclicked.parent().find("span").attr("id");
    console.log(movietitle);
  });
  });

});
