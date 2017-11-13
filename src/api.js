
const getMovies = fetch('/api/movies');
getMovies
    .then(response => response.json())
    .catch(error => console.log(error));
module.exports = getMovies;
