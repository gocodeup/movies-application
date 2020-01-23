module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            // .then(data => console.log('GET was successful', data))
            .then(response => response.json());
    },

    addMovie: (title, rating, genre) => {
        let newMovie = {title: title, rating: rating, genre: genre};
        console.log(newMovie);
        return fetch('/api/movies', {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newMovie)
        })
    }
};