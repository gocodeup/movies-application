/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');
const $ = require("jquery");



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $('#container').append(`<div class="card" id=${id}><div class="card-img-top">picture placeholder<div class="card-body"><span id="${title}">Title: ${title}</span> rated: ${rating}<br><button class="editbutton">Edit Reel</button><button class="trashbutton">Trash Reel</button></div></div></div>`);
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
           $('#container').append(`<div class="card" id=${id}><div class="card-img-top">picture placeholder<div class="card-body"><span id="${title}">Title: ${title}</span> rated: ${rating}<br><button class="editbutton">Edit Reel</button><button class="trashbutton">Trash Reel</button></div></div></div>`);
         });
         });
    });
  });
//  Updating the edit modal dynamically

  $(document).ready(function() {
    $('body').on('click', '.editbutton', function () {
      let buttonclicked = $(this);
      let movietitle = buttonclicked.parent().find("span").attr("id");
      $("#edit-text").val(movietitle);
      $(".modal-title").text(movietitle);
      let divid = buttonclicked.parent().parent().parent().attr("id");
      $("#hideid").text(divid);
    });

    $("#ratingchange").click(function (e) {
      let dbid = $("#hideid").text();
      let newtitle = $("#edit-text").val();
      let newrating = $("#editmovierating").val();
      console.log(dbid);
      let movie = {
        "title": newtitle,
        "rating": newrating
      };
      patchMovie(movie, dbid);
      $("#container").empty();

      getMovies().then((movies) => {
        $("#container").empty();
        movies.forEach(({title, rating, id}) => {
          $('#container').append(`<div class="card" id=${id}><div class="card-img-top">picture placeholder<div class="card-body"><span id="${title}">Title: ${title}</span> rated: ${rating}<br><button class="editbutton">Edit Reel</button><button class="trashbutton">Trash Reel</button></div></div></div>`);
        });
      });
    });

    $('body').on('click', '.trashbutton', function () {
      let buttonclicked = $(this);
      let divid = buttonclicked.parent().parent().parent().attr("id");
      let confirmvalue = confirm("Are you sure?");
      if (confirmvalue === true) {
        deleteMovie(divid)
      }
      ;
      getMovies().then((movies) => {
        $("#container").empty();
        movies.forEach(({title, rating, id}) => {
          $('#container').append(`<div class="card" id=${id}><div class="card-img-top">picture placeholder<div class="card-body"><span id="${title}">Title: ${title}</span> rated: ${rating}<br><button class="editbutton">Edit Reel</button><button class="trashbutton">Trash Reel</button></div></div></div>`);
        });
      });
    });
  });