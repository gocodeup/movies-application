// module.exports = {
//   getMovies: () => {
//     return fetch('/api/movies')
//       .then(response => response.json());
//   }
// };


export const getMovies = () => {
  document.querySelector('.container').append('loading...');
  return fetch('/api/movies')
    .then(response => response.json());
};