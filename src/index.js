/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

$("#myDiv").addClass('hide');




function moviesRefresh(){
    const userTitle = document.getElementById("title").value;
    const userRating = document.getElementById("rating").value;
    $('#movies').html("");
    console.log(userTitle);
    console.log(userRating);
    $.getJSON("../db.json", function(data) {
      let newMovie = {
        // url: "",
        // type: "POST",
        // data: {
          title: userTitle,
            rating: userRating
        };
        data.push(newMovie);
    }).done(function (data) {
      console.log(data);
        movies.forEach(({title, rating, id}) => {
            $("#myDiv").append(`<div id="movies"> id# ${id} - ${title} - rating: ${rating}</div>`);
            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
    })

}
$("#addMovie").click(function(){
  console.log("it clicked");
  moviesRefresh();
});
/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        $("#myDiv").append(`<div id="movies"> id# ${id} - ${title} - rating: ${rating}</div>`);
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
    $('#loader').addClass('hide');
    $('#myDiv').removeClass('hide').addClass('show');
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});
