const $ = require ('jQuery');

const movie = {

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



// ADD MOVIE POST


const movieData = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
const url = '/api/movies';
const addMovie = {
    createMovie: () => {}
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    };
    fetch(url, addMovie)
        .then(console.log(movieData))
        .catch(/* handle errors */);

// module.exports = addMovie;