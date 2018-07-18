/**
 * es6 modules and imports
 */


/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);


   const div = document.createElement("div");
   const text = document.createTextNode(`id#${id} - ${title} - rating: ${rating}`);
   div.appendChild(text);
   document.body.appendChild(div);





  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
