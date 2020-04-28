module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  }
};


const movieLists = {
    "title": "Harry Potter",
    "rating": "5",
    "id": 3
}
//  http://localhost:1313/
const API = {
  createLists: () => {
    fetch("/api/movies", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieLists),
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch( error => console.error(error));
  }
};

module.exports = API;
