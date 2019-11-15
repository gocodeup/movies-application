module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  deleteMovie: (id) => {
    return fetch(`/api/movies/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
      },
    })
  }
};
