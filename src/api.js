module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },
    addMovie: (title, rating, genre) => {
        let newMovie = {title: title, rating: rating, genre: genre};
        console.log(newMovie);
        return fetch('/api/movies', {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newMovie)
        })
    },
    editMovie: (id, movie) => {
        return fetch(`/api/movies/${id}`, {
            data: {
                title: ${editTitle},
                rating: ${editRating},
                genre: ${editGenre}
            }
            method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(movie)
        })
    },
    deleteMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        })
    }
};
