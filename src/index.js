const $ = require('jquery');

// this runs the loading.gif image
const loadingGif = () => {
    $('.container-loader').html("<img src='./img/page-loader.gif' class='loader'>");
};
loadingGif();

// hide form until called in getMovies function
$('.add-movie-form').hide();

// this function shows the forms upon page load when called
function formLoader() {
    $('.add-movie-form').show();
    $('.container-loader').hide()
}

const {getMovies} = require('./api.js');

const moviesBuilder = document.getElementById('movie-stuff');

//################################################# UPDATE MOVIES FUNCTION #############################################
function updateMovieList() {
    getMovies().then((movies) => {
        formLoader();
        moviesBuilder.innerHTML = ('');
        movies.forEach(({title, rating, id}) => {
            moviesBuilder.innerHTML +=
                `
        <div class="movie-display">
        ${id}. The title of the movie is: ${title} and the rating is: ${rating}. <button type="submit" id="del-btn-${id}" class="deleteBtn">Delete Movie</button>
        </div>
            `
            ;
        });

        $('.deleteBtn').click((e) => {
            e.preventDefault();
            let id = event.currentTarget.id.split('-');
            deleteMovie(id[2]);
            $('#movie-stuff' + id[2]).hide();
            updateMovieList()
        });
// this runs if there is an error
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}


//################################################# ADD NEW MOVIE FROM DB ##############################################
$('#add-movie-button').click(function (e) {
    e.preventDefault();
    let title = $('#new-title').val();
    let rating = $('#new-rating').val();

    let url = '/api/movies';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, rating}),
    };
    fetch(url, options)
        .then( () => updateMovieList())
        .catch(/* handle errors */);
});

//################################################# EDIT EXISTING MOVIE IN DB ##########################################
$('#edit-movie-button').click(function (e) {
    e.preventDefault();
    let title = $('#edit-title').val();
    let rating = $('#edit-rating').val();
    let id= $('#edit-movie-id').val();

    let url = '/api/movies/' + $('#edit-movie-id').val();
    let options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, rating, id}),
    };
    fetch(url, options)
        .then(() => updateMovieList())
        .catch(/* handle errors */);
});

//################################################# DELETE MOVIE FROM DB ##############################################
function deleteMovie(id) {
    const options = {
        method: 'DELETE',
    };
    fetch(`/api/movies/${id}`, options)
        .then(response => response.json())
        .catch(error => console.log(error))

}

updateMovieList();