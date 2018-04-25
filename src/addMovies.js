export default (movie) => {
    const url = 'api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    return fetch(url, options)
        .then(response => response.json());
}