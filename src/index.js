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
    return html;


}


getMovies().then((movies) => movies).then((data) => $(".container").html(buildHtml(data)))
    .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
       });
