/**
 * es6 modules and imports
 */

const $ = require('jquery');
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
// const {postMovies} = require('./api.js');
const {getMovies} = require('./api.js');

$(document).ready(function(){
    // $('#addTest').remove();
    setTimeout(function () {
    $('#load_screen').remove();
    $('<h1>The Movie App</h1>,<br>').appendTo(".addTest");
    listAndTable();
    }, 2000)
});

const postMovies = (movie, rating) => {
    fetch('/api/movies',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: movie, rating: rating})
    }).then(function (response) {
        return response.json();
    })
}

function listAndTable(){
    $('<table id="listMovies" align="center">\n' +
        '<thead>\n' +
        '<tr>\n' +
        '<th>ID</th>\n' +
        '<th>Name</th>\n' +
        '<th>Rating</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody id="instertMovies"></tbody>\n' +
        '</table>').appendTo('.movies');
    tableLoad(); // Loads table
}

function tableLoad(){
    getMovies().then((movies) => {
        $('#movies').append('<h2>Here are all the Movies</h2>');
        movies.forEach(({title, rating, id}) => {
            let htmlString = "";
            htmlString += "<tr>";
            htmlString += "<td>" + id + "</td>";
            htmlString += "<td>" + title + "</td>";
            htmlString += "<td>" + rating + "</td>";
            htmlString += "</tr>";
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            $('#instertMovies').append(htmlString);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
    $('#main').removeClass('hidden');
}

let rating = [];
function submitMovies() {

    let content = $("#movieInput").val();
    let ratingNew = rating.toString();
    console.log(ratingNew);

    if (content) {
        postMovies(content,ratingNew);
    } else {
        alert('Please enter a movie to POST.');
    }
}

$("#submit").click(function() {
   submitMovies();
   $('#listMovies').empty();
   listAndTable();
});

let ratings = $('.dropdown-item');
ratings = Array.from(ratings);

ratings.forEach(function (element) {
    element.addEventListener('click', function() {
        var selection = element.innerText;
        console.log(selection);
        rating.push(selection);
    });
});


