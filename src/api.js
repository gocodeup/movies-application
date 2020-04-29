const $ = require ('jQuery');

const movie = {

  movieListing: () => {
    // let html = "";
    // $('#movie-list').empty();
    fetch('/api/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then( response => response.json() )
        .then( data => {

            data.forEach((movies) => {
              console.log(movies);
            $('#movie-list').html(movies.title);
            });
        })
        .catch( error => console.error(error));
  }
};

module.exports = movie;