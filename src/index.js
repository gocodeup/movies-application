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
    $('<h1>The Movie App</h1><br>').appendTo(".addTest");
        $('#main').removeClass('hidden');
        $('#listMovies').removeClass('hidden');
        $('form').removeClass('hidden');
    }, 1200)

});

listAndTable();

const url = "/api/movies";

const postMovies = (movie, rating) => {
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: movie, rating: rating})
    }).then(function (response) {
        $('#instertMovies').empty();
        return response.json();
    })
}

function listAndTable(){
    $('<table id="listMovies" class="listTable hidden" align="center">\n' +
        '<thead>\n' +
        '<tr>\n' +
        '<th>ID</th>\n' +
        '<th>Name</th>\n' +
        '<th>Rating</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody id="instertMovies"></tbody>\n' +
        '</table>').appendTo('.movies');
        tableLoad();
}

function tableLoad(){
    getMovies().then((movies) => {
        // $('<h2>Here are all the Movies</h2>').appendTo('.addTest');
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
        movies.forEach(({title, rating, id}) => {
            let htmlString = "";
            htmlString += "<a class=\"moviesDroped dropdown-item\" href=\"#\">" + id + "  " + title + "</a>";
            $('#dropMovies').append(htmlString);
        });
    movieEditLoad();
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
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

// SUBMIT BUTTONS
$("#submit").click(function() {
    submitMovies();
    location.reload();
});

// Delete Movie
$("#delete").click(function() {
    let movieNametoDelete = movieDropdown.toString();
    deleteData(movieNametoDelete);
    location.reload();
});

$("#edit").click(function() {
    sendStringToBox()

    // var newMovieName = $('#movieInput').val();
    // var nameSplited = newMovieName.split(" ");
    // var nameNormalized = nameSplited[1].toString();
    //
    // $("#submit").click(function() {
    //     submitMovies();
    //     location.reload();
    // });
    let movieNametoDelete = movieDropdown.toString();
    deleteData(movieNametoDelete);

});

$("#sendEdit").click(function() {
//   we need to delete the selected movie, and send the new movie or updated movie.
//     var newMovieName = $('#movieInput').val();
//     var nameSplited = newMovieName.split(" ");
//     var nameNormalized = nameSplited[1].toString();
//
//     let movieNametoDelete = movieDropdown.toString();
//     deleteData(movieNametoDelete);
//
//     if (newMovieName) {
//         postMovies(newMovieName);
//     } else {
//         alert('Please enter a movie to POST.');
//     }
//     location.reload();

});

let sendStringToBox = () => {
    let movieNametoDelete = movieDropdown.toString();
    console.log("This is from sendStringToBox: " + movieNametoDelete);
    $('#movieInput').val(movieNametoDelete);
}

// Logic for rating dropdown
let ratings = $('.dropdown-item');
ratings = Array.from(ratings);

ratings.forEach(function (element) {
    element.addEventListener('click', function() {
        var selection = element.innerText;
        console.log(selection);
        rating.push(selection);
    });
});

let movieDropdown = [];

const movieEditLoad = () => {
    let moviesDropdown = $('.moviesDroped');
    moviesDropdown = Array.from(moviesDropdown);

    moviesDropdown.forEach(function (element) {
        element.addEventListener('click', function() {
            var selection = element.innerText;
            console.log(selection);
            movieDropdown.push(selection);
        });
    });
}

let deleteData = (id) => {
    let newID = id.charAt(0);
    console.log(newID);

    return fetch(url + '/' + newID,{
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'}
    }).then(response => response.json());
};




