module.exports = {
    deleteMovie: (movieId) => {
        const url = "http://localhost:3000/movies/" + movieId;
        const options = {
            method: 'DELETE'
        };
        return fetch(url, options)
            .then(response => response.json());
    }
};