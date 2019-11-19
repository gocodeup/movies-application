module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },
    postMovie: (movie) => {
        return fetch('api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        })
    },
    putMovie: (movie, id) => {
        return fetch(`api/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        })
    },
    deleteMovie: (id) => {
        return fetch(`api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
};