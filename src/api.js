const getMovies = ${searchVal} => {
  return fetch('/api/movies').then(response => response.json());
}};

export default {getMovies};
