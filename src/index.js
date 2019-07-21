/**
 * es6 modules and imports

 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

//
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });




//   $('#btn-1').on('click', function () {
//   const movieSearch = $('#searchText').val();
//   if (movieSearch.type != 'string') {
//     alert(movieSearch)
//   } else {
//     console.log(movieSearch)
//   }
// })
// const searchString = ($('#searchText').val());
// const search = searchString.replace(/\s/g, "");

// $('#btn-1').on('click', function () {
//   console.log(search);
//   return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t${search}`)
//       .then(response => response.json())
//       // .then(data => console.log(data))


const omdbKey = "aefabb3f";

// getMovies()
//     .then(data => console.log(data));

// $("#log-form").submit(function(e){
//     e.preventDefault();
//     let input = $("#log-form-input");
//     var pText = `<p class="output-p"><span class="output-arrow">-></span>${input.val()}</p>`;
//     $("#log-form").trigger("reset");
//     $("#log-output").append(pText).scrollTop(9999999999999999);

// $('#btn-1').on("click", function (e) {
//     e.preventDefault();
//     let input = $('#searchText');
//     return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=${input.val()}&type=movie&r=json`)
//         .then(response => response.json())
//         .then(data => console.log(data))
// })










