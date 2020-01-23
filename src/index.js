/**
 * es6 modules and imports
 */
const $ = require('jquery');
import sayHello from './hello';
// export movies to '.index.html'
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, description, genre, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating} - ${description} - ${genre}`);
  });
}).catch((error) => {
  // alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

function refresh() {
  let movies = $.get('./db.json');
  const {getMovies} = require();
  movies().done(function (data) {
    $.each(data, function (index, item) {
      $('#insertMovies').append('<tr>' + '<td>' + item.title + '</td>' + '<td>' + item.rating + '</td>' + '<td>' + item.description + '</td>' + '<td>' + item.genre + '</td>' + '</tr>');
    })
  })
}
refresh();
$('#refresh').click(function () {
  $('#insertMovies').html("");
  refresh()
})
