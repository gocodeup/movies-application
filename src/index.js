const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


//=======================================================
//adds movies from json movie list to html
  function updateMovieList() {
    getMovies().then((movies) => {
      $('.container').html('');
      console.log(movies);
      movies.forEach(({title, rating, id}) => {
        // console.log(`id#${id} - ${title} - rating: ${rating}`);
        $('.container').append(`<div>id#${id} - ${title} - rating: ${rating}</div>`);
      });
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
  }
  updateMovieList();

//=======================================================
//Click event that updates json movie list with user input
  $('#mbutton').click((e) => {
    e.preventDefault();

    // store inputs for new movie
    const newTitle = $('#mtitle').val();
    const newRating = $('#mrating').val();

  console.log(`${newTitle}`);
  console.log(`${newRating}`);

    const moviePostTest = {title: `${newTitle}`, rating: `${newRating}`};
    const url = '/api/movies';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moviePostTest),
    };
    fetch(url, options)
        .then(response => {
          return response;
        })
        .catch(response => console.log('Failed'));


    updateMovieList()

  });

//=======================================================
  function modifyMovieList() {

    getMovies()

        .then((movies) => {
            movies.forEach(({title, rating, id}) => {
              $('#movieDropDown').append(`<option value="${id}">${title}</option>`);
            });
        })


        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);

        });


  }
modifyMovieList();


  $('#dropDownButton').click((e) => {
    e.preventDefault();

    getMovies()

        .then((movies) => {
          console.log(movies[0].title);
          $('#editMovieForm').append(
              `<input type="text" id="mtitleEdit" name="mtitleEdit" value="${movies.title}">`
          )

        })

  });