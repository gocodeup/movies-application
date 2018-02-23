const $ = require("jquery");
const {getMovies} = require('./api.js');
let movieTitles = document.getElementById("movie-title");

$("#addMovie").click((e) => {
    e.preventDefault();
    const movie = {title: $("#newMovie").val(), rating: $("#rating").val(), id: ""};
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(url, options)
        .then((data) => getMovies())
            .then(movies => {
                movies.forEach(({title, rating}) => {
                    //   console.log(`id#${id} - ${title} - rating: ${rating}`);
                    movieTitles.innerHTML +=
                        ` 
          <div>
          ${title} - rating: ${rating}
          </div>
          
          `;
                })
            })
        .catch(error => console.log(error));
        $("#newMovie").val("");
        $("#rating").val("1");
});

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  console.log(movies);
  movies.forEach(({title, rating}) => {
      //   console.log(`id#${id} - ${title} - rating: ${rating}`);
      movieTitles.innerHTML +=
          ` 
          <div>
          ${title} - rating: ${rating}
          </div>

          `;
  })
})
  .catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

