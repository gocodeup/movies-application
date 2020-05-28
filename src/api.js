const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }

}

const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}


module.exports = {
  getMovies: () => {
    return fetch('/api/movies', getOptions)
      .then(response => response.json());
      //   .then(response => console.log(response.json()))
  },
  addMovie: (newMovie) => {
    options.body = JSON.stringify(newMovie);
    return fetch('/api/movies', options)
        // let newMovie = {};
        .then(response => response.json())

  }

};
//
// module.exports = {
//   addMovie: () => {
//   return fetch('/api/movies', options)
//       // let newMovie = {};
//       .then(response => response.json())
//
//
//
//   // movies.push(newMovie);
//   // return movies;
// }
// };
// // console.log(addMovie("Fake 1", "4));

