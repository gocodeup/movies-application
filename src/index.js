/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating} - ${genre}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

function refresh() {
  let inventory = $.get("data/inventory.json");
  inventory.done(function (data) {
    $.each(data, function (index, item) {
      $('#insertProducts').append('<tr>' + '<td>' + item.title + '</td>' + '<td>' + item.quantity + '</td>' + '<td>' + item.price + '</td>' + '<td>' + item.categories + '</td>' + '</tr>');
    })
  })
}
refresh();
$('#refresh').click(function () {
  $('#insertProducts').html("");
  refresh()
})