const getMovies = () => {
    return fetch('/api/movies')
      .then(response => response.json());
};
const addMovies = (newMovies) => {
    const theMovies = '/api/movies';
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newMovies)
    };
    return fetch(theMovies, options)
    .then(response => response.json());
};

const deleteMovies = (id) => {

    const theMovies =`/api/movies/${id}`;
    const options = {
        method: 'DELETE',
    };
    return fetch(theMovies, options)
        .then(response => response.json());

}
module.exports = {getMovies, addMovies, deleteMovies};

