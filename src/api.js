// export const getMovies = () => fetch('/api/movies')
//       .then(response => response.json());

const moviePost = {title: 'The Sandlot', rating: '4', id: 4};
const url = '/api/movies';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(moviePost),
};
export const getMovies = () => fetch(url, options)
    .then(response => response.json());
