/**
 * es6 modules and imports
 */

const $ = require("jquery");
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

$(".container").show();
$("#form").hide();
// $("#editInput").hide();
// $("#editRating").hide();

function buildHtml(arrOfObj) {
    let html = "<table>";
    html += "<tr>";
    html += "<th>Movie Name</th>";
    html += "<th>Movie Rating</th>";
    html += "<th>Movie ID</th>";
    arrOfObj.forEach((movie) => {
        html += "<tr>";
        html += "<td><button class='editBtns'>Edit</button><button>Delete</button>" + movie.title + "</td>";
        html += "<td>" + movie.rating + "</td>";
        html += "<td>" + movie.id + "</td>";
        html += "</tr>";
        html += "<tr class='editRow'>";
        html += "<td><input id='editMovie'></td>";
        html += "<td><input id='editRating'></td>";
        html += "<td><button class='saveBtns'>Save</button>";
        html += "</tr>";
    });
    html += "</table>";
    return html;
}

getMovies().then((data) => $(".JsonTable").html(buildHtml(data)))
    .then(() => $(".container").hide())
    .then(() => $("#form").show())
    // .then(() => $(".editRow").hide())
    .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });

let addMovie = () => {
    $('#test').click(() => {
        let movieTitleVal = $('#movieTitle').val();
        let movieRatinfVal = $('#movieRating').val();

        let newMovie = {title:movieTitleVal, rating:movieRatinfVal};
        let url = '/api/movies';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options)
            .then(() => {
                getMovies().then((data) => $(".JsonTable").html(buildHtml(data)));
            })
            .catch(() => console.log("error!"));
    });
};

let editMovie = () => {
    $(document).on('click', '.editBtns', (e) => {
        $(e.currentTarget).closest('tr').next().toggleClass('visible');
    });
};

let updateMoveAfterEdit = () => {
    $(document).on('click', '.saveBtns', (e) => {
        console.log($(e.currentTarget).parent().parent().prev())
    });



};

updateMoveAfterEdit();


addMovie();
editMovie();





