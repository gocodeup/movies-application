
module.exports = {

  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },

  // deleteMovie: ({id}) => {
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //   let movieID = {id};
  //
  //   return fetch('/api/movies/', {
  //     method: `DELETE`,
  //     body: new URLSearchParams(movieID),
  //     redirect: 'follow'
  //   })
  // },

  deleteMovie: ({id}) => {
    let url = '/api/movies/';
    return fetch(url + '/' + id, {
      method: 'DELETE'
    })
        .then(response => response.json());
  },

  createMovie: ({title, rating}) => {
    let newMovie = { title, rating };
    return fetch('/api/movies/', {
      method: 'POST',
      body: JSON.stringify((newMovie))
    })
  },

};
