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
    $('.movies').html('');

    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      let movieItems = '';

      movieItems += `<div class="card">
                        <div class="card-body">
                            <h4 class="card-title"> ${title}</h4>
                            <div class="card-text">
                            Rating: ${rating}
                            </div>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary editBtn" data-toggle="modal" data-target="#exampleModal">
                              Edit Movie
                            </button>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                  <p>Edit Movie Title</p>
<!--                                  input-->
                                    <input id="editTitle" class="form-control form-control-sm" type="text" placeholder="Movie Title">
                                    <p>Edit Movie Raiting</p>
                                    <!--Select-->
                                    <div class="input-group mb-3">
                                    <select class="custom-select editRating" >
                                      <option value="0" selected>Choose...</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                  </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" id="saveEditBtn" class="btn btn-primary" data-dismiss="modal">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
<!--                            <button class="editButton">Edit Movies</button>   -->
<!--                            <div class="editBox">-->
<!--                              <input class="editMovie" type="text">-->
<!--                              <select name="editRating" class="editRating">-->
<!--                                <option value="1">1</option>-->
<!--                                <option value="2">2</option>-->
<!--                                <option value="3">3</option>-->
<!--                                <option value="4">4</option>-->
<!--                                <option value="5">5</option>-->
<!--                              </select>-->
<!--                              <button class="submitMovieEdit">Submit Changes</button>-->
<!--                            </div>-->
                        </div>  
                    </div>`;

      $('.movies').append(movieItems);
      console.log(title, rating, id);
    });
    // $(".editBox").hide(); // Hide edit input and select on load
    //
    // $('.editButton').on('click', function () {
    //   // console.log('Fired!')
    //   $(this).next().slideToggle();
    // });
    $('.editBtn').on('click', function () {
      let targetedMovieTitle = $(this).parents('.card-body').children('.card-title').text();
      function getIdNumber() {
        return fetch('api/movies').then(data => {
          return data.json()
          // console.log(data);
          //
        }).then(data => {
          // data

          for(let i = 0; i < data.length; i++){

              if(data[i].title === targetedMovieTitle.slice(1)){
                // console.log(data[i].id);
                return data[i].id
              }
              // console.log(data[i].title);
              // console.log(targetedMovieTitle.slice(1));
            }
        });

      }
      getIdNumber().then( data => {
        let idNumber = data;

        $('#saveEditBtn').on('click', function () {
          console.log('test');
          let movieTitle = $('#editTitle').val();
          let movieRating = $('.editRating').val();
          console.log(movieRating);
          modify(movieTitle, movieRating, idNumber);

            timeRefresh()




        })
      });
      // console.log(getIdNumber());
    })


  }) // End of GetMovies()
    .catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });

} // End of refreshMovies

$('#saveEditBtn').on('click', function () {
  console.log(refreshMovies());
});

function timeRefresh() {
  setTimeout(function () {
    refreshMovies()

  }, 2000)

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

function modify(movieTitle, movieRating, idNum){
  const blogPost = {title: movieTitle, rating: movieRating};
  const url = `/api/movies/${idNum}`;
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

refreshMovies();
}


// $('.btn').on('click',() =>  console.log('FIRE!!!'));


