const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}



module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
      //   .then(response => console.log(response.json()))
  }



};


