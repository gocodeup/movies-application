module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => {
        document.getElementById("loading").remove();
        return response.json()
      });
  }

};






