const $ = require('jquery')
/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

function refreshMovies(){
  getMovies().then((movies) => {
    $('#loading').html('');

    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      let movieItems = '';

      movieItems += `<div class="card">
                        <div class="card-body">
                            <h4 class="card-title"> ${title}</h4>
                            <div class="card-text">
                            Rating: ${rating}
                                
                            </div>
                        </div>  
                    </div>`;

      $('.movies').append(movieItems);
      console.log(title, rating, id);
    });

  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });

}

refreshMovies(); //Initial call

function newMovie(movieTitle, movieRating) {

  const blogPost = {title: movieTitle, rating: movieRating};
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
  };
  fetch(url, options)
      .then( (data) => console.log('Post was successful', data)/* post was created successfully */)
      .catch( (data) => console.log('Post unsuccessful', data) /* handle errors */);


  refreshMovies(); // Updates movies when submit is clicked
  $('#movieTitle').val(''); // Clears out the input
  $('#rating').val(''); // Clears out the drop down
} // End of newMovie()


// newMovie($('#movieTitle').val(), $('#rating').val() )



  $('#btn').on('click',() => newMovie($('#movieTitle').val(), $('#rating').val()) );

function modify(){
  const blogPost = {title: 'Star Wars: A New Hope Directors Cut', rating: '4'};
  const url = '/api/movies/1';
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
  };
  fetch(url, options)
      .then( (data) => console.log('Post was successful', data)/* post was created successfully */)
      .catch( (data) => console.log('Post unsuccessful', data) /* handle errors */);

}
modify();