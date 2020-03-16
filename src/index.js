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
        $('.movieList').css("display", "none"); //while loading no list is displayed
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });

    //function to remove animation once screen has loaded
    function removeLoader() {
        $(".overlay-loader").fadeOut(500, function () {
            // fadeOut complete. Remove the loading div
            $("#overlay-loader").remove(); //removes loader after set time
            $('.movieList').css("display", "inline-block") //displays movie list again
        });
    }

//this function will console log the movie that you got from the API and add it to the #insertMovie
    function movieUpdate() {
        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => { //loops through each movie in the array
                $('#insertMovies').append(`<tr>
                                        <td class="title">${title}</td>
                                        <td class="rating">${rating}</td>
                                        </tr>`);
                console.log(`id#${id} - ${title} - rating: ${rating}`);//logs movie
            });
//catch in case something goes wrong
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            // console.log(error);
        });
    }

    function movieDelete() {
        $('#delete-movie').click(function () { //when you click gets movies from json file
            getMovies().then((movies) => {
                movies.forEach(({title, rating, id}) => { //loops through each movie in the array
                    console.log(movies);
                    if (title === $('#input-movie').val()) { // if the title you input is equal to the title of json object
                        // console.log(movies.title);
                        console.log("movie deleted is: " + title, id);
                        $('#insertMovies').html(""); // clear list
                        deleteMovie(id).then(movieUpdate); //movie id is deleted and list is updated
                    } else {
                        console.log("not a movie")
                    }
                });

                $('#input-movie').val(''); //clears search box

            })// after item is deleted this will update the hmtl with current movies


        });


    }


    movieUpdate();
    movieDelete();

//will add a new movie to the jb.son file and log the new movies array. Will later have it added to a library appended to the body.
    $('#add-movie').click(function () {//on click will add the new movie to the json file
        addMovie({
            "title": $('#input-movie').val(),
            "rating": $('#input-rating').val()
        })
        $('#input-movie').val(''); //clears input
        $('#input-rating').val(''); //clears input
        $('#insertMovies').html("");// clears list
        movieUpdate(); //updates list with no added movie
    });


    //removes  movie list on load to show loading animation
    $(".movieList").on('load', function () {
        $('.movieList').css("display", "none");
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });


    // on click of edit button #edit-movie
    // loop through each movie
    // replace each th with a an input box
    // name variable should equal the $('th').text() in that part of the loop
    //
    function editMovies() {
        $('#edit-movie').click(function(){
            // getMovies().then((movies) => {
            //     movies.forEach(({title, rating, id}) => {
            $('#movies > tbody').each(function (element) {
                // var name = $('th').text();
                    $('tr > td.title, tr > td.rating').val();
                    $('<input></input>')
                        .attr({
                            'type': 'text',
                            'name': 'fname',
                            'id': 'txt_fullname',
                            'size': '30',
                            'value': name
                        })
                        .appendTo('th');
                    $('#txt_fullname').focus();
            });


            })

        // $(document).on('blur','#txt_fullname', function(){
        //     var name = $(this).val();
        //     $.ajax({
        //         type: 'post',
        //         url: 'change-name.xhr?name=' + name,
        //         success: function(){
        //             $('th').text(name);
        //         }
        //     });
        // });
    }
    editMovies();

});






