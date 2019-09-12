module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      // .then(data => console.log('GET was successful', data))
      .then(response => response.json());
  }
};
