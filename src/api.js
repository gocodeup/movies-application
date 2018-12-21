module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
    createMovie: (content) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        };
        console.log(content);
        event.preventDefault();
        return fetch('/api/movies', options)
            .then(response => response.json())
    },
    editMovie: (movie, id) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        return fetch(`/api/movies/${id}`, options)
            .then(response => response.json())
  }

};
