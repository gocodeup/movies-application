/**
 * es6 modules and imports
 */

<<<<<<< HEAD
=======
const $ = require('jquery');
>>>>>>> master
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
// const {postMovies} = require('./api.js');
const {getMovies} = require('./api.js');

$(document).ready(function(){
    // $('#addTest').remove();
    setTimeout(function () {
    $('#load_screen').remove();
    $('<h1>The Movie App</h1>,<br>').appendTo(".addTest");
    listAndTable();
    }, 2000)
});

const postMovies = (movie, rating) => {
    fetch('/api/movies',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: movie, rating: rating})
    }).then(function (response) {
        return response.json();
    })
}

function listAndTable(){
    $('<table id="listMovies" align="center">\n' +
        '<thead>\n' +
        '<tr>\n' +
        '<th>ID</th>\n' +
        '<th>Name</th>\n' +
        '<th>Rating</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody id="instertMovies"></tbody>\n' +
        '</table>').appendTo('.movies');
    tableLoad(); // Loads table
}

function tableLoad(){
    getMovies().then((movies) => {
        $('#movies').append('<h2>Here are all the Movies</h2>');
        movies.forEach(({title, rating, id}) => {
            let htmlString = "";
            htmlString += "<tr>";
            htmlString += "<td>" + id + "</td>";
            htmlString += "<td>" + title + "</td>";
            htmlString += "<td>" + rating + "</td>";
            htmlString += "</tr>";
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            $('#instertMovies').append(htmlString);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
    $('#main').removeClass('hidden');
}

let rating = [];
function submitMovies() {

    let content = $("#movieInput").val();
    let ratingNew = rating.toString();
    console.log(ratingNew);

    if (content) {
        postMovies(content,ratingNew);
    } else {
        alert('Please enter a movie to POST.');
    }
}

$("#submit").click(function() {
   submitMovies();
   $('#listMovies').empty();
   listAndTable();
});

<<<<<<< HEAD

//making ajax request for movie list
var request = $.ajax("./api.js");

request.fail(function(jqXhr, status, error) {
    console.log("There was an error!");
    console.log("Response status: " + status);
    console.log("Error obj: " + error);
});
request.done(function(data) {
    console.log(data);
    data.forEach(function(movie) {
        addMovieList(movie);
    });
});

//adding movie list to page
function addMovieList(movies) {
    var htmlString = "";
    htmlString += "<tr>";
    htmlString += "<td>" + movies.title + "</td>";
    htmlString += "<td>" + movies.rating + "</td>";
    htmlString += "<td>$ " + movies.id + "</td>";
    htmlString += "</tr>";
    $("#insertMovies").append(htmlString);
}


// trying to send data using forms
var postMovies = $( '#post-movie' );

postMovies.on( 'submit', function( e ) {
    e.preventDefault();

    $.ajax({
        url: './api.js',
        method: 'POST',
        data: postMovies.serialize(),
        crossDomain: true,
        beforeSend: function ( xhr ) {
            xhr.setRequestHeader( 'Authorization', 'Basic username:password' );
        },
        success: function( data ) {
            console.log( data );
        }
    });
});


//form field data to JSON obj

function formToJSON(table){


    var keyName;

    var keyNames = [];

    var objectArray = [];

    var numOfCols = table.rows[0].cells.length;

    var numOfRows = table.rows.length;

    objectArray.push("[");



    for(var i = 0; i < numOfCols; i++){//begin for loop

        keyName = table.rows[0].cells[i].innerHTML;

        keyNames.push(keyName);


    for(var i = 1; i < numOfRows; i++){//begin outer for loop
        objectArray.push("{\n");

        for(var j=0; j < numOfCols; j++){//begin inner for loop

            var inputValue = table.rows[i].cells[j].children[0].value;

            objectArray.push("\"" + keyNames[j] + "\":" + "\"" + inputValue + "\"");

            if(j < (numOfCols - 1)){//begin if then

                objectArray.push(",\n");

            }//end if then

        }//end inner for loop

        if(i < (numOfRows - 1)){//begin if then

            objectArray.push("\n},\n");

        }
        else{

            objectArray.push("\n}");

        }//end if then else

    }//end outer for loop

    objectArray.push("]");
    return objectArray.join("");


}//end function


$("#test-form").on("submit",function(e){

    e.preventDefault();

    var table = $("#json-table")[0];

    $("#results").val(formToJSON(table));

})


