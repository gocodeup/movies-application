/**
 * es6 modules and imports
 */
const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

const {getMovies} = require('./api.js');



function showMovies(){
    getMovies().then((movies) => {
        $('.movies').html('');
        movies.forEach(({title, rating, id}) => {
            let movieItems = '';
                movieItems += `


                <div class="mt-5 pt-5">
                        <div class="mt-5 pt-5">
                            <h4> ${title}</h4>
                            <div>
                                <div>
                                Rating: ${rating}
                                </div>
                                <!-- Button trigger modal -->
                                <button type="button">
                                  Edit
                                </button>
                            </div>
                            <!-- Modal -->
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <h5>Edit Movie</h5>
                                             <button type="button">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div>
                                            <p>Edit Movie Title</p>
                                        <!--input-->
                                            <input id="editTitle" type="text" value="" placeholder="Movie Title">
                                            <p>Edit Movie Raiting</p>
                                        <!--Select-->
                                            <div>
                                                <select>
                                                    <option value="0" selected>Choose...</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            </div>
                                        <div>
                                            <button type="button" class="btn btn-primary mr-auto btn-size" id="deleteMovieBtn">Delete Movie</button>
                                            <button type="button" class="btn btn-primary btn-size" data-dismiss="modal">Close</button>
                                            <button type="button" id="saveEditBtn" class="btn btn-primary btn-size" data-dismiss="modal">Save changes</button>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                `;


            $('.movies').append(movieItems);
        });
}).catch((error) => {
    alert('There was an error loading the page..');
});
}


// function refreshMovies() {
//     getMovies().then((movies) => {
//         // $('#loading').html('').css('display', 'none');
//         $('.movies').html('');
//         // Show add movie inputs on load
//         // $('.addMovieInputs').css('display', 'block').css('text-align', 'center');
//         movies.forEach(({title, rating, id}) => {
//             let movieItems = '';
//             movieItems += ` Rating: ${rating} Title: ${title} Id:${id}`;
//             $('.movies').append(movieItems);
//         });
//     }) // End of GetMovies()
//         .catch((error) => {
//         });
// } // End of refreshMovies

showMovies();

// loader------------------------------
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function () {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}
