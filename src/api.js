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