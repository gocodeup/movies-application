// export const getMovies = () => fetch('/api/movies')
//       .then(response => response.json());

// const movie = {title: 'The Matrix 4', rating: '3', id: 9};
const url = '/api/movies';
// const options = {
//     method: 'get',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     // body: JSON.stringify(moviePost2),
//     // body: JSON.stringify(movie),
//     };
export const getMovies = () => fetch(url)
    .then(response => response.json())
