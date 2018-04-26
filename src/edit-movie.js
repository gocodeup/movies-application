export default (title, rating, id) => {

    const editMovie = {title, rating, id};
    const url = '/api/movies/' + id;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMovie),
    };
    return fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .catch()
};