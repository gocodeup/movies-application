

const $ = require("jquery");
require('bootstrap');


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
    html += `<td>${id}</td>`;
    html += `<td><button id='edit-function' type="button" class= "edit-button" data-id="${id}">Edit</button></td>`;
    html += `<td><button type="button" class= "delete-button" data-id="${id}">Delete</button></td>`;
    html += `</tr>`;
    html += `</tbody>`;
  });
    html += `</table>`;
    html += `<button id="create-movie" type="submit" class="btn btn-primary">Create Movie</button>`;


    return html;
}

//===========Add Movie========\\

$('body').on("click", "#create-movie", function() {
    $('#movie-create').show();
    $('#create-movie').hide()
});


$('body').on("click", "#submit-button", function(e) {
    e.preventDefault();
    movieCreation();
    $('#movie-create').hide();
    $('#create-movie').show();
});



//==============Edit Movie========\\


$('body').on("click", ".edit-button", function() {
    $('#movie-edit-modal').show();
    console.log('edit works');

});

$('body').on("click", "#edit-submit-button", function(e) {
    e.preventDefault();
    $('#movie-edit-modal').hide();
    editCreation();
});


//===========Edit Creation=======\\
function editCreation() {
    const newMovie = {title: $('#edit-title-submit').val(), rating:$('#edit-rating-submit').val()};
    let id = $('#edit-function').attr("data-id");
    let uri = `/api/movies/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(uri, options)
        .then(moviePopulate)
}

//=========Movie Creation=======\\

function movieCreation() {
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

//===========Movie Deletion========\\

$('body').on("click", ".delete-button", function() {

        let id = $(this).attr("data-id");
        let uri = `/api/movies/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(uri, options)
            .then(moviePopulate)
});


function moviePopulate() {
    getMovies().then((movies) => movies).then((data) => $("#main-stuff").html(buildHtml(data)))
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
}
moviePopulate();
