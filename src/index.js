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
function deletion(id) {

    const url = `/api/movies/${id}`;
    const options = {
        method: "DELETE",
    };

    return fetch(url, options)
        .then(response => response.json());
}

const {getMovies} = require('./api.js');

function refreshPage() {
    let html= "";
    getMovies().then((movies) => {
        console.log(movies);
        $(".x").toggleClass("invisible");
        console.log('Here are all the movies:');
        html += "<tr><th>No.</th><th>Name</th><th>Rating</th></tr>";
        movies.forEach(({title, rating, id}) => {
            // console.log('html' + html);
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            html +=`<tr id="${id}"><td>${id}</td><td>${title}</td><td>${rating}</td><td><button class="delete btn-outline-info" title="${id}">delete</button></td><td><button class="edit btn-outline-info">edit</button></td></tr>`;
        });
        $("table").html(html);
        //delete movie
        $("button.delete").click(() => {
            const ident = $(this).attr('title');
            console.log(ident);
            $(this).parent('tr').remove();
            deletion(ident);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}
refreshPage();
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

//delete movie

