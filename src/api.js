const $ = require ('jQuery');

const movie = {

    // ADD MOVIE POST

    addMovie: (e) => {
        e.preventDefault();
        let movieTitle = $('#add-movie').val();
        let movieRating = $('#movie-rating').val();
        const movieData = {title: movieTitle, rating: movieRating};
        const url = '/api/movies';
        const addMovie = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            };

        return fetch(url, addMovie)
            .then(() => {
            })
            .catch(/* handle errors */);
    },



    // EDIT MOVIE
    editMovie: (j) => {
        j.preventDefault();
        let editTitle = $('#title-edit').val();
        let editRating = $('#edit-movie-rating').val();
        const editData = {title: editTitle, rating: editRating};
        const url = '/api/movies';
        const addMovieEdit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editData),
        };

        return fetch(url, addMovieEdit)
            .then(() => {
            })
            .catch(/* handle errors */);
    },




    //Get movie



  movieListing: () => {
    fetch('/api/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then( response => response.json() )
        .then( data => {
            let movieTitle = '';
            let html = '';
            data.forEach((movies) => {
            html += (`Title: ${movies.title} Rating: ${movies.rating} Id: ${movies.id}<button data-id=${movies.id} class="movie_edit" >edit</button><br>`);
            movieTitle = `${movies.title}`
            });
            $('#movie-list').html(html);
            $('.movie_edit').click(function() {
                let movie_id = $(this).attr("data-id");
                console.log(movie_id);
                $('#movie-id').val(movie_id);
            });
        })
        .catch( error => console.error(error));
  }
};

module.exports = movie;



// load movies into choose movie dropdown


//get from value from edit inputs on form
//target and store .val() of inputs in variable
// javascript code should make an ajax request when the form is submitted
