/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');


function runMovie() {
    const {getMovies} = require('./api.js');
    const $ = require('jquery');

    getMovies().then((movies) => {
        $('#loading').hide();
        console.log('Here are all the movies:');
        $('#movieList').html("");
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);

            $('#movieList').append(`<div id = ${id}><p><strong>Title #${id}:</strong> ${title} </p>
      <strong>Rating:</strong> ${rating}<br>
`);
        },
        $('#editMovie').html(`Select Movie Number to Edit <br>
        <input id="inputID" type="number" min="1" max="${movies.length}" value="1">
        <br>Title<br><input type="text" id="editTitle" name="title">
        <br>Rating<br><input id="editRating" type="number" name="rating" min="1" max="5" value="1">
        <br><button id="editBtn">Edit</button>
`),
            $('#editBtn').click(e => {
                e.preventDefault();
    //             let editTitle = $('#editTitle').val();
    //             let editRating = $('#editRating').val();
    //             let selectedID = $('#inputID').val();
    //
    //             let editMovie ={ title: editTitle, rating: editRating};
    //             console.log(editMovie);
    //             console.log(JSON.stringify(editMovie));
    //
    //             $.ajax({
    //                 url:   `/api/movies/${selectedID}`,
    //                 type: 'PUT',
    //                 data: JSON.stringify(editMovie),
    //                 contentType: 'json'
    //             });
    //             runMovie();
    //         })
    //     );
    // }).catch((error) => {
    //     alert('Oh no! Something went wrong.\nCheck the console for details.');
    //     console.log(error);


    });
}
runMovie();

$('#submit').click( e => {
  e.preventDefault();

  let title = $('#movieTitle').val();
  let rating = $('#rates').val();

  $.post("./api/movies", {
    title: title,
    rating: rating
  });
    runMovie();

});

/*
*
*   <p><input type="text" name="title" value="${title}"></p>
    <button class="editBtn">Edit</button><button>Delete</button></div><br>
* */

