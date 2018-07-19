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

function buildHtml(arrOfObj) {
    let html = "<table>";
    html += "<tr>";
    html += "<th>Movie Name</th>";
    html += "<th>Movie Rating</th>";
    html += "<th>Movie ID</th>";
    arrOfObj.forEach((movie) => {
        html += "<tr>";
        html += "<td>" + movie.title + "</td>";
        html += "<td>" + movie.rating + "</td>";
        html += "<td>" + movie.id + "</td>";
        html += "</tr>";
    });
    html += "</table>";

    html += "<form>";
    html += "<label>Movie Title</label>";
    html += "<input id='movieTitle'>";
    html += "<label>Movie Rating</label>";
    html += "<input id='movieRating'>";
    html += "</form>";
    html += "<button id='submitButton'>Submit</button>";
    return html;
}

let addMovie = () => {
    $('#submitButton').click(() => {
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
                console.log("1");
            })
            .catch(/* handle errors */);
    });
};


getMovies().then((data) => $(".JsonTable").html(buildHtml(data)))
    .then(() => $(".container").hide())
    .then(() => addMovie())
    .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });



$('#submitBtn2').click(() => {
    $('body').css('background-color', 'red');

});

