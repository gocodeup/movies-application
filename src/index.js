/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('Codeup');

/**
 * require style imports
 */
const $ = require('jquery');
const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');


//get all movies
getMovies().then((movies) => {
    $('#loading').hide();
    $("#addMovie").removeClass('noDisplay');
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id , genre}) => {
        console.log({title, rating, id});
        $('#content').append(`<div class="card m-2" style="width: 18rem">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-text text-center">${title}</h5>
        <p class="card-text text-center">Rating: ${rating}</p>
        <p class="card-text text-center">${genre}</p>
        <button class = "btn btn-dark editButton" id="button${id}"></button>
    </div>
    </div>`)
    });
$('.editButton').on('click', btnClassClick);
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

//get a single book
getMovie(1)
    .then(movie => {
        console.log("Making a request to a single movie");
        console.log(`${movie}`);
    })
    .catch(() => console.log('The important thing is you tried...'));

$("#addMovieButton").click(function () {
    postMovie({
        "title": $('#movieTitleInput').val(),
        "rating": $("#ratingSelect").val(),
        "genre" : $("#genreInput").val()
    }).then(getMovies).then((movies) => {
        console.log('Here are all the movieeees:');
        $('#content').html("");
        movies.forEach(({title, rating, genre}) => {
            console.log(`${title} rated ${rating}`);
            $('#content').append(`<div class="card m-2" style="width: 18rem">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-text text-center">${title}</h5>
        <p class="card-text text-center">Rating: ${rating}</p>
        <p class="card-text text-center">${genre}</p>
    </div>
    </div>`)
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
});

var btnClassClick = function(e){
    alert("Button clicked from class: "+e.currentTarget.id);
};




//davids code

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//     getBooks().then((books) => {
//       console.log('Here are all the books:');
//       books.forEach(({title, author, year}) => {
//         console.log(`${title} by ${author} - ${year}`);
//       });
//     }).catch((error) => {
//       alert('Oh no! Something went wrong.\nCheck the console for details.')
//       alert('Oh no! Something went wrong.\nCheck the console for details.');
//       console.log(error);
//     });
//
//     getBook(1)
//         .then(book => {
//           console.log("Making a request to a single book");
//           console.log(`${book.title} by ${book.author} - ${book.year}`);
//         })
//         .catch(() => console.log('The important thing is you tried...'));
//
//
// patchBook({
//     "pages": 1201,
//     "title": "Garfield Learns Python III",
//     "year": 2023
// }, 26).then(getBooks).then((books) => {
//     console.log('Here are all the books:');
//     books.forEach(({title, author, year}) => {
//         console.log(`${title} by ${author} - ${year}`);
//     });
// }).catch((error) => {
//     alert('Oh no! Something went wrong.\nCheck the console for details.');
//     console.log(error);
// });
//
//     deleteBook(27).then(postBook({
//       "author": "Jim Davis",
//       "country": "United States",
//       "imageLink": "images/???.jpg",
//       "language": "English",
//       "link": "https://www.amazon.com/Garfield-Loses-His-Feet-Book/dp/0345464672\n",
//       "pages": 98,
//       "title": "Garfield Loses His Feet",
//       "year": 1984
//     })).then(getBooks).then((books) => {
//       console.log('Here are all the books:');
//       books.forEach(({title, author, year}) => {
//         console.log(`${title} by ${author} - ${year}`);
//       });
//     }).catch((error) => {
//       alert('Oh no! Something went wrong.\nCheck the console for details.');
//       console.log(error);
//     });

