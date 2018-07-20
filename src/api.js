const $ = require('jquery');

module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => {
        $('#loading').remove();
        $('#main-container').css('opacity','1');
        return response.json()
      });
  }
};







