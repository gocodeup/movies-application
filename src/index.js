/**
 * es6 modules and imports
 */
const sayHello = require('./hello.js');

sayHello(`Terry`);

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require ('jquery');

$('#submit-button').click(function (e) {
    e.preventDefault();
    let title = $('#movie-title').val();
    let rating = $('#movie-ratings').val();
    let movie = {
        title: title,
        rating: rating
    }
    console.log(movie);
    fetch('/api/movies', {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({title, rating})
    }).then(() => {
        return getMovies();
    }).then(movies => {
        console.log(movies)
    });
});


getMovies().then(movies => {

    let table =
        // "<h2>Movie Catalog</h2>" +
        "<table>"+
          "<thead>" +
              "<tr>" +
                  "<th width='200' height='10' class='title-head'>Title</th>" +
                  "<th width='100' height='10' class='id-head'>ID</th>" +
                  "<th width='100' height='10' class='rating-head'>Rating</th>" +
              "</tr>" +
          "</thead>"+
        "</table>";

    movies.forEach(function (movie) {

        let title = movie.title;
        let id = movie.id;
        let rating = movie.rating;

        table += `
         <table>
            <tbody>
                <tr>
                    <td width="200" class="title-block">${title}</td>
                    <td width="100">${id}</td>
                    <td width="100">${rating}</td>
                </tr>
            </tbody>
          </table>`;
    });


    $(".bodyHTML").html(table);

  console.log('Here are all the movies:');
  console.log(movies);

  movies.forEach(({title, rating, id}) => {


    console.log(`${id} ${title} ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
