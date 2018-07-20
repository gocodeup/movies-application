const allMovies = '/api/movies';

const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json())
};

const addNewMovie = (addMovie) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(addMovie)
    };
    return fetch(allMovies, options)
        .then(response => response.json());
};

const editMovie = (editMovie) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editMovie)
    };
    return fetch(allMovies, options)
        .then(response => response.json());
};

module.exports = {getMovies, addNewMovie, editMovie};