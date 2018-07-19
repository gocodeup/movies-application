/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

$(function () {
    let isItLoaded = $("#myDiv");

    setTimeout(function () {
        if (isItLoaded == undefined) {
            $("#loader").css("display", "block")
        } else if (isItLoaded !== undefined) {
            showPage();
        }
    }, 3000);

// let myVar;
// $(function myFunction() {
//     myVar = setTimeout(showPage, 3000);
// });

    function showPage() {
        $("#loader").css("display", "none");
        $("#myDiv").css("display", "block");
    }
});

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        $("#myDiv").append(`id#${id} - ${title} - rating: ${rating}`);
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});
