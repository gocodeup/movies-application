//



// import description from './index'
require('./movieSearch.js')
const omdbKey = "aefabb3f";

//
// module.exports = {
//   getMovies: () => {
//     return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=batman`)
//         .then(response => response.json());
//   }
// };

const $ = require('jquery');


module.exports = {
  getMovies: () => {
      return fetch('/api/movies')
          .then(response => response.json());

  },
      displayFavorites:() => {
          return fetch('api/movies')
              .then(response => response.json())
          // .then(data => console.log(data[0].title))
          // console.log(data[0])
          // .forEach(function (data) {
          //   console.log(datum);
          // });

      },

    addMovies: () => {
        let title = $('#inputTitle').val();
        let rating = $('input:radio[name=rating]:checked').val();


    const addedMovie = {title: title, rating: rating};
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(addedMovie),
    };
    fetch('/api/movies', options)
        .then(() => console.log('added the movie'))
        .catch(error => console.log('error'))
    },

    deleteMovies: (id) => {
              const options = {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              };
              fetch(`api/movies/${id}`, options)
                  .then(resolved => console.log('deleted movie'))
                  .catch(error => console.log('delete movie error'))
          }


};


