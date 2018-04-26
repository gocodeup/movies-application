export default (title, rating) => {

    const addMovie = {title, rating};
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addMovie),
    };
    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .catch()
};