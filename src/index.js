
/**
 * es6 modules and imports
 */

import $ from 'jquery';
window.jQuery = $;
//--function import for movie cards-->
import cardBuilder from './card-builder'
import addMovie from './add-movie.js'
import deleteMovie from './delete-movie.js'
import editMovie from './edit-movie.js'
import modalBuilder from './modal-builder.js'

/**
 * require style imports
 */
//<--required plugins and imports-->
require('rateyo/src/jquery.rateyo');
require('bootstrap');
const {getMovies} = require('./api.js');


//<--function to get movies from api-->
getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        //console.log(`id#${id} - ${title} - rating: ${rating}`);
        const mainContent = cardBuilder(title, rating, id);
        $('#main').append(mainContent);
    });
    //<--star rating on load for cards-->
    $(".rateYo").each(function () {
        $(this).rateYo({
            rating: $(this).data('rating'),
            starWidth: "20px",
            readOnly: true
        })
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

//<--star rating user input-->
$(".rateYo").rateYo({
    rating: 1,
    starWidth: "20px"
});
//---------Adding new movie with title and star rating on button click--------->
$('#addNew').click(function(event){
    event.preventDefault();
    console.log('I work!');
    const title = $('#input').val();
    const rating = $('#getRating').rateYo('rating');
    addMovie(title, rating).then (() => {
       const newCard = cardBuilder(title, rating);
        $('#main').append(newCard);
        $(".rateYo").each(function () {
            $(this).rateYo({
                rating: $(this).data('rating'),
                starWidth: "20px",
                readOnly: true
            })
        });

    })
});



//<--modal activation-->(
$('#myModal').modal('show');
//<--modal hide when movies are loaded-->
$.when( getMovies() ).done(function() {
    $('#myModal').modal('hide');
});


//--------------click function for delete card---------------->

$('.row').on('click', '.close', function(event){
    event.preventDefault();
    console.log('delete works!!');
    const $target = $(this).parent().parent().parent();
    $target.hide('slow', function(){ $target.remove(); });
    const id = event.target.id;
    console.log(id);
    deleteMovie(id);

    });

//---------------functionfor edit card------------------->

$('.row').on('click', '#editMe', function(event) {
    event.preventDefault();
    console.log('edit click works');
    $('#editModal').modal('show');
    const title =
    modalBuilder(title, rating, id);
});




// $('#editButton').click(function (event) {
//     event.preventDefault();
//     const title = $('#editInput').val();
//     const rating = $('#editRating').rateYo('rating');
//     const id =
// });
