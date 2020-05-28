const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}



module.exports = {
  getMovies: () => {
    return fetch('../db.json', options)
      .then(response => response.json());
      //   .then(response => console.log(response.json()))
  }

};


