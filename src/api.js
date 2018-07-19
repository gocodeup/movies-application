const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json())
};

const addNewMovie = (addMovies) => {
    const allMovies = '/api/movies';
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(addMovies)
    };
    return fetch(allMovies, options)
        .then(response => response.json());
};

module.exports = {getMovies, addNewMovie};