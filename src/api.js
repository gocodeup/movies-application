module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  }
};

//  http://localhost:1313/
const API = {
  createLists: () => {
    fetch("/api/movies", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch( error => console.error(error));
  }
};

module.exports = API;
