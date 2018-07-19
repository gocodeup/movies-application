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
    html += "<input>";
    html += "<label>Movie Rating</label>";
    html += "<input>";
    html += "</form>";
    html += "<button id='submitButton' type='submit'>Submit</button>";
    return html;
}



getMovies().then((data) => $(".container").html(buildHtml(data)))
    .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
