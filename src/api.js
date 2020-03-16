'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here


module.exports = { //export the contents of this code block

  getMovies: (title, rating) => { // When this is called -->
    return fetch('api/movies') // AJAX fetch request to the movie list
      .then(response => response.json()); // Turn response to json object
  },

  addMovie: (title, rating) => { // When addMovie is called -->

    return fetch('api/movies', { //AJAX POST request to movies
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(title, rating),  // Create string with title and rating
    })
        .then(response => response.json()); //
  },

  getMovieToEdit: (id) => { // when getMovieToEdit is called -->

    return fetch(`api/movies/${id}`) // Fetch movie data by specified ID
        .then(response => response.json()) // Convert response to JSON
  ;},

  editMovie: (id, body) => { // when editMovie is called -->

    // console.log(id);

    return fetch(`api/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
        .then(response => console.log(response))
  },

  deleteMovie: (id) => {

    return fetch(`api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }

    })
        .then(response => response.json());

  }

};