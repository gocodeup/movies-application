
const getMovies = () => {
    return fetch('/db.json')
      .then(response => response.json());
  };

export default {getMovies};