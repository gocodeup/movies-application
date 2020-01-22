export const getMovies = () => fetch('/api/movies')
      .then(response => response.json());


