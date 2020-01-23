import $ from 'jquery'

import sayHello from './hello.js';

sayHello();

import {getMovies} from './api';

const generateTable = () => {
    getMovies().then((movies) => {
        // Add table to container
        let movieTable = '<table class="movies highlight centered" id="movie-list">';
        movieTable += '<thead>';
        movieTable += '<tr>';
        movieTable += '<th>Movie</th>';
        movieTable += '<th>Rating</th>';
        movieTable += '<th>Options</th>';
        movieTable += '</tr>';
        movieTable += '</thead>';
        // console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            //renders movie and rating in table rows
            movieTable += `<tr><td id="row-title">${title}</td><td id="row-rating">${rating}</td>`;
            movieTable += `<td data-id="${id}" id="row-button"><i class="fas fa-edit row-edit"></i> <i data-id="${id}" class="fas fa-trash-alt row-delete" ></i></td></tr>`
            // add table edit and delete

        });
        //closes table after content is rendered
        movieTable += '</table>';
        // adds fetched table info to HTML
        $('.container').html(movieTable)

    })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.')
            console.log(error);
        })
};
generateTable();

//Submit form
$('#submit-button').click((e) => {
    e.preventDefault();
    console.log("clicked");
    if ($('#movie-title-input').val() !== "") {

        let title = $('#movie-title-input').val();
        let rating = $('#movie-rating-input').val();
        let movie = {
            title: title,
            rating: rating
        };

        const url = '/api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie),
        };
        fetch(url, options).then((response) => {
            console.log(response.json());
        }).then(() => {
            generateTable();
        });
    }
});

//Delete button
$('.container').on("click", '.row-delete', () => {
    console.log('delete clicked');
    let id = $(this).attr('data-id');
    let url = `/api/movies/${id}`;
    let options = {
       method: 'DELETE',
        headers: {
           'Content-Type': 'application/json'
        },
   };
    fetch(url, options)
    .then(() => {
        generateTable();
    });
});


// $('#row-delete').click(() => {
//     getMovies().then((movies) => {
//         console.log('delete clicked');
//         const url = `/api/movies/${movies.id}`;
//         const options = {method: 'DELETE',};
//         fetch(url, options).then((response) => response.json())
//             .then(() => generateTable())
//     });
// });
