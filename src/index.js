/**
 * es6 modules and imports
 */
const $ = require('jquery');

// $(document).ready(function(){
//   var remove = $('#loading_wrap').remove();
//   setTimeout(remove, 5000);
// });
const {
  getMovies,
  patchMovie,
  postMovie,
  getMovie,
  deleteMovie
} = require('./api.js');

// helper functions

const htmlRenderTableFrom = (html_element, array_of_movies) => {

  let html_table = `<div class="row">` +
    `<div class="column xl-col-33">ID</div>` +
    `<div class="column xl-col-33">TITLE</div>` +
    `<div class="column xl-col-33">RATING</div>` +
    `</div>`;
  array_of_movies.forEach( movie => {
    html_table += `<div class="row">` +
      `<div class="column xl-col-33">${movie.id}</div>` +
      `<div class="column xl-col-33">${movie.title}</div>` +
      `<div class="column xl-col-33">${movie.rating}</div>` +
    `</div>`
  });

  $(html_element).append(html_table);
}


getMovies()
  .then(movies => {

    const table = $("#table-of-movies");
    htmlRenderTableFrom(table, movies);

  }).catch((error) => {
    console.log(error);
  });
