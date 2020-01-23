module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  }
};

fetch('http://www.omdbapi.com/?i=tt3896198&apikey=78b01a3')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
    });



