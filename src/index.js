/**
 * es6 modules and imports
 */

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


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




    $.fn.formToJSON = function() {
        var objectGraph = {};
        function add(objectGraph, name, value) {
            if(name.length == 1) {
                //if the array is now one element long, we're done
                objectGraph[name[0]] = value;
            }
            else {
                //else we've still got more than a single element of depth
                if(objectGraph[name[0]] == null) {
                    //create the node if it doesn't yet exist
                    objectGraph[name[0]] = {};
                }
                //recurse, chopping off the first array element
                add(objectGraph[name[0]], name.slice(1), value);
            }
        };
        //loop through all of the input/textarea elements of the form
        //this.find('input, textarea').each(function() {
        $(this).children('input, textarea').each(function() {
            //ignore the submit button
            if($(this).attr('name') != 'submit') {
                //split the dot notated names into arrays and pass along with the value
                add(objectGraph, $(this).attr('name').split('.'), $(this).val());
            }
        });
        return JSON.stringify(objectGraph);
    };
    $.ajaxSetup({
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
    $(document).ready(function(){
        $('#input').click(function() {
            var send = $("#form").formToJSON();
            $.ajax({
                url: "./api.js",
                type: "POST",
                data: send,
                error: function(xhr, error) {
                    alert('Error!  Status = ' + xhr.status + ' Message = ' + error);
                },
                success: function(data) {
                    //have you service return the created object
                    var items = [];
                    items.push('<table cellpadding="4" cellspacing="4">');
                    items.push('<tr><td>ID</td><td>' + data.id + '</td></tr>');
                    items.push('<tr><td>Meh Feh</td><td>' + data.meh.feh + '</td></tr>');
                    items.push('<tr><td>Meh Peh</td><td>' + data.meh.peh + '</td></tr>');
                    //etc
                    items.push('</table>');
                    $('#result').html(items.join(''));
                }
            });
            return false;
        });
    });
