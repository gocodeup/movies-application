// // /**
// //  * es6 modules and imports
// //  */
// // import sayHello from './hello';
// // sayHello('World');
// //
// // /**
// //  * require style imports
// //  */
//
// // import movies from './api.js';
//
//
const $ = require('jquery');

// const {getMovies, addMovies} = require('./api.js');
// const {addMovies} = require('./api.js');

import data from './api';



//displays movies
data.getMovies()
// .then(response =>response.json())
.then(data => console.log(data));

// const title = document.querySelector('#inputTitle');
// const rating = document.querySelector('#inputRating');

$('#addMovieBtn').on('click',function(){
  let title = $('#inputTitle').val();
  console.log(title);
  let rating = $('input:radio[name=rating]:checked').val();
  console.log($('input:radio[name=rating]:checked').val());
  // data.addMovies(title, rating);
  data.addMovies();
});
  // addMovies();





















