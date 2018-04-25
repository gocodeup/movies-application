module.exports = {
    deleteMovie: (movieId) => {
        const url = `http://localhost:3000/movies/movieId`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(movieId),
        };
        return fetch(url, options)
            .then(response => response.json());
    }
};