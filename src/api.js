module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },


  displayMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },

  addNewMovie: (movieTitle, rating) => {
    const newMovie = {title: movieTitle, rating: rating};
    const url = '/api/movies';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(alert("You've added a movie!"))
        .catch(/* handle errors */);
  },

  deleteMovie: (jsonMovieID) => {
    const url = '/api/movies/' + jsonMovieID;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(movie),
    };
    fetch(url, options)
        .then(alert("You have deleted me!"))
  },

    editMovie: (jsonMovieID, movieTitle, rating) => {
      const updateMovie = {title: movieTitle, rating: rating};
      const url = '/api/movies/' + jsonMovieID;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateMovie),
      };
      fetch(url, options)
          .then(alert("You have edited me!"))

    }

  // deleteMovie: () => {
  //   const movie = {title: "", rating: ""};
  //   const url = '/api/movies';
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(movie),
  //   };
  //   fetch(url, options)
  //       .then(/* post was created successfully */)
  //       .catch(/* handle errors */);
  // }
};
