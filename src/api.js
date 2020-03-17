'use strict';

const $ = require('jquery'); // We need jquery --> pulling the jquery here


module.exports = { //export the contents of this code block

  // --------------- GET MOVIES ----------------

  getMovies: (title, rating) => { // When this is called -->
    return fetch('api/movies') // AJAX fetch request to the movie list
      .then(response => response.json()); // Turn response to json object
  },

  // --------------- ADD MOVIE ----------------

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

  // --------------- GET MOVIE TO BE EDITED ----------------

  getMovieToEdit: (id) => { // when getMovieToEdit is called -->

    return fetch(`api/movies/${id}`) // Fetch movie data by specified ID
        .then(response => response.json()) // Convert response to JSON
  ;},


  // --------------- EDIT THE GOT MOVIE ----------------

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

  // --------------- DELETE THE SELECTED MOVIE ----------------

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