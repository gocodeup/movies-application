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
    // console.log('Here are all the movies:');
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

            //////////////////adds movies and makes post request/////////////////


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




            //////////////////EDIT BUTTON //////////////////////

            $(document).on('click', `.editBtn`, function(event){

                //this editClick variable targets the id attributed to the edit button
                const editClick = event.target.id;
                console.log(editClick);

                //the editId variable console logs as edit-[the dynamic id]
                // //and needs to be split at the dash to isolate the number
                //upon being split, an array of two elements is created
                //at index zero, is the dash, we want the element at index 1
                //which is the unique ID corresponding to the particular film's
                //title and rating
                let editId = editClick.split('-')[1];
                // console.log(editId);

                let titleToEdit =  $(`#title-${editId}`).html();
                // console.log(titleToEdit);


                /////PREPOPULATE RATING TO EDIT//////

                let ratingToEdit = $(`#rating-${editId}`).html();
                console.log(ratingToEdit);

                $("#editModalTitle").val(titleToEdit);
                $("#editModalRating" + ratingToEdit).prop('checked', true);




                ///SAVE CHANGES BUTTON IN MODAL///////

                $(document).on('click',".saveChanges", function(){
                    let updatedTitle = $("#editModalTitle").val();
                    let updateRating = $('.rating[type=radio][name=rating]:checked').val();
                    let updatedMovie = {};
                    console.log(updateRating);
                    console.log(updatedTitle);
                    console.log(editId);
                    updatedMovie.title = updatedTitle;
                    updatedMovie.rating = updateRating;
                    console.log(updatedMovie);
                    let url = "/api/movies/" + editId;
                    let options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedMovie)
                    };
                    fetch(url, options)
                        .then(response => response.json())
                        .then( data => {
                            console.log(data);
                            updateHTML();
                        })
                });


                ////DELETE MOVIE////

                $(document).on('click', `.deleteBtn`, function(event){

                    //this editClick variable targets the id attributed to the edit button
                    const deleteClick = event.target.id;
                    console.log(deleteClick);

                    let url = `/api/movies/${editId}`;
                    let options = {
                        method: 'DELETE',
                    };
                    fetch(url, options)
                        .then(response => response.json())
                        .then( data => {
                            console.log(data);
                            updateHTML()
                        });
                    console.log(deleteClick);
                });



            });





        })
        .catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
        });

  };

updateHTML();




 // adds movies and makes post request
//    let title;
//    let rating;
//    let movieObject = {};
//
//        $('.add-movie').click(function () {
//            console.log('movie button clicked');
//            title = $('.title-input').val();
//            console.log(title);
//            rating = $('.rating[type=radio][name=rating]:checked').val();
//            console.log(rating);
//
//            movieObject.title = title;
//            movieObject.rating = rating;
//            console.log(movieObject);
//            fetch("/api/movies", {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify(movieObject)
//            }).then(response => response.json())
//              .then( data => {
//                console.log(data);
//                updateHTML()
//              });
//        });
//
//
// save Edit Info
//  $('.saveChanges').click(function () {
//      // console.log('movie button clicked');
//      // title = $('#editModalTitle').val();
//      // console.log(title);
//      // rating = $('.rating[type=radio][name=rating]:checked').val();
//      // console.log(rating);
//      //
//      // movieObject.title = title;
//      // movieObject.rating = rating;
//      // console.log(movieObject);
//      fetch("/api/movies", {
//          method: 'PUT',
//          headers: {
//              'Content-Type': 'application/json'
//          },
//          body: JSON.stringify(titleToEdit, ratingToEdit)
//      }).then(response => response.json())
//          .then( data => {
//              console.log(data);
//              updateHTML()
//          });
//  });















