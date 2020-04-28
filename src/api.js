module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        // .then(function(data){
        //
        // })
      .then(response => response.json());
  }
};
