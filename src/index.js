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

          movies.forEach(({title, rating, id}, i) => {
            // return $('.movie').append(`id#${id} - ${title} - rating: ${rating}`);
            page += '<tr>';
            page += `<td id="title-${id}">${title}</td>  <td id="rating-${id}">${rating}</td>  <td>${id}</td> <td><button id="edit-${id}" class ="editBtn btn btn-info" data-toggle="modal" data-target="#exampleModal">Edit</button></td> <td><button id="delete-${id}" class ="deleteBtn btn btn-danger">Delete</button></td>`;
            page += '</tr>';

          });

          $('#contents').html(page);

          // $(`#edit-${id}`).on('click', function(){
          //   console.log("edit btn clicked");
          //   console.log($(this));
          // });

            $(document).on('click', `.editBtn`, function(event){
                const editClick = event.target.id;


                console.log(editClick);
            });

            $(document).on('click', `.deleteBtn`, function(event){
                const deleteClick = event.target.id;


                console.log(deleteClick);
            });



        })
        .catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
        });

  };

updateHTML();

// adds movies and makes post request
  let title;
  let rating;
  let movieObject = {};

      $('.add-movie').click(function () {
          console.log('movie button clicked');
          title = $('.title-input').val();
          console.log(title);
          rating = $('.rating[type=radio][name=rating]:checked').val();
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








