module.exports = {

  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  postMovie: (movie, id) => {
    return fetch(`api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie, id)
    })
        .then(response => response.json());
  },

//   editMovie: (id, movies) => {
//     return fetch(`api/movies/${id}`, {
//       method: 'Patch',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(movies)
//     })
//         .then(response => response.json());
//   },
//
//   deleteMovie: (id) => {
//     return fetch(`api/movies/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//         .then(response => response.json());
//   }
};
