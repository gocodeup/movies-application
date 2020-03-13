const $ = require('jquery');

module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  addMovie: () => {
    const userMovie = {title: $('#title').val(), rating: $('#rating').val()};
    const url = '/api/movies';
    console.log('success');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(userMovie),
    };
    fetch(url, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
  },
  editMovie: (id) => {
    const userMovie = {title: $('#title').val(), rating: $('#ratingEdit').val()};
    const url = `/api/movies/${id}`;
    console.log('success');

    const options = {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(userMovie),
    };
    fetch(url, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
  },
};

