const $ = require ('jQuery');

const movie = {

    // ADD MOVIE POST

    //get from value from inputs on form
    //target and store .val() of inputs in variable

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
            console.log(this);
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
            let html = "";
            data.forEach((movies) => {
              console.log(movies);
            html += (`Title: ${movies.title} Rating: ${movies.rating} Id: ${movies.id}<br>`);
            });
            $('#movie-list').html(html);
        })
        .catch( error => console.error(error));
  }
};

module.exports = movie;



// load movies into choose movie dropdown


//get from value from edit inputs on form
//target and store .val() of inputs in variable
// javascript code should make an ajax request when the form is submitted
