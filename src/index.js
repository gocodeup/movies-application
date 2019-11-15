/**
 * es6 modules and imports
 */
import sayHello from './hello';
//import $ from 'jquery';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, deleteMovie} = require('./api.js');

displayMovies();
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//
//
//         let card = `<div class="card mb-3" style="max-width: 540px">
//                 <div class="row no-gutters">
//                     <div class="col-md-4">
//                         <img src="" class="card-img" alt="">
//                     </div>
//                     <div class="col-md-8">
//                         <div class="card-body">
//                             <h5 class="card-title">${title}</h5>
//                             <p class="card-text"><small class="text-muted mr-3">Date</small><small class="text-muted mr-3">Genre</small><small class="text-muted">Rating: ${rating}</small></p>
//                             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                             <p>
//                                 <button type="submit" class="btn btn-info edit_movie" id="${id}">Edit</button>
//                                 <button type="submit" class="btn btn-danger delete_movie" id="${id}">Delete</button>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
//
//         $('#movieContent').append(card);
//
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


$(document).on('click','.edit_movie', function (e) {
  e.preventDefault();

  let idEdit = $(this).attr('id');
  alert(idEdit);
});

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
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    $('#movieContent').html("");

    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);


      let card = `<div class="card mb-3" style="max-width: 540px">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="" class="card-img" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><small class="text-muted mr-3">Date</small><small class="text-muted mr-3">Genre</small><small class="text-muted">Rating: ${rating}</small></p>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p>
                                <button type="submit" class="btn btn-info edit_movie" id="${id}">Edit</button>
                                <button type="submit" class="btn btn-danger delete_movie" id="${id}">Delete</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
      $('#movieContent').append(card);

    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}

//event handler to display loading animations while API is connecting
$(document).ajaxSend(function () {
  let html = "<div class='container'><h1><div class='spinner-border' role='status'> <span class='sr-only'>Loading...</span></div></h1></div>";
  $('#movieContent').html("");
  $('#movieContent').append(html);
});
//event handler to set display to none to loading animations after the API is already connected
$(document).ajaxComplete(function (requestName) {
  $('.spinner-border').css("display", "none");
});