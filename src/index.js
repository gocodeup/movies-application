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

  html = '<table id="main-table" class="table table-dark">';
  html += '<thead>';
  html += '<tr>';
  html += '<th scope ="col">Movie Name</th>';
  html += '<th scope ="col">Movie Rating</th>';
  html += '<th scope ="col">Movie ID</th>';
  html += '</thead>';

  objs.forEach(({title, rating, id}) => {
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>${title}</td>`;
    html += `<td>${rating}</td>`;
    html += `<td><button type="button" class= "edit-button" data-id="${id}">Edit</button></td>`;
    html += `<td>${id}</td>`;
    html += `<td><button type="button" class= "delete-button" data-id="${id}">Delete</button></td>`;
    html += `</tr>`;
    html += `</tbody>`;
  });
    html += `</table>`;
    html += `<button id="create-movie" type="submit" class="btn btn-primary">Create Movie</button>`;


    return html;
}

$('body').on("click", "#create-movie", function() {
    $('#movie-create').show();
});


$('body').on("click", "#submit-button", function(e) {
    e.preventDefault();
    movieCreation();
    $('#movie-create').hide();
});


// $('body').on("click", ".delete-button", function() {
//     console.log('delete works');
//     movieDeletion();
//
// });

$('body').on("click", ".edit-button", function() {
    $('.modal-sm').show();
    console.log('edit works');

});

// $('#submit-button').click(function(e) {
//   e.preventDefault();
//   movieCreation();
//   console.log('Submit works');
// });



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

$('body').on("click", ".delete-button", function() {
    //function movieDeletion() {
        let id = $(this).attr("data-id");
        console.log(id);
        let uri = `/api/movies/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(uri, options)
            .then(moviePopulate)
    };
});




console.log('hello yeah');

function moviePopulate() {
    getMovies().then((movies) => movies).then((data) => $("#main-stuff").html(buildHtml(data)))
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
}
moviePopulate();
