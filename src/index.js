/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */

const $ = require("jquery");


const {getMovies} = require('./api.js');

function buildHtml(objs) {

 let html = '';

  html = '<table>';
  html += '<tr>';
  html += '<th>Movie Name</th>';
  html += '<th>Movie Rating</th>';
  html += '<th>Movie ID</th>';
  objs.forEach((movie) => {
    html += '<tr>';
    html += '<td>' +  movie.title + '</td>';
    html += '<td>' +  movie.rating + '</td>';
    html += '<td>' +  movie.id + '</td>';
    html += '<td>' + '<button type="button">Delete</button>' + '<td>';
    html += '</tr>';
  });
    html += '</table>';



    return html;
}






$('#submit-button').click(function(e) {
  e.preventDefault();
  movieCreation();
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
