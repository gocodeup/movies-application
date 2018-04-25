/**
 * This file is the "entrypoint" into your application
 */
import 'bootstrap';
import $ from 'jquery';





// $(() => {
//   $('[data-toggle="popover"]').popover()
// })

// const refreshPage(){
//     createHTMLDocument.getElementById().style.display="none";}
//     module.exports={refreshPage};}

const {getMovies} = require('./api.js');

function refreshPage() {
    var html= "";
    getMovies().then((movies) => {
        console.log(movies);
        $(".x").toggleClass("invisible");
        console.log('Here are all the movies:');

        movies.forEach(({title, rating, id}) => {
            // console.log('html' + html);
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            html +=`<tr><td>${id}</td><td>${title}</td><td>${rating}</td><td><button>delete</button></td></tr>`;
        });
        $("table").html(html);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};
refreshPage()
// add movie
$("#addMovie").click((e) => {
    e.preventDefault();
    const newMovie = {
        title: $("#newMovie").val(),
        rating: $("#rateMovie").val()
    };
    const url = "/api/movies/";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)
    };

    fetch(url, options)
        .then( () => {
            refreshPage()
        })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });


});