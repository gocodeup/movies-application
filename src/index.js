/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');
const {greeting} = require(`./hello.js`);
greeting('Ceres');
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
//OG
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


// this function displays the movie selection and hides the spinner upon load
// Always hide the spinner

  // $('#spinner').css('display', 'none');
  // console.log('Here are all the movies:');


  const updateHTML = () => {
    $('#spinner').css('display', 'none');
    console.log('Here are all the movies:');
    getMovies()
        .then((movies) => {

          var page = "";

          movies.forEach(({title, rating, id}) => {
            // return $('.movie').append(`id#${id} - ${title} - rating: ${rating}`);
            page += '<tr>';
            page += `<td>${title}</td>  <td>${rating}</td>  <td>${id}</td> <td id="edit-${id}" class ="editBtn btn btn-info">Edit</td> <td id="delete-${id}" class ="delete btn btn-info">Delete</td>`;
            page += '</tr>';

          });

          $('#contents').html(page);

          $('#edit-${id}').on('click', function(){
            console.log("edit btn clicked");
            console.log($(this));
          });



        })
        .catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
        });

  };

updateHTML();

//function to edit movies
// $('.editBtn').on('click', function(){
//   console.log("edit btn clicked");
//   console.log($('this'));
// });

// $(document).on('click', '.editBtn', function () {
//   console.log("button clicked");
// })

// this function added movies
  let title;
  let rating;
  let movieObject = {};

      $('#add-movie').click(function () {
          title = $('#title-input').val();
          console.log(title);
          rating = $('#rating-input').val();
          console.log(rating);

          movieObject.title = title;
          movieObject.rating = rating;
          console.log(movieObject);
          fetch("/api/movies", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(movieObject)
          }).then(response => response.json())
            .then( data => {
              console.log(data);
              updateHTML()
            });
      });








