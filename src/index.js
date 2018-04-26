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
               <button type="button" class="btn btn-primary">
               Edit
               </button>
               <button type="button"  data-id="${id}" class="btn btn-danger delete">X</button>
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
    setTimeout(function(){
        createCards();
    }, 1200);
});


//
// $(function() {
//     $(".delete").click(function() {
//         $('#load').fadeIn();
//         var commentContainer = $(this).parent();
//         var id = $(this).attr("id");
//         var string = 'id='+ id ;
//
//         $.ajax({
//             type: "POST",
//             url: "delete.php",
//             data: string,
//             cache: false,
//             success: function(){
//                 card.slideUp('slow', function() {$(this).remove();});
//                 $('#load').fadeOut();
//             }
//
//         });
//
//         return false;
//     });
// });
//

$('.row').on('click', '.delete', (e)=>{
    e.preventDefault();
    console.log($(e.target).data('id'));
    $(e.target).parent('h1').remove();
    post.deleteMovies($(e.target).data('id')).then(movie => {
        $(e.target).parent().slideUp('slow', function() {$(this).remove();});

    });

});


