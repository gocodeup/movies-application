module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },

  addMovie: (movie) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(movie)
    };
    return fetch('/api/movies', options)
        .then(response => response.json());
  },

  editMovie: (movie, id) => {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(movie)
    };
    return fetch(`/api/movies/${id}`, options)
        .then(response => response.json());
  },

  deleteMovie: (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    };
    return fetch( `/api/movies/${id}`, options)
        .then(response => response.json());
  }
};





