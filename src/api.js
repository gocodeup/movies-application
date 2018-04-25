module.exports = {
  getMovies: () => {
    return fetch('..db.json')
      .then(response => response.json());

  }
};
