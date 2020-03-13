'use strict';

module.exports = { //export the contents of this code block

  getMovies: () => { //when this is called -->

    return fetch('api/movies') // AJAX request to the movie list

      .then(response => response.json()); //Turning response to json object

  }

};
