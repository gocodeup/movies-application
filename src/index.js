const $ = require('jquery');
/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js'); //imports functions for getting getting movies, adding, editing and deleting movies
$(document).ready(function () {

// function to add a loading animation
    $(window).on('load', function () {
        $('.movieList').css("display", "none");
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });

    //function to remove animation once screen has loaded
    function removeLoader() {
        $(".overlay-loader").fadeOut(500, function () {
            // fadeOut complete. Remove the loading div
            $("#overlay-loader").remove();
            $('.movieList').css("display", "inline-block")
        });
    }

//this function will console log the movie that you got from the API
    function movieUpdate() {
        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => { //loops through each movie in the array
                $('#insertMovies').append(`<tr>
                                        <th>${title}</th>
                                        <th>${rating}</th>
                                        </tr>`);
                console.log(`id#${id} - ${title} - rating: ${rating}`);//logs movie
            });
//catch in case something goes wrong
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            // console.log(error);
        });
    }

    movieUpdate();

    function movieUpdateDelete() {
        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => { //loops through each movie in the array
                $('#insertMovies').html(`<tr>
                                        <th>${title}</th>
                                        <th>${rating}</th>
                                        </tr>`);
                console.log(`id#${id} - ${title} - rating: ${rating}`);//logs movie
            });
//catch in case something goes wrong
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            // console.log(error);
        });
    }


//will add a new movie to the jb.son file and log the new movies array. Will later have it added to a library appended to the body.
    $('#add-movie').click(function () {//on click will add the new movie to the json file
        addMovie({
            "title": $('#input-movie').val(),
            "rating": $('#input-rating').val()
        })
        $('#input-movie').val('');
        $('#input-rating').val('');
    });

    $("#add-movie").click(function () { //on click will add movie to html
        $('#insertMovies').html(null);
        movieUpdate();

    });
    // function to add a loading animation
    $(".movieList").on('load', function () {
        $('.movieList').css("display", "none");
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });

    //function to remove animation once screen has loaded
    function removeLoader() {
        $(".overlay-loader").fadeOut(500, function () {
            // fadeOut complete. Remove the loading div
            $("#overlay-loader").remove();
            $('.movieList').css("display", "inline-block")
        });
    }


//     //loop through the array and check if the move title: === to #input-movie then delete that ID
//     let id = movies.id
//     console.log(id)

    function movieDelete() {

                let movieToDelete = $('#input-movie').val();
                $('#delete-movie').click(function () {
                    getMovies().then((movies) => {
            movies.forEach(({title, rating, id}) => { //loops through each movie in the array
                let i = id ;
                console.log(movies);
                    if (title === $('#input-movie').val()) {
                        // console.log(movies.title);
                        console.log(title);
                        deleteMovie(id);
                        console.log(id)
                    } else {
                        console.log("not a movie")
                    }
                });

                    $('#input-movie').val('');

            }).then(movieUpdateDelete) // after item is deleted this will update the hmtl with current movies

        });
    }
    movieDelete();


    // $("#delete-movie").click(function () {
    //     $('#insertMovie').html(null);
    //     movieUpdate2();
    //
    // });





//     deleteMovie(1).then(data => getMovies().then((movies) => {
//   console.log('Here are all the books:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id# ${id} - ${title} - ${rating}.`);
//   });
// }).catch((error) => {
//   alert('Not a movie')
//   console.log(error);
// }));


    // movies.forEach(movie => movie.title === moviee ? deleteMovie(movie).then(movieUpdate) : console.log("not a movie"));
});






