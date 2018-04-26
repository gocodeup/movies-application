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
    },
        editMovie: (movieEdit) => {
            const url2 = "http://localhost:3000/movies/" + movieEdit.id;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': "application/json",
                },
                body: JSON.stringify(movieEdit),
            };
            return fetch(url2, options)
                .then(response => response.json());
        }
};


