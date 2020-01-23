module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json())
  },
  getMovie: (id) => {
    console.log(id);
    return fetch(`/api/movies/${id}`, {
      method: 'GET'
    })
        .then(data => data.json())
  },
};