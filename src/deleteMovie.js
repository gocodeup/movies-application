export default (id) => {
    const url = ('api/movies/'+ id);
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
    };
    return fetch(url, options)
        .then(response => response.json());
}