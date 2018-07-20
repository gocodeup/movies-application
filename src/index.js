/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const $ = require("jquery");
const bootstrap = require('bootstrap');


const {getMovies} = require('./api.js');

function buildHtml(objs) {

 let html = '';

  html = '<table id="main-table" class="table">';
  html += '<thead>';
  html += '<tr>';
  html += '<th scope ="col">Movie Name</th>';
  html += '<th scope ="col">Movie Rating</th>';
  html += '<th scope ="col">Movie ID</th>';
  html += '</thead>';

  objs.forEach((movie) => {
    html += '<tbody>';
    html += '<tr>';
    html += '<td>' +  movie.title + '</td>';
    html += '<td>' +  movie.rating + '</td>';
    html += '<td>' +  movie.id + '</td>';
    html += '<td>' + '<button type="button" id= "edit-button">Edit</button>' + '</td>';
    html += '<td>' + '<button type="button" id= "delete-button">Delete</button>' + '</td>';
    html += '</tr>';
    html += '</tbody>';
  });
    html += '</table>';


    return html;
}


$('body').on("click", "#delete-button", function() {
    console.log('delete works');

});

$('body').on("click", "#edit-button", function() {
    $('.modal-sm').show();
    console.log('edit works');

});

$('#submit-button').click(function(e) {
  e.preventDefault();
  movieCreation();
  console.log('Submit works');
});



//let submitRating = $('#rating-submit').value;



function movieCreation() {
    console.log($('#title-submit').val());
    const newMovie = {title: $('#title-submit').val(), rating:$('#rating-submit').val()};
    let uri = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };

    fetch(uri, options)
        .then(moviePopulate)

}



console.log('hello yeah');
function moviePopulate() {
    getMovies().then((movies) => movies).then((data) => $(".container").html(buildHtml(data)))
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
}
moviePopulate();