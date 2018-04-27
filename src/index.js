/**
 * This file is the "entrypoint" into your application
 */
import 'bootstrap';
import $ from 'jquery';



const {getMovies, deletion, changes} = require('./api.js');

function refreshPage() {
    let html = "";
    getMovies().then((movies) => {
        console.log(movies);

        $(".x").toggleClass("invisible");
        console.log('Here are all the movies:');

        html += "<tr><th>No.</th><th>Name</th><th>Rating</th></tr>";

        movies.forEach(({title, rating, id}) => {
            html +=
                `<tr id="${id}"><td>${id}</td><td>${title}</td><td>${rating}</td><td>
                <button class="delete btn-outline-info"    title="${id}">delete</button></td><td>
    <button type="button" class="btn-outline-info poof" title="${id}"data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
    </td></tr>`;
        });

        $("table").html(html);

    }).then(() => {
        //delete movie
        $("button.delete").click((event) => {
            const ident = $(event.target).attr('title');
            console.log(ident);
            deletion(ident);
            refreshPage()
        });
        $(".poof").click((event) => {
            const id = $(event.target).attr('title');
            console.log($("#editForm").val(id));

        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });

       $("#editButton").click(e => {
           e.preventDefault();
           const editMovie = {
               title: $('#editMovie').val(),
               rating: $('#editRating').val(),


           };
           console.log(e.target)
           changes(editMovie)
          .then(() => {
                   refreshPage()
               })
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
        .then(() => {
            refreshPage()
        })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });


});





