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
            fetch(url, addMovie)
                .then($('#movie-list').append(movieData))
                // .then(console.log(movieData),
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










// module.exports = addMovie;

// const API = {
//     createReview: () => {
//         fetch("https://frest.glitch.me/reviews", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(reviewData),
//         })
//             .then( response => response.json() )
//             .then( data => console.log(data) )
//             .catch( error => console.error(error));
//     }
// };
//
// module.exports = API;