const $ = require ('jQuery');


// const {getMovies} = require('./api.js');

//
// getMovies().then((movies) => {
//   let movieListing = '';
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//
//       movieListing += '<ul>';
//
//       movieListing += `<li>id#${id} - ${title} - rating: ${rating}</li>`
//
//       movieListing += `</ul>`;
//
//   })
//   $('#movie-list').html(movieListing);
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });

const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
const url = '/posts';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(blogPost),
};
fetch(url, options)
    .then(/* post was created successfully */)
    .catch(/* handle errors */);
