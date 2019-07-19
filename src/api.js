// module.exports = {
//   getMovies: () => {
//     return
    fetch('https://api.themoviedb.org/3/movie/550?api_key=',{headers: {'Authorization':'token ' + tmdbKey}})
    .then(response => response.json())
        .then(data => console.log(data));
  //

// };


