const $ = require("jquery");
const {getMovies} = require('./api.js');
let renderMovies = document.getElementById("movie-title");

function fetchNBuild(movieObj)
{
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj)
    };
    fetch(url, options)
        .then((data) => getMovies())
        .then(movies => {
            let movieHTML = "";
            movies.forEach(({title, rating}) => {
                movieHTML +=
                    ` 
          <div>
          ${title} - rating: ${rating}
          </div>
          
          `;
                renderMovies.innerHTML = movieHTML;
            })
        })
        .catch(error => console.log(error));

}

$("#addMovie").click((e) => {
    e.preventDefault();
    const movie = {title: $("#newMovie").val(), rating: $("#rating").val(), id: ""};
    console.log(movie);
        fetchNBuild(movie);
        $("#newMovie").val("");
        $("#rating").val("1");
});

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  console.log(movies);
  movies.forEach(({title, rating}) => {
      //   console.log(`id#${id} - ${title} - rating: ${rating}`);
      renderMovies.innerHTML +=
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

