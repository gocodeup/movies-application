const $ = require('jquery');
var pass = 0;

/**
 * es6 modules and imports
 */
import sayHello  from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

// refresh start
var refresh = (movies) => {

  console.log('Here are all the movies:');
  $('#movies').html('');
  movies.forEach(({title, rating, id, description}) => {
    console.log(`${title} rating: ${rating} description; ${description}`);

    $('#movies').append(
        `<div class="cards" >` +
        `<a class="underline" href="#ex${id}" rel="modal:open">`+
        `<li>${title}</li>` +
        `<div id="ex${id}" class="modal">` +
        `<p class="modalTitle">${title}</p>`+
        `<p class="modalStyle">${description}</p>`+
        `<form id="editForm">`+
        `<br>`+
        `<input class="editDesc" id="${id}descriptionEdit" type="text">`+
        `<button type="submit" id="submit">submit</button>`+
        `</form>`+
        `</div>` +
        `</a>`+
        `<span class="starRating">` +
        `<input id="${id}rating5" type="radio" name="${id}" value="${id}" class="radio5">`+
        `<label for="${id}rating5">5</label>`+
        `<input id="${id}rating4" type="radio" name="${id}" value="${id}" class="radio4">`+
        `<label for="${id}rating4">4</label>`+
        `<input id="${id}rating3" type="radio" name="${id}" value="${id}" class="radio3">`+
        `<label for="${id}rating3">3</label>`+
        `<input id="${id}rating2" type="radio" name="${id}" value="${id}" class="radio2">`+
        `<label for="${id}rating2">2</label>`+
        `<input id="${id}rating1" type="radio" name="${id}" value="${id}" class="radio1">`+
        `<label for="${id}rating1">1</label>`+
        `</span>`+
        `<button value="${id}" type="submit" class="deleteButton">delete</button>`+
        `<div>`

    );

    switch (rating) {
      case '1':
        $(`#${id}rating1`).attr('checked', 'checked');
        break;
      case '2':
        $(`#${id}rating2`).attr('checked', 'checked');
        break;
      case '3':
        $(`#${id}rating3`).attr('checked', 'checked');
        break;
      case '4':
        $(`#${id}rating4`).attr('checked', 'checked');
        break;
      case '5':
        $(`#${id}rating5`).attr('checked', 'checked');
        break;
    }
  });

  $(".radio5").click(function () {
    console.log('hi from radio 5' + $(this).val() + ' <- id');
    editMovie($(this).val(), {
      "rating": "5"
    });
  });
  $(".radio4").click(function () {
    editMovie($(this).val(), {
      "rating": "4"
    });
  });
  $(".radio3").click(function () {
    editMovie($(this).val(), {
      "rating": "3"
    });
  });
  $(".radio2").click(function () {
    editMovie($(this).val(), {
      "rating": "2"
    });
  });
  $(".radio1").click(function () {
    editMovie($(this).val(), {
      "rating": "1"
    });
  });



  $('.deleteButton').click(function (e) {
    e.preventDefault();
    deleteMovie($(this).val());
    getMovies().then((movies)=>refresh(movies));
    console.log('click')
  });

  pass = 0;
  // $('li').css('color', 'yellow');
};


$(".editRadio").click(function () {
pass = $(this).val();
});

// refresh end

$('#submit').click(function (e) {
e.preventDefault();
addMovie(pass);
  getMovies().then((movies)=>refresh(movies));
});

// $('#submitEdit').click(function (e) {
//   e.preventDefault();
//   editMovie($('#idNumber').val());
//   console.log($('#idNumber').val());
//   getMovies().then((movies)=>refresh(movies));
//
// });

$('#submitEdit').click(function (e) {
  e.preventDefault();
 let id = $('#idNumber').val();
 editMovie(id, {
   "rating": $('#ratingEdit').val()
 });
  getMovies().then((movies)=>refresh(movies));

});

$('#submitDescription').click(function (e) {
  e.preventDefault();
  let id = $('#idNumber').val();
  editMovie(id, {
    "description": $('#descriptionEdit').val()
  });
  getMovies().then((movies)=>refresh(movies));

});





// $('.deleteButton').click(function (e) {
//   e.preventDefault();
//   deleteMovie($(this).val());
//   getMovies().then((movies)=>refresh(movies));
//   console.log('click')
// });

getMovies().then((movies) => {
  refresh(movies);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});






