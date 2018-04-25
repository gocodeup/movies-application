export default (id, movie) => {
    const url = ('api/movies/'+ id);
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    return fetch(url, options)
        .then(response => response.json());
}
