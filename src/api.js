const $ = require('jquery');

module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => {
        $('#loading').remove();
        return response.json()
      });
  }
};




