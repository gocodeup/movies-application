module.exports = {
    created: (movie) => {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(movie),
        };
        return fetch(url, options)
            .then(response => response.json());
    }
};