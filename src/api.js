module.exports = {

//  Fetch API to retrieve Movie Data from JSON

    getMovies: () => {
      return fetch('/api/movies')
          .then(response => response.json());
    },

//  Fetch API to Add Movie Data to JSON

    addMovie: (movie) => {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(movie)
      };
      console.log(movie);
      return fetch('/api/movies', options)
          .then(response => response.json())
    },

//  Fetch API to Delete Movie Data from JSON

    deleteMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        })
    },

//  Fetch API to Edit Movie Data in JSON

    editMovie: (movie, id) => {
        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(movie)
        };
        console.log(movie);
        return fetch(`/api/movies/${id}`, options)
    }
};
