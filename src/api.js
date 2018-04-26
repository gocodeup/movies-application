import $ from "jquery";

module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
    deletion: (id) => {
        const url = `/api/movies/${id}`;
        const options = {
            method: "DELETE",
        };

        return fetch(url, options)
            .then(response => response.json());
    },
    changes: (editMovie) => {
        const url = '/api/movies/' + $('#editForm').val();
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editMovie),
        };
        return fetch(url, options)
            .then(response => response.json());
    }

};

