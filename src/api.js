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

  },

  getStars: (rating) => {
    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];

    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // If there is a half a star, append it
    if (i === .5) output.push('<i class="fa fa-star-half-alt" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
      output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    return output.join('');
  }

};