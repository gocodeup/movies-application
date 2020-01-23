


setTimeout(function(){loader.style.display = 'none';}, 1200);

const {getMovies} = require('./api.js');
let $movies = $('#movies');


// show a listing of the movies that are in the database

getMovies().then((movies) => {
  // alert('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    $movies.append(`<li class="list-group-item"> id#${id}  ${title}  rating: ${rating}<button class="btn btn-outline-danger btn-sm float-right delete">X</button></li>`);
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong. Check the console for details.')
  console.log(error);
});



// a way to post movies


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


