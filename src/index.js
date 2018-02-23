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

let id;

$(".container").html("<h1>Loading...</h1>");
$("form").hide();

$("#addMovie").click((e) => {
    e.preventDefault();
    const movie = {title: $("#newMovie").val(), rating: $("#rating").val(), id: ""};
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(url, options)
        .then(movie => updateMovies())
        .catch(error => console.log(error));
    $("#newMovie").val("");
    $("#rating").val("1");
});
updateMovies();
function updateMovies() {

    getMovies().then((movies) => {
      $(".newMovieForm").show();
      let html = "<table><tr><th>ID</th><th>Movie</th><th>Rating</th><th> </th></tr>";
      movies.forEach(({title, rating, id}) => {
        html += `<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button value="${id}" class="edit">Edit</button></td></tr>`;
      });
      html += "</table>";
      $(".container").html(html);
        $(".edit").click((e) => {
             id = e.target.value;
            $(".editMovieForm").show();
        });
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
}
    $("#updateMovie").click((e) => {
            console.log(e);
            e.preventDefault();
            saveMovie();
        });
function saveMovie() {
        console.log(id);
        const movie = {title: $("#editMovie").val(), rating: $("#newRating").val(), id: ""};
        const url = `/api/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        };
        console.log(url);
        console.log(options);
        fetch(url, options)
            .then(movie => {
                updateMovies();
                $(".editMovieForm").hide();
                $("#editMovie").val("");
                $("#newRating").val("1");
            })
            .catch();
}