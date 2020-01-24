// functions made but not used. saved just in case. will delete once final status is achieved

// const {OMDB_API_KEY} = require('./keys.js');
// const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
// getMovies: () => {
//     return fetch('/api/movies')
//         .then(response => response.json());
// },
//     getOMDB: (inputMovieTitle) => {
//     let searchParams = '';
//     inputMovieTitle = inputMovieTitle.toLowerCase();
//     if (inputMovieTitle.split(" ").length > 1) {
//         let titleArr = inputMovieTitle.split(" ");
//         let finalStr = '';
//         let outputArr = [];
//         titleArr.forEach(element => {
//             outputArr.push(element + '+');
//         });
//         let outputStr = outputArr.join('');
//         finalStr = outputStr.substring(0, outputStr.length - 1);
//         console.log(finalStr);
//         searchParams = finalStr;
//     } else if (inputMovieTitle.split(" ").length === 1) {
//         searchParams = inputMovieTitle;
//     }
//     http://www.omdbapi.com/?apikey=[yourkey]&
//         return fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchParams}`)
//             .then((response) => response.json());
// },
//     searchTheMovieDBID: (inputMovieTitle) => {
//     // https://api.themoviedb.org/3/search/movie?api_key={key}&language=en-US&query=Star%20Wars&page=1&include_adult=false
//     let searchParams = '';
//     inputMovieTitle = inputMovieTitle.toLowerCase();
//     if (inputMovieTitle.split(" ").length > 1) {
//         let titleArr = inputMovieTitle.split(" ");
//         let finalStr = '';
//         let outputArr = [];
//         titleArr.forEach(element => {
//             outputArr.push(element + '%20');
//         });
//         let outputStr = outputArr.join('');
//         finalStr = outputStr.substring(0, outputStr.length - 3);
//         console.log(finalStr);
//         searchParams = finalStr;
//     } else if (inputMovieTitle.split(" ").length === 1) {
//         searchParams = inputMovieTitle;
//     }
//     // https://api.themoviedb.org/3/search/movie?api_key={key}&language=en-US&query=Star%20Wars&page=1&include_adult=false
//     return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${THE_MOVIE_DB_API_KEY}&language=en-US&query=${searchParams}&page=1&include_adult=false`)
//         .then((response) => response.json());
// },
//     searchMovie: (inputObj) => {
//     let movieID = inputObj['id'];
//     https://api.themoviedb.org/3/movie/${movieID}?api_key=${THE_MOVIE_DB_API_KEY}&language=en-US
//         return fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${THE_MOVIE_DB_API_KEY}&language=en-US`)
//             .then((response) => response.json());
// },
//     updateCRUDyDBFromTheMovieDB: (inputObj, rating) => {
//     let data = {
//         title: inputObj['title'],
//         overview: inputObj['overview'],
//         genre: inputObj["genres"][0]["name"],
//         rating: rating
//     };
//     // let data = {username: inputObj}
//     return fetch(`/api/movies`, {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Success:', data);
//         })
// },


//TODO THIS IS ALL FROM INDEX AND NOT USED RN
//
//

// const {OMDB_API_KEY} = require('./keys.js');
// const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
// const {getMovies} = require('./api.js');
// const {getOMDB} = require('./api.js');
// const {searchTheMovieDBID} = require('./api.js');
// const {searchMovie} = require('./api.js');
// const {updateCRUDyDBFromTheMovieDB} = require('./api.js');
// const {updateCRUDyDBFromUser} = require('./api.js');
// const {refreshMovies} = require('./api.js');
// const {searchRapidApiMovieDB} = require('./api.js');
// const {searchTheMovieDBID, searchMovie, updateCRUDyDBFromTheMovieDB,

//TheMovieDB Create
// $('#create-with-the-movie-db').click(function() {
//     if (!$('#select-rating').val()) {
//         alert('Please select a rating.');
//         return;
//     }
//     if (!$('#create-movie-title-input').val()) {
//         alert('Please input a movie title.');
//         return;
//     }
//     let rating = $('#select-rating').val();
//     searchTheMovieDBID($('#create-movie-title-input').val())
//         // .then(response => console.log(response))
//         .then(response => {
//             return response['results'][0];
//         })
//         .then(response => searchMovie(response))
//         // .then(response => console.log(response))
//         .then(response => updateCRUDyDBFromTheMovieDB(response, rating))
//         .then(response => refreshMovies())
//     $('#select-rating').val('');
//     $('#create-movie-title-input').val('');
//
// });

// searchRapidApiMovieDB("Star Wars")
//     .then(result => getRapidApiMovieID(result, "Star Wars: Episode V - The Empire Strikes Back"))
//     .then(result => idSearchRapidApiMovieDB(result))


//more just in case

//     .then(response => searchMovie(response))
//     // .then(response => console.log(response))
//     .then(response => updateCRUDyDBFromTheMovieDB(response, rating))
//     .then(response => refreshMovies())
// $('#select-rating').val('');
// $('#create-movie-title-input').val('');


//just in case
// getOMDB("Ninja Turtles")
//     .then(response => console.log(response));
// searchTheMovieDBID("Star Wars The Phantom Menace")
//     // .then(response => console.log(response))
//     .then(response => {
//         return response['results'][0];
//     })
//     .then(response => searchMovie(response))
//     // .then(response => console.log(response))
//     .then(response => updateCRUDyDB(response))
// getOMDB("Ninja Turtles")
//