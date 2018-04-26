'use strict';
const $ = require('jquery');
import sayHello from './hello.js';
sayHello('World');

const post = require('./api.js');
$(".loader").css("display", "block");
function createCards() {
    $(".row").html("<p>Loading Movies...</p>");
    post.getMovies().then((movies) => {
        $(".loader").css("display", "none");
        console.log('Here are all the movies:');
        $(".row").html("");
        movies.forEach(({title, rating, id}) => {
            $(".row").append(`<div class="col-4">
       <div class="card">
           <div class="card-body">
               <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
               Edit
               </button>
               <button type="button" class="btn btn-danger">X</button>
               <h5 class="card-title"><em>Movie Title: </em><br>${title}</h5>
               <p class="card-subtitle"> ${rating} Stars</p>
               <p class="dbId">${id}</p>
           </div>
       </div>
   </div>`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}
createCards();

$('#addMovie').click((e) => {
    e.preventDefault();
    console.log('test');
    const title = $('input').val();
    const rating = $('select').val();
    post.addMovies({title: title, rating: rating});
    createCards();
});