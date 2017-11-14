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

// console.log(getMovies);

getMovies().then(movies => {

    let table =
        // "<h2>Movie Catalog</h2>" +
        "<thead>" +
            "<tr>" +
                "<th class='title-head'>Title</th>" +
                "<th class='id-head'>ID</th>" +
                "<th class='rating-head'>Rating</th>" +
            "</tr>" +
        "</thead>"

    movies.forEach(function (movie) {

        let title = movie.title;
        let id = movie.id;
        let rating = movie.rating;

        table += `
            <tbody>
                <tr>
                    <td class="title-block">${title}</td>
                    <td>${id}</td>
                    <td>${rating}</td>
                </tr>
            </tbody>`;

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
