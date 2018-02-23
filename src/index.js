/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

function showMovies() {
    getMovies().then((movies) => {
        $('#movieDisplay').html('Here are all the movies: ' + '<br>');
        // console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            $('#movieDisplay').append(`id#${id} - ${title} - rating: ${rating}<br>`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}
showMovies();

// ###################    Check values for input  ##########################
$('input').keyup(function(){
  if($('#movieTitle').val()!=='' && $('#movieRating').val()!==''){
    $('#addMovie').prop('disabled',false);
  }else{
      $('#addMovie').prop('disabled',true);
  }
})


//#################    Add movie button  #####################################
$('#addMovie').click(function(){
  event.preventDefault();
  let newMovie = {
    title: $('#movieTitle').val(),
    rating: $('#movieRating').val()
  };
  const url = ('/api/movies');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(newMovie)
  };
  fetch(url,options)
      .then(showMovies);
    $('#movieTitle').val('');
    $('#movieRating').val('');

});
