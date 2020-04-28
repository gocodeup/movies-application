

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
          let html = '';
            data.forEach((movies) => {
              console.log(movies);
              html += document.getElementById('movie-list').innerHTML = movies.title;
            });
        })
        .catch( error => console.error(error));
  }
};

module.exports = movie;