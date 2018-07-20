/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

$("#myDiv").addClass('hide');

const post = require('./api.js');

$('#addMovie').click((e) => {
    e.preventDefault();
    const title = $('#title').val();
    const rating = $('input[name=rating]:checked').val();
    post.addNewMovie({title, rating});
    setTimeout(function(){
        moviesRefresh();
    }, 1000);
    $('input[type="text"], text').val('');
    $('.form-group').find('input:radio').prop('checked', false);
});

$('#editMovie').click((e) => {
    console.log("Edit clicked");
    e.preventDefault();
    const title = $('#titleEdit').val();
    const rating = $('input[name=ratingEdit]:checked').val();
    post.editMovie({title, rating});
    setTimeout(function(){
        moviesRefresh();
    }, 1000);
    $('input[type="text"], text').val('');
    $('.form-group').find('input:radio').prop('checked', false);
});

function moviesRefresh() {
    getMovies().then((movies) => {
        $("#movies").html("");
        console.log('Here are all the movies:');
        console.log(movies);
        movies.forEach(({title, rating, id}) => {
            $("#movies").append(`<div>${title} - rating: ${rating}</div> <button id=${id} type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#editModal">Edit</button>`);
            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
        $('#loader').addClass('hide');
        $('#myDiv').removeClass('hide').addClass('show');
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    console.log(movies);
    let movieIds = 1;
    let j = 0;
    movies.forEach(({title, rating, id}) => {
        $("#movies").append(`<div>${title} - rating: ${rating}</div> <button id=${id} type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#editModal">Edit</button>`);
        console.log(`id#${id} - ${title} - rating: ${rating}`);
        movieIds++;
        j++;
    });
    $('#loader').addClass('hide');
    $('#myDiv').removeClass('hide').addClass('show');
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});
