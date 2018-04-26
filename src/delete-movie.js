export default (id) => {

    const deleteMovie = {id};
    const url = '/api/movies/' + id;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteMovie),
    };
    fetch(url, options)
        .then((response) =>{
            return response.json();
        })
        .catch()
};