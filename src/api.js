'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here


module.exports = { //export the contents of this code block

  getMovies: (title, rating) => { //when this is called -->

    return fetch('api/movies') // AJAX request to the movie list

      .then(response => response.json()); //Turning response to json object

  },

  addMovie: (title, rating) => { // when addMovie is called -->

    return fetch('api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(title, rating),
    })
        .then(response => response.json());
  },

  editMovie: (id, book) => { // when addMovie is called -->

    return fetch(`api/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(title, rating),
    })
        .then(response => response.json());
  }

};