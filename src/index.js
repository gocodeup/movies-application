const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });



    $("#userSubmit").click(function(event){
      event.preventDefault();

      const newMovie = {title: $("#userAddMovie").val(), rating: $(".userRating").child("value").val()};
      const url = "/api/movies";
      const options = {
        method: "POST",
          headers: {
          "Content-Type": "application/json",

          },
          body: JSON.stringify(newMovie),
      };
        fetch(url, options)
            .then (getMovies + newMovie)
            // .catch(/* handle errors */);
      });




