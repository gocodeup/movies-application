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
  let html = '<table>';
  html += '<tr>';
  html += '<th>Movie Name</th>';
  html += '<th>Movie Rating</th>';
  html += '<th>Movie ID</th>';
  objs.forEach((movie) => {
    html += '<tr>';
    html += '<td>' +  movie.title + '</td>';
    html += '<td>' +  movie.rating + '</td>';
    html += '<td>' +  movie.id + '</td>';
    html += '</tr>';
  });
    html += '</table>';
    html += '<form>';
    html += '<h4>Add A Movie</h4>';
    html += 'Movie Title';
    html += '<input type = "text" id="title-submit"><br>';
    html += 'Rating';
    html += '<input type = "text" id="rating-submit"><br>';
    html += '<input type = "submit" id="submit-button"><br>';
    html += '</form>';


    return html;


}

$('#submit-button').click(function() {
    console.log('Test');
});


//let submitTitle = $('#title-submit').value;
//let submitRating = $('#rating-submit').value;





/*function movieCreation() {

    const newMovie = {title: submitTitle}
    var uri = '/api/movies';
    const options = {
        method: POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };

    fetch(uri, options)
        .then("Success");
.
    catch("Error");

};
*/

//Populate JSON(DB) as HTML//
getMovies().then((movies) => movies).then((data) => $(".container").html(buildHtml(data)))
    .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
       });

